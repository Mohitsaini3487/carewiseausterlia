import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Home, Car, Users, ClipboardCheck } from "lucide-react";

const services = [
  {
    id: "domestic",
    icon: <Home className="w-8 h-8 text-primary" />,
    title: "Domestic Assistance",
    description:
      "At CareWise Australia, we help seniors maintain a clean, safe, and comfortable home environment through our domestic assistance service. Our workers assist with light household tasks such as vacuuming, dusting, dishwashing, laundry, meal preparation, bed-making, and general tidying. This service is perfect for elderly individuals who may find daily chores physically challenging. By supporting daily living tasks, we help reduce stress, prevent accidents, and allow seniors to remain independent at home.",
    imageId: "service-domestic",
  },
  {
    id: "shopping",
    icon: <ShoppingCart className="w-8 h-8 text-primary" />,
    title: "Shopping Assistance",
    description:
      "Our shopping assistance service ensures that seniors always have access to fresh groceries, household essentials, and personal items without the stress of travelling or carrying heavy bags. Our workers can shop alongside the client for a social outing, or complete the shopping on their behalf. We also help with organising the groceries at home and picking up prescriptions or essential supplies. This service provides convenience, safety, and peace of mind for both clients and their families.",
    imageId: "service-shopping",
  },
  {
    id: "companion",
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Companionship",
    description:
      "Loneliness can significantly impact mental and emotional wellbeing, especially for older adults. Our companionship service offers friendly, meaningful social interaction through conversations, shared activities, games, walks, and simply spending quality time together. Whether it's chatting over a cup of tea, reading together, or providing emotional support, we ensure that every client feels valued, heard, and connected. This service promotes a sense of belonging and supports overall wellbeing.",
    imageId: "service-companion",
  },
  {
    id: "transport",
    icon: <Car className="w-8 h-8 text-primary" />,
    title: "Transport Assistance",
    description:
      "Many seniors find it difficult to attend appointments, social outings, and community events due to mobility or safety concerns. Our transport assistance service provides safe, reliable, and friendly transportation for medical appointments, grocery shopping, social activities, and everyday errands. Support workers not only drive clients to their destination but also offer help from door to door, including assisting with mobility aids. This service enhances independence and keeps seniors engaged in their community.",
    imageId: "service-transport",
  },
  {
    id: "welfare",
    icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
    title: "Welfare Checks",
    description:
      "Our welfare check service provides regular, reliable support for seniors who may be living alone or need extra reassurance. During each check-in—either by phone or in person—our support workers make sure the client is safe, comfortable, and managing well at home. We look for any changes in wellbeing, ensure they have food, water, and essential items, and offer a friendly conversation to reduce loneliness. If something seems unusual or concerning, we promptly notify family members or appropriate services. Welfare checks offer peace of mind, early detection of issues, and an added layer of safety for older adults.",
    imageId: "service-welfare",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-secondary/30 py-20 md:py-28 text-center">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary font-medium">Our Services</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Personalised Support for You</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer a comprehensive range of non-clinical services designed to help you live comfortably and independently in your own home.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => {
              const image = placeholderImages.find(p => p.id === service.imageId);
              const isReversed = index % 2 !== 0;
              return (
                 <Card id={service.id} key={service.id} className="overflow-hidden border-0 md:border md:shadow-sm">
                  <div className="grid md:grid-cols-2 items-center">
                    <div className={`relative h-80 md:h-full w-full ${isReversed ? 'md:order-last' : ''}`}>
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </div>
                    <div className="p-8 md:p-12 lg:p-16">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                        {service.icon}
                      </div>
                      <h2 className="text-3xl font-bold">{service.title}</h2>
                      <p className="mt-4 text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                       <Button asChild size="lg" className="mt-8">
                        <Link href="/booking">Book This Service <ArrowRight className="ml-2" /></Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
