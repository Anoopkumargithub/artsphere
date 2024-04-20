import {
    setAppContext,
    appContext
} from './DataBindingAppContext'
import {
    isEqual
} from 'lodash'
import {
    ROUTER_DATASET
} from '@wix/wix-data-client-common/dist/esm/datasetTypes'
import DataProvider from '../data/DataProvider'
import {
    convertFromCustomFormat,
    convertToCustomFormat,
} from '@wix/cloud-elementory-protocol'
import {
    PRIMARY
} from '../data/sequenceType'
import completeControllerConfigs from '../dataset-controller/completeControllerConfigs'
import {
    Deferred
} from '../helpers'
import {
    createRecordStoreService
} from '../record-store'
import createControllerFactory from '../dataset-controller/controllerFactory'
import {
    createDependencyManager
} from '../dataset-controller/dependencyManager'
import {
    createSeoManager
} from '../seo/seoManager'
import AppState from './AppState'
import {
    DataBindingLogger,
    Trace,
    Breadcrumb,
    createErrorReporting,
    createBreadcrumbReporting,
    createVerboseReporting,
} from '../logger'

export default class DataBinding {
    constructor({
        platform,
        dataFetcher,
        warmupCache,
        staticCache,
        features,
        listenersByEvent,
        logger,
        i18n,
        global,
        loadExpressionFunctions,
        //TODO: add to warmupCache, and distinguish there which data should be saved to warmup store.
        // for now routerData schemas are also saved to the warmup data which is not oprimal
    }) {
        const dataBindingLogger = new DataBindingLogger(logger, global)

        setAppContext({
            loadExpressionFunctions,
            platform,
            features,
            dataFetcher,
            i18n,
            appState: new AppState(),
            logger: dataBindingLogger,
            errorReporting: createErrorReporting(dataBindingLogger),
            breadcrumbReporting: createBreadcrumbReporting(dataBindingLogger),
            verboseReporting: createVerboseReporting(dataBindingLogger),
        })

        this._listenersByEvent = listenersByEvent
        this._dataProvider = new DataProvider()
        this._warmupCache = warmupCache
        this._staticCache = staticCache
        this._features = features
        this._logger = dataBindingLogger

        //TODO: invert
        this._recordStoreCache = {}
    }

    initializeDatasets({
        //TODO: temp interface
        datasetConfigs,
        firePlatformEvent,
    }) {
        try {
            return this._logger.log(
                new Trace('databinding/createControllers', () =>
                    this._initializeDatasets({
                        datasetConfigs,
                        firePlatformEvent
                    }),
                ),
            )
        } catch (e) {
            this._logger.logError(e, 'Datasets initialisation failed')
            return []
        }
    }

