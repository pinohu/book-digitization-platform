"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard/layout"
import { getAgents, updateAgentStatus } from "@/lib/api"
import { Agent } from "../../types/agent"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadAgents()
  }, [])

  async function loadAgents() {
    try {
      const data = await getAgents()
      setAgents(data)
    } catch (error) {
      console.error("Failed to load agents:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(agentId: string, newStatus: "active" | "paused" | "terminated") {
    try {
      const updatedAgent = await updateAgentStatus(agentId, newStatus)
      setAgents(agents.map(agent => 
        agent.id === agentId ? updatedAgent : agent
      ))
    } catch (error) {
      console.error("Failed to update agent status:", error)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agents</h1>
        <Button onClick={() => router.push("/agents/new")}>Create New Agent</Button>
      </div>

      <div className="grid gap-4 mt-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{agent.name}</CardTitle>
                  <CardDescription>
                    {agent.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${
                    agent.status === "active" ? "bg-green-500" :
                    agent.status === "paused" ? "bg-yellow-500" :
                    "bg-red-500"
                  }`} />
                  <span className="text-sm text-muted-foreground">{agent.status}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="text-sm font-medium">Current Task</h4>
                  <p className="text-sm text-muted-foreground">
                    {agent.currentTask}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Memory Usage</h4>
                  <p className="text-sm text-muted-foreground">
                    {agent.memoryUsage.used} GB / {agent.memoryUsage.total} GB
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Last Active</h4>
                  <p className="text-sm text-muted-foreground">
                    {agent.lastActive ? formatDistanceToNow(new Date(agent.lastActive)) : "Never"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => router.push(`/agents/${agent.id}`)}
              >
                View Details
              </Button>
              <div className="flex gap-2">
                {agent.status === "active" ? (
                  <Button 
                    variant="outline"
                    onClick={() => handleStatusChange(agent.id, "paused")}
                  >
                    Pause
                  </Button>
                ) : agent.status === "paused" ? (
                  <Button 
                    variant="outline"
                    onClick={() => handleStatusChange(agent.id, "active")}
                  >
                    Resume
                  </Button>
                ) : null}
                <Button 
                  variant="destructive"
                  onClick={() => handleStatusChange(agent.id, "terminated")}
                >
                  Terminate
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
} 