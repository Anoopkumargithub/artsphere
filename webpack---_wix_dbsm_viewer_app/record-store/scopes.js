import {
    flow
} from 'lodash'
import {
    Maybe
} from '@wix/wix-data-client-wix-code-adt'
import {
    assign,
    bind
} from './utils'
import {
    getRecordId
} from './records'

const freshScope = () => ({
    records: [],
    numSeedRecords: 0,
    newRecordMarkers: [],
})

const setScopeRecords = records => assign({
    records
})

const addToDatasetSize = count => scope => ({
    ...scope,
    datasetSize: {
        cursor: scope.datasetSize ? .cursor,
        total: (scope.datasetSize ? .total || 0) + count,
        loaded: (scope.datasetSize ? .loaded || 0) + count,
    },
})

const setDatasetSize =
    ({
        cursor,
        loaded,
        total
    }) =>
    scope => ({
        ...scope,
        datasetSize: {
            cursor,
            loaded: loaded + newRecordMarkersOffset(scope),
            total: total + newRecordMarkersOffset(scope),
        },
    })

const setNumSeedRecords = scope => ({
    ...scope,
    numSeedRecords: scope.records.length,
})

const setSeedInScope = seed =>
    seed.matchWith({
        Empty: () => setDatasetSize({
            total: 0,
            loaded: 0
        }),
        Results: ({
                items,
                datasetSize
            }) =>
            flow(
                setScopeRecords(items.map(item => getRecordId(item))),
                setDatasetSize(datasetSize),
                setNumSeedRecords,
            ),
    })

const setNewRecordMarkers = newRecordMarkers => assign({
    newRecordMarkers
})

const updateNewRecordMarkers = fn => scope => ({
    ...scope,
    newRecordMarkers: fn(scope.newRecordMarkers),
})

const newRecordMarkersOffset = (scope, index) =>
    scope.newRecordMarkers.filter(marker => index == null || marker <= index)
    .length

const storeResultsInScope = queryResult =>
    queryResult.matchWith({
        Empty: () => setDatasetSize({
            total: 0,
            loaded: 0
        }),
        Results: ({
                items,
                datasetSize,
                offset
            }) =>
            flow(
                setDatasetSize(datasetSize),
                items.length > 0 ? mergeRecords(offset, items) : _ => _,
            ),
    })

const mergeRecords = (
    startIndex,
    addedRecords, {
        overwrite = true,
        fixIndex = true
    } = {},
) => {
    const doMerge = scope => {
        const correctedStartIndex =
            startIndex + (fixIndex ? newRecordMarkersOffset(scope, startIndex) : 0)
        const padLength = Math.max(0, correctedStartIndex - scope.records.length)
        const tailIndex =
            correctedStartIndex + (overwrite ? addedRecords.length : 0)

        return scope.records
            .slice(0, correctedStartIndex)
            .concat(new Array(padLength))
            .concat(addedRecords.map(record => getRecordId(record)))
            .concat(scope.records.slice(tailIndex))
    }

    return bind(doMerge, setScopeRecords)
}

const overwriteRecordAtIndex = (at, record) =>
    mergeRecords(at, [record], {
        fixIndex: false
    })

const insertRecordAtIndex = (at, record) =>
    mergeRecords(at, [record], {
        overwrite: false,
        fixIndex: false
    })

const removeRecordById = id =>
    bind(
        scope => scope.records.filter(recordId => recordId !== id),
        setScopeRecords,
    )

const recordIndexById = (id, scope) => scope.records.indexOf(id)

const scopeHasRecord = id => scope => scope.records.includes(id)

const findLastIndex = (predicate, records) => {
    if (records.length > 0) {
        for (let i = records.length - 1; i >= 0; i = i - 1) {
            if (predicate(records[i])) {
                return i
            }
        }
    }

    return -1
}

const calculateMissingRange = (scope, from, to) => {
    const requestedRange = scope.records.slice(from, to)

    const firstMissingIndexIfAny = requestedRange.findIndex(isExistingRecord)
    const lastMissingIndexIfAny = findLastIndex(isExistingRecord, requestedRange)

    const firstMissingIndex = getMissingIndex(firstMissingIndexIfAny, from)
    const lastMissingIndex = getMissingIndex(lastMissingIndexIfAny, to)

    const indexCorrection = newRecordMarkersOffset(scope, firstMissingIndex)
    const correctedFirstMissingIndex = firstMissingIndex - indexCorrection
    const correctedLastMissingIndex = lastMissingIndex - indexCorrection
    const numMissingRecords =
        correctedLastMissingIndex - correctedFirstMissingIndex

    return numMissingRecords === 0 ?
        Maybe.Nothing() :
        Maybe.Just({
            offset: correctedFirstMissingIndex,
            length: numMissingRecords,
        })

    function isExistingRecord(record) {
        return typeof record !== 'string'
    }

    function getMissingIndex(missingIndexIfAny, requestedIndex) {
        return missingIndexIfAny === -1 ?
            Math.max(scope.records.length, requestedIndex) :
            firstMissingIndexIfAny + requestedIndex
    }
}

export {
    calculateMissingRange,
    freshScope,
    insertRecordAtIndex,
    newRecordMarkersOffset,
    overwriteRecordAtIndex,
    recordIndexById,
    removeRecordById,
    scopeHasRecord,
    setNewRecordMarkers,
    setSeedInScope,
    storeResultsInScope,
    updateNewRecordMarkers,
    addToDatasetSize,
}