import { AgentForm } from "@/components/agents/agent-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Agent",
  description: "Create a new AI agent",
};

export default function NewAgentPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Create New Agent</h1>
      <AgentForm />
    </div>
  );
} 