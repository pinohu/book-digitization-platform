export interface Venture {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "terminated"
  agents: number
  createdAt: string
  updatedAt: string
}

export interface Agent {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "terminated"
  currentTask: string
  memoryUsage: {
    used: number
    total: number
  }
  lastActive: string
}

export interface Activity {
  id: string
  type: string
  description: string
  timestamp: string
  metadata?: Record<string, any>
} 