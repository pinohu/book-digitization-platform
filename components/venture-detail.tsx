"use client"

import React from "react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Venture, Agent } from "@/types"

export function VentureDetail() {
  const { id } = useParams()
  const [venture, setVenture] = useState<Venture | null>(null)
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVentureData = async () => {
      try {
        const [ventureResponse, agentsResponse] = await Promise.all([
          fetch(`http://localhost:8000/ventures/${id}`),
          fetch(`http://localhost:8000/ventures/${id}/agents`)
        ])

        if (!ventureResponse.ok || !agentsResponse.ok) {
          throw new Error("Failed to fetch venture data")
        }

        const ventureData = await ventureResponse.json()
        const agentsData = await agentsResponse.json()

        setVenture(ventureData)
        setAgents(agentsData)
      } catch (error) {
        console.error("Error fetching venture data:", error)
        setError("Failed to load venture data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchVentureData()
  }, [id])

  if (isLoading) {
    return <div>Loading venture details...</div>
  }

  if (error || !venture) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error || "Venture not found"}</p>
        <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          ← Back to Ventures
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Ventures
        </Link>
        <h1 className="text-3xl font-bold mt-4">{venture.name}</h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm text-gray-500">{venture.industry}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {venture.status}
          </span>
        </div>
        <p className="mt-4 text-gray-700">{venture.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Assigned Agents</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-lg border p-4 hover:border-blue-500 transition-colors"
            >
              <h3 className="text-lg font-semibold">{agent.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{agent.role}</p>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 mt-2 inline-block">
                {agent.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 