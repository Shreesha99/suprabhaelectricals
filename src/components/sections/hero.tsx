"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { ArrowDown, Wind, Zap, Car } from 'lucide-react';

const features = [
    { icon: <Zap className="text-primary"/>, title: 'Your Solar Power', description: 'Solutions' },
    { icon: <Wind className="text-primary"/>, title: 'Wind Grid Power', description: 'Concept' },
    { icon: <Car className="text-primary"/>, title: 'EV Chargers for', description: 'Your Garage' },
]

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({delay: 0.2});
    tl.fromTo(
      ".hero-subtitle",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      ".hero-title",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    )
    .fromTo(
      ".hero-buttons",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
       "-=0.6"
    )
    .fromTo(
      ".hero-features > *",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
       "-=0.6"
    );

     gsap.fromTo(
      ".hero-image",
      { scale: 1.05, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out' }
    );
    gsap.fromTo(
      ".scroll-indicator",
      { y: -20, opacity: 0},
      { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 1, repeat: -1, yoyo: true}
    )
  }, { scope: container });

  return (
    <section ref={container} id="home" className="relative w-full h-[90vh] min-h-[700px] lg:h-screen flex flex-col justify-center text-white overflow-hidden">
      {heroImage && (
         <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover hero-image"
            priority
            quality={100}
            data-ai-hint={heroImage.imageHint}
          />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container text-center space-y-8 mt-auto">
        <p className="text-lg text-primary font-bold tracking-wide uppercase hero-subtitle">Ditch the Past, Move Forward With Renewables</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black tracking-tight uppercase drop-shadow-lg hero-title">
          Power Your Future
        </h1>
        <div className="flex gap-4 justify-center hero-buttons">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-8">
            <Link href="#services">Our Services</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/50 bg-white/10 hover:bg-white/20 text-white rounded-full px-8 font-bold backdrop-blur-sm">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
      
      <div className="relative z-10 container mt-auto mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 hero-features">
            {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10">
                    {feature.icon}
                    <div>
                        <h3 className="font-bold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
        <ArrowDown className="w-5 h-5"/>
      </div>
    </section>
  );
}
