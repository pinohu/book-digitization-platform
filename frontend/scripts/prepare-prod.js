#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * This script prepares the application for production deployment by:
 * 1. Renaming middleware.prod.ts to middleware.ts
 * 2. Copying .env.production to .env.local (if not already exists)
 * 3. Generating a secure NEXTAUTH_SECRET if not present
 * 4. Displaying instructions for production deployment
 */

console.log('Preparing application for production deployment...');

// Project root directory
const rootDir = path.resolve(__dirname, '..');

// 1. Handle middleware
const devMiddlewarePath = path.join(rootDir, 'middleware.ts');
const prodMiddlewarePath = path.join(rootDir, 'middleware.prod.ts');

if (fs.existsSync(prodMiddlewarePath)) {
  // Backup the development middleware if it exists
  if (fs.existsSync(devMiddlewarePath)) {
    fs.renameSync(devMiddlewarePath, path.join(rootDir, 'middleware.dev.ts'));
    console.log('✅ Backed up development middleware to middleware.dev.ts');
  }
  
  // Copy production middleware
  fs.copyFileSync(prodMiddlewarePath, devMiddlewarePath);
  console.log('✅ Copied production middleware to middleware.ts');
} else {
  console.warn('⚠️ Production middleware (middleware.prod.ts) not found');
}

// 2. Handle environment variables
const prodEnvPath = path.join(rootDir, '.env.production');
const localEnvPath = path.join(rootDir, '.env.local');

if (fs.existsSync(prodEnvPath)) {
  // If .env.local already exists, create a backup
  if (fs.existsSync(localEnvPath)) {
    fs.renameSync(localEnvPath, path.join(rootDir, '.env.local.bak'));
    console.log('✅ Backed up .env.local to .env.local.bak');
  }
  
  // Copy production env to .env.local
  fs.copyFileSync(prodEnvPath, localEnvPath);
  console.log('✅ Copied .env.production to .env.local');
  
  // Generate a NEXTAUTH_SECRET if none exists
  const envContent = fs.readFileSync(localEnvPath, 'utf8');
  if (!envContent.includes('NEXTAUTH_SECRET=') || envContent.includes('NEXTAUTH_SECRET=your-')) {
    const newSecret = crypto.randomBytes(32).toString('base64');
    const updatedContent = envContent.replace(
      /NEXTAUTH_SECRET=.*$/m, 
      `NEXTAUTH_SECRET=${newSecret}`
    );
    fs.writeFileSync(localEnvPath, updatedContent);
    console.log('✅ Generated secure NEXTAUTH_SECRET');
  }
  
  // Remind to update OAuth credentials
  console.log('\n⚠️ Important: Update your OAuth credentials in .env.local before deploying');
} else {
  console.warn('⚠️ Production environment file (.env.production) not found');
}

// 3. Display instructions
console.log('\n=== Production Deployment Instructions ===');
console.log('1. Update OAuth credentials in .env.local:');
console.log('   - GitHub ID and secret for GitHub authentication');
console.log('   - NEXTAUTH_URL matching your production domain');
console.log('2. Run npm run build to create a production build');
console.log('3. Deploy the application using your preferred hosting service');
console.log('4. To switch back to development mode, run:');
console.log('   - mv middleware.dev.ts middleware.ts');
console.log('   - mv .env.local.bak .env.local\n');

// Verify NODE_ENV is set to production
console.log('Checking NODE_ENV...');
if (process.env.NODE_ENV !== 'production') {
  console.warn('⚠️ NODE_ENV is not set to production. Set it before deployment.');
} else {
  console.log('✅ NODE_ENV is set to production');
}

console.log('\nProduction preparation complete! 🚀'); 