"use client";

import { useState, useEffect } from "react";
import { getFaqs } from "@/app/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

function FaqSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FaqList() {
  const [faqList, setFaqList] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const faqs = await getFaqs();
        if (faqs && faqs.length > 0) {
          setFaqList(faqs);
        } else {
          throw new Error("No FAQs were found.");
        }
      } catch (err) {
        setError("Could not load FAQs at this time. Please try again later.");
        console.error("Failed to fetch FAQs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFaqs();
  }, []);

  if (loading) {
    return <FaqSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {faqList.map((faq, index) => (
        <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg px-6 bg-secondary/30">
          <AccordionTrigger className="text-left text-lg hover:no-underline font-semibold">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground pt-2">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
