import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'starter',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5173',
      },
      testMatch: 'starter/**/*.spec.ts',
    },
    {
      name: 'blog',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5174',
      },
      testMatch: 'blog/**/*.spec.ts',
    },
  ],
  webServer: [
    {
      // Worker runtime (not a static server) — the contact page is rendered on request.
      command:
        'pnpm --filter @astro-v7/starter exec wrangler dev --config dist/server/wrangler.json --port 5173',
      port: 5173,
      reuseExistingServer: false,
    },
    {
      command: 'npx serve apps/blog/dist/client -l 5174',
      port: 5174,
      reuseExistingServer: false,
    },
  ],
});
