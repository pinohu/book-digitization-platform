# Product Requirements Document — Book Digitization Platform

> Dynasty Empire Product Specification | April 19, 2026

---

## Executive Summary
The Book Digitization Platform is a specialized AI-driven pipeline designed to transition the physical Catholic Classics library of the Criterion Educational Foundation into a high-fidelity digital archive. Current digitization efforts for sacred and academic texts are either prohibitively slow (manual transcription) or lack the verbatim precision required for theological scholarship. By implementing a RAG-first OCR architecture, the platform will enable the digitization of thousands of volumes at a transactional cost of $5/book, targeting a 12-month revenue goal of $75,000 through strategic partnership volumes.

---

## 1. Product Vision & Strategy

### 1.1 Vision Statement
Transform the preservation of Catholic intellectual heritage by reducing the book-to-digital pipeline from weeks of manual effort to under 30 minutes of automated processing, ensuring 100% verbatim accuracy for academic citation.

### 1.2 Strategic Context
This product serves as a high-margin, niche-specialized entry into the religious archiving market. By leveraging a multi-tenant architecture, Origin Eyes Inc. can scale this solution from the Criterion Educational Foundation to other global religious publishing houses, utilizing the "Cornered Resource" of specialized Catholic texts to build a moat of high-authority data.

---

## 2. Target Users

### 2.1 Primary Persona: Foundation Archivist
| Attribute | Detail |
|---|---|
| **Demographics** | 35-60, Administrator, Criterion Educational Foundation, Nigeria |
| **Goals** | Preserve physical classics, enable global digital access, maintain textual integrity |
| **Frustrations** | High cost of manual typing, degradation of physical pages, lack of searchable index |
| **Quote** | "These texts are sacred; a single AI hallucination in a theological citation is unacceptable." |
| **Success Metric** | Number of books fully digitized and verified per month |

### 2.2 Secondary Persona: Catholic Scholar
| Attribute | Detail |
|---|---|---|
| **Demographics** | 25-70, PhD/Theologian, Global Academic Institutions |
| **Goals** | Rapidly locate specific passages across multiple volumes, generate accurate citations |
| **Frustrations** | Time spent flipping through physical indices, inability to search across collections |
| **Quote** | "I need to find every mention of 'Thomistic ethics' across five different volumes instantly." |
| **Success Metric** | Time to locate a specific verbatim quote (Target: <10 seconds) |

### 2.3 Anti-Persona (Who This Is NOT For)
General e-book publishers or mass-market digitizers who prioritize quantity over verbatim accuracy. This platform is not for "summarization" services; it is for high-fidelity academic preservation.

---

## 3. Feature Specification

### 3.1 P0 — MVP (2w)

| # | Feature | User Story | Acceptance Criteria | Effort | Dependencies |
|---|---|---|---|---|---|
| 1 | Multi-tenant Onboarding | As an admin, I want to create a tenant for Criterion so that data is isolated. | Given a registration request, When submitted, Then a unique subdomain and `tenant_id` are generated. | S | None |
| 2 | Book Metadata Entry | As an archivist, I want to register a physical book's title and ISBN. | Given the dashboard, When a book is added, Then a `Book` record is created in Postgres. | S | #1 |
| 3 | S3 Direct Upload | As an archivist, I want to upload page images directly to S3. | Given a book ID, When requesting an upload, Then the API returns a signed URL for direct S3 upload. | M | #2, AWS S3 |
| 4 | AI OCR Pipeline | As a system, I want to process images into text using OpenAI OCR. | Given an S3 URL, When `ocr/process` is called, Then `content_text` is extracted and stored in the `Page` table. | M | #3, OpenAI |
| 5 | Verbatim Reader | As a scholar, I want to read the digitized text alongside the page number. | Given a `bookId`, When the reader is opened, Then the system renders text mapped to `page_number`. | M | #4 |
| 6 | Transactional Billing | As a user, I want to pay $5 per book to initiate digitization. | Given a book upload, When the payment is confirmed via Stripe, Then the OCR process is unlocked. | M | Stripe |

