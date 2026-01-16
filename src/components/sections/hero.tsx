"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Gavel, ShieldCheck, Building2 } from "lucide-react";

const highlights = [
  {
    icon: <Gavel className="h-5 w-5 text-primary" />,
    title: "Government Projects",
  },
  {
    icon: <Building2 className="h-5 w-5 text-primary" />,
    title: "Institutional Infrastructure",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    title: "Compliance & Safety",
  },
];

const counters = [
  { label: "Years Experience", value: 25 },
  { label: "Government Projects", value: 100 },
  { label: "Compliance Record", value: 100, suffix: "%" },
];

export function Hero() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "hero-background"
  );
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        /* ================= BASE STATES ================= */
        gsap.set(".hero-badge, .hero-title, .hero-description", {
          opacity: 0,
          y: 24,
        });

        gsap.set(".counter-wrap", {
          opacity: 0,
          y: 28,
        });

        gsap.set(".hero-cta", {
          opacity: 0,
          y: 18,
        });

        gsap.set(".hero-support", {
          opacity: 0,
          y: 14,
        });

        /* ================= MASTER TIMELINE ================= */
        const tl = gsap.timeline({ delay: 0.25 });

        /* Header stack */
        tl.to(".hero-badge", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        })
          .to(
            ".hero-title",
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.25"
          )
          .to(
            ".hero-description",
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.45"
          );

        /* ================= COUNTERS APPEAR ================= */
        tl.to(
          ".counter-wrap",
          {
            opacity: 1,
            y: 0,
            stagger: 0.18,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        );

        /* ================= COUNTERS LOGIC ================= */
        gsap.utils.toArray<HTMLElement>(".counter-wrap").forEach((wrap, i) => {
          const numberEl = wrap.querySelector(".hero-counter") as HTMLElement;
          const lineEl = wrap.querySelector(".counter-line") as HTMLElement;
          if (!numberEl || !lineEl) return;

          const target = Number(numberEl.dataset.value);

          gsap.set(numberEl, { innerText: 0 });
          gsap.set(lineEl, { scaleX: 0, transformOrigin: "left" });

          const counterTl = gsap.timeline({
            delay: tl.duration() + i * 0.15,
          });

          counterTl
            .to(lineEl, {
              scaleX: 1,
              duration: 3,
              ease: "power1.inOut",
            })
            .to(
              numberEl,
              {
                innerText: target,
                duration: 2.6,
                ease: "power1.inOut",
                snap: { innerText: 1 },
                onUpdate() {
                  numberEl.innerText = Math.round(
                    Number(numberEl.innerText)
                  ).toString();
                },
              },
              "-=2.3"
            );
        });

        /* ================= CTA BUTTONS ================= */
        tl.to(
          ".hero-cta",
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6"
        );

        /* ================= SUPPORTING ICONS ================= */
        tl.to(
          ".hero-support",
          {
            opacity: 1,
            y: 0,
            stagger: 0.14,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }, container);

      return () => ctx.revert();
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="home"
      className="relative min-h-screen flex items-center text-white overflow-hidden"
    >
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 container py-28">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="hero-badge inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-primary">
            Electrical Contracting • Karnataka
          </div>

          <h1 className="hero-title text-4xl md:text-6xl font-headline font-bold">
            Powering Government & Public Infrastructure
          </h1>

          <p className="hero-description max-w-3xl mx-auto text-lg text-white/75">
            Government Licensed Class ‘1’ Electrical Contractor delivering
            compliant, large-scale electrical infrastructure across Karnataka.
          </p>

          {/* COUNTERS */}
          <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto pt-8">
            {counters.map((item) => (
              <div key={item.label} className="counter-wrap text-center">
                <div className="text-4xl font-bold text-primary tabular-nums">
                  <span className="hero-counter" data-value={item.value}>
                    0
                  </span>
                  {item.suffix}+
                </div>

                <div className="mt-3 h-[2px] bg-white/15 overflow-hidden">
                  <div className="counter-line h-full bg-primary" />
                </div>

                <p className="mt-3 text-xs uppercase tracking-wide text-white/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex justify-center gap-4 pt-6">
            <Button asChild size="lg" className="hero-cta">
              <Link href="#services">View Services</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hero-cta text-black border-white/40 hover:border-white/30 dark:text-white"
            >
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* QUIET SUPPORTING ICONS */}
        <div className="mt-20 flex justify-center gap-12 text-white/60 hero-support">
          {highlights.map((item) => (
            <div key={item.title} className="flex items-center gap-2 text-sm">
              {item.icon}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
