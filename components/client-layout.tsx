"use client"

import { SessionProvider } from "next-auth/react"
import { Providers } from "@/components/providers"
import ErrorBoundary from "@/components/error-boundary"

// Valid base64 encoded dummy values for development - actual value doesn't matter for dev
const DEV_PUBLISHABLE_KEY = "pk_test_Y2xlcmsuZGVtby5kZXYk"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In development, use a dummy key that's valid base64
  // In production, use the environment variable
  const publishableKey = process.env.NODE_ENV === 'development' 
    ? DEV_PUBLISHABLE_KEY 
    : process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // Don't render Clerk in dev mode to avoid auth issues
  if (process.env.NODE_ENV === 'development') {
    return (
      <ErrorBoundary>
        <Providers>{children}</Providers>
      </ErrorBoundary>
    );
  }
  
  // Production mode with Clerk
  return (
    <ErrorBoundary>
      <SessionProvider>
        <Providers>{children}</Providers>
      </SessionProvider>
    </ErrorBoundary>
  )
} 