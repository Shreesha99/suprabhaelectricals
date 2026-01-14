import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Gavel, Lightbulb, Network } from 'lucide-react';

const services = [
  {
    icon: <Gavel className="h-10 w-10 text-primary" />,
    title: "Government Projects",
    description: "Specializing in electrical tendering and execution for state and central government projects.",
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: "Electrical Installations",
    description: "Complete installation services for new buildings, infrastructure, and public facilities.",
  },
  {
    icon: <Building className="h-10 w-10 text-primary" />,
    title: "Auditorium & Public Spaces",
    description: "Expert design and installation of lighting and electrical systems for auditoriums and large venues.",
  },
  {
    icon: <Network className="h-10 w-10 text-primary" />,
    title: "Infrastructure & Wing Setup",
    description: "Electrical setup for new wings of institutions, and large-scale infrastructure projects.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-secondary">
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Our Services
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/80">
            We provide a comprehensive range of electrical services tailored for government contracts.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center pb-4">
                {service.icon}
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-xl font-headline">{service.title}</CardTitle>
                <p className="text-foreground/70">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
