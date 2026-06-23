import { expect, test } from '@playwright/test';

test.describe('Blog – i18n', () => {
  test('English homepage has lang="en"', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('German homepage has lang="de"', async ({ page }) => {
    await page.goto('/de/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.locator('h1')).toContainText('Astro v7 Blog');
  });

  test('language switcher navigates to DE', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav').getByRole('link', { name: 'DE' }).click();
    await expect(page).toHaveURL(/\/de/);
  });
});
