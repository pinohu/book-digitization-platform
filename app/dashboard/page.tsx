"use client";

import { Card } from "@/components/ui/card";
import { Brain, Cpu, Database, Globe } from "lucide-react";

const stats = [
  {
    title: "Active Agents",
    value: "12",
    description: "Running AI agents",
    icon: Brain,
  },
  {
    title: "System Load",
    value: "65%",
    description: "Current CPU usage",
    icon: Cpu,
  },
  {
    title: "Memory Usage",
    value: "2.1TB",
    description: "Vector database size",
    icon: Database,
  },
  {
    title: "Network",
    value: "98.2%",
    description: "System uptime",
    icon: Globe,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-4">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">{stat.title}</h3>
              </div>
              <p className="mt-4 text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 