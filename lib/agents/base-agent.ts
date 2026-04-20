import { VectorStore } from 'langchain/vectorstores/base';
import { Embeddings } from 'langchain/embeddings/base';
import { Memory } from './memory';

export interface AgentConfig {
  name: string;
  description: string;
  goals: string[];
  tools: string[];
  memory_schema: {
    vector_store?: string;
    embedding_model?: string;
    chat_history?: string;
    escalation_tags?: string[];
  };
}

export abstract class BaseAgent {
  protected config: AgentConfig;
  protected vectorStore?: VectorStore;
  protected embeddings?: Embeddings;
  protected memory: Memory;

  constructor(config: AgentConfig) {
    this.config = config;
    this.memory = new Memory(config.memory_schema);
  }

  abstract initialize(): Promise<void>;
  abstract execute(input: any): Promise<any>;

  protected async loadTools(): Promise<void> {
    // Load and initialize tools based on config
  }

  protected async setupMemory(): Promise<void> {
    // Setup memory based on schema
  }

  protected async validateInput(input: any): Promise<boolean> {
    // Validate input based on agent requirements
    return true;
  }

  protected async handleError(error: Error): Promise<void> {
    // Handle errors based on agent requirements
    console.error(`Error in ${this.config.name}:`, error);
  }
} 