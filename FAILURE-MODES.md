# Risk & Resilience Framework — Book Digitization Platform

> Dynasty Empire Operational Resilience | April 19, 2026

---

## Resilience Philosophy
The platform adopts a "Verbatim Integrity" failure model. In the context of Catholic Classics, a generative hallucination is a critical failure. Therefore, the system is designed for graceful degradation: if the AI cannot guarantee accuracy, the system reverts to a "Pending Human Review" state rather than outputting potentially incorrect sacred text. Blast radius is contained via multi-tenant isolation (tenant\_id) to ensure a failure in one foundation's pipeline does not impact another.

---

## 1. Severity Classification
| Level | Name | Definition | Response SLA | Escalation |
|---|---|---|---|---|
| P0 | Critical | Total platform outage or data breach | 15 min | All hands + CTO |
| P1 | Major | OCR pipeline stalled or S3 upload failure | 1 hour | On-call engineer |
| P2 | Minor | Search latency high or UI glitch | 4 hours | Next available |
| P3 | Low | Typo in dashboard or CSS misalignment | Next sprint | Backlog |

---

## 2. Failure Scenarios & Runbooks

### 2.1 JWT/Auth Failure
**Severity:** P0 | **Detection:** Spike in 401/403 errors in PostHog | **Blast Radius:** All users unable to access dashboard/reader.

**Runbook:**
1. **Detect:** Pulsetic alert on `/api/v1/sign-in` error rate $> 5\%$.
2. **Triage:** Check NextAuth environment variables and secret rotation logs.
3. **Mitigate:** Roll back last deployment if auth config was changed.
4. **Resolve:** Re-sync JWT secrets across Vercel edge functions.
5. **Verify:** Successful login via test account.
6. **Post-mortem:** Analyze secret rotation failure $\rightarrow$ Update CI/CD pipeline.

### 2.2 Database Connection Loss
**Severity:** P0 | **Detection:** Neon Postgres connection timeout logs | **Blast Radius:** Full system read/write failure.

**Runbook:**
1. **Detect:** Neon dashboard "Connection Failed" alert.
2. **Triage:** Check Neon project status page and DATABASE\_URL validity.
3. **Mitigate:** Trigger Neon point-in-time recovery if corruption is suspected.
4. **Resolve:** Restart Node.js API instances to clear stale connection pools.
5. **Verify:** Execute `GET /api/v1/books` health check.
6. **Post-mortem:** Evaluate pool size $\rightarrow$ Implement more aggressive Bulkhead pattern.

### 2.3 Stripe Webhook Failure
**Severity:** P1 | **Detection:** Discrepancy between Stripe "Succeeded" and DB `Subscription` status | **Blast Radius:** Users not granted access despite payment.

**Runbook:**
1. **Detect:** Stripe Dashboard "Webhook Delivery Failed" alert.
2. **Triage:** Check `/api/v1/subscriptions/webhook` logs for 500 errors.
3. **Mitigate:** Manually activate subscriptions for affected users via admin panel.
4. **Resolve:** Fix webhook signature verification logic or update Stripe API version.
5. **Verify:** Trigger a test webhook from Stripe CLI.
6. **Post-mortem:** Implement idempotency keys and a webhook retry queue.

### 2.4 OpenAI OCR Rate Limiting
**Severity:** P1 | **Detection:** 429 Too Many Requests from OpenAI API | **Blast Radius:** Ingestion pipeline stalled; books not digitized.

**Runbook:**
1. **Detect:** Application log spike for `openai.RateLimitError`.
2. **Triage:** Check current token usage vs. tier limits in OpenAI dashboard.
3. **Mitigate:** Implement an exponential backoff queue in n8n.
4. **Resolve:** Upgrade OpenAI API tier or distribute load across multiple keys.
5. **Verify:** Process a batch of 10 pages successfully.
6. **Post-mortem:** Implement request throttling at the API gateway level.

### 2.5 Redis Unavailable
**Severity:** P2 | **Detection:** Session loss/repeated logins | **Blast Radius:** User sessions cleared; caching disabled (latency increase).

**Runbook:**
1. **Detect:** `ioredis` connection error in logs.
2. **Triage:** Check Redis instance health and memory usage.
3. **Mitigate:** Fallback to database-backed session storage (NextAuth).
4. **Resolve:** Flush Redis cache or scale instance memory.
5. **Verify:** Confirm session persistence across page refreshes.
6. **Post-mortem:** Setup Redis replication for high availability.

### 2.6 Third-party API Timeout
**Severity:** P2 | **Detection:** P95 latency $> 10\text{s}$ on `/api/v1/ocr/process` | **Blast Radius:** Slow ingestion; UI "hanging" states.

