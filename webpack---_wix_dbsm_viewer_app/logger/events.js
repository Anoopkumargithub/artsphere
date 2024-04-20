import {
    isString,
    isNumber
} from 'lodash'
import {
    promiseOrSyncThenable
} from '../helpers'
import {
    BI_SOURCE,
    getAppUrl,
    getAppNameWithVersion,
} from '@wix/wix-data-client-common-standalone'
import {
    APP_NAME,
    APP_DEF_ID
} from '../helpers/constants'
import {
    ERROR
} from '@wix/wix-data-client-common/dist/esm/bi/biErrorCodes'

export class Bi {
    static types = {
        EVENT: 'event',
        ERROR: 'error'
    }

    constructor({
        collectionId,
        collectionName,
        componentType,
        datasetId,
        datasetMode,
        datasetType,
        fieldType,
        filteredBy,
        id,
        numberOfResults,
        pageId,
        pageUrl,
        viewMode,
    }) {
        this.type = Bi.types.EVENT
        this.event = {
            pageId,
            src: BI_SOURCE,
            ver: getAppNameWithVersion(getAppUrl(APP_NAME)),
            app_name: APP_NAME,
            app_id: APP_DEF_ID,
            evid: id,
            ds_id: datasetId,
            ds_type: datasetType,
            mode: datasetMode,
            collection_name: collectionName,
            collection_id: collectionId,
            component_type: componentType,
            filtered_by: filteredBy,
            field_type: fieldType,
            number_of_results: numberOfResults,
            viewmode: viewMode,
            page_url: pageUrl,
        }
    }
}

const extractErrorCode = code => {
    if (isString(code)) {
        const digits = code.replace(/\D/g, '')
        const numericCode = parseInt(digits)
        if (Number.isNaN(numericCode)) {
            return ERROR
        }
    }
    if (isNumber(code)) {
        return Number.isNaN(code) ? ERROR : code
    }
    return ERROR
}

export class BiError extends Bi {
    constructor({
        message,
        code
    }) {
        super({})
        this.type = Bi.types.ERROR
        const errc = extractErrorCode(code)
        this.event = {
            evid: 10,
            src: BI_SOURCE,
            dsc: message,
            errn: message,
            errc,
        }
    }
}

export class Trace {
    static types = {
        START: 'START',
        END: 'END',
        TRACE: 'TRACE',
    }

    constructor(name, smth, params) {
        const {
            type,
            fn
        } =
        smth instanceof Function
            ?
            {
                type: Trace.types.TRACE,
                fn: smth
            } :
            {
                type: smth
            }

        this.name = name
        this.params = params
        this.run = () => this._handlerByType[type](fn)

        this.onStart = cb => (this._start = cb)
        this.onEnd = cb => (this._end = cb)

        this._start = () => {}
        this._end = () => {}

        this._handlerByType = {
            [Trace.types.TRACE]: fn => {
                this._start()

                return promiseOrSyncThenable(fn()).then(res => {
                    this._end()

                    return res
                })
            },
            [Trace.types.START]: () => this._start(),
            [Trace.types.END]: () => this._end(),
        }
    }
}

export class Breadcrumb {
    static with({
        category: presetCategory,
        message: presetMessage,
        level: presetLevel,
        data: presetData,
    }) {
        return class extends this {
            constructor({
                category = presetCategory,
                message = presetMessage,
                level = presetLevel,
                data,
            }) {
                super({
                    category,
                    message,
                    level,
                    data: data || presetData ? { ...data,
                        ...presetData
                    } : undefined,
                })
            }
        }
    }

    constructor({
        category,
        message,
        level = 'info',
        data
    }) {
        this.event = {
            category,
            message,
            level,
            data
        }
    }
}

export class VerboseMessage {
    static types = {
        DS_API: {
            CALLED: 'DS_API_CALLED',
            SUCCED: 'DS_API_SUCCED',
            DEPRECATED: 'DS_API_DEPRECATED',
            REGISTERED: 'DS_API_REGISTERED',
            TRIGGERED: 'DS_API_TRIGGERED',
        },
    }

    static with(context) {
        return class extends this {
            constructor(type, instanceContext = {}) {
                super(type, { ...context,
                    ...instanceContext
                })
            }
        }
    }

    constructor(type, context) {
        this._builderByType = {
            [VerboseMessage.types.DS_API.CALLED]: ({
                    methodName,
                    args
                }) =>
                args.length === 0 ?
                [`[wix-dataset.${methodName}] called`] :
                [
                    `[wix-dataset.${methodName}] called with (`,
                    JSON.stringify(args),
                    `)`,
                ],
            [VerboseMessage.types.DS_API.SUCCED]: ({
                    methodName,
                    result
                }) =>
                result === undefined ?
                [`[wix-dataset.${methodName}] returned`] :
                [
                    `[wix-dataset.${methodName}] returned with (`,
                    JSON.stringify(result),
                    `)`,
                ],
            [VerboseMessage.types.DS_API.DEPRECATED]: ({
                methodName,
                replacementMethodName,
            }) => {
                const replacementMessage = replacementMethodName ?
                    `; use [wix-dataset.${replacementMethodName}] instead` :
                    ''
                return [
                    `[wix-dataset.${methodName}] is deprecated${replacementMessage}`,
                ]
            },
            [VerboseMessage.types.DS_API.REGISTERED]: ({
                methodName
            }) => [
                `[${methodName} callback registered] on wix-dataset`,
            ],
            [VerboseMessage.types.DS_API.TRIGGERED]: ({
                eventName,
                eventArgs = [],
            }) => {
                if (!eventArgs.length) {
                    return [`[${eventName} event] triggered on wix-dataset`]
                } else {
                    const stringifiedArgs = eventArgs.map(smth =>
                        smth instanceof Error ? smth.toString() : smth,
                    )

                    return [
                        `[${eventName} event] triggered on wix-dataset with (`,
                        JSON.stringify(stringifiedArgs),
                        `)`,
                    ]
                }
            },
        }

        this._context = context
        this.messages = this._builderByType[type](context)
    }

    _getComponentPresentation() {
        const {
            component: {
                nickname,
                parentRepeater
            },
        } = this._context

        return parentRepeater ?
            `#${parentRepeater.nickname}.#${nickname}` :
            `#${nickname}`
    }
}

export class ConsoleEvent {
    constructor(message, level = 'log') {
        this.message = message
        this.level = level
    }
}