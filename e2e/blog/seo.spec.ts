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

  test('llms.txt lists published articles in both languages with working absolute links', async ({
    request,
  }) => {
    const response = await request.get('/llms.txt');
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    expect(body).toContain('## Articles in English');
    expect(body).toContain('## Artikel auf Deutsch');
    expect(body).toContain('/blog/welcome/');
    expect(body).toContain('/de/blog/welcome/');
    expect(body).not.toContain('German blog index');
    const links = [...body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)];
    expect(links.length).toBeGreaterThanOrEqual(8);
    for (const [, url] of links) {
      expect((await request.get(new URL(url).pathname)).ok(), url).toBeTruthy();
    }
  });

  test('site-files generates the German RSS feed and demo credits', async ({ request }) => {
    const response = await request.get('/de/rss.xml');
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    expect(body).toContain('<language>de-DE</language>');
    expect(body).toContain('/de/blog/welcome/');
    expect(body).not.toMatch(/<link>https?:\/\/[^/]+\/blog\//);
    const humans = await request.get('/humans.txt');
    expect(humans.ok()).toBeTruthy();
    expect(await humans.text()).toContain('Example Template Team (demo)');
  });

  test('article schemas link publisher, language, keywords and visible reading time', async ({
    page,
  }) => {
    for (const [path, language] of [
      ['/blog/welcome/', 'en_US'],
      ['/de/blog/welcome/', 'de_DE'],
    ]) {
      await page.goto(path);
      const schemas = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) => scripts.map((script) => JSON.parse(script.textContent ?? '{}')));
      const article = schemas.find((schema) => schema['@type'] === 'BlogPosting');
      const organization = schemas.find((schema) => schema['@type'] === 'Organization');
      expect(article.publisher['@id']).toBe(organization['@id']);
      expect(article.inLanguage).toBe(language.replace('_', '-'));
      expect(article.wordCount).toBeGreaterThan(0);
      expect(article.keywords).toContain('astro');
      expect(article.timeRequired).toMatch(/^PT\d+M$/);
      await expect(page.locator('article > header')).toContainText(
        article.timeRequired.match(/\d+/)[0]
      );
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', language);
      await expect(page.locator('link[hreflang="de"]')).toHaveAttribute(
        'href',
        /\/de\/blog\/welcome\/$/
      );
    }
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
