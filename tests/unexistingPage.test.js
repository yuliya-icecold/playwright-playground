const { test, expect } = require('@playwright/test')
test("Open unexisting URL", async ({page}) => {
    await page.goto("https://playwrights.dev/")
    await expect(page.getByText("This site can’t be reached")).toBeVisible()
})