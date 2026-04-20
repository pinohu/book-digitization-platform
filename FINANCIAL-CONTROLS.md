# Financial Controls — Book Digitization Platform

This Financial Controls Manual is designed for a high-growth AI technology company. Given the nature of an AI platform, specific emphasis is placed on **Cloud Computing (SaaS/IaaS) spend**, **R&D talent costs**, and **Data Acquisition costs**.

---

# Financial Controls Manual: Book Digitization Platform

## 1. Separation of Duties (SoD) Framework
To prevent fraud and error, no single individual shall have control over all phases of a financial transaction.

| Function | Role: Initiator (Requester) | Role: Approver (Manager) | Role: Recorder (Accounting) | Role: Custodian (Treasury/Bank) |
| :--- | :--- | :--- | :--- | :--- |
| **Procurement** | Employee/Dept Head | Dept Head/CFO | Bookkeeper/Controller | N/A |
| **Accounts Payable** | Vendor/Requester | Dept Head | Accounts Payable Clerk | CFO/Treasurer |
| **Payroll** | HR Manager | CEO/CFO | Payroll Specialist | Bank/Payroll Provider |
| **Cash/Banking** | N/A | CFO | Controller | Treasurer/CFO |

---

## 2. Approval Authority Matrix
*Thresholds apply to single transactions or cumulative monthly contracts.*

| Amount Range | Level 1 Approval | Level 2 Approval | Final Authorization |
| :--- | :--- | :--- | :--- |
| **$0 – $500** | Team Lead | N/A | Automatic (if budgeted) |
| **$501 – $5,000** | Dept Head | N/A | Dept Head |
| **$5,001 – $25,000** | Dept Head | CFO | CFO |
| **$25,001 +** | Dept Head | CFO | CEO |

---

## 3. Expense & Corporate Card Policy

### Expense Categories
1.  **Travel:** Airfare (Economy/Premium Economy), Lodging (Standard), Ground Transport.
2.  **Meals/Entertainment:** Business development or team building.
3.  **Software/SaaS:** AI training tools, Cloud credits (AWS/Azure), Dev tools.
4.  **Hardware:** Laptops, Scanners, Server components.

### Per Diems & Reimbursement
*   **Daily Meal Cap:** $75/day (standard) or $120/day (high-cost cities like SF/NY).
*   **Submission Deadline:** All expenses must be submitted via [Expensify/Ramp/Brex] within 30 days.
*   **Receipt Requirement:** Digital receipts required for all items >$25.

### Prohibited Expenses
*   Alcohol (unless part of a pre-approved client dinner).
*   Personal subscriptions or upgrades.
*   Fines, traffic tickets, or late fees.
*   Luxury upgrades (First Class, 5-star hotels) without CEO written consent.

### Corporate Card Controls
*   **Per-Transaction Limit:** $2,500 (Standard); $10,000 (Engineering/Cloud Ops).
*   **MCC (Merchant Category Code) Restrictions:** Blocked: Gambling, Jewelry, Liquor Stores, Pawn Shops.
*   **Reconciliation:** Cardholders must reconcile transactions weekly.

---

## 4. Banking & Payroll Controls

### Bank Account Controls
*   **Dual Signatures:** Required for all outbound wires/ACH over **$10,000**.
*   **Reconciliation Cadence:** Monthly reconciliation of all accounts by the Controller by the 10th business day.
*   **Access Control:** "View-Only" access for the Accountant; "Full Admin" access limited to CFO/CEO.

### Payroll Controls
*   **Input vs. Output:** HR enters new hires/salary changes; Finance/CFO approves the final payroll run.
*   **Audit:** Quarterly audit of "Ghost Employees" by comparing payroll register to active HR records.
*   **Direct Deposit:** Requires dual-authorization for any change to employee banking details.

---

## 5. Vendor Onboarding & Payment Process

1.  **Onboarding:** Vendor must submit a **W-9 (US) or W-8BEN (Intl)** and verified banking instructions via a secure portal.
2.  **Verification:** A "Call-Back" procedure is mandatory for any vendor requesting a change to banking details (to prevent phishing).
3.  **Payment Run:** Weekly batch processing (e.g., every Thursday) to optimize cash flow.
4.  **Three-Way Match:** For hardware/large assets, match **Purchase Order (PO) + Receiving Report + Vendor Invoice** before payment.

---

## 6. Month-End Close Checklist (High-Level)

*   [ ] **Bank Recs:** All bank and credit card statements reconciled.
*   [ ] **Accruals:** Accrue for Cloud/AWS usage not yet invoiced (Critical for AI companies).
*   [ ] **Prepaids:** Amortize software licenses and annual insurance.
*   [ ] **Fixed Assets:** Record new hardware/scanners; calculate depreciation.
*   [ ] **Revenue Recognition:** Ensure digitization service revenue is recognized as work is completed.
*   [ ] **Variance Analysis:** Compare Actual vs. Budget; explain variances >10%.

---

## 7. Audit Preparation & Document Retention

### Audit Prep Guide
*   **PBC (Provided by Client) List:** Maintain a digital folder for auditors containing:
    *   General Ledger (GL) and Trial Balance.
    *   Org Chart and SoD Matrix.
    *   Sampled Invoices, POs, and Bank Statements.
*   **Internal Audit:** Conduct a "mini-audit" of T&E (Travel & Expense) every 6 months.

### Document Retention Schedule
| Document Type | Retention Period | Format |
| :--- | :--- | :--- |
| Tax Returns & Filings | Permanent | Digital |
| Contracts/Leases | Life of Contract + 7 Years | Digital |
| Payroll Records | 7 Years | Digital |
| General Ledger/Invoices | 7 Years | Digital |
| Board Minutes | Permanent | Digital |

---

## 8. Templates (Conceptual)

### [Template: Expense Report]
*   **Header:** Employee Name, Dept, Period, Purpose.
*   **Table:** Date | Category | Vendor | Description | Amount | Receipt Attached (Y/N).
*   **Footer:** Employee Signature | Manager Approval Signature.

### [Template: Purchase Order]
*   **Header:** PO Number, Date, Vendor Info, Requested By.
*   **Line Items:** Item SKU | Description | Qty | Unit Price | Total.
*   **Terms:** Net 30 | Shipping Terms | Delivery Date.
*   **Approvals:** Dept Head Signature | CFO Signature (if >$5k).

### [Template: Check Request]
*(Used for manual/emergency payments)*
*   **Payee:** Name & Address.
*   **Reason:** Detailed business justification.
*   **GL Coding:** Account Number | Department | Project Code.
*   **Approval:** Dual signature required.

---

## 9. Scaling Guidance

| Phase | Focus Area | Key Change |
| :--- | :--- | :--- |
| **Startup (1-10)** | Speed & Survival | Founder handles most approvals; informal "spreadsheet" accounting; high reliance on personal cards. |
| **Growth (11-30)** | Structure & Accuracy | Hire a Bookkeeper; implement automated expense software (Ramp/Brex); enforce the $500 threshold. |
| **Scale (31-50)** | Compliance & Control | Hire a Controller/CFO; implement formal PO system; move to monthly formal closes; prepare for external audit. |