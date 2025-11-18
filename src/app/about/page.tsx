import Image from "next/image";
import { Globe, Hand, Handshake, Shield, Timer, Users, Award, CheckCircle } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const values = [
  {
    icon: <Hand className="h-8 w-8 text-primary" />,
    title: "Respect",
    description: "Treating every individual with the utmost respect and consideration.",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Dignity",
    description: "Upholding the dignity of our clients in all aspects of our care.",
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: "Trust",
    description: "Building relationships based on trust, reliability, and open communication.",
  },
  {
    icon: <Timer className="h-8 w-8 text-primary" />,
    title: "Reliability",
    description: "Providing dependable and consistent support that families can count on.",
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Cultural Safety",
    description: "Ensuring a culturally safe and inclusive environment for all.",
  },
];

const teamQualities = [
    "First Aid Certified",
    "CPR Certified",
    "Thoroughly Vetted",
    "Background Checked",
    "Kind & Compassionate",
    "Professional & Reliable"
]

export default function AboutPage() {
  const teamImage = placeholderImages.find((p) => p.id === "about-team");

  return (
    <>
      <section className="bg-secondary/30 py-20 md:py-28 text-center">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary font-medium">Our Story</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">About CareWise Companion</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in providing compassionate, non-clinical support for seniors living at home.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
                {teamImage && (
                    <Image
                    src={teamImage.imageUrl}
                    alt={teamImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={teamImage.imageHint}
                    />
                )}
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Who We Are & Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                CareWise Australia is a non-clinical support service dedicated to helping
                seniors maintain their independence and dignity while living comfortably in their own homes.
              </p>
              <p className="text-lg text-muted-foreground">
                Our mission is to provide personalised, compassionate support that enhances the
                quality of life for elderly Australians, ensuring they feel safe, valued, and connected.
              </p>
              <Button asChild size="lg" className="mt-4">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">The Principles That Guide Us</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our values are the foundation of our work, ensuring we provide care that is not only professional but also deeply compassionate.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center p-6 border-2 border-transparent hover:border-primary hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="items-center p-0 mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {value.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <CardTitle className="text-lg mb-2">{value.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Card className="text-center bg-transparent border-0 shadow-none">
            <CardContent className="p-0">
               <div className="flex justify-center mb-6">
                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                   <Users className="h-8 w-8" />
                 </div>
               </div>
              <h2 className="text-3xl md:text-4xl font-bold">Our Professional Team</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                CareWise Australia is a growing company with a reliable, kind, and
                professional team. We ensure the highest level of care and safety for our
                clients.
              </p>
              <div className="mt-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                    {teamQualities.map(quality => (
                        <div key={quality} className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-muted-foreground">{quality}</span>
                        </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
