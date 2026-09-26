import { expect, test } from '@playwright/test';

test.describe('Starter – Contact Form', () => {
  test('contact form renders with all fields', async ({ page }) => {
    await page.goto('/contact/');
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Subject')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send' })).toBeVisible();
  });

  test('form fields have required attribute', async ({ page }) => {
    await page.goto('/contact/');
    await expect(page.getByLabel('Name')).toHaveAttribute('required', '');
    await expect(page.getByLabel('Email')).toHaveAttribute('required', '');
    await expect(page.getByLabel('Subject')).toHaveAttribute('required', '');
    await expect(page.getByLabel('Message')).toHaveAttribute('required', '');
  });

  test('email field has correct input type', async ({ page }) => {
    await page.goto('/contact/');
    await expect(page.getByLabel('Email')).toHaveAttribute('type', 'email');
  });

  test('valid submission shows the demo notice while no provider is configured', async ({
    page,
  }) => {
    await page.goto('/contact/');
    await page.getByLabel('Name').fill('Ada');
    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByLabel('Subject').fill('Hello');
    await page.getByLabel('Message').fill('Test message');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByRole('status')).toContainText('no message was sent');
  });

  test('honeypot field is hidden from users and assistive tech', async ({ page }) => {
    await page.goto('/contact/');
    await expect(page.locator('#website')).toHaveAttribute('tabindex', '-1');
    await expect(page.getByRole('textbox', { name: 'Website' })).toHaveCount(0);
  });
});
