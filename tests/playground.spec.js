const { test, expect } = require('@playwright/test')

test("playground", async ({page}) => {
    await page.goto("file://" + __dirname + "\\playground.html")
    const button = page.getByRole("button", { name: "asdf" })
    const text = page.getByText("asdf")
    console.log(await button.evaluate(node => `type: ${node.nodeType} name: ${node.nodeName} value: ${node.nodeValue}`))
    console.log(await text.evaluate(node => `type: ${node.nodeType} name: ${node.nodeName} value: ${node.nodeValue}`))
    // const container = page.locator("visible=true").filter({ has: button }).last()
    // console.log(await container.evaluateAll(nodes => nodes.map( n => n.tagName)))
    // // const container2 = page.locator("visible=true").filter({ has: text })
    // const container2 = page.locator("visible=true", { has: text })
    // console.log(await container2.evaluateAll(nodes => nodes.map( n => n.tagName)))

    const input = page.locator("#xxx")
    const inputNode = await input.evaluate(node => node.value)
    await input.type("hellow world")

    // console.log(await input.evaluate(node => node))
    // console.log(inputNode.value)

    const a = await page.locator(':visible').evaluateAll(nodes => nodes.map(node => node.nodeName))
    const b = await page.locator('* >> visible=true').evaluateAll(nodes => nodes.map(node => node.nodeName))
    console.log(`a = ${a} b = ${b}`)

    // const button = page.getByRole("button", { name: "asdf" }).locator('visible=true')
    // console.log(await button.evaluateAll(nodes => nodes.map(node => node.nodeName)))
    await expect(page.getByRole("generic", {name: "Search", exact: true})).toBeVisible()
})
