import {
    forEach,
    pickBy
} from 'lodash'
import {
    generateAutomationsFieldName,
    isFieldSupported,
} from '@wix/wix-code-automations-client'
import convertValueToString from '../../components/transformData/convertValueToString' //TODO: consider using transformFromRecordToView
import {
    getFieldValue
} from '../../../src/components/helpers'

export const createFormEventPayload = ({
    datasetId,
    getSchema,
    record,
    schema,
}) => ({
    eventUTCTime: getFieldValue(record, '_updatedDate'),
    detailedEventPayload: createDetailedEventPayload({
        datasetId,
        record,
        schema,
        getSchema,
    }),
    collectionId: schema.id,
})

const createDetailedEventPayload = ({
    datasetId,
    record,
    schema,
    getSchema,
}) => {
    const payload = {
        'form-id': {
            value: datasetId,
            keyName: '',
        },
    }

    const supportedNotDeletedSchemaFields = pickBy(
        schema.fields,
        (fieldData, fieldName) =>
        isFieldSupported(fieldData, fieldName) && !isFieldDeleted(fieldData),
    )

    forEach(supportedNotDeletedSchemaFields, (fieldData, fieldName) => {
        const valueDescriptor = getFieldValueAndType({
            record,
            fieldData,
            fieldName,
            getSchema,
        })

        if (!valueDescriptor) {
            return
        }

        const {
            value,
            type
        } = valueDescriptor
        const {
            displayName: keyName,
            index
        } = fieldData
        const automationsFieldName = generateAutomationsFieldName(
            datasetId,
            fieldName,
        )

        payload[`field:${automationsFieldName}`] = {
            value,
            keyName,
            index,
            valueType: type,
        }
    })

    return payload
}

function isFieldDeleted(fieldData) {
    return !!fieldData.isDeleted
}

function getFieldValueAndType({
    record,
    fieldData,
    fieldName,
    getSchema
}) {
    if (fieldData.type === 'reference') {
        const schema = getSchema(fieldData.referencedCollection)
        if (!schema) {
            return undefined
        }
        const fieldValue = getFieldValue(record[fieldName], schema.displayField)
        return {
            value: convertValueToString(fieldValue),
            type: schema.fields[schema.displayField].type,
        }
    }

    return {
        value: convertValueToString(getFieldValue(record, fieldName)),
        type: fieldData.type,
    }
}