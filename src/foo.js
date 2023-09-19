import isEven from 'is-even'

// pass argument * pass argument

export function multiply(a, b, receiveResult) {
    receiveResult(a * b)
}

export function metersFromKilometers(kilometers) {
    // use multiply(...)
    return {
        then: (foo) => { multiply(1000, kilometers, foo) }
    }
}

// function sendNetworkRequest(method, url, receiveResponse)
export function download(url, sendNetworkRequest) {
    // should return promise of response
    // should use provided sendNetworkRequest function to send GET-request and receive response
    // should send request regardless of then()
    // should provide result of download to every then(), if multiple present
    // should not re-download multiple times if then() is called multiple times
    // should not deliver response more than once per then() call
    let callbacks = []
    let response = undefined
    let responseReceived = false
    sendNetworkRequest("GET", url, (r) => {
        responseReceived = true
        response = r
        callbacks.forEach(callback => { callback(r) })
        callbacks = undefined
        console.log("called sendrequest")
    })
    
    return {
        then: (cb) => { 
            if (!responseReceived) {
                callbacks.push(cb)
            } else {
                cb(response)
            }
        }
    }
    
}

/**
    1. Should return promise of result array
    2. Should call `map(element, to)` for each element to convert that element, similar to `Array.map`
    3. Should pass a `to(convertedElement)` function to `map()`, which should be used to receive the converted element
    4. Should call `map()` for next element only after convertion is done for the previous element
    5. ...all the usual requirements for promise
*/
function mapAsync2(array, map) {
    let resultArray = []
    let callback = undefined
    let i = 0
    function to(r) {
        resultArray.push(r)
        if (array.length === resultArray.length) {
            if (callback !== undefined) {
                callback(resultArray)
            }
        } else {
            i += 1
            map(array[i], to)
        }
    }
    if (array.length !== 0) {
        map(array[0], to)
    }
    return {
        then: (cb) => {
            if (resultArray.length !== array.length) {
                callback = cb
            } else {
                cb(resultArray)
            }
        }
    }
}

export function createApi(sendNetworkRequest) {
    return {
        /**
            1. Should `POST` json with email and password to `/users`
            2. Should expect response to be json object with `userId` field.
            3. Should return promise of created user ID.
        */
        signUp(email, password) {
            // let callbacks = []
            // let response = undefined
            // let responseReceived = false

            
            return promise((fulfil) => { 
                const body = {
                    "email": email,
                    "password": password
                }
                sendNetworkRequest("POST", "/users", body, (r) => {
                    // responseReceived = true
                    // response = r.userId
                    fulfil(r.userId)
                    // callbacks.forEach(callback => { callback(response) })
                    // callbacks = undefined
                })
            }) //promise
            // {
            //     then: (cb) => { 
            //         if (!responseReceived) {
            //             callbacks.push(cb)
            //         } else {
            //             cb(response)
            //         }
            //     }
            // }
        },

        postComment(userId, comment) {
            let callbacks = []
            let response = undefined
            let responseReceived = false

            sendNetworkRequest("POST", `/users/${userId}/comments`, comment, (r) => {
                responseReceived = true
                response = r.commentId
                callbacks.forEach(callback => { callback(response) })
                callbacks = undefined
            })
            
            return {
                then: (cb) => { 
                    if (!responseReceived) {
                        callbacks.push(cb)
                    } else {
                        cb(response)
                    }
                }
            }
        }
    }
}

export function promise(doAsync) {
    let callbacks = []
    let value = undefined
    let valueReceived = false
    doAsync(r => {
        valueReceived = true
        value = r
        callbacks.forEach(callback => { callback(value) })
        callbacks = undefined
    })
    return {
        then: (cb) => { 
            if (!valueReceived) {
                callbacks.push(cb)
            } else {
                cb(value)
            }
        }
    }
}

export function mapAsync(array, map) {
    return promise((fulfil) => {
        let resultArray = []
        let i = 0
        function to(r) {
            resultArray.push(r)
            if (array.length === resultArray.length) {
                fulfil(resultArray)
            } else {
                i += 1
                map(array[i], to)
            }
        }
        if (array.length !== 0) {
            map(array[0], to)
        } else {
            fulfil(resultArray)
        }
    })
}

export function evenOrOdd(number) {
    if ( isEven(number) ) {
        return "even"
    } else {
        return "odd"
    }
}