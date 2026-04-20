# 🚀 Start Here — Book Digitization Platform

> **Read this first.** Everything you need to go from this repo to a live production application.

---

## Step 1: Clone & Install

```bash
gh repo clone pinohu/book-digitization-platform
cd book-digitization-platform
npm install
```

## Step 2: Set Up Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.example` — each variable has a comment explaining where to get it:

| Service | Dashboard | What to copy |
|---------|-----------|-------------|
| **Clerk** (auth) | [dashboard.clerk.com](https://dashboard.clerk.com) | Publishable key + Secret key |
| **Stripe** (payments) | [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) | Publishable key + Secret key |
| **Neon** (database) | [console.neon.tech](https://console.neon.tech) | Pooled connection string |

## Step 3: Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) — you should see your landing page.

## Step 4: Deploy to Production

**Option A: Vercel CLI**
```bash
npx vercel --prod
```

**Option B: Git-connected (recommended)**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import this GitHub repo
3. Add your environment variables from `.env.local`
4. Deploy — every future `git push` auto-deploys

## Step 5: Post-Deploy Configuration

See **[MANUAL-ACTIONS.md](./MANUAL-ACTIONS.md)** for service-specific setup:
- Stripe webhook endpoint → `your-domain/api/webhooks/stripe`
- Clerk redirect URLs → your production domain
- Database migrations (if applicable)

---

## Your Repository Map

| File | What it does |
|------|-------------|
| **START-HERE.md** | You are here — setup guide |
| **[.env.example](./.env.example)** | Every environment variable you need, with dashboard URLs |
| **[MANUAL-ACTIONS.md](./MANUAL-ACTIONS.md)** | Service-by-service configuration steps |
| **[SPEC.md](./SPEC.md)** | Full product specification |
| **[DESIGN.md](./DESIGN.md)** | Visual design system |
| **[CLAUDE.md](./CLAUDE.md)** | AI agent project instructions |
| **[AGENTS.md](./AGENTS.md)** | Quick start for AI coding agents |
| **[ROADMAP.md](./ROADMAP.md)** | Development phases and priorities |
| **[BUSINESS-SYSTEM.md](./BUSINESS-SYSTEM.md)** | Strategic business architecture |
| **[REVENUE-MODEL.md](./REVENUE-MODEL.md)** | Revenue projections and unit economics |
| **[GTM-PLAYBOOK.md](./GTM-PLAYBOOK.md)** | Go-to-market strategy |
| **[FAILURE-MODES.md](./FAILURE-MODES.md)** | Risk analysis and recovery plans |
| **[docs/API-CONTRACTS.md](./docs/API-CONTRACTS.md)** | API endpoint specifications |
| **[docs/DATA-MODEL.md](./docs/DATA-MODEL.md)** | Database schema documentation |
| **[LAUNCH-PLAYBOOK.md](./LAUNCH-PLAYBOOK.md)** | 90-day launch plan |

## Need Help?

- **Technical issues**: Open a GitHub Issue on this repo
- **AI agent help**: Run `claude` in the repo root — it reads CLAUDE.md automatically
- **Upgrade your build**: Visit [yourdeputy.com](https://yourdeputy.com) to add integrations

---

*Built by [Your Deputy](https://yourdeputy.com) · April 20, 2026*
