/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInPage from '../app/sign-in/[[...sign-in]]/page';
import SignUpPage from '../app/sign-up/[[...sign-up]]/page';

// Mock next-auth
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(() => Promise.resolve({ ok: true })),
  useSession: jest.fn(() => ({ data: null, status: "unauthenticated" })),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
  })),
}));

describe('Authentication Flows', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  
  describe('SignIn Page', () => {
    it('renders the sign-in form', () => {
      render(<SignInPage />);
      
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });
    
    it('allows signing in with credentials', async () => {
      const signIn = require('next-auth/react').signIn;
      const mockPush = require("next/navigation").useRouter().push;
      
      render(<SignInPage />);
      
      // Fill in the form
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'test@example.com' },
      });
      
      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: 'password123' },
      });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      
      // Check that the signIn function was called with the right arguments
      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith('credentials', {
          redirect: false,
          email: 'test@example.com',
          password: 'password123',
        });
      });
      
      // Check that we redirect on success
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });
    
    it('shows GitHub sign-in option', () => {
      render(<SignInPage />);
      
      expect(screen.getByText(/Sign in with GitHub/i)).toBeInTheDocument();
    });
  });
  
  describe('SignUp Page', () => {
    it('renders the sign-up form', () => {
      render(<SignUpPage />);
      
      expect(screen.getByText('Create an Account')).toBeInTheDocument();
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    });
    
    it('redirects to sign-in after registration', async () => {
      const mockPush = require("next/navigation").useRouter().push;
      
      render(<SignUpPage />);
      
      // Fill in the form
      fireEvent.change(screen.getByLabelText(/Name/i), {
        target: { value: 'Test User' },
      });
      
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'test@example.com' },
      });
      
      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: 'password123' },
      });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
      
      // Check that we redirect to sign-in
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/sign-in?registered=true');
      });
    });
    
    it('shows GitHub sign-up option', () => {
      render(<SignUpPage />);
      
      expect(screen.getByText(/Sign up with GitHub/i)).toBeInTheDocument();
    });
  });
}); 