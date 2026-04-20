# Development Roadmap — Book Digitization Platform

> Dynasty Empire Engineering Plan | April 19, 2026

---

## Phase 1: MVP — 2w
**Goal:** Establish the "Image-to-Text" pipeline and transactional payment flow.
**Done when:** A user can pay $5, upload a 10-page book, and read the OCR output in the browser.

| # | Task | Description | Effort | Depends On | Owner |
|---|---|---|---|---|---|
| 1.1 | DB Schema Deploy | Initialize Neon Postgres with Tenant, Book, Page tables. | S | — | Engineering |
| 1.2 | Auth Implementation | Setup NextAuth with [admin, scholar, professional, guest]. | S | — | Engineering |
| 1.3 | Tenant Logic | Implement `tenant_id` middleware for data isolation. | S | 1.1 | Engineering |
| 1.4 | S3 Integration | Implement `/api/v1/upload/signed-url` for direct uploads. | M | 1.1 | Engineering |
| 1.5 | Book Registry UI | Build the `/ingest` form for book metadata. | S | 1.3 | Engineering |
| 1.6 | OCR Pipeline | Build `/api/v1/ocr/process` using OpenAI vision/OCR. | L | 1.4 | Engineering |
| 1.7 | Stripe Integration | Implement checkout session for $5/book payment. | M | — | Engineering |
| 1.8 | Payment Webhook | Link Stripe payment success to OCR trigger. | S | 1.6, 1.7 | Engineering |
| 1.9 | Basic Reader UI | Build `/reader/[bookId]` to display text by page. | M | 1.6 | Engineering |
| 1.10 | Landing Page | Deploy high-conversion landing page for partners. | S | — | Design |
| 1.11 | Deployment | Configure Vercel production environment. | S | — | Engineering |
| 1.12 | Smoke Test | End-to-end test: Pay $\to$ Upload $\to$ OCR $\to$ Read. | S | All | Engineering |

**Phase 1 Exit Criteria:**
- [ ] All P0 features pass acceptance criteria
- [ ] CI/CD pipeline green
- [ ] Production deployment verified
- [ ] First book successfully digitized via Stripe payment

---

## Phase 2: Core Features (Weeks 3-6)
**Goal:** Transition from a "Reader" to a "Research Tool" via hybrid search.
**Gate:** Phase 1 exit criteria met + 10 books digitized.

| # | Task | Description | Effort | Business Impact |
|---|---|---|---|---|
| 2.1 | pgvector Setup | Enable `vector` extension in Neon Postgres. | S | Foundation for Search |
| 2.2 | Embedding Pipeline | Auto-generate embeddings for every processed page. | M | Enables Semantic Search |
| 2.3 | Hybrid Search API | Implement `/api/v1/search` (Keyword + Vector). | L | 10x Scholar Efficiency |
| 2.4 | Citation System | Build POST/GET `/api/v1/citations` for scholar notes. | M | Increases User Retention |
| 2.5 | Dashboard UI | Build `/dashboard` for tenant book management. | M | Operational Scalability |
| 2.6 | Subscription Tier | Implement monthly credits for high-volume partners. | M | Recurring Revenue |
| 2.7 | Error Correction UI | Build inline text editor for OCR verification. | L | Ensures 100% Accuracy |
| 2.8 | PDF Export | Allow exporting digitized books to searchable PDF. | M | Value-add for users |
| 2.9 | Metadata Expansion | Add fields for volume, edition, and publication year. | S | Academic Rigor |
| 2.10 | Performance Tuning | Optimize S3 image loading with Next.js Image component. | S | UX Polish |

---

## Phase 3: Growth & Polish (Weeks 7-10)
**Goal:** Production hardening and partner onboarding automation.
**Gate:** Phase 2 complete + $1,000 MRR.

| # | Task | Category | Effort |
|---|---|---|---|
| 3.1 | Batch Uploads | Performance | M |
| 3.2 | Advanced Analytics | GTM | S |
| 3.3 | Multi-tenant Subdomains | Infrastructure | M |
| 3.4 | Automated QA Alerts | Reliability | S |
| 3.5 | Scholar Collaboration | Feature | L |
| 3.6 | API Documentation | Developer Exp | S |
| 3.7 | Accessibility Audit | Compliance | S |
| 3.8 | SEO for Public Archives | Growth | M |

---

## Phase 4: Scale (Post-launch)
**Goal:** 10x growth infrastructure.
**Gate:** $5,000 MRR + 5 Active Tenants.

| # | Initiative | Expected Impact | Investment |
|---|---|---|---|
| 4.1 | Distributed OCR | Reduce processing time for 1,000+ page books. | L |
| 4.2 | Institutional API | Open the archive to university library systems. | XL |
| 4.3 | AI Thematic Indexing | Auto-generate "Table of Contents" via LLM. | L |
| 4.4 | Cold Storage Migration | Move old images to S3 Glacier to reduce costs. | M |
| 4.5 | Multi-language OCR | Expand to Latin and French Catholic texts. | L |
| 4.6 | Enterprise SSO | Enable SAML/Okta for large institutions. | M |

---

## Resource Requirements
| Phase | Engineering | Design | Business | Duration |
|---|---|---|---|---|
| Phase 1 | 2 FTE | 0.5 FTE | 1 FTE | 2 weeks |
| Phase 2 | 2 FTE | 0.5 FTE | 1 FTE | 4 weeks |
| Phase 3 | 1 FTE | 0.5 FTE | 1 FTE | 4 weeks |
| Phase 4 | 2 FTE | 1 FTE | 1 FTE | Ongoing |

## Technology Decision Log
| Decision | Options Considered | Chosen | Rationale |
|---|---|---|---|
| Vector DB | Pinecone vs pgvector | pgvector | Keep metadata and embeddings in one ACID DB; lower complexity. |
| Upload Strategy | API Proxy vs Presigned URLs | Presigned URLs | Offload large image files from Node.js API to AWS S3. |
| OCR Engine | Tesseract vs OpenAI | OpenAI | Higher accuracy for complex, aged fonts in Catholic Classics. |
| Multi-tenancy | Separate DBs vs `tenant_id` | `tenant_id` | Easier to manage migrations and scale for hundreds of small tenants. |
| Search Logic | Keyword vs RAG | RAG-first | Verbatim accuracy is required for theological citations. |