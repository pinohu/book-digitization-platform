import { describe, it, expect } from 'vitest';
import { z } from 'zod';

/**
 * @description Data Model Validation Tests.
 * Validates the integrity of the core entities defined in the Architecture Blueprint.
 */

// Schemas derived from the Architecture Blueprint
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['admin', 'scholar', 'professional', 'guest']),
  tenant_id: z.string().uuid(),
});

const BookSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  title: z.string().min(1),
  author: z.string().min(1),
  isbn: z.string().optional(),
});

const PageSchema = z.object({
  id: z.string().uuid(),
  book_id: z.string().uuid(),
  page_number: z.number().int().positive(),
  content_text: z.string(),
  s3_url: z.string().url(),
});

describe('Data Model Schemas', () => {
  
  describe('UserSchema', () => {
    it('accepts valid scholar user', () => {
      const validUser = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'scholar@criterion.org',
        role: 'scholar',
        tenant_id: 'tenant-uuid-123'
      };
      expect(UserSchema.safeParse(validUser).success).toBe(true);
    });

    it('rejects invalid roles', () => {
      const invalidUser = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@test.com',
        role: 'unauthorized_role',
        tenant_id: 'tenant-uuid'
      };
      expect(UserSchema.safeParse(invalidUser).success).toBe(false);
    });
  });

  describe('BookSchema', () => {
    it('validates a complete book record', () => {
      const book = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        tenant_id: 'tenant-uuid',
        title: 'The Confessions',
        author: 'St. Augustine',
        isbn: '978-0141439748'
      };
      expect(BookSchema.safeParse(book).success).toBe(true);
    });

    it('fails if title is missing', () => {
      const book = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        tenant_id: 'tenant-uuid',
        author: 'St. Augustine'
      };
      expect(BookSchema.safeParse(book).success).toBe(false);
    });
  });

  describe('PageSchema', () => {
    it('validates page content and S3 URL', () => {
      const page = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        book_id: 'book-uuid',
        page_number: 42,
        content_text: 'In principio erat Verbum...',
        s3_url: 'https://s3.amazonaws.com/bucket/page42.png'
      };
      expect(PageSchema.safeParse(page).success).toBe(true);
    });

    it('rejects invalid S3 URLs', () => {
      const page = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        book_id: 'book-uuid',
        page_number: 1,
        content_text: 'Text',
        s3_url: 'not-a-url'
      };
      expect(PageSchema.safeParse(page).success).toBe(false);
    });
  });
});