import {
    FieldType
} from '@wix/wix-data-schema-types'
import {
    isTimeValid,
    isDateValid,
    mergeDateWithTime,
    toDateOnlyISOString,
} from '../components/transformData/dateTimeUtils'
import {
    has,
    set,
    get
} from 'lodash'

const getValueToSet = ({
    value,
    currentValue,
    fieldType
}) => {
    if (fieldType === FieldType.date && isDateValid(value)) {
        return toDateOnlyISOString(value)
    }

    if (isTimeValid(currentValue) && isDateValid(value)) {
        return mergeDateWithTime({
            time: currentValue,
            date: value,
        })
    }

    if (isDateValid(currentValue) && isTimeValid(value)) {
        return mergeDateWithTime({
            time: value,
            date: currentValue,
        })
    }

    return value
}

const mergeValueWithRecord = ({
    value,
    fieldName,
    record,
    getFieldType
}) => {
    const currentValue = get(record, fieldName)
    const fieldType = getFieldType(fieldName).getOrElse(null)
    const valueToSet = getValueToSet({
        value,
        currentValue,
        fieldType
    })
    set(record, fieldName, valueToSet)
}

const generateRecordFromDefaultComponentValues = (components, getFieldType) => {
    const inputComponentsProps = ['value', 'checked'] //todo: export to constant
    return components.reduce((record, component) => {
        const properties = component.connectionConfig ? .properties || {}
        inputComponentsProps.forEach(propName => {
            if (has(properties, propName)) {
                mergeValueWithRecord({
                    value: component.getValue({
                        propPath: propName
                    }),
                    fieldName: properties[propName].fieldName,
                    record,
                    getFieldType,
                })
            }
        })
        return record
    }, {})
}

export default generateRecordFromDefaultComponentValues