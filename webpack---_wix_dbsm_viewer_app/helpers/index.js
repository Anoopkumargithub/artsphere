/* eslint-disable no-console */
export {
    default as Dispatcher
}
from './Dispatcher'
export {
    default as Deferred
}
from './Deferred'

// decorators. implemented as funcs since js decorators spec isn't stabilazed yet

export const errorHandling =
    (fn, handleError) =>
    (...args) => {
        try {
            const res = fn(...args)

            return res ? .catch instanceof Function ?
                res.catch(e => handleError(e, ...args)) :
                res
        } catch (e) {
            return handleError(e, ...args)
        }
    }

export const promiseReturning = cb =>
    errorHandling(
        (err, ...args) => Promise.resolve(cb(err, ...args)),
        e => Promise.reject(e),
    )

export const promiseOrSyncThenable = entity => {
    return entity ? .then ? entity : {
        then: cb => cb(entity)
    }
}

// you have similar in stage 1 proposal and implemented in core-js. but the lib is too big
export class ExtendedMap extends Map {
    getOrDefault(key, def) {
        return this.has(key) ? this.get(key) : this.set(key, def).get(key)
    }

    find(predicate) {
        const [, foundVal] =
        Array.from(this).find(([key, val]) => predicate(val, key, this)) || []

        return foundVal
    }
}

export class ExtendedSet extends Set {
    reduce(cb, acc) {
        return Array.from(this).reduce(
            (accum, val, i) => cb(accum, val, i, this),
            acc,
        )
    }
}