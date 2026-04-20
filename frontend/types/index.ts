export interface Venture {
  id: string
  name: string
  description: string
  industry: string
  status: string
  created_at: string
  updated_at: string
}

export interface Agent {
  id: string
  name: string
  role: string
  status: string
  created_at: string
  updated_at: string
}

export interface FunnelData {
  id: string
  venture_id: string
  data: {
    stages: string[]
    metrics: {
      [key: string]: number
    }
  }
  created_at: string
  updated_at: string
}

export interface GrowthPlan {
  id: string
  venture_id: string
  data: {
    goals: string[]
    strategies: string[]
    metrics: {
      [key: string]: number
    }
  }
  created_at: string
  updated_at: string
} 