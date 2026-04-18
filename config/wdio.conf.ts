import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config();

const udid = process.env.UDID as string;
const bundleId = process.env.BUNDLE_ID as string;

if (!udid) throw new Error('UDID is not set in environment variables');
if (!bundleId) throw new Error('BUNDLE_ID is not set in environment variables');

const screenshotsDir = path.join(process.cwd(), 'screenshots');

export const config: WebdriverIO.Config = {
  runner: 'local',

  port: 4723,

  services: [],
  // Add this block to wdio.conf.ts, before capabilities
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },
  capabilities: [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:deviceName': 'iPhone',
      'appium:udid': udid,
      'appium:bundleId': bundleId,
      'appium:noReset': true,
      'appium:newCommandTimeout': 120,
    },
  ],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  specs: ['../tests/**/*.test.ts'],
  exclude: [],

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  afterTest: async function (test, _context, { error }) {
    if (error) {
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const safeName = (test.fullName ?? test.title ?? 'unknown').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80);
      const screenshotPath = path.join(screenshotsDir, `${safeName}_${timestamp}.png`);
      await browser.saveScreenshot(screenshotPath);
    }
  },
};
