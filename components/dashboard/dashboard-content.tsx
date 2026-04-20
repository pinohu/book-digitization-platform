"use client";

import { useSession } from "next-auth/react";
import { UserProfile } from "@/components/auth/user-profile";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, RocketIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { redirect } from "next/navigation";

export function DashboardContent() {
  const { data: session } = useSession();
  
  if (!session) {
    redirect("/signin");
  }

  // Example agents data - in a real app, this would come from an API
  const agents = [
    {
      id: "agent-1",
      name: "Research Agent",
      status: "active",
      type: "research",
    },
    {
      id: "agent-2",
      name: "Writing Assistant",
      status: "active",
      type: "writing",
    },
    {
      id: "agent-3",
      name: "Data Analyzer",
      status: "inactive",
      type: "analysis",
    },
  ];

  // Example ventures data
  const ventures = [
    {
      id: "venture-1",
      name: "Market Research Project",
      status: "active",
      completionRate: 65,
      agentCount: 2,
    },
    {
      id: "venture-2",
      name: "Content Creation Pipeline",
      status: "active",
      completionRate: 80,
      agentCount: 1,
    },
  ];

  // Example metrics
  const metrics = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === "active").length,
    totalVentures: ventures.length,
    activeVentures: ventures.filter(v => v.status === "active").length,
    completedTasks: 12,
    pendingTasks: 8,
  };

  // Status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "inactive":
      case "paused":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text={`Welcome back, ${session?.user?.name || "User"}`}>
        <UserProfile />
      </DashboardHeader>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <RocketIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalAgents}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeAgents} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ventures</CardTitle>
            <RocketIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalVentures}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeVentures} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.pendingTasks} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Status</CardTitle>
            <ExclamationTriangleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Healthy</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Ventures */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Ventures</h2>
          <Button variant="outline" asChild size="sm">
            <Link href="/dashboard/ventures">
              View all
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-2">
          {ventures.map((venture) => (
            <Card key={venture.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{venture.name}</CardTitle>
                  {getStatusBadge(venture.status)}
                </div>
                <CardDescription>
                  {venture.agentCount} agent{venture.agentCount !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{venture.completionRate}%</span>
                  </div>
                  <Progress value={venture.completionRate} className="h-2" />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" asChild size="sm">
                    <Link href={`/dashboard/ventures/${venture.id}`}>
                      View details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="flex items-center justify-center p-6 border-dashed">
            <Button asChild variant="ghost">
              <Link href="/dashboard/ventures/new" className="flex flex-col items-center">
                <PlusIcon className="h-6 w-6 mb-2" />
                <span>Create New Venture</span>
              </Link>
            </Button>
          </Card>
        </div>
      </div>

      {/* Recent Agents */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Available Agents</h2>
          <Button variant="outline" asChild size="sm">
            <Link href="/dashboard/agents">
              View all
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  {getStatusBadge(agent.status)}
                </div>
                <CardDescription className="capitalize">
                  {agent.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <Button variant="ghost" asChild size="sm">
                    <Link href={`/dashboard/agents/${agent.id}`}>
                      View details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="flex items-center justify-center p-6 border-dashed">
            <Button asChild variant="ghost">
              <Link href="/dashboard/agents/new" className="flex flex-col items-center">
                <PlusIcon className="h-6 w-6 mb-2" />
                <span>Create New Agent</span>
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
} 