import { expect, test } from "@playwright/test";

const mobileViewports = [320, 375, 412];

test.describe("mobile responsive layout", () => {
  for (const width of mobileViewports) {
    test(`does not overflow horizontally at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");

      const dimensions = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      }));

      expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
    });
  }

  test("background covers the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    const background = page.locator("#background");
    const box = await background.boundingBox();

    await expect(background).toBeVisible();
    expect(box).not.toBeNull();
    expect(box).toMatchObject({ x: 0, y: 0, width: 375, height: 800 });
  });
});
