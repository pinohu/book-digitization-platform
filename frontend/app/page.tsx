"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">UI Components Demo</h1>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/ui-showcase">View UI Showcase</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ui-showcase/simple">View Simple Showcase</Link>
        </Button>
      </div>
    </main>
  )
} 