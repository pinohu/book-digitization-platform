# Experiment Framework — Book Digitization Platform

This framework is designed to move you from a "service provider" mindset to a "scalable platform" mindset using Lean Startup principles. Because you are bridging a US-based 501c3 with a Nigerian educational foundation, your experiments must account for both **technological scalability** and **logistical feasibility.**

---

### 1. BUILD-MEASURE-LEARN LOOP
For this platform, the loop must focus on reducing the "Uncertainty of Scale"—can AI do this cheaply enough to make $5/book profitable?

*   **BUILD (The Minimum Viable Test):** Do not build the full AI engine first. Build a "Manual-to-AI" bridge. A "Build" is a single landing page, a manual digitization of one book to show quality, or a WhatsApp-based ordering bot.
*   **MEASURE (The Specific Metrics):** 
    *   *Conversion Rate (CVR):* % of visitors who request a quote or upload a book photo.
    *   *Unit Economics:* (Revenue per book) - (AI API cost + Human QA cost + Logistics cost).
    *   *Quality Score:* % of digitized pages requiring manual correction.
*   **LEARN (The Decision Criteria):** 
    *   *Pivot:* If logistics costs in Nigeria exceed $3/book, the $5 price point is dead. 
    *   *Persevere:* If CVR is >3% and Quality Score is >95%, build the automated pipeline.
*   **Cycle Time Target:** 7–10 days per loop.

---

### 2. HYPOTHESIS TEMPLATE
**Template:** "We believe that **[change]** for **[segment]** will cause **[metric]** to **[direction]** by **[amount]** because **[rationale]**. We will measure this by **[method]** over **[timeframe]**. Success criteria: **[threshold]**. If wrong, we will **[next action]**."

**Completed Examples:**
1.  "We believe that **offering a 20% bulk discount** for **Catholic Parishes** will cause **Total Volume** to **increase** by **30%** because **large institutions prefer predictable budgeting**. We will measure this by **A/B testing two pricing tables** over **2 weeks**. Success criteria: **>15% lift in volume**. If wrong, we will **test a 'Subscription' model instead**."
2.  "We believe that **adding a 'Searchable Text' badge** for **Scholars** will cause **Conversion Rate** to **increase** by **10%** because **researchers value keyword finding over image quality**. We will measure this by **split-testing landing page copy** over **1 week**. Success criteria: **>5% lift**. If wrong, we will **focus on high-resolution image quality instead**."
3.  "We believe that **offering a 'Donation Tier' ($10/book)** for **US-based donors** will cause **Average Order Value** to **increase** by **50%** because **they want to support the Nigerian Foundation**. We will measure this by **testing a 'Pay what you want' checkout** over **2 weeks**. Success criteria: **>20% of users choosing the higher tier**. If wrong, we will **stick to flat $5 pricing**."
4.  "We believe that **integrating WhatsApp ordering** for **Nigerian Educators** will cause **Lead Generation** to **increase** by **40%** because **WhatsApp is the primary business tool in Nigeria**. We will measure this by **tracking WhatsApp clicks vs. Email signups** over **1 week**. Success criteria: **WhatsApp leads > Email leads**. If wrong, we will **optimize the mobile web experience**."
5.  "We believe that **providing a 5-page free sample** for **Libraries** will cause **Sales Conversion** to **increase** by **25%** because **it builds trust in AI accuracy**. We will measure this by **tracking 'Sample Requested' to 'Paid Order' ratio** over **3 weeks**. Success criteria: **>10% conversion from sample to paid**. If wrong, we will **use video demonstrations instead**."

---

### 3. EXPERIMENT DESIGN GUIDE

| Type | Cost | Speed | When to use for Digitization Platform |
| :--- | :--- | :--- | :--- |
| **Landing Page Smoke Test** | $ | Very Fast | To see if people even want "Catholic Classics" digitized. |
| **Fake Door Test** | $ | Fast | Add a "Digitize My Library" button; if clicked, show "Coming Soon/Join Waitlist." |
| **Concierge MVP** | $$ | Medium | You manually scan the books yourself to see if customers actually pay the $5. |
| **Wizard of Oz** | $$ | Medium | The website looks like an AI platform, but a human is actually doing the OCR in the background. |
| **A/B Test** | $$$ | Slow | Testing two different pricing models ($5/book vs $50/10 books) on live traffic. |
| **Multivariate Test** | $$$$ | Very Slow | Testing combinations of headline, image, and color on the landing page. |

---

### 4. MINIMUM SAMPLE SIZES
*Assumptions: Baseline Conversion Rate (CR) = 2%. Statistical Power = 80%. Confidence = 95%.*

To detect a lift in conversion rate, you need these sample sizes (visitors per variant):

