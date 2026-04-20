"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    // Log the error for debugging
    if (error) {
      console.error("Authentication error:", error);
    }
  }, [error]);

  // Map error codes to human-readable messages
  const getErrorMessage = () => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration.";
      case "AccessDenied":
        return "You do not have permission to sign in.";
      case "Verification":
        return "The verification link is invalid or has expired.";
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "EmailCreateAccount":
      case "Callback":
      case "OAuthAccountNotLinked":
        return "There was a problem with your OAuth sign-in.";
      case "EmailSignin":
        return "The email link is invalid or has expired.";
      case "CredentialsSignin":
        return "The sign in attempt failed. Please check your credentials and try again.";
      case "SessionRequired":
        return "You need to be signed in to access this page.";
      default:
        return "An unexpected error occurred.";
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto flex max-w-md flex-col justify-center space-y-6 px-4">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <ExclamationTriangleIcon className="h-6 w-6 text-destructive" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Authentication Error
          </h1>
          <p className="text-muted-foreground">{getErrorMessage()}</p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link href="/signin">
            <Button className="w-full">Back to Sign In</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 