# Organizational Design — Book Digitization Platform

This Organizational Design document is prepared for the **Book Digitization Platform**, a joint venture between Origin Eyes Incorporated (USA) and Criterion Educational Foundation (Nigeria). 

The complexity of this business lies in its **hybrid nature**: it requires high-end AI/Software development (US-centric) and physical logistics/book handling (Nigeria-centric), all while maintaining a transactional revenue model that requires high throughput and low error rates.

---

# ORG DESIGN BLUEPRINT: BOOK DIGITIZATION PLATFORM

## 1. ORGANIZATIONAL STRUCTURE
The structure evolves from a "Founder-Led" model to a "Functional" model, and finally to a "Divisional/Matrix" model.

### Stage 1: Founding Team (1–5 People)
*Focus: Product-Market Fit & MVP Development.*
1.  **CEO (Founder):** Vision, Fundraising, US-Nigeria legal liaison.
2.  **CTO:** AI/ML architecture, core software development.
3.  **COO (Operations Lead):** Physical book logistics in Nigeria, scanning workflows.
4.  **Full-Stack Engineer:** Building the transactional interface/web platform.
5.  **AI/Data Specialist:** Data labeling and OCR model fine-tuning.

### Stage 2: Growth Stage (6–20 People)
*Focus: Scaling throughput and automating the pipeline.*
*   **Leadership:** CEO, CTO, COO.
*   **Engineering:** Lead Engineer, DevOps Engineer, AI Research Engineer, Frontend/Backend Engineers.
*   **Operations:** Scanning Supervisor, Quality Control (QC) Lead, Logistics Coordinator.
*   **Growth:** Product Manager, Sales/Partnership Lead, Customer Success Specialist.

### Stage 3: Scale Stage (21–50 People)
*Focus: Market expansion and high-volume automation.*
*   **Executive:** CEO, CTO, COO, CFO (Fractional/Full-time), Head of Sales.
*   **Product/Tech:** VP Engineering, Product Director, multiple Stream-aligned squads (AI, Platform, UX).
*   **Operations:** Regional Ops Managers (Nigeria/Other), Warehouse/Logistics Team, massive QC/Data Labeling team.
*   **Commercial:** Sales Account Managers, Marketing Manager, Customer Support Team.

---

## 2. RACI MATRIX
| Decision | CEO | CTO | COO | Head of Prod | Head of Sales |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Product Roadmap** | C | A | I | **R** | C |
| **Pricing Changes** | **A** | C | I | R | C |
| **Hiring (Leadership)** | **A/R** | C | C | I | I |
| **Firing (Leadership)** | **A/R** | C | C | I | I |
| **Budget Allocation** | **A** | R | R | C | C |
| **Partnerships** | **A/R** | C | C | I | R |
| **Customer Escalations** | I | I | C | A | **R** |
| **Marketing Campaigns** | I | I | I | C | **A/R** |
| **Technical Architecture** | I | **A/R** | I | C | I |
| **Legal/Compliance** | **A/R** | C | C | I | I |
| **Fundraising** | **A/R** | C | I | I | I |
| **Vendor Selection** | I | **A/R** | R | I | I |

*R = Responsible | A = Accountable | C = Consulted | I = Informed*

---

## 3. REPORTING LINES
*   **Stage 1:** Flat. All report to CEO.
*   **Stage 2:** Functional. Engineering reports to CTO; Operations reports to COO; Product/Sales report to CEO.
*   **Stage 3:** Hierarchical. CEO $\rightarrow$ VPs $\rightarrow$ Directors $\rightarrow$ Managers $\rightarrow$ ICs.

**Dual-Reporting Guidance:**
*   **Acceptable:** A "Quality Control" specialist in Nigeria may report to the **COO** (for local logistics/attendance) but have a dotted line to the **CTO/Head of AI** (for technical accuracy standards).
*   **Harmful:** A Software Engineer reporting to both the CTO and the Product Manager. This creates conflicting priorities (Technical Debt vs. Feature Speed).

---

## 4. SPAN OF CONTROL
| Function | Recommended Span | Justification |
| :--- | :---: | :--- |
| **Engineering** | 5–7 | High cognitive load. AI development requires deep work and frequent technical mentorship. |
| **Sales/Growth** | 8–10 | Transactional model requires high activity volume; management is more about coaching/KPIs. |
| **Operations/QC** | 12–15 | High-repetition tasks (scanning/checking). Requires standardized SOPs and less frequent 1-on-1s. |
| **Support** | 10–12 | Balance between emotional intelligence (customer issues) and technical troubleshooting. |

---

## 5. DECISION RIGHTS FRAMEWORK
We use the **Amazon-style Type 1/Type 2** model to prevent bottlenecks.

