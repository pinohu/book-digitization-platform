# Referral Program Design — Book Digitization Platform

This design is tailored for a mission-driven, low-margin transactional model ($5/book). Because the margin is slim, the referral program must prioritize **platform credits** over cash to ensure the sustainability of the digitization effort while leveraging the "mission" (preserving Catholic Classics) to drive organic sharing.

---

### 1. INCENTIVE STRUCTURE (Dual-Sided)

To maintain a healthy margin, we will use a **"Credit-First"** model.

**A. Referrer Rewards (The "Preserver" Rewards)**
*   **Primary Reward:** Platform Credits (1 credit = $1).
*   **Tiered Structure:**
    *   **Bronze (1-2 referrals):** $1 credit per book digitized.
    *   **Silver (3-5 referrals):** $1.50 credit per book digitized + "Early Access" to new AI features.
    *   **Gold (6-10 referrals):** $2 credit per book digitized + "Digital Archivist" badge.
    *   **Platinum (11+ referrals):** $2.50 credit per book digitized + A monthly "Impact Report" showing how their referrals helped preserve Catholic heritage.

**B. Referee Rewards (The "New Archivist" Offer)**
*   **First Book Discount:** 20% off their first digitization ($4 instead of $5).
*   **Bonus:** 1 free "High-Resolution Enhancement" pass for their first book.

**C. Cost-Per-Acquisition (CPA) vs. Other Channels**
*   **Paid Ads (Meta/Google):** Estimated $3–$7 per customer (likely higher than the $5 revenue).
*   **Referral CPA:** $1.00–$2.50 (highly sustainable).

**D. Break-Even Calculation**
*   **Revenue per book:** $5.00
*   **Max Incentive (Platinum):** $2.50 (Referrer) + $1.00 (Referee Discount) = $3.50.
*   **Minimum Margin:** $1.50 (covers AI API costs and hosting).
*   **Note:** We will prioritize "Credit" rewards because they are "unspent" revenue, meaning the actual cash outflow is $0 until the referrer uses it.

---

### 2. VIRAL COEFFICIENT CALCULATION

**Formula:** $K = i \times c$
*(Where $i$ = average number of invites sent per user, and $c$ = conversion rate of those invites)*

*   **Baseline Assumptions:**
    *   Average invites per user ($i$): 5
    *   Conversion rate ($c$): 10% (0.10)
    *   **Current K-Factor:** $5 \times 0.10 = 0.5$ (Growth is linear, not exponential).
*   **Target K-Factor:** $> 1.0$ (Exponential growth).
*   **Sensitivity Analysis:**
    *   If $i$ increases to 10 (better email templates) $\to$ $K = 1.0$ (Break-even for virality).
    *   If $c$ increases to 20% (better landing page) $\to$ $K = 1.0$.
*   **Time-to-Virality:** Calculated by the "Viral Cycle Time" (the time from a user signing up to them sending their first invite). Target: < 7 days.

---

### 3. REFERRAL TRACKING IMPLEMENTATION

*   **Link Format:** `digitize.org/ref/user123`
*   **Cookie Duration:** 90 days (long enough to account for slow-moving institutional/church decision-making).
*   **Attribution Logic:** **Last-Touch Attribution.** The last link clicked before the transaction is credited to the referrer.
*   **Database Schema:**
    | Column | Type | Description |
    | :--- | :--- | :--- |
    | `referral_id` | UUID | Primary Key |
    | `referrer_id` | UUID | User who sent the link |
    | `referee_id` | UUID | User who clicked/signed up |
    | `status` | Enum | `pending`, `converted`, `expired` |
    | `reward_status`| Enum | `unclaimed`, `applied`, `paid` |
    | `created_at` | Timestamp| When link was clicked |
    | `converted_at`| Timestamp| When $5 payment was made |

*   **Anti-Fraud Measures:**
    *   **IP Dedup:** Prevent one person from creating multiple accounts on the same WiFi.
    *   **Email Domain Check:** Flag excessive signups from temporary/disposable email domains.
    *   **Threshold:** Rewards only trigger after a successful $5 transaction is cleared.
*   **Webhook Integration:** Upon `payment_intent.succeeded` in Stripe, trigger a webhook to the `Rewards_Service` to update the `referrer_id` balance.

---

### 4. EMAIL TEMPLATES

