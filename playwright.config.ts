import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  testDir: './tests',
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['json', {outputFile: './test-results/jsonReporter.json'}],
    ['junit', {outputFile: './test-results/junitReporter.xml'}],
    // ['allure-playwright']
    ['html']
    ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    GlobalsQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    AutoWaitURL: 'http://uitestingplayground.com/ajax',
    testIdAttribute : 'status',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4202/'
          : process.env.STAGING === '1' ? 'http://localhost:4201/'
          : 'http://localhost:4200/',
  
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: {
      mode:'off',
      size: {width: 1920, height: 1080}
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "mobile",
      testMatch: 'testOnMobileDevice.spec.js',
      use: {
        browserName: 'chromium',
        ...devices['iPad (gen 7) landscape']
      }
    },
    {
      name: 'dev',
      use: {
        browserName: 'chromium',
        baseURL: 'http://localhost:4200/',
        video: {
          mode: 'off',
          size: {width: 1920, height: 1080}
        },
        // viewport: {width: 1920, height: 720},
        headless: false,
      },
      testMatch: 'easySmallAndFast.spec.js'
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});
