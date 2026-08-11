import { expect, test } from '@playwright/test';

type WebVitalsMetric = {
  delta: number;
  id: string;
  name: string;
  navigationType?: string;
  rating?: string;
};

type Beacon = {
  payload: { metrics: WebVitalsMetric[] };
  url: string;
};

declare global {
  interface Window {
    __webVitalsBeacons?: Beacon[];
    __webVitalsMetrics?: WebVitalsMetric[];
  }
}

test.describe('Starter – sitemap RUM @sitemap-rum', () => {
  test('reports a field metric for every URL in the sitemap', async ({ page, request }) => {
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBe(true);

    const paths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      ([, loc]) => new URL(loc).pathname
    );
    expect(paths).not.toEqual([]);

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

    for (const path of paths) {
      await page.goto(path);
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
    }
  });
});
