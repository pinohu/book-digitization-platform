# A/B Testing Framework — Book Digitization Platform

This framework is designed specifically for a B2B/B2C SaaS model focused on AI-driven document processing. In this industry, the core value drivers are **accuracy perception, processing speed, and pricing transparency.**

---

# 1. Hypothesis Template
Every test must start with a structured hypothesis to prevent "fishing for results."

> **"If we [change/variable], then [primary metric] will [direction: increase/decrease] by [expected % amount] because [psychological or functional rationale]."**

*   *Example:* "If we **add a 'Sample Accuracy Report' to the pricing page**, then **trial sign-ups** will **increase** by **10%** because **users need to verify AI reliability before committing high-volume orders.**"

---

# 2. Statistical Foundations
To ensure results are not due to random noise, we adhere to these parameters:

*   **Significance Level ($\alpha$): 0.05 (95% Confidence).** The probability of a Type I error (False Positive). We accept a 5% risk of saying a change worked when it didn't.
*   **Statistical Power ($1-\beta$): 0.80 (80% Power).** The probability of avoiding a Type II error (False Negative). We want an 80% chance of detecting an effect if one actually exists.
*   **Minimum Detectable Effect (MDE):** The smallest lift that is economically meaningful to the business (e.g., a 2% lift in conversion). A smaller MDE requires a much larger sample size.
*   **Sample Size Calculator Inputs:**
    1.  Baseline Conversion Rate (current performance).
    2.  Desired MDE (sensitivity of the test).
    3.  $\alpha$ (0.05).
    4.  Power (0.80).

---

# 3. Test Duration Estimation
Never stop a test early just because the results look good. Use this logic:

**Formula for Sample Size per Variant ($n$):**
$$n \approx \frac{16 \cdot \sigma^2}{\Delta^2}$$
*(Where $\sigma^2$ is variance and $\Delta$ is the MDE)*

**Formula for Duration ($D$):**
$$D = \frac{n \times 2}{\text{Average Daily Traffic per Variant}}$$

**Rule of Thumb:** Always run tests for **full weekly cycles** (e.g., 7, 14, or 21 days) to account for day-of-the-week seasonality (e.g., B2B users behave differently on Monday vs. Sunday).

---

# 4. Test Prioritization (ICE Scoring)
Rank tests to ensure the team works on high-leverage items first.

| Component | Scoring (1–10) | Definition |
| :--- | :--- | :--- |
| **Impact** | 1–10 | How much will this move our North Star Metric? |
| **Confidence** | 1–10 | How sure are we that this will work (based on data/UX research)? |
| **Ease** | 1–10 | How little engineering/design effort is required? |

**Total ICE Score = Impact $\times$ Confidence $\times$ Ease**

---

# 5. Catalog of 15 High-Impact Tests

### **Pricing & Conversion**
1.  **Pricing Model:** Per-page pricing vs. Monthly subscription tiers.
2.  **Pricing Transparency:** Showing "Estimated Cost for 1,000 pages" vs. a generic "Contact Sales" button.
3.  **CTA Copy:** "Start Free Trial" vs. "Digitize Your First 5 Pages Free."

### **Onboarding & UX**
4.  **Onboarding Flow:** A guided "Wizard" (step-by-step) vs. a "Self-Serve" dashboard.
5.  **File Upload UX:** Drag-and-drop zone with immediate "File Type Validated" feedback vs. a standard upload button.
6.  **Progress Visualization:** A real-time "AI Processing" progress bar vs. a static "Processing..." spinner.
7.  **Accuracy Assurance:** Displaying an "AI Confidence Score" next to digitized text vs. just the text.

### **Landing Page & Trust**
8.  **Value Prop:** "Convert Books to Searchable Text" vs. "Unlock Your Library's Hidden Data."
9.  **Social Proof:** Displaying University/Law Firm logos vs. User Testimonial quotes.
10. **Demo Format:** A video walkthrough of the AI in action vs. static screenshots of the UI.

### **Retention & Email**
11. **Email Subject Line:** "Your documents are ready" (Informational) vs. "Your digitized library is waiting" (Benefit-driven).
12. **Re-engagement:** "Finish your upload" (Loss aversion) vs. "See how your books look digitized" (Curiosity).
13. **Upsell Trigger:** Showing "Storage Full" notification vs. "Upgrade for Unlimited Pages" banner.

### **Product Features**
14. **Search UX:** "Search within document" vs. "Search across entire library."
15. **Export Options:** Offering "Searchable PDF" vs. "JSON/Structured Data" (Targeting developers).

---

# 6. Implementation Checklist
*   [ ] **Tracking Setup:** Are all events (Click, Upload, Complete, Error) firing with correct properties?
*   [ ] **Segmentation Plan:** Do we need to view results by User Type (Individual vs. Enterprise) or Device?
*   [ ] **QA Split Check:** Does the traffic split 50/50? Is the control group actually seeing the control?
*   [ ] **Latency Check:** Does the new variation significantly slow down page load times?
*   [ ] **Assignment Persistence:** If a user refreshes, do they stay in the same bucket?

---

# 7. Analysis Template

| Metric | Control | Variant | Lift (%) | P-Value | Conf. Interval (95%) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Conversion Rate | 3.2% | 3.8% | +18.7% | 0.032 | [0.5%, 3.1%] |

**Decision Framework:**
1.  **Statistical Significance:** Is $p < 0.05$? (If no, the result is inconclusive).
2.  **Practical Significance:** Even if $p < 0.05$, is the lift large enough to justify the cost of permanent implementation?
3.  **Confidence Interval:** Does the interval include 0? (If it includes 0, the result is not significant).

---

# 8. Common Pitfalls
*   **Peeking:** Checking results every hour and stopping the test the moment it looks "significant." (This causes False Positives).
*   **Multiple Comparisons Problem:** Testing 10 different variations at once without adjusting your significance level (Bonferroni Correction).
*   **Novelty Effect:** Users clicking a button just because it's new/different, not because it's better. (Mitigate by running longer tests).
*   **Selection Bias:** Testing only on mobile users when the change is intended for desktop users.
*   **Ignoring Externalities:** Running a test during a massive marketing campaign or a holiday that skews incoming traffic quality.