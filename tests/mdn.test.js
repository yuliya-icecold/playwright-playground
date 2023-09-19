const { test, expect } = require('@playwright/test')
test("MDN main page has 'Sign up for free' button", async ({page}) => {
    await page.goto("https://developer.mozilla.org/en-US/")
    await expect(page.getByText("Sign up for free")).toBeVisible()
})
test("MDN main page has 'Log out' button", async ({page}) => {
    await page.goto("https://developer.mozilla.org/en-US/")
    await expect(page.getByText("Log out")).toBeVisible()
})