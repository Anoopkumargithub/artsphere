/* eslint-disable no-prototype-builtins */
/* eslint-disable no-console */
import {
    BI_ENDPOINT as BI_VIEWER_ENDPOIINT_PREVIEW,
    BI_VIEWER_ENDPOINT as BI_VIEWER_ENDPOINT_LIVE,
    BI_ERROR_ENDPOINT,
} from '@wix/wix-data-client-common-standalone'
import {
    SentryProjects,
    configureForViewerWorker,
} from '@wix/wix-data-client-common'
import {
    APP_NAME
} from '../helpers/constants'
import {
    Bi,
    Trace,
    Breadcrumb,
    DataBindingError,
    UserError,
    VerboseMessage,
    UnhandledPromiseRejection,
    ConsoleEvent,
} from '../logger'
import {
    createErrorMonitor
} from './logging/errorMonitor'

const {
    USER_SCOPE,
    APPLICATION_SCOPE,
    SERVER_SCOPE
} = DataBindingError.scopes

const {
    DBSMViewer: {
        dsn: appDsn
    },
    UserErrors: {
        dsn: userDsn
    },
    WixData: {
        dsn: serverDsn
    },
    DBSMViewerNext: {
        dsn: appNextDsn
    },
} = SentryProjects

const scopeToDsn = {
    [APPLICATION_SCOPE]: appDsn,
    [USER_SCOPE]: userDsn,
    [SERVER_SCOPE]: serverDsn,
}

// unfortunatly js decorators spec isn't stabilazed yet.
// so welcome debatable workaround
let loggingOnProd = function(Type, log) {
    return event => {
        if (this.mode.dev) {
            // TODO: add cli param for verbose logging i.e. if (verbose) console.log(event)
            if (Type === Error) {
                this.console.error(event)
                if (event.cause) {
                    this.console.error('Caused by:', event.cause)
                }
            }

            return event.run ? .()
        } else {
            return log(event)
        }
    }
}

export default class Logger {
    constructor({
        fedops,
        bi,
        monitor,
        verbose,
        console,
        global,
        platform
    }) {
        const consoleLogger = console.factory()

        loggingOnProd = loggingOnProd.bind({
            mode: platform.settings.mode,
            console: consoleLogger,
        })

        this._eventToHandler = this._createEventToHandler()
        this._fedOpsLogger = this._createFedopsLogger(fedops)
        this._bi = this._createBiLoggers({
            bi,
            settings: platform.settings
        })
        this._monitor = createErrorMonitor({
            createErrorMonitor: monitor.createErrorMonitor,
            dsn: appNextDsn,
            platform,
        })
        this._legacyMonitor = this._setupLegacyMonitor({
            monitor,
            global,
            platform,
        })
        this._verboseLogger = verbose.factory()
        this._console = consoleLogger
        this._errorMonitorTags = {
            msid: platform.settings.metaSiteId,
            url: (platform.location.pageUrl || '').slice(0, 200),
            viewMode: platform.settings.mode.name,
            renderMode: platform.settings.env.name,
        }
    }

    log(...events) {
        if (events.length > 1) {
            return events.map(event => this.log(event))
        }

        const [event] = events
        const [, handle] =
        Array.from(this._eventToHandler).find(([Type]) =>
            Type.prototype.isPrototypeOf(event),
        ) || []

        return handle ?
            handle(event) :
            this._console.error(
                `Oj-vej! This event is not supported by logger`,
                event,
            )
    }

    _createEventToHandler() {
        return new Map([
            [
                Error,
                loggingOnProd(Error, error => {
                    if (error instanceof UnhandledPromiseRejection) {
                        this._console.warn(
                            'You have unhandled error in async operation. Consider catching it and handling accordingly.\n',
                            error.cause,
                        )
                    } else {
                        const {
                            scope,
                            cause,
                            options: {
                                extra,
                                ...restOptions
                            } = {},
                        } = error

                        if (error instanceof UserError) {
                            this._console.error(error)
                            if (cause) {
                                this._console.error('Caused by:', cause)
                            }
                        } else {
                            const hasCause = cause instanceof Error
                            this._monitor.captureException(hasCause ? cause : error, {
                                tags: {
                                    ...restOptions,
                                    ...this._errorMonitorTags,
                                    wrapperErrorMessage: hasCause ?
                                        `${error.name}: ${error.message}\n${error.stack}`.slice(
                                            0,
                                            200,
                                        ) :
                                        undefined,
                                },
                                contexts: {
                                    ...extra,
                                    wrapperError: hasCause ? error : undefined,
                                },
                            })
                        }

                        // now under the hood of our monitor Raven with older version of sentry is used
                        // new Sentry version should support "cause" from the box, so no need to add it to extras.
                        this._legacyMonitor[scope].captureException(error, {
                            zone: scope,
                            extra: {
                                cause,
                                ...extra
                            },
                            ...restOptions,
                        })
                    }
                }),
            ],
            [
                Bi,
                loggingOnProd(Bi, ({
                        event,
                        type
                    }) =>
                    type === Bi.types.ERROR ?
                    this._bi.errorLogger.log(event) :
                    this._bi.logger.log(event),
                ),
            ],
            [
                Trace,
                loggingOnProd(Trace, ({
                    name,
                    params,
                    run,
                    onStart,
                    onEnd
                }) => {
                    onStart(() => this._fedOpsLogger.interactionStarted(name, params))
                    onEnd(() => this._fedOpsLogger.interactionEnded(name, params))

                    return run()
                }),
            ],
            [
                Breadcrumb,
                loggingOnProd(Breadcrumb, ({
                    event
                }) => {
                    this._legacyMonitor[APPLICATION_SCOPE].captureBreadcrumb(event)
                    this._monitor.addBreadcrumb(event)
                }),
            ],
            [VerboseMessage, ({
                messages
            }) => this._verboseLogger.log(...messages)],
            [ConsoleEvent, ({
                message,
                level
            }) => this._console[level](message)],
        ])
    }

    _createFedopsLogger({
        factory,
        hooks: {
            start,
            end
        }
    }) {
        return factory.getLoggerForWidget({
            appId: 'databinding',
            appName: 'databinding',
            startHook: start,
            endHook: end,
            // widgetId: 'dataset',
        })
    }

    _createBiLoggers({
        bi: {
            factory
        },
        settings: {
            env
        }
    }) {
        return {
            logger: factory().logger({
                endpoint: env.editor ?
                    BI_VIEWER_ENDPOIINT_PREVIEW :
                    BI_VIEWER_ENDPOINT_LIVE,
            }),
            errorLogger: factory().logger({
                endpoint: BI_ERROR_ENDPOINT,
            }),
        }
    }

    _setupLegacyMonitor({
        monitor: {
            factory
        },
        global,
        platform
    }) {
        const {
            metaSiteId,
            userId
        } = platform.settings
        return Object.entries(scopeToDsn).reduce((acc, [scope, dsn]) => {
            const monitor = factory(dsn)
            acc[scope] = monitor
            configureForViewerWorker({
                dsn,
                Raven: monitor,
                globalScope: global,
                appName: APP_NAME,
                user: {
                    id: userId
                },
                params: {
                    tags: {
                        msid: metaSiteId
                    }
                },
            })

            return acc
        }, {})
    }
}