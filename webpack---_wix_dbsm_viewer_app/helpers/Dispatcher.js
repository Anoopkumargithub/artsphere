import {
    ExtendedMap,
    ExtendedSet
} from '.'
import {
    AppError
} from '../logger'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'

export default class Dispatcher {
    constructor(context) {
        this._context = context
        this._eventToListener = new ExtendedMap()
    }

    dispatch(event, ...args) {
        return this._eventToListener.has(event) ?
            this._eventToListener.get(event).reduce(
                (acc, listener) => [
                    ...acc,
                    appContext.errorReporting(
                        listener,
                        AppError.with({
                            message: `${event} listener failed`,
                            options: {
                                extra: this._context
                            },
                        }),
                    )(this._context, ...args),
                ], [],
            ) :
            undefined
    }

    subscribe(event, listener) {
        if (event.constructor === Object) {
            return Object.entries(event).reduce(
                (acc, [eventType, listener]) => [
                    ...acc,
                    this.subscribe(eventType, listener),
                ], [],
            )
        }

        this._eventToListener.getOrDefault(event, new ExtendedSet()).add(listener)

        return () => this.unsubscribe(event, listener)
    }

    unsubscribe(event, listener) {
        return (
            this._eventToListener.has(event) &&
            this._eventToListener.get(event).delete(listener)
        )
    }
}