// @ts-check
const { defineConfig } = require('@playwright/test');

const BASE_URL = 'https://automationexercise.com/';

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: 'test-results/screenshots',
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: process.env.CI ? 'never' : 'on-failure' }],
    ['list'],
  ],
  timeout: 45000,
  globalTimeout: 300000,
  use: {
    baseURL: BASE_URL,
    headless: false,
    launchOptions: {
      args: ['--start-maximized'],
    },
    viewport: null,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'api',
      testDir: './tests/api/specs',
      use: {
        baseURL: BASE_URL,
        headless: true,
      },
    },
    {
      name: 'e2e-chrome',
      testDir: './tests/e2e/specs',
      use: {
        browserName: 'chromium',
        baseURL: BASE_URL,
        viewport: null,
        headless: true,
      },
    },
    {
      name: 'e2e-firefox',
      testDir: './tests/e2e/specs',
      use: {
        browserName: 'firefox',
        baseURL: BASE_URL,
        viewport: null,
        headless: true,
      },
    },
  ],
});
