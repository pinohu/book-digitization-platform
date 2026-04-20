# 🧠 AI ∞ OS – Agent Catalog

## Core System Agents

| Agent Name        | Purpose                                         | Notes                                           |
|------------------|--------------------------------------------------|-------------------------------------------------|
| OpsAgent         | Platform deployment & CI/CD orchestration       | Ties into GitHub Actions, Terraform             |
| InfraAgent       | Cloud provisioning & scaling                    | Supports Docker, K3s, AWS/GCP                   |
| SecAgent         | Security checks, token audits                   | Keycloak + Vault integration                    |
| DevAgent         | Code generation, unit testing, documentation    | Integrated with LangChain & IDE tools           |
| PromptAgent      | Prompt generation & optimization                | Stores prompt templates in MCP                  |
| SchedulerAgent   | Task and agent execution timing                 | For cron-like or event-based scheduling         |

## Business Logic Agents

| Agent Name         | Purpose                                          | Notes                                       |
|-------------------|--------------------------------------------------|---------------------------------------------|
| StrategyAgent     | Growth planning, monetization modeling           | Revenue simulation, GTM planning            |
| RevenueAgent      | Pricing logic, upgrade offers                    | Works with Stripe, SuiteDash                |
| BillingAgent      | Invoice generation, transaction audit            | SuiteDash, ERPNext compatible               |
| AccountAgent      | Client segmentation, relationship lifecycle      | Long-term MCP memory of each account        |
| FranchiseAgent    | Licensing automation, multi-region rollout       | Supports replicable directory SaaS          |

## Marketing & Growth Agents

| Agent Name        | Purpose                                         | Notes                                            |
|------------------|--------------------------------------------------|--------------------------------------------------|
| CampaignAgent    | Launches ad/email/SMS campaigns                 | Uses n8n, VBout, or custom stack                 |
| SEOAgent         | Content strategy, keyword audits                | Connects to Plerdy, Google Search Console       |
| InfluenceAgent   | Influencer discovery & outreach                 | Works with social API hooks                     |
| ReferralAgent    | Viral loop management                           | UpViral-like behavior + MCP tracking            |
| AnalyticsAgent   | Tracks conversions, engagement, heatmaps        | Plerdy, HappierLeads, VBout integration         |

## Sales & Support Agents

| Agent Name       | Purpose                                         | Notes                                       |
|-----------------|--------------------------------------------------|---------------------------------------------|
| SalesAgent      | CRM flow, pitch generation, deal closing         | Personalized outreach from memory context   |
| OutboundAgent   | Cold outreach via SMS/email/voicemail            | Works with TextLink, Thoughtly, Zapier      |
| SupportAgent    | FAQ, live chat routing, escalation                | Connects to chatbots, CRM systems           |
| RetentionAgent  | Monitors churn risk, re-engages leads            | Behavior-aware sequences                    |
| FeedbackAgent   | Manages NPS, feedback forms, review logic        | MCP stores satisfaction and rating history  |

## Knowledge & Content Agents

| Agent Name      | Purpose                                         | Notes                                        |
|----------------|--------------------------------------------------|----------------------------------------------|
| ContentAgent   | Blog/landing page generation                    | Localized SEO, AI-powered writing           |
| VideoAgent     | Video script/storyboard generation              | Integrated with AI video tools              |
| SOPAgent       | Internal documentation generator                | Converts operational knowledge to SOPs      |
| TrainingAgent  | Course and onboarding content creation          | Employee or customer training               |
| NarrativeAgent | Brand storytelling & identity modeling          | Alignment across all outbound comms         |

## Domain-Specific Agents

| Agent Name         | Purpose                                      | Notes                                      |
|-------------------|-----------------------------------------------|--------------------------------------------|
| ProviderAgent      | Onboards and manages service providers       | Verifies, scores, configures listings      |
| LeadRouterAgent    | Lead qualification and assignment            | Based on geo, service type, availability   |
| ComplianceAgent    | Regulatory enforcement and audits            | Tailored per industry                      |
| ReviewAgent        | Moderates and summarizes reviews             | Flags abuse, aggregates sentiment          |

## Open Source MCP Servers

| Tool       | Function            | Description                                     |
|------------|---------------------|-------------------------------------------------|
| Weaviate   | Vector DB           | Self-hosted, module-extensible, GraphQL support |
| Qdrant     | Vector DB           | REST/gRPC API, fast similarity search           |
| Milvus     | Scalable Vector DB  | Supports large-scale indexing and retrieval     |
| Redis      | Cache + pub/sub     | Real-time comms + session store                 |
| PostgreSQL + pgvector | Hybrid storage | SQL + vector search in one layer              |
| ChromaDB   | Lightweight memory  | Local, ideal for small RAG flows                |
| Zep        | Chat memory API     | Built-in long-term chat memory for agents       |
