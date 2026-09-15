import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests-ts',
  fullyParallel: false, // tests share one running app + database; keep them from stepping on each other
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
});
