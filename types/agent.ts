export type AgentStatus = "active" | "inactive" | "paused" | "terminated"

export type AgentConfig = {
  goals: string[]
  tools: string[]
  memory_schema: Record<string, any>
}

export type Agent = {
  id: string
  name: string
  description: string
  status: AgentStatus
  currentTask: string
  memoryUsage: {
    used: number
    total: number
  }
  lastActive: string
  category?: string
  version?: string
  config?: AgentConfig
} 