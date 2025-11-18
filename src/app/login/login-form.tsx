
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFirebase } from "@/firebase";
import { initiateGoogleSignIn } from "@/firebase/non-blocking-login";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

function GoogleIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
      >
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.655-3.108-11.127-7.481l-6.571,4.819C9.656,39.663,16.318,44,24,44z"
        />
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.49,44,30.659,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
      </svg>
    );
  }

export default function LoginForm() {
  const { auth, user, isUserLoading } = useFirebase();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push(redirectUrl);
    }
  }, [user, isUserLoading, router, redirectUrl]);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setError(null);
    try {
        await initiateGoogleSignIn(auth);
        // The useEffect will handle the redirect on successful sign-in
    } catch (e: any) {
        console.error("Google Sign-In Error:", e);
        if (e.code === 'auth/popup-closed-by-user') {
            setError("Sign-in was cancelled. Please try again.");
        } else {
            setError("An error occurred during sign-in. Please try again later.");
        }
        setIsSigningIn(false);
    }
  };
  
  const handleSignInClick = () => {
    if (!isSigningIn) {
      handleGoogleSignIn();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>
          Sign in with Google to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
            <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleSignInClick}
          disabled={isSigningIn}
        >
          {isSigningIn ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <GoogleIcon />
              Sign in with Google
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
