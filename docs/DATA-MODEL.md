# Data Architecture Specification — Book Digitization Platform

> Dynasty Empire Data Layer | April 19, 2026

---

## 1. Architecture Overview
The platform utilizes Neon Postgres for its serverless scalability and native `pgvector` support, enabling a hybrid search architecture where academic metadata and high-dimensional embeddings coexist in a single ACID-compliant database. Drizzle ORM is used for type-safe schema migrations and queries. To support the multi-tenant requirement for the Criterion educational Foundation and potential future partners, a shared-schema approach is implemented using a mandatory `tenant_id` on all entity-level tables, ensuring strict data isolation at the query level.

---

## 2. Entity Specifications

### 2.1 tenants Table
**Purpose:** Manages organizational accounts and white-label configurations for digitization partners.

| Column | Type | Nullable | Default | Constraints | Description |
|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | PRIMARY KEY | Unique tenant identifier |
| name | varchar(255) | NO | | | Legal name of the foundation/org |
| subdomain | varchar(63) | NO | | UNIQUE | URL prefix for tenant access |
| config | jsonb | NO | '{}' | | UI branding, accent colors, logo URLs |
| created_at | timestamptz | NO | now() | | Record creation time |
| updated_at | timestamptz | NO | now() | | Last modification time |

**Indexes:**
- `idx_tenants_subdomain` on (`subdomain`) — Fast lookup for tenant routing.

**Relationships:**
- has_many `books` (cascade delete: yes)
- has_many `users` (cascade delete: no)
- has_many `archives` (cascade delete: yes)

### 2.2 books Table
**Purpose:** Stores metadata for physical Catholic classics being digitized.

| Column | Type | Nullable | Default | Constraints | Description |
|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | PRIMARY KEY | Unique book identifier |
| tenant_id | uuid | NO | | FK -> tenants.id | Owning organization |
| title | varchar(500) | NO | | | Full title of the classic |
| author | varchar(255) | NO | | | Primary author/saint |
| isbn | varchar(13) | YES | | | International Standard Book Number |
| created_at | timestamptz | NO | now() | | Record creation time |
| updated_at | timestamptz | NO | now() | | Last modification time |

**Indexes:**
- `idx_books_tenant_id` on (`tenant_id`) — Filtering books by organization.
- `idx_books_title` on (`title`) — Search optimization for book titles.

**Relationships:**
- belongs_to `tenants` via `tenant_id`
- has_many `pages` (cascade delete: yes)

### 2.3 pages Table
**Purpose:** Stores OCR text, vector embeddings for RAG, and S3 references for individual book pages.

| Column | Type | Nullable | Default | Constraints | Description |
|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | PRIMARY KEY | Unique page identifier |
| book_id | uuid | NO | | FK -> books.id | Parent book |
| page_number | integer | NO | | | Sequential page index |
| content_text | text | NO | | | OCR-extracted verbatim text |
| embedding | vector(1536) | YES | | | OpenAI text-embedding-3-small |
| s3_url | text | NO | | | Path to high-res TIFF/JPG in S3 |
| created_at | timestamptz | NO | now() | | Record creation time |

**Indexes:**
- `idx_pages_book_id` on (`book_id`) — Retrieval of all pages for a specific book.
- `idx_pages_embedding` on (`embedding`) — HNSW index for cosine similarity search.

**Relationships:**
- belongs_to `books` via `book_id`
- has_many `citations` (cascade delete: yes)

### 2.4 users Table
**Purpose:** Manages identity and role-based access for the platform.

| Column | Type | Nullable | Default | Constraints | Description |
|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | PRIMARY KEY | Unique user identifier |
| email | varchar(255) | NO | | UNIQUE | User login email |
| role | varchar(20) | NO | 'guest' | CHECK (role IN ('admin', 'scholar', 'professional', 'guest')) | Access level |
| tenant_id | uuid | NO | | FK -> tenants.id | Assigned organization |
| created_at | timestamptz | NO | now() | | Record creation time |

**Indexes:**
- `idx_users_email` on (`email`) — Authentication lookup.
- `idx_users_tenant_id` on (`tenant_id`) — User listing per organization.

**Relationships:**
- belongs_to `tenants` via `tenant_id`
- has_one `subscription` (cascade delete: yes)

### 2.5 subscriptions Table
**Purpose:** Tracks transactional payments and access tiers for digitization services.

| Column | Type | Nullable | Default | Constraints | Description |
|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | PRIMARY KEY | Unique subscription identifier |
| user_id | uuid | NO | | FK -> users.id | Paying user |
| tier | varchar(50) | NO | 'basic' | | Subscription level |
| status | varchar(20) | NO | 'inactive' | | active, past_due, canceled |
| expires_at | timestamptz | YES | | | Expiration date for access |
| stripe_customer_id | varchar(255) | YES | | | Reference to Stripe billing |

