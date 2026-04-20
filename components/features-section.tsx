"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Cpu, Database, Globe, Lock, Zap } from "lucide-react";

const features = [
  {
    title: "AI Agents",
    description: "Deploy and manage intelligent agents for various tasks",
    icon: Brain,
  },
  {
    title: "Infrastructure",
    description: "Scalable and secure infrastructure for your agents",
    icon: Cpu,
  },
  {
    title: "Vector Database",
    description: "Store and retrieve knowledge efficiently",
    icon: Database,
  },
  {
    title: "Global Network",
    description: "Connect with agents worldwide",
    icon: Globe,
  },
  {
    title: "Security",
    description: "Enterprise-grade security and access control",
    icon: Lock,
  },
  {
    title: "Performance",
    description: "Optimized for high-performance operations",
    icon: Zap,
  },
];

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            <Card className="flex h-full flex-col p-6">
              <div className="mb-4">
                <feature.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 