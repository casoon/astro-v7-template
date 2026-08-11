import { expect, test } from '@playwright/test';
import { webVitalsPayloadSchema } from '../../apps/starter/src/lib/web-vitals';

type WebVitalsMetric = {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating?: string;
  navigationType?: string;
  timestamp?: number;
};

type Beacon = {
  url: string;
  payload: { metrics: WebVitalsMetric[] };
};

declare global {
  interface Window {
    __webVitalsMetrics?: WebVitalsMetric[];
    __webVitalsBeacons?: Beacon[];
  }
}

const payloadBase = {
  sessionId: 'session-test',
  timestamp: Date.now(),
  url: 'https://example.com/',
  userAgent: 'Playwright',
};

test.describe('Starter – Web Vitals', () => {
  test('accepts an official Web Vital report', () => {
    const result = webVitalsPayloadSchema.safeParse({
      ...payloadBase,
      metrics: [
        {
          name: 'LCP',
          value: 1800,
          delta: 1800,
          id: 'v4-lcp',
          rating: 'good',
          navigationType: 'navigate',
          timestamp: Date.now(),
          attribution: { target: 'main > img.hero' },
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  test('accepts supporting metrics without a Web Vitals rating', () => {
    const result = webVitalsPayloadSchema.safeParse({
      ...payloadBase,
      metrics: [
        {
          name: 'LongTask',
          value: 120,
          delta: 120,
          id: 'session-test-longtask-1',
          timestamp: Date.now(),
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  test('emits and batches a browser metric with its aggregation fields', async ({ page }) => {
    await page.addInitScript(() => {
      Math.random = () => 0;
      window.__webVitalsMetrics = [];
      window.__webVitalsBeacons = [];
      window.addEventListener('webvitals:metric', (event) => {
        window.__webVitalsMetrics?.push((event as CustomEvent<WebVitalsMetric>).detail);
      });
      Object.defineProperty(navigator, 'sendBeacon', {
        configurable: true,
        value: (url: string, body: unknown) => {
          if (body instanceof Blob) {
            void body.text().then((text) => {
              window.__webVitalsBeacons?.push({
                url,
                payload: JSON.parse(text) as Beacon['payload'],
              });
            });
          }
          return true;
        },
      });
    });

    await page.goto('/');
    await page.waitForFunction(() =>
      window.__webVitalsMetrics?.some((metric) => metric.name === 'TTFB')
    );

    await page.evaluate(() => window.dispatchEvent(new Event('pagehide')));
    await page.waitForFunction(() => window.__webVitalsBeacons?.length === 1);

    const beacon = await page.evaluate(() => window.__webVitalsBeacons?.[0]);
    expect(beacon?.url).toBe('/api/analytics/vitals/');
    expect(beacon?.payload.metrics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'TTFB',
          id: expect.any(String),
          delta: expect.any(Number),
          rating: expect.any(String),
          navigationType: expect.any(String),
        }),
      ])
    );
  });

  test('shows locally stored metrics on the dashboard route', async ({ page }) => {
    await page.addInitScript(() => {
      Math.random = () => 0;
    });

    await page.goto('/');
    await page.waitForFunction(() =>
      window.localStorage.getItem('casoon-webvitals-dashboard-metrics')?.includes('TTFB')
    );

    await page.goto('/web-vitals/');
    await expect(page.getByRole('heading', { name: 'Web Vitals dashboard' })).toBeVisible();
    await expect(page.locator('h2')).toContainText('/');
    await expect(page.getByText('TTFB', { exact: true })).toBeVisible();
  });

  test('runs every sitemap page from the local dashboard', async ({ page, request }) => {
    const sitemap = await request.get('/sitemap.xml');
    const paths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      ([, loc]) => new URL(loc).pathname
    );
    expect(paths).not.toEqual([]);

    await page.goto('/web-vitals/');
    const firstPage = page.waitForURL((url) => url.pathname === paths[0], { timeout: 15_000 });
    await page.getByRole('button', { name: 'Run sitemap pass' }).click();
    await firstPage;
    await page.waitForURL((url) => url.pathname === '/web-vitals/', {
      timeout: Math.max(30_000, paths.length * 5_000),
    });

    await expect(page.locator('h2')).toHaveCount(paths.length);
  });
});