| Desired Lift | New CR Target | Required Sample Size (per variant) | Estimated Runtime (at 50 visitors/day) |
| :--- | :--- | :--- | :--- |
| **10% Lift** | 2.2% | ~75,000 | ~3 years (Too slow! Don't use A/B testing here) |
| **20% Lift** | 2.4% | ~37,000 | ~1.5 years (Use Qualitative/Concierge instead) |
| **50% Lift** | 3.0% | ~11,000 | ~7 months (Still slow; focus on high-intent segments) |

**Expert Advice:** At a $5 price point, do not rely on massive statistical A/B testing. Use **Qualitative Experiments** (interviews) and **Small-Batch Concierge MVPs** to find your "Signal."

---

### 5. EXPERIMENT BACKLOG (ICE SCORED)

| Exp Name | Hypothesis | I | C | E | ICE | Duration | Resources | Success Metric |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **WhatsApp Bot** | WhatsApp orders > Web forms in Nigeria | 9 | 8 | 9 | **26** | 1wk | Dev/Phone | WhatsApp Lead % |
| **Free Sample** | 5-page sample increases trust/sales | 8 | 7 | 8 | **23** | 2wk | Manual Scan | Sample $\to$ Sale % |
| **Bulk Pricing** | 10 books for $40 increases volume | 7 | 6 | 8 | **21** | 1wk | Web Dev | Avg Order Value |
| **Donor Tier** | US users will pay $10 to support mission | 7 | 5 | 7 | **19** | 2wk | Stripe/PayPal | Avg Order Value |
| **Searchable Tag** | Highlighting "Searchable" increases CVR | 6 | 7 | 8 | **21** | 1wk | Copywriter | Conversion % |
| **Video Demo** | Video of AI scanning increases trust | 6 | 6 | 7 | **19** | 2wk | Camera/Editor | Conversion % |
| **Subscription** | $20/mo for unlimited scans for schools | 5 | 4 | 5 | **14** | 4wk | Dev/Billing | MRR |
| **Physical Pickup** | Offering pickup in Lagos increases orders | 8 | 4 | 3 | **15** | 3wk | Logistics | Order Volume |
| **Email Nurture** | Follow up with "Abandoned Carts" | 5 | 8 | 8 | **21** | 1wk | Email Tool | Recovery Rate |
| **Affiliate Program** | Priests get $1 per book referred | 6 | 5 | 6 | **17** | 4wk | CRM/Manual | Referral Vol |
| **Bundle: Classics** | "The Catholic Starter Pack" (5 books) | 6 | 6 | 7 | **19** | 1wk | Content | Bundle Sales |
| **AI Accuracy Badge** | "99% Accuracy Guaranteed" increases CVR | 5 | 6 | 8 | **19** | 1wk | Copywriter | Conversion % |
| **Social Proof** | Testimonials from Nigerian Priests | 7 | 6 | 7 | **20** | 2wk | Interviews | Conversion % |
| **Referral Discount** | "Refer a Parish, get 5 books free" | 5 | 5 | 7 | **17** | 2wk | Referral Tool | Viral Coefficient |
| **Language Toggle** | English/Latin/French toggle for classics | 4 | 5 | 5 | **14** | 3wk | Dev | Session Duration |

---

### 6. INNOVATION ACCOUNTING

**Level A: Establish Baseline (The "Current Reality")**
*   Current Cost to Digitization (Manual): $X
*   Current Conversion Rate: X%
*   Current CAC (Customer Acquisition Cost): $X

**Level B: Tune the Engine (The "Optimization Phase")**
*   Target Unit Margin: > $2.50 per book.
*   Target AI Accuracy: > 98%.
*   Target CVR: > 3%.

**Level C: Pivot or Persevere (The "Strategic Decision")**
*   *Decision Rule:* If Unit Margin is < $1 after 10 experiments, **Pivot** (Change price or change target segment).
*   *Decision Rule:* If CVR is high but Margin is low, **Pivot** (Focus on AI automation efficiency).

**Dashboard Template:**
| Metric | Baseline | Target | Current | Status (🟢/🟡/🔴) |
| :--- | :--- | :--- | :--- | :--- |
| Conversion Rate | 1.0% | 3.0% | 1.2% | 🟡 |
| Gross Margin/Book | $1.00 | $2.50 | $0.80 | 🔴 |
| AI Accuracy % | 85% | 98% | 88% | 🟡 |
| CAC | $10.00 | $5.00 | $12.00 | 🔴 |

---

### 7. EXPERIMENT DOCUMENTATION TEMPLATE

*   **Experiment ID:** [e.g., EXP-001]
*   **Date:** [YYYY-MM-DD]
*   **Hypothesis:** [Full text from template]
*   **Design:** [e.g., Concierge MVP via WhatsApp]
*   **Duration:** [Start Date] to [End Date]
*   **Sample Size:** [Total visitors/users reached]
*   **Results:** [Raw data: e.g., 100 visitors, 5 sales]
*   **Statistical Significance:** [p-value or "Not applicable - Qualitative"]
*   **Decision:** [Persevere / Pivot / Abandon]
*   **Learnings:** [What did we learn about the customer's behavior?]
*   **Follow-up:** [e.g., "Next, test if a $7 price point works for these same users."]