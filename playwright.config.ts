import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    workers: 2,

    projects: [
        {
            name: 'LambdaTest-Chrome-Windows',
            use: {
                browserName: 'chromium',
                connectOptions: {
                    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                        JSON.stringify({
                            browserName: 'Chrome',
                            browserVersion: 'latest',
                            'LT:Options': {
                                platform: 'Windows 10',
                                build: 'Playwright Execution',
                                name: 'Playwright - Chrome Windows',
                                user: process.env.LT_USERNAME,
                                accessKey: process.env.LT_ACCESS_KEY,
                                network: true,
                                video: true,
                                console: true,
                            },
                        })
                    )}`,
                },
            },
        },
        {
            name: 'LambdaTest-Edge-Windows',
            use: {
                browserName: 'chromium', // Edge runs on Chromium engine
                connectOptions: {
                    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                        JSON.stringify({
                            browserName: 'MicrosoftEdge',
                            browserVersion: 'latest',
                            'LT:Options': {
                                platform: 'Windows 10',
                                build: 'Playwright Execution',
                                name: 'Playwright - Edge Windows',
                                user: process.env.LT_USERNAME,
                                accessKey: process.env.LT_ACCESS_KEY,
                                network: true,
                                video: true,
                                console: true,
                            },
                        })
                    )}`,
                },
            },
        },
    ],
});
