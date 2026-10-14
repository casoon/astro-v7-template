import { expect, test } from '@playwright/test';
import { cspTests, trackViolations, violations } from '../shared/csp';

test.describe('Blog – Content Security Policy', () => {
  cspTests([
    '/',
    '/de/',
    '/blog/welcome/',
    '/blog/tailwind-v4/',
    '/de/blog/welcome/',
    '/does-not-exist/',
  ]);

  test('theme toggle runs without CSP violations', async ({ page }) => {
    await trackViolations(page);
    await page.goto('/blog/welcome/');
    await page.getByRole('button', { name: /switch to/i }).click();
    await page.waitForTimeout(300);
    expect(await violations(page)).toEqual([]);
  });
});