**Runbook:**
1. **Detect:** PostHog latency alert for OCR route.
2. **Triage:** Ping OpenAI/AWS S3 endpoints to verify external latency.
3. **Mitigate:** Increase timeout settings and implement "Processing..." UI state.
4. **Resolve:** Optimize payload size or switch to asynchronous webhook-based OCR.
5. **Verify:** Measure p95 latency on new batch.
6. **Post-mortem:** Transition all long-running OCR tasks to background workers.

### 2.7 Payment Processing Failure
**Severity:** P1 | **Detection:** Stripe Checkout abandonment spike | **Blast Radius:** Revenue loss; partner friction.

**Runbook:**
1. **Detect:** Stripe "Checkout Session Expired" rate increase.
2. **Triage:** Test payment flow with Stripe test cards.
3. **Mitigate:** Send "Payment Issue" email to affected partners with manual link.
4. **Resolve:** Fix Stripe Checkout configuration or resolve API version mismatch.
5. **Verify:** Complete a successful $5 transaction.
6. **Post-mortem:** Implement a "Save Cart" feature for failed payments.

### 2.8 File/Storage Failure
**Severity:** P1 | **Detection:** S3 403/404 errors on page images | **Blast Radius:** Reader displays broken images; digitization loss.

**Runbook:**
1. **Detect:** S3 CloudWatch alert for high 4xx error rate.
2. **Triage:** Verify AWS IAM permissions for S3 Presigned URLs.
3. **Mitigate:** Regenerate presigned URLs for current sessions.
4. **Resolve:** Fix S3 bucket policy or correct path mapping in PostgreSQL.
5. **Verify:** Load `/reader/[bookId]` and verify all images render.
6. **Post-mortem:** Implement S3 Cross-Region Replication (CRR).

### 2.9 Email Delivery Failure
**Severity:** P3 | **Detection:** High bounce rate in SendGrid/Postmark | **Blast Radius:** Notification gap (users don't know books are ready).

**Runbook:**
1. **Detect:** Email provider "Delivery Failure" alert.
2. **Triage:** Check SPF/DKIM/DMARC records.
3. **Mitigate:** Use in-app notifications as primary alert channel.
4. **Resolve:** Resolve DNS issues or update email templates.
5. **Verify:** Send test notification to admin email.
6. **Post-mortem:** Implement a multi-provider email failover.

### 2.10 Auth Provider Outage
**Severity:** P0 | **Detection:** NextAuth `CALLBACK_URL` failures | **Blast Radius:** Total lockout from the platform.

**Runbook:**
1. **Detect:** Global spike in 500 errors on `/api/auth/callback`.
2. **Triage:** Check status pages for Google/GitHub/Microsoft (depending on provider).
3. **Mitigate:** Enable "Emergency Admin Access" via database-direct login.
4. **Resolve:** Switch to a secondary auth provider if outage is prolonged.
5. **Verify:** Successful login via secondary provider.
6. **Post-mortem:** Implement multi-provider auth strategy to avoid single point of failure.

---

## 3. Resilience Patterns
| Pattern | Implementation | Applied To |
|---|---|---|
| Circuit Breaker | Open after 5 failures in 60s, half-open after 30s | OpenAI OCR API, Stripe API |
| Retry + Backoff | Exponential: 1s $\rightarrow$ 2s $\rightarrow$ 4s $\rightarrow$ 8s $\rightarrow$ 30s max | Neon Postgres, AWS S3 |
| Bulkhead | Separate connection pools for Auth vs. OCR vs. Search | Neon Postgres |
| Graceful Degradation | Serve cached text if pgvector search is slow | `/api/v1/search` |
| Idempotency | `idempotency_key` on all Stripe and OCR mutations | Payments, Ingestion |
| Health Checks | `/health` endpoint checking DB, S3, and OpenAI | All services |

---

## 4. Monitoring & Alerting
| Signal | Tool | Threshold | Action |
|---|---|---|---|
| Uptime | Pulsetic (5-min) | $<99.5\%$ | Page on-call |
| Error rate | PostHog | $>2\%$ requests | Slack alert |
| p95 latency | App metrics | $>2000\text{ms}$ | Investigate |
| DB connections | Neon dashboard | $>80\%$ pool | Scale |
| Webhook failures | Stripe dashboard | 3+ consecutive | Page on-call |

---

## 5. Backup Strategy
| System | Method | Frequency | Retention | Recovery Time |
|---|---|---|---|---|
| Database | Neon point-in-time recovery | Continuous | 7 days | $<5$ minutes |
| Redis | RDB snapshots | Hourly | 24 hours | $<2$ minutes |
| Code | Git tagged releases | Every deploy | Infinite | $<1$ minute (rollback) |
| Secrets | Vercel encrypted env vars | On change | Versioned | Immediate |