import { expect, test } from '@playwright/test';

test.describe('Starter – i18n', () => {
  test('English homepage has lang="en"', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('German homepage has lang="de"', async ({ page }) => {
    await page.goto('/de/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  });

  test('language switcher navigates to DE', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav').getByRole('link', { name: 'DE' }).click();
    await expect(page).toHaveURL(/\/de/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  });

  test('language switcher navigates back to EN', async ({ page }) => {
    await page.goto('/de/');
    await page.locator('nav').getByRole('link', { name: 'EN' }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('German contact page has translated content', async ({ page }) => {
    await page.goto('/de/contact/');
    await expect(page.locator('h1')).toContainText('Kontakt');
  });
});
