# Cap Table Model — Book Digitization Platform

***Disclaimer: I am an AI, not a licensed attorney or a Certified Public Accountant (CPA). The following information is for educational and modeling purposes only. Startup capitalization is a complex legal and tax matter. You must consult with legal counsel in both the United States and Nigeria to ensure compliance with SEC regulations and international tax laws, especially given your hybrid non-profit/for-profit structure.***

---

### 1. FOUNDER SPLIT FRAMEWORK

In a high-growth AI startup, the split should reflect **future value creation**, not just past effort. Avoid "equal splits" unless all founders are contributing identical capital, time, and expertise.

#### Decision Framework Matrix
| Factor | Weight | Description |
| :--- | :--- | :--- |
| **Idea Origination** | 5-10% | The "spark." Low weight because ideas are cheap; execution is everything. |
| **Domain Expertise** | 10-20% | Knowledge of Catholic Classics, Nigerian publishing, or AI/OCR tech. |
| **Time Commitment** | 20-30% | Full-time vs. Part-time. The "sweat equity" factor. |
| **Capital Contribution** | 10-20% | Cash injected to cover initial legal/server/API costs. |
| **CEO/Leadership Role** | 5-10% | The "burden of responsibility" premium for the ultimate decision-maker. |

#### Example Splits
1.  **The Duo (Visionary + Builder):** CEO (60%) / CTO (40%). Best for a technical AI platform where one drives the business and the other the engine.
2.  **The Trio (The Balanced Team):** CEO (40%) / CTO (30%) / COO (30%). Best when operations (digitization logistics in Nigeria) are as hard as the code.
3.  **The Equal Split (The "Co-equal" Model):** 25% / 25% / 25% / 25%. **When to use:** Only if all 4 founders are full-time, have equal skill sets, and are starting from zero capital. *Warning: This often leads to deadlocks in decision-making.*

---

### 2. ESOP POOL SIZING (Employee Stock Option Pool)

The ESOP is a "bucket" of shares reserved for future hires. 

*   **Sizing:** 10-15% is standard for Seed; 15-20% is standard for Series A.
*   **The "Option Pool Shuffle":** Investors will insist that the ESOP be created **pre-money**. This means the dilution from the pool falls entirely on the *founders*, not the new investors.
*   **Sample Option Grant Table (First 10 Employees):**

| Role | Target Ownership % | Note |
| :--- | :--- | :--- |
| VP Engineering / Head of AI | 1.0% – 2.0% | High-level technical leadership. |
| Lead AI Engineer | 0.5% – 1.0% | Core developer of the digitization engine. |
| Product Manager | 0.3% – 0.7% | Managing the UX/UI for the platform. |
| Senior Software Engineer | 0.2% – 0.5% | Implementation and scaling. |
| Operations Manager (Nigeria) | 0.2% – 0.5% | Managing the physical book intake. |
| Junior Engineer / Data Labeler | 0.05% – 0.1% | Scaling the AI training data. |

---

### 3. DILUTION MODELING ACROSS ROUNDS

*Note: This model assumes the founders start with 10,000,000 shares and an ESOP is carved out at each stage.*

| Round | Valuation (Pre-Money) | Investment | Post-Money | Founder Ownership (Est.) |
| :--- | :--- | :--- | :--- | :--- |
| **Founding** | — | — | — | 100% |
| **Pre-Seed (SAFE)** | $5M Cap | $500K | $5.5M | ~90% |
| **Seed** | $10M | $2M | $12M | ~75% |
| **Series A** | $30M | $8M | $38M | ~59% |
| **Series B** | $100M | $25M | $125M | ~47% |

**Pro-Rata Impact:** If a founder has pro-rata rights, they can invest more money in the Series A round to maintain their 75% ownership, preventing the slide to 59%.

---

### 4. PRO-RATA RIGHTS

*   **Pro-Rata Rights:** The right to participate in future funding rounds to maintain your current percentage. 
    *   **Founder Strategy:** Fight to keep these. If you don't, a massive Series B could "wash you out" to a negligible percentage.
*   **Super Pro-Rata:** The right to invest *more* than your current percentage (usually reserved for Lead Investors).
*   **Pay-to-Play:** A provision where if an investor *doesn't* participate in a follow-on round, their preferred stock converts to common stock (losing their special rights).

---

### 5. VESTING SCHEDULES

You do not "own" your shares on day one; you "earn" them.

*   **Standard:** 4-year vesting with a **1-year cliff**.
    *   *Month 1-11:* If you leave, you get 0%.
    *   *Month 12:* You hit the "cliff" and instantly vest 25%.
    *   *Month 13-48:* You vest 1/48th of the total grant every month.
*   **Reverse Vesting (Founders):** You own the shares now, but the company has the right to repurchase unvested shares at cost if you leave.
*   **Leaver Provisions:**
    *   **Good Leaver:** Leaves due to illness, death, or termination without cause. (Usually keeps vested shares).
    *   **Bad Leaver:** Leaves due to fraud, crime, or joining a competitor. (Company may have right to claw back even vested shares).

---

### 6. ACCELERATION CLAUSES

These dictate what happens to your shares if the company is sold (Change of Control).

1.  **Single-Trigger Acceleration:** Your shares vest immediately upon the sale of the company. 
    *   *Investor View:* **Negative.** They want employees to stay after the sale to keep the engine running.
2.  **Double-Trigger Acceleration (The Gold Standard):** Your shares vest only if (1) the company is sold **AND** (2) you are terminated without cause by the new owner.
    *   *Recommendation:* All C-suite and key engineers should have Double-Trigger.

---

### 7. 409A VALUATION

As you hire employees and grant options, you cannot simply "pick" a price. 

*   **What it is:** An independent appraisal of the **Fair Market Value (FMV)** of your *Common Stock*.
*   **The Rule of Thumb:** In a startup, Preferred Stock (what investors buy) is worth much more than Common Stock (what employees get). The 409A price for Common Stock is typically **25-30% of the Preferred Price**.
*   **Safe Harbor:** If you follow a formal 409A process, the IRS will generally accept your strike price, protecting employees from massive tax penalties.

---

### 8. CAP TABLE TEMPLATE (Post-Series B Model)

*Scenario: The company has successfully scaled. Total Shares Outstanding: ~25,000,000.*

| Shareholder | Share Class | Shares | % Ownership | Total Invested | Price/Share |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Founders (Group)** | Common | 11,750,000 | 47.0% | $100,000* | $0.008 |
| **Seed Investors** | Preferred | 2,500,000 | 10.0% | $2,000,000 | $0.80 |
| **Series A Investors** | Preferred | 4,200,000 | 16.8% | $8,000,000 | $1.90 |
| **Series B Investors** | Preferred | 5,000,000 | 20.0% | $25,000,000 | $5.00 |
| **ESOP Pool** | Options | 1,550,000 | 6.2% | $0 | TBD (409A) |
| **TOTAL** | | **25,000,000** | **100.0%** | **$35,100,000**| |

*\*Note: Founder "investment" includes sweat equity and initial seed capital.*