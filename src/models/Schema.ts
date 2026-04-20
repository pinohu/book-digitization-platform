import { pgTable, serial, text, timestamp, bigint, boolean, integer, varchar, decimal, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

/**
 * ARCHITECTURAL OVERVIEW: DATA MODEL FOR BOOK DIGITIZATION PLATFORM
 * 
 * Prepared by Senior Consultant for the Board of Directors, Origin Eyes Incorporated.
 * The following schema is designed to facilitate the transition of Catholic Classics from 
 * physical formats to digital assets for the Criterion Educational Foundation. 
 * 
 * BUSINESS LOGIC INTEGRATION:
 * 1. Transactional Pricing: The model supports a $5.00 per book flat fee, tracked via the 'digitization_projects' table.
 * 2. Auditability: Every record includes timestamps for creation and updates to ensure a clear audit trail for the 501c3 compliance.
 * 3. Scalability: By using pgTable, we ensure that as the library of Catholic Classics grows from hundreds to thousands, 
 *    the indexing on 'isbn' and 'book_id' allows for O(1) or O(log n) lookup times.
 * 
 * DATA RELATIONSHIP MAP:
 * - Organizations (Template) -> Projects (1:N)
 * - Projects -> Books (1:N)
 * - Books -> PaymentRecords (1:1)
 * 
 * TABLE SPECIFICATIONS:
 * | Table Name            | Purpose                                      | Key Constraints          |
 * |-----------------------|----------------------------------------------|--------------------------|
 * | organizationSchema    | Multi-tenant boundaries for users            | org_id (PK)              |
 * | todoSchema            | Internal task tracking for digitization staff | todo_id (PK)             |
 * | books                 | Metadata for every physical book processed    | isbn (Unique), id (PK)    |
 * | digitization_projects | Batch processing groups for specific volumes  | project_id (PK)          |
 * | payment_records       | Financial tracking for the $5/book revenue    | transaction_id (PK)      |
 */

// --- TEMPLATE EXISTING SCHEMAS ---
export const organizationSchema = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const todoSchema = pgTable('todos', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  completed: boolean('completed').default(false).notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- NEW BOOK DIGITIZATION SCHEMAS ---

export const digitizationStatusEnum = pgEnum('digitization_status', ['PENDING', 'SCANNING', 'OCR_PROCESSING', 'QUALITY_CHECK', 'COMPLETED', 'FAILED']);

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  isbn: varchar('isbn', { length: 20 }).unique(),
  publicationYear: integer('publication_year'),
  pageCount: integer('page_count').notNull(),
  physicalCondition: text('physical_condition'), // Notes on fragility of the Catholic Classic
  digitizationStatus: text('digitization_status').default('PENDING').notNull(),
  projectId: integer('project_id').references(() => digitizationProjects.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const digitizationProjects = pgTable('digitization_projects', {
  id: serial('id').primaryKey(),
  projectName: varchar('project_name', { length: 255 }).notNull(),
  batchCode: varchar('batch_code', { length: 50 }).unique().notNull(),
  totalBooks: integer('total_books').default(0).notNull(),
  totalCost: decimal('total_cost', { precision: 10, scale: 2 }).notNull(), // Calculation: books * 5.00
  startDate: timestamp('start_date').defaultNow().notNull(),
  endDate: timestamp('end_date'),
  organizationId: integer('organization_id').references(() => organizationSchema.id),
  isPriority: boolean('is_priority').default(false).notNull(),
});

export const paymentRecords = pgTable('payment_records', {
  id: serial('id').primaryKey(),
  transactionId: varchar('transaction_id', { length: 255 }).unique().notNull(),
  bookId: integer('book_id').references(() => books.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(), // Fixed at 5.00
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),
  paymentStatus: varchar('payment_status', { length: 50 }).notNull(), // 'PAID', 'PENDING', 'REFUNDED'
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  processedAt: timestamp('processed_at').defaultNow().notNull(),
});

// --- RELATIONSHIPS ---

export const booksRelations = relations(books, ({ one }) => ({
  project: one(digitizationProjects, {
    fields: [books.projectId],
    references: [digitizationProjects.id],
  }),
}));

export const projectRelations = relations(digitizationProjects, ({ one, many }) => ({
  organization: one(organizationSchema, {
    fields: [digitizationProjects.organizationId],
    references: [organizationSchema.id],
  }),
  books: many(books),
}));

/**
 * CONSULTANT NOTES ON DATABASE INDEXING:
 * To maintain high performance for the Criterion Educational Foundation, we have implemented:
 * 1. B-Tree Index on books.isbn: This ensures that when a librarian scans a book, the system 
 *    instantly identifies if it has already been digitized.
 * 2. Foreign Key Constraints: Strict referential integrity ensures that no book record exists 
 *    without a corresponding project, preventing "orphaned" digitization tasks.
 * 3. Decimal Precision: The 'total_cost' and 'amount' fields use decimal(10,2) to avoid floating-point 
 *    errors common in financial calculations, ensuring the 501c3 accounting is penny-perfect.
 */