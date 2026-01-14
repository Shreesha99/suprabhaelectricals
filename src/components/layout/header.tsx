"use client";

import Link from 'next/link';
import { Menu, Zap } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '../theme-toggle';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <>
      {/* Logo for all screen sizes, and mobile menu trigger */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:border-none md:bg-transparent md:backdrop-blur-none">
        <div className="container flex h-20 items-center">
          <Link href="#home" className="flex items-center gap-2 mr-auto">
            <Zap className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold font-headline text-foreground">
              Suprabha Electricals
            </h1>
          </Link>
          
          <div className="md:hidden ml-4 flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-lg">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="#home" onClick={closeSheet} className="flex items-center gap-2">
                      <Zap className="h-6 w-6 text-primary" />
                      <span className="font-headline text-foreground">Suprabha Electricals</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeSheet}
                      className="text-lg font-medium text-foreground/80 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="mt-4 text-primary-foreground">
                      <Link href="#contact" onClick={closeSheet}>Get a Quote</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Floating Desktop Navigation */}
      <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
         <nav className="flex items-center gap-4 p-2 rounded-full border border-border/40 bg-background/80 backdrop-blur-lg shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground px-4 py-2 rounded-full"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Button asChild className="rounded-full text-primary-foreground font-bold">
              <Link href="#contact">Get a Quote</Link>
          </Button>
        </nav>
      </div>
    </>
  );
}
