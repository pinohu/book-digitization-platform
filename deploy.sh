#!/bin/bash

echo "🚀 Starting AI ∞ OS Deployment..."

# Step 1: Docker Compose Up
echo "🔧 Bringing up Docker containers..."
docker compose up -d --build

# Step 2: Confirm deployments
echo "📡 Checking container status..."
docker ps

# Step 3: Optional - Run post-deploy checks
echo "✅ Deployment complete. MCP services and agents are initializing."

# Step 4: Reminder
echo "🔒 Don't forget to configure Keycloak and load your LLM into Ollama manually!"
