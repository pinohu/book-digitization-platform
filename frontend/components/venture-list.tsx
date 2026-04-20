"use client"

import React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Venture } from "@/types"

export function VentureList() {
  const [ventures, setVentures] = useState<Venture[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchVentures = async () => {
      try {
        const response = await fetch("http://localhost:8000/ventures")
        if (!response.ok) {
          throw new Error("Failed to fetch ventures")
        }
        const data = await response.json()
        setVentures(data)
      } catch (error) {
        console.error("Error fetching ventures:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVentures()
  }, [])

  if (isLoading) {
    return <div>Loading ventures...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ventures.map((venture) => (
        <div
          key={venture.id}
          className="rounded-lg border p-4 hover:border-blue-500 transition-colors"
        >
          <h3 className="text-lg font-semibold">{venture.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{venture.industry}</p>
          <p className="text-sm mt-2 line-clamp-2">{venture.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
              {venture.status}
            </span>
            <Link
              href={`/ventures/${venture.id}`}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
} 