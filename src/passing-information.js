// template:

function a() {
    let x = 42
}

function b() {
    console.log(x)
}

// pass an argument

function a() {
    let x = 42
    b(x)
}

function b(x) {
    console.log(x)
}

// return

function a() {
    let x = 42
    return x
}

function b() {
    let x = a()
    console.log(x)
}

// callback for output (argument * argument)

function a(receive) {
    let x = 42
    receive(x)
}

function b() {
    a(x => {
        console.log(x)
    })
}

// lazy evaluation (return * return)

function a() {
    return () => {
        let x = 42
        return x
    }
}

function b() {
    let evaluateX = a()
    console.log(evaluateX())
}

// factory function / getter / callback for input / lazy computation (argument * return)

function a() {
    b(() => {
        let x = (7 * 3 - 3) * 2 + 6
        return x
    })
}

function b(getX) {
    let x = getX()
    console.log(x)
}

// publisher / subject (return * argument)

function a() {
    let x = 42
    const receive = b()
    receive(x)
}

function b() {
    return x => console.log(x)
}

// (argument * return * argument)

function a(c) {
    let x = 42
    let receiver = c()
    receiver(x)
}

function b() {
    a(() => {
        return x => {
            console.log(x)
        }
    })
}

// ??? (argument * argument * argument * return)

function a() {
    let x = 42
    b(f => {
        f(() => x)
    })
}

function b(c) {
    c(getX => {
        let x = getX()
        console.log(x)
    })
}

// promise / future / asynctask / single observable (return * argument * argument)

function a() {
    return {
        then: function (receive) {
            let x = (7 * 3 - 3) * 2 + 6
            receive(x)
        }
    }
}

function b() {
    let promiseOfX = a()
    promiseOfX.then(x => {
        console.log(x)
    })
}
