/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/error-boundary';
import { AuthFallback } from '../components/auth-fallback';

// Mock NextAuth
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// Mock the AuthFallback component
jest.mock('../components/auth-fallback', () => ({
  AuthFallback: jest.fn(() => <div data-testid="auth-fallback">Auth Fallback</div>),
}));

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Mock the console.error to avoid test output noise
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterEach(() => {
    // Restore console.error after each test
    (console.error as jest.Mock).mockRestore();
  });
  
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
  
  it('renders AuthFallback when an authentication error occurs', () => {
    // Set up window.addEventListener to capture the error handler
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );
    
    // Get the error handler function that was registered
    const errorHandler = addEventListenerSpy.mock.calls.find(
      call => call[0] === 'error'
    )?.[1] as EventListener;
    
    // Trigger the error handler with a mock authentication error
    errorHandler(new ErrorEvent('error', {
      message: 'Authentication error: Failed to get session',
      error: new Error('Authentication error: Failed to get session')
    }));
    
    // Check that the AuthFallback is rendered
    expect(screen.getByTestId('auth-fallback')).toBeInTheDocument();
    
    // Clean up
    addEventListenerSpy.mockRestore();
  });
}); 