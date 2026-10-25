import { expect, test } from '@playwright/test';

test.describe('Starter – SEO & OG', () => {
  test('homepage has OG meta tags', async ({ page }) => {
    await page.goto('/');
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Astro v7 Starter/);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /\/og\/home\.png/);

    const twitterImage = page.locator('meta[name="twitter:image"]');
    await expect(twitterImage).toHaveAttribute('content', /\/og\/home\.png/);
  });

  test('contact page has correct OG image', async ({ page }) => {
    await page.goto('/contact/');
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /\/og\/contact\.png/);
  });

  test('German pages have localized OG images', async ({ page }) => {
    await page.goto('/de/');
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /\/og\/de\/home\.png/);
  });

  test('OG image files are accessible', async ({ request }) => {
    const response = await request.get('/og/home.png');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('JSON-LD structured data is present', async ({ page }) => {
    await page.goto('/');
    const scripts = page.locator('script[type="application/ld+json"]');
    const all = await scripts.all();
    const parsed = await Promise.all(
      all.map((s) => s.textContent().then((t) => JSON.parse(t ?? '{}')))
    );
    const webPage = parsed.find((d) => d['@type'] === 'WebPage');
    expect(webPage).toBeTruthy();
    expect(webPage.name).toContain('Astro v7 Starter');
    const webSite = parsed.find((d) => d['@type'] === 'WebSite');
    expect(webSite).toBeTruthy();
  });

  test('robots.txt is accessible and contains Sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('User-agent:');
    expect(body).toContain('Sitemap:');
  });

  test('demo FAQ data match visible content and preserve localized metadata', async ({ page }) => {
    for (const [path, language] of [
      ['/', 'en_US'],
      ['/de/', 'de_DE'],
    ]) {
      await page.goto(path);
      const schemas = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) => scripts.map((script) => JSON.parse(script.textContent ?? '{}')));
      const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');
      expect(faq.mainEntity).toHaveLength(3);
      for (const question of faq.mainEntity) {
        await expect(page.locator('#metadata-demo dt', { hasText: question.name })).toBeVisible();
        await expect(
          page.locator('#metadata-demo dd', { hasText: question.acceptedAnswer.text })
        ).toBeVisible();
      }
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', language);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        /\/og\/(de\/)?home\.png$/
      );
      await expect(page.locator('link[hreflang="de"]')).toHaveAttribute('href', /\/de\/$/);
    }
  });

  test('site files describe the demo and keep internal tools out of the sitemap', async ({
    request,
  }) => {
    const llms = await request.get('/llms.txt');
    expect(llms.ok()).toBeTruthy();
    const body = await llms.text();
    expect(body).toContain('not a real business');
    expect(body).toContain('/de/contact/');
    const humans = await request.get('/humans.txt');
    expect(humans.ok()).toBeTruthy();
    expect(await humans.text()).toContain('Example Template Team (demo)');
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).not.toContain('/web-vitals/');
    expect(sitemap).not.toContain('/api/');
    expect(sitemap).toContain('/de/contact/');
  });

  test('sitemap.xml is accessible', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('<urlset');
  });

  test('all pages have meta description', async ({ page }) => {
    for (const path of ['/', '/contact/', '/de/', '/de/contact/']) {
      await page.goto(path);
      const desc = page.locator('meta[name="description"]');
      await expect(desc).toHaveAttribute('content', /.+/);
    }
  });

  test('all pages have canonical URL', async ({ page }) => {
    for (const path of ['/', '/contact/', '/de/', '/de/contact/']) {
      await page.goto(path);
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', /.+/);
    }
  });
});
