import { auth } from "@/auth";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { UserProfile } from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VenturesList } from "@/components/ventures/ventures-list";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";
import { PlusIcon } from "@radix-ui/react-icons";

export default async function VenturesPage() {
  const session = await auth();

  // Example ventures data - in a real app, this would come from an API
  const ventures = [
    {
      id: "venture-1",
      name: "Market Research Project",
      description: "Comprehensive market analysis for product expansion",
      status: "active",
      agents: ["agent-1", "agent-2"],
      createdAt: new Date().toISOString(),
      completionRate: 65,
    },
    {
      id: "venture-2",
      name: "Content Creation Pipeline",
      description: "Automated content creation for social media channels",
      status: "active",
      agents: ["agent-2"],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      completionRate: 80,
    },
    {
      id: "venture-3",
      name: "Data Analysis Project",
      description: "Financial data analysis and trend forecasting",
      status: "paused",
      agents: ["agent-3"],
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      completionRate: 40,
    },
  ];

  return (
    <DashboardShell>
      <DashboardHeader heading="Ventures" text="Manage your AI ventures">
        <div className="flex items-center gap-2">
          <UserProfile />
          <Button asChild>
            <Link href="/dashboard/ventures/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              New Venture
            </Link>
          </Button>
        </div>
      </DashboardHeader>
      <div>
        {ventures.length > 0 ? (
          <VenturesList ventures={ventures} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No ventures created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You haven't created any ventures yet. Create your first venture to orchestrate multiple agents.
            </EmptyPlaceholder.Description>
            <Button asChild>
              <Link href="/dashboard/ventures/new">Create Venture</Link>
            </Button>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
} 