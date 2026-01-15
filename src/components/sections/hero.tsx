"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ArrowDown, Gavel, Building, HardHat } from "lucide-react";

const features = [
  {
    icon: <Gavel className="h-5 w-5 text-primary" />,
    title: "Government Contracts",
    description: "Public sector & tender-based projects",
  },
  {
    icon: <Building className="h-5 w-5 text-primary" />,
    title: "Commercial Projects",
    description: "Industrial & enterprise installations",
  },
  {
    icon: <HardHat className="h-5 w-5 text-primary" />,
    title: "Safety & Quality",
    description: "Compliance-driven execution",
  },
];

export function Hero() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "hero-background"
  );
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        ".hero-badge",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          ".hero-title",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-description",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-buttons",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-features > *",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.4"
        );

      gsap.fromTo(
        ".hero-image",
        { scale: 1.06 },
        { scale: 1, duration: 2.5, ease: "power2.out" }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="home"
      className="relative w-full min-h-[100vh] flex items-center overflow-hidden text-white"
    >
      {/* Background */}
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          quality={100}
          className="object-cover hero-image"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 container grid lg:grid-cols-2 gap-16 items-center py-24">
        {/* Left */}
        <div className="space-y-6 text-center lg:text-left">
          <span className="hero-badge inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold text-primary backdrop-blur">
            Electrical Contracting • Karnataka
          </span>

          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight">
            Powering Government &<br className="hidden sm:block" /> Public
            Infrastructure
          </h1>

          <p className="hero-description max-w-xl mx-auto lg:mx-0 text-base md:text-lg text-white/80">
            Delivering reliable, compliant, and large-scale electrical solutions
            for government, commercial, and institutional projects across
            Karnataka.
          </p>

          <div className="hero-buttons flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 font-semibold"
            >
              <Link href="#services">Our Services</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 font-semibold border-white/40 bg-white/10 hover:bg-white/20 text-white backdrop-blur"
            >
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Right – Features */}
        <div className="hidden lg:grid gap-5 hero-features">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 rounded-xl border border-white/10 bg-black/30 p-5 backdrop-blur-sm"
            >
              {feature.icon}
              <div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60">
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>
  );
}
