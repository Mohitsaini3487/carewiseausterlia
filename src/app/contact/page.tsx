
import { Clock, Mail, MapPin, Phone, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";

const contactDetails = [
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    title: "Phone",
    value: "(Not provided)",
    href: "#",
  },
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: "Email",
    value: "carewiseaustralia@gmail.com",
    href: "mailto:carewiseaustralia@gmail.com",
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Operating Hours",
    value: "8am - 4pm, Mon - Fri",
    href: "#",
  },
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: "Service Area",
    value: "All suburbs in Canberra",
    href: "#",
  },
];

export default function ContactPage() {
    const contactImage = placeholderImages.find(p => p.id === 'contact-hero');
  return (
    <>
      <section className="bg-secondary/30 py-20 md:py-28 text-center">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 text-primary font-medium">Get In Touch</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Contact Us
          </h1>
          <p className="mt-6 text-lg md:text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
            We're here to help. Reach out with any questions or to get started with our services. We look forward to hearing from you.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Contact Information</h2>
              <p className="text-muted-foreground text-lg">
                You can reach us via email or phone during our business hours. We aim to respond to all inquiries within 24 hours. For urgent matters, please give us a call.
              </p>
              <div className="space-y-6">
                {contactDetails.map((detail) => (
                  <div key={detail.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 bg-primary/10 p-3 rounded-full">{detail.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{detail.title}</h3>
                      {detail.href !== "#" ? (
                        <a
                          href={detail.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{detail.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex items-center justify-center">
               <Card className="p-8 border-2 shadow-lg w-full">
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden mb-6">
                    {contactImage && (
                        <Image
                            src={contactImage.imageUrl}
                            alt={contactImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={contactImage.imageHint}
                        />
                    )}
                  </div>
                  <blockquote className="text-center">
                    <Quote className="h-8 w-8 text-primary/50 mx-auto mb-4" />
                    <p className="text-xl italic text-muted-foreground">
                        "The simple act of caring is heroic."
                    </p>
                    <footer className="mt-4 text-sm font-semibold text-foreground">- Edward Albert</footer>
                  </blockquote>
               </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
