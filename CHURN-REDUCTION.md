# Churn Reduction Playbook — Book Digitization Platform

Because your business model is **transactional ($5/book)** rather than a recurring monthly subscription, "churn" in your context is defined as **Customer Attrition** (the failure of a customer to return for their next book). 

Traditional SaaS churn metrics apply to the *account level*, but for you, we must focus on **Repeat Purchase Rate (RPR)**. This playbook is adapted to treat the "end of a digitization project" as the churn event.

---

# 📘 Book Digitization Platform: Churn Reduction Playbook

## 1. CHURN TAXONOMY
*Since this is a mission-driven project (Catholic Classics), churn reasons often overlap with the difficulty of preserving physical history.*

### Voluntary Churn (Customer stops digitizing)
*   **Price Sensitivity:** The $5/book cost exceeds the perceived value of a single volume, or budget constraints in the Nigerian context.
*   **Value Gap:** The AI output (OCR quality) wasn't accurate enough for complex theological texts or Latin/Old English fonts.
*   **Competitor Switch:** Customer found a local scanning service or a free (but lower quality) mobile app.
*   **Need Dissolved:** The specific collection of books is finished, or the library project has been paused.
*   **Poor Experience:** AI errors, slow upload speeds, or difficulty navigating the interface.

### Involuntary Churn (Failed transactions/Bulk orders)
*   **Card Decline:** Most critical for Nigeria-to-US transactions (FX restrictions, international spending limits).
*   **Billing Error:** Issues with bulk-order processing or credit/debit mismatches.
*   **Payment Method Issues:** Local bank policies blocking USD transactions.

---

## 2. SAVE FLOW SCRIPTS
*Tone Guidance: Respectful, scholarly, mission-aligned, and helpful. Avoid "salesy" language; use "stewardship" language.*

### A. Price Objection (The "Value Reframe")
*   **Goal:** Move from "Cost per book" to "Cost of loss."
*   **Tone:** Empathetic but firm on value.
*   **Script:** "I understand that budget is a key consideration. When we look at the cost, it’s actually an investment in the permanent preservation of [Book Title]. For $5, we ensure this wisdom is searchable and accessible forever. Would a bulk-package discount (e.g., 10 books for $40) help make this more sustainable for your library?"
*   **Escalation:** If they decline, offer a "Lite" service (lower resolution/no search index) at $3/book.

### B. Value Gap (The "Success Plan")
*   **Goal:** Fix the AI output quality perception.
*   **Tone:** Consultative/Technical.
*   **Script:** "I noticed you haven't uploaded a new volume lately. I want to ensure our AI is meeting the high standards required for Catholic Classics. Are you finding the text recognition accurate enough for your needs? I’d love to host a 10-minute screen share to optimize your settings or manually review a sample for you."
*   **Escalation:** If OCR fails, escalate to a human editor for a "Manual Correction Credit."

### C. Competitor Switch (The "Differentiation")
*   **Goal:** Highlight the "Niche AI" advantage.
*   **Tone:** Curious and non-defensive.
*   **Script:** "I see you're exploring other options. To help us improve, may I ask what they are offering that we aren't? We specialize specifically in the complex typography of historical religious texts—something general scanners often struggle with. I'd love to see if we can match their pricing to keep your collection centralized."
*   **Escalation:** Offer a "Migration Credit" (free digitization of 1 book) to bring them back.

### D. Need Dissolved (The "Graceful Pause")
*   **Goal:** Keep the door open for the next collection.
*   **Tone:** Gracious.
*   **Script:** "It sounds like you've completed your current digitization project—congratulations on preserving those works! We will keep your digital archive secure. Should you acquire new volumes in the future, we are here to help. Would you like us to send you a quarterly update on new AI features that might assist your future projects?"

---

## 3. CANCELLATION SURVEY
*Implementation: An in-app modal triggered when a user attempts to "Deactivate Account" or "Close Project."*

1.  **Primary Reason (Single Select):**
    *   Cost is too high
    *   AI accuracy/Quality issues
    *   Found another service
    *   Finished my current books
    *   Technical issues/Bugs
    *   Other
2.  **Secondary Factors (Multi-select):**
    *   Slow upload speed, Hard to use, Poor customer support, Better pricing elsewhere, AI couldn't read my text, International payment issues, Project ended, No longer need digital copies, Too many steps to upload, Other.
