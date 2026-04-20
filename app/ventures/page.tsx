"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard/layout"
import { getVentures, createVenture } from "@/lib/api"
import { Venture } from "@/types"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"

export default function VenturesPage() {
  const [ventures, setVentures] = useState<Venture[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    loadVentures()
  }, [])

  async function loadVentures() {
    try {
      const data = await getVentures()
      setVentures(data)
    } catch (error) {
      console.error("Failed to load ventures:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateVenture() {
    try {
      const newVenture = await createVenture({
        name: "New Venture",
        description: "A new venture created from the dashboard",
        status: "active",
      })
      setVentures([...ventures, newVenture])
      router.push(`/ventures/${newVenture.id}`)
    } catch (error) {
      console.error("Failed to create venture:", error)
    }
  }

  const filteredVentures = ventures.filter(venture =>
    venture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venture.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        <h1 className="text-3xl font-bold">Ventures</h1>
        <Button onClick={handleCreateVenture}>Create New Venture</Button>
      </div>

      <div className="mt-4">
        <Input
          type="search"
          placeholder="Search ventures..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {filteredVentures.map((venture) => (
          <Card key={venture.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{venture.name}</CardTitle>
              <CardDescription>
                {venture.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className={`text-sm font-medium ${
                    venture.status === "active" ? "text-green-500" :
                    venture.status === "paused" ? "text-yellow-500" :
                    "text-red-500"
                  }`}>
                    {venture.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Agents</span>
                  <span className="text-sm font-medium">{venture.agents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <span className="text-sm font-medium">
                    {formatDistanceToNow(new Date(venture.updatedAt))} ago
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => router.push(`/ventures/${venture.id}`)}
              >
                View Details
              </Button>
              <Button onClick={() => router.push(`/ventures/${venture.id}/manage`)}>
                Manage
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
} 