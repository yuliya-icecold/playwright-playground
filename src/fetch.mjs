let response = await fetch("https://playwright.dev/docs/test-reporters#html-reporter")
console.log(`status is ${response.status}`)
console.log(`headers are ${response.headers}`)
console.log(`body is ${response.body}`)