3.  **Feature most valued:** [Open Text]
4.  **Feature most missing:** [Open Text]
5.  **Would you return if [Condition]?** (e.g., "If we offered bulk discounts," "If OCR accuracy improved," "If we supported more local payment methods.")
6.  **NPS Score:** (0–10)
7.  **Permission to follow up?** (Yes/No)

---

## 4. WIN-BACK CAMPAIGN (3-Email Sequence)

### Email 1: The "Mission" Email (Day 3)
*   **Subject 1:** Preserving history, one page at a time.
*   **Subject 2:** We miss your collection.
*   **Subject 3:** A quick note from [Platform Name].
*   **Preview:** Your digital archive is waiting for you.
*   **Body:** "Dear [Name], we noticed you've stepped away from your digitization project. We truly value the work you are doing to preserve these Catholic Classics. We just wanted to let you know that your uploaded files are safe and ready whenever you are. No action is needed—we just wanted to say thank you for being part of our mission."
*   **CTA:** [View My Archive]

### Email 2: The "Value Update" Email (Day 14)
*   **Subject 1:** New AI improvements for your books.
*   **Subject 2:** Better accuracy for your classics.
*   **Subject 3:** See what's new at [Platform Name].
*   **Preview:** We've upgraded our OCR technology.
*   **Body:** "Since you left, we've been working hard. Our AI engine has been updated to better recognize older fonts and complex theological notations. [Insert Customer Story: 'How St. Jude Library digitized 50 volumes in a week']. To welcome you back, use code **RETURN20** for 20% off your next 3 books."
*   **CTA:** [Claim My 20% Discount]

### Email 3: The "Last Chance" Email (Day 30)
*   **Subject 1:** Final offer: 30% off your next project.
*   **Subject 2:** Don't let your library stay physical.
*   **Subject 3:** A special gift for [Name].
*   **Preview:** Your discount expires in 48 hours.
*   **Body:** "We don't want your project to stall. We’re offering one final incentive to help you continue your work: 30% off your next batch of books. This offer expires in 48 hours. Let’s get those classics into the digital age together."
*   **CTA:** [Reactivate My Account Now]

---

## 5. INVOLUNTARY CHURN RECOVERY (Dunning)
*Crucial for Nigeria-to-US transactions.*

*   **Pre-dunning (7 days before):** "Your card ending in [XXXX] is set to expire soon. Update it now to prevent interruption in your digitization project."
*   **Day 0 (Failed Payment):** "Payment failed. We attempted to process your order for [Book Name]. Please update your payment method to ensure your digital files are processed."
*   **Day 3 (Urgency):** "Action Required: We are having trouble processing your payment. To avoid a pause in your service, please check your international transaction limits."
*   **Day 7 (Warning):** "Your account will be paused in 3 days due to failed payment. Please update your details to keep your library active."
*   **Day 10 (Final/SMS):** "Final Attempt: Your account will be paused tomorrow. [Link to Update]."
*   **Day 14 (Account Paused):** "Your account is now paused. Your data is safe! You have 30 days to reactivate before files are archived."
*   **Day 44 (Archived):** "Your data has been moved to long-term storage. Contact support to restore it."

**Smart Retry Logic:**
*   **Retry Schedule:** Retry on the **1st and 15th** of the month (standard Nigerian payday).
*   **Time of Day:** Retry at 10:00 AM local time (Lagos) to ensure banks are open.

---

## 6. CHURN METRICS DASHBOARD

### Key Performance Indicators (KPIs)
*   **Repeat Purchase Rate (RPR):** % of customers who buy >1 book. (Target: >40%)
*   **Gross Churn Rate:** % of customers who stop digitizing per month.
*   **Net Churn Rate:** (Churned customers - Win-back customers).
*   **Revenue Impact:** Total USD lost due to "Price" vs "Technical" reasons.
*   **Save Rate:** % of people who intended to cancel but accepted a discount/reframe.
*   **Involuntary Recovery Rate:** % of failed payments successfully recaptured.

### Benchmarks & Targets
| Metric | AI/SaaS Benchmark | **Your Target (Niche/Transactional)** |
| :--- | :--- | :--- |
| **Monthly Churn** | 3% - 5% | **< 10% (Higher due to project nature)** |
| **Win-Back Rate** | 5% - 10% | **15% (High due to mission/niche)** |
| **Involuntary Recovery**| 20% - 30% | **40% (Critical for NG-US corridor)** |

### Leading Indicators (The "Early Warning System")
*   **Usage Drop:** Customer hasn't logged in for 14 days.
*   **Support Tickets:** Increase in "OCR Accuracy" or "Error" tickets.
*   **Payment Failures:** First-time decline on a card.