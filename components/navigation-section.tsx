"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/ui/navigation";

export function NavigationSection() {
  return (
    <>
      <Navigation />
      <section className="flex flex-col items-center justify-center px-4 pt-32 text-center lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI ∞ OS
            </span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            The Infinite Operating System for Intelligence, Infrastructure, and
            Adaptive Empire Creation
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs">Documentation</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
} 