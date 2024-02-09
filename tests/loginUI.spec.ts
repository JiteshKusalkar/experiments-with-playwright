import { test, expect } from "@playwright/test";

test.describe("Test Login Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test.only("should give error when password not entered", async ({ page }) => {
    await page.waitForSelector('input[name="email"]');

    const usernameInput = await page.$('input[name="email"]');
    expect(usernameInput).not.toBeNull();
    await usernameInput?.fill(""); // change: fill username
    expect(await usernameInput?.inputValue()).toBe(""); // change: expect username to be filled

    await page.click(".action-login");
    const passwordError = await page.$(
      ".dough-fe-input-wrapper .dough-fe-helper"
    );
    expect(await passwordError?.innerText()).toBe(
      "Please fill in your password"
    );
  });

  test("should give error when username not entered", async ({ page }) => {
    await page.fill('input[name="password"]', "password");
    await page.click(".action-login");
    const emailError = await page.$(".js-login-input-email .dough-fe-helper");
    expect(await emailError?.innerText()).toBe(
      "Please fill in your username or email address"
    );
  });
});
