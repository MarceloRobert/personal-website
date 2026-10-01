import { defineConfig, devices } from "@playwright/test";

const testPort = 3001;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${testPort}`,
    trace: "on-first-retry",
  },
  webServer: {
    command: `NEXT_DIST_DIR=.next-playwright npm run dev -- --hostname 127.0.0.1 --port ${testPort}`,
    url: `http://127.0.0.1:${testPort}`,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
