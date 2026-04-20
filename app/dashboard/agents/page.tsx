"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Agent, AgentStatus } from "@/types/agent"

// Initial demo agents
const initialAgents: Agent[] = [
  {
    id: "1",
    name: "OpsAgent",
    description: "Platform deployment & CI/CD orchestration",
    status: "active",
    currentTask: "Monitoring system health",
    memoryUsage: {
      used: 256,
      total: 512
    },
    lastActive: new Date().toISOString(),
    category: "Core System",
    version: "1.0.0",
    config: {
      goals: ["Monitor system health", "Manage deployments"],
      tools: ["system-monitor", "deployment-manager"],
      memory_schema: {}
    }
  },
  {
    id: "2",
    name: "InfraAgent",
    description: "Cloud provisioning & scaling",
    status: "active",
    currentTask: "Scaling resources",
    memoryUsage: {
      used: 128,
      total: 256
    },
    lastActive: new Date().toISOString(),
    category: "Core System",
    version: "1.0.0",
    config: {
      goals: ["Manage cloud resources", "Optimize scaling"],
      tools: ["cloud-provider", "resource-manager"],
      memory_schema: {}
    }
  },
  {
    id: "3",
    name: "SecAgent",
    description: "Security checks & token audits",
    status: "paused",
    currentTask: "Awaiting tasks",
    memoryUsage: {
      used: 64,
      total: 128
    },
    lastActive: new Date().toISOString(),
    category: "Security & Governance",
    version: "1.0.0",
    config: {
      goals: ["Monitor security", "Audit tokens"],
      tools: ["security-scanner", "token-auditor"],
      memory_schema: {}
    }
  }
]

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)

  const handleToggleAgent = (agentId: string) => {
    setAgents(agents.map(agent => {
      if (agent.id === agentId) {
        const newStatus: AgentStatus = agent.status === "active" ? "paused" : "active"
        return {
          ...agent,
          status: newStatus,
          lastActive: new Date().toISOString()
        }
      }
      return agent
    }))
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Agent Management"
        text="Configure and manage your AI agents"
      >
        <Button asChild>
          <Link href="/dashboard/agents/new">
            <Plus className="mr-2 h-4 w-4" />
            New Agent
          </Link>
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{agent.name}</h3>
                {agent.category && (
                  <p className="text-xs text-muted-foreground">{agent.category}</p>
                )}
              </div>
              <Badge
                variant={
                  agent.status === "active"
                    ? "default"
                    : agent.status === "paused"
                    ? "secondary"
                    : "destructive"
                }
                className="cursor-pointer"
                onClick={() => handleToggleAgent(agent.id)}
              >
                {agent.status}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {agent.description}
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Current Task:</span>{" "}
                {agent.currentTask}
              </p>
              <p className="text-sm">
                <span className="font-medium">Memory Usage:</span>{" "}
                {agent.memoryUsage.used}MB / {agent.memoryUsage.total}MB
              </p>
              <p className="text-sm">
                <span className="font-medium">Last Active:</span>{" "}
                {new Date(agent.lastActive).toLocaleString()}
              </p>
              {agent.version && (
                <p className="text-sm">
                  <span className="font-medium">Version:</span> {agent.version}
                </p>
              )}
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href={`/dashboard/agents/${agent.id}`}>View Details</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
} 