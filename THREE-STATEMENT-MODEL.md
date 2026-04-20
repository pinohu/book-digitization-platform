# Three-Statement Financial Model — Book Digitization Platform

This financial model is designed for a high-growth AI startup. It assumes a "Land and Expand" strategy: starting with transactional per-book fees and scaling into enterprise subscriptions.

### 1. Key Assumptions & Unit Economics

| **Category** | **Assumption** | **Value** |
| :--- | :--- | :--- |
| **Unit Economics** | Price per Book (Transactional) | $5.00 |
| | COGS per Book (Cloud + HITL Verification) | $1.50 |
| | **Gross Margin per Book** | **70%** |
| **Revenue** | Year 1 Growth Rate (QoQ) | 40% |
| | Year 2-3 Growth Rate (YoY) | 150% |
| | SaaS Subscription (Enterprise Tier) | $1,000/mo |
| **Operating** | R&D (% of Revenue) | 40% (Heavy AI Dev) |
| | S&M (% of Revenue) | 30% (Growth phase) |
| | G&A (% of Revenue) | 15% |
| **Financial** | Tax Rate | 21% |
| | Interest Rate on Debt | 7% |
| | Days Sales Outstanding (DSO) | 30 Days |

---

### 2. Income Statement
*All figures in USD ($000s)*

| **INCOME STATEMENT** | **Y1 Q1** | **Y1 Q2** | **Y1 Q3** | **Y1 Q4** | **YEAR 1** | **YEAR 2** | **YEAR 3** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Revenue** | | | | | | | |
| Transactional Revenue | 50 | 75 | 110 | 160 | 395 | 1,200 | 3,500 |
| Subscription Revenue | 10 | 15 | 25 | 40 | 90 | 450 | 1,200 |
| **Total Revenue** | **60** | **90** | **135** | **200** | **485** | **1,650** | **4,700** |
| COGS | (18) | (27) | (40) | (60) | (145) | (495) | (1,410) |
| **Gross Profit** | **42** | **63** | **95** | **140** | **340** | **1,155** | **3,290** |
| | | | | | | | |
| **Operating Expenses** | | | | | | | |
| R&D | (25) | (35) | (50) | (75) | (185) | (660) | (1,880) |
| S&M | (15) | (20) | (30) | (45) | (110) | (495) | (1,410) |
| G&A | (10) | (12) | (15) | (20) | (57) | (248) | (705) |
| **Total OpEx** | **(50)** | **(67)** | **(95)** | **(140)** | **(352)** | **(1,403)** | **(3,995)** |
| | | | | | | | |
| **EBITDA** | **(8)** | **(4)** | **0** | **0** | **(12)** | **(248)** | **(705)** |
| Depreciation | (2) | (2) | (2) | (2) | (8) | (25) | (60) |
| **EBIT** | **(10)** | **(6)** | **(2)** | **(2)** | **(20)** | **(273)** | **(765)** |
| Interest Expense | (2) | (2) | (2) | (2) | (8) | (25) | (55) |
| Tax (Benefit) | 0 | 0 | 0 | 0 | 0 | 57* | 160* |
| **Net Income** | **(12)** | **(8)** | **(4)** | **(4)** | **(28)** | **(241)** | **(660)** |

*\*Note: Tax benefit assumes carry-forward of Net Operating Losses (NOLs).*

---

### 3. Balance Sheet
*All figures in USD ($000s)*

| **BALANCE SHEET** | **Y1 Q1** | **Y1 Q2** | **Y1 Q3** | **Y1 Q4** | **YEAR 1** | **YEAR 2** | **YEAR 3** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ASSETS** | | | | | | | |
| Cash | 488 | 475 | 460 | 445 | 445 | 204 | (456)* |
| Accounts Receivable | 5 | 8 | 12 | 17 | 17 | 55 | 157 |
| Prepaid Expenses | 10 | 10 | 12 | 15 | 15 | 30 | 80 |
| Fixed Assets (Net) | 18 | 16 | 14 | 12 | 12 | (13) | (73) |
| **Total Assets** | **521** | **509** | **498** | **489** | **489** | **276** | **(482)** |
| | | | | | | | |
| **LIABILITIES & EQUITY** | | | | | | | |
| Accounts Payable | 3 | 5 | 7 | 10 | 10 | 35 | 100 |
| Accrued Liabilities | 5 | 7 | 10 | 15 | 15 | 45 | 120 |
| Deferred Revenue | 2 | 3 | 5 | 8 | 8 | 25 | 80 |
| Debt | 500 | 500 | 500 | 500 | 500 | 500 | 500 |
| Equity (Paid-in Capital) | 500 | 500 | 500 | 500 | 500 | 500 | 500 |
| Retained Earnings | (89) | (105) | (124) | (144) | (28) | (241) | (660) |
| **Total L&E** | **521** | **509** | **498** | **489** | **489** | **276** | **(482)** |

*\*Note: Negative cash/assets in Year 3 indicates a requirement for a Series B funding round.*

---

### 4. Cash Flow Statement
*All figures in USD ($000s)*

| **CASH FLOW** | **Y1 Q1** | **Y1 Q2** | **Y1 Q3** | **Y1 Q4** | **YEAR 1** | **YEAR 2** | **YEAR 3** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Operating Activities** | | | | | | | |
| Net Income | (12) | (8) | (4) | (4) | (28) | (241) | (660) |
| (+) Depreciation | 2 | 2 | 2 | 2 | 8 | 25 | 60 |
| (–) Change in WC | (5) | (3) | (5) | (5) | (18) | (30) | (100) |
| **Net Cash from Ops** | **(15)** | **(9)** | **(7)** | **(7)** | **(38)** | **(246)** | **(700)** |
| | | | | | | | |
| **Investing Activities** | | | | | | | |
| CapEx | (5) | (2) | (2) | (2) | (11) | (15) | (30) |
| **Net Cash from Inv** | **(5)** | **(2)** | **(2)** | **(2)** | **(11)** | **(15)** | **(30)** |
| | | | | | | | |
| **Financing Activities** | | | | | | | |
| Equity Raises | 500 | 0 | 0 | 0 | 500 | 0 | 1,000* |
| Debt Issuance | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **Net Cash from Fin** | **500** | **0** | **0** | **0** | **500** | **0** | **1,000** |
| | | | | | | | |
| **Net Change in Cash** | **480** | **(11)** | **(9)** | **(9)** | **451** | **(261)** | **270** |
| **Opening Cash** | 0 | 480 | 469 | 460 | 0 | 445 | 184 |
| **Closing Cash** | **480** | **469** | **460** | **451** | **451** | **184** | **454** |

*\*Note: Year 3 assumes a $1M Series B capital injection to sustain growth and R&D.*

---

### 5. Summary Unit Economics Tie-in
*   **LTV/CAC Ratio:** While not explicitly modeled in the three statements, the high S&M spend (30% of revenue) is designed to drive the volume of books processed. 
*   **Operating Leverage:** As the platform scales, the R&D and G&A as a percentage of revenue should decrease, allowing the EBITDA margin to turn positive (expected in Year 4).
*   **Working Capital:** The model assumes a tight cash conversion cycle (30-day AR), which is standard for B2B SaaS/Transactional models.