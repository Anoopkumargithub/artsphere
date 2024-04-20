import {
    get,
    isPlainObject,
    flow,
    map,
    pickBy,
    uniq,
    mergeWith,
    has,
} from 'lodash'
import {
    FieldType
} from '@wix/wix-data-schema-types'
import {
    getFieldParts
} from '@wix/wix-data-client-common/dist/esm/business-logic/fields/fieldSelectors'

const isReferenceValue = value => isPlainObject(value) && has(value, '_id')

export const mergeReferences = (firstValue, secondValue) => {
    const preserveIncludedReferenceValue =
        firstValue !== secondValue &&
        isReferenceValue(firstValue) &&
        !isReferenceValue(secondValue)
    return preserveIncludedReferenceValue ? firstValue : secondValue
}

const addRecordsToCollection = (records, collection = {}) => {
    for (const record of records) {
        const existingRecord = collection[record._id]
        collection[record._id] = mergeWith(existingRecord, record, mergeReferences)
    }
    return collection
}

export const convertDataToDataBindingContract = ({
    items,
    datasetSize,
    collectionId,
}) => ({
    recordInfosInDatasetOrder: [{
        itemIds: items.map(({
            _id
        }) => _id),
        datasetSize,
        collectionId,
    }, ],
    recordsByCollectionId: {
        [collectionId]: addRecordsToCollection(items, {})
    },
})

export const aggregateData = (datasetConfigs, datasetsData) => {
    return datasetsData.reduce(
        (
            response, {
                items,
                nextCursor,
                totalCount,
                uniqueFieldValues,
                error
            },
            index,
        ) => {
            if (error) {
                response.recordInfosInDatasetOrder.push({
                    error
                })
                return response
            }
            response.recordInfosInDatasetOrder.push({
                itemIds: items.map(({
                    _id
                }) => _id),
                totalCount,
                nextCursor,
            })
            const collectionId = datasetConfigs[index].collectionId
            const collection = response.recordsByCollectionId[collectionId]

            response.recordsByCollectionId[collectionId] = addRecordsToCollection(
                items,
                collection,
            )

            response.uniqueFieldValuesByCollection[collectionId] = {
                ...response.uniqueFieldValuesByCollection[collectionId],
                ...uniqueFieldValues,
            }

            return response
        }, {
            recordInfosInDatasetOrder: [],
            recordsByCollectionId: {},
            uniqueFieldValuesByCollection: {},
        },
    )
}

const getFieldType = (schema, fieldParts) => {
    const fieldTypePath = fieldParts
        .flatMap(namePart => ['fields', namePart])
        .concat('type')

    return get(schema, fieldTypePath)
}

const firstFieldPartIsReference = (schema, fieldParts) =>
    fieldParts.length >= 2 &&
    getFieldType(schema, [fieldParts[0]]) === FieldType.reference

export const getFieldTypeCreator = (schema, relatedSchemas) => fieldName => {
    const fieldParts = getFieldParts(fieldName)
    if (firstFieldPartIsReference(schema, fieldParts)) {
        const [referenceFieldName, ...referencedFieldParts] = fieldParts
        const referencedCollectionName =
            schema && schema.fields[referenceFieldName] ?
            schema.fields[referenceFieldName].referencedCollection :
            null
        const referencedSchema =
            relatedSchemas && referencedCollectionName ?
            relatedSchemas[referencedCollectionName] :
            null

        return getFieldType(referencedSchema, referencedFieldParts)
    }
    return getFieldType(schema, fieldParts)
}

export const getReferencedCollectionIds = schema => {
    return schema ?
        flow(
            fields =>
            pickBy(fields, ({
                    referencedCollection
                }) =>
                Boolean(referencedCollection),
            ),
            references =>
            map(references, ({
                referencedCollection
            }) => referencedCollection),
            uniq,
            uniqueCollectionIds => uniqueCollectionIds.filter(Boolean),
        )(schema.fields) :
        []
}

export const getFieldReferencedCollection = (fieldName, schema) =>
    schema != null && schema.fields[fieldName] != null ?
    schema.fields[fieldName].referencedCollection :
    null

export const getSchemaDisplayField = schema =>
    schema != null ? schema.displayField : null

export const getSchemaMaxPageSize = schema =>
    schema != null ? schema.maxPageSize : undefined