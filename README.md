# AI ∞ OS

The Infinite Operating System for Intelligence, Infrastructure, and Adaptive Empire Creation

## Overview

AI ∞ OS is a cloud-based, multi-agent orchestration platform that empowers users to design, launch, scale, and evolve SaaS ventures autonomously across any industry, geography, or market. It combines cutting-edge large language models, agentic execution frameworks, and business operating logic into a single, continuously evolving interface.

## Project Structure

```
ai-os/
├── frontend/           # Next.js frontend application
├── backend/           # FastAPI backend service
├── agents/           # AI agent implementations
├── shared/           # Shared types and utilities
└── infrastructure/   # Deployment and infrastructure configs
```

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- TailwindCSS
- shadcn/ui
- Clerk.dev (Authentication)

### Backend
- FastAPI
- PostgreSQL (via Supabase)
- Redis
- Celery
- LangChain
- CrewAI

### AI & Agents
- OpenAI GPT-4
- Pinecone (Vector Store)
- LangGraph/CrewAI

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL
- Redis

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
5. Start the development servers:
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   uvicorn backend.main:app --reload
   ```

## Development

- Frontend runs on http://localhost:3000
- Backend API runs on http://localhost:8000
- API documentation available at http://localhost:8000/docs

# AI ∞ OS – Open Source Modular AI Operating System

## What is AI ∞ OS?

AI ∞ OS is a multi-agent, MCP-aware AI operating system that enables persistent memory, automation, and monetization across vertical SaaS, directories, and marketplaces. It is designed for extensibility, security, and global scalability — using fully open-source tools and models.

## Features

- 🔁 Model Context Protocol (MCP) Server for persistent memory
- 🤖 Modular agent system (CrewAI or LangGraph)
- 🧠 Integration with open-source LLMs (via Ollama, vLLM)
- ⚙️ Automated workflow routing with n8n + LangChain
- 🔐 Secure, self-hosted stack using Keycloak, Vault, Redis
- 📊 Observable and deployable via Docker and K3s

## Quickstart

2. Spin up MCP Server:
   - Launch Redis and Weaviate (or Qdrant)
   - Configure vector schema and topic subscriptions

3. Launch your model runner:
   - Start Ollama or vLLM
   - Download and load a supported model (e.g., Mistral 7B)

4. Deploy agents:
   - Use LangGraph or CrewAI config files to initialize agents
   - Connect agents to workflows via FastAPI or LangChain

5. Secure & Deploy:
   - Set up Keycloak for auth
   - Use Docker Compose or K3s for deployment

## License

MIT License. All dependencies are open-source.

## Author

AI ∞ OS • Systemized Intelligence for Global Scale

## Deployment with Coolify

This project uses Coolify for deployment. Coolify is an open-source alternative to platforms like Vercel, providing automated deployments, monitoring, and scaling.

## Setup Instructions

1. **Install Coolify CLI**
   ```bash
   # On Linux/Mac:
   curl -s https://get.coolify.io | bash
   
   # On Windows (PowerShell):
   Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://get.coolify.io/windows'))
   ```

2. **Configure Environment**
   Add these environment variables to your system:
   - `COOLIFY_TOKEN`: Your Coolify API token
   - `COOLIFY_PROJECT_ID`: Your Coolify project ID
   - `NEXT_PUBLIC_API_URL`: Your API URL
   - `DOMAIN`: Your production domain
   - `DATABASE_URL`: Your database connection string

3. **Add GitHub Secrets**
   Add the same variables as secrets to your GitHub repository for CI/CD:
   - `COOLIFY_TOKEN`
   - `COOLIFY_PROJECT_ID`
   - `NEXT_PUBLIC_API_URL`
   - `DOMAIN`
   - `DATABASE_URL`

## Deployment

### Development Environment

```bash
# Using Bash:
./scripts/deploy.sh development

# Using PowerShell:
./scripts/deploy.ps1 development
```

### Production Environment

Production deployments are automated via GitHub Actions when pushing to the main branch. For manual deployment:

```bash
# Using Bash:
./scripts/deploy.sh production

# Using PowerShell:
./scripts/deploy.ps1 production
```

## Configuration Files

- `coolify.json`: Production configuration
- `coolify.development.json`: Development configuration
- `.env.development`: Development environment variables
- `.env.production`: Production environment variables

## Features

- **Cross-Platform Support**: Deploy from Windows, Linux, or macOS
- **Automated Deployments**: Push to main branch triggers automatic deployment
- **Environment Management**: Separate development and production environments
- **Auto Scaling**: Production environment scales based on CPU and memory usage
- **Monitoring**: CPU, memory, and network metrics
- **Backups**: Daily backups with 7-day retention
- **SSL/HTTPS**: Automatic SSL certificate management
- **Health Checks**: Regular health monitoring
- **Logging**: Comprehensive application logs

For more details, see [deployment documentation](docs/deployment.md).
