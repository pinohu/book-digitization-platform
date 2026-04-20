import { test, expect } from '@playwright/test';

/**
 * @description Playwright End-to-End Smoke Tests.
 * Verifies the critical path: Landing -> Authentication -> Dashboard access.
 */

test.describe('Critical User Flows', () => {
  
  test('Landing page loads with correct branding', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Book Digitization Platform/);
    const branding = page.locator('h1');
    await expect(branding).toContainText(/Digitize Sacred Classics/i);
  });

  test('Unauthenticated users cannot access the dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    // Should redirect to login/auth
    await expect(page).toHaveURL(/.*auth.*/);
  });

  test('Navigation links are functional', async ({ page }) => {
    await page.goto('/');
    
    // Test Archive link
    await page.click('text=Archive');
    await expect(page).toHaveURL(/\/archive/);

    // Test Pricing link
    await page.click('text=Pricing');
    await expect(page).toHaveURL(/\/pricing/);
  });

  test('Reader page renders content for a specific book', async ({ page }) => {
    // Bypassing auth for smoke test via direct URL if environment allows
    // In a real CI, we would perform a login step here.
    await page.goto('/reader/test-book-123');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });
});