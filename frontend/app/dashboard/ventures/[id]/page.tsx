import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { UserProfile } from "@/components/auth/user-profile";
import { VentureDetail } from "@/components/ventures/venture-detail";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Pencil1Icon } from "@radix-ui/react-icons";

interface VenturePageProps {
  params: {
    id: string;
  };
}

export default function VenturePage({ params }: VenturePageProps) {
  const { id } = params;
  
  // In a real app, you would fetch the venture from your API
  const venture = {
    id,
    name: id === "venture-1" ? "Market Research Project" : 
          id === "venture-2" ? "Content Creation Pipeline" : 
          id === "venture-3" ? "Data Analysis Project" : "Unknown Venture",
    description: "This is a detailed description of the venture and its objectives. This venture orchestrates multiple AI agents to collaborate on a complex task that requires diverse skills and specializations.",
    status: id === "venture-3" ? "paused" : "active",
    agents: [
      {
        id: "agent-1",
        name: "Research Agent",
        role: "Lead Researcher",
        type: "research",
        status: "active",
      },
      {
        id: "agent-2",
        name: "Writing Assistant",
        role: "Content Creator",
        type: "writing",
        status: "active",
      },
      {
        id: "agent-3",
        name: "Data Analyzer",
        role: "Data Processor",
        type: "analysis",
        status: id === "venture-3" ? "inactive" : "active",
      }
    ].slice(0, id === "venture-2" ? 1 : 3),
    timeline: [
      {
        id: "event-1",
        type: "creation",
        title: "Venture Created",
        description: "The venture was created",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
      },
      {
        id: "event-2",
        type: "agent_added",
        title: "Agent Added",
        description: "Research Agent was added to the venture",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 13).toISOString(),
      },
      {
        id: "event-3",
        type: "agent_added",
        title: "Agent Added",
        description: "Writing Assistant was added to the venture",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
      },
      {
        id: "event-4",
        type: "milestone",
        title: "Milestone Reached",
        description: "Initial research phase completed",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      },
      {
        id: "event-5",
        type: "status_change",
        title: "Status Change",
        description: "Venture status changed to Active",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      },
    ].slice(0, id === "venture-2" ? 3 : 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "User 1",
    completionRate: id === "venture-1" ? 65 : id === "venture-2" ? 80 : id === "venture-3" ? 40 : 0,
    tasks: [
      {
        id: "task-1",
        title: "Market Research Analysis",
        status: "completed",
        assignedAgent: "agent-1",
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      },
      {
        id: "task-2",
        title: "Competitor Analysis",
        status: "completed",
        assignedAgent: "agent-1",
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      },
      {
        id: "task-3",
        title: "Content Strategy Development",
        status: "in_progress",
        assignedAgent: "agent-2",
        completedAt: null,
      },
      {
        id: "task-4",
        title: "Data Visualization",
        status: "pending",
        assignedAgent: "agent-3",
        completedAt: null,
      },
      {
        id: "task-5",
        title: "Final Report Preparation",
        status: "pending",
        assignedAgent: "agent-2",
        completedAt: null,
      },
    ],
  };

  // If venture doesn't exist in our mock data, return 404
  if (!["venture-1", "venture-2", "venture-3"].includes(id)) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={venture.name} text={`Status: ${venture.status}`}>
        <div className="flex items-center gap-2">
          <UserProfile />
          <Button asChild variant="outline">
            <Link href={`/dashboard/ventures/${id}/edit`}>
              <Pencil1Icon className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </DashboardHeader>
      <Button variant="outline" size="sm" asChild className="mb-6">
        <Link href="/dashboard/ventures">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Ventures
        </Link>
      </Button>
      <VentureDetail venture={venture} />
    </DashboardShell>
  );
} 