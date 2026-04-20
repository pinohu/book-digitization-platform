import { notFound } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { UserProfile } from "@/components/auth/user-profile";
import { AgentForm } from "@/components/agents/agent-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Agent",
  description: "Edit an existing AI agent",
};

interface EditAgentPageProps {
  params: {
    id: string;
  };
}

export default function EditAgentPage({ params }: EditAgentPageProps) {
  const { id } = params;
  
  // In a real app, you would fetch the agent from your API
  // This is mock data for demonstration
  const predefinedAgents = {
    "agent-1": {
      id: "agent-1",
      name: "Research Agent",
      description: "Helps with research tasks and information gathering",
      type: "research",
      model: "gpt-4",
      isActive: true,
      maxTokens: 4000,
      temperature: 0.7,
      systemPrompt: "You are a helpful research assistant specialized in gathering and summarizing information.",
      apiEndpoint: "https://api.openai.com/v1",
    },
    "agent-2": {
      id: "agent-2",
      name: "Writing Assistant",
      description: "Creates and edits text content based on prompts",
      type: "writing",
      model: "gpt-4",
      isActive: true,
      maxTokens: 8000,
      temperature: 0.8,
      systemPrompt: "You are a skilled writing assistant that helps create and refine written content.",
      apiEndpoint: "https://api.openai.com/v1",
    },
    "agent-3": {
      id: "agent-3",
      name: "Data Analyzer",
      description: "Processes and analyzes numerical data and provides insights",
      type: "analysis",
      model: "gpt-4",
      isActive: false,
      maxTokens: 4000,
      temperature: 0.2,
      systemPrompt: "You are a data analysis expert that can process numerical data and provide insights.",
      apiEndpoint: "https://api.openai.com/v1",
    },
  };

  const agent = predefinedAgents[id as keyof typeof predefinedAgents];

  // If agent doesn't exist, return 404
  if (!agent) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader 
        heading={`Edit ${agent.name}`} 
        text="Modify agent configuration"
      >
        <UserProfile />
      </DashboardHeader>
      <div className="grid gap-8">
        <AgentForm agent={agent} />
      </div>
    </DashboardShell>
  );
} 