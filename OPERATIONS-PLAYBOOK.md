# Operations Playbook — Book Digitization Platform

This Operations Playbook is designed for the unique hybrid model of **Origin Eyes Inc.** (the US-based tech provider) and **Criterion Educational Foundation** (the Nigerian content owner). 

Because you are digitizing *physical* books, your operations are not just "software"; they are a **Phygital (Physical + Digital) Supply Chain.** The biggest risk is not the AI, but the physical handling and logistics of the books in Nigeria.

---

# 1. STANDARD OPERATING PROCEDURES (SOPs)

### SOP 01: Customer Onboarding (The "Shipment & Intake" Process)
*   **Purpose:** To ensure physical books are received, inventoried, and ready for scanning without loss.
*   **Scope:** From payment to arrival at the scanning center.
*   **Steps:**
    1.  Customer pays $5/book via platform.
    2.  System generates a unique **Tracking ID** and a **Shipping Label**.
    3.  Customer receives "Packing Instructions" (how to wrap books to prevent damage).
    4.  Logistics partner picks up books in Nigeria and delivers to the Digitization Hub.
    5.  Hub staff scans the barcode; system marks status as "Received."
*   **Responsible Party:** Logistics Coordinator / Customer Success.
*   **Tools:** Stripe (Payments), ShipStation/Local Courier API, Internal Dashboard.
*   **SLA:** Inventory update within 24 hours of physical receipt.

### SOP 02: Order Fulfillment (The "Scan-to-Cloud" Loop)
*   **Purpose:** To convert physical pages into high-fidelity digital assets.
*   **Scope:** Physical handling $\rightarrow$ Scanning $\rightarrow$ AI Processing $\rightarrow$ Delivery.
*   **Steps:**
    1.  **Preparation:** Remove dust/debris; check for loose pages.
    2.  **Scanning:** High-speed overhead scanning (to avoid spine damage).
    3.  **AI Processing:** Upload raw images to the AI engine for OCR, layout reconstruction, and text correction.
    4.  **Review:** AI outputs are flagged for manual "Human-in-the-loop" (HITL) correction if confidence scores are $<95\%$.
    5.  **Packaging:** Return physical books to the customer or archive them.
*   **Responsible Party:** Digitization Technician / AI Specialist.
*   **Tools:** Overhead Book Scanner, AI OCR Engine (e.g., AWS Textract or proprietary), Cloud Storage.
*   **SLA:** 72 hours from "Received" to "Digital Delivery."

### SOP 03: Customer Support Escalation
*   **Purpose:** To resolve issues regarding lost books or poor digital quality.
*   **Scope:** Tier 1 (General) to Tier 3 (Management).
*   **Steps:**
    1.  **Tier 1:** Respond to "Where is my book?" or "Download link broken."
    2.  **Tier 2:** If book is "Lost in Transit" or "Digitization Failed," escalate to Ops Manager.
    3.  **Tier 3:** If financial refund is required or legal/asset loss occurs, escalate to CEO.
*   **Responsible Party:** Support Agent $\rightarrow$ Ops Manager $\rightarrow$ CEO.
*   **Tools:** Zendesk or Freshdesk.
*   **SLA:** Tier 1 (4 hrs), Tier 2 (24 hrs), Tier 3 (48 hrs).

### SOP 04: Billing and Collections
*   **Purpose:** To ensure seamless transactional revenue collection.
*   **Scope:** Payment authorization to receipt generation.
*   **Steps:**
    1.  Trigger payment at time of order.
    2.  Verify successful transaction via Webhook.
    3.  If payment fails, trigger "Retry" email sequence.
    4.  Generate automated tax-compliant invoice for the 501c3 records.
*   **Responsible Party:** Finance Lead (Automated).
*   **Tools:** Stripe / PayPal.
*   **SLA:** Instantaneous.

### SOP 05: Vendor Management (Hardware & Logistics)
*   **Purpose:** To ensure scanners and couriers maintain uptime.
*   **Scope:** Sourcing, auditing, and paying vendors.
*   **Steps:**
    1.  Monthly audit of courier delivery success rates.
    2.  Quarterly maintenance check on scanning hardware.
    3.  Review AI API costs vs. throughput.
*   **Responsible Party:** COO.
*   **Tools:** ERP or simple Google Sheets Tracker.
*   **SLA:** Vendor performance reviews conducted every 30 days.

### SOP 06: Quality Assurance (QA)
*   **Purpose:** To ensure the $5 product is "Classically Accurate."
*   **Scope:** Visual inspection of digital files.
*   **Steps:**
    1.  **Automated Check:** AI checks for blurry images or missing pages.
    2.  **Manual Spot Check:** QA Specialist reviews 5% of every book for font accuracy and margin integrity.
    3.  **Correction:** If error rate $>2\%$, the entire batch is sent back to "AI Processing."
*   **Responsible Party:** QA Specialist.
*   **Tools:** Internal QA Dashboard.
*   **SLA:** 100% of books must pass automated check; 5% manual check.

### SOP 07: Incident Response (Data & Physical Loss)
*   **Purpose:** To mitigate damage from server crashes or lost physical books.
*   **Scope:** Technical outages or physical theft/loss.
*   **Steps:**
    1.  **Detection:** Monitoring tools alert of downtime or "Missing Item" report.
    2.  **Containment:** Isolate the affected batch/server.
    3.  **Communication:** Notify affected customers within 4 hours.
    4.  **Resolution:** Restore from backup or initiate insurance claim for physical book.