### 3.2 P1 — Growth Phase
| # | Feature | Value Proposition | Estimated Effort | Target Release |
|---|---|---|---|---|
| 7 | Hybrid Vector Search | Enable semantic search across the entire library using `pgvector`. | L | Week 4 |
| 8 | Citation Tool | Allow scholars to highlight text and save a `Citation` with a personal note. | M | Week 6 |
| 9 | Batch Ingestion | Support uploading entire folders of images for a single book. | M | Week 7 |
| 10 | Quality Assurance UI | Interface for archivists to manually correct OCR errors in the text. | L | Week 8 |

### 3.3 P2 — Scale Phase
| # | Feature | Strategic Rationale |
|---|---|---|
| 11 | White-label Portals | Allow other foundations to have fully branded digitization portals. |
| 12 | API for Institutions | Provide programmatic access to the digital archive for university libraries. |
| 13 | Auto-Indexing | AI-generated thematic indices for each digitized book. |

### 3.4 Explicitly Out of Scope
| Item | Reason for Exclusion | Reconsider When |
|---|---|---|
| E-book Publishing | The goal is digitization/archiving, not retail distribution. | If the foundation requests a storefront. |
| Generative Summaries | Risk of theological hallucination contradicts the "verbatim" requirement. | After 99.9% OCR accuracy is proven. |
| Physical Scanning Hardware | This is a software platform; hardware is the user's responsibility. | If a bundled hardware/software offer is needed. |
| Social Networking | Not required for academic archival purposes. | Never. |

---

## 4. Non-Functional Requirements
| Requirement | Target | Measurement |
|---|---|---|
| Page Load Time | <1.8 seconds (p95) | Lighthouse / Web Vitals |
| OCR Processing Time | <10 seconds per page | OpenAI API Latency |
| Uptime | 99.9% | Pulsetic / Vercel Monitoring |
| Accessibility | WCAG 2.1 AA | axe-core audit |
| Browser Support | Chrome, Safari, Edge (latest 2) | Manual + Playwright |
| Data Encryption | AES-256 (S3), TLS 1.3 (Transit) | Security Audit |
| Search Latency | <300ms for vector queries | Neon Postgres `pgvector` logs |

---

## 5. Data Model Overview
The system utilizes a hierarchical multi-tenant structure. A **Tenant** (e.g., Criterion Foundation) owns multiple **Books**. Each **Book** contains many **Pages**. Each **Page** stores the raw `content_text` and a `vector embedding` for hybrid search, linked to a physical image in **AWS S3**. **Users** are assigned roles (Admin, Scholar, etc.) and linked to a **Tenant** for data isolation. **Citations** link a **User** to a specific **Page** for academic referencing.

---

## 6. Integration Map
| Service | Purpose | Priority | API Type | Env Var |
|---|---|---|---|---|
| AWS S3 | Storage of high-res page images | P0 | SDK/REST | `AWS_S3_BUCKET` |
| OpenAI | OCR and Text Embedding (ada-002) | P0 | REST | `OPENAI_API_KEY` |
| Stripe | Transactional payment ($5/book) | P0 | Webhook/REST | `STRIPE_SECRET_KEY` |
| Neon Postgres | ACID compliant data & Vector storage | P0 | Connection String | `DATABASE_URL` |
| NextAuth | Session management and role-based access | P0 | Middleware | `NEXTAUTH_SECRET` |

---

## 7. Success Metrics
| KPI | Target (3mo) | Target (12mo) | Measurement | Owner |
|---|---|---|---|---|
| Books Digitized | 500 | 15,000 | `COUNT(books)` in DB | Product |
| OCR Accuracy | 98% | 99.9% | Manual Audit vs Physical | Engineering |
| Revenue | $2,500 | $75,000 | Stripe Dashboard | Business |
| Search Precision | 90% | 98% | User-reported "relevant" hits | Product |
| Processing Cost | <$1.20/book | <$0.80/book | AWS + OpenAI Billing | Engineering |