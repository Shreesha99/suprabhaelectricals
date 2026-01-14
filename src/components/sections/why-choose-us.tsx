"use client";

import { useRef } from 'react';
import { CheckCircle, Award, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const features = [
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Proven Expertise",
    description: "Years of specialized experience in government electrical contracts, ensuring compliance and quality.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "Timely Delivery",
    description: "A strong track record of completing projects on schedule and within budget, without compromising on quality.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Skilled Professionals",
    description: "A dedicated team of certified and experienced electricians and project managers at your service.",
  },
    {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Modern Technology",
    description: "Utilizing the latest technology and equipment to deliver efficient and reliable electrical solutions.",
  },
];

export function WhyChooseUs() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    });

    tl.fromTo('.section-header-why-choose-us', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    tl.fromTo('.feature-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out' }, "-=0.5");

  }, { scope: container });

  return (
    <section id="why-choose-us" ref={container} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container space-y-16">
        <div className="text-center space-y-4 section-header-why-choose-us">
            <span className="text-primary font-semibold">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                Ready for Ecological Power
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Our commitment to excellence, sustainability, and customer satisfaction sets us apart.
            </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center shadow-md hover:shadow-xl transition-all duration-300 feature-card bg-card border-border rounded-lg hover:-translate-y-2 hover:border-primary">
              <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-lg">
                      {feature.icon}
                  </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
