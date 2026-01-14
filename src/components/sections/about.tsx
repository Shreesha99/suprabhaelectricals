import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function About() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-image');
  
  return (
    <section id="about" className="py-16 lg:py-24 bg-background">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            About Suprabha Electricals
          </h2>
          <p className="text-lg text-foreground/80">
            Suprabha Electricals is a premier electrical contracting firm specializing in government projects across Karnataka, India. With a steadfast commitment to quality, safety, and timely execution, we have built a reputation for excellence in the public sector.
          </p>
          <p className="text-foreground/70">
            Our team of certified professionals is equipped to handle projects of any scale, from new infrastructure installations to complex auditorium setups. We leverage the latest technology and adhere to the strictest industry standards to ensure every project is a benchmark of quality and reliability. Our focus remains on powering progress and contributing to the development of our state.
          </p>
        </div>
        <div className="flex justify-center">
          <Card className="overflow-hidden shadow-lg w-full max-w-sm border-0">
            <CardContent className="p-0">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={800}
                  className="object-cover w-full h-auto"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
