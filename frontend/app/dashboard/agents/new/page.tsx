"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { UserProfile } from "@/components/auth/user-profile";
import { AgentForm } from "@/components/agents/agent-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Agent",
  description: "Create a new AI agent",
};

export default function NewAgentPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Agent" text="Configure a new AI agent">
        <UserProfile />
      </DashboardHeader>
      <div className="grid gap-8">
        <AgentForm />
      </div>
    </DashboardShell>
  );
} 