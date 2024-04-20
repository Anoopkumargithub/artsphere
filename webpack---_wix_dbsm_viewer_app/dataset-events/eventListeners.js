import {
    noop,
    remove
} from 'lodash'
import {
    promiseReturning
} from '../helpers'
import {
    VerboseMessage
} from '../logger'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'

const eventListenersCreator = (firePlatformEvent = noop) => {
    let isDisposed = false
    let callbacks = {}

    const getCallbacks = eventName =>
        callbacks[eventName] ? callbacks[eventName] : (callbacks[eventName] = []) // WeakSet is not iterable.

    const register = (eventName, cb) => {
        if (isDisposed) {
            return noop
        }

        const handler = promiseReturning(cb)

        getCallbacks(eventName).push(handler)
        return () => {
            remove(getCallbacks(eventName), f => f === handler)
        }
    }

    const executeHooks = (eventName, ...args) => {
        return Promise.all(getCallbacks(eventName).map(fn => fn(...args)))
    }

    const fireEvent = (eventName, ...args) => {
        appContext.logger.log(
            new VerboseMessage(VerboseMessage.types.DS_API.TRIGGERED, {
                eventName,
                eventArgs: args,
            }),
        )
        firePlatformEvent(eventName, ...args)
        return executeHooks(eventName, ...args)
    }

    const dispose = () => {
        isDisposed = true
        callbacks = {}
    }

    return {
        register,
        executeHooks,
        fireEvent,
        dispose,
    }
}

export default eventListenersCreator