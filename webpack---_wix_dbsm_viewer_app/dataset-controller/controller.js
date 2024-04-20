import {
    flow
} from 'lodash'
import {
    Maybe
} from '@wix/wix-data-client-wix-code-adt'
import {
    UPLOAD_BUTTON_ROLE,
    SIGNATURE_INPUT_ROLE,
} from '@wix/wix-data-client-common-standalone'
import {
    SCOPE_TYPES
} from '@wix/wix-data-client-dbsm-common/src/scopes/consts'
import {
    getFilter,
    getSort,
    getDatasetStaticConfig,
    isDatasetConfigured,
    isDatasetReady,
    selectSetFilterCalled,
    getUserFilterInitialData as getUserFilterInitialDataFromState,
} from './rootReducer'
import recordActions from '../records/actions'
import dynamicPagesActions from '../dynamic-pages/actions'
import configActions from '../dataset-config/actions'
import rootActions from './actions'
import configureDatasetStore from './configureStore'
import datasetApiCreator from '../dataset-api/datasetApi'
import eventListenersCreator from '../dataset-events/eventListeners'
import syncComponentsWithState from '../side-effects/syncComponentsWithState'
import {
    getFieldTypeCreator
} from '../data/utils'
import createConnectedComponentsStore from '../connected-components'
import {
    createFilterResolver,
    createValueResolvers
} from '../filter-resolvers'
import wixFormattingCreator from '@wix/wix-code-formatting'
import {
    createRecordStoreInstance
} from '../record-store'
import rootSubscriber from './rootSubscriber'
import dynamicPagesSubscriber from '../dynamic-pages/subscriber'
import createSiblingDynamicPageUrlGetter from '../dynamic-pages/siblingDynamicPageGetterFactory'
import fetchData from './dataFetcher'
import generateRecordFromDefaultComponentValues from '../helpers/generateRecordFromDefaultComponentValues'
import {
    getCurrentItemIndex,
    getPageSize
} from '../helpers/paginationUtils'
import {
    getComponentsToUpdate
} from '../helpers/livePreviewUtils'
import {
    Dispatcher,
    errorHandling
} from '../helpers'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'
import {
    AppError,
    Trace,
    reportDatasetActiveOnPage
} from '../logger'
import {
    extractRealDatasetId
} from '../helpers/scopedDatasetUtils'
import {
    createRecordChangeSubscriber
} from './recordChangeSubscriber'
import {
    waitForAllScopedDatasetsToBeReady,
    subscribeDetailsDatasetsToMasterOnReady,
} from '../dataset-controller/dependencies'
import {
    createDatabindingApi
} from '../databinding-api'
import {
    getComponentsToDatabind
} from '../components/getComponentsToDatabind'
import {
    USER_INPUT_FILTER_ROLES
} from '../helpers/constants'
import {
    getSeoData
} from '../seo/getSeoData'

