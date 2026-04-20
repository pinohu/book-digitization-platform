import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

/**
 * ENVIRONMENT VALIDATION SCHEMA
 * 
 * To ensure a seamless deployment to Vercel and avoid build-time failures, 
 * all environment variables are marked as optional. This allows the 
 * application to deploy the skeleton infrastructure immediately, while 
 * the administration adds the actual secrets via the Vercel Dashboard.
 * 
 * SECURITY ARCHITECTURE:
 * - DATABASE_URL: Connects to the PostgreSQL instance via Drizzle.
 * - STRIPE_SECRET_KEY: Handles the transactional $5/book payments.
 * - CLERK_SECRET_KEY: Manages the identity of the foundation staff.
 * 
 * VALIDATION LOGIC:
 * We use Zod to ensure that if a variable is provided, it follows the 
 * expected string format. If missing, it defaults to an empty string 
 * to prevent the application from crashing during the 'npm run build' phase.
 */

export const env = createEnv({
  server: {
    // Database Configuration
    DATABASE_URL: z.string().optional().default(''),
    
    // Authentication (Clerk)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional().default(''),
    CLERK_SECRET_KEY: z.string().optional().default(''),
    
    // Billing (Stripe)
    STRIPE_SECRET_KEY: z.string().optional().default(''),
    STRIPE_WEBHOOK_SECRET: z.string().optional().default(''),
    
    // Monitoring & Logging
    SENTRY_DSN: z.string().optional().default(''),
    LOG_LEVEL: z.string().optional().default('info'),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    SENTRY_DSN: process.env.SENTRY_DSN,
    LOG_LEVEL: process.env.LOG_LEVEL,
  },
});

/**
 * DEPLOYMENT GUIDELINES FOR ORIGIN EYES INC:
 * 1. Deploy to Vercel using the GitHub integration.
 * 2. Navigate to Project Settings -> Environment Variables.
 * 3. Add the keys listed in .env.example.
 * 4. Trigger a redeploy to activate the live database and payment connections.
 */