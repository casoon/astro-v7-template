import { expect, test } from '@playwright/test';

type PageAuditCheck = {
  detail: string;
  name: string;
  state: 'pass' | 'issue' | 'info';
};

type PageAudit = {
  checks: PageAuditCheck[];
  url: string;
};

const pageAuditStorageKey = 'casoon-webvitals-dashboard-page-audits';

test.describe('Starter – local page audit @page-audit', () => {
  test('reports browser-visible page checks for every sitemap URL', async ({ page, request }) => {
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBe(true);

    const paths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      ([, loc]) => new URL(loc).pathname
    );
    expect(paths).not.toEqual([]);

    await page.addInitScript(() => {
      Math.random = () => 0;
    });

    const results: Array<{ issues: PageAuditCheck[]; passed: number; url: string }> = [];
    for (const path of paths) {
      await page.goto(path);
      const url = page.url();
      try {
        await page.waitForFunction(
          ({ storageKey, url }) => {
            const audits = JSON.parse(localStorage.getItem(storageKey) ?? '[]') as PageAudit[];
            return audits.some((audit) => audit.url === url);
          },
          { storageKey: pageAuditStorageKey, url },
          { timeout: 8_000 }
        );
      } catch {
        throw new Error(
          'No Web Vitals page-audit data was captured. Restart astro dev after upgrading @casoon/astro-webvitals, then run this command again.'
        );
      }
      const audit = await page.evaluate(
        ({ storageKey, url }) => {
          const audits = JSON.parse(localStorage.getItem(storageKey) ?? '[]') as PageAudit[];
          return audits.find((entry) => entry.url === url);
        },
        { storageKey: pageAuditStorageKey, url }
      );
      expect(audit).toBeDefined();

      const issues = audit!.checks.filter((check) => check.state === 'issue');
      results.push({
        url,
        issues,
        passed: audit!.checks.filter((check) => check.state === 'pass').length,
      });
    }

    process.stdout.write('\nPage audit results\n');
    for (const result of results) {
      const path = new URL(result.url).pathname;
      const issueDetails = result.issues.map((issue) => `${issue.name}: ${issue.detail}`);
      process.stdout.write(
        `${result.issues.length ? '✗' : '✓'} ${path} ${issueDetails.join('; ') || `${result.passed} checks passed`}\n`
      );
    }

    expect(results.flatMap((result) => result.issues)).toEqual([]);
  });
});
