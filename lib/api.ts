import { Venture, Agent, Activity } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function getVentures(): Promise<Venture[]> {
  const response = await fetch(`${API_URL}/api/ventures`)
  if (!response.ok) throw new Error("Failed to fetch ventures")
  return response.json()
}

export async function getAgents(): Promise<Agent[]> {
  const response = await fetch(`${API_URL}/api/agents`)
  if (!response.ok) throw new Error("Failed to fetch agents")
  return response.json()
}

export async function getActivities(): Promise<Activity[]> {
  const response = await fetch(`${API_URL}/api/activities`)
  if (!response.ok) throw new Error("Failed to fetch activities")
  return response.json()
}

export async function createVenture(data: Partial<Venture>): Promise<Venture> {
  const response = await fetch(`${API_URL}/api/ventures`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to create venture")
  return response.json()
}

export async function updateAgentStatus(id: string, status: "active" | "paused" | "terminated"): Promise<Agent> {
  const response = await fetch(`${API_URL}/api/agents/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
  if (!response.ok) throw new Error("Failed to update agent status")
  return response.json()
} 