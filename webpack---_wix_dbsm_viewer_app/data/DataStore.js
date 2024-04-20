import {
    mergeWith
} from 'lodash'
import {
    mergeReferences
} from './utils'
import {
    FieldType
} from '@wix/wix-data-schema-types'

export default class DataStore {
    constructor() {
        this._recordInfosByDatasetId = {}
        this._recordsByCollectionId = {}
        this._uniqueFieldValuesByCollection = {}
        this._schemas = {}
        this._userFilterInitialData = {}
    }

    getData({
        datasetId,
        collectionId,
        includes
    }) {
        const data = this._recordInfosByDatasetId[datasetId]
        return data ?
            {
                datasetSize: data.datasetSize,
                items: data.itemIds.map(recordId =>
                    hideIrrelevantRefs(
                        this._recordsByCollectionId[collectionId][recordId],
                        this.getSchema(collectionId),
                        includes,
                    ),
                ),
            } :
            null
    }

    getRecord({
        collectionId,
        recordId,
        includes
    }) {
        const record = this._recordsByCollectionId[collectionId] ? .[recordId]
        return (
            record &&
            hideIrrelevantRefs(record, this.getSchema(collectionId), includes)
        )
    }

    updateCollectionData({
        collectionId,
        data
    }) {
        const {
            [collectionId]: records
        } = this._recordsByCollectionId
        const {
            [collectionId]: existingFieldValues
        } =
        this._uniqueFieldValuesByCollection
        const {
            items,
            uniqueFieldValues
        } = data

        /* copy paste from fes */
        this._recordsByCollectionId[collectionId] = mergeItemsToRecords(
            items,
            records,
        )
        this._uniqueFieldValuesByCollection[collectionId] = mergeUniqueFieldValues(
            uniqueFieldValues,
            existingFieldValues,
        )
    }

    getSchema(collectionId) {
        return this._schemas[collectionId]
    }

    updateStore({
        recordsByCollectionId = {},
        recordInfosByDatasetId = {},
        uniqueFieldValuesByCollection = {},
    }) {
        this._recordInfosByDatasetId = {
            ...this._recordInfosByDatasetId,
            ...recordInfosByDatasetId,
        }

        for (const [collectionId, records] of Object.entries(
                recordsByCollectionId,
            )) {
            this._recordsByCollectionId[collectionId] = {
                ...this._recordsByCollectionId[collectionId],
                ...records,
            }
        }

        for (const [collectionId, uniqueFieldValuesByFieldKey] of Object.entries(
                uniqueFieldValuesByCollection,
            )) {
            this._uniqueFieldValuesByCollection[collectionId] = {
                ...this._uniqueFieldValuesByCollection[collectionId],
                ...uniqueFieldValuesByFieldKey,
            }
        }
    }

    getStore() {
        return {
            recordInfosByDatasetId: this._recordInfosByDatasetId,
            recordsByCollectionId: this._recordsByCollectionId,
            uniqueFieldValuesByCollection: this._uniqueFieldValuesByCollection,
        }
    }

    hasDataset(datasetId) {
        return Boolean(this._recordInfosByDatasetId[datasetId])
    }

    setUniqueFieldValues({
        collectionId,
        fieldKey,
        data
    }) {
        this._uniqueFieldValuesByCollection[collectionId] = {
            ...this._uniqueFieldValuesByCollection[collectionId],
            [fieldKey]: data,
        }
    }

    getUniqueFieldValues({
        collectionId,
        fieldKey
    }) {
        return this._uniqueFieldValuesByCollection[collectionId] ? .[fieldKey]
    }

    updateSchemas(schemas) {
        for (const [collectionId, schema] of Object.entries(schemas)) {
            this._schemas[collectionId] = {
                ...this._schemas[collectionId],
                ...schema,
            }
        }
    }

    getSchemas() {
        return this._schemas
    }

    getUserFilterInitialData(datasetId) {
        return this._userFilterInitialData[datasetId]
    }

    setUserFilterInitialData(datasetId, userFilterInitialData) {
        this._userFilterInitialData[datasetId] = userFilterInitialData
    }
}

const isFieldReference = (fieldName, schema) =>
    schema ? .fields ? .[fieldName] ? .type === FieldType.reference //TODO: remove protection when it -> unit tests migration

const isReferenceExcluded = (includes, fieldName) =>
    !includes || !includes.includes(fieldName)

const hideIrrelevantRefs = (record, schema, includes) => {
    return Object.entries(record).reduce((acc, [fieldName, value]) => {
        if (
            isFieldReference(fieldName, schema) &&
            isReferenceExcluded(includes, fieldName) &&
            Boolean(value ? ._id)
        ) {
            acc[fieldName] = value._id
        } else {
            acc[fieldName] = value
        }
        return acc
    }, {})
}

const mergeItemsToRecords = (items, records = {}) =>
    items.reduce((acc, record) => {
        const existingRecord = acc[record._id]
        acc[record._id] = existingRecord ?
            mergeWith(existingRecord, record, mergeReferences) :
            record

        return acc
    }, records)

const mergeUniqueFieldValues = (
    newFieldValues = {},
    existingFieldValues = {},
) => ({
    ...existingFieldValues,
    ...newFieldValues,
})