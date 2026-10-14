import { expect, type Page, test } from '@playwright/test';

declare global {
  interface Window {
    __cspViolations?: string[];
  }
}

/** Collects every CSP violation — a blocked resource would otherwise just be silently broken. */
export async function trackViolations(page: Page) {
  await page.addInitScript(() => {
    window.__cspViolations = [];
    document.addEventListener('securitypolicyviolation', (event) => {
      window.__cspViolations?.push(`${event.violatedDirective} ${event.blockedURI}`);
    });
  });
}

export const violations = (page: Page) => page.evaluate(() => window.__cspViolations ?? []);

/**
 * Shared CSP checks: the policy is emitted with hashed scripts, no executable inline script
 * precedes the CSP <meta> (a meta policy only applies from its position on), and every listed
 * page loads without violations.
 */
export function cspTests(paths: string[]) {
  test('pages ship a CSP with hashed scripts', async ({ page }) => {
    await page.goto(paths[0]);
    const csp = await page
      .locator('meta[http-equiv="content-security-policy"]')
      .getAttribute('content');
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toMatch(/script-src 'self'[^;]*'sha256-/);
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);
  });

  test('no executable inline script runs before the policy', async ({ page }) => {
    for (const path of paths) {
      await page.goto(path);
      const beforePolicy = await page.evaluate(() => {
        const meta = document.querySelector('meta[http-equiv="content-security-policy"]');
        return [...document.querySelectorAll('script:not([src])')]
          .filter((s) => !s.type || s.type === 'module' || s.type === 'text/javascript')
          .filter((s) => meta && s.compareDocumentPosition(meta) & Node.DOCUMENT_POSITION_FOLLOWING)
          .map((s) => s.textContent?.slice(0, 60));
      });
      expect(beforePolicy, path).toEqual([]);
    }
  });

  for (const path of paths) {
    test(`${path} runs without CSP violations`, async ({ page }) => {
      await trackViolations(page);
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      expect(await violations(page)).toEqual([]);
    });
  }
}
