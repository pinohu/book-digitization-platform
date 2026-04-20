# GDPR/CCPA Implementation Guide — Book Digitization Platform

This guide is designed for the **Book Digitization Platform** to ensure compliance while facilitating the mission of the **Criterion Educational Foundation**. Because you are operating across Nigeria (NDPR), the US (CCPA), and potentially serving EU citizens (GDPR), this guide adopts the "Highest Common Denominator" approach—applying the strictest rule from any jurisdiction to all users to simplify operations.

---

# GDPR/CCPA Compliance Master Implementation Guide

## 1. COOKIE CONSENT IMPLEMENTATION
Since your platform uses AI and likely analytics to track digitization progress/user behavior, cookie management is critical.

### Cookie Categories
1.  **Strictly Necessary:** Required for the website to function (e.g., login sessions, shopping cart for the $5 transactions). *No consent required.*
2.  **Functional:** Remembers user preferences (e.g., language, dark mode). *Requires consent.*
3.  **Analytics:** Tracks how users interact with the platform (e.g., Google Analytics). *Requires consent.*
4.  **Marketing/Targeting:** Tracks users across sites for ads. *Requires consent.*

### GDPR vs. CCPA Requirements
| Feature | GDPR (EU/UK) | CCPA (California) |
| :--- | :--- | :--- |
| **Default State** | **Opt-in** (Cookies must be OFF by default) | **Opt-out** (Cookies can be ON until user says no) |
| **Consent Type** | Explicit, Affirmative Action | Notice at collection |
| **"Do Not Sell"** | Not explicitly required (covered by consent) | **Mandatory link** if data is shared for value |

### Implementation Code Snippet (Conceptual JavaScript)
Using a Consent Management Platform (CMP) logic:
```javascript
// Simple Consent Logic
const userConsent = {
  necessary: true,
  functional: localStorage.getItem('cookie_func') === 'true',
  analytics: localStorage.getItem('cookie_anal') === 'true',
  marketing: localStorage.getItem('cookie_mark') === 'true'
};

function applyConsent() {
  if (userConsent.analytics) {
    loadGoogleAnalytics();
  }
  if (userConsent.marketing) {
    loadFacebookPixel();
  }
}

// Google Consent Mode v2 Integration
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Default to 'denied' for GDPR compliance
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});

// Update on user clicking "Accept All"
function onAcceptAll() {
  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'analytics_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted'
  });
  localStorage.setItem('cookie_anal', 'true');
  // ... rest of logic
}
```

### Cookie Audit Template
| Name | Provider | Purpose | Type | Duration |
| :--- | :--- | :--- | :--- | :--- |
| `_ga` | Google | Analytics/User behavior | Analytics | 2 years |
| `PHPSESSID` | Platform | Maintain user session | Necessary | Session |

---

## 2. DATA SUBJECT RIGHTS (DSR) WORKFLOW

### The Workflow
1.  **Receipt:** Request received via email (`privacy@yourplatform.com`) or web form.
2.  **Verification:** Confirm identity (e.g., via email confirmation or ID check). **Do not collect more data than necessary to verify.**
3.  **Assessment:** Determine if the data exists and if an exemption applies (e.g., legal hold).
4.  **Execution:** 
    *   *Access/Portability:* Export JSON/CSV.
    *   *Erasure:* Delete from DB, backups, and notify 3rd party processors.
5.  **Response:** Send formal letter within **30 days**.

### Response Letter Template (Right of Access)
> **Subject:** Response to your Data Subject Access Request (DSAR)
>
> Dear [Name],
>
> We have received your request dated [Date] to access your personal data held by [Platform Name]. We have verified your identity and are providing the following information:
> 1. **Categories of data held:** [e.g., Name, Email, Transaction History].
> 2. **Purpose of processing:** [e.g., Order fulfillment for book digitization].
> 3. **Data Export:** [Link to secure download or attached file].
>
> If you believe this information is incomplete, please contact us.
>
> Regards,
> Data Protection Officer, [Platform Name]

---

## 3. DATA PROCESSING INVENTORY (RoPA)
*Required under GDPR Article 30.*

| Activity | Data Subject | Category of Data | Purpose | Legal Basis | Retention | 3rd Parties |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Book Purchase | Customers | Name, Email, Card Info | Payment/Delivery | Contract | 7 Years (Tax) | Stripe, PayPal |
| AI Processing | Authors/Foundations | Metadata, Book Content | Digitization | Contract | Project End | AWS/Azure |