    _initializeDatasets({
        //TODO: temp interface
        datasetConfigs: _datasetConfigs,
        firePlatformEvent,
    }) {
        const {
            platform: {
                settings: {
                    mode: {
                        name: modeName,
                        csr,
                        ssr
                    },
                    env: {
                        livePreview,
                        live
                    },
                },
                seo,
                location,
            },
        } = appContext

        const datasetConfigs = completeControllerConfigs(_datasetConfigs)
        const updatedDatasetIds = this._updateDatasetConfigsState(datasetConfigs)
        const warmupDataIsEnabled = this._features.warmupData

        const fetchingAllDatasetsData = []
        const renderingControllers = []
        const {
            resolve: renderDeferredControllers,
            promise: renderingRegularControllers,
        } = new Deferred()

        this._dataProvider.setSchemas({
            ...((warmupDataIsEnabled && csr && this._warmupCache.getSchemas()) || {}),
            ...(this._staticCache.getSchemas() || {}),
        })

        const schemasLoading = this._logger.log(
            new Trace('databinding/loadSchemas', () =>
                this._dataProvider
                .loadSchemas(getUniqueCollectionIds(datasetConfigs))
                .then(
                    () =>
                    warmupDataIsEnabled &&
                    ssr &&
                    this._warmupCache.setSchemas(this._dataProvider.getSchemas()),
                ),
            ),
        )

        // TODO: Remove after refactoring datasetConfigs
        this._dataProvider.setDatasetConfigs(
            datasetConfigs.map(
                ({
                    config: {
                        dataset: {
                            collectionName: collectionId
                        },
                    },
                    compId: datasetId,
                    type,
                }) => ({
                    collectionId,
                    datasetId,
                    type,
                }),
            ),
        )

        const warmupStore =
            csr && warmupDataIsEnabled && this._warmupCache.getDataStore()
        if (warmupStore) {
            this._dataProvider.setStore(convertFromCache(warmupStore))
        }

        const staticStore = this._staticCache.getDataStore()
        if (staticStore) {
            this._dataProvider.setStaticStore(convertFromCache(staticStore))
        }

        this._dataProvider.createInitialDataRequest(
            this._getInitialDataRequestConfigs(datasetConfigs, updatedDatasetIds),
        )

        const connectionsGraph = datasetConfigs.reduce(
            (g, {
                compId,
                connections
            }) => {
                g[compId] = connections.map(({
                    compId
                }) => compId)
                return g
            }, {},
        )

        const dependencyManager = createDependencyManager({
            datasetConfigs
        })

        const containsFieldsInPattern = dynamicUrl => !!dynamicUrl ? .match(/\{.+\}/)
        const isDynamicItemPage = datasetConfigs.some(
            ({
                type,
                dynamicPageData
            }) =>
            type === ROUTER_DATASET &&
            containsFieldsInPattern(dynamicPageData ? .dynamicUrl),
        )

        const dynamicPageUsesSeoV2 =
            isDynamicItemPage &&
            datasetConfigs.some(
                ({
                    type,
                    dynamicPageData
                }) =>
                type === ROUTER_DATASET && dynamicPageData ? .seoV2,
            )

        const shouldCollectSeoData =
            live && isDynamicItemPage && dynamicPageUsesSeoV2

        const seoManager = shouldCollectSeoData ?
            createSeoManager({
                seo,
                pageUrl: location.pageUrl,
            }) :
            null

        const controllers = datasetConfigs.map(
            ({
                type,
                config,
                connections,
                compId: datasetId,
                livePreviewOptions: {
                    shouldFetchData: dataIsInvalidated,
                    compsIdsToReset: updatedCompIds = [],
                } = {},
                dynamicPageData,
            }) => {
                const {
                    datasetIsRouter,
                    datasetIsDeferred
                } =
                config.datasetStaticConfig
                this._logger.log(
                    new Breadcrumb({
                        category: 'createControllers',
                        message: 'warmup data contents',
                        data: {
                            datasetId,
                            datasetType: type,
                            mode: modeName,
                            warmupData: Boolean(warmupStore),
                        },
                    }),
                )

                const recordStoreService = createRecordStoreService({
                    primaryDatasetId: datasetId,
                    recordStoreCache: this._recordStoreCache,
                    refreshStoreCache: dataIsInvalidated,
                    dataProvider: this._dataProvider,
                    controllerConfig: config,
                })

                const {
                    promise: fetchingDatasetData,
                    resolve: markDatasetDataFetched,
                } = new Deferred()
                if (!datasetIsRouter && !datasetIsDeferred) {
                    // But router will be in dataStore anyway. Filter out?
                    fetchingAllDatasetsData.push(fetchingDatasetData)
                }

                const {
                    promise: renderingController,
                    resolve: markControllerAsRendered,
                } = new Deferred()
                renderingControllers.push(renderingController)

                const warmupFilterInitialData =
                    csr &&
                    warmupDataIsEnabled &&
                    this._warmupCache.getUserFilterInitialData(datasetId)

                if (warmupFilterInitialData) {
                    this._dataProvider.setUserFilterInitialData(
                        datasetId,
                        warmupFilterInitialData,
                    )
                }

                const controllerFactory = createControllerFactory(this._logger, {
                    shouldCollectSeoData,
                    seoManager,
                    dependencyManager,
                    controllerConfig: config,
                    datasetType: type,
                    connections,
                    connectionsGraph,
                    recordStoreService,
                    dataProvider: this._dataProvider,
                    firePlatformEvent: firePlatformEvent(datasetId),
                    dynamicPagesData: datasetIsRouter && dynamicPageData ?
                        {
                            dynamicPageData,
                            items: this._staticCache.getItems(),
                            datasetConfig: config,
                        } :
                        undefined,
                    datasetId,
                    schemasLoading,
                    listenersByEvent: this._listenersByEvent,
                    updatedCompIds,
                    markControllerAsRendered,
                    markDatasetDataFetched,
                    renderingRegularControllers,
                    modeIsLivePreview: livePreview,
                    modeIsSSR: ssr,
                })

                const dataset = controllerFactory.createRealDataset()
                dependencyManager.registerDataset({
                    id: datasetId,
                    api: dataset.api,
                    config,
                })

                if (ssr && warmupDataIsEnabled) {
                    dataset.userFilterInitialDataPromise.then(userFilterInitialData => {
                        this._warmupCache.setUserFilterInitialData(
                            datasetId,
                            userFilterInitialData,
                        )
                    })
                }

                return extractPlatformControllerAPI(dataset)
            },
        )

        if (ssr && warmupDataIsEnabled && fetchingAllDatasetsData.length) {
            Promise.all(fetchingAllDatasetsData).then(() => {
                this._warmupCache.setDataStore(
                    convertToCache(this._dataProvider.getStore()),
                )
            })
        }
        Promise.all(renderingControllers).then(renderDeferredControllers)

        const renderSeoTags = () =>
            Promise.all(fetchingAllDatasetsData).then(seoManager.renderSeoTagsOnce)

        return shouldCollectSeoData ?
            controllers.map(controller => ({
                ...controller,
                pageReady: (...args) =>
                    controller.pageReady(...args).then(renderSeoTags),
            })) :
            controllers
    }

