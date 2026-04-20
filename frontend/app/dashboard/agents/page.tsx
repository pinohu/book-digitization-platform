"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, SettingsIcon, PlayIcon, PauseIcon } from "@radix-ui/react-icons"
import { AgentDialog } from "@/components/agents/agent-dialog"
import { Agent } from "@/types/agent"

// Agent categories based on the catalog
const agentCategories = [
  {
    name: "Core System",
    agents: [
      "OpsAgent", "InfraAgent", "SecAgent", "DevAgent", "PromptAgent",
      "SchedulerAgent", "RunnerAgent", "CacheAgent", "TelemetryAgent", "ConfigAgent"
    ]
  },
  {
    name: "Business Logic",
    agents: [
      "StrategyAgent", "PricingAgent", "ForecastAgent", "RevenueAgent",
      "BillingAgent", "LicensingAgent", "PartnerAgent"
    ]
  },
  {
    name: "Marketing & Growth",
    agents: [
      "CampaignAgent", "SEOAgent", "InfluenceAgent", "ReferralAgent",
      "LeadMagnetAgent", "PromoAgent", "AnalyticsAgent", "AttributionAgent"
    ]
  },
  {
    name: "Sales & Support",
    agents: [
      "SalesAgent", "DemoAgent", "CRMBridgeAgent", "SupportAgent",
      "EscalationAgent", "ChurnAgent", "UpsellAgent", "SurveyAgent"
    ]
  },
  {
    name: "Knowledge & Content",
    agents: [
      "ContentAgent", "NarrativeAgent", "SOPAgent", "TrainingAgent",
      "CourseAgent", "VoiceAgent", "VideoAgent", "MemoryCuratorAgent"
    ]
  },
  {
    name: "Domain-Specific",
    agents: [
      "ProviderAgent", "GeoRouterAgent", "ServiceMapAgent", "AvailabilityAgent",
      "QuoteAgent", "ReviewAgent", "ComplianceAgent", "VerificationAgent",
      "ListingAgent", "CoverageAgent"
    ]
  },
  {
    name: "Experimental",
    agents: [
      "ExperimentAgent", "ModelAgent", "BehaviorLoopAgent", "PersonaForgeAgent",
      "ReplayAgent", "PrototypeAgent", "ConceptAgent"
    ]
  },
  {
    name: "Security & Governance",
    agents: [
      "AuditAgent", "PolicyAgent", "VaultAgent", "SentryAgent",
      "FailoverAgent", "LifecycleAgent", "ComplianceCheckAgent", "ErrorHandlerAgent"
    ]
  }
]

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])

  const handleCreateAgent = (agentData: Omit<Agent, "id">) => {
    const newAgent: Agent = {
      ...agentData,
      id: Math.random().toString(36).substr(2, 9),
    }
    setAgents([...agents, newAgent])
  }

  const handleUpdateAgent = (updatedAgent: Agent) => {
    setAgents(agents.map(agent => 
      agent.id === updatedAgent.id ? updatedAgent : agent
    ))
  }

  const handleToggleAgent = (agentId: string) => {
    setAgents(agents.map(agent => {
      if (agent.id === agentId) {
        return {
          ...agent,
          status: agent.status === "active" ? "inactive" : "active"
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
        <AgentDialog onSave={handleCreateAgent}>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Agent
          </Button>
        </AgentDialog>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agentCategories.map((category) => (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>
                {category.agents.length} agents available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.agents.map((agentName) => {
                  const agent = agents.find(a => a.name === agentName)
                  return (
                    <div
                      key={agentName}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{agentName}</p>
                        <div className="flex gap-2">
                          <Badge variant={agent?.status === "active" ? "default" : "outline"}>
                            {agent?.status || "inactive"}
                          </Badge>
                          <Badge variant="secondary">
                            {agent?.version || "v1.0.0"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {agent ? (
                          <>
                            <AgentDialog agent={agent} onSave={handleUpdateAgent}>
                              <Button variant="ghost" size="icon">
                                <SettingsIcon className="h-4 w-4" />
                              </Button>
                            </AgentDialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleAgent(agent.id)}
                            >
                              {agent.status === "active" ? (
                                <PauseIcon className="h-4 w-4" />
                              ) : (
                                <PlayIcon className="h-4 w-4" />
                              )}
                            </Button>
                          </>
                        ) : (
                          <AgentDialog
                            onSave={handleCreateAgent}
                            agent={{
                              id: "",
                              name: agentName,
                              category: category.name,
                              status: "inactive",
                              version: "1.0.0",
                              config: {
                                goals: [],
                                tools: [],
                                memory_schema: {},
                              },
                            }}
                          >
                            <Button variant="ghost" size="icon">
                              <SettingsIcon className="h-4 w-4" />
                            </Button>
                          </AgentDialog>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
} 