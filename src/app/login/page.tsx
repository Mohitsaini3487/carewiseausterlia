import React, { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import LoginForm from "./login-form";

function LoginFallback() {
  return (
    <>
      <section className="bg-secondary/30 py-20 md:py-28 text-center">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 text-primary font-medium">Account Access</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Client Portal</h1>
          <p className="mt-6 text-lg md:text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
            Sign in to your account to manage your bookings or sign up to get started.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-md">
          <div className="space-y-4">
            <div className="h-10 w-full rounded bg-muted/40" />
            <div className="h-10 w-full rounded bg-muted/40" />
            <div className="h-12 w-full rounded bg-muted/40" />
          </div>
        </div>
      </section>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
