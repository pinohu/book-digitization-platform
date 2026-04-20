# AGENTS.md — Book Digitization Platform
## Quick Start
Read START-HERE.md first, then: DESIGN.md → CLAUDE.md → SPEC.md → AGENT-SYSTEM.md

## Compatible Agents
- **Claude Code**: `gh repo clone pinohu/book-digitization-platform && cd book-digitization-platform && claude`
- **Pi Agent**: `gh repo clone pinohu/book-digitization-platform && cd book-digitization-platform && pi`
- Pi users: `pi install npm:@mariozechner/pi-coding-agent` if not installed

## Git Config
```
git config user.email "you@example.com"
git config user.name "your-username"
```

## Backend
`docker-compose up -d`

## Deployment
```bash
# 1. Copy environment template and fill in your keys
cp .env.example .env.local

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev

# 4. Deploy to Vercel
npx vercel --prod
```

See MANUAL-ACTIONS.md for service-specific setup (auth, payments, database).

## Safety
- Feature branches only
- No prod DB writes without task spec
- Run tests before pushing

## Skills (Pi Agent)
This project includes a `.pi/` directory with Dynasty-specific skills.
Pi will auto-load project instructions from this AGENTS.md on startup.
