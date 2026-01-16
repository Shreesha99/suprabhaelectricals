"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const projectIds = [
  "project-geological-survey",
  "project-cii-Bengaluru",
  "project-nit-surathkal",
  "project-auditorium",
];

const projectDetails: Record<string, { title: string; location: string }> = {
  "project-geological-survey": {
    title: "Geological Survey of India",
    location: "Bengaluru",
  },
  "project-cii-Bengaluru": {
    title: "CII Office",
    location: "Bengaluru",
  },
  "project-nit-surathkal": {
    title: "NIT Surathkal – New Wing",
    location: "Surathkal",
  },
  "project-auditorium": {
    title: "Auditorium Electrification",
    location: "Multiple Locations",
  },
};

export function Projects() {
  const container = useRef<HTMLDivElement | null>(null);

  const projects = projectIds.map((id) => {
    const image = PlaceHolderImages.find((p) => p.id === id);
    return {
      ...image,
      ...projectDetails[id],
    };
  });

  useGSAP(
    () => {
      /* Section header */
      gsap.fromTo(
        ".projects-header > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 80%",
          },
        }
      );

      /* Cards */
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );

        /* Image parallax */
        const image = card.querySelector(".project-image");
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.1 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                scrub: 1,
              },
            }
          );
        }
      });
    },
    { scope: container }
  );

  return (
    <section
      id="projects"
      ref={container}
      className="py-28 lg:py-36 bg-background overflow-hidden"
    >
      <div className="container space-y-20">
        {/* Header */}
        <div className="projects-header text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-semibold tracking-wide uppercase">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Landmark Government Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            A selection of high-value, compliance-driven electrical
            infrastructure projects executed across Karnataka.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map(
            (project, index) =>
              project?.imageUrl && (
                <div
                  key={index}
                  className="project-card group relative overflow-hidden rounded-2xl border border-border bg-card"
                >
                  {/* Image */}
                  <div className="relative h-[22rem] w-full overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="project-image object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      data-ai-hint={project.imageHint}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs uppercase tracking-wide text-primary font-semibold">
                      {project.location}
                    </span>

                    <h3 className="mt-1 text-xl font-bold text-white">
                      {project.title}
                    </h3>

                    {/* Accent line */}
                    <div className="mt-4 h-[2px] w-0 bg-primary group-hover:w-16 transition-all duration-500" />
                  </div>

                  {/* Subtle glow */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20" />
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}
