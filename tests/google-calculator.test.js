const build = {
  new: false,
  runTests: () => {
    // ...
  }
}
if (build.new) {
  build.runTests()
}

checkIfNewBuild(build.runtests)

build.runTests()

const { test, expect } = require('@playwright/test')
test.beforeEach(async ({page}) => {
  await page.goto("https://www.google.com/")
  await page.getByRole('button', { name: 'Odrzuć wszystko' }).click()
  await page.getByRole('link', { name: 'english' }).click()
  await page.getByLabel('Search', { exact: true }).fill("calculator")
  await page.getByLabel('Search', { exact: true }).click()
  await page.getByLabel('Google Search').first().click()
  await expect(page.locator(':visible', {has: page.getByRole("heading", {name: "Calculator result"})}).last()).toBeVisible()
})
test.use({ 
    locale: 'en-US',
  })
test("Multiplication", async ({page}) => {
  const calculator = page.locator('*', {has: page.getByRole("heading", {name: "Calculator result"})}).last()
  await calculator.getByRole("button", {name: "2"}).click()
  await calculator.getByRole("button", {name: "1"}).click()
  await calculator.getByLabel("multiply").click()
  await calculator.getByRole("button", {name: "2"}).click()
  await calculator.getByLabel("equals").click()
  await expect(calculator.getByText("42", {exact: true}).locator('visible=true')).toBeVisible()
})
test("Addition", async ({page}) => {
  const calculator = page.locator(':visible', {has: page.getByRole("heading", {name: "Calculator result"})}).last()
  await calculator.getByRole("button", {name: "3"}).click()
  await calculator.getByRole("button", {name: "0"}).click()
  await calculator.getByLabel("plus").click()
  await calculator.getByRole("button", {name: "4"}).click()
  await calculator.getByLabel("equals").click()
  await expect(calculator.getByText("34", {exact: true}).locator("visible=true")).toBeVisible()
})
test("Substraction", async ({page}) => {
  const calculator = page.locator(':visible', {has: page.getByRole("heading", {name: "Calculator result"})}).last()
  await calculator.getByRole("button", {name: "5"}).click()
  await calculator.getByRole("button", {name: "6"}).click()
  await calculator.getByLabel("minus").click()
  await calculator.getByRole("button", {name: "7"}).click()
  await calculator.getByRole("button", {name: "8"}).click()
  await calculator.getByLabel("equals").click()
  await expect(calculator.getByText("-22", {exact: true}).locator("visible=true")).toBeVisible()
})
test("Division", async ({page}) => {
  const calculator = page.locator(':visible', {has: page.getByRole("heading", {name: "Calculator result"})}).last()
  await calculator.getByRole("button", {name: "9"}).click()
  await calculator.getByRole("button", {name: "9"}).click()
  await calculator.getByLabel("divide").click()
  await calculator.getByRole("button", {name: "2"}).click()
  await calculator.getByLabel("equals").click()
  await expect(calculator.getByText("99 ÷ 2 =", {exact: true})).toBeVisible()
  await expect(calculator.getByText("49.5", {exact: true}).locator("visible=true")).toBeVisible()
})
test("Parentheses", async ({page}) => {
  const calculator = page.locator(":visible", {has: page.getByRole("heading", {name: "Calculator result"})}).last()
  await calculator.getByRole("button", {name: "3"}).click()
  await calculator.getByRole("button", {name: "multiply"}).click()
  await calculator.getByLabel('left parenthesis').click()
  await calculator.getByRole("button", {name: "5"}).click()
  await calculator.getByLabel("plus").click()
  await calculator.getByRole('button', {name: "2"}).click()
  await calculator.getByLabel("right parenthesis").click()
  await calculator.getByLabel("equals").click()
  await expect(calculator.getByText("21", {exact: true}).locator("visible=true")).toBeVisible()
})
test("Calculations history button", async ({page}) => {
  const calculator = page.locator(":visible", {has: page.getByRole("heading", {name: "Calculator result"})}).last()
  await expect(calculator.getByLabel("calculations history").last()).toBeVisible()
  await expect(calculator.getByRole("button", {name: "calculations history"})).toBeEnabled()
  await calculator.getByRole("button", {name: "calculations history"}).click()
})