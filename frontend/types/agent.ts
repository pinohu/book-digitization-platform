export type AgentGoal = string;

export type AgentTool = string;

export type MemorySchema = {
  vector_store?: string;
  embedding_model?: string;
  chat_history?: string;
  escalation_tags?: string[];
  persona_profile?: string;
  content_trace?: string;
};

export type AgentConfig = {
  goals: AgentGoal[];
  tools: AgentTool[];
  memory_schema: MemorySchema;
};

export type AgentCategory = {
  name: string;
  agents: string[];
};

export type AgentStatus = "active" | "inactive" | "error" | "pending";

export type Agent = {
  id: string;
  name: string;
  category: string;
  status: AgentStatus;
  version: string;
  config: AgentConfig;
  lastActive?: Date;
  metrics?: {
    successRate?: number;
    responseTime?: number;
    errorCount?: number;
  };
}; 