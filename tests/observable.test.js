import { test, expect } from '@playwright/test'
// reqs:
// 1. inputs: a variable and an iterable item.
// 2. for should call the function from the Symbol.iterator property of the iterable item which creates an iterator:
//   2a. if the iterable item has no Symbol.iterator property, for should throw an error.
// 3. for should call the function from the next property of the iterator which creates an object.
// 4. for should check the value of the object's done property:
//   4a. if the value = false, for should put the object's value property value into the variable from inputs (see #1)
//       and pass control to for's body;
//   4b. if the value = true, for should pass control to the next instruction after for's body.

test("for gets iterable with one element", () => {
    let count = {
        iterator: 0,
        next: 0
    }
    let elements = []
    let iterable = {
        [Symbol.iterator]() {
            count.iterator += 1
            return {
                next() {
                    // verifying req #4b
                    if (count.next > 1) {
                        throw new Error("next called >2 times")
                    }
                    if (count.next === 1) {
                        return {
                            done: true,
                            value: undefined
                        }
                    }
                    count.next += 1
                    return {
                        done: false,
                        value: 42
                    }
                }
            }
        }
    }
    for (let i of iterable) {
        elements.push(i)
    }
    expect(count).toStrictEqual({
        iterator: 1,
        next: 1
    })
    expect(elements).toStrictEqual([42])
})

test("for gets iterable with 100 elements", () => {
    let count = {
        iterator: 0,
        next: 0
    }
    let sum = 0
    let iterable = {
        [Symbol.iterator]() {
            count.iterator += 1
            return {
                next() {
                    if (count.next === 100) {
                        return {
                            done: true,
                            value: undefined
                        }
                    }
                    let obj = {
                        done: false,
                        value: count.next
                    }
                    count.next += 1
                    return obj
                }
            }
        }
    }
    for (let i of iterable) {
        sum += i
    }
    expect(count).toStrictEqual({
        iterator: 1,
        next: 100
    })
    expect(sum).toBe(4950)
})

test("for gets iterable without [Symbol.iterator]() property", () => {
    expect(() => {
        let iterable = {}
        for(let i of iterable) {}
    }).toThrow(TypeError)
})