**Template 1: Invitation (From Referrer to Friend)**
*   **Subject:** Help me preserve these Catholic Classics 📚
*   **Body:** "Hi [Name], I’ve been using [Platform Name] to digitize some important physical books. It’s an amazing AI tool that preserves history. If you use my link, you get 20% off your first book, and it helps support the mission of preserving our heritage. Check it out: [Link]"

**Template 2: Referral Accepted (To Referrer)**
*   **Subject:** Good news! [Friend's Name] joined the mission.
*   **Body:** "Your friend just signed up! Once they digitize their first book, you'll receive your first credit. Keep sharing to reach Gold status!"

**Template 3: Reward Earned (To Referrer)**
*   **Subject:** You've earned $[X] in Digitization Credits! 🌟
*   **Body:** "Success! [Friend's Name] completed their digitization. $[X] has been added to your account. Use them to digitize your next classic for free!"

**Template 4: Welcome Email (To Referee)**
*   **Subject:** Welcome to the Archive! (Special gift inside 🎁)
*   **Body:** "Welcome to [Platform Name]. [Referrer Name] thinks you'll love our AI digitization. As a welcome gift, use code **WELCOME20** to get 20% off your first book. Let's preserve history together."

**Template 5: Milestone Reached (To Referrer)**
*   **Subject:** You've reached SILVER Status! 🥈
*   **Body:** "Congratulations! You have referred [X] books. You are now a Silver Member. You will now earn $1.50 in credit for every book digitized through your link. Thank you for your stewardship!"

---

### 5. LANDING PAGE COPY

**Headline Variations:**
1.  "Preserve the Classics. Earn While You Protect History."
2.  "Turn Your Library into a Digital Legacy."
3.  "Help Us Digitize Catholic Heritage & Get Rewarded."

**How It Works (3 Steps):**
1.  **Share Your Link:** Send your unique link to fellow scholars, clergy, or librarians.
2.  **They Digitize:** Your friends get a discount on their first book.
3.  **You Earn:** You receive credits to digitize your own collection for free.

**FAQ Section:**
*   *How do I get my credits?* (Credits are applied automatically after a successful transaction).
*   *Can I cash out?* (Credits are designed to be used within the platform to further the mission).
*   *Is there a limit to how many I can refer?* (No, the more you share, the higher your tier).
*   *What happens to the digital files?* (They are securely stored and high-res accessible).
*   *Does this support Criterion Foundation?* (Yes, every transaction supports the digitization of Catholic Classics).
*   *How long do my credits last?* (Credits never expire).

**CTA Button Variations:**
*   "Start Sharing & Earning"
*   "Claim My Referral Link"
*   "Join the Mission"

---

### 6. A/B TEST PLAN

| Test ID | Variable | Variant A (Control) | Variant B (Test) |
| :--- | :--- | :--- | :--- |
| **Test 1** | Incentive Amount | $1.00 Credit | $2.00 Credit |
| **Test 2** | Incentive Type | Platform Credit | Cash (via PayPal) |
| **Test 3** | Reward Side | Referrer Only | Dual-Sided (Both) |
| **Test 4** | Headline | "Earn Credits" | "Preserve History" |
| **Test 5** | Email Subject | "You have a reward" | "Mission Update: You helped!" |

*   **Sample Size:** Minimum 200 conversions per variant.
*   **Statistical Significance:** 95% (p < 0.05).
*   **Duration:** 14 days per test.

---

### IMPLEMENTATION TIMELINE (4 WEEKS)

*   **Week 1: Technical Setup.** Database schema implementation, unique link generator, and Stripe webhook integration.
*   **Week 2: Content & UI.** Landing page build, email template automation, and dashboard UI for "Referral Stats."
*   **Week 3: Beta Launch.** Internal testing with Origin Eyes team and select Criterion Foundation stakeholders.
*   **Week 4: Public Launch & Monitoring.** Full rollout and initial monitoring of K-factor and fraud alerts.

### SUCCESS METRICS
1.  **Viral Coefficient (K):** Target $> 0.5$ in Month 1, $> 1.0$ by Month 6.
2.  **Referral Conversion Rate:** % of people who click the link and actually pay $5.
3.  **CAC (Customer Acquisition Cost):** Total incentive cost / Total referred customers.
4.  **LTV (Lifetime Value):** Average number of books a referred user digitizes.