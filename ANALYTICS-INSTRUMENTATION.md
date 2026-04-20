# Analytics Instrumentation Plan — Book Digitization Platform

This Analytics Instrumentation Plan is specifically tailored for a **transactional AI-driven digitization platform**. Since your model is $5/book (rather than a recurring SaaS subscription), the metrics have been adjusted to focus on **volume, processing success, and unit economics** rather than just MRR.

---

### 1. EVENT TAXONOMY
**Naming Convention:** `object_action` (lowercase, underscores)

#### **Page Views**
*   `page_viewed` (properties: `path`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`, `page_type: [landing, dashboard, uploader, viewer, checkout]`)
*   `page_scrolled` (properties: `path`, `scroll_depth_percent`, `time_on_page`)

#### **Feature Usage Events (AI & Digitization Focus)**
*   `file_uploaded` (properties: `file_type`, `file_size_mb`, `page_count`, `is_success`)
*   `digitization_started` (properties: `book_id`, `ai_model_version`, `processing_type: [ocr, layout_analysis, colorization]`)
*   `digitization_completed` (properties: `book_id`, `duration_seconds`, `confidence_score_avg`)
*   `document_viewed` (properties: `book_id`, `page_number`, `zoom_level`)
*   `text_selected` (properties: `book_id`, `selection_length`, `is_searchable`)
*   `search_performed` (properties: `query`, `results_count`, `context_snippet_found`)
*   `export_initiated` (properties: `export_format: [pdf, epub, txt], item_count, book_id`)

#### **Funnel Events (The "Upload-to-Paid" Path)**
*   `upload_started` (properties: `source, file_type`)
*   `upload_completed` (properties: `file_size_mb, page_count`)
*   `preview_generated` (properties: `is_satisfactory: [true/false]`)
*   `checkout_started` (properties: `book_id, price: 5.00, currency: USD/NGN`)
*   `payment_completed` (properties: `book_id, amount, payment_method, transaction_id`)
*   `download_completed` (properties: `book_id, format`)

#### **Business Events**
*   `revenue_recognized` (properties: `amount, unit_type: [single_book], book_id`)
*   `support_ticket_created` (properties: `category: [ocr_error, payment, upload_fail], priority`)
*   `refund_issued` (properties: `reason, book_id, amount`)

---

### 2. POSTHOG TRACKING IMPLEMENTATION

#### **Installation & Initialization**
```javascript
// Install via npm: npm install posthog-js
import posthog from 'posthog-js'

posthog.init('<YOUR_PROJECT_API_KEY>', {
    api_host: 'https://app.posthog.com',
    person_profiles: 'identified_only', // Ensures privacy for unauthenticated users
    capture_pageview: true 
})
```

#### **User & Group Identification**
*   **User Identification:** Link the user to their email and role.
    ```javascript
    posthog.identify('user_123', {
        email: 'researcher@example.com',
        role: 'individual_collector',
        country: 'Nigeria',
        organization: 'Criterion Foundation'
    });
    ```
*   **Group Analytics:** Crucial for tracking "Foundations" vs "Individual Users."
    ```javascript
    posthog.group('organization', 'criterion_foundation_id', {
        name: 'Criterion Educational Foundation',
        type: 'non_profit',
        location: 'Nigeria'
    });
    ```

#### **Feature Flags & Session Recording**
*   **Feature Flags:** Use to roll out new AI OCR models to a subset of users.
    ```javascript
    if (posthog.isFeatureEnabled('new_ocr_engine_v2')) {
        runAdvancedOCR();
    }
    ```
*   **Session Recording:** Enable in PostHog settings. 
    *   *Privacy Control:* Set `maskAllInputs: true` to ensure religious/sensitive text being typed into search or notes is never recorded.

---

### 3. DATA LAYER SPECIFICATION

#### **User Properties Schema**
| Property | Data Type | Description |
| :--- | :--- | :--- |
| `user_id` | String | Unique identifier |
| `lifecycle_stage` | String | `new_user`, `active_digitizer`, `churned` |
| `total_books_digitized` | Integer | Lifetime count |
| `preferred_language` | String | e.g., "English", "Latin" |

#### **Event Property Standards**
*   **Naming:** All keys must be `snake_case`.
*   **Required Fields:** Every event must include `timestamp` and `user_id`.
*   **Data Types:** `amount` must always be `float`, `page_count` must be `int`.

#### **PII & Consent Handling**
*   **Never Capture:** Full credit card numbers, specific religious confessions, or unencrypted personal names in logs.
*   **Hashing:** If tracking specific document IDs that are sensitive, use SHA-256 hashing.
*   **Consent:** 
    ```javascript
    if (userHasConsented) {
        posthog.capture('page_viewed');
    }
    ```

---

### 4. DASHBOARD WIREFRAMES

#### **Dashboard 1 — Executive Overview (The Founder's View)**
*   **Total Revenue:** Total USD earned (MTD, QTD).
*   **Volume Metric:** Total number of books digitized.
*   **Conversion Rate:** % of users who upload a file $\rightarrow$ pay $5.
*   **User Growth:** New users (Nigeria vs. US/Global).
*   **NPS/Satisfaction:** Feedback score from digitizers.

#### **Dashboard 2 — Acquisition (Marketing View)**
*   **Traffic Sources:** Where are researchers coming from? (Google, Academic Forums, Social).
*   **Landing Page Performance:** Which page leads to the most "Uploads"?
*   **Cost Per Digitization:** (If running ads) Total Ad Spend / Total Books Digitized.

#### **Dashboard 3 — Activation & Onboarding (Product View)**
*   **The "Aha!" Funnel:** `Upload` $\rightarrow$ `AI Processing` $\rightarrow$ `Preview` $\rightarrow$ `Payment`.
*   **Time to First Digitization:** How long from signup to first $5 transaction?
*   **Processing Success Rate:** % of uploads that successfully complete AI processing.

#### **Dashboard 4 — Engagement & Retention (Usage View)**
*   **Repeat Digitizers:** % of users who digitize $>1$ book per month.
*   **Feature Heatmap:** Which features are used most (OCR search vs. PDF Export)?
*   **Session Depth:** Number of pages viewed per session.

#### **Dashboard 5 — Revenue (Financial View)**
*   **Revenue by Country:** Nigeria vs. USA vs. Rest of World.
*   **Payment Method Split:** Card vs. Mobile Money vs. PayPal.
*   **Average Order Value (AOV):** Should be $5, but track if "Bulk Upload" discounts exist.
*   **Refund Rate:** % of revenue lost to disputes/errors.

---

### 5. ALERT THRESHOLDS

| Alert Type | Trigger Condition | Channel |
| :--- | :--- | :--- |
| **AI Processing Failure** | $>3\%$ of `digitization_completed` events return `error` status in 1 hour | **Slack (Urgent)** |
| **Payment Spike Failure** | $>5\%$ of `checkout_started` do not result in `payment_completed` | **Slack + SMS** |
| **Revenue Drop** | Daily revenue $<50\%$ of the 7-day moving average | **Email (Founders)** |
| **System Downtime** | `page_viewed` drops to $0$ for $>5$ minutes | **PagerDuty** |
| **Conversion Crash** | Upload-to-Pay conversion drops below $1\%$ | **Slack** |