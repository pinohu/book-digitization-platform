# Weekly Metrics Dashboard — Book Digitization Platform

This metrics framework is designed for a high-velocity, transactional AI SaaS. Since your revenue is tied to individual transactions ($5/book), your focus must remain heavily on **Activation** (getting the first scan done) and **Retention** (getting the second scan done).

---

### 1. The Metrics Hierarchy

#### **Tier 1: Operational Health (Check Daily)**
*Focus: Is the engine running?*

| Metric | Definition | Data Source | Target Range | Alert Threshold |
| :--- | :--- | :--- | :--- | :--- |
| **Daily Revenue** | Total USD processed via payments. | Stripe / Payment Gateway | $500 - $1,000/day | < $350 (Red) |
| **New Signups** | Number of new user accounts created. | Auth Provider (Firebase/Auth0) | 50 - 100 / day | < 30 (Red) |
| **Activation Rate** | % of signups who complete 1st digitization within 24h. | Mixpanel / Amplitude | 40% - 60% | < 30% (Red) |

#### **Tier 2: Product Engagement (Check Weekly)**
*Focus: Do they like the product?*

| Metric | Definition | Data Source | Target Range | Alert Threshold |
| :--- | :--- | :--- | :--- | :--- |
| **Retention (D7)** | % of users who return to scan a 2nd book within 7 days. | Mixpanel / Segment | 25% | < 15% |
| **NPS** | Net Promoter Score (Survey: 0-10). | Typeform / In-app | 50+ | < 30 |
| **Support Tickets** | Total volume of incoming help requests. | Zendesk / Intercom | < 2% of Weekly Act. Users | > 5% of Weekly Act. Users |
| **Feature Adoption** | % of users using "AI Search/Summarization" feature. | Mixpanel | 30% | < 15% |

#### **Tier 3: Unit Economics (Check Monthly)**
*Focus: Is the business sustainable?*

| Metric | Definition | Data Source | Target Range | Alert Threshold |
| :--- | :--- | :--- | :--- | :--- |
| **LTV** | Average total revenue per user over their lifetime. | Stripe / Finance Sheet | $40+ (8+ books) | < $25 |
| **CAC** | Total Marketing Spend / Total New Users. | Google/Meta Ads + Finance | $10 - $15 | > $20 |
| **Payback Period** | Months required to recover CAC via user revenue. | Finance Model | < 3 Months | > 5 Months |

---

### 2. Communication Templates

#### **A. Slack Standup (Daily/Automated)**
*Channel: #ops-metrics*
> 🚀 **Daily Pulse: [Date]**
> 
> 💰 **Revenue:** $[Amount] (Target: $[Target]) `[🟢/🟡/🔴]`
> 👤 **Signups:** [Number] (Target: [Target]) `[🟢/🟡/🔴]`
> ⚡ **Activation:** [X]% (Target: [Target]%) `[🟢/🟡/🔴]`
> 
> 📝 **Quick Note:** *Revenue is up 10% due to a successful Twitter mention. Activation is slightly down; investigating friction in the OCR upload step.*

#### **B. Monday Metrics Email (Weekly Summary)**
*Subject: Weekly Growth Report | [Date Range] | [Status: Green/Yellow/Red]*

**Executive Summary:**
[One sentence summary of the week: e.g., "Strong growth in signups, but retention dipped due to a bug in the mobile upload flow."]

**The Numbers:**
*   **Revenue:** $[Value] (WoW: [↑/↓] X%)
*   **Retention (D7):** [X]% (WoW: [↑/↓] X%)
*   **NPS:** [Score]
*   **CAC:** $[Value]

**Key Wins:**
*   [Win 1]
*   [Win 2]

**Blockers/Risks:**
*   [Risk 1 - e.g., "Rising CPC on Google Ads"]

**Next Week's Focus:**
*   [Action Item 1]

#### **C. Weekly Review Meeting Agenda (30 Min)**
*Goal: Problem-solving, not just status updates.*

1.  **The Scorecard Review (5 min):** Rapid-fire walkthrough of Tier 1 & 2 metrics.
2.  **The "Red" Deep Dive (15 min):** Pick the 1-2 metrics in **Red** status. 
    *   *What happened?* (Root cause analysis)
    *   *What is the impact?*
    *   *What is the corrective action?*
3.  **The "Green" Analysis (5 min):** Why did [Metric] go up? Can we replicate this success?
4.  **Action Items & Owners (5 min):** Assign specific tasks for the coming week to fix/improve metrics.

---

### 3. Scorecard Template (Visual)

| Metric | Status | Current | Target | WoW Trend | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Daily Revenue** | 🟢 | $850 | $750 | ↗️ 12% | High volume from organic search |
| **Signups** | 🟡 | 45 | 50 | ↘️ 5% | Ad spend paused for testing |
| **Activation Rate** | 🔴 | 22% | 40% | ↘️ 8% | Bug in image upload on iOS |
| **Retention (D7)** | 🟢 | 28% | 25% | ➡️ 0% | Stable |
| **NPS** | 🟢 | 55 | 50 | ↗️ 2% | New UI feedback is positive |
| **Support Tickets** | 🟢 | 12 | <20 | ↘️ 10% | Documentation update helped |
| **Feature Adoption**| 🟡 | 18% | 30% | ↗️ 4% | AI Summary tool is gaining traction |

**Legend:**
*   🟢 **Green:** On track / Exceeding target.
*   🟡 **Yellow:** Within 15% of target / Caution.
*   🔴 **Red:** Below threshold / Immediate action required.
*   **Trend Arrows:** ↗️ (Up), ↘️ (Down), ➡️ (Flat).