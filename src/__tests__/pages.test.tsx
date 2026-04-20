import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LandingPage from '../app/page';
import ReaderPage from '../app/reader/[bookId]/page';
import DashboardPage from '../app/dashboard/page';

/**
 * @description Component tests for key user interfaces.
 * Ensures branding, accessibility, and academic-focused layouts are present.
 */

// Mock Next.js Navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({ bookId: 'test-book-123' }),
  useSearchParams: () => ({ get: vi.fn() }),
}));

describe('Core Page Components', () => {
  
  describe('Landing Page', () => {
    it('renders the Criterion Educational Foundation branding', () => {
      render(<LandingPage />);
      // Check for niche-specific terminology/branding
      expect(screen.getByText(/Criterion Educational Foundation/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Digitize Sacred Classics/i })).toBeInTheDocument();
    });

    it('contains the primary Call to Action for partners', () => {
      render(<LandingPage />);
      const cta = screen.getByRole('button', { name: /Get Started/i });
      expect(cta).toBeInTheDocument();
    });
  });

  describe('Reader Page (Source-First)', () => {
    it('renders the page content and navigation controls', () => {
      render(<ReaderPage />);
      // Check for RAG-first accuracy UI elements
      expect(screen.getByText(/Page/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Previous Page/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Next Page/i })).toBeInTheDocument();
    });

    it('displays the academic citation tools', () => {
      render(<ReaderPage />);
      expect(screen.getByText(/Create Citation/i)).toBeInTheDocument();
    });
  });

  describe('Tenant Dashboard', () => {
    it('renders the digitization pipeline status', () => {
      render(<DashboardPage />);
      expect(screen.getByText(/Digitization Pipeline/i)).toBeInTheDocument();
      expect(screen.getByText(/Active Jobs/i)).toBeInTheDocument();
    });
  });
});