*   **Responsible Party:** CTO (Tech) / Ops Manager (Physical).
*   **Tools:** PagerDuty, AWS CloudWatch.
*   **SLA:** Critical incidents resolved within 8 hours.

### SOP 08: Employee Onboarding
*   **Purpose:** To scale the workforce rapidly as volume grows.
*   **Scope:** Hiring to "First Independent Task."
*   **Steps:**
    1.  Issue hardware/access credentials.
    2.  Mandatory training on "Catholic Classic Handling" (respect for sacred texts).
    3.  Shadowing a Senior Technician for 3 days.
    4.  Practical test: Digitizing 1 small booklet with $0$ errors.
*   **Responsible Party:** HR / Ops Manager.
*   **Tools:** Notion (Training Manuals), Loom (Video training).
*   **SLA:** Full productivity within 7 days.

---

# 2. CORE PROCESS FLOWS

**The Value Chain: "The Digitization Loop"**

1.  **Acquisition:** Customer finds Criterion/Origin Eyes $\rightarrow$ Selects book $\rightarrow$ Pays $5.
2.  **Logistics Handoff:** Order $\rightarrow$ Shipping Label $\rightarrow$ Physical Collection (Nigeria).
3.  **Processing Handoff:** Hub Arrival $\rightarrow$ Scan $\rightarrow$ AI Engine $\rightarrow$ HITL Review.
4.  **Delivery Handoff:** QA Pass $\rightarrow$ Digital File Generation $\rightarrow$ Email Link to Customer.
5.  **Retention/Repeat:** Post-delivery survey $\rightarrow$ "Digitize your library" discount $\rightarrow$ Repeat Order.

*   **Decision Point:** *Is AI Confidence $>95\%$?* 
    *   Yes $\rightarrow$ Skip to QA. 
    *   No $\rightarrow$ Send to Human Review.
*   **Cycle Time Goal:** 3–5 Days Total.

---

# 3. CAPACITY PLANNING MODEL

**Constraint:** The primary bottleneck is **Scanning Throughput** (Physical) and **HITL Review Time** (Human).

| Customers/Mo | Books/Day | Required Staff (Scanning) | Required Staff (QA/HITL) | Scaling Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **10** | 0.3 | 1 (Part-time) | 0 (Owner) | Baseline |
| **100** | 3.3 | 1 (Full-time) | 1 (Part-time) | Hire 1st Scanner |
| **1,000** | 33 | 3 | 2 | Hire Scaling Team |
| **5,000** | 166 | 10 | 5 | Move to Industrial Hub |
| **10,000** | 333 | 20+ | 10+ | Implement Robotic Sorting |

---

# 4. QUALITY MANAGEMENT SYSTEM (QMS)

| Metric | Target | Inspection Point | Corrective Action |
| :--- | :--- | :--- | :--- |
| **OCR Accuracy** | $>99\%$ | Post-AI Processing | Re-run AI with higher sensitivity |
| **Page Integrity** | $100\%$ | Manual Spot Check | Re-scan physical book |
| **Format Fidelity** | $98\%$ | Post-QA | Adjust AI layout parameters |
| **CSAT (Customer)** | $>4.5/5$ | Post-Delivery | Root Cause Analysis (RCA) |
| **NPS** | $>50$ | Quarterly Survey | Product Roadmap adjustment |

---

# 5. KPI OWNERSHIP MATRIX

| Category | Metric | Definition | Target | Frequency | Owner | Escalation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Financial** | Gross Margin/Book | Revenue minus (Shipping+Labor+AI) | $>60\%$ | Monthly | CEO | If $<40\%$ |
| **Financial** | CAC | Cost to acquire 1 customer | $<\$1.50$ | Monthly | Marketing | If $>\$2.50$ |
| **Operational** | TAT | Turnaround Time (Days) | $<4$ Days | Weekly | Ops Manager | If $>7$ Days |
| **Operational** | Throughput | Books processed per hour | $X$ books/hr | Daily | Hub Lead | If $<80\%$ target |
| **Customer** | Error Rate | % of files requiring re-work | $<2\%$ | Weekly | QA Lead | If $>5\%$ |
| **Product** | AI Confidence | Avg. score from OCR engine | $>95\%$ | Weekly | CTO | If $<90\%$ |

---

# 6. VENDOR & TOOL STACK

| Function | Recommended Tool | Est. Monthly Cost |
| :--- | :--- | :--- |
| **Project Management** | Notion / Trello | $\$20 - \$50$ |
| **Communication** | Slack | $\$12/user$ |
| **Payments** | Stripe | $2.9\% + 30¢$ per trans. |
| **AI/OCR Engine** | AWS Textract / Google Vision | Usage-based ($\sim\$0.50/book$) |
| **Customer Support** | Zendesk | $\$49/user$ |
| **Documentation** | Google Workspace | $\$12/user$ |
| **Logistics Tracking** | Local Courier API | Variable |

---

# 7. OPERATING RHYTHM

*   **Daily (The Pulse):**
    *   *15-min Standup (Ops Team):* What did we scan yesterday? Any broken scanners? Any lost books?
*   **Weekly (The Review):**
    *   *Ops Review (Leadership):* Review TAT, Error Rates, and Throughput. Adjust staffing if needed.
*   **Monthly (The Strategy):**
    *   *Financial/Growth Review:* Review CAC, Gross Margin, and Customer Feedback.
    *   *Product Retrospective:* Is the AI getting better? Do we need new software?
*   **Quarterly (The Roadmap):**
    *   *Board Update (Origin Eyes/Criterion):* High-level mission progress, financial health, and scaling plans.