const createDataset =
    (controllerFactory, controllerStore) =>
    ({
        shouldCollectSeoData,
        controllerConfig,
        datasetType,
        connections: allConnections,
        connectionsGraph,
        isScoped,
        datasetScope,
        dataProvider,
        dependencyManager,
        seoManager,
        firePlatformEvent,
        dynamicPagesData,
        datasetId,
        fixedRecordId,
        recordStoreService,
        updatedCompIds,
        markControllerAsRendered,
        markDatasetDataFetched,
        renderingRegularControllers,
        modeIsLivePreview,
        modeIsSSR,
        schemasLoading,
        listenersByEvent,
    }) => {
        const isUserInputFilterConnection = ({
                role
            }) =>
            USER_INPUT_FILTER_ROLES.includes(role)

        const connections = allConnections.filter(
            connection =>
            !isUserInputFilterConnection(connection) || connection.config,
        )

        const isFixedItem = !!fixedRecordId
        const {
            logger,
            loadExpressionFunctions,
            platform: {
                user,
                settings: {
                    locale
                },
                timers: {
                    queueMicrotask
                },
            },
        } = appContext

        const {
            setConnectedComponents,
            getConnectedComponents
        } =
        createConnectedComponentsStore()
        const unsubscribeHandlers = []

        const {
            store,
            subscribe,
            onIdle
        } = configureDatasetStore(
            logger,
            datasetId,
        )

        const eventListeners = eventListenersCreator(firePlatformEvent)

        const {
            fireEvent,
            register
        } = eventListeners
        unsubscribeHandlers.push(eventListeners.dispose)

        // Our system has two event listening system.
        // One is internal, meaning those events can be listened only by our own code
        // And the second one is external, meaning these events are listened by wix code, components, etc.
        // dispatcher - internal, eventListeners - external (legacy)
        // TODO: but before dispatcher was introduced, everything was in eventListeners, so it should be refactored
        const dispatcher = new Dispatcher({
            datasetId: extractRealDatasetId(datasetId),
            scopedDatasetId: isScoped ? datasetId : undefined,
            getState: store.getState,
            getSchema: (name = datasetCollectionName) => dataProvider.getSchema(name),
        })

        const internalEventsUnsubscibers = dispatcher.subscribe(listenersByEvent)

        unsubscribeHandlers.push(...internalEventsUnsubscibers)

        store.dispatch(
            rootActions.init({
                controllerConfig,
                connections,
                isScoped,
                datasetType,
            }),
        )
        const {
            datasetIsVirtual,
            datasetIsReal,
            datasetIsDeferred,
            datasetIsWriteOnly,
            datasetIsRouter,
            datasetCollectionName,
            dynamicPageNavComponentsShouldBeLinked,
        } = getDatasetStaticConfig(store.getState())

        const filter = getFilter(store.getState())
        const sort = getSort(store.getState())

        const getSchema = (schemaName = datasetCollectionName) => {
            return Maybe.fromNullable(dataProvider.getSchema(schemaName))
        }

        const getUserFilterInitialData = () => {
            return dataProvider.getUserFilterInitialData(datasetId)
        }

        const getFieldType = fieldName => {
            const schema = getSchema(datasetCollectionName)
            const referencedCollectionsSchemas = dataProvider.getReferencedSchemas(
                datasetCollectionName,
            )
            return schema.chain(s =>
                Maybe.fromNullable(
                    getFieldTypeCreator(s, referencedCollectionsSchemas)(fieldName),
                ),
            )
        }

        const valueResolvers = createValueResolvers(
            id => dependencyManager.getDependencyById(id, datasetScope),
            getConnectedComponents,
            getFieldType,
        )

        const filterResolver = createFilterResolver({
            valueResolvers,
            getConnectedComponents: () =>
                isDatasetReady(store.getState()) ? getConnectedComponents() : [],
            getFieldType,
            getUserFilterInitialData: () =>
                getUserFilterInitialDataFromState(store.getState()),
            wasSetFilterCalled: flow(() => store.getState(), selectSetFilterCalled),
        })

        const recordStore = createRecordStoreInstance({
            recordStoreService,
            getFilter: flow(() => store.getState(), getFilter),
            getSort: flow(() => store.getState(), getSort),
            getPageSize: () => getPageSize({
                state: store.getState()
            }),
            datasetId,
            filterResolver,
            getSchema,
            fixedRecordId,
        })

        const siblingDynamicPageUrlGetter = dynamicPageNavComponentsShouldBeLinked ?
            createSiblingDynamicPageUrlGetter({
                dataProvider,
                dynamicPagesData,
                collectionName: datasetCollectionName,
            }) :
            null

        if (dynamicPageNavComponentsShouldBeLinked) {
            subscribe(dynamicPagesSubscriber(siblingDynamicPageUrlGetter))
            store.dispatch(dynamicPagesActions.initialize(connections))
        }

        let resolveDatasetReadyPromise
        let rejectDatasetReadyPromise
        const datasetReadyPromise = new Promise((resolve, reject) => {
            resolveDatasetReadyPromise = resolve
            rejectDatasetReadyPromise = reject
        })
        const onReadyAsync = isScoped ? undefined : () => datasetReadyPromise
        if (!isScoped) {
            register('datasetReady', resolveDatasetReadyPromise)
        }

        const datasetApi = datasetApiCreator({
            store,
            recordStore,
            eventListeners,
            controllerStore,
            datasetId,
            datasetType,
            isFixedItem,
            siblingDynamicPageUrlGetter,
            onIdle,
            dispatcher,
            onReadyAsync,
        })

        const appDatasetApi = datasetApi(false)

        unsubscribeHandlers.push(
            recordStoreService
            .map(service =>
                service.onChange(
                    createRecordChangeSubscriber(store.getState, store.dispatch),
                ),
            )
            .getOrElse(() => {}),
        )
        const {
            fetchingInitialData,
            resolveUserInputDependency
        } = fetchData({
            dependencyManager,
            shouldFetchInitialData: controllerConfig && !datasetIsWriteOnly,
            recordStore,
            store,
            filter,
            sort,
            datasetIsDeferred,
            modeIsSSR,
            queueMicrotask,
            datasetIsReal,
            collectionId: datasetCollectionName,
            filterResolver,
            getSchemas: () => dataProvider.getSchemas(),
            schemasLoading,
            getUserFilterInitialData,
        })

        fetchingInitialData.then(() => {
            markDatasetDataFetched()
            const firstRecord = recordStore().fold(
                () => undefined,
                service =>
                service.getSeedRecords().matchWith({
                    Empty: () => undefined,
                    Results: ({
                        items
                    }) => items[0],
                }),
            )
            if (firstRecord) {
                store.dispatch(recordActions.setCurrentRecord(firstRecord, 0))
            }
        })

        const isScopedDetailsDataset = isScoped && !isFixedItem
        if (isScopedDetailsDataset) {
            dependencyManager
                .getDependenciesByFilter(filter, datasetScope)
                .forEach(({
                    masterDataset: {
                        api: masterDatasetApi
                    }
                }) => {
                    subscribeDetailsDatasetsToMasterOnReady({
                        detailsDatasetApis: [appDatasetApi],
                        store,
                        masterDatasetApi,
                        controllerConfig,
                        unsubscribeHandlers,
                    })
                })
        }

        const shouldRefreshDataset = () => {
            const currentRecordIndex = getCurrentItemIndex({
                state: store.getState(),
            })
            const isPristine = recordStore().fold(
                () => false,
                service => service.isPristine(currentRecordIndex),
            )

            return isPristine && !datasetIsWriteOnly
        }

        if (shouldCollectSeoData && datasetIsReal && !datasetIsDeferred) {
            Promise.all([fetchingInitialData, schemasLoading]).then(() => {
                let seoData = {}
                try {
                    seoData = getSeoData({
                        isDpItemDataset: datasetIsRouter,
                        recordStore,
                        state: store.getState(),
                        schema: dataProvider.getSchema(datasetCollectionName),
                        connections,
                    })
                } catch (error) {
                    logger.log(
                        new AppError(
                            `Failed to extract seo data for dataset ${datasetId}`, {
                                cause: error
                            },
                        ),
                    )
                }

                seoManager.submitSeoData(seoData)
            })
        }

        const pageReady = async function(componentFactory) {
            user.onLogin(() => {
                // THIS SHOULD HAPPEN SYNCHRONOUSLY SO TESTS WILL REMAIN MEANINGFUL
                // IF YOU EVER FIND THE NEED TO MAKE IT ASYNC - TALK TO leeor@wix.com
                if (shouldRefreshDataset()) {
                    appDatasetApi.refresh()
                }
            })

            const {
                components: allComponents,
                detailsDatasetApis
            } =
            componentFactory(connections)

            const componentsToUpdate = getComponentsToUpdate({
                updatedCompIds,
                datasetIsReal,
                connectionsGraph,
                components: allComponents,
            })

            setConnectedComponents(componentsToUpdate)

            const componentsToDatabind = getComponentsToDatabind(componentsToUpdate, {
                datasetId,
                datasetIsReal,
                connectionsGraph,
                getDependencies: () =>
                    dependencyManager.getDependenciesByFilter(filter),
            })

            subscribeDetailsDatasetsToMasterOnReady({
                detailsDatasetApis,
                masterDatasetApi: appDatasetApi,
                dependencyManager,
                controllerConfig,
                unsubscribeHandlers,
            })

            if (datasetIsReal) {
                await schemasLoading
            }

            resolveUserInputDependency()

            if (
                // router dataset, without router data
                !isDatasetConfigured(store.getState()) ||
                // !controllerConfig.dataset.collectionName ||
                // removed collection, nothing to bind.
                !dataProvider.hasSchema(controllerConfig.dataset.collectionName)
            ) {
                fetchingInitialData.then(() => {
                    markControllerAsRendered()
                    dependencyManager.resolveDependants(datasetId)
                    store.dispatch(configActions.setIsDatasetReady(true))
                    fireEvent('datasetReady')
                })

                return Promise.resolve()
            }

            const databindingApi = createDatabindingApi({
                components: componentsToDatabind,
                context: {
                    connections,
                    recordStore,
                    dispatch: store.dispatch,
                    getState: store.getState,
                    datasetApi: appDatasetApi,
                    eventListeners,
                    dispatcher,
                    getFieldType,
                    getSchema,
                    controllerFactory,
                    controllerStore,
                    modeIsLivePreview,
                    wixFormatter: !locale ?
                        null :
                        wixFormattingCreator({
                            locale,
                        }),
                },
            })

            subscribe(
                rootSubscriber(
                    recordStore,
                    databindingApi,
                    getFieldType,
                    eventListeners.executeHooks,
                    datasetId,
                    componentsToDatabind,
                    fireEvent,
                    dispatcher,
                ),
            )

            unsubscribeHandlers.push(
                syncComponentsWithState(
                    store,
                    componentsToDatabind,
                    logger,
                    datasetId,
                    recordStore,
                ),
            )

            const defaultRecord = generateRecordFromDefaultComponentValues(
                componentsToDatabind.filter(
                    ({
                        role
                    }) =>
                    ![UPLOAD_BUTTON_ROLE, SIGNATURE_INPUT_ROLE].includes(role),
                ),
                getFieldType,
            )

            store.dispatch(recordActions.setDefaultRecord(defaultRecord))
            if (datasetIsWriteOnly) {
                await store.dispatch(recordActions.initWriteOnly(datasetIsVirtual))
            }

            if (datasetIsDeferred) {
                databindingApi.hideAll()

                if (modeIsSSR) {
                    databindingApi.clearAll()
                }
            }

            const hasExpression = connections.some(
                c => Object.keys(c ? .config ? .expressions || {}).length > 0,
            )
            const expressionFunctionsReady = hasExpression ?
                loadExpressionFunctions() :
                Promise.resolve()

            const pageReadyResult = Promise.all([
                fetchingInitialData,
                expressionFunctionsReady,
            ]).then(async () => {
                if (datasetIsDeferred) {
                    await renderingRegularControllers
                }

                if (!modeIsSSR) {
                    try {
                        reportDatasetActiveOnPage(
                            store.getState(),
                            connections,
                            datasetType,
                            datasetIsVirtual,
                            datasetId,
                            getSchema(datasetCollectionName),
                        )
                    } catch (err) {
                        logger.log(
                            new AppError('Failed to report dataset active BI', {
                                cause: err,
                            }),
                        )
                    }
                }
                await databindingApi.bindAll()
                if (datasetIsReal) {
                    await waitForAllScopedDatasetsToBeReady(controllerStore)
                }
                if (datasetIsDeferred) {
                    databindingApi.showAll()
                }
                dependencyManager.resolveDependants(datasetId)
                store.dispatch(configActions.setIsDatasetReady(true))
                fireEvent('datasetReady')
            })

            if (datasetIsDeferred) {
                markControllerAsRendered()

                return Promise.resolve()
            } else {
                pageReadyResult.then(markControllerAsRendered)

                return pageReadyResult
            }
        }

        const userCodeDatasetApi = datasetApi(true)
        const dynamicExports = (scope /*, $w*/ ) => {
            switch (scope.type) {
                case SCOPE_TYPES.COMPONENT:
                    return userCodeDatasetApi.inScope(
                        scope.compId,
                        scope.additionalData.itemId,
                    )
                default:
                    return userCodeDatasetApi
            }
        }

        const dispose = () => {
            unsubscribeHandlers.forEach(h => h())
        }

        const finalPageReady = datasetIsVirtual ?
            pageReady :
            (...args) =>
            logger.log(new Trace('dataset/pageReady', () => pageReady(...args)))
        return {
            pageReady: errorHandling(finalPageReady, e => {
                rejectDatasetReadyPromise()
                return logger.logError(e, 'Dataset pageReady callback failed', {
                    datasetId,
                })
            }),
            exports: dynamicExports,
            staticExports: userCodeDatasetApi,
            dispose,
            api: appDatasetApi,
            userFilterInitialDataPromise: fetchingInitialData.then(
                ([_seedData, userFilterInitialData]) => userFilterInitialData,
            ),
        }
    }

export default createDataset