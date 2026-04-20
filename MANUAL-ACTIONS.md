# Manual Configuration Guide — Book Digitization Platform

> This guide covers everything you need to go from repository to production.

---

## 0. Deploy to Production

```bash
# Clone your repo
gh repo clone pinohu/book-digitization-platform
cd book-digitization-platform

# Set up environment
cp .env.example .env.local
# Fill in values from the service dashboards below

# Install and test locally
npm install
npm run dev
# Visit http://localhost:3000 to verify

# Deploy to Vercel
npx vercel --prod
```

**After deploying:** Add all .env.local variables to Vercel Dashboard → Settings → Environment Variables.

---

## 1. AWS S3 Configuration

**Why needed:** To store high-resolution images of physical book pages. The API uses presigned URLs to allow the browser to upload directly to S3, bypassing Node.js memory limits.

**Time required:** ~10 minutes

### Steps:
| # | Action | URL / Location | Expected Result |
|---|---|---|---|
| 1 | Create Bucket | S3 Console → Create Bucket | Bucket created (e.g., `criterion-digitization-archive`) |
| 2 | Set CORS | Bucket → Permissions → CORS | Allow `PUT`, `POST`, `GET` from your Vercel domain |
| 3 | Create IAM User | IAM Console → Users → Create User | User with `s3:PutObject` and `s3:GetObject` permissions |
| 4 | Copy Keys | IAM User → Security Credentials | `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` added to .env |

**Verification:** Upload a test image via the `/ingest` page and confirm it appears in the S3 bucket.

---

## 2. OpenAI Configuration

**Why needed:** To power the OCR (Optical Character Recognition) and the vector embeddings for the hybrid search functionality.

**Time required:** ~5 minutes

### Steps:
| # | Action | URL / Location | Expected Result |
|---|---|---|---|
| 1 | Generate API Key | https://platform.openai.com/api-keys | Secret key generated |
| 2 | Set Quota | Billing → Limits | Ensure sufficient credits for GPT-4o and embedding models |
| 3 | Copy Key | Dashboard | `OPENAI_API_KEY` added to .env |

**Verification:** Call the `/api/v1/ocr/process` endpoint with a sample S3 URL and confirm text is returned.

---

## 3. Stripe Configuration

**Why needed:** To handle the transactional $5 per book digitization fee.

**Time required:** ~15 minutes

### Steps:
| # | Action | URL / Location | Expected Result |
|---|---|---|---|
| 1 | Create Product | Stripe Dashboard → Product Catalog | Create "Book Digitization" product at $5.00 (one-time) |
| 2 | Get API Keys | Developers → API Keys | `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` added to .env |
| 3 | Setup Webhook | Developers → Webhooks | Point to `your-domain/api/webhooks/stripe` for `checkout.session.completed` |
| 4 | Copy Secret | Webhook Settings | `STRIPE_WEBHOOK_SECRET` added to .env |

**Verification:** Complete a test checkout flow and verify the book status changes to "Processing" in the database.

---

## 4. Neon Postgres Configuration

**Why needed:** To store multi-tenant metadata and perform vector searches using the `pgvector` extension.

**Time required:** ~5 minutes

### Steps:
| # | Action | URL / Location | Expected Result |
|---|---|---|---|
| 1 | Create Project | https://console.neon.tech | New Postgres instance created |
| 2 | Enable pgvector | SQL Editor → `CREATE EXTENSION IF NOT EXISTS vector;` | Extension active |
| 3 | Copy URL | Connection Details | `DATABASE_URL` added to .env |

**Verification:** Run `npx prisma db push` and confirm tables are created.

---