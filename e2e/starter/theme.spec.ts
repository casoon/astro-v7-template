import { expect, test } from '@playwright/test';

test.describe('Starter – Theme Toggle', () => {
  test('theme toggle button is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /switch to/i })).toBeVisible();
  });

  test('clicking toggle switches dark class', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const toggle = page.getByRole('button', { name: /switch to/i });

    const hadDark = await html.evaluate((el) => el.classList.contains('dark'));
    await toggle.click();
    const hasDark = await html.evaluate((el) => el.classList.contains('dark'));

    expect(hasDark).not.toBe(hadDark);
  });
});
