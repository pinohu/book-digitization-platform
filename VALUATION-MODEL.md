# Valuation Model — Book Digitization Platform

This framework is designed for a high-growth AI SaaS model. Because the business is transactional ($5/book), the primary driver is **Volume (Number of Books Digitized)**. 

To use this in Excel, copy these tables into separate tabs or sections.

### 1. Revenue Projections & Assumptions
*Assumption: The business scales through increasing enterprise contracts and API integrations.*

| Item | Unit | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Books Digitized** | Millions | 1.0 | 2.5 | 6.0 | 12.0 | 20.0 |
| **Growth Rate (%)** | % | - | 150% | 140% | 100% | 67% |
| **Price per Book** | USD | $5.00 | $5.00 | $4.75 | $4.50 | $4.50 |
| **Total Revenue** | **USD (M)** | **$5.00** | **$12.50** | **$28.50** | **$54.00** | **$90.00** |

---

### 2. Operating Model (P&L Forecast)
*Assumption: COGS includes Cloud Compute (GPU/CPU) and "Human-in-the-loop" (HITL) quality control.*

| Item | % of Rev | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Total Revenue** | 100% | $5.00 | $12.50 | $28.50 | $54.00 | $90.00 |
| **COGS (Compute/HITL)** | 25% | ($1.25) | ($3.13) | ($7.13) | ($13.50) | ($22.50) |
| **Gross Profit** | **75%** | **$3.75** | **$9.38** | **$21.38** | **$40.50** | **$67.50** |
| **R&D (AI Eng/Dev)** | 40% | ($2.00) | ($4.00) | ($7.50) | ($12.00) | ($18.00) |
| **S&M (Sales/Marketing)** | 35% | ($1.75) | ($3.50) | ($6.50) | ($11.00) | ($18.00) |
| **G&A (General/Admin)** | 15% | ($0.75) | ($1.50) | ($2.50) | ($4.50) | ($7.00) |
| **EBITDA** | | **($0.75)** | **$0.38** | **$4.88** | **$13.00** | **$24.50** |
| *EBITDA Margin* | % | *-15%* | *3%* | *17%* | *24%* | *27%* |

---

### 3. Unlevered Free Cash Flow (UFCF) Calculation

| Item | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **EBIT (EBITDA - Depr)** | ($0.75) | $0.30 | $4.50 | $12.50 | $23.50 |
| **Less: Taxes (21%)** | $0.00 | ($0.06) | ($0.95) | ($2.63) | ($4.94) |
| **Plus: D&A** | $0.10 | $0.15 | $0.30 | $0.50 | $0.75 |
| **Less: CapEx** | ($0.20) | ($0.30) | ($0.50) | ($0.80) | ($1.00) |
| **Less: $\Delta$ NWC** | ($0.10) | ($0.20) | ($0.40) | ($0.80) | ($1.20) |
| **Free Cash Flow (FCF)** | **($0.95)** | **($0.11)** | **$3.45** | **$11.37** | **$21.05** |

---

### 4. WACC Computation (Weighted Average Cost of Capital)
*Calculated for a high-growth technology firm.*

| Component | Value | Assumption/Formula |
| :--- | :--- | :--- |
| **Risk-Free Rate ($R_f$)** | 4.2% | 10-Year US Treasury |
| **Beta ($\beta$)** | 1.40 | High-growth tech sector average |
| **Equity Risk Premium** | 5.5% | Standard CAPM assumption |
| **Cost of Equity ($R_e$)** | **11.9%** | $R_f + (\beta \times ERP)$ |
| **Pre-tax Cost of Debt** | 7.0% | Estimated for growth-stage debt |
| **Tax Rate** | 21.0% | Corporate Tax Rate |
| **After-tax Cost of Debt** | 5.53% | $Cost \times (1 - Tax)$ |
| **Capital Structure (E/V)** | 90% | Equity-heavy (typical for startups) |
| **Capital Structure (D/V)** | 10% | Debt component |
| **WACC** | **11.3%** | $(R_e \times 0.9) + (R_d \times 0.1)$ |

---

### 5. Terminal Value (TV) Calculation

| Method | Assumption | Calculation | Terminal Value |
| :--- | :--- | :--- | :--- |
| **Perpetuity Growth** | 3.0% ($g$) | $FCF_5 \times (1+g) / (WACC - g)$ | **$273.30M** |
| **Exit Multiple** | 15.0x EBITDA | $EBITDA_5 \times Multiple$ | **$367.50M** |

---

### 6. Comparable Company Analysis (Comps)
*Targeting Digitization, AI, and SaaS peers.*

| Company | Sector | EV/Revenue (LTM) | EV/EBITDA (LTM) |
| :--- | :--- | :--- | :--- |
| **Adobe (ADBE)** | Creative/AI SaaS | 10.5x | 25.0x |
| **UiPath (PATH)** | Automation/AI | 6.2x | 35.0x (Non-EBITDA) |
| **Iron Mountain (IRM)** | Digitization/Data | 2.5x | 12.0x |
| **Appen (APX)** | Data/AI Services | 1.8x | 8.0x |
| **DocuSign (DOCU)** | Digital Workflow | 5.5x | 18.0x |
| **AVERAGE** | | **5.3x** | **18.0x** |

---

### 7. Sensitivity Analysis & Valuation Range

**Sensitivity Table: Enterprise Value (EV) based on WACC vs. Terminal Growth Rate**
*(Output in USD Millions)*

| WACC \ Growth | 2.0% | 3.0% | 4.0% |
| :--- | :--- | :--- | :--- |
| **10.0%** | $245M | $275M | $310M |
| **11.3% (Base)** | $215M | **$235M** | $260M |
| **13.0%** | $185M | $200M | $220M |

**Final Valuation Summary**

| Metric | Low Estimate | Midpoint | High Estimate |
| :--- | :--- | :--- | :--- |
| **DCF (Perpetuity)** | $215.0M | $235.0M | $260.0M |
| **DCF (Exit Multiple)** | $280.0M | $320.0M | $367.5M |
| **Implied Pre-Money Range** | **$215M - $280M** | **$250M - $320M** | **$260M - $367M** |

---

### 💡 Implementation Notes for your Spreadsheet:
1.  **The "Switch":** In your DCF tab, create a toggle to switch between "Perpetuity Method" and "Exit Multiple Method" for the Terminal Value.
2.  **The "Driver":** Ensure the entire model is driven by the `Books Digitized` cell in Year 1. If you change that number, the whole model should flow.
3.  **The "Margin Check":** AI businesses often see high Gross Margins (80%+) once the model is trained, but high OpEx. If your COGS exceeds 35% in Year 5, your model is likely too "labor-heavy" and not "AI-heavy."