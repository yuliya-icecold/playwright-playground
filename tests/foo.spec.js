import { test, expect } from '@playwright/test'
import { multiply, metersFromKilometers, download, createApi, promise, mapAsync, evenOrOdd } from '../src/foo'
import isEven from "is-even"

test("Multiplication", async () => {
    let result = 0
    multiply(2, 3, (x) => {
        result = x
    })
    expect(result).toBe(6)
})

test("metersFromKilometers", async () => {
    const metersPromise = metersFromKilometers(42)
    let meters = 0
    metersPromise.then(m => { meters = m })
    expect(meters).toBe(42000)
})

test("download promise", async () => {
    let sentRequest = []
    let receiveResponse = undefined
    const downloadedPromise = download("some/test/url", (method, url, receive) => {
        sentRequest.push([method, url])
        receiveResponse = receive
    })
    console.log("after download()")
    let response = []
    downloadedPromise.then((result) => {
        response.push(result)
    })

    expect(sentRequest).toStrictEqual([["GET", "some/test/url"]])

    receiveResponse("some response")

    expect(response).toStrictEqual(["some response"])
})

test("download multiple then's", async () => {
    let receiveResponse = undefined
    const downloadedPromise = download("some/test/url", (method, url, receive) => {
        receiveResponse = receive
    })

    let response = []
    downloadedPromise.then((result) => {
        response.push([1, result])
    })
    downloadedPromise.then((result) => {
        response.push([2, result])
    })

    receiveResponse("r")

    downloadedPromise.then((result) => {
        response.push([3, result])
    })
    downloadedPromise.then((result) => {
        response.push([4, result])
    })

    expect(response).toStrictEqual([[1, "r"], [2, "r"], [3, "r"], [4, "r"]])
})

test("download promise.then", async () => {
    let sentRequest = []
    const downloadedPromise = download("some/test/url", (method, url, receiveResponse) => {
        receiveResponse("some response")
        sentRequest.push([method, url])
    })
    expect(sentRequest).toStrictEqual([["GET", "some/test/url"]])

    let response1 = []
    downloadedPromise.then((result) => {
        response1.push("1 - " + result)
    })
    downloadedPromise.then((result) => {
        response1.push("2 - " + result)
    })
    expect(response1).toStrictEqual(["1 - some response", "2 - some response"])

    expect(sentRequest).toStrictEqual([["GET", "some/test/url"]])
})

test("mapAsync returns promise of result array", () => {
    let result = []
    mapAsync([1, 2, 3], (element, to) => { 
        result.push(element)
        to(element*2)
    }).then(doubles => {
        result.push(doubles)
    })
    expect(result).toStrictEqual([1, 2, 3, [2, 4, 6]])
})

test("initial array is empty", () => {
    let result = []
    mapAsync([], (element, to) => { 
        result.push(element)
        to(element*2)
    }).then(doubles => {
        result.push(doubles)
    })
    expect(result).toStrictEqual([[]])
})

test("mapAsync calls map() for next element only after convertion is done for the previous element", () => {
    let result = []
    let convertTo = undefined
    mapAsync([2, 3, 4], (element, to) => {
        convertTo = to
        result.push(`called ${element}`)
    }).then(doubles => {
        result.push(doubles)
    })
    expect(result).toStrictEqual(["called 2"])
    convertTo(4)
    expect(result).toStrictEqual(["called 2", "called 3"])
    convertTo(6)
    expect(result).toStrictEqual(["called 2", "called 3", "called 4"])
    convertTo(8)
    expect(result).toStrictEqual(["called 2", "called 3", "called 4", [4, 6, 8]])
})


test("signUp", () => {
    let request = []
    const api = createApi((method, url, body, giveResponse) => {
        request.push({
            method,
            url,
            body
        })
        giveResponse({
            firstId: "first-ID",
            userId: "some-ID",
            lastId: "last-ID"
        })
    })
    
    api.signUp("test@test.com", "pw").then((id) => {
        expect(id).toBe("some-ID")
    })
    expect(request).toStrictEqual([{
        method: "POST",
        url: "/users",
        body: {
            email: "test@test.com",
            password: "pw"
        }
    }])
})

test("promise - fulfil sync", () => {
    let actualInfo = []
    const promiseObject = promise((fulfil) => { fulfil("some information") })
    promiseObject.then((info) => { actualInfo.push(`subscriber 1 - ${info}`) })
    promiseObject.then((info) => { actualInfo.push(`subscriber 2 - ${info}`) })
    expect(actualInfo).toStrictEqual(["subscriber 1 - some information", "subscriber 2 - some information"])
})

test("promise - fulfil async", () => {
    let fulfil = undefined
    let actualInfo = []
    const p = promise((f) => { fulfil = f })
    p.then((info) => { actualInfo.push(`s1 - ${info}`) })
    p.then((info) => { actualInfo.push(`s2 - ${info}`) })
    fulfil("info")
    expect(actualInfo).toStrictEqual(["s1 - info", "s2 - info"])
    p.then((info) => { actualInfo.push(`s3 - ${info}`) })
    p.then((info) => { actualInfo.push(`s4 - ${info}`) })
    expect(actualInfo).toStrictEqual(["s1 - info", "s2 - info", "s3 - info", "s4 - info"])
})

test("promise - value = undefined", () => {
    let actualInfo = []
    const promiseObject = promise((fulfil) => { fulfil(undefined) })
    promiseObject.then((info) => { actualInfo.push(info) })
    expect(actualInfo).toStrictEqual([undefined])
})

// test("promise - chain multiple then()", () => {
//     promise((fulfil) => { fulfil(42) })
//         .then(value => { return value + 1 })
//         .then(value => { return value * 2 })
//         .then(value => expect(value).toBe(86))
// })

// test("promise - unwrap inner promise", () => {
//     promise(f => f(42))
//         .then(() => { return promise(f => f(43)) })
//         .then(value => expect(value).toBe(43))
// })

test("pass even number", () => {
    expect(evenOrOdd(2)).toBe("even")
})
test("pass odd number", () => {
    expect(evenOrOdd(21)).toBe("odd")
    expect(isEven(1)).toBeFalsy()
})

class X {
    constructor() {
        this.z = 1989
        // return this === no return
    }

    f() {
        console.log('hello', this.y)
    }
    //....
}

const x = new X()
x.y = 'Vasya'
x.f()

// --- we need to go deeper ---

function XX() {
    this.z = 1989
    // return this === no return
}

XX.prototype.f = function() {
    console.log('hello', this.y)
}

const xx = new XX()
xx.y = 'Vasya'
xx.f()

// --- MOAR deeper ---

// function XX ...

function _new(Constructor) {
    const thiz = { __proto__: Constructor.prototype }
    let instance = Constructor.call(thiz)
    if (instance === undefined) {
        instance = thiz
    }
    return instance
}
const xxx = _new(XX)
xxx.y = 'Vasya'
xxx.f()

// ---

function Vector(x, y, z) {
    const v = {
        x, y, z,

        distanceTo(otherVector) {
            //
        }
        //...
    }
    return v
}

const v1 = Vector(1, 0, 0)
const v2 = Vector(2, 3, 1)

// --

function Vector(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
}

Vector.prototype.distanceTo = function(otherVector) {
    //...
}

const vv1 = new Vector(1, 0, 0)
const vv2 = new Vector(2, 3, 1)


//-----------------

;[
    {
        name: 'a',
        parent: null,
    },
    {
        name: 'b',
        parent: 'a'
    },
    {
        name: 'c',
        parent: 'b'
    },
    {
        name: 'd',
        parent: 'b'
    },
]