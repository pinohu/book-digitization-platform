# Retention Playbook — Book Digitization Platform

This Retention Playbook is specifically designed for a **transactional, high-volume, low-ticket ($5/unit)** model. In a transactional business, "Churn" is not a cancellation button; it is **"Lapse"**—the moment a customer stops returning to digitize their next book.

---

# 📘 RETENTION PLAYBOOK: Book Digitization Platform
**Prepared for:** Criterion Educational Foundation & Origin Eyes Inc.

---

## 1. CHURN SEGMENTATION
In a $5/book model, we distinguish between those who *choose* to stop (Voluntary/Lapse) and those who *cannot* finish a transaction (Involuntary).

**Expected Split:** 
* **85% Voluntary (Lapsed):** Users who finished their current batch or lost interest.
* **15% Involuntary (Payment Failure):** Technical friction, particularly in cross-border (US-Nigeria) transactions.

| Segment | Description | Primary Driver |
| :--- | :--- | :--- |
| **The Completionist** | Finished their entire physical library. | Project End |
| **The Price-Sensitive** | High volume of books, but $5/book exceeds budget. | Economic |
| **The Quality-Skeptic** | OCR errors in Latin/Old English text caused frustration. | Product Gap |
| **The Tech-Friction** | Payment failed due to international card restrictions. | Involuntary |
| **The Competitor-Switch** | Moved to a bulk scanning service or local library. | Competition |
| **The One-Timer** | Digitized one specific classic and has no more needs. | Lifecycle |

---

## 2. CHURN REASON TAXONOMY
| Category | Reason | Freq. | Prev. (1-5) | Cost |
| :--- | :--- | :--- | :--- | :--- |
| **Product/Tech** | 1. Poor OCR accuracy (Old English/Latin) | High | 4 | Med |
| | 2. Slow processing time | Med | 3 | Low |
| | 3. UI/UX complexity | Low | 3 | Med |
| | 4. File format incompatibility | Low | 5 | Low |
| **Financial** | 5. High per-unit cost for large archives | High | 4 | High |
| | 6. Lack of bulk/volume discounts | High | 5 | Med |
| | 7. Currency fluctuation (USD vs NGN) | Med | 2 | High |
| | 8. Budget exhaustion | High | 3 | Low |
| **User Lifecycle**| 9. Project/Archive completed | High | 1 | Low |
| | 10. Loss of interest in digitization | Med | 2 | Low |
| | 11. Moving to digital-only collections | Low | 1 | Low |
| | 12. Seasonal usage (Academic cycles) | Med | 3 | Low |
| **Competition** | 13. Cheaper local scanning services | Med | 3 | High |
| | 14. Higher quality professional scanners | Low | 4 | High |
| | 15. Competitor has better AI features | Low | 4 | Med |
| **Experience** | 16. Poor customer support response | Low | 5 | Low |
| | 17. Broken upload workflow | Low | 5 | Low |
| | 18. Payment gateway errors (Cross-border) | High | 5 | Low |
| | 19. Lack of "Preview" before purchase | Med | 4 | Low |
| | 20. Misaligned expectations of "Digital" | Low | 3 | Low |

---

## 3. SAVE FLOW SCRIPTS (Lapse Prevention)
*Since this is transactional, these are triggered when a user abandons a "Cart" or fails a batch upload.*

**Scenario 1: The Price-Sensitive (High Volume User)**
* **Opening:** "We noticed you have a large collection of classics waiting to be preserved."
* **Probe:** "Are you finding the per-book cost a bit high for your current archive project?"
* **Offer:** "We can offer a **Volume Bundle**: 20 books for $75 (saving you $25)."
* **Close:** "Click here to apply your Archive Discount to your next batch."

**Scenario 2: The Quality-Skeptic (After a bad OCR report)**
* **Opening:** "We want your digital classics to be as perfect as the originals."
* **Probe:** "Did the text recognition in your last batch meet your scholarly standards?"
* **Offer:** "Let us fix it. We will provide **3 books for free** with manual AI-correction tuning."
* **Close:** "Upload your next book and we will prioritize manual quality oversight."

**Scenario 3: The Tech-Friction (Payment Failed)**
* **Opening:** "It looks like we had trouble processing your last digitization request."
* **Probe:** "Was this due to a card error or a preferred payment method issue?"
* **Offer:** "We now support [Local Payment Method/Alternative]. Use code **FIXIT** for $1 off your next book."
* **Close:** "Update your payment method here to resume your project."

**Scenario 4: The Project Completion (The "Goodbye" Save)**
* **Opening:** "It looks like your current digitization project is wrapping up!"
* **Probe:** "Do you have more physical volumes, or are you moving to a different format?"
* **Offer:** "Keep your archives growing. Get **$2 off per book** for any future uploads in the next 60 days."
* **Close:** "Save your discount code for your next collection."

**Scenario 5: The Abandoned Cart (User stopped mid-upload)**
* **Opening:** "Don't let those classics gather dust!"
* **Probe:** "Did something go wrong during your upload process?"
* **Offer:** "Finish your current batch of 5 books and we'll add **1 bonus book for free**."
* **Close:** "Resume your upload now."

---

## 4. REACTIVATION CAMPAIGNS (For Lapsed Users)
**Target:** Users who haven't uploaded a book in 60 days.

