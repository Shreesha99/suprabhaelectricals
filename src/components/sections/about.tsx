"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export function About() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-image");
  const container = useRef(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        })
        .fromTo(
          ".about-image-container",
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
        )
        .fromTo(
          ".about-content",
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        );
    },
    { scope: container }
  );

  return (
    <section
      id="about"
      ref={container}
      className="py-24 lg:py-32 bg-background overflow-hidden"
    >
      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="about-image-container rounded-xl overflow-hidden shadow-sm">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              width={600}
              height={700}
              className="object-cover w-full aspect-[4/5]"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>

        {/* Content */}
        <div className="about-content space-y-10">
          {/* Heading */}
          <div className="space-y-3">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
              A Trusted Partner in Electrical Infrastructure
            </h2>
          </div>

          {/* Core content */}
          <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">
                Suprabha Electricals
              </span>{" "}
              is a Government Licensed{" "}
              <span className="font-semibold text-foreground">
                Class ‘1’ Electrical Contractor & Consultant
              </span>{" "}
              with over{" "}
              <span className="font-semibold text-foreground">
                25 years of experience
              </span>{" "}
              delivering reliable electrical solutions across Karnataka.
            </li>

            <li>
              We undertake{" "}
              <span className="font-medium text-foreground">
                HT & LT electrical works up to 33 KV
              </span>
              , including consultancy, supply, execution, and turnkey project
              delivery.
            </li>

            <li>
              Our capabilities include{" "}
              <span className="font-medium text-foreground">
                DG sets, panels, transformers, cable laying, earthing, and
                annual maintenance
              </span>{" "}
              for industrial, commercial, and institutional facilities.
            </li>

            <li>
              We are proud holders of the{" "}
              <span className="font-semibold text-foreground">
                Super Grade Electrical License
              </span>{" "}
              <span className="text-xs text-muted-foreground">
                (December 2025)
              </span>
              , enabling us to execute large-scale, high-value, and critical
              infrastructure projects.
            </li>

            <li>
              We also provide end-to-end support for{" "}
              <span className="font-medium text-foreground">
                Electrical Inspectorate licensing, statutory inspections, and
                renewals
              </span>{" "}
              for HT, DG, and lift installations.
            </li>
          </ul>

          {/* Trust indicators */}
          <div className="grid gap-3">
            {[
              "Quality-driven execution with safety-first practices",
              "Strong experience in government and institutional projects",
              "Reliable delivery backed by regulatory compliance",
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button asChild size="lg" className="rounded-full font-semibold">
            <Link href="#contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
