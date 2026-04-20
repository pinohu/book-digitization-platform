# AI-OS Frontend

A cloud-based multi-agent orchestration platform built with Next.js, Tailwind CSS, and NextAuth.js.

## Project Overview

AI-OS is a platform that enables the creation, management, and orchestration of autonomous AI agents. The frontend provides a user-friendly interface for managing ventures and agent workflows.

## Development and Production Setup

This project includes special configurations to handle authentication in both development and production environments.

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-os.git
   cd ai-os/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local` for development
   - Generate a NEXTAUTH_SECRET (you can use `openssl rand -base64 32`)
   - For GitHub authentication, create OAuth credentials at https://github.com/settings/developers

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development Mode

In development mode, the application uses a simplified setup:

- Authentication is available with credential provider (any email/password in dev mode)
- GitHub OAuth is available with proper configuration
- Middleware redirects are disabled to avoid authentication errors
- Error boundaries catch and display fallbacks for any auth-related errors

### Production Mode

To prepare the application for production:

1. Run the preparation script:
   ```bash
   npm run prepare-prod
   ```

2. Update your OAuth credentials in `.env.local`

3. Build the application:
   ```bash
   npm run build
   ```

4. Start the production server:
   ```bash
   npm start
   ```

### Switching Between Development and Production

The repository includes both development and production configurations:

- `middleware.ts` - Development middleware (no auth)
- `middleware.prod.ts` - Production middleware (with NextAuth protection)

The `prepare-prod` script handles switching between these modes.

## Authentication Strategy

This project uses NextAuth.js for authentication with multiple providers:

1. **Credentials Provider**: Email/password authentication in development
2. **GitHub Provider**: OAuth authentication with GitHub
3. **Error Boundary**: Catches authentication errors and displays a fallback UI
4. **Dev/Prod Toggle**: Separates authentication logic between environments

### Development Authentication

- In development, the credentials provider accepts any credentials for testing
- The middleware allows all routes without authentication
- GitHub authentication works with proper OAuth credentials

### Production Authentication

- Full NextAuth authentication is enabled for protected routes
- Middleware enforces authentication for dashboard routes
- Error boundaries provide fallbacks if authentication fails

### Authentication Providers

This implementation uses open-source authentication providers:

- **NextAuth.js**: Open-source authentication for Next.js
  - GitHub: https://github.com/nextauthjs/next-auth
- **GitHub OAuth**: Authentication via GitHub accounts

## Testing

The project includes Jest and React Testing Library for testing components:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Folder Structure

```
frontend/
├── app/                # Next.js app directory
│   ├── api/auth/       # NextAuth API routes
│   ├── dashboard/      # Dashboard pages
│   ├── sign-in/        # Authentication pages
│   ├── sign-up/        # Authentication pages
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/             # UI components
│   ├── providers.tsx   # Theme provider
│   └── client-layout.tsx # Client-side layout with auth
├── lib/                # Utility functions
├── scripts/            # Build and deployment scripts
├── __tests__/          # Test files
├── middleware.ts       # Auth middleware (dev)
├── middleware.prod.ts  # Auth middleware (prod)
└── .env.local          # Environment variables
```

## Deployment

This application is configured for deployment on Vercel or other platforms that support Next.js.

## Troubleshooting

### Authentication Errors

If you encounter authentication errors:

1. Check that your OAuth credentials are correctly set in `.env.local`
2. Ensure middleware.ts is appropriate for your environment (dev or prod)
3. Verify that NEXTAUTH_SECRET is set and properly generated
4. Clear browser cache and cookies

### Development Mode Issues

If you experience issues in development mode:

1. Make sure you're using the development middleware (not production)
2. Check that the error boundary is catching any auth-related errors
3. Verify that fallback UIs are rendering correctly

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 