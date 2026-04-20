# AI Operations Architecture — Book Digitization Platform

> Dynasty Empire Automation Blueprint | April 19, 2026

---

## Automation Philosophy
The system prioritizes the "Sacred Text Integrity" principle: high-volume automation for ingestion and indexing, with hard-stop human validation for theological accuracy. Automation handles the linear pipeline (OCR $\rightarrow$ Embedding $\rightarrow$ Indexing), while human-in-the-loop (HITL) is reserved for academic verification and partnership governance. The Dynasty stack integrates n8n for orchestration and Claude for nuanced text structuring to ensure Catholic Classics maintain liturgical precision.

---

## 1. Agent Orchestration Map

### System Data Flow
Partner Lead $\rightarrow$ Intake Agent $\rightarrow$ Idea Generator (Collection Scoping) $\rightarrow$ Evaluator (ROI/Feasibility) $\rightarrow$ [if viable] $\rightarrow$ Architect (Technical Spec) $\rightarrow$ MVP Builder (Sample Digitize) $\rightarrow$ Proof Engine (OCR Accuracy Audit) $\rightarrow$ GTM Agent (Partnership Outreach) $\rightarrow$ Sales Agent (Closing) $\rightarrow$ Financial Model (LTV/CAC Tracking) $\rightarrow$ Deal Structuring (501c3 Compliance) $\rightarrow$ Scale Plan (Infrastructure Expansion)

---

## 2. Agent Specifications

### 2.1 Intake Agent
| Attribute | Detail |
|---|---|
| **Purpose** | Capture and qualify digitization leads from Nigerian educational foundations |
| **Trigger** | New entry via partnership landing page or lead form |
| **Input** | Lead contact info, estimated book volume, physical condition report |
| **Output** | Qualified Lead Profile (JSON) in CRM |
| **Tool** | Insighto |
| **Success Metric** | Lead qualification time < 5 minutes |
| **Fallback** | Manual entry via admin dashboard |
| **Est. Cost/Run** | $0.05 |

### 2.2 Idea Generator Agent
| Attribute | Detail |
|---|---|
| **Purpose** | Identify high-value Catholic Classic collections for priority digitization |
| **Trigger** | Qualified Lead Profile creation |
| **Input** | Library catalogs, historical publishing data, current market gaps |
| **Output** | Prioritized Digitization Roadmap (CSV) |
| **Tool** | Claude |
| **Success Metric** | $\ge$ 3 viable collection targets per lead |
| **Fallback** | Manual curation by Subject Matter Expert (SME) |
| **Est. Cost/Run** | $0.12 |

### 2.3 Evaluator Agent
| Attribute | Detail |
|---|---|
| **Purpose** | Calculate potential ROI based on $5/book transactional revenue |
| **Trigger** | Prioritized Digitization Roadmap generation |
| **Input** | Volume of books, estimated OCR cost, expected user base |
| **Output** | Viability Score (0-100) and Estimated Margin |
| **Tool** | Flint |
| **Success Metric** | Accuracy of margin projection within $\pm$ 10% |
| **Fallback** | Manual spreadsheet calculation |
| **Est. Cost/Run** | $0.03 |

### 2.4 Architect Agent
| Attribute | Detail |
|---|---|
| **Purpose** | Define technical ingestion parameters for specific book formats |
| **Trigger** | Viability Score $> 70$ |
| **Input** | Book dimensions, page count, scan resolution requirements |
| **Output** | Technical Ingestion Spec (JSON) |
| **Tool** | Claude |
| **Success Metric** | Zero spec-related failures during MVP phase |
| **Fallback** | Systems Architect manual review |
| **Est. Cost/Run** | $0.15 |

### 2.5 MVP Builder Agent
| Attribute | Detail |
|---|---|
| **Purpose** | Generate a "Proof of Concept" digital sample (5-10 pages) |
| **Trigger** | Technical Ingestion Spec approval |
| **Input** | Sample raw scans, Ingestion Spec |
| **Output** | Hosted sample reader link (/reader/[sampleId]) |
| **Tool** | n8n $\rightarrow$ OpenAI OCR $\rightarrow$ S3 |
| **Success Metric** | Sample delivery in < 60 minutes |
| **Fallback** | Manual upload and OCR processing |
| **Est. Cost/Run** | $1.20 |

### 2.6 Proof Engine Agent
| Attribute | Detail |
|---|---|
| **Purpose** | Audit OCR accuracy against physical source to ensure zero hallucinations |
| **Trigger** | MVP Sample completion |
| **Input** | Raw image, OCR output text |
| **Output** | Error Rate Report (%) and Confidence Score |
| **Tool** | Claude (Vision) |
| **Success Metric** | Identification of 100% of critical theological typos |
| **Fallback** | Human scholar manual audit |
| **Est. Cost/Run** | $0.40 |

### 2.7 GTM Agent
| Attribute | Detail |
|---|---|
| **Purpose** | Execute targeted outreach to Catholic educational stakeholders |
| **Trigger** | Proof Engine Confidence Score $> 95\%$ |
| **Input** | Partner profile, Proof of Concept results |
| **Output** | Personalized outreach sequence (Email/SMS) |
| **Tool** | CallScaler / SMS-iT |
| **Success Metric** | Meeting book rate $> 15\%$ |
| **Fallback** | Manual outreach by President of Origin Eyes Inc |
| **Est. Cost/Run** | $0.25 |

### 2.8 Sales Agent
| Attribute | Detail |
|---|---|
| **Purpose** | Convert partner interest into signed digitization agreements |
| **Trigger** | Meeting scheduled by GTM Agent |
| **Input** | Meeting transcripts, partner objections |
| **Output** | Signed Agreement / Stripe Subscription activation |
| **Tool** | Stripe / Claude |
| **Success Metric** | Close rate $> 20\%$ |
| **Fallback** | Direct negotiation by President |
| **Est. Cost/Run** | $0.10 |

### 2.9 Financial Model Agent
| Attribute | Detail |
|---|---|
| **Purpose** | Track real-time LTV:CAC and gross margins per partner |
| **Trigger** | Payment received via Stripe |
| **Input** | Stripe transaction logs, acquisition costs |
| **Output** | Unit Economics Dashboard update |
| **Tool** | Flint |
| **Success Metric** | Real-time accuracy of LTV:CAC ratio |
| **Fallback** | Monthly manual financial audit |
| **Est. Cost/Run** | $0.02 |

### 2.10 Deal Structuring Agent
| Attribute | Detail |
|---|---|
| **Purpose** | Ensure 501c3 compliance and IP rights for digitized works |
| **Trigger** | Agreement phase initiation |
| **Input** | Local Nigerian copyright law, 501c3 bylaws |
| **Output** | Legally compliant contract draft |
| **Tool** | Claude |
| **Success Metric** | 0 legal revisions required by counsel |
| **Fallback** | Legal counsel manual drafting |
| **Est. Cost/Run** | $0.20 |

### 2.11 Scale Plan Agent
| Attribute | Detail |
|---|---|
| **Purpose** | Forecast AWS/Neon infrastructure needs based on ingestion volume |
| **Trigger** | Total books in pipeline $> 10,000$ |
| **Input** | Current storage usage, query latency, growth rate |
| **Output** | Infrastructure Scaling Roadmap |
| **Tool** | Claude |
| **Success Metric** | Zero downtime during scale-up events |
| **Fallback** | Manual DevOps scaling |
| **Est. Cost/Run** | $0.10 |

---

## 3. Tool Dependency Matrix
| Agent | Primary Tool | Backup | If Both Fail |
|---|---|---|---|
| Intake | Insighto | Manual Form | Manual Email |
| Idea Gen | Claude | GPT-4o | SME Manual |
| Evaluator | Flint | Google Sheets | Manual Calc |
| Architect | Claude | Manual Spec | Lead Architect |
| MVP Builder | n8n | Custom Script | Manual OCR |
| Proof Engine | Claude Vision | Human Review | Expert Scholar |
| GTM | CallScaler | SMS-iT | Manual Email |
| Sales | Stripe | PayPal | Bank Transfer |
| Financial | Flint | QuickBooks | Accountant |
| Deal Struct | Claude | Legal Template | Attorney |
| Scale Plan | Claude | AWS Advisor | DevOps Eng |

---

## 4. Human-in-the-Loop Decision Points
| Decision | Automation Level | Human Required When |
|---|---|---|
| Lead Qualification | Semi-Automated | Lead is a high-profile Bishop/Cardinal |
| Theological Accuracy | Semi-Automated | Proof Engine confidence $< 98\%$ |
| Final Contract Sign-off | Human-Only | Legal terms deviate from 501c3 standard |
| Pricing Pivot | Human-Only | Market shift requires change from $5/book |
| Infrastructure Spend | Semi-Automated | Monthly AWS bill exceeds $500 |
| Partner Offboarding | Human-Only | IP dispute or contract breach |

---

## 5. Monitoring & Observability
| Signal | Target | Alert Threshold | Dashboard |
|---|---|---|---|
| Agent success rate | $>95\%$ | $<90\%$ | PostHog |
| Avg processing time | $<30\text{s}$ | $>60\text{s}$ | Application logs |
| Error rate | $<2\%$ | $>5\%$ | Pulsetic |
| Cost per run | $<\$0.50$ | $>\$1.00$ | Stripe usage |