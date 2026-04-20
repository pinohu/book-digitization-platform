# Cohort Analysis Framework — Book Digitization Platform

This framework is specifically designed for a **Transactional B2B/B2NGO model**. Unlike a SaaS model (where retention is "logging in"), your retention is **"Repeat Digitization Orders."** 

Because your price point is $5/book, your growth will not come from a single user, but from the **volume of books per transaction** and the **frequency of repeat batches.**

---

### 1. COHORT RETENTION CURVES
In a transactional digitization business, "Retention" is defined as **Repeat Purchase Behavior.** A user is "retained" if they submit a second batch of books within a specific timeframe.

**Definition of Retained:** A customer who places a subsequent order within $X$ days of their initial order.

| Period | Poor (Churn Risk) | Average (Healthy) | Good (Power Users) |
| :--- | :--- | :--- | :--- |
| **Month 1** | < 5% | 15% | 30% |
| **Month 3** | < 2% | 8% | 20% |
| **Month 6** | < 1% | 5% | 15% |
| **Month 12** | ~0% | 3% | 10% |

*Note: Because digitizing a library is a "project," you will see natural decay. You are looking for a "flattening" of the curve, indicating a core group of institutional clients (like Criterion) who use you continuously.*

---

### 2. COHORT REVENUE ANALYSIS
Since your price is fixed at $5, your revenue growth depends on **Expansion** (more books per order) and **Frequency** (more orders per year).

*   **Initial ARPU (Average Revenue Per User):** $\text{Total Revenue in Month 0} / \text{Total Customers in Month 0}$.
*   **ARPU Expansion Rate:** The % increase in the number of books per order between the 1st and 2nd transaction.
*   **Net Revenue Retention (NRR) Target:** For this model, aim for **>100%**. This means the revenue from existing customers in Month 2 is greater than the revenue from those same customers in Month 1 (achieved by them sending larger batches).
*   **Cohort LTV (Lifetime Value) Calculation:**
    $$\text{LTV} = (\text{Avg. Books per Customer} \times \$5) \times \text{Avg. Number of Reorders per Year} \times \text{Customer Lifespan (Years)}$$
*   **Payback Period:**
    $$\text{Payback Period} = \text{CAC (Cost to Acquire Customer)} / \text{Gross Margin per Customer}$$
    *Example: If it costs $50 in marketing/sales to get one library, and they order 20 books ($100), your payback is achieved on the first order.*

---

### 3. BEHAVIORAL SEGMENTATION
To grow, you must move users from "One-off" to "Institutional."

| Segment Name | Defining Behavior | % of Base | Rev. Contribution | Action to Move Up |
| :--- | :--- | :--- | :--- | :--- |
| **The Sampler** | 1–5 books; one-time order. | 60% | 10% | Offer "Bulk Batch" discounts (e.g., 50+ books). |
| **The Batcher** | 20–50 books; orders every 6 months. | 25% | 30% | Implement a "Subscription/Retainer" model for steady flow. |
| **The Archivist** | 100+ books; orders quarterly. | 10% | 40% | Provide a dedicated Project Manager/Dashboard. |
| **The Institutional** | 500+ books; monthly/continuous. | 4% | 18% | Annual contract with API integration for their library. |
| **The Dormant** | Ordered once, no activity in 12mo. | 1% | 2% | Re-engagement email with "New AI Accuracy" updates. |

---

### 4. MONTHLY COHORT TRACKING STRUCTURE
Create a spreadsheet with the following layout.

**Rows:** Month of First Purchase (Cohort)
**Columns:** Months since first purchase (Month 0, Month 1, Month 2...)

#### **Template Structure (12x12)**
| Cohort Month | Users | M0 (Rev) | M1 (Rev) | M2 (Rev) | M3 (Rev) | ... | M11 (Rev) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Jan 2024** | 100 | $500 | $150 | $100 | $80 | ... | $20 |
| **Feb 2024** | 120 | $600 | $180 | $120 | $90 | ... | - |
| **Mar 2024** | 150 | $750 | $225 | $150 | - | ... | - |

#### **Key Formulas for your Spreadsheet:**
1.  **Retention Rate (%):** `=(Users in Month X / Users in Month 0)`
2.  **Cumulative Revenue:** `=SUM(M0:Current_Month)`
3.  **ARPU per Cohort:** `=Total_Cohort_Revenue_in_Month_X / Users_in_Cohort_0`
4.  **Churn Rate:** `=1 - Retention_Rate`

---

### 5. INTERPRETATION GUIDE
How to read your cohort charts:

*   **Smiling Curve (The Goal):** The curve drops initially but then levels off or slightly rises. 
    *   *Meaning:* You have found "Product-Market Fit." A group of customers (like Catholic Foundations) provides steady, predictable recurring revenue.
*   **Frowning Curve (The Danger):** The curve drops sharply and hits zero.
    *   *Meaning:* You are a "commodity." Customers use you once to solve a single problem and never see a reason to return. You need to increase the *perceived value* of the digital files.
*   **Flat Line (The Trap):** The curve stays very low and never moves.
    *   *Meaning:* Your acquisition is high-churn. You are attracting "one-book" hobbyists rather than "library-scale" institutions.
*   **Hockey Stick (The Anomaly):** A sudden massive spike in a later month for a specific cohort.
    *   *Meaning:* A single large institutional client (e.g., a massive religious archive) joined that cohort. This is great, but don't mistake it for organic growth; it's a "whale."

---

### 6. ACQUISITION CHANNEL COHORTS
Don't just track *if* they converted; track *which* channel brings the "Archivists."

**Segment your cohorts by:**
1.  **Direct/Referral:** (Word of mouth in religious circles).
2.  **Outbound Sales:** (Targeting libraries/universities).
3.  **Partnerships:** (Collaborations with existing digitization NGOs).

**Quality Metrics per Channel:**
*   **LTV/CAC Ratio:** If Channel A has a CAC of $10 and LTV of $50 (5x), but Channel B has a CAC of $2 and LTV of $4 (2x), **put all your money into Channel A.**
*   **Payback Velocity:** How many months until the channel becomes profitable?

---

### 7. COHORT-BASED FORECASTING
To forecast revenue 12 months out, do not just multiply your current revenue by 12. Use the **Weighted Cohort Method.**

**The Formula:**
$$\text{Forecasted Revenue} = \sum (\text{New Customers Expected} \times \text{Expected Avg. Order Value} \times \text{Expected Retention Rate})$$

**Example Calculation for Month 6 Forecast:**
1.  **New Cohort (M0):** 100 new customers $\times$ $50 avg order = **$5,000**
2.  **Existing Cohort (M1):** 80 customers $\times$ $50 avg order = **$4,000**
3.  **Existing Cohort (M2):** 60 customers $\times$ $50 avg order = **$3,000**
4.  **Total Forecast:** Sum of all active cohorts' predicted revenue.

**Expert Tip for your specific business:** Since you are working with a 501c3 and a Nigerian foundation, your "Retention" will be highly sensitive to **Project Cycles.** Your forecasting must account for "Seasonality"—religious organizations often have budget cycles at the end of the fiscal year. Plan your heavy acquisition in Q3 to capture Q4 digitization budgets.