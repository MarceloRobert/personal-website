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

test.describe("theme toggle", () => {
  test("switches and restores the selected theme", async ({ page }) => {
    await page.goto("/");

    const controlsToggle = page.locator("#toggleControlButton");
    const controlButtonsDiv = page.locator("#controlButtons");
    const themeToggle = page.locator("#toggleThemeButton");

    // Initial state: only control toggle visible, but theme toggle hidden
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(controlsToggle).toBeVisible();
    await expect(controlButtonsDiv).toBeHidden();
    await expect(themeToggle).toHaveAttribute("aria-pressed", "false");

    // Toggle controls
    await controlsToggle.click();
    await expect(controlsToggle).toHaveAttribute("aria-expanded", "true");
    await expect(controlButtonsDiv).toBeVisible();
    // expect 2 icons and no text
    await expect(themeToggle.locator("span")).toHaveCount(2);
    await expect(themeToggle).not.toContainText("theme");
    // Toggle theme
    await themeToggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(themeToggle).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(themeToggle).toHaveAttribute("aria-pressed", "true");
  });

  test("switches theme on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Theme button is directly accessible, and the config button is hidden
    const controlsToggle = page.locator("#toggleControlButton");
    const themeToggle = page.locator("#toggleThemeButton");
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveAttribute("aria-pressed", "false");
    await expect(controlsToggle).toBeHidden();

    await themeToggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(themeToggle).toHaveAttribute("aria-pressed", "true");
  });
});
