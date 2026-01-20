"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    year: "2016",
    title: "Foundation",
    description:
      "Suprabha Electricals was established with a focus on government-grade electrical contracting and statutory compliance.",
  },
  {
    year: "2018",
    title: "First Major Government Project",
    description:
      "Execution of HT/LT electrical works for institutional buildings across Karnataka.",
  },
  {
    year: "2020",
    title: "Expansion Phase",
    description:
      "Scaled operations to handle multi-location projects including auditoriums and academic campuses.",
  },
  {
    year: "2022",
    title: "Landmark Institutions",
    description:
      "Delivered electrical infrastructure for central government research and education facilities.",
  },
  {
    year: "2024",
    title: "Trusted Partner",
    description:
      "Recognized as a reliable execution partner for complex, compliance-heavy government projects.",
  },
];

export default function TimelinePage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
    const totalWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxTranslate = totalWidth - viewportWidth;

    const snapPoints = cards.map((_, i) => i / (cards.length - 1));

    /* 🔒 RESET ALL ARROWS ON INIT */
    cards.forEach((card) => {
      const arrows = card.querySelectorAll<SVGPathElement>(".arrow");
      gsap.set(arrows, {
        strokeDasharray: 100,
        strokeDashoffset: 100,
        opacity: 1,
      });
    });

    gsap.to(trackRef.current, {
      x: () => -maxTranslate,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,

        snap: {
          snapTo: snapPoints,
          duration: { min: 0.3, max: 0.6 },
          ease: "power2.out",
        },

        // ✅ CORRECT PLACE
        onSnapComplete: (self: ScrollTrigger) => {
          const activeIndex = Math.round(self.progress * (cards.length - 1));

          const card = cards[activeIndex];
          if (!card) return;

          const arrows = card.querySelectorAll<SVGPathElement>(".arrow");

          // reset
          gsap.killTweensOf(arrows);
          gsap.set(arrows, {
            strokeDasharray: 100,
            strokeDashoffset: 100,
            opacity: 1,
          });

          // animate AFTER snap finishes
          gsap.to(arrows, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.25,
          });
        },

        onUpdate: (self: ScrollTrigger) => {
          const activeIndex = Math.round(self.progress * (cards.length - 1));

          cards.forEach((card, index) => {
            const d = Math.abs(index - activeIndex);

            gsap.to(card, {
              opacity: d === 0 ? 1 : d === 1 ? 0.55 : 0.25,
              scale: d === 0 ? 1 : 0.95,
              filter: d === 0 ? "blur(0px)" : `blur(${d * 2}px)`,
              boxShadow:
                d === 0
                  ? "0 30px 80px rgba(0,0,0,0.25)"
                  : "0 10px 30px rgba(0,0,0,0.12)",
              duration: 0.35,
              ease: "power2.out",
            });
          });
        },
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* HEADER */}
      <div className="px-6 lg:px-20 pt-24 pb-16 max-w-3xl">
        <span className="text-primary font-semibold uppercase tracking-wide">
          Our Journey
        </span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold">
          Timeline of Excellence
        </h1>
        <h1 className="text-primary mt-3 text-xl font-bold">
          Scroll to view full journey
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          A year-by-year look at how Suprabha Electricals evolved into a trusted
          government contractor.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative">
        <div ref={trackRef} className="flex flex-row gap-6 px-6 lg:px-20 pb-24">
          {TIMELINE.map((item) => (
            <div
              key={item.year}
              className="
                timeline-card
                relative overflow-hidden
                bg-card border border-border rounded-3xl
                p-6 sm:p-8 lg:p-12
                flex flex-col justify-between
                shrink-0
                min-h-[420px] lg:min-h-[520px]
                lg:min-w-[60vw]
                will-change-transform
              "
              style={{ width: "clamp(280px, 80vw, 640px)" }}
            >
              {/* 📈 ICON */}
              <svg
                className="absolute bottom-6 right-6 w-12 h-14 opacity-75"
                viewBox="0 0 48 48"
                fill="none"
              >
                <rect
                  x="8"
                  y="26"
                  width="6"
                  height="14"
                  rx="1"
                  className="bar"
                />
                <rect
                  x="20"
                  y="18"
                  width="6"
                  height="22"
                  rx="1"
                  className="bar"
                />
                <rect
                  x="32"
                  y="10"
                  width="6"
                  height="30"
                  rx="1"
                  className="bar"
                />

                <path d="M10 22 L22 12 L30 16 L38 8" className="arrow" />
                <path d="M38 8 L38 14 M38 8 L32 8" className="arrow" />
              </svg>

              <div>
                <span className="text-primary text-sm font-semibold">
                  {item.year}
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold">
                  {item.title}
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ICON BASE STYLES */}
      <style>{`
        .bar {
          fill: hsl(var(--primary));
        }

        .arrow {
          stroke: hsl(var(--primary));
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          transform: translateY(-10px);
        }
      `}</style>
    </section>
  );
}
