import FaqList from "./faq-list";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FaqPage() {
  return (
    <>
      <section className="bg-secondary/30 py-20 md:py-28 text-center">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary font-medium">Help Center</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our services, pricing, and operational details.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">Common Questions</CardTitle>
                <CardDescription>Can't find the answer you're looking for? Feel free to contact us.</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <FaqList />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
