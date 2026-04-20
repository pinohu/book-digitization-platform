/**
 * APPLICATION CONFIGURATION: BOOK DIGITIZATION PLATFORM
 * 
 * This configuration file defines the global settings, internationalization 
 * parameters, and the billing structure for the SaaS platform.
 * 
 * PRICING STRATEGY:
 * The platform operates on a transactional model specifically designed for the 
 * non-profit nature of the Criterion Educational Foundation. 
 * 
 * | Tier         | Price per Book | Target User                | Feature Set                                   |
 * |--------------|----------------|----------------------------|-----------------------------------------------|
 * | Free         | $5.00 (1st 5)   | Small Parish Libraries      | Basic PDF output, standard OCR               |
 * | Pro          | $4.00 (Bulk)    | Educational Institutions   | High-res TIFF, searchable PDF, priority queue  |
 * | Enterprise   | Custom          | Diocesan Archives          | API access, dedicated project manager, onsite  |
 * 
 * The PLAN_ID enum ensures that Stripe subscriptions are mapped correctly to the 
 * internal permission system.
 */

export const APP_CONFIG = {
  name: 'Book Digitization Platform',
  description: 'AI-Powered Document Digitization for Catholic Classics',
  
  // Internationalization settings for global reach (Nigeria, USA, Vatican)
  locales: ['en', 'fr', 'it', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',

  // Billing and Subscription Configuration
  billing: {
    currency: 'USD',
    basePricePerBook: 5.00,
    taxRate: 0.00, // 501c3 tax exempt status
  },
} as const;

export enum PLAN_ID {
  FREE = 'plan_free_digitize',
  PRO = 'plan_pro_digitize',
  ENTERPRISE = 'plan_enterprise_digitize',
}

export const billingPlans = [
  {
    id: PLAN_ID.FREE,
    name: 'Starter Digitization',
    price: '5.00',
    stripePriceId: 'price_1QWERTY234567890',
    features: [
      'Up to 5 books per month',
      'Standard OCR Processing',
      'Basic PDF Export',
      'Email Support',
    ],
    limit: 5,
  },
  {
    id: PLAN_ID.PRO,
    name: 'Professional Archive',
    price: '4.00',
    stripePriceId: 'price_1ASDFGH678901234',
    features: [
      'Unlimited book submissions',
      'Discounted bulk rate ($4/book)',
      'High-Resolution TIFF exports',
      'Priority Queue Processing',
      'Dedicated Account Manager',
    ],
    limit: Infinity,
  },
  {
    id: PLAN_ID.ENTERPRISE,
    name: 'Foundation Enterprise',
    price: 'Custom',
    stripePriceId: 'price_1ZXCVBN098765432',
    features: [
      'On-site digitization support',
      'Custom API Integrations',
      'Full metadata archival services',
      '24/7 Priority Support',
      'White-label digital library',
    ],
    limit: Infinity,
  },
];

/**
 * CONSULTANT NOTE ON REVENUE RECOGNITION:
 * For the Board of Directors: Revenue is recognized upon the 'COMPLETED' status 
 * of the digitization process. The $5.00 fee covers the cost of AI OCR 
 * processing, cloud storage, and manual quality assurance by the 
 * Origin Eyes Inc technical team.
 */