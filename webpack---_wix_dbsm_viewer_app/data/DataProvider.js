import {
    Deferred
} from '../helpers'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'
import DataStore from '../data/DataStore'
import {
    getReferencedCollectionIds
} from '../data/utils'
import {
    ServerError,
    ServerValidationError,
    AppError,
    Trace
} from '../logger'
import {
    ROUTER_DATASET
} from '@wix/wix-data-client-common/dist/esm/datasetTypes'
import {
    getSort
} from '@wix/wix-data-client-common-standalone'

export default class DataProvider {
    constructor() {
        const {
            logger,
            dataFetcher
        } = appContext
        this._dataFetcher = dataFetcher
        this._logger = logger
        this._dataStore = new DataStore()
        this._dataFetchingBulk = {}
        this._bulkDataFetching = Promise.resolve()
    }

    createInitialDataRequest(datasetFetchConfigs) {
        this._dataFetchingBulk = datasetFetchConfigs.reduce(
            (acc, {
                id,
                refresh
            }) =>
            refresh || !this._dataStore.hasDataset(id) ?
            { ...acc,
                [id]: new Deferred()
            } :
            acc, {},
        )

        const dataRequestingDatasets = Object.entries(this._dataFetchingBulk).map(
            ([, {
                promise
            }]) => promise,
        )

        this._bulkDataFetching = this._waitForDataFetched(
            dataRequestingDatasets,
        ).then(() => (this._dataFetchingBulk = {}))
    }

    async getInitialData({
        datasetId,
        collectionId,
        cursorPaging,
        filter,
        sort,
        length,
        includes,
        uniqueFieldValues,
    }) {
        if (this._dataFetchingBulk[datasetId]) {
            // TODO: reject and return cache data if we have it
            this._dataFetchingBulk[datasetId].resolve({
                datasetId,
                collectionId,
                cursorPaging,
                filter,
                sort,
                length,
                includes,
                uniqueFieldValues,
            })

            await this._bulkDataFetching
        }

        return (
            this._dataStore.getData({
                datasetId,
                collectionId,
                includes,
            }) ||
            this.getData({
                datasetId,
                collectionId,
                cursorPaging,
                filter,
                sort,
                offset: 0,
                length,
                includes,
                uniqueFieldValues,
            })
        )
    }

    async getSort({
        sort,
        collectionId
    }) {
        return await getSort({
            datasetConfigSort: sort,
            getSchema: async () => {
                await this.waitForSchemasLoaded()
                return this.getSchema(collectionId)
            },
        })
    }

    async getData(datasetConfig) {
        const {
            collectionId,
            cursorPaging,
            offset,
            filter,
            includes,
            length,
            datasetSize,
            uniqueFieldValues: fieldKeys,
        } = datasetConfig

        const shouldFetchUniqueFieldValues = fieldKey =>
            !this.getUniqueFieldValues({
                collectionId,
                fieldKey
            })

        const sort = await this.getSort(datasetConfig)
        const {
            items,
            totalCount,
            nextCursor,
            uniqueFieldValues
        } =
        await this._dataFetcher
            .fetchData({
                collectionId,
                offset,
                filter,
                sort,
                includes,
                cursor: cursorPaging ? datasetSize ? .cursor : undefined,
                length,
                uniqueFieldValues: fieldKeys.filter(k =>
                    shouldFetchUniqueFieldValues(k),
                ),
            })
            .catch(createErrorHandler('Data fetching failed', {
                datasetConfig
            }))

        await this.waitForSchemasLoaded()
        this._dataStore.updateCollectionData({
            collectionId,
            data: {
                items,
                uniqueFieldValues
            },
        })
        return {
            items,
            datasetSize: {
                total: totalCount,
                loaded: (datasetSize ? .loaded || 0) + items.length,
                cursor: nextCursor,
            },
            uniqueFieldValues,
        }
    }

    async remove({
        collectionId,
        recordId
    }) {
        return this._dataFetcher
            .remove({
                collectionId,
                recordId,
            })
            .catch(
                createErrorHandler('Record removing failed', {
                    collectionId,
                    recordId,
                }),
            )
    }

    async save({
        collectionId,
        record,
        includeReferences
    }) {
        return this._dataFetcher
            .save({
                collectionId,
                record,
                includeReferences,
            })
            .catch(
                createErrorHandler('Record saving failed', {
                    collectionId,
                    record,
                    includeReferences,
                }),
            )
    }

    async getSibling(config) {
        return await this._dataFetcher.getSibling(config)
    }

    async loadSchemas(collectionIds) {
        const cachedSchemas = this._dataStore.getSchemas()
        const notCachedCollectionIds = collectionIds.filter(
            collectionId => !cachedSchemas[collectionId],
        )
        this._schemasLoading = notCachedCollectionIds.length ?
            this._dataFetcher.fetchSchemas(notCachedCollectionIds).catch(
                createErrorHandler('Schema fetching failed', {
                    collectionIds: notCachedCollectionIds,
                }),
            ) :
            Promise.resolve({})
        const fetchedSchemas = await this._schemasLoading

        //TODO: removed collection doesn't get its schema
        //TODO: viewer runs us for the first time without routerReturnedData!!

        this._dataStore.updateSchemas({ ...cachedSchemas,
            ...fetchedSchemas
        })
        return this._dataStore.getSchemas()
    }

    async setSchemas(schemas) {
        this._dataStore.updateSchemas(schemas)
    }

    getSchemas() {
        return this._dataStore.getSchemas()
    }

    getRecord({
        collectionId,
        recordId,
        includes
    }) {
        return this._dataStore.getRecord({
            collectionId,
            recordId,
            includes,
        })
    }

    getSchema(collectionId) {
        return this._dataStore.getSchema(collectionId)
    }

    hasSchema(collectionId) {
        return Boolean(this.getSchema(collectionId))
    }

    getReferencedSchemas(collectionId) {
        //TODO: getFieldType can be called by userInput resolver with dataset of removed collection
        // for some unknown reason. should be changed to something like
        // if there is no colleciton to filter by, don't filter at all!
        const schema = this.getSchema(collectionId)
        const schemas = this._dataStore.getSchemas()

        return getReferencedCollectionIds(schema).reduce(
            (acc, collectionId) => ({
                ...acc,
                [collectionId]: schemas[collectionId],
            }), {},
        )
    }

    setCollectionData({
        collectionId,
        data
    }) {
        if (data) {
            this._dataStore.updateCollectionData({
                collectionId,
                data
            })
        }
    }

    setStore(store) {
        if (store) {
            this._dataStore.updateStore(store)
        }
    }

    setStaticStore(store) {
        const {
            recordsByCollectionId,
            recordInfosInDatasetOrder,
            uniqueFieldValuesByCollectionId,
        } = store

        const routerDataset = this._datasetConfigs.find(
            ({
                type
            }) => type === ROUTER_DATASET,
        )
        if (routerDataset) {
            // routerDataset may be missing in case you open lightbox on a dynamic page
            const {
                datasetId: routerDatasetId
            } = routerDataset
            const recordInfosByDatasetId = {
                [routerDatasetId]: recordInfosInDatasetOrder[0],
            }

            this._dataStore.updateStore({
                recordsByCollectionId,
                recordInfosByDatasetId,
                uniqueFieldValuesByCollectionId,
            })
        }
    }

    getStore() {
        return this._dataStore.getStore()
    }

    setUniqueFieldValues({
        collectionId,
        fieldKey,
        data
    }) {
        return this._dataStore.setUniqueFieldValues({
            collectionId,
            fieldKey,
            data,
        })
    }

    getUniqueFieldValues({
        collectionId,
        fieldKey
    }) {
        return this._dataStore.getUniqueFieldValues({
            collectionId,
            fieldKey
        })
    }

    createSimpleFilter(key, value) {
        return this._dataFetcher.createSimpleFilter(key, value)
    }

    setDatasetConfigs(datasetConfigs) {
        this._datasetConfigs = datasetConfigs
    }

    getUserFilterInitialData(datasetId) {
        return this._dataStore.getUserFilterInitialData(datasetId)
    }

    setUserFilterInitialData(datasetId, userFilterInitialData) {
        this._dataStore.setUserFilterInitialData(datasetId, userFilterInitialData)
    }

    async _fetchInitialData(datasetConfigs) {
        try {
            const {
                recordsByCollectionId,
                recordInfosInDatasetOrder,
                uniqueFieldValuesByCollection,
            } = await this._logger.log(
                new Trace('dataset/fetchPrimaryInitialData', async () =>
                    this._dataFetcher.fetchBulkData(
                        await Promise.all(
                            datasetConfigs.map(async datasetConfig => ({
                                ...datasetConfig,
                                sort: await this.getSort(datasetConfig),
                            })),
                        ),
                    ),
                ),
            )

            const recordInfosByDatasetId = recordInfosInDatasetOrder.reduce(
                (acc, {
                    itemIds = [],
                    error,
                    nextCursor,
                    totalCount
                }, index) => {
                    const datasetConfig = datasetConfigs[index]
                    if (error) {
                        this._logger.log(
                            createDataFetcherError(
                                'Initial data fetching failed for one of the datasets', {
                                    cause: error,
                                    extra: {
                                        datasetConfig
                                    },
                                },
                            ),
                        )
                    }

                    acc[datasetConfig.datasetId] = {
                        itemIds,
                        datasetSize: {
                            total: totalCount,
                            loaded: itemIds.length,
                            cursor: nextCursor,
                        },
                    }

                    return acc
                }, {},
            )

            return {
                recordsByCollectionId,
                recordInfosByDatasetId,
                uniqueFieldValuesByCollection,
            }
        } catch (e) {
            throw new AppError('Initial data fetching failed', {
                cause: e,
                extra: {
                    datasetConfigs
                },
            })
        }
    }

    async waitForSchemasLoaded() {
        await this._schemasLoading
    }

    async _waitForDataFetched(dataRequestingDatasets) {
        if (dataRequestingDatasets.length) {
            const datasetConfigs = await Promise.all(dataRequestingDatasets)
            const data = await this._fetchInitialData(datasetConfigs)
            await this.waitForSchemasLoaded()

            this._dataStore.updateStore(data)
        }
    }
}

const createDataFetcherError = (message, {
    cause,
    ...rest
}) => {
    const TheError = ServerValidationError.codes.includes(cause.code) ?
        ServerValidationError :
        ServerError

    return new TheError(message, { ...rest,
        cause,
        code: cause.code
    })
}

const createErrorHandler = (message, extra) => cause => {
    throw createDataFetcherError(message, {
        cause,
        extra
    })
}