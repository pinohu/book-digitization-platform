# NextAuth.js Authentication Setup

This project uses [NextAuth.js](https://next-auth.js.org/) for authentication.

## Setting Up Authentication

### 1. Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Set the following environment variables in your `.env.local` file:

```
# NextAuth Config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id  
GITHUB_SECRET=your-github-client-secret
```

### 2. Create GitHub OAuth Application

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: AI-OS (or your preferred name)
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github
4. Click "Register application"
5. Copy the Client ID and generate a new Client Secret
6. Add these to your `.env.local` file

### 3. Generate NextAuth Secret

For development, you can use a random string, but for production, you should generate a secure random value:

```bash
# Using Node.js to generate a secure random string
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

Add this value as `NEXTAUTH_SECRET` in your `.env.local` file.

### 4. Running in Production

For production deployment:

1. Run the prepare-prod script which will:
   - Generate a secure `NEXTAUTH_SECRET` if needed
   - Set up your environment files correctly

```bash
node scripts/prepare-prod.js
```

2. Update the `NEXTAUTH_URL` in your production environment to your actual domain.

3. Make sure you update your GitHub OAuth application callback URL to include your production domain.

## Authentication Flow

- `/signin` and `/signup` - Public routes for authentication
- `/signout` - Page to confirm signing out
- `/error` - Authentication error handling
- `/api/auth/[...nextauth]` - NextAuth.js API routes

## Testing Credentials

For development and testing, you can use:
- Email: `user@example.com`
- Password: `password`

In development mode, you can use any email/password combination to log in. 