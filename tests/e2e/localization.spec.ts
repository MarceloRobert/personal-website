import { expect, test } from "@playwright/test";

test("updates the main text when the language changes", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");

  const introduction = page.locator("#summary p");
  await expect(introduction).toHaveText(
    "Hi! I'm a Full-Stack developer with experience in frontend, backend, and databases. Check out the projects I have worked on!",
  );

  await page.locator('summary[aria-label="Language"]').click();
  await page.getByRole("link", { name: "Portuguese" }).click();

  await expect(page).toHaveURL(/\/pt-br\/?$/);
  await expect(page.locator('summary[aria-label="Idioma"]')).toBeVisible();
  await page.locator('summary[aria-label="Idioma"]').click();
  await expect(page.getByRole("link", { name: "Português" })).toBeVisible();
  await expect(introduction).toHaveText(
    "Olá! Sou um desenvolvedor fullstack com experiência em frontend, backend e bancos de dados. Dê uma olhada nos projetos em que eu trabalhei!",
  );
});
