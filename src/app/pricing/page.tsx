import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const pricingFeatures = [
  "No hidden fees or charges",
  "Pay only for the time you need",
  "Cancel or reschedule anytime",
  "All services included",
  "Fully insured and vetted staff"
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-secondary/30 py-20 md:py-28 text-center">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary font-medium">Transparent Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Simple, Flexible Rates</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe in clear and fair pricing. All our services are charged at a competitive hourly rate with no hidden costs.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 flex justify-center">
          <Card className="max-w-2xl w-full text-center shadow-lg transition-shadow duration-300 hover:shadow-2xl">
            <CardHeader className="items-center pb-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <span className="text-3xl font-bold">$</span>
                </div>
              <CardTitle className="text-2xl md:text-3xl">Flexible Hourly Rate</CardTitle>
              <CardDescription className="max-w-md pt-2">
                 Get access to all our support services with one simple, affordable pricing model.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="text-5xl font-bold">
                Contact for Quote
                <span className="text-lg font-normal text-muted-foreground ml-2">/ per hour</span>
              </div>
              
              <ul className="space-y-4 text-left max-w-sm mx-auto">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
               <Alert className="text-left">
                <Info className="h-4 w-4" />
                <AlertTitle>Personalised Quotes</AlertTitle>
                <AlertDescription>
                 For a personalized quote tailored to your specific needs, please get in touch. We are happy to answer any questions and create a plan that works for you.
                </AlertDescription>
              </Alert>

            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full">
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
