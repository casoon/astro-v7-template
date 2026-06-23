import { expect, test } from '@playwright/test';

test.describe('Starter – Navigation', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Astro v7 Starter/);
    await expect(page.locator('h1')).toContainText('Astro v7 Starter');
  });

  test('navbar links work', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Main navigation').getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText('Contact');
  });
});
