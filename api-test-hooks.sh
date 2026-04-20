#!/bin/bash

echo "📡 Running API Post-Deploy Checks..."

curl -X GET http://localhost:8000/health || echo "❌ API Healthcheck Failed"
curl -X POST http://localhost:8000/agent/ping -d '{"agent_id": "support-agent"}' -H "Content-Type: application/json" || echo "❌ Agent Ping Failed"

echo "✅ Basic API endpoint checks complete."
