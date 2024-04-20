export default class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = (...args) => {
                resolve(...args)
                return this.promise
            }
            this.reject = (...args) => {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject(...args)
                return this.promise
            }
        })
    }
}