**Sequence A: The "Value-Driven" (For Scholars/Researchers)**
* **Day 30:** *Subject: Preserving History, One Page at a Time.* Body: Remind them of the mission. "Your physical books are aging. Let's secure them digitally."
* **Day 45:** *Subject: New Feature: Enhanced Latin/Ecclesiastical OCR.* Body: "We've improved our AI for religious texts."
* **Day 60:** *Subject: A special gift for your library.* Body: "Get 5 books for $20 (only $4/book)."

**Sequence B: The "Friction-Fix" (For Payment/Tech Failures)**
* **Day 30:** *Subject: We fixed the issue!* Body: "We've updated our payment gateway to make US-Nigeria transfers seamless."
* **Day 45:** *Subject: Faster scans are here.* Body: "Our processing speed has doubled."
* **Day 60:** *Subject: Come back and try us again.* Body: "First book is on us. Use code: RESTART."

---

## 5. RETENTION METRICS DASHBOARD

| Metric Name | Formula | Target | Frequency | Alert Threshold |
| :--- | :--- | :--- | :--- | :--- |
| **Repeat Purchase Rate (RPR)** | (Users with >1 purchase / Total Users) | >35% | Monthly | <25% |
| **Time Between Purchases (TBP)** | Avg. days between book uploads | 45 Days | Weekly | >60 Days |
| **Lapse Rate** | (Users inactive >90 days / Total Users) | <15% | Monthly | >20% |
| **Churned Revenue (Lapsed)** | Total potential $ from lapsed users | N/A | Monthly | N/A |
| **OCR Error Rate** | (Failed OCRs / Total Uploads) | <3% | Daily | >5% |
| **Payment Success Rate** | (Successful Transactions / Attempts) | >90% | Daily | <80% |
| **Customer Lifetime Value (CLV)** | Avg. books per user × $5 | $50 | Quarterly | <$30 |
| **CAC : LTV Ratio** | Cost to Acquire / CLV | 1:3 | Quarterly | <1:2 |
| **Reactivation Rate** | (Reactivated Users / Lapsed Users) | >5% | Monthly | <2% |
| **Support Ticket Volume** | Total tickets / Total transactions | <2% | Weekly | >5% |
| **Refund Rate** | (Refunds / Total Transactions) | <1% | Monthly | >3% |
| **NPS (Net Promoter Score)** | Survey: "Likelihood to recommend" | >50 | Bi-Annually | <30 |

---

## 6. WIN-BACK EMAIL SEQUENCE (90-Day Window)

**Email 1 (Day 3): "We miss you."**
* *Subject:* We miss your library!
* *Body:* "Hi [Name], we noticed it's been a while since your last book was digitized. The physical copies are beautiful, but their digital legacy is waiting. We're here whenever you're ready to continue your archive."

**Email 2 (Day 14): Value Reminder**
* *Subject:* Protect your classics from time.
* *Body:* "Did you know? Physical paper degrades every year. Digitization ensures your Catholic classics are readable for centuries. See how our AI handles complex text: [Link to Demo/Video]."

**Email 3 (Day 30): New Feature Announcement**
* *Subject:* Better, faster, smarter digitization.
* *Body:* "We've been working hard! We just launched [Enhanced Search/Improved Latin OCR]. It makes finding specific passages in your digitized books easier than ever. Try it on your next book."

**Email 4 (Day 60): Special Offer**
* *Subject:* A gift for your collection.
* *Body:* "We want to make it easy to come back. For the next 7 days, digitize any book for just **$3**. Use code: **CLASSIC3** at checkout."

**Email 5 (Day 90): Final Attempt**
* *Subject:* Closing your account preferences.
* *Body:* "We don't want to clutter your inbox. We'll stop sending these reminders for now. If you ever need to preserve your library, we'll be here. [Link: Re-activate/Update Preferences]."

---

## 7. INVOLUNTARY CHURN PREVENTION (Dunning)

**Strategy for Transactional Failure:**
1.  **Pre-Dunning (Day -3):** If a user has a recurring batch or "credits" set to auto-refill, send: *"Your payment method for your next batch expires soon. Update here."* (Recovery: 10%)
2.  **Immediate Retry (Day 0):** If transaction fails, trigger immediate retry via a different gateway (e.g., switch from Stripe to Paystack if possible). (Recovery: 25%)
3.  **Soft Dunning (Day 3):** Email: *"We couldn't process your digitization. Is everything okay?"* Include a direct link to "Try another card." (Recovery: 30%)
4.  **Hard Dunning (Day 7):** Email: *"Your digitization project is on hold due to payment issues."* (Recovery: 15%)
5.  **Grace Period:** Allow 7 days of "Pending" status where the user can still view previous scans but cannot upload new ones.

---

## 8. LEADING INDICATORS (Predicting Churn)

| Signal | Detection Method | Intervention Playbook |
| :--- | :--- | :--- |
| **1. Decreasing Login Frequency** | Log-in timestamps in DB | Trigger "Value Reminder" email. |
| **2. Increasing OCR Error Reports** | Support ticket tagging | Immediate technical outreach/Free credit. |
| **3. Failed Payment Attempts** | Payment gateway webhooks | Trigger "Smart Dunning" sequence. |
| **4. Drop in TBP (Time Between Purchases)** | Calculation of avg. days between orders | Send "Bulk Discount" offer. |
| **5. Search for "Cancel/Refund"** | Search bar analytics | Trigger "Save Flow" script. |
| **6. Low Engagement with Emails** | Email ESP (Open/Click rates) | Change subject line tone/frequency. |
| **7. High "Failed Upload" rate** | File upload error logs | Technical support intervention. |
| **8. Account "Stagnation"** | User has 1 book but no 2nd book within 30 days | Send "Next Step" guide/Tutorial. |