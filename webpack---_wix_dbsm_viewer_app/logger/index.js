import {
    DataBindingError,
    AppError,
    UserError,
    UnhandledPromiseRejection,
} from './errors'
import {
    Bi,
    BiError,
    VerboseMessage
} from './events'
import {
    ExtendedMap,
    errorHandling,
    promiseOrSyncThenable
} from '../helpers'
import {
    DEPRECATED_METHODS_MAP
} from '../helpers/constants'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'

export * from './errors'
export * from './events'
export * from './bi'

export class DataBindingLogger {
    constructor(logger, global) {
        this._logger = logger
        this._listenToUnhandledErrors(global)
        this._predicateByEventType = new ExtendedMap([
            [Bi, ({
                mode,
                env
            }) => mode.csr && !env.dev],
            [VerboseMessage, ({
                mode,
                env
            }) => mode.verbose && env.preview],
        ])
    }

    log(event) {
        if (this._shouldLogErrorBi(event)) {
            this._logger.log(event, new BiError(event.cause || event))
        }

        if (this._shouldLog(event)) {
            return this._logger.log(event)
        }
    }

    logError(e, messageForUnhandled, optsForUnhandled) {
        this.log(
            e instanceof DataBindingError ?
            e :
            new AppError(messageForUnhandled, {
                cause: e,
                ...optsForUnhandled,
            }),
        )
    }

    _shouldLog(event) {
        const shouldLogPredicate =
            this._predicateByEventType.find((_, Type) => event instanceof Type) ||
            (() => true)

        return shouldLogPredicate(appContext.platform.settings)
    }

    _shouldLogErrorBi(event) {
        return (
            event instanceof DataBindingError &&
            !(event instanceof UserError) &&
            this._predicateByEventType.get(Bi)(appContext.platform.settings)
        )
    }

    _listenToUnhandledErrors(global) {
        global.addEventListener('unhandledrejection', e => {
            if (e.reason instanceof DataBindingError) {
                e.preventDefault()
                this._logger.log(new UnhandledPromiseRejection({
                    cause: e.reason
                }))
            }
        })
    }
}

export const createErrorReporting = logger => (fn, PresetError) =>
    errorHandling(fn, e => logger.log(new PresetError({
        cause: e
    })))

export const createBreadcrumbReporting = logger => (fn, PresetBreadcrumb) =>
    errorHandling(
        (...args) => {
            const result = fn(...args)

            logger.log(new PresetBreadcrumb({
                data: {
                    args,
                    result
                }
            }))

            return result
        },
        e => {
            logger.log(
                new PresetBreadcrumb({
                    data: {
                        exception: e
                    },
                    level: 'error'
                }),
            )
            throw e
        },
    )

export const createVerboseReporting =
    logger =>
    (fn, methodName) =>
    (...args) => {
        if (methodName.startsWith('on')) {
            logger.log(
                new VerboseMessage(VerboseMessage.types.DS_API.REGISTERED, {
                    methodName,
                }),
            )

            return fn(...args)
        }

        logger.log(
            new VerboseMessage(VerboseMessage.types.DS_API.CALLED, {
                methodName,
                args,
            }),
        )

        if (DEPRECATED_METHODS_MAP.has(methodName)) {
            const replacementMethodName = DEPRECATED_METHODS_MAP.get(methodName)

            logger.log(
                new VerboseMessage(VerboseMessage.types.DS_API.DEPRECATED, {
                    methodName,
                    replacementMethodName,
                }),
            )
        }

        return promiseOrSyncThenable(fn(...args)).then(result => {
            logger.log(
                new VerboseMessage(VerboseMessage.types.DS_API.SUCCED, {
                    methodName,
                    result,
                }),
            )

            return result
        })
    }

export class DataBindingBi extends Bi {
    constructor({
        id,
        collectionId,
        collectionName,
        datasetId,
        datasetType,
        datasetMode,
        numberOfResults,
        filteredBy,
        componentType,
        fieldType,
    }) {
        const {
            platform: {
                location: {
                    pageId,
                    pageUrl
                },
                settings: {
                    env
                },
            },
        } = appContext

        super({
            id,
            collectionId,
            collectionName,
            datasetId,
            datasetType,
            datasetMode,
            viewMode: env.name,
            pageId,
            pageUrl,
            numberOfResults,
            filteredBy,
            componentType,
            fieldType,
        })
    }
}