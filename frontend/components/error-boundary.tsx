"use client"

import { useEffect, useState } from 'react'
import { AuthFallback } from './auth-fallback'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  // Only run hooks on the client
  if (typeof window === 'undefined') {
    return <>{children}</>
  }
  
  const [hasError, setHasError] = useState(false)
  
  useEffect(() => {
    function handleError(error: ErrorEvent) {
      console.error('Caught an error:', error)
      
      // Check for various authentication-related errors
      if (
        (error.message && error.message.includes('Authentication')) || 
        (error.message && error.message.includes('auth')) ||
        (error.message && error.message.includes('session'))
      ) {
        setHasError(true)
      }
    }
    
    // Add global error handler
    window.addEventListener('error', handleError)
    
    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])
  
  if (hasError) {
    return <AuthFallback />
  }
  
  return <>{children}</>
} 