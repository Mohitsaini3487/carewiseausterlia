import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarClock,
  Car,
  ClipboardCheck,
  DollarSign,
  Heart,
  Home as HomeIcon,
  ShoppingCart,
  UserCog,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    title: "Shopping Assistance",
    description: "Ensuring you always have access to essentials without the stress.",
    link: "/services#shopping",
  },
  {
    icon: <HomeIcon className="h-8 w-8 text-primary" />,
    title: "Domestic Assistance",
    description: "Helping maintain a clean, safe, and comfortable home environment.",
    link: "/services#domestic",
  },
  {
    icon: <Car className="h-8 w-8 text-primary" />,
    title: "Transport & Appointments",
    description: "Reliable transportation for medical appointments and social outings.",
    link: "/services#transport",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Companion Support",
    description: "Friendly, meaningful social interaction to combat loneliness.",
    link: "/services#companion",
  },
  {
    icon: <ClipboardCheck className="h-8 w-8 text-primary" />,
    title: "Welfare Checks",
    description: "Regular check-ins to ensure your safety and comfort at home.",
    link: "/services#welfare",
  },
];

const whyChooseUs = [
  {
    icon: <BadgeCheck className="h-8 w-8 text-accent" />,
    title: "Trained & Vetted",
    description: "All companions are trained and background-checked for your peace of mind.",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-accent" />,
    title: "Affordable & Flexible",
    description: "We offer personalized plans that fit your budget and schedule.",
  },
  {
    icon: <UserCog className="h-8 w-8 text-accent" />,
    title: "Personalised Care",
    description: "Support is tailored to your individual needs and preferences.",
  },
  {
    icon: <CalendarClock className="h-8 w-8 text-accent" />,
    title: "Same-Day Service",
    description: "We offer prompt support, with same-day service available.",
  },
];

export default function HomePage() {
  const heroImage = placeholderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative bg-secondary/30 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <Badge variant="outline" className="mb-4 border-primary/50 text-primary font-medium">Your Partner in Compassionate Care</Badge>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary">
                CareWise Australia
              </h1>
              <p className="mt-6 max-w-xl text-lg md:text-xl text-muted-foreground">
                Compassionate non-clinical support for elderly Australians, helping
                seniors live independently, safely, and comfortably at home.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button asChild size="lg">
                    <Link href="/booking">Book a Service <ArrowRight /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/services">Our Services</Link>
                  </Button>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              {heroImage && (
                <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem]">
                   <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="rounded-full object-cover border-8 border-background shadow-2xl"
                    priority
                    data-ai-hint={heroImage.imageHint}
                  />
                  <div className="absolute -bottom-4 -right-4 bg-background p-4 rounded-lg shadow-xl border">
                    <div className="flex items-center gap-3">
                        <div className="bg-accent p-3 rounded-full">
                            <Heart className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <div>
                            <p className="font-bold text-foreground">Compassionate Support</p>
                            <p className="text-sm text-muted-foreground">Care you can trust.</p>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Key Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide a range of personalised services, all designed to support independence and enhance quality of life.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 5).map((service) => (
              <Card
                key={service.title}
                className="flex flex-col text-center items-center p-8 border-2 border-transparent hover:border-primary hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                  <div className="bg-primary/10 p-4 rounded-full mb-6 transition-colors duration-300 group-hover:bg-primary">
                    {React.cloneElement(service.icon, {className: "h-8 w-8 text-primary transition-colors duration-300 group-hover:text-primary-foreground"})}
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardContent className="flex-grow p-0">
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                  <Button asChild variant="link" className="mt-6 text-primary hover:text-primary/90 font-bold">
                    <Link href={service.link}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
              </Card>
            ))}
             <Card
                className="flex flex-col text-center items-center p-8 border-2 border-dashed bg-secondary/50 hover:border-primary hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group md:col-span-2 lg:col-span-1"
              >
                  <div className="bg-primary/10 p-4 rounded-full mb-6 transition-colors duration-300 group-hover:bg-primary">
                     <Users className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-primary-foreground"/>
                  </div>
                  <CardTitle className="text-xl mb-2">And much more...</CardTitle>
                  <CardContent className="flex-grow p-0">
                    <p className="text-muted-foreground">Our services are flexible and tailored to your unique needs.</p>
                  </CardContent>
                  <Button asChild variant="link" className="mt-6 text-primary hover:text-primary/90 font-bold">
                    <Link href="/contact">Contact Us For a Custom Plan <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
              </Card>
          </div>
        </div>
      </section>

      <section id="why-us" className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We are committed to providing reliable, compassionate, and professional care you can trust.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex items-start text-left gap-4">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-md border">
                  {item.icon}
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
