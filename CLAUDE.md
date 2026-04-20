# CLAUDE.md — Book Digitization Platform
Read DYNASTY-DESIGN.md then DESIGN.md before any UI code.

## Project Overview
Stack: Next.js, Node.js, Express, PostgreSQL, AWS S3, OpenAI OCR, TailwindCSS
Repo: pinohu/book-digitization-platform
Domain: [To be configured by deployment]
Purpose: Digitizing physical Catholic Classics for Criterion Educational Foundation.

## Design Rules MANDATORY
1. **Primary Accent**: Use `#006400` (Deep Green) for all primary actions and brand elements.
2. **Backgrounds**: Page wrappers must use `#FDFCFB` (Cream); card surfaces must use `#FFFFFF` (White).
3. **Typography**: Headers = `Merriweather` (serif); UI/Body = `Open Sans` (sans-serif); Code = `JetBrains Mono`.
4. **Borders**: 1px solid `#E2E8E2`. No heavy borders.
5. **Radius**: `sm: 6px` (inputs), `md: 10px` (cards), `lg: 16px` (modals).
6. **Focus State**: Focus rings must be `#006400` with a 2px offset.
7. **Premium Markers**: Use `#C9A84C` (Dynasty Gold) ONLY for premium tiers or verified status.
8. **Status Badges**: Must be pill-shaped (`rounded-full`) with specific hex pairs from DESIGN.md.
9. **Depth**: Use `rgba(0, 100, 0, 0.08)` for shadows. Never use pure black shadows.
10. **Prohibited**: No Tailwind default colors (e.g., `bg-blue-500`, `text-gray-500`). Use the custom palette.

## Required States
Every interactive component (buttons, inputs, links) MUST implement these 6 states:
- **Default**: The base appearance.
- **Hover**: Subtle color shift (e.g., #006400 -> #004D00).
- **Focus**: Clear accessibility ring.
- **Active**: Scale down to 0.98.
- **Disabled**: Muted colors, `cursor-not-allowed`.
- **Loading**: Spinner implementation, disabled interaction.

## Architecture Rules
### Frontend (Next.js)
- **File Naming**: `kebab-case` for files (e.g., `book-reader.tsx`, `ingestion-pipeline.tsx`).
- **Components**: Atomic design pattern. `components/ui` for base elements, `components/features` for business logic.
- **State Management**: React Context for tenant config, TanStack Query for server state.

### Backend (Node.js/Express)
- **Route Naming**: `/api/v1/kebab-case` (e.g., `/api/v1/ocr-process`).
- **Variable Naming**: `camelCase` (e.g., `bookId`, `tenantConfig`).
- **Controller Pattern**: Separate routes, controllers, and services.

### Database (PostgreSQL/pgvector)
- **Table Naming**: `snake_case` plural (e.g., `tenants`, `books`, `pages`).
- **Search**: Use `pgvector` for hybrid search (combining metadata filtering with vector embeddings).
- **Multi-tenancy**: Every table must include `tenant_id` for data isolation.

### Third-Party Integrations
- **AWS S3**: Use presigned URLs for all uploads/downloads to bypass API bottlenecks.
- **OpenAI**: OCR processing via GPT-4o-vision; embeddings via `text-embedding-3-small`.
- **Stripe**: Transactional billing at $5.00/book.

## Environment Variables
**App Config**
- `NEXT_PUBLIC_APP_URL`: Base URL of the application
- `NEXTAUTH_SECRET`: Secret for NextAuth session encryption
- `NEXTAUTH_URL`: Full URL for auth callbacks

**Database**
- `DATABASE_URL`: Connection string for Neon Postgres (must support pgvector)

**AWS S3**
- `AWS_ACCESS_KEY_ID`: AWS Access Key
- `AWS_SECRET_ACCESS_KEY`: AWS Secret Key
- `AWS_S3_BUCKET`: Bucket name for book scans and processed PDFs
- `AWS_REGION`: AWS Region (e.g., us-east-1)

**AI Services**
- `OPENAI_API_KEY`: API key for OCR and Embedding generation

**Payments**
- `STRIPE_SECRET_KEY`: Stripe secret key for transactional billing
- `STRIPE_WEBHOOK_SECRET`: Secret for payment event listeners

## Git Rules
Always run before committing:
`git config user.email "consultant@origineyes.org"`
`git config user.name "Senior Business Architect"`

## Do Not
1. Use `bg-white` for page backgrounds; use `bg-[#FDFCFB]`.
2. Use `rounded-full` for anything other than badges or specific circular avatars.
3. Use `text-black`; use `text-[#1A1C1A]`.
4. Use generic "Acme" or "Example" data; use Catholic Classics titles (e.g., "Summa Theologica").
5. Implement generative summaries as the primary output; always prioritize verbatim RAG citations.
6. Use `console.log` in production code.
7. Use any colors from other Dynasty products (e.g., no Dynasty Blue or Dynasty Red).
8. Use inline styles; use Tailwind CSS classes.
9. Forget the `tenant_id` on any database query.
10. Use synchronous file uploads through the Express server; use S3 presigned URLs.
11. Use serif fonts for UI buttons or labels.
12. Use a standard 1-column layout for the reader; it must be split-pane.
13. Use `any` type in TypeScript; define strict interfaces for `Book`, `Page`, and `Tenant`.
14. Use non-kebab-case for API routes.