**Indexes:**
- `idx_subscriptions_user_id` on (`user_id`) — Checking access status.

**Relationships:**
- belongs_to `users` via `user_id`

### 2.6 citations Table
**Purpose:** Stores scholarly notes linked to specific page content for academic rigor.

| Column | Type | Nullable | Default | Constraints | Description |
|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | PRIMARY KEY | Unique citation identifier |
| user_id | uuid | NO | | FK -> users.id | User who created the note |
| page_id | uuid | NO | | FK -> pages.id | Source page |
| note | text | NO | | | Scholarly commentary |
| created_at | timestamptz | NO | now() | | Record creation time |

**Indexes:**
- `idx_citations_page_id` on (`page_id`) — Retrieving all notes for a page.

**Relationships:**
- belongs_to `users` via `user_id`
- belongs_to `pages` via `page_id`

### 2.7 query_logs Table
**Purpose:** Audits AI interactions to monitor for hallucinations and improve RAG accuracy.

| Column | Type | Nullable | Default | Constraints | Description |
|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | PRIMARY KEY | Unique log identifier |
| user_id | uuid | NO | | FK -> users.id | User querying the system |
| query_text | text | NO | | | The user's natural language query |
| response_text | text | NO | | | The AI's generated response |
| tokens_used | integer | YES | 0 | | Cost tracking |
| created_at | timestamptz | NO | now() | | Query timestamp |

**Indexes:**
- `idx_query_logs_user_id` on (`user_id`) — User search history.

**Relationships:**
- belongs_to `users` via `user_id`

### 2.8 archives Table
**Purpose:** Tracks the physical location of the original Catholic classics.

| Column | Type | Nullable | Default | Constraints | Description |
|---|---|---|---|---|---|
| id | uuid | NO | gen_random_uuid() | PRIMARY KEY | Unique archive identifier |
| tenant_id | uuid | NO | | FK -> tenants.id | Owning organization |
| location | varchar(500) | NO | | | Physical address/shelf location |
| collection_name | varchar(255) | NO | | | Name of the physical collection |
| created_at | timestamptz | NO | now() | | Record creation time |

**Indexes:**
- `idx_archives_tenant_id` on (`tenant_id`) — Archive listing per organization.

**Relationships:**
- belongs_to `tenants` via `tenant_id`

---

## 3. Entity Relationship Summary

| From | Relationship | To | Cardinality | Cascade |
|---|---|---|---|---|
| tenants | has_many | books | 1:N | Yes |
| tenants | has_many | users | 1:N | No |
| tenants | has_many | archives | 1:N | Yes |
| books | has_many | pages | 1:N | Yes |
| pages | has_many | citations | 1:N | Yes |
| users | has_one | subscriptions | 1:1 | Yes |
| users | has_many | citations | 1:N | No |
| users | has_many | query_logs | 1:N | No |
| pages | belongs_to | books | N:1 | No |

---

## 4. Query Patterns
| Query | Frequency | Tables | Index Used | Estimated Latency |
|---|---|---|---|---|
| Fetch book by ID for reader | High | books | PRIMARY KEY | <10ms |
| Hybrid Search (Vector + Text) | High | pages | idx_pages_embedding | <150ms |
| List books for tenant dashboard | Med | books | idx_books_tenant_id | <20ms |
| Retrieve pages for specific book | High | pages | idx_pages_book_id | <30ms |
| Verify user subscription status | High | subscriptions | idx_subscriptions_user_id | <10ms |
| Fetch citations for a page | Med | citations | idx_citations_page_id | <20ms |

---

## 5. Migration Strategy
- **Tool:** Drizzle Kit (`drizzle-kit generate` + `drizzle-kit push`)
- **Zero-downtime:** Add columns as nullable first, backfill data via script, then apply NOT NULL constraints in a subsequent migration.
- **Rollback:** Maintain versioned SQL migration files in `/migrations`; use `drizzle-kit drop` for local dev or manual SQL reverts for production.
- **Seeding:** `scripts/seed.ts` populates initial tenants (Criterion Foundation) and sample Catholic Classics.

---

## 6. Data Retention & Privacy
| Data Type | Retention Period | Deletion Method | GDPR Relevant |
|---|---|---|---|
| User PII | Until account deletion + 30 days | Hard delete | ✅ |
| Transaction records | 7 years (tax compliance) | Anonymize user_id | ✅ |
| Session data | 30 days | Auto-expire (NextAuth) | ❌ |
| Audit logs | 1 year | Archive to S3 Glacier | ❌ |