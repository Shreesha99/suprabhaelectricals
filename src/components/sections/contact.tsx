"use client";

import {
  Clock,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  {
    label: "Phone",
    value: "+91 94480 75362",
    icon: Phone,
    href: "tel:+919448075362",
  },
  {
    label: "Email",
    value: "suprabhaele@gmail.com",
    icon: Mail,
    href: "mailto:suprabhaele@gmail.com",
  },
  {
    label: "Working Hours",
    value: "10:00 AM – 6:00 PM (Mon–Sat)",
    icon: Clock,
  },
  {
    label: "Operational Region",
    value: "Karnataka, India",
    icon: MapPin,
  },
];

export function Contact() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-header > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-header",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".contact-left",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-left",
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 75%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      id="contact"
      ref={container}
      className="py-28 lg:py-36 bg-card overflow-hidden"
    >
      <div className="container space-y-20">
        {/* Header */}
        <div className="contact-header text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-semibold uppercase tracking-wide">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Start a Project Conversation
          </h2>
          <p className="text-lg text-muted-foreground">
            Reach out for government, PSU, and institutional electrical
            projects. We respond to structured and serious enquiries only.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT – Authority & Info */}
          <div className="contact-left space-y-10">
            <div className="space-y-6">
              {CONTACT_INFO.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 border-l-2 border-primary/30 pl-6"
                  >
                    <div className="mt-1">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg font-medium text-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Boundary Alert */}
            <Alert className="border-destructive/30 bg-destructive/10">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm text-destructive-foreground/80">
                We do <strong>not</strong> provide emergency electrical support.
                This channel is strictly for project-based discussions and
                official enquiries.
              </AlertDescription>
            </Alert>
          </div>

          {/* RIGHT – Structured Enquiry */}
          <Card className="contact-form bg-background border-border shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-headline">
                Project Enquiry Form
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Provide accurate details so we can evaluate your requirement.
              </p>
            </CardHeader>

            <CardContent>
              <form className="space-y-5">
                <Input placeholder="Full Name / Organization" />
                <Input type="email" placeholder="Official Email Address" />
                <Input placeholder="Project Location" />
                <Textarea
                  rows={5}
                  placeholder="Briefly describe the project scope, capacity, or tender reference"
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-bold flex items-center gap-2"
                >
                  Submit Enquiry
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
