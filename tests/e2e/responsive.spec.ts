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

      expect(dimensions.documentWidth).toBeLessThanOrEqual(
        dimensions.viewportWidth,
      );
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

  test("shows the social links pill after scrolling past the link bar", async ({
    page,
  }) => {
    // Has to be desktop viewport because on mobile the links are hidden
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    const socialLinksPill = page.locator("#sideLinks > div");
    await expect(socialLinksPill).toBeHidden();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(socialLinksPill).toBeInViewport();

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(socialLinksPill).toBeHidden();
  });
});
