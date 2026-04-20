"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export function AuthFallback() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-2xl">AI-OS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Authentication Unavailable</h2>
          <p className="text-gray-600 mb-6">
            We're having trouble with our authentication service right now. Please try again later.
          </p>
          <div className="space-y-4">
            <Button onClick={() => signIn()} className="w-full">
              Try to Sign In
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
} 