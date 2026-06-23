import { expect, test } from '@playwright/test';

test.describe('Blog – Navigation', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Astro v7 Blog/);
    await expect(page.locator('h1')).toContainText('Astro v7 Blog');
  });

  test('blog post links are visible', async ({ page }) => {
    await page.goto('/');
    const postLinks = page.locator('a[href*="/blog/"]');
    expect(await postLinks.count()).toBeGreaterThan(0);
  });

  test('clicking a post navigates to the post page', async ({ page }) => {
    await page.goto('/');
    const firstPost = page.locator('a[href*="/blog/"]').first();
    const href = await firstPost.getAttribute('href');
    await firstPost.click();
    await expect(page).toHaveURL(new RegExp(href ?? ''));
    await expect(page.locator('article')).toBeVisible();
  });

  test('blog post has back link', async ({ page }) => {
    await page.goto('/blog/welcome/');
    await expect(page.getByRole('link', { name: /back|overview/i })).toBeVisible();
  });
});
