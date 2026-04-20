"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AgentConfigForm } from "./agent-config-form"
import { Agent, AgentConfig } from "@/types/agent"

interface AgentDialogProps {
  agent?: Agent
  onSave: (agent: Omit<Agent, "id">) => void
  children: React.ReactNode
}

export function AgentDialog({ agent, onSave, children }: AgentDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(agent?.name || "")
  const [category, setCategory] = useState(agent?.category || "")
  const [config, setConfig] = useState<AgentConfig>(agent?.config || {
    goals: [],
    tools: [],
    memory_schema: {},
  })

  const categories = [
    "Core System",
    "Business Logic",
    "Marketing & Growth",
    "Sales & Support",
    "Knowledge & Content",
    "Domain-Specific",
    "Experimental",
    "Security & Governance",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name,
      category,
      status: agent?.status || "inactive",
      version: agent?.version || "1.0.0",
      config,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{agent ? "Edit Agent" : "Create New Agent"}</DialogTitle>
            <DialogDescription>
              {agent
                ? "Update your agent's configuration"
                : "Configure a new agent for your system"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter agent name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Configuration</Label>
              <AgentConfigForm
                initialConfig={config}
                onSubmit={(newConfig) => setConfig(newConfig)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Agent</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 