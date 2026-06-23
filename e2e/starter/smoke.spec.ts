import { expect, test } from '@playwright/test';

test.describe('Starter - built output smoke', () => {
  for (const path of ['/', '/de/', '/contact/', '/robots.txt', '/sitemap.xml']) {
    test(`${path} returns 200`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
    });
  }
});
