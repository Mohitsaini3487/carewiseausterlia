"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/firebase";
import BookingForm from "./booking-form";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingPageClient() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isUserLoading && !user) {
      // Preserve original destination for redirect after login
      const redirectTo = `/booking?${searchParams.toString()}`;
      router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
    }
  }, [user, isUserLoading, router, searchParams]);

  if (isUserLoading || !user) {
    return (
      <>
        <section className="bg-secondary/30 py-20 md:py-28 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Loading...</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Please wait while we check your authentication status.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-secondary/30 py-20 md:py-28 text-center">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary font-medium">Book a Service</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Schedule Your Appointment</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Welcome, {user.displayName || user.email}! Fill out the form below to schedule your appointment.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
