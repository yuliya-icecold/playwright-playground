const { test, expect } = require("@playwright/test")
// the tests below need to be verified
test("Google.com - Hover over speaker icon", async ({page}) => {
    await page.goto("https://www.google.com/")
    await page.getByRole('button', { name: 'Odrzuć wszystko' }).click()
    await page.getByRole('link', { name: 'english' }).click()
    await expect(page.getByLabel("Search by voice")).toBeVisible()
    await page.getByLabel("Search by voice").hover()
    await expect(page.getByText("Search by voice")).toBeVisible()
})
test("Google search results - Hover over search button", async ({page}) => {
    await page.goto("https://www.google.com/")
    await page.getByRole('button', { name: 'Odrzuć wszystko' }).click()
    await page.getByRole('link', { name: 'english' }).click()
    await page.getByLabel('Search', { exact: true }).fill("calculator")
    await page.getByLabel('Search', { exact: true }).click()
    await page.getByLabel('Google Search').first().click()
    const locator1 = page.getByRole("generic", {name: "Search", exact: true})
    const elements = locator1.evaluateAll()
    await page.getByRole("button", {name: "Search", exact: true}).hover()
    await expect(page.getByText("Search")).toBeVisible()
})

// the tests below are working
test("Playwright - main page - hover Node.js button", async ({page}) => {
    await page.goto("https://playwright.dev/")
    const buttonNodeJS = page.getByRole("button", {name: "Node.js"})
    await buttonNodeJS.hover()
    await expect(page.getByRole("list", {has: page.getByRole("link", {name: {name: "Node.js"}})}).last()).toBeVisible()
    await expect(page.getByRole("link", {name: "Node.js"}).first()).toBeVisible()
    await expect(page.getByRole("link", {name: "Python"}).first()).toBeVisible()
    await expect(page.getByRole("link", {name: "Java"}).first()).toBeVisible()
    await expect(page.getByRole("link", {name: ".NET"}).first()).toBeVisible()
    await buttonNodeJS.focus()
    await expect(buttonNodeJS).toBeFocused()
})

test('Verify tooltip using tooltip box', async({page})=>{
    await page.goto('http://autopract.com/selenium/tooltip/')
    await page.getByRole("textbox", {name: "Your age:"}).hover()
    await expect(page.getByRole("tooltip", {name: "We ask for your age only for testing."}).locator("visible=true")).toBeVisible()
})