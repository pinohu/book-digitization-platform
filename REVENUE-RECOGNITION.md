# Revenue Recognition — Book Digitization Platform

# Revenue Recognition Policy Guide: Book Digitization Platform

**Version:** 1.0  
**Compliance Standard:** ASC 606 (Revenue from Contracts with Customers)  
**Business Model:** AI-driven document digitization (Transactional, SaaS, and Services)

---

## 1. The ASC 606 Five-Step Model Application

To comply with GAAP, all revenue must pass through this five-step framework.

| Step | Description | Application to Book Digitization Platform |
| :--- | :--- | :--- |
| **1. Identify Contract** | A legal agreement exists with commercial substance. | Terms of Service (ToS) accepted via click-wrap or signed Master Service Agreements (MSAs). |
| **2. Identify Performance Obligations (POs)** | Distinct promises to transfer goods or services. | Separate POs may include: (1) Platform Access (SaaS), (2) Digitization Services (per book), and (3) Custom Implementation (Pro Services). |
| **3. Determine Transaction Price** | The amount the entity expects to be entitled to. | Includes fixed fees, variable usage fees ($5/book), and potential discounts or refunds. |
| **4. Allocate Price** | Assign price to each PO based on Standalone Selling Price (SSP). | If a bundle is sold (e.g., $1,000 for 1 year SaaS + 100 books), the $1,000 must be split between the SaaS and the books based on their individual market values. |
| **5. Recognize Revenue** | Recognize when (or as) the PO is satisfied. | SaaS is recognized *over time*; Digitization is recognized *at a point in time* (delivery). |

---

## 2. Specific Revenue Recognition Rules

### A. SaaS Subscription (Platform Access)
*   **Recognition Type:** Over Time (Ratably).
*   **Rule:** Revenue is recognized evenly over the subscription term. Even if the customer pays upfront for 12 months, you only recognize 1/12th each month.
*   **Trigger:** The availability of the platform to the user.

### B. One-Time Sales (Per-Book Digitization)
*   **Recognition Type:** Point in Time.
*   **Rule:** Revenue is recognized when the specific performance obligation is complete.
*   **Trigger:** When the AI has processed the book and the digital file is made available for download/access by the customer.

### C. Professional Services (Implementation/Training)
*   **Recognition Type:** Over Time or Milestones.
*   **Rule:** If the service is a continuous integration, recognize over the service period. If it is a discrete setup, recognize upon completion of a milestone.
*   **Trigger:** Completion of specific project phases defined in the SOW (Statement of Work).

### D. Usage-Based Revenue (The $5/Book Model)
*   **Recognition Type:** As Consumed.
*   **Rule:** This is "Variable Consideration." Revenue is recognized in the period the usage occurs.
*   **Trigger:** The actual count of books processed through the AI engine during the billing cycle.

---

## 3. Advanced Accounting Treatments

### Deferred Revenue (Liability)
When a customer pays upfront (e.g., an annual subscription), the cash is received, but the revenue is not yet earned. 
*   **Accounting:** Debit Cash, Credit **Deferred Revenue (Liability)**. 
*   **Monthly:** Debit Deferred Revenue, Credit Revenue.

### Contract Modifications
*   **Upsells:** If a customer adds 500 books to an existing contract, treat this as a new, separate contract if the price reflects the SSP of the additional books.
*   **Downsells/Term Changes:** If a customer reduces their tier, adjust the remaining deferred revenue prospectively.

### Refund Reserves
If the platform offers a "Satisfaction Guarantee," you must estimate the expected refunds based on historical data and reduce the Transaction Price (Step 3) accordingly. This is recorded as a **Refund Liability**.

### Multi-Element Arrangements (Bundling)
If you sell a "Starter Pack" ($500 for 1 month of SaaS + 50 books):
1.  Determine the SSP of 1 month of SaaS (e.g., $100).
2.  Determine the SSP of 50 books (e.g., $250).
3.  Since the bundle is $500, you must allocate the $500 proportionally to the $100 and $250 values to ensure the total equals the contract price.

### Free Trial and Freemium Treatment
*   **Freemium:** No revenue is recognized for free users.
*   **Trials:** No revenue is recognized during the trial period. Revenue recognition begins only when the user converts to a paid tier.

### Annual vs. Monthly Billing
*   **Monthly:** Revenue and Billing usually align.
*   **Annual:** Creates a significant mismatch between **Cash Flow** (high in Month 1) and **Revenue** (spread over 12 months). This requires robust Deferred Revenue tracking.

---

## 4. Practical Examples & Journal Entries

### Scenario 1: Annual SaaS Subscription
*Customer pays $1,200 on Jan 1st for a 12-month subscription.*

**Jan 1 (Initial Billing):**
*   DR Cash: $1,200
*   CR Deferred Revenue: $1,200

**Jan 31 (Month-end Recognition):**
*   DR Deferred Revenue: $100
*   CR SaaS Revenue: $100

### Scenario 2: Usage-Based Transaction
*In February, a customer processes 200 books at $5/book ($1,000 total).*

**End of February (Invoice issued based on usage):**
*   DR Accounts Receivable: $1,000
*   CR Usage Revenue: $1,000

### Scenario 3: Professional Services (Milestone)
*A $5,000 implementation project. 50% is recognized upon "System Integration" milestone.*

**Upon Milestone Completion:**
*   DR Unbilled Receivables (or AR): $2,500
*   CR Professional Services Revenue: $2,500

---

## 5. Internal Controls & Audit Readiness

### Monthly Revenue Recognition Checklist
- [ ] **Reconciliation:** Does the total Revenue in the P&L match the sum of all recognized monthly portions in the Deferred Revenue schedule?
- [ ] **Cut-off Test:** Ensure books processed on the last day of the month are recorded in the current month, not the next.
- [ ] **Usage Audit:** Cross-reference the "Total Books Processed" from the AI database with the "Usage Revenue" in the accounting system.
- [ ] **Contract Review:** Review all new MSAs to ensure any "non-standard" terms (e.g., custom refund rights) are flagged for revenue adjustment.
- [ ] **Deferred Revenue Aging:** Review the Deferred Revenue balance to ensure it aligns with the remaining months of active subscriptions.

### Common Audit Findings to Avoid
1.  **Premature Recognition:** Recognizing the full amount of an annual contract in Month 1 (Violates "Over Time" rule).
2.  **Incorrect Allocation:** Failing to allocate bundle prices based on Standalone Selling Price (SSP).
3.  **Missing Variable Consideration:** Failing to account for expected refunds or volume discounts in the transaction price.
4.  **Poor Cut-off:** Recognizing revenue for books processed in January during the December financial close.
5.  **Unrecorded Liabilities:** Failing to move "Unearned" cash from the Balance Sheet to the P&L as service is delivered.