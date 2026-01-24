"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

/* ---------------- VENDORS ---------------- */
const VENDORS = [
  { id: "CPWD", name: "CPWD", src: "/vendors/cpwd.png" },
  { id: "KMF", name: "KMF", src: "/vendors/kmf.jpg" },
  { id: "IISc", name: "IISc", src: "/vendors/iisc.jpg" },
  { id: "RBI", name: "RBI", src: "/vendors/rbi.jpg" },
  { id: "HOS", name: "Hospitals", src: "/vendors/stmarthas.jpg" },
];

/* ---------------- COUNTERS (MANDATORY) ---------------- */
const COUNTERS = [
  { label: "Years of Experience", value: 25, suffix: "+" },
  { label: "Government Projects", value: 100, suffix: "+" },
  { label: "Compliance Record", value: 100, suffix: "%" },
];

export function Hero() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "hero-background"
  );

  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-animate",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        }
      );

      gsap.utils.toArray<HTMLElement>(".hero-counter").forEach((el) => {
        const target = Number(el.dataset.value);
        const suffix = el.dataset.suffix || "";

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2.4,
            ease: "power4.out",
            snap: { innerText: 1 },
            onUpdate() {
              el.innerText = Math.round(Number(el.innerText)) + suffix;
            },
            onComplete() {
              el.innerText = target + suffix;
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Background */}
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover scale-110 brightness-[0.55] saturate-75"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/75 to-black/85" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-10 sm:space-y-14 text-center">
          {/* Badge */}
          <div className="hero-animate inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[11px] sm:text-sm font-semibold text-primary">
            Government Super Grade Licensed Electrical Contractor · Karnataka
          </div>

          {/* Heading */}
          <h1 className="hero-animate text-2xl sm:text-4xl md:text-5xl font-headline font-bold text-white leading-tight">
            Delivering Electrical Infrastructure
            <br className="hidden sm:block" />
            <span className="text-primary">for Government & Public Sector</span>
          </h1>

          {/* Description */}
          <p className="hero-animate max-w-3xl mx-auto text-sm sm:text-lg text-white/75 leading-relaxed">
            A Government Super Grade licensed contractor delivering
            statutory-compliant HT & LT electrical works for departments, PSUs,
            hospitals, and critical public infrastructure across Karnataka.
          </p>

          {/* Counters (DO NOT TOUCH CORE FUNCTIONALITY) */}
          <div className="hero-animate grid grid-cols-3 gap-6 sm:gap-10 max-w-3xl mx-auto">
            {COUNTERS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center space-y-1"
              >
                <div
                  className="hero-counter text-2xl sm:text-4xl font-bold text-white tabular-nums"
                  data-value={item.value}
                  data-suffix={item.suffix}
                >
                  0
                </div>
                <p className="text-[10px] sm:text-sm uppercase tracking-wide text-white/60 text-center">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Vendors */}
          <div className="hero-animate pt-8 sm:pt-12">
            <p className="mb-4 text-[10px] sm:text-xs uppercase tracking-wide text-white/50">
              Trusted vendors
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm py-6 sm:py-8">
              <div
                className="grid items-center justify-items-center gap-y-6 gap-x-8 max-w-5xl mx-auto"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                }}
              >
                {VENDORS.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <div className="relative h-14 w-28 sm:h-20 sm:w-36">
                      <Image
                        src={vendor.src}
                        alt={vendor.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
