import { Redis } from 'ioredis';
import { ChromaClient } from 'chromadb';
import { QdrantClient } from '@qdrant/js-client-rest';

export interface MemorySchema {
  vector_store?: string;
  embedding_model?: string;
  chat_history?: string;
  escalation_tags?: string[];
}

export class Memory {
  private schema: MemorySchema;
  private redis?: Redis;
  private chroma?: ChromaClient;
  private qdrant?: QdrantClient;

  constructor(schema: MemorySchema) {
    this.schema = schema;
  }

  async initialize(): Promise<void> {
    if (this.schema.chat_history === 'redis') {
      this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    }

    if (this.schema.vector_store === 'chromadb') {
      this.chroma = new ChromaClient({
        path: process.env.CHROMA_URL || 'http://localhost:8000'
      });
    }

    if (this.schema.vector_store === 'qdrant') {
      this.qdrant = new QdrantClient({
        url: process.env.QDRANT_URL || 'http://localhost:6333'
      });
    }
  }

  async storeChatHistory(sessionId: string, message: any): Promise<void> {
    if (this.redis) {
      await this.redis.lpush(`chat:${sessionId}`, JSON.stringify(message));
    }
  }

  async getChatHistory(sessionId: string, limit: number = 10): Promise<any[]> {
    if (this.redis) {
      const messages = await this.redis.lrange(`chat:${sessionId}`, 0, limit - 1);
      return messages.map(msg => JSON.parse(msg));
    }
    return [];
  }

  async storeVector(collection: string, vector: number[], metadata: any): Promise<void> {
    if (this.chroma) {
      await this.chroma.add(collection, [vector], [metadata]);
    } else if (this.qdrant) {
      await this.qdrant.upsert(collection, {
        points: [{
          id: metadata.id,
          vector,
          payload: metadata
        }]
      });
    }
  }

  async searchVectors(collection: string, query: number[], limit: number = 5): Promise<any[]> {
    if (this.chroma) {
      const results = await this.chroma.query(collection, query, limit);
      return results;
    } else if (this.qdrant) {
      const results = await this.qdrant.search(collection, {
        vector: query,
        limit
      });
      return results;
    }
    return [];
  }
} 