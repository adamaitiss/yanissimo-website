import { expect, test } from "@playwright/test";

test("hero matches reference", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("section#hero");
  await hero.waitFor({ state: "visible" });
  await expect(hero).toHaveScreenshot("hero.png", {
    maxDiffPixelRatio: 0.02,
  });
});
