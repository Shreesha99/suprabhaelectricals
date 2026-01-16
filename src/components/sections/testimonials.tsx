"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Quote, Star } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Mr. Sharma",
    title: "Project Manager, Geological Survey of India",
    image: "https://picsum.photos/seed/avatar1/100/100",
    quote:
      "Suprabha Electricals demonstrated exceptional execution discipline and technical compliance during our Bengaluru facility upgrade. Their coordination with government bodies and adherence to standards was exemplary.",
    featured: true,
  },
  {
    name: "Dr. Anjali Rao",
    title: "Dean, NIT Surathkal",
    image: "https://picsum.photos/seed/avatar2/100/100",
    quote:
      "The electrical infrastructure for our new academic wing was completed ahead of schedule with zero compliance issues. A highly dependable contractor.",
  },
  {
    name: "Prakash Menon",
    title: "Director, CII Bengaluru",
    image: "https://picsum.photos/seed/avatar3/100/100",
    quote:
      "Their ability to handle large-scale institutional projects with precision makes them one of the most reliable electrical contractors we have worked with.",
  },
];

export function Testimonials() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".testimonials-header > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".testimonial-featured",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonial-featured",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".testimonial-carousel",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonial-carousel",
            start: "top 80%",
          },
        }
      );
    },
    { scope: container }
  );

  const featured = testimonials.find((t) => t.featured);
  const secondary = testimonials.filter((t) => !t.featured);

  return (
    <section
      id="testimonials"
      ref={container}
      className="py-28 lg:py-36 bg-background overflow-hidden"
    >
      <div className="container space-y-20">
        {/* Header */}
        <div className="testimonials-header text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-semibold uppercase tracking-wide">
            Client Trust
          </span>
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Trusted by Institutions & Government Bodies
          </h2>
          <p className="text-lg text-muted-foreground">
            Long-term partnerships built on compliance, execution quality, and
            accountability.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* FEATURED TESTIMONIAL */}
          {featured && (
            <Card className="testimonial-featured bg-card border-border shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-2 text-primary">
                  <Quote className="h-5 w-5" />
                  <span className="text-sm uppercase tracking-wide">
                    Featured Testimonial
                  </span>
                </div>

                <p className="text-lg text-foreground leading-relaxed">
                  “{featured.quote}”
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={featured.image} alt={featured.name} />
                    <AvatarFallback>{featured.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-semibold text-foreground">
                      {featured.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {featured.title}
                    </p>
                  </div>

                  <div className="ml-auto flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-primary fill-primary"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* SECONDARY TESTIMONIALS */}
          <Carousel
            opts={{ align: "start", loop: true }}
            className="testimonial-carousel"
          >
            <CarouselContent>
              {secondary.map((t, index) => (
                <CarouselItem key={index} className="basis-full">
                  <Card className="bg-secondary border-border shadow-md">
                    <CardContent className="p-6 space-y-4">
                      <p className="text-muted-foreground italic">
                        “{t.quote}”
                      </p>

                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <Avatar>
                          <AvatarImage src={t.image} alt={t.name} />
                          <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">
                            {t.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
