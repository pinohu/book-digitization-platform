#!/bin/bash

echo "🔍 Starting Vector DB Initialization..."

# Qdrant Initialization (via HTTP)
curl -X PUT "http://localhost:6333/collections/agent_memories" -H "Content-Type: application/json" -d '{
  "vectors": {
    "size": 768,
    "distance": "Cosine"
  }
}'

echo "✅ Qdrant collection 'agent_memories' initialized."
