import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { UserProfile } from "@/components/auth/user-profile";
import { AgentDetail } from "@/components/agents/agent-detail";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Pencil1Icon } from "@radix-ui/react-icons";

interface AgentPageProps {
  params: {
    id: string;
  };
}

export default function AgentPage({ params }: AgentPageProps) {
  const { id } = params;
  
  // In a real app, you would fetch the agent from your API
  const agent = {
    id,
    name: id === "agent-1" ? "Research Agent" : 
          id === "agent-2" ? "Writing Assistant" : 
          id === "agent-3" ? "Data Analyzer" : "Unknown Agent",
    description: "This is a detailed description of the agent and its capabilities. It is designed to help users understand what this agent can do and how it can be used effectively in their workflows.",
    status: id === "agent-3" ? "inactive" : "active",
    type: id === "agent-1" ? "research" : 
          id === "agent-2" ? "writing" : 
          id === "agent-3" ? "analysis" : "general",
    model: "gpt-4",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "User 1",
    maxTokens: 4000,
    temperature: 0.7,
    systemPrompt: "You are a helpful assistant specialized in providing accurate and relevant information.",
    apiEndpoint: "https://api.openai.com/v1",
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    stats: {
      totalCalls: 127,
      totalTokensUsed: 458923,
      averageResponseTime: 1.2,
      errorRate: 0.05,
    }
  };

  // If agent doesn't exist in our mock data, return 404
  if (!["agent-1", "agent-2", "agent-3"].includes(id)) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={agent.name} text={`Agent type: ${agent.type}`}>
        <div className="flex items-center gap-2">
          <UserProfile />
          <Button asChild variant="outline">
            <Link href={`/dashboard/agents/${id}/edit`}>
              <Pencil1Icon className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </DashboardHeader>
      <Button variant="outline" size="sm" asChild className="mb-6">
        <Link href="/dashboard/agents">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Agents
        </Link>
      </Button>
      <AgentDetail agent={agent} />
    </DashboardShell>
  );
} 