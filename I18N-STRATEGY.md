# Internationalization Strategy — Book Digitization Platform

This Internationalization (i18n) and Localization (l10n) strategy is designed for a high-precision AI platform where accuracy is not just a UX requirement, but the core product value.

---

### 1. Market Prioritization Framework
We rank markets based on **TAM** (Total Addressable Market: libraries, archives, publishers), **Language Reach**, **Payment Ease**, and **Regulatory Friction**.

| Rank | Market | TAM | Language Reach | Payment Infra | Reg. Complexity | Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **USA** | Massive | High (EN) | Seamless | Moderate | Primary revenue driver; high academic spend. |
| 2 | **UK** | High | High (EN) | Seamless | Low | High density of archival institutions. |
| 3 | **Germany** | High | Medium (DE) | Seamless | High (GDPR) | Massive publishing industry; high willingness to pay. |
| 4 | **France** | High | Medium (FR) | Seamless | High (GDPR) | Strong government/cultural heritage funding. |
| 5 | **Japan** | High | Low (JP) | Seamless | Moderate | Massive physical book market; high tech adoption. |
| 6 | **Brazil** | Medium | Medium (PT) | Moderate | Moderate (LGPD) | Large growing digital transformation market. |
| 7 | **India** | Massive | High (EN/HI) | Developing | Moderate | Volume play; massive digitization needs. |
| 8 | **Spain** | Medium | Medium (ES) | Seamless | High (GDPR) | Gateway to Spanish-speaking markets. |
| 9 | **China** | Massive | Low (ZH) | Complex | Very High (PIPL) | Huge TAM, but extreme regulatory/firewall barriers. |
| 10 | **S. Korea** | Medium | Low (KO) | Seamless | Moderate | High-tech academic infrastructure. |

---

### 2. Translation Workflow (The "AI-Human-AI" Loop)
Since the platform's core value is text accuracy, the workflow must distinguish between **UI Translation** and **AI Output Validation**.

1.  **Machine Translation (MT):** Use DeepL or Google Cloud Translation API for initial UI string generation.
2.  **Human Post-Editing (PE):** Native-speaking subject matter experts (SMEs) review strings for technical accuracy (e.g., ensuring "OCR" or "Layout Analysis" is translated with industry-standard terminology).
3.  **In-Context QA:** Visual verification via a Translation Management System (TMS) like Lokalise or Phrase to ensure text doesn't break UI layouts (text expansion).
4.  **Linguistic Model QA (Specific to AI):** A secondary layer where linguists test the AI's digitization accuracy in the target language to ensure the model handles local diacritics and syntax correctly.

---

### 3. Technical Implementation
*   **i18n Library:** `i18next` (for React/Node.js) due to its robust ecosystem and support for advanced features.
*   **String Extraction:** Use a build-time script to extract strings into JSON files, preventing hardcoded text.
*   **Pluralization:** Implement **ICU MessageFormat**. This is critical for languages like Arabic or Russian, which have complex pluralization rules beyond just "singular" and "plural."
*   **RTL (Right-to-Left) Support:** 
    *   Use **CSS Logical Properties** (`margin-inline-start` instead of `margin-left`) to automate layout flipping for Hebrew/Arabic.
    *   Direction attribute: `<html dir="rtl">`.
*   **Formatting:** Utilize the native `Intl` JavaScript API for:
    *   `Intl.DateTimeFormat` (Dates)
    *   `Intl.NumberFormat` (Numbers/Decimals)
    *   `Intl.DisplayNames` (Currency/Country names)

---

### 4. Locale-Specific Compliance
*   **EU (GDPR):** Implement strict data residency options. Allow EU clients to choose "Data Processing in Frankfurt/Dublin." Ensure "Right to be Forgotten" is a functional feature in the UI.
*   **Brazil (LGPD):** Similar to GDPR, but requires specific appointment of a Data Protection Officer (DPO) visible in local documentation.
*   **China (PIPL):** Requires local data hosting (e.g., AWS Beijing/Ningxia). Cross-border data transfer requires explicit, separate consent and government security assessments.

---

### 5. Currency Handling
*   **Display Currency:** Show the user's local currency (e.g., €100.00) based on IP/Profile settings.
*   **Settlement Currency:** All internal accounting and API calls to the bank should be processed in a **Base Currency (USD)** to minimize internal FX volatility.
*   **FX Rate Management:** Use a real-time exchange rate provider (e.g., OANDA or Stripe) with a **2% buffer** added to the mid-market rate to protect against intraday fluctuations.

---

### 6. Content Localization vs. Translation
| Feature | Translation (Literal) | Localization (Adaptive) |
| :--- | :--- | :--- |
| **UI Buttons** | "Submit" $\rightarrow$ "Enviar" | "Submit" $\rightarrow$ "Enviar" |
| **Date/Time** | 12/31/2023 | 31/12/2023 |
| **Marketing** | "Fastest OCR in the world" | "The most reliable tool for Spanish archives" |
| **Case Studies** | Translating an English PDF | Creating a new PDF featuring a French University |
| **Legal** | Translating US Terms of Service | Drafting Terms of Service compliant with German Law |

---

### 7. Localized SEO Strategy
*   **URL Structure:** Use **Subfolders** (`platform.com/es/`) rather than ccTLDs (`platform.es`). Subfolders allow you to consolidate domain authority and are easier to manage for a single platform.
*   **Hreflang Tags:** Implement `rel="alternate" hreflang="x"` in the `<head>` to tell Google which version of the page to show based on the user's location/language, preventing "duplicate content" penalties.
*   **Keyword Research:** Do not translate English keywords. Use tools like Ahrefs to find what local archivists actually search for (e.g., "Digitalización de libros" vs. "OCR de documentos").

---

### 8. Phased Rollout Plan

| Phase | Target Locale | Focus | Est. Timeline | Est. Budget (Setup + Year 1) |
| :--- | :--- | :--- | :--- | :--- |
| **0** | **English (Base)** | Core Product/Infrastructure | - | - |
| **1** | **Spanish** | LatAm/Spain expansion | Months 1-3 | \$15k - \$25k |
| **2** | **French** | European cultural heritage | Months 4-6 | \$20k - \$30k |
| **3** | **German** | High-value DACH market | Months 7-9 | \$25k - \$35k |
| **4** | **Portuguese** | Brazilian market penetration | Months 10-12 | \$15k - \$20k |
| **5** | **Japanese** | APAC/High-tech niche | Months 13-18 | \$40k - \$50k* |

*\*Note: Japanese budget is higher due to extreme requirements for vertical text support and high-quality manual linguistic review.*