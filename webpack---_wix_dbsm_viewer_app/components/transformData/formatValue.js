import {
    FORMAT_TYPES
} from '@wix/wix-data-client-common'
import {
    FieldType
} from '@wix/wix-data-schema-types'
import {
    isDateValid
} from './dateTimeUtils'

const getDateObject = (value, fieldType) => {
    switch (fieldType) {
        case FieldType.date:
            return new Date(value)
        case FieldType.time:
            return new Date(`1970-01-01T${value}`)
        default:
            return value
    }
}

const formatByType = ({
    value,
    formatter,
    fieldType,
    format
}) => {
    switch (format.type) {
        case FORMAT_TYPES.DATETIME:
            {
                const isDateField = fieldType === FieldType.date
                const date = getDateObject(value, fieldType)

                if (!isDateValid(date)) {
                    return value
                }

                if (!formatter) {
                    return isDateField && typeof value === 'string' ? value : ''
                }

                return formatter.formatDateTime(date, format.params.dateFormat, {
                    timeZone: isDateField ? 'UTC' : undefined,
                })
            }
        default:
            return value
    }
}

export default ({
    value,
    formatter,
    fieldType,
    format
}) => {
    if (format) {
        return formatByType({
            value,
            formatter,
            fieldType,
            format
        })
    }

    return value
}