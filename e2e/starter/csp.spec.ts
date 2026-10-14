import { expect, test } from '@playwright/test';
import { cspTests, trackViolations, violations } from '../shared/csp';

test.describe('Starter – Content Security Policy', () => {
  cspTests(['/', '/de/', '/contact/', '/de/contact/', '/web-vitals/', '/does-not-exist/']);

  test('theme toggle and contact form submission run without CSP violations', async ({ page }) => {
    await trackViolations(page);
    await page.goto('/contact/');
    await page.getByRole('button', { name: /switch to/i }).click();
    await page.getByLabel('Name').fill('Ada');
    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByLabel('Subject').fill('Hello');
    await page.getByLabel('Message').fill('Test message');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByRole('status')).toContainText('no message was sent');
    expect(await violations(page)).toEqual([]);
  });
});
