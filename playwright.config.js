import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-api-framework/tests',
  timeout: 30000,
  retries: 1,
  fullyParallel: false,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list']
  ],

  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
    trace: 'retain-on-failure',
  },
});