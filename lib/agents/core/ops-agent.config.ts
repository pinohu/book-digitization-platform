import { AgentConfig } from '../base-agent';

export const opsAgentConfig: AgentConfig = {
  name: 'ops-agent',
  description: 'Core system agent responsible for deployment, scaling, and monitoring of services',
  goals: [
    'Deploy and manage containerized services',
    'Scale services based on demand',
    'Monitor service health and performance',
    'Maintain system stability and availability'
  ],
  tools: [
    'docker',
    'monitoring'
  ],
  memory_schema: {
    vector_store: 'chroma:ops_agent',
    embedding_model: 'openai:text-embedding-ada-002',
    chat_history: 'redis:ops_agent:chat',
    escalation_tags: ['critical', 'high', 'medium', 'low']
  }
}; 