    _updateDatasetConfigsState(datasetConfigs) {
        const {
            appState
        } = appContext
        return datasetConfigs.reduce(
            (updatedDatasetIds, {
                compId: datasetId,
                config: {
                    dataset
                }
            }) => {
                const datasetConfigState = appState.datasetConfigs.get(datasetId)
                if (datasetConfigState && !isEqual(datasetConfigState, dataset)) {
                    updatedDatasetIds.push(datasetId)
                }
                appState.datasetConfigs.set(datasetId, dataset)

                return updatedDatasetIds
            }, [],
        )
    }

    _getInitialDataRequestConfigs(datasetConfigs, updatedDatasetIds) {
        return datasetConfigs.reduce(
            (
                acc, {
                    compId: datasetId,
                    config: {
                        datasetStaticConfig: {
                            sequenceType
                        },
                    },
                    livePreviewOptions: {
                        shouldFetchData
                    } = {},
                },
            ) =>
            sequenceType === PRIMARY ?
            [
                ...acc,
                {
                    id: datasetId,
                    refresh: shouldFetchData || updatedDatasetIds.includes(datasetId),
                },
            ] :
            acc, [],
        )
    }
}

const getUniqueCollectionIds = datasetConfigs => {
    const uniqueCollectionIds = datasetConfigs.reduce(
        (
            uniqueIds, {
                config: {
                    dataset: {
                        collectionName
                    },
                },
            },
        ) => (collectionName ? uniqueIds.add(collectionName) : uniqueIds),
        new Set(),
    )

    return [...uniqueCollectionIds]
}

const extractPlatformControllerAPI = ({
    pageReady,
    exports,
    dispose
}) => ({
    pageReady,
    exports,
    dispose,
})

const createConverter = convert => dataStore => {
    // TODO: change date format to ISO string and this conversion won't be needed
    if (dataStore) {
        return {
            ...dataStore,
            recordsByCollectionId: Object.entries(
                dataStore.recordsByCollectionId,
            ).reduce((acc, [collection, recordsById]) => {
                acc[collection] = convert(recordsById)
                return acc
            }, {}),
        }
    }
}
const convertToCache = createConverter(convertToCustomFormat)
const convertFromCache = createConverter(convertFromCustomFormat)