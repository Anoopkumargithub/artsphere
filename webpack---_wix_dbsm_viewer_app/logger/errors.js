export class DataBindingError extends Error {
    static scopes = {
        USER_SCOPE: 'userCodeZone',
        APPLICATION_SCOPE: 'applicationCodeZone',
        SERVER_SCOPE: 'wixDataCodeZone',
    }

    static withMessage(message) {
        return class extends this {
            constructor(...args) {
                super(message, ...args)
            }
        }
    }

    static with({
        message: predefinedMessage,
        options: predefinedOptions
    }) {
        return class extends this {
            constructor(arg) {
                const message = predefinedMessage || (arg instanceof String && arg)
                const options = {
                    ...predefinedOptions,
                    ...(arg instanceof Object ? arg : {}),
                }

                super(message, options)
            }
        }
    }

    constructor(message, options, errorName = 'DataBindingError') {
        super(message, options)
        const {
            cause,
            ...rest
        } = options || {}

        this.name = errorName
        this.options = rest

        if (!this.cause) {
            this.cause = cause
        }
    }

    toString() {
        return this.cause ?
            `${super.toString()}\nCaused by ${this.cause.toString()}` :
            super.toString()
    }
}

export class AppError extends DataBindingError {
    constructor(message, options) {
        super(message, options, 'AppError')

        this.scope = DataBindingError.scopes.APPLICATION_SCOPE
    }
}

export class UserError extends DataBindingError {
    constructor(message, options, errorName = 'UserError') {
        super(message, options, errorName)

        this.scope = DataBindingError.scopes.USER_SCOPE
    }
}

//TODO: Do we really need it?
// It seems like there is no clear distinction between DatasetError and UserError
export class DatasetError extends UserError {
    constructor(message, options) {
        const {
            code,
            ...rest
        } = options
        super(message, rest, 'DatasetError')

        this.code = code
    }
}

export class ServerValidationError extends UserError {
    static codes = [
        'WD_SITE_IN_TEMPLATE_MODE',
        'WD_PERMISSION_DENIED',
        'WD_COLLECTION_DELETED',
        'WD_VALIDATION_FAILED',
    ]

    constructor(message, options) {
        super(message, options, 'ServerValidationError')
    }
}

export class ServerError extends DataBindingError {
    constructor(message, options) {
        const {
            code,
            ...rest
        } = options
        super(message, rest, 'ServerError')

        this.scope = DataBindingError.scopes.SERVER_SCOPE
        this.code = code
    }
}

export class UnhandledPromiseRejection extends DataBindingError {
    constructor(options) {
        super(
            `Async operation error wasn't handled`,
            options,
            'UnhandledPromiseRejection',
        )
    }
}