"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AgentConfig } from "@/types/agent"

const formSchema = z.object({
  goals: z.array(z.string()),
  tools: z.array(z.string()),
  memory_schema: z.object({
    vector_store: z.string().optional(),
    embedding_model: z.string().optional(),
    chat_history: z.string().optional(),
    escalation_tags: z.array(z.string()).optional(),
    persona_profile: z.string().optional(),
    content_trace: z.string().optional(),
  }),
})

interface AgentConfigFormProps {
  initialConfig?: AgentConfig
  onSubmit: (config: AgentConfig) => void
}

export function AgentConfigForm({ initialConfig, onSubmit }: AgentConfigFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialConfig || {
      goals: [],
      tools: [],
      memory_schema: {},
    },
  })

  const [goals, setGoals] = useState<string[]>(initialConfig?.goals || [])
  const [tools, setTools] = useState<string[]>(initialConfig?.tools || [])
  const [newGoal, setNewGoal] = useState("")
  const [newTool, setNewTool] = useState("")

  const addGoal = () => {
    if (newGoal && !goals.includes(newGoal)) {
      const updatedGoals = [...goals, newGoal]
      setGoals(updatedGoals)
      form.setValue("goals", updatedGoals)
      setNewGoal("")
    }
  }

  const addTool = () => {
    if (newTool && !tools.includes(newTool)) {
      const updatedTools = [...tools, newTool]
      setTools(updatedTools)
      form.setValue("tools", updatedTools)
      setNewTool("")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="goals"
          render={() => (
            <FormItem>
              <FormLabel>Agent Goals</FormLabel>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input value={goal} readOnly />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        const newGoals = goals.filter((_, i) => i !== index)
                        setGoals(newGoals)
                        form.setValue("goals", newGoals)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="New goal"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                  />
                  <Button type="button" onClick={addGoal}>
                    Add Goal
                  </Button>
                </div>
              </div>
              <FormDescription>
                Define what this agent should accomplish
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tools"
          render={() => (
            <FormItem>
              <FormLabel>Tools</FormLabel>
              <div className="space-y-4">
                {tools.map((tool, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input value={tool} readOnly />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        const newTools = tools.filter((_, i) => i !== index)
                        setTools(newTools)
                        form.setValue("tools", newTools)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="New tool"
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                  />
                  <Button type="button" onClick={addTool}>
                    Add Tool
                  </Button>
                </div>
              </div>
              <FormDescription>
                Select the tools this agent can use
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memory_schema.vector_store"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vector Store</FormLabel>
              <FormControl>
                <Input placeholder="e.g., qdrant" {...field} />
              </FormControl>
              <FormDescription>
                The vector database to use for embeddings
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memory_schema.embedding_model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Embedding Model</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., sentence-transformers/all-MiniLM-L6-v2"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The model to use for generating embeddings
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Configuration</Button>
      </form>
    </Form>
  )
} 