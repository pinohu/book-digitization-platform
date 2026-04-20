# Financial Model & Revenue Projections — Book Digitization Platform

> Dynasty Empire Financial Analysis | October 26, 2023

---

## Investment Thesis
Project Criterion is a high-margin, low-risk venture because it controls the **supply side** of the value chain. By securing exclusive rights to the Criterion Educational Foundation's physical catalog, the business creates an artificial monopoly on niche content. With a **76% gross margin** and a **7.5:1 LTV:CAC ratio**, the model is designed for rapid capital efficiency, requiring minimal upfront investment to achieve a $60,000 MRR run-rate within 12 months. The use of serverless AI (OpenAI) and managed databases (Neon) ensures that costs scale linearly with revenue, eliminating the risk of high fixed-cost overhead.

---

## 1. Pricing Architecture

### 1.1 Tier Structure
| Tier | Name | Price | Model | Target Segment | Included | Excluded |
|---|---|---|---|---|---|---|
| **Basic** | Digital Twin | $5.00 | Per Book | Parishes | OCR + Searchable PDF | RAG Search |
| **Premium** | Scholar's Edition | $12.00 | Per Book | Universities | OCR + Semantic Search + Citations | Bulk Admin |
| **Enterprise** | Diocesan Vault | Custom | Annual | Dioceses | Unlimited Ingestion + White-label | Individual Billing |

### 1.2 Pricing Rationale
"The Basic Tier at $5.00/book is priced to disrupt the boutique market ($20-$50/book) while maintaining a 76% margin. The Premium Tier at $12.00/book targets the higher willingness-to-pay of academic institutions that require RAG-based semantic search for research. This tiered approach ensures we capture both the low-end 'preservation' market and the high-end 'research' market."

---

## 2. Revenue Projections

### 2.1 Monthly Forecast (Year 1)
| Month | New Books | Churned | Net New | Total Books | Avg Rev/Book | MRR | ARR | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | 1,000 | 0 | 1,000 | 1,000 | $5.00 | $5,000 | $60,000 | MVP Launch |
| 2 | 1,200 | 50 | 1,150 | 2,150 | $5.00 | $5,750 | $69,000 | Initial Traction |
| 3 | 2,000 | 100 | 1,900 | 4,050 | $5.20 | $10,000 | $120,000 | Premium Tier Intro |
| 4 | 2,500 | 150 | 2,350 | 6,400 | $5.20 | $12,200 | $146,400 | Partner Expansion |
| 5 | 3,000 | 200 | 2,800 | 9,200 | $5.30 | $14,600 | $175,200 | |
| 6 | 4,000 | 300 | 3,700 | 12,900 | $5.30 | $19,500 | $234,000 | Scale Phase |
| 7 | 5,000 | 400 | 4,600 | 17,500 | $5.40 | $23,500 | $282,000 | |
| 8 | 6,000 | 500 | 5,500 | 23,000 | $5.40 | $29,700 | $356,400 | |
| 9 | 7,000 | 600 | 6,400 | 29,400 | $5.50 | $36,000 | $432,000 | |
| 10 | 8,000 | 700 | 7,300 | 36,700 | $5.50 | $40,000 | $480,000 | |
| 11 | 10,000 | 800 | 9,200 | 45,900 | $5.60 | $51,500 | $618,000 | |
| 12 | 12,000 | 1,000 | 11,000 | 56,900 | $5.60 | $63,000 | $756,000 | Target Reached |

### 2.2 Revenue Composition
| Stream | % of Revenue | Monthly at Scale | Margin | Notes |
|---|---|---|---|---|
| Basic Digitization | 60% | $37,800 | 76% | Volume driver |
| Premium Research | 30% | $18,900 | 85% | High margin (RAG) |
| Enterprise Vaults | 10% | $6,300 | 70% | Stable annual contracts |

---

## 3. Unit Economics Deep Dive

### 3.1 Customer Acquisition Cost
| Channel | Spend/Month | Leads | Conversion | Customers | CAC |
|---|---|---|---|---|---|
| Partnerships | $1,000 | 500 | 20% | 100 | $10.00 |
| Direct Outreach | $500 | 200 | 10% | 20 | $25.00 |
| **Blended** | **$1,500** | **700** | **17%** | **120** | **$12.50** |
*Note: CAC is calculated per institutional customer. Per-book CAC is $2.00 based on average 6-book initial order.*

### 3.2 Lifetime Value
- Average monthly revenue per customer: $150.00
- Gross margin: 76%
- Monthly churn rate: 3%
- Average customer lifetime: 33.3 months
- **LTV = $150.00 × 76% × 33.3 months = $3,796.20**
- **LTV:CAC = 3,796.20 / 12.50 = 303:1 (Institutional Level)**
- **LTV:CAC (Book Level) = 7.5:1** [✅ Healthy]

### 3.3 Payback Period
- Monthly gross profit per customer: $114.00
- CAC: $12.50
- **Payback = 0.11 months** [Target: <12 months]

---

## 4. Expense Model

| Category | Month 1 | Month 6 | Month 12 | Notes |
|---|---|---|---|---|
| Hosting (Vercel/Neon) | $50 | $200 | $500 | Scales with users |
| AI APIs (OpenAI) | $1,200 | $6,000 | $14,400 | $1.20 per book |
| SaaS Tools | $100 | $150 | $200 | Fixed |
| Marketing/Acquisition | $1,500 | $2,000 | $3,000 | Partnership focus |
| Labor/Contractors | $2,000 | $5,000 | $10,000 | Dev + Ops |
| **Total Monthly Burn** | **$4,850** | **$13,350** | **$28,100** | |
| **EBITDA** | **$150** | **$6,150** | **$34,900** | Break-even: Month 1 |

---

## 5. Milestones & Funding Requirements

| Milestone | MRR Target | Timeline | Cash Needed | Use of Funds |
|---|---|---|---|---|
| **Alpha Launch** | $5,000 | Month 1 | $10,000 | Infrastructure setup |
| **PMF Validation** | $12,000 | Month 3 | $15,000 | AI Pipeline optimization |
| **Scale Phase** | $30,000 | Month 7 | $25,000 | Partnership manager hire |
| **Market Domination** | $60,000 | Month 12 | $0 | Self-sustaining |

---

## 6. Key Risks to Financial Model
| Risk | Impact on Revenue | Probability | Mitigation |
|---|---|---|---|
| **AI Token Price Increase** | -15% Margin | Med | Pre-purchase API credits; optimize prompts |
| **Partner Onboarding Delay** | -30% MRR | High | Diversify partners across 3 different dioceses |
| **Low Premium Adoption** | -10% MRR | Med | Bundle Premium with first 50 books |
| **Currency Volatility (NGN)** | -5% Margin | High | Price all contracts in USD via Stripe |
| **High Churn (Institutional)** | -20% LTV | Low | Implement annual lock-in contracts |

---

## Appendix: Assumptions Table
| # | Assumption | Value Used | Range | Source |
|---|---|---|---|---|
| 1 | Price per book | $5.00 | $4 - $7 | Market research |
| 2 | OpenAI OCR Cost | $1.20 | $0.80 - $1.50 | API pricing |
| 3 | Monthly Churn | 3% | 2% - 7% | SaaS benchmarks |
| 4 | Partner Conversion | 17% | 10% - 25% | Pilot test |
| 5 | Average Order Size | 6 books | 3 - 20 | Pilot test |
| 6 | Institutional CAC | $12.50 | $10 - $25 | Partnership model |
| 7 | Margin | 76% | 70% - 80% | Bottoms-up calc |
| 8 | Growth Rate | S-Curve | Linear - Exp | Historical SaaS |