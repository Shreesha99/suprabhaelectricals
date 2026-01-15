"use client";

import Link from "next/link";
import { Menu, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "../theme-toggle";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector(link.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <>
      {/* Centered Logo Header (UNCHANGED) */}
      <header className="fixed top-0 z-50 w-full flex justify-center pt-4 transition-all duration-300">
        <Link
          href="#home"
          className={cn(
            "relative flex items-center gap-2 transition-all duration-500 ease-in-out",
            "p-1.5 md:p-2 rounded-full",
            isScrolled ? "bg-transparent" : "bg-black",
            isScrolled && !isMobile && "!translate-x-[calc(0vw-55rem)]",
            isScrolled && isMobile && "!translate-x-[calc(0vw-10rem)]"
          )}
        >
          <div
            className={cn(
              "transition-all duration-300 ease-in-out flex items-center justify-center",
              isScrolled
                ? "bg-white rounded-full h-9 w-9 md:h-10 md:w-10"
                : "h-10 w-10 md:h-12 md:w-12"
            )}
          >
            <Zap
              className={cn(
                "transition-colors duration-300",
                isScrolled
                  ? "h-5 w-5 md:h-6 md:w-6 text-primary"
                  : "h-6 w-6 md:h-8 md:w-8 text-white"
              )}
            />
          </div>
          <h1
            className={cn(
              "text-base md:text-lg font-bold font-headline transition-all duration-300 ease-in-out text-white",
              isScrolled
                ? "opacity-0 -translate-x-4 w-0 pr-0"
                : "opacity-100 translate-x-0 w-auto pr-3 md:pr-4"
            )}
          >
            Suprabha Electricals
          </h1>
        </Link>
      </header>

      {/* Theme Toggle – Desktop ONLY */}
      <div className="fixed top-4 right-4 z-50 hidden md:flex">
        <ThemeToggle />
      </div>

      {/* Mobile Menu Trigger */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom" className="rounded-t-lg">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeSheet}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "text-primary"
                      : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Theme toggle inside drawer (MOBILE) */}
            <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Appearance</span>
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Floating Desktop Navigation (UNCHANGED) */}
      <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-4 p-2 rounded-full border border-border/40 bg-background/80 backdrop-blur-lg shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors px-4 py-2 rounded-full",
                activeSection === link.href.replace("#", "")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="rounded-full text-primary-foreground font-bold"
          >
            <Link href="#contact">Get a Quote</Link>
          </Button>
        </nav>
      </div>
    </>
  );
}