---

## 4. DATA PROCESSING AGREEMENT (DPA) TEMPLATE
*Crucial for the relationship between Origin Eyes Inc. (Processor) and Criterion (Controller).*

**Key Clauses to Include:**
1.  **Subject Matter:** Digitization of physical books.
2.  **Duration:** Duration of the service agreement.
3.  **Security (Art 32):** Processor must implement encryption (AES-256) and MFA.
4.  **Sub-processors:** Processor must notify Controller before adding new sub-processors (e.g., a new AI cloud provider).
5.  **Breach Notification:** Processor must notify Controller within **24-48 hours** of discovery.
6.  **Audit Rights:** Controller has the right to audit Processor's security annually.

---

## 5. BREACH NOTIFICATION PROCEDURE

### Severity Matrix
*   **Low:** No risk to rights (e.g., accidental email to wrong user). Action: Log internally.
*   **Medium:** Potential privacy risk (e.g., unencrypted database leak). Action: Notify users.
*   **High:** High risk of identity theft/financial loss (e.g., Credit card leak). Action: Notify Authority (72h) AND Users immediately.

### 72-Hour Authority Notification Template
> **To:** [Relevant Supervisory Authority]
> **Nature of Breach:** [e.g., Unauthorized database access]
> **Data Categories:** [e.g., Names, Email addresses]
> **Approximate Number of Subjects:** [e.g., 500]
> **Likely Consequences:** [e.g., Phishing attempts]
> **Mitigation Measures Taken:** [e.g., Password reset forced, server isolated]

---

## 6. PRIVACY IMPACT ASSESSMENT (DPIA) TEMPLATE
*Required if your AI processing involves large-scale profiling or sensitive data.*

1.  **Description:** How does the AI process the book text? Is it personal data?
2.  **Necessity:** Is the AI necessary to achieve the digitization goal?
3.  **Risk Identification:**
    *   *Risk:* AI inadvertently leaks sensitive biographical info from a book.
    *   *Score:* Low/Med/High.
4.  **Mitigation:** Anonymization of names within the text during the AI training phase.

---

## 7. LAWFUL BASIS DETERMINATION

### Decision Tree
1.  **Is it needed to fulfill the $5 book order?** $\rightarrow$ **Contract**
2.  **Is it for a legal/tax requirement?** $\rightarrow$ **Legal Obligation**
3.  **Is it for marketing/newsletters?** $\rightarrow$ **Consent**
4.  **Is it for platform security/fraud prevention?** $\rightarrow$ **Legitimate Interest**

### Legitimate Interest Assessment (LIA)
*   **Purpose Test:** Are we pursuing a legitimate interest? (Yes, platform security).
*   **Necessity Test:** Is the processing necessary? (Yes, to prevent fraud).
*   **Balancing Test:** Do our interests override the user's privacy? (Yes, security is a fundamental right).

---

## 8. CCPA-SPECIFIC REQUIREMENTS

1.  **"Do Not Sell My Personal Information" Link:** Even if you don't "sell" data for money, sharing data with an ad network can be "selling" under CCPA. Place this in the footer.
2.  **Notice at Collection:** A pop-up or footer note stating: *"We collect name and email to process your book digitization order."*
3.  **12-Month Lookback:** You must be able to tell a Californian user what data you collected from them in the last 12 months.

---

## IMPLEMENTATION ROADMAP

### Phase 1: Discovery (Weeks 1-2)
*   **Responsible:** President (Origin Eyes)
*   **Task:** Complete the Data Processing Inventory (Section 3).
*   **Checklist:** [ ] Map all data flows; [ ] Identify all 3rd party tools.

### Phase 2: Technical Setup (Weeks 3-5)
*   **Responsible:** Lead Developer
*   **Task:** Implement Cookie Banner and Consent Mode v2.
*   **Checklist:** [ ] Cookie audit complete; [ ] Consent logic verified; [ ] "Do Not Sell" link live.

### Phase 3: Legal & Policy (Weeks 6-7)
*   **Responsible:** Legal Counsel / President
*   **Task:** Draft Privacy Policy, DPA, and DSR Templates.
*   **Checklist:** [ ] Privacy Policy updated; [ ] DPA signed with Criterion; [ ] DSR templates ready.

### Phase 4: Training & Audit (Ongoing)
*   **Responsible:** All Staff
*   **Task:** Conduct a mock breach drill.
*   **Checklist:** [ ] Staff know how to report a breach; [ ] Breach register established.