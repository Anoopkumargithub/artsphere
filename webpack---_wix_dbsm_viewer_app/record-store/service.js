import {
    memoize,
    flow,
    times,
    flatten,
    isEmpty,
    isEqual,
    isPlainObject,
    some,
    every,
    cloneDeep,
} from 'lodash'
import {
    Maybe,
    Result
} from '@wix/wix-data-client-wix-code-adt'
import {
    Breadcrumb
} from '../logger'
import sequence from '@wix/wix-data-client-dbsm-common/src/fp/sequence'
import * as readWriteModes from '@wix/wix-data-client-common-standalone'
import {
    PagingMode,
    DefaultMaxPageSize
} from '@wix/wix-data-schema-types'
import {
    getPagingMode
} from '@wix/wix-data-client-common'
import QueryResults from '../helpers/queryResults'
import {
    cleanseRecord,
    createDraft,
    getRecordId,
    hasDraft,
    isRecordPristine,
} from './records'
import {
    calculateMissingRange,
    freshScope,
    insertRecordAtIndex,
    overwriteRecordAtIndex,
    recordIndexById,
    removeRecordById,
    scopeHasRecord,
    setNewRecordMarkers,
    setSeedInScope,
    storeResultsInScope,
    updateNewRecordMarkers,
    addToDatasetSize,
} from './scopes'
import {
    clearDrafts,
    doesRecordExist,
    freshCollection,
    getDraftOrRecord,
    getScope,
    insertDraft,
    insertRecord,
    iterateScopes,
    readFromCollection,
    removeDraft,
    removeRecord,
    resetDraft,
    setScope,
    storeQueryResults,
    updateRecordFields,
    updateScope,
} from './collections'
import {
    freshStore,
    getCollection,
    setCollection,
    updateCollection,
} from './store'
import {
    calculateUpperBound,
    isDatasetEmpty
} from '../helpers/paginationUtils'
import {
    registrar,
    memoize as memoizeWithCacheKey
} from './utils'
import {
    getSchemaMaxPageSize
} from '../data/utils'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'

const modeIsWriteOnly = readWriteType => readWriteType === readWriteModes.WRITE

const resolveCacheKey = ([{
    datasetId
}]) => datasetId
/* areFiltersEqual - this check was used because of performance (10x faster than a simplest deep equality function,
100x time faster (for first call) than lodash isEqual). In common cases filters objects will keep the same order of
properties. In worse case when filters are the same but an order of properties differs, filters will be identified like
different and cache result will not be used */
const areFiltersEqual = (filter, anotherFilter) =>
    JSON.stringify(filter) === JSON.stringify(anotherFilter)
const shouldUseCachedResult = ([currentArg], [cachedArg]) =>
    every(currentArg, (arg, propertyName) =>
        propertyName === 'filter' ?
        areFiltersEqual(arg, cachedArg[propertyName]) :
        arg === cachedArg[propertyName],
    )

const serviceCreator = ({
    primaryDatasetId,
    recordStoreCache,
    refreshStoreCache,
    dataProvider,
    mainCollectionName,
    includes,
    nestedFieldKeys,
    uniqueFieldValues,
    readWriteType,
    cursorPagingRequired,
}) => {
    const {
        breadcrumbReporting
    } = appContext
    const getStore = () => recordStoreCache[primaryDatasetId]
    const setStore = newStore => {
        recordStoreCache[primaryDatasetId] = newStore
    }

    if (
        isEmpty(getStore()) ||
        refreshStoreCache ||
        modeIsWriteOnly(readWriteType)
    ) {
        setStore(freshStore(mainCollectionName))
    }

    const onChangeHandlers = []

    const service = memoizeWithCacheKey(
        ({
            pageSize,
            sort,
            filter,
            datasetId,
            referencedCollectionName,
            fixedRecordId,
        }) => {
            const collectionName =
                referencedCollectionName != null ?
                referencedCollectionName :
                mainCollectionName

            const scopeKey = JSON.stringify({
                filter,
                sort
            })
            const getCurrentCollection = getCollection(collectionName)
            const updateCurrentCollection = updateCollection(collectionName)
            const getCurrentScope = flow(getCurrentCollection, getScope(scopeKey))
            const updateCurrentScope = updateScope(scopeKey)
            const getCurrentCollectionSchema = () =>
                dataProvider.getSchema(collectionName)

            const pageAlignedFromIndex = from => from - (from % pageSize)

            const pageAlignedToIndex = (from, to) =>
                Math.ceil(
                    (pageAlignedFromIndex(from) + (to - pageAlignedFromIndex(from))) /
                    pageSize,
                ) * pageSize

            const findRecords = memoize(
                ({
                    offset,
                    length,
                    datasetSize
                }) =>
                dataProvider
                .getData({
                    datasetId,
                    length,
                    collectionId: collectionName,
                    cursorPaging: api.isCursorPaging(),
                    offset,
                    filter,
                    sort,
                    includes: referencedCollectionName != null ? undefined : includes,
                    uniqueFieldValues,
                    datasetSize,
                })
                .then(result => ({
                    items: result.items,
                    datasetSize: result.datasetSize,
                    offset,
                })),
                ({
                    offset,
                    length,
                    datasetSize
                }) => [offset, length, datasetSize ? .cursor].join('-'),
            )

            const fetchSequentially = async ranges => {
                const results = []
                let {
                    datasetSize
                } = getCurrentScope(getStore())

                for (const {
                        offset,
                        length
                    } of ranges) {
                    const result = await findRecords({
                        offset,
                        length,
                        datasetSize,
                    })

                    results.push(result)

                    datasetSize = result.datasetSize

                    if (!datasetSize.cursor) {
                        break
                    }
                }

                return results
            }

            const fetchRecordRanges = ranges =>
                api.isCursorPaging() ?
                fetchSequentially(ranges) :
                Promise.all(
                    ranges.map(({
                            offset,
                            length
                        }) =>
                        findRecords({
                            offset,
                            length
                        }),
                    ),
                )

            const fetchMissingRange = (scope, fromIndex, toIndex) => {
                const fetchFrom = api.isCursorPaging() ?
                    0 :
                    pageAlignedFromIndex(fromIndex)
                const fetchTo = pageAlignedToIndex(fromIndex, toIndex)

                const limit =
                    getSchemaMaxPageSize(getCurrentCollectionSchema()) ||
                    DefaultMaxPageSize[api.getPaging()]

                const missingRange = calculateMissingRange(scope, fetchFrom, fetchTo)
                const correctedRange = missingRange.map(({
                        offset,
                        length
                    }) =>
                    length <= limit ?
                    [{
                        offset,
                        length
                    }] :
                    flatten(
                        times(Math.ceil(length / limit), x => [{
                            offset: offset + x * limit,
                            length: Math.min(limit, length - x * limit),
                        }, ]),
                    ),
                )

                const ranges = correctedRange.getOrElse([])

                return fetchRecordRanges(ranges)
            }

            const notify = (before, after, componentIdToExclude) =>
                sequence(
                    Result,
                    onChangeHandlers.map(handler =>
                        Result.try(() =>
                            handler(
                                before != null ? cleanseRecord(before) : null,
                                after != null ? cleanseRecord(after) : null,
                                componentIdToExclude,
                            ),
                        ),
                    ),
                )

            // runApiCommand
            //   :: (([Store -> Store] -> (), Record, Integer, [*]) -> *, () -> *, Integer, [*]) -> *
            const runApiCommand = (f, g, index, ...args) => {
                const recordId = getCurrentScope(getStore()).records[index]
                const record = getDraftOrRecord(
                    recordId,
                    getCurrentCollection(getStore()),
                    includes,
                    nestedFieldKeys,
                )

                if (record == null) {
                    return g()
                } else {
                    const update = (...handlers) => {
                        setStore(flow(...handlers)(getStore()))
                    }

                    const notifyIfChanged = componentIdToExclude => {
                        const updatedRecord = getDraftOrRecord(
                            recordId,
                            getCurrentCollection(getStore()),
                            includes,
                            nestedFieldKeys,
                        )
                        if (!isEqual(record, updatedRecord)) {
                            return notify(record, updatedRecord, componentIdToExclude)
                        } else {
                            return Result.Ok([])
                        }
                    }

                    return f({
                        update,
                        notifyIfChanged
                    }, record, index, ...args)
                }
            }

            // withRecordByIndex
            //   :: (([Store -> Store] -> (), Record, Integer, [*]) -> *, () -> *) -> (Integer, [*]) -> *
            const withRecordByIndex =
                (f, g) =>
                (index, ...args) => {
                    return runApiCommand(f, g, index, ...args)
                }

            // withRecordByIndexAsync
            //   :: (([Store -> Store] -> (), Record, Integer, [*]) -> *, () -> *) -> (Integer, [*]) -> *
            const withRecordByIndexAsync =
                (f, g) =>
                async (index, ...args) => {
                    return runApiCommand(f, g, index, ...args)
                }

            const breadcrumbReportingFor = (methodName, fn) =>
                breadcrumbReporting(
                    fn,
                    Breadcrumb.with({
                        category: 'recordStore',
                        message: methodName,
                        data: {
                            datasetId,
                            scope: scopeKey
                        },
                    }),
                )

            const isNewRecord = record =>
                record &&
                !doesRecordExist(getRecordId(record), getCurrentCollection(getStore()))

            const api = {
                // getRecords :: (Integer, Integer) -> Promise QueryResults
                getRecords: breadcrumbReportingFor(
                    'getRecords',
                    async (fromIndex, length) => {
                        const {
                            datasetSize
                        } = getCurrentScope(getStore())
                        const toIndex = calculateUpperBound({
                            from: fromIndex,
                            length,
                            datasetSize,
                            cursorPaging: api.isCursorPaging(),
                        })

                        const reader = readFromCollection(
                            scopeKey,
                            fromIndex,
                            toIndex,
                            includes,
                            nestedFieldKeys,
                        )

                        const allowMissingRecords =
                            modeIsWriteOnly(readWriteType) ||
                            !datasetSize ||
                            isDatasetEmpty(datasetSize)

                        return reader(
                            getCurrentCollection(getStore()),
                            allowMissingRecords,
                        ).orElse(async () => {
                            const missingRange = await fetchMissingRange(
                                getCurrentScope(getStore()),
                                fromIndex,
                                toIndex,
                            )
                            const notifyUpdatedRecords = (old, current) =>
                                Object.keys(old.records)
                                .filter(
                                    key =>
                                    isPlainObject(current.records[key]) &&
                                    current.records[key]._updatedDate >
                                    old.records[key]._updatedDate,
                                )
                                .forEach(key =>
                                    notify(old.records[key], current.records[key]),
                                )
                            const go = updateCurrentCollection(
                                flow(
                                    ...missingRange
                                    .map(({
                                            items,
                                            datasetSize,
                                            offset
                                        }) =>
                                        QueryResults.fromWixDataQueryResults({
                                                items,
                                                datasetSize
                                            },
                                            offset,
                                        ),
                                    )
                                    .map(queryResults =>
                                        flow(
                                            storeQueryResults(queryResults),
                                            updateCurrentScope(storeResultsInScope(queryResults)),
                                        ),
                                    ),
                                ),
                            )

                            const oldStore = getStore()
                            setStore(go(getStore()))
                            notifyUpdatedRecords(
                                getCurrentCollection(oldStore),
                                getCurrentCollection(getStore()),
                            )
                            return reader(getCurrentCollection(getStore()), true)
                        })
                    },
                ),

                // eventually should be replaced by getDistinctRecords
                getRecordsLimitedByMaxPageSize: (fromIndex, length) => {
                    const limit = Math.min(
                        length,
                        getSchemaMaxPageSize(getCurrentCollectionSchema()) || length,
                    )

                    return api.getRecords(fromIndex, limit)
                },

                // seed :: () -> Promise ()
                seed: breadcrumbReportingFor('seed', () => {
                    if (getCurrentScope(getStore()).numSeedRecords === 0) {
                        const request = fixedRecordId ?
                            dataProvider.getData({
                                datasetId,
                                length: pageSize,
                                collectionId: collectionName,
                                cursorPaging: undefined,
                                offset: 0,
                                filter,
                                sort,
                                includes: referencedCollectionName != null ? undefined : includes,
                                uniqueFieldValues,
                            }) :
                            dataProvider.getInitialData({
                                datasetId,
                                collectionId: collectionName,
                                filter,
                                sort,
                                includes,
                                length: pageSize,
                                uniqueFieldValues,
                            })

                        return request.then(data => {
                            const queryResult = QueryResults.fromWixDataQueryResults(data, 0)
                            const go = updateCurrentCollection(
                                flow(
                                    storeQueryResults(queryResult),
                                    updateCurrentScope(setSeedInScope(queryResult)),
                                ),
                            )

                            setStore(go(getStore()))
                        })
                    } else {
                        return Promise.resolve()
                    }
                }),

                getTheStore: getStore,

                getPaging: () =>
                    getPagingMode({
                        schema: getCurrentCollectionSchema(),
                        cursorPagingPreferred: cursorPagingRequired,
                    }),

                isCursorPaging: () => api.getPaging() === PagingMode.Cursor,

                // getSeedRecords :: () -> QueryResults
                getSeedRecords: breadcrumbReportingFor('getSeedRecords', () =>
                    readFromCollection(
                        scopeKey,
                        0,
                        getCurrentScope(getStore()).numSeedRecords,
                        includes,
                        nestedFieldKeys,
                        getCurrentCollection(getStore()),
                        true,
                    ),
                ),

                getDatasetSize: breadcrumbReportingFor(
                    'getDatasetSize',
                    () => getCurrentScope(getStore()).datasetSize,
                ),

                // getRecordById :: RecordId -> Maybe Record
                getRecordById: breadcrumbReportingFor('getRecordById', recordId => {
                    return Maybe.fromNullable(
                        getCurrentCollection(getStore()).records[recordId],
                    )
                }),

                // removeRecord :: Integer -> Promise (Result)
                // recordId is a maybe because new records don't have IDs
                removeRecord: breadcrumbReportingFor(
                    'removeRecord',
                    withRecordByIndexAsync(
                        async ({
                            update,
                            notifyIfChanged
                        }, record) => {
                            const recordId = getRecordId(record)
                            if (!isNewRecord(record) && recordId) {
                                await dataProvider.remove({
                                    collectionId: collectionName,
                                    recordId,
                                })
                            }
                            findRecords.cache.clear()
                            const doUpdateMarkers = recordIndex => markers =>
                                markers.filter(marker => marker !== recordIndex)
                            const updateScopesFlow = iterateScopes(
                                (scope, scopeKey) =>
                                updateScope(
                                    scopeKey,
                                    flow(
                                        removeRecordById(recordId),
                                        addToDatasetSize(-1),
                                        updateNewRecordMarkers(
                                            doUpdateMarkers(recordIndexById(recordId, scope)),
                                        ),
                                    ),
                                ),
                                scopeHasRecord(recordId),
                                getCurrentCollection(getStore()),
                            )
                            update(
                                updateCurrentCollection(
                                    flow(
                                        flow(removeDraft(record), removeRecord(recordId)),
                                        ...updateScopesFlow,
                                    ),
                                ),
                            )
                            return notifyIfChanged()
                        },
                        () => {
                            return Promise.resolve(
                                Result.Error('cannot remove record: index not found'),
                            )
                        },
                    ),
                ),

                // reset :: () -> ()
                reset: breadcrumbReportingFor('reset', () => {
                    findRecords.cache.clear()
                    setStore(
                        updateCurrentCollection(
                            flow(setScope(scopeKey, freshScope()), clearDrafts()),
                        )(getStore()),
                    )
                }),

                // newRecord :: (Integer, DefaultDraft) -> ()
                newRecord: breadcrumbReportingFor(
                    'newRecord',
                    (index, defaultDraft) => {
                        // There Can Only Be One new record
                        const draft = createDraft(defaultDraft)
                        const go = updateCurrentCollection(
                            flow(
                                insertDraft(draft),
                                updateCurrentScope(
                                    flow(
                                        addToDatasetSize(1),
                                        setNewRecordMarkers([index]),
                                        insertRecordAtIndex(index, draft),
                                    ),
                                ),
                            ),
                        )

                        setStore(go(getStore()))
                        notify(null, draft)
                        return cleanseRecord(draft)
                    },
                ),

                // save :: Integer -> Promise(Record)
                saveRecord: breadcrumbReportingFor(
                    'saveRecord',
                    withRecordByIndexAsync(
                        async ({
                            update,
                            notifyIfChanged
                        }, record, index) => {
                            const postSaveRecord = await dataProvider.save({
                                collectionId: collectionName,
                                record: cleanseRecord(record),
                                includeReferences: true,
                            })
                            const doUpdateMarkers = markers =>
                                markers.filter(marker => marker !== index)
                            update(
                                updateCurrentCollection(
                                    flow(
                                        insertRecord(postSaveRecord),
                                        removeDraft(record),
                                        updateCurrentScope(
                                            flow(
                                                overwriteRecordAtIndex(index, postSaveRecord),
                                                updateNewRecordMarkers(doUpdateMarkers),
                                            ),
                                        ),
                                    ),
                                ),
                            )
                            notifyIfChanged()

                            return cleanseRecord(postSaveRecord)
                        },
                        () => {
                            return Promise.reject(
                                new Error('cannot save record: index not found'),
                            )
                        },
                    ),
                ),

                // setFieldsValues :: (Integer, FieldsValues) -> Result
                setFieldsValues: breadcrumbReportingFor(
                    'setFieldsValues',
                    withRecordByIndex(
                        ({
                                update,
                                notifyIfChanged
                            },
                            record,
                            _,
                            fieldValues,
                            componentIdToExclude,
                        ) => {
                            if (Object.keys(fieldValues).length) {
                                update(
                                    updateCurrentCollection(
                                        updateRecordFields(getRecordId(record), fieldValues),
                                    ),
                                )
                            }
                            return notifyIfChanged(componentIdToExclude)
                        },
                        () => Result.Error('cannot update field values: index not found'),
                    ),
                ),

                // isPristine :: Integer -> Boolean
                isPristine: breadcrumbReportingFor(
                    'isPristine',
                    withRecordByIndex(
                        (_, record) => isRecordPristine(record),
                        () => true,
                    ),
                ),

                // hasDraft :: Integer -> Boolean
                hasDraft: breadcrumbReportingFor(
                    'hasDraft',
                    withRecordByIndex(
                        (_, record) => hasDraft(record),
                        () => false,
                    ),
                ),

                // isNewRecord :: Integer -> Boolean
                isNewRecord: breadcrumbReportingFor(
                    'isNewRecord',
                    withRecordByIndex(
                        (_, record) => isNewRecord(record),
                        () => true,
                    ),
                ),

                clearDrafts: breadcrumbReportingFor('clearDrafts', () => {
                    setStore(updateCurrentCollection(clearDrafts())(getStore()))
                }),

                // resetDraft :: (Integer, DefaultDraft) -> Result
                resetDraft: breadcrumbReportingFor(
                    'resetDraft',
                    withRecordByIndex(
                        ({
                            update,
                            notifyIfChanged
                        }, record, index, defaultDraft) => {
                            update(
                                updateCurrentCollection(
                                    isNewRecord(record) ?
                                    resetDraft(record, defaultDraft) :
                                    removeDraft(record),
                                ),
                            )
                            return notifyIfChanged()
                        },
                        () => Result.Error('cannot reset draft: index not found'),
                    ),
                ),

                hasSeedData: breadcrumbReportingFor(
                    'hasSeedData',
                    () => getCurrentScope(getStore()).numSeedRecords > 0,
                ),

                getUniqueFieldValues: breadcrumbReportingFor(
                    'getUniqueFieldValues',
                    fieldKey =>
                    dataProvider.getUniqueFieldValues({
                        collectionId: collectionName,
                        fieldKey,
                    }),
                ),
            }

            if (!getCurrentCollection(getStore())) {
                setStore(setCollection(collectionName, freshCollection())(getStore()))
            }

            if (!getCurrentCollection(getStore()).scopes[scopeKey]) {
                const initScope = []

                if (fixedRecordId) {
                    const record =
                        dataProvider.getRecord({
                            // TODO: case for repeater whose data is set via userCode. We should everything only via datasetAPI
                            collectionId: collectionName,
                            recordId: fixedRecordId,
                            includes,
                        }) ||
                        getDraftOrRecord(
                            fixedRecordId,
                            getCurrentCollection(getStore()),
                            includes,
                            nestedFieldKeys,
                        )
                    const items = record ? [record] : []

                    // TODO: refactor, a lot of transformations for consistency with fp record store
                    const seedData =
                        items.length > 0 ?
                        QueryResults.of({
                            items,
                            offset: 0,
                            datasetSize: {
                                loaded: items.length,
                                total: items.length,
                            },
                        }) :
                        QueryResults.Empty()
                    const seed = seedData.matchWith({
                        Empty: Maybe.Nothing,
                        Results: flow(QueryResults.of, Maybe.Just),
                    })

                    if (some(items, isNewRecord)) {
                        initScope.push(storeQueryResults(seedData))
                    }
                    seed.fold(
                        () => {
                            initScope.push(setScope(scopeKey, freshScope()))
                        },
                        seedData => {
                            initScope.push(
                                setScope(scopeKey, setSeedInScope(seedData)(freshScope())),
                            )
                        },
                    )
                } else {
                    initScope.push(setScope(scopeKey, freshScope()))
                }

                setStore(updateCurrentCollection(flow(...initScope))(getStore()))
            }

            api.externalApi = {
                // This is the single place, where all adapters and datasetApi are integrated one way or another with logic of fetching data
                // So this tiny improvements guarantees nobody will influence our data by reference
                getRecords: async (fromIndex, length) =>
                    (await api.getRecords(fromIndex, length)).map(
                        ({
                            items,
                            ...rest
                        }) => ({
                            items: cloneDeep(items),
                            ...rest
                        }),
                    ),
                getSeedRecords: () =>
                    api.getSeedRecords().map(({
                        items,
                        ...rest
                    }) => ({
                        items: cloneDeep(items),
                        ...rest,
                    })),
                getRecordsLimitedByMaxPageSize: async (fromIndex, length) =>
                    (await api.getRecordsLimitedByMaxPageSize(fromIndex, length)).map(
                        ({
                            items,
                            ...rest
                        }) => ({
                            items: cloneDeep(items),
                            ...rest
                        }),
                    ),
            }

            return api
        },
        resolveCacheKey,
        shouldUseCachedResult,
    )

    service.onChange = registrar(onChangeHandlers)

    return service
}

export default serviceCreator