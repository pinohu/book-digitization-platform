"use client"

import { NavigationSection } from "@/components/navigation-section";
import { FeaturesSection } from "@/components/features-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavigationSection />
      <FeaturesSection />
    </main>
  );
} 