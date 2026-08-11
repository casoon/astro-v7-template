import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  reporter: 'line',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'starter-dev',
      testMatch: 'starter/page-audit.spec.ts',
    },
  ],
  webServer: {
    command: 'pnpm --filter @astro-v7/starter dev --host 127.0.0.1 --port 4321',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
});
