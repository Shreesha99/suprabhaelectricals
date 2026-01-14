"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Gavel, Lightbulb, Network } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';

const services = [
  {
    icon: <Gavel className="h-8 w-8 text-primary" />,
    title: "Government Projects",
    description: "Specializing in electrical tendering and execution for state and central government projects.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Electrical Installations",
    description: "Complete installation services for new buildings, infrastructure, and public facilities.",
  },
  {
    icon: <Building className="h-8 w-8 text-primary" />,
    title: "Auditorium & Public Spaces",
    description: "Expert design and installation of lighting and electrical systems for auditoriums and large venues.",
  },
  {
    icon: <Network className="h-8 w-8 text-primary" />,
    title: "Infrastructure Setup",
    description: "Electrical setup for new wings of institutions, and large-scale infrastructure projects.",
  },
];

export function Services() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    });

    tl.fromTo('.section-header-services', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    tl.fromTo('.service-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out' }, "-=0.5");

  }, { scope: container });

  return (
    <section id="services" ref={container} className="py-24 lg:py-32 bg-secondary overflow-hidden">
      <div className="container space-y-16">
        <div className="text-center space-y-4 section-header-services max-w-3xl mx-auto">
          <span className="text-primary font-semibold">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
            Comprehensive Electrical Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide a complete range of electrical services tailored for government contracts, ensuring quality, safety, and efficiency.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-left shadow-md hover:shadow-xl transition-all duration-300 service-card rounded-lg bg-card border-border hover:-translate-y-2 hover:border-primary">
              <CardHeader>
                <div className="p-4 bg-primary/10 rounded-lg inline-block self-start">
                  {service.icon}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-xl font-headline">{service.title}</CardTitle>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
