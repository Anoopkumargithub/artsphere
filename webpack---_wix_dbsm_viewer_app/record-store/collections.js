import {
    flow,
    isPlainObject,
    curry,
    cloneDeep,
    set
} from 'lodash'
import QueryResults from '../helpers/queryResults'
import {
    assign,
    bind
} from './utils'
import {
    cleanseRecord,
    createDraft,
    getRecordId,
    markRecordDirty,
    mergeRecord,
} from './records'

const freshCollection = () => ({
    records: {},
    drafts: {},
    scopes: {},
})

const insertToObjectMap = (accessor, idFn, items) => object =>
    Object.assign({},
        accessor(object),
        ...items.map(item => ({
            [idFn(item)]: item
        })),
    )

const updateInObjectMap = (accessor, id, updateFn) => object => ({
    ...accessor(object),
    [id]: updateFn(accessor(object)[id]),
})

const removeFromObjectMap = (accessor, id) => object =>
    Object.assign({},
        ...Object.keys(accessor(object))
        .filter(mapId => mapId !== id)
        .map(mapId => ({
            [mapId]: accessor(object)[mapId]
        })),
    )

const setCollectionRecords = records => assign({
    records
})

const setDrafts = drafts => assign({
    drafts
})

const setScope = curry((key, scope, collection) =>
    assign({
        scopes: {
            ...collection.scopes,
            [key]: scope,
        },
    })(collection),
)

const getScope = scopeKey => collection => collection.scopes[scopeKey]

const iterateScopes = (iterateFn, predicate, collection) =>
    Object.keys(collection.scopes)
    .filter(key => predicate(collection.scopes[key], key))
    .map(key => iterateFn(collection.scopes[key], key))

const insertRecords = records =>
    bind(
        insertToObjectMap(({
            records
        }) => records, getRecordId, records),
        setCollectionRecords,
    )

const insertRecord = record => insertRecords([record])

const insertDrafts = drafts =>
    bind(
        insertToObjectMap(({
            drafts
        }) => drafts, getRecordId, drafts),
        setDrafts,
    )

const insertDraft = draft => insertDrafts([draft])

const removeRecord = recordId =>
    bind(
        removeFromObjectMap(({
            records
        }) => records, recordId),
        setCollectionRecords,
    )

const removeDraft = draft =>
    bind(
        removeFromObjectMap(({
            drafts
        }) => drafts, getRecordId(draft)),
        setDrafts,
    )

const resetDraft = (draft, defaultDraft) =>
    bind(
        updateInObjectMap(
            ({
                drafts
            }) => drafts,
            getRecordId(draft),
            d => createDraft(defaultDraft, d._id),
        ),
        setDrafts,
    )

const clearDrafts = () => setDrafts({})

const updateScope = (scopeKey, updateFn) =>
    bind(flow(getScope(scopeKey), updateFn), setScope(scopeKey))

const storeQueryResults = queryResult =>
    queryResult.matchWith({
        Empty: () => _ => _,
        Results: ({
            items
        }) => (items.length > 0 ? insertRecords(items) : _ => _),
    })

const getRecordWithUpdatedFields = fieldValues => draft =>
    Object.entries(fieldValues).reduce(
        (updatedRecord, [fieldPath, fieldValue]) =>
        set(updatedRecord, fieldPath, fieldValue),
        cloneDeep(draft),
    )

const updateRecordFields = (recordId, fieldValues) =>
    bind(
        updateInObjectMap(
            ({
                drafts
            }) => drafts,
            recordId,
            flow(markRecordDirty, getRecordWithUpdatedFields(fieldValues)),
        ),
        setDrafts,
    )

const doesRecordExist = (id, collection) => !!collection.records[id]

const getDraftOrRecord = (id, collection, includes, nestedFieldKeys) => {
    const record = collection.records[id]
    const draft = collection.drafts[id]
    const recordExists = isPlainObject(record)
    const draftExists = isPlainObject(draft)
    if (recordExists && draftExists) {
        return mergeRecord({
            record,
            draft,
            includes,
            nestedFieldKeys
        })
    }
    if (recordExists) {
        return { ...record
        }
    }
    if (draftExists) {
        return { ...draft
        }
    }
    return null
}

const readFromCollection = (
    scopeKey,
    fromIndex,
    toIndex,
    includes,
    nestedFieldKeys,
    collection,
    allowIncompleteResponse = false,
) => {
    const {
        records,
        datasetSize
    } = getScope(scopeKey)(collection)
    const numRequestedRecords = toIndex - fromIndex
    const requestedRecordsSlice = records.slice(fromIndex, toIndex)
    const matchingRecords = requestedRecordsSlice.reduce((acc, id) => {
        const record = getDraftOrRecord(id, collection, includes, nestedFieldKeys)
        return record != null ? acc.concat(cleanseRecord(record)) : acc
    }, [])

    return QueryResults.of({
        items: matchingRecords,
        datasetSize,
        offset: fromIndex,
    }).filter(hasRequestedMatchingItems)

    function hasRequestedMatchingItems({
        items
    }) {
        return allowIncompleteResponse || items.length >= numRequestedRecords
    }
}

const curriedIterateScopes = curry(iterateScopes)
const curriedReadFromCollection = curry(readFromCollection)
const curriedUpdateScope = curry(updateScope)

export {
    clearDrafts,
    doesRecordExist,
    freshCollection,
    getDraftOrRecord,
    getScope,
    insertDraft,
    insertRecord,
    removeDraft,
    removeRecord,
    resetDraft,
    setScope,
    storeQueryResults,
    updateRecordFields,
    curriedIterateScopes as iterateScopes,
    curriedReadFromCollection as readFromCollection,
    curriedUpdateScope as updateScope,
}