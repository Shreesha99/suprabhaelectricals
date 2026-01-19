"use client";

import Link from "next/link";
import { Menu, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
import Image from "next/image";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const hasAutoExpanded = useRef(false);
  const isMobile = useIsMobile();

  /* -------------------- SCROLL -------------------- */
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      if (scrolled && !hasAutoExpanded.current && !isMobile) {
        setIsNavExpanded(true);
        hasAutoExpanded.current = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  /* -------------------- ACTIVE SECTION -------------------- */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

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

    sections.forEach((section) => observer.observe(section as Element));
    return () => observer.disconnect();
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <>
      {/* -------------------- HEADER LOGO -------------------- */}
      <header className="fixed top-0 left-0 z-50 w-full px-4 pt-4 pointer-events-none">
        <Link
          href="#home"
          className={cn(
            "pointer-events-auto inline-flex items-center gap-3 rounded-full px-3 py-2 transition-all duration-300",
            isScrolled || isMobile ? "bg-transparent" : "bg-black dark:bg-white"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-full transition-all",
              isScrolled || isMobile
                ? "bg-white dark:bg-black h-10 w-10"
                : "h-12 w-12"
            )}
          >
            <Image
              src="/logo.png"
              alt="Suprabha Electricals Logo"
              width={48}
              height={48}
              className={cn(
                "object-contain transition-transform duration-300",
                isScrolled || isMobile ? "scale-110" : "scale-125"
              )}
              priority
            />
          </div>

          <h1
            className={cn(
              "text-lg font-bold whitespace-nowrap transition-all duration-300",
              isScrolled || isMobile
                ? "opacity-0 w-0 overflow-hidden"
                : "opacity-100 text-white dark:text-black"
            )}
          >
            Suprabha Electricals
          </h1>
        </Link>
      </header>

      {/* -------------------- THEME TOGGLE (DESKTOP) -------------------- */}
      <div className="fixed top-6 right-8 z-50 hidden md:flex">
        <ThemeToggle />
      </div>

      {/* -------------------- MOBILE MENU -------------------- */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full backdrop-blur bg-background/80"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeSheet}
                  className={cn(
                    "block text-lg font-medium transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  closeSheet();
                  window.dispatchEvent(new CustomEvent("open-chatbot"));
                }}
                className="flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="h-5 w-5" />
                Help
              </button>
            </div>

            <div className="mt-8 pt-6 border-t flex justify-center">
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* -------------------- FLOATING NAV (DESKTOP) -------------------- */}
      <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <nav
          className={cn(
            "flex items-center rounded-full border bg-background/80 backdrop-blur-lg shadow-lg transition-all duration-300 py-2 px-3",
            isNavExpanded ? "px-2 gap-2" : "px-2 gap-0"
          )}
        >
          <div
            className={cn(
              "flex items-center overflow-hidden transition-all duration-300",
              isNavExpanded
                ? "max-w-[1000px] opacity-100 gap-2"
                : "max-w-0 opacity-0"
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap",
                  activeSection === link.href.replace("#", "")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full gap-2"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-chatbot"))
              }
            >
              <MessageCircle className="h-4 w-4" />
              Help
            </Button>

            <Button asChild size="sm" className="rounded-full font-semibold">
              <Link href="#contact">Get a Quote</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="rounded-full gap-1 px-3 text-xs font-medium"
            onClick={() => setIsNavExpanded((v) => !v)}
          >
            {isNavExpanded ? (
              <>
                Collapse
                <ChevronRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                Expand
              </>
            )}
          </Button>
        </nav>
      </div>
    </>
  );
}
