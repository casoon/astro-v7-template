import { expect, test } from '@playwright/test';

test.describe('Blog – SEO & OG', () => {
  test('homepage has OG meta tags', async ({ page }) => {
    await page.goto('/');
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Astro v7 Blog/);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /\/og\/home\.png/);
  });

  test('blog post has article OG type and post-specific image', async ({ page }) => {
    await page.goto('/blog/welcome/');
    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /\/og\/blog\/welcome\.png/);
  });

  test('blog post OG image file is accessible', async ({ request }) => {
    const response = await request.get('/og/blog/welcome.png');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('RSS feed is accessible', async ({ request }) => {
    const response = await request.get('/rss.xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('<rss');
    expect(body).toContain('Astro v7 Blog');
  });

  test('robots.txt is accessible and contains Sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('User-agent:');
    expect(body).toContain('Sitemap:');
  });

  test('sitemap.xml is accessible', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('<urlset');
  });

  test('all pages have meta description', async ({ page }) => {
    for (const path of ['/', '/blog/welcome/', '/de/']) {
      await page.goto(path);
      const desc = page.locator('meta[name="description"]');
      await expect(desc).toHaveAttribute('content', /.+/);
    }
  });

  test('all pages have canonical URL', async ({ page }) => {
    for (const path of ['/', '/blog/welcome/', '/de/']) {
      await page.goto(path);
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', /.+/);
    }
  });
});
