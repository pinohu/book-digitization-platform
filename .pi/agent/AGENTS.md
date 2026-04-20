# Pi Agent Config — Book Digitization Platform
# This file is auto-loaded by Pi Agent at startup.
# It mirrors the root AGENTS.md for Pi compatibility.

Read CLAUDE.md first. It contains all project conventions.
Then read SPEC.md for the feature spec.
Then read DESIGN.md for visual design rules.

## Project Type: AI Platform for Document Digitization (ai-platform)
## Stack: Next.js, Node.js, Express, PostgreSQL, AWS S3, OpenAI OCR, TailwindCSS
## Revenue: transactional at $5/book

## Key Files
- BUSINESS-SYSTEM.md — Business strategy and competitive positioning
- REVENUE-MODEL.md — Revenue projections and unit economics
- GTM-PLAYBOOK.md — Go-to-market strategy and channels
- AGENT-SYSTEM.md — AI agent architecture and workflows
- backend/main.py — FastAPI backend entry point
- docs/API-CONTRACTS.md — API endpoint specifications
- docs/DATA-MODEL.md — Database schema and relationships
- docs/GOV-READINESS.md — Optional U.S. public-sector channel checklist (informational; verify on SAM/USASpending/SBA)

## Tools Available
- read, write, edit, bash (Pi defaults)
- Docker: `docker-compose up -d` for backend
- Vercel: `vercel --prod` for frontend deploys

## Dynasty Conventions
- All colors from DESIGN.md (never hardcode)
- TypeScript strict mode
- Server components by default
- Conventional commits (feat:, fix:, docs:)
