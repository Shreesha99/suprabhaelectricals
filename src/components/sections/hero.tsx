import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section id="home" className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-white">
      {heroImage && (
         <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container text-center space-y-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold drop-shadow-lg">
          Powering Karnataka's Progress
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-sm">
          Your trusted partner for government electrical contracts, delivering excellence and reliability since day one.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#services">Our Services</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