*   **Type 1 (Irreversible):** High stakes, hard to undo. *Decision: CEO/Founder Only.*
    *   Ex: Changing the legal entity structure, pivoting away from AI to manual transcription, taking on debt, changing the core AI model architecture.
*   **Type 2 (Reversible):** Low stakes, easy to undo. *Decision: Delegated to Leads.*
    *   Ex: Adjusting monthly pricing for a specific niche, changing a marketing channel, selecting a new scanning hardware vendor (within budget), UI/UX tweaks.

**Decision Matrix Example:**
| Impact Level | < $5,000 | $5,000 - $50,000 | > $50,000 |
| :--- | :--- | :--- | :--- |
| **Low (Operational)** | Team Lead (Type 2) | Dept Head (Type 2) | COO (Type 1/2) |
| **High (Strategic)** | Dept Head (Type 2) | COO (Type 1/2) | CEO (Type 1) |

---

## 6. TEAM TOPOLOGY
To scale the AI platform, we organize teams by their interaction patterns:

1.  **Stream-aligned Teams:** These teams own a customer journey from start to finish. 
    *   *Example:* "The Digitization Pipeline Team" (Handles everything from physical book receipt to digital delivery).
2.  **Platform Teams:** They provide the internal tools that the stream-aligned teams use.
    *   *Example:* "Cloud Infrastructure Team" (Manages AWS/Azure, API uptime, and storage).
3.  **Enabling Teams:** Specialists who help others overcome gaps.
    *   *Example:* "AI Research Team" (They don't build the product; they provide the latest OCR/LLM research to the engineers).
4.  **Complicated-subsystem Teams:** Highly specialized math/science teams.
    *   *Example:* "Computer Vision Core Team" (Focused solely on the mathematical accuracy of character recognition in low-light/old paper conditions).

---

## 7. FIRST 10 HIRES (Ordered Sequence)

| Order | Role | Key Responsibility | Salary Range (Est.) | Why This Sequence? |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **CTO** | Tech roadmap & AI architecture | $120k-$180k+ | Must build the engine before the car can move. |
| 2 | **COO** | Nigeria operations & logistics | $70k-$110k | Must establish the physical "input" (the books). |
| 3 | **AI Engineer** | OCR & ML model training | $90k-$140k | To turn images into usable data. |
| 4 | **Full-Stack Dev** | Customer portal & API | $80k-$130k | To allow customers to upload/pay/download. |
| 5 | **Ops Manager** | Managing scanning staff in Nigeria | $40k-$60k | To manage the physical labor of the books. |
| 6 | **Product Manager** | UX and workflow optimization | $85k-$130k | To ensure the tool is actually usable for publishers. |
| 7 | **QA/Data Specialist** | Data labeling & accuracy testing | $45k-$65k | AI is only as good as the training data. |
| 8 | **Sales Lead** | Partnership acquisition | $60k + Comm | To start generating transactional revenue. |
| 9 | **DevOps Engineer** | Scaling cloud infrastructure | $100k-$150k | To ensure the platform doesn't crash under load. |
| 10 | **Customer Success** | Onboarding & retention | $50k-$70k | To protect the revenue once it starts flowing. |

---

## 8. CULTURE ARCHITECTURE

### 5 Operating Principles
1.  **Accuracy Over Speed:** In digitization, a single error in a sacred text is a failure. We prioritize high-fidelity output.
2.  **Data-Driven Iteration:** We don't guess if the AI is working; we measure the Character Error Rate (CER).
3.  **Cross-Border Empathy:** Respect the time zones and cultural nuances between the US tech hub and the Nigeria operations hub.
4.  **Automate the Mundane:** If a human does a task twice, we find a way to code it.
5.  **Radical Transparency:** Because we are a 501c3-linked entity, we maintain high standards of financial and operational clarity.

### Meeting Cadence
*   **Daily:** 15-min Asynchronous Standup (Slack/Teams) — *What did you do? What are you doing? Any blockers?*
*   **Weekly:** Functional Syncs (Eng Sync, Ops Sync) — *Reviewing KPIs and immediate hurdles.*
*   **Monthly:** All-Hands — *Company wins, revenue updates, and mission alignment.*
*   **Quarterly:** Strategy Offsite — *Reviewing the roadmap and adjusting the "Type 1" decisions.*

### Communication Norms
*   **Asynchronous-First:** Due to the US/Nigeria time difference, all major decisions and updates must be documented in writing (Notion/Slack) so people can respond during their own working hours.
*   **Documentation over Conversation:** If it isn't written down, it didn't happen.

### Work Mode Recommendation
*   **Engineering/Product:** **Remote-First.** Access to global talent.
*   **Operations/Logistics:** **In-Person (Nigeria).** Physical books require a central hub for scanning and security.
*   **Leadership:** **Hybrid.** Periodic physical meetups in both US and Nigeria to build trust.