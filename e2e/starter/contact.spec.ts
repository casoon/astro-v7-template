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
});
