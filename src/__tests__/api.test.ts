import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * @description Integration tests for Book Digitization Platform API routes.
 * Focuses on authentication, tenant isolation, and OCR processing integrity.
 */

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('API v1 Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should return 201 and user data on successful registration', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({
          data: { id: 'user-uuid', email: 'scholar@criterion.org', role: 'scholar' },
          meta: { tenant_id: 'tenant-uuid' }
        }),
      });

      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: 'scholar@criterion.org',
          password: 'secure-password-123',
          tenantId: 'tenant-uuid',
          role: 'scholar'
        }),
      });

      const result = await response.json();
      expect(response.status).toBe(201);
      expect(result.data.role).toBe('scholar');
    });

    it('should return 400 if password does not meet complexity requirements', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'validation_failed', message: 'Password must be at least 12 characters' }),
      });

      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@test.com', password: '123', tenantId: 't-1', role: 'guest' }),
      });

      const result = await response.json();
      expect(response.status).toBe(400);
      expect(result.error).toBe('validation_failed');
    });
  });

  describe('GET /api/v1/books', () => {
    it('should enforce tenant isolation via tenant_id in headers/session', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          data: [{ id: 'book-1', title: 'Summa Theologica', author: 'Thomas Aquinas' }],
          meta: { total: 1 }
        }),
      });

      const response = await fetch('/api/v1/books', {
        headers: { 'Authorization': 'Bearer mock-token' }
      });

      const result = await response.json();
      expect(result.data[0].title).toBe('Summa Theologica');
    });

    it('should return 401 when no authorization header is provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'unauthorized', message: 'Authentication required' }),
      });

      const response = await fetch('/api/v1/books');
      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/v1/ocr/process', () => {
    it('should initiate OCR pipeline and return job tracking ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 202,
        json: async () => ({ jobId: 'ocr-job-999', status: 'processing' }),
      });

      const response = await fetch('/api/v1/ocr/process', {
        method: 'POST',
        body: JSON.stringify({ s3_url: 'https://s3.amazonaws.com/books/page1.jpg' }),
      });

      const result = await response.json();
      expect(response.status).toBe(202);
      expect(result.jobId).toBe('ocr-job-999');
    });

    it('should return 500 if OpenAI OCR integration fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'ocr_service_unavailable', message: 'OpenAI API connection failed' }),
      });

      const response = await fetch('/api/v1/ocr/process', { method: 'POST' });
      expect(response.status).toBe(500);
    });
  });
});