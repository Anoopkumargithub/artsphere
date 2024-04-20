import {
    cloneDeep,
    identity,
    flow,
    noop,
    mapValues
} from 'lodash'
import datasetActions from '../dataset-controller/actions'
import routerDatasetApiCreator from './routerDatasetApi'
import recordActions from '../records/actions'
import configActions from '../dataset-config/actions'
import {
    isDatasetReady,
    selectLastSavedRecord,
    selectCurrentRecord,
    isWriteOnly,
    isReadOnly,
} from '../dataset-controller/rootReducer'
import {
    isCursorPaging,
    getPageSize,
    getCurrentItemIndex,
    getCurrentPageIndex,
    getDatasetSize,
    getTotalPageCount,
    hasPreviousItem,
    hasNextItem,
    hasNextPage,
    hasPreviousPage,
    getNewItemIndex,
    loadItemsUpToIndex,
} from '../helpers/paginationUtils'
import * as modes from '@wix/wix-data-client-common-standalone'
import {
    UserError,
    DatasetError,
    AppError,
    ServerError,
    Breadcrumb,
    ServerValidationError,
} from '../logger'
import {
    assertDatasetLimitations,
    assertDatasetReady,
    assertOffsetPagingMode,
    assertHasCurrentItem,
    assertValidIndex,
    assertValidNumberArgument,
    assertValidCallback,
    assertValidFilter,
    assertValidSort,
    assertScopeIsNotFixedItem,
    assertValidPageIndex,
    assertValidNewItemIndex,
    assertValidNaturalNumber,
} from './datasetApiAssertions'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'
import {
    errorHandling
} from '../helpers'

const {
    READ,
    WRITE,
    READ_WRITE
} = modes

const datasetApiCreator = ({
    store: {
        dispatch,
        getState
    },
    recordStore,
    eventListeners: {
        fireEvent,
        register
    },
    controllerStore,
    datasetId,
    datasetType,
    isFixedItem,
    siblingDynamicPageUrlGetter,
    onIdle,
    dispatcher,
    onReadyAsync,
}) => {
    const {
        logger,
        errorReporting,
        breadcrumbReporting,
        verboseReporting
    } =
    appContext

    const createErrorHandler = operationName => e => {
        if (e instanceof UserError) {
            logger.log(
                new UserError(`datasetApi '${operationName}' operation failed`, {
                    cause: e,
                }),
            )
        } else if (e instanceof ServerError) {
            logger.log(e)
        } else {
            logger.log(
                new AppError(`datasetApi '${operationName}' operation failed`, {
                    cause: e,
                }),
            )
        }

        fireEvent(
            'datasetError',
            operationName,
            e instanceof ServerValidationError ? e.cause.message : e.cause || e,
        )
        throw e.cause || e
    }

    const flushDraft = async function() {
        try {
            await dispatch(recordActions.flushDraft())
            // the save process must return the record as it was returned from wixData, ignoring any
            // changes made to it afterwards (e.g., after save callback). If there was no draft to flush,
            // it must return the current record.
            const updatedRecord =
                selectLastSavedRecord(getState()) || selectCurrentRecord(getState())
            return cloneDeep(updatedRecord)
        } catch (e) {
            // eslint-disable-next-line no-console
            dispatcher.dispatch('datasetSaveError')
            throw e
        }
    }

    const addNewItem = async function(
        atIndex = getNewItemIndex({
            state: getState()
        }),
        methodName,
    ) {
        assertDatasetReady(getState, methodName)
        assertDatasetLimitations(
            getState,
            methodName, [WRITE, READ_WRITE],
            datasetType,
            false,
        )
        assertValidNumberArgument('atIndex', atIndex)
        await flushDraft()

        if (isCursorPaging({
                recordStore
            })) {
            await loadItemsUpToIndex({
                index: atIndex,
                recordStore
            })
        }

        assertValidNewItemIndex({
            index: atIndex,
            datasetSize: getDatasetSize({
                recordStore
            }),
        })

        await dispatch(recordActions.newRecord(atIndex))
    }

    return isForUser => {
        const errorReportingCb = isForUser ?
            (fn, eventName) =>
            errorReporting(
                fn,
                UserError.withMessage(
                    `An error occurred in one of ${eventName} callbacks`,
                ),
            ) :
            identity

        const baseApi = {
            async isIdle() {
                await new Promise(resolve => {
                    const unregisterIdleCallback = onIdle(() => {
                        unregisterIdleCallback()
                        resolve()
                    })
                })
            },

            onBeforeSave: cb => {
                assertValidCallback('onBeforeSave', cb)
                assertDatasetLimitations(
                    getState,
                    'onBeforeSave', [WRITE, READ_WRITE],
                    datasetType,
                    false,
                )
                return register('beforeSave', errorReportingCb(cb, 'beforeSave'))
            },

            onAfterSave: cb => {
                assertValidCallback('onAfterSave', cb)
                assertDatasetLimitations(
                    getState,
                    'onAfterSave', [WRITE, READ_WRITE],
                    datasetType,
                    false,
                )
                return register('afterSave', errorReportingCb(cb, 'afterSave'))
            },

            async save() {
                assertDatasetLimitations(
                    getState,
                    'save', [WRITE, READ_WRITE],
                    datasetType,
                    false,
                )
                const updatedRecord = await flushDraft()
                if (isWriteOnly(getState())) {
                    await dispatch(recordActions.reInitWriteOnly())
                }
                return updatedRecord
            },

            async getItems(fromIndex, numberOfItems) {
                assertDatasetLimitations(
                    getState,
                    'getItems', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                assertValidNumberArgument('fromIndex', fromIndex)
                assertValidNumberArgument('numberOfItems', numberOfItems)
                const {
                    items,
                    offset,
                    datasetSize
                } = await recordActions.doFetch(
                    recordStore,
                    fromIndex,
                    numberOfItems,
                )
                const totalCount = isCursorPaging({
                        recordStore
                    }) ?
                    undefined :
                    datasetSize.total
                return {
                    items,
                    totalCount,
                    offset
                }
            },

            getTotalCount: () => {
                assertDatasetLimitations(
                    getState,
                    'getTotalCount', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                if (!isDatasetReady(getState())) {
                    return null
                }
                assertOffsetPagingMode(isCursorPaging({
                    recordStore
                }), 'getTotalCount')
                return getDatasetSize({
                    recordStore
                }).total
            },

            getCurrentItem: () => {
                assertDatasetLimitations(
                    getState,
                    'getCurrentItem', [READ, WRITE, READ_WRITE],
                    datasetType,
                )
                const record = selectCurrentRecord(getState())
                if (!record) {
                    return null
                }
                return cloneDeep(record)
            },

            getCurrentItemIndex: () => {
                assertDatasetLimitations(
                    getState,
                    'getCurrentItemIndex', [READ, READ_WRITE],
                    datasetType,
                )
                return getCurrentItemIndex({
                    state: getState()
                })
            },

            async setCurrentItemIndex(index) {
                assertScopeIsNotFixedItem(isFixedItem, 'setCurrentItemIndex')
                assertDatasetLimitations(
                    getState,
                    'setCurrentItemIndex', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                assertValidIndex(index)

                await new Promise(resolve => api.onReady(resolve))

                if (!isReadOnly(getState())) {
                    await flushDraft()
                }
                await dispatch(recordActions.setCurrentIndex(index))
            },

            setFieldValue: (fieldName, value) => {
                assertDatasetReady(getState, 'setFieldValue')
                assertDatasetLimitations(
                    getState,
                    'setFieldValue', [WRITE, READ_WRITE],
                    datasetType,
                )
                assertHasCurrentItem(getState)
                dispatch(recordActions.updateFields({
                    [fieldName]: cloneDeep(value)
                }))
            },

            setFieldValues: fieldValues => {
                assertDatasetReady(getState, 'setFieldValues')
                assertDatasetLimitations(
                    getState,
                    'setFieldValues', [WRITE, READ_WRITE],
                    datasetType,
                )
                assertHasCurrentItem(getState)
                dispatch(recordActions.updateFields(mapValues(fieldValues, cloneDeep)))
            },

            async next() {
                assertScopeIsNotFixedItem(isFixedItem, 'next')
                assertDatasetReady(getState, 'next')
                assertDatasetLimitations(
                    getState,
                    'next', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                if (!isReadOnly(getState())) {
                    await flushDraft()
                }
                if (!api.hasNext()) {
                    throw new DatasetError('There are no more items in the dataset', {
                        code: 'NO_SUCH_ITEM',
                    })
                }
                const currentIndex = getCurrentItemIndex({
                    state: getState()
                })
                await dispatch(recordActions.setCurrentIndex(currentIndex + 1))
                return api.getCurrentItem()
            },

            async previous() {
                assertScopeIsNotFixedItem(isFixedItem, 'previous')
                assertDatasetReady(getState, 'previous')
                assertDatasetLimitations(
                    getState,
                    'previous', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                if (!isReadOnly(getState())) {
                    await flushDraft()
                }
                if (!api.hasPrevious()) {
                    throw new DatasetError('This is the first item in the dataset', {
                        code: 'NO_SUCH_ITEM',
                    })
                }
                const currentIndex = getCurrentItemIndex({
                    state: getState()
                })
                await dispatch(recordActions.setCurrentIndex(currentIndex - 1))
                return api.getCurrentItem()
            },

            hasNext: () => {
                assertDatasetLimitations(
                    getState,
                    'hasNext', [READ, READ_WRITE],
                    datasetType,
                )
                return hasNextItem({
                    state: getState(),
                    recordStore,
                })
            },

            hasPrevious: () => {
                assertDatasetLimitations(
                    getState,
                    'hasPrevious', [READ, READ_WRITE],
                    datasetType,
                )
                return hasPreviousItem({
                    state: getState(),
                })
            },

            async new(atIndex) {
                return addNewItem(atIndex, 'new')
            },

            async add(atIndex) {
                return addNewItem(atIndex, 'add')
            },

            async remove() {
                assertDatasetReady(getState, 'remove')
                assertDatasetLimitations(
                    getState,
                    'remove', [READ_WRITE],
                    datasetType,
                    false,
                )
                const currentIndex = getCurrentItemIndex({
                    state: getState()
                })
                if (currentIndex == null) {
                    throw new DatasetError('Invalid index', {
                        code: 'DS_INDEX_OUT_OF_RANGE',
                    })
                }
                await dispatch(recordActions.remove())
            },

            async revert() {
                assertDatasetReady(getState, 'revert')
                assertDatasetLimitations(
                    getState,
                    'revert', [WRITE, READ_WRITE],
                    datasetType,
                    false,
                )
                assertHasCurrentItem(getState)
                return dispatch(recordActions.revert())
            },

            async refresh() {
                assertDatasetReady(getState, 'refresh')
                assertDatasetLimitations(
                    getState,
                    'refresh', [READ, WRITE, READ_WRITE],
                    datasetType,
                    false,
                )
                await dispatch(recordActions.refresh())
            },

            onCurrentIndexChanged: cb => {
                assertValidCallback('onCurrentIndexChanged', cb)
                assertDatasetLimitations(
                    getState,
                    'onCurrentIndexChanged', [READ_WRITE, READ],
                    datasetType,
                    false,
                )
                return register(
                    'currentIndexChanged',
                    errorReportingCb(cb, 'currentIndexChanged'),
                )
            },

            onItemValuesChanged: cb => {
                assertValidCallback('onItemValuesChanged', cb)
                assertDatasetLimitations(
                    getState,
                    'onItemValuesChanged', [READ_WRITE, WRITE],
                    datasetType,
                    false,
                )
                return register(
                    'itemValuesChanged',
                    errorReportingCb(cb, 'itemValuesChanged'),
                )
            },

            onError: cb => {
                assertValidCallback('onError', cb)
                assertDatasetLimitations(
                    getState,
                    'onError', [READ_WRITE, READ, WRITE],
                    datasetType,
                    false,
                )
                return register('datasetError', errorReportingCb(cb, 'datasetError'))
            },

            onReady: cb => {
                assertValidCallback('onReady', cb)
                assertDatasetLimitations(
                    getState,
                    'onReady', [READ, WRITE, READ_WRITE],
                    datasetType,
                    false,
                )
                if (!isDatasetReady(getState())) {
                    return register('datasetReady', errorReportingCb(cb, 'datasetReady'))
                } else {
                    Promise.resolve(errorReportingCb(cb)())
                    return noop
                }
            },

            onReadyAsync,

            async setSort(sort) {
                assertScopeIsNotFixedItem(isFixedItem, 'setSort')
                assertDatasetLimitations(
                    getState,
                    'setSort', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                assertValidSort(sort)

                await new Promise(resolve => api.onReady(resolve))

                if (!isReadOnly(getState())) {
                    await flushDraft()
                }

                const buildSort = errorReporting(
                    () => sort._build(),
                    UserError.withMessage('Sort building failed'),
                )
                await dispatch(configActions.setSort(cloneDeep(buildSort())))
            },

            async setFilter(filter) {
                assertScopeIsNotFixedItem(isFixedItem, 'setFilter')
                assertDatasetLimitations(
                    getState,
                    'setFilter', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                assertValidFilter(filter)

                await new Promise(resolve => api.onReady(resolve))

                if (!isReadOnly(getState())) {
                    await flushDraft()
                }

                const buildFilter = errorReporting(
                    () => filter._build(),
                    UserError.withMessage('Filter building failed'),
                )
                await dispatch(configActions.setFilter(cloneDeep(buildFilter())))
            },

            loadMore: async () => {
                assertScopeIsNotFixedItem(isFixedItem, 'loadMore')
                assertDatasetReady(getState, 'loadMore')
                assertDatasetLimitations(
                    getState,
                    'loadMore', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                await dispatch(recordActions.incrementNumOfPagesToShow())
            },

            async nextPage() {
                assertScopeIsNotFixedItem(isFixedItem, 'nextPage')
                assertDatasetReady(getState, 'nextPage')
                assertDatasetLimitations(
                    getState,
                    'nextPage', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                if (!isReadOnly(getState())) {
                    await flushDraft()
                }
                if (!api.hasNextPage()) {
                    throw new DatasetError('There are no more pages in the dataset', {
                        code: 'NO_SUCH_PAGE',
                    })
                }
                await dispatch(recordActions.nextPage())
                const {
                    items
                } = await recordActions.fetchCurrentPage(
                    recordStore,
                    getState(),
                )
                return items
            },

            async previousPage() {
                assertScopeIsNotFixedItem(isFixedItem, 'previousPage')
                assertDatasetReady(getState, 'previousPage')
                assertDatasetLimitations(
                    getState,
                    'previousPage', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                if (!isReadOnly(getState())) {
                    await flushDraft()
                }
                if (!api.hasPreviousPage()) {
                    throw new DatasetError('This is the first page in the dataset', {
                        code: 'NO_SUCH_PAGE',
                    })
                }
                await dispatch(recordActions.previousPage())
                const {
                    items
                } = await recordActions.fetchCurrentPage(
                    recordStore,
                    getState(),
                )
                return items
            },

            hasNextPage() {
                assertDatasetLimitations(
                    getState,
                    'hasNextPage', [READ, READ_WRITE],
                    datasetType,
                )
                return hasNextPage({
                    state: getState(),
                    recordStore,
                })
            },

            hasPreviousPage() {
                assertDatasetLimitations(
                    getState,
                    'hasPreviousPage', [READ, READ_WRITE],
                    datasetType,
                )
                return hasPreviousPage({
                    state: getState(),
                })
            },

            getTotalPageCount() {
                assertDatasetLimitations(
                    getState,
                    'getTotalPageCount', [READ, READ_WRITE],
                    datasetType,
                )
                if (!isDatasetReady(getState())) {
                    return null
                }
                assertOffsetPagingMode(
                    isCursorPaging({
                        recordStore
                    }),
                    'getTotalPageCount',
                )
                return getTotalPageCount({
                    state: getState(),
                    recordStore,
                })
            },

            getCurrentPageIndex() {
                assertDatasetLimitations(
                    getState,
                    'getCurrentPageIndex', [READ, READ_WRITE],
                    datasetType,
                )

                return getCurrentPageIndex({
                    state: getState()
                })
            },

            async loadPage(pageNumber) {
                assertDatasetLimitations(
                    getState,
                    'loadPage', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                assertScopeIsNotFixedItem(isFixedItem, 'loadPage')
                assertDatasetReady(getState, 'loadPage')
                assertOffsetPagingMode(isCursorPaging({
                    recordStore
                }), 'loadPage')
                assertValidPageIndex(pageNumber, api.getTotalPageCount())

                if (!isReadOnly(getState())) {
                    await flushDraft()
                }
                await dispatch(recordActions.loadPage(pageNumber))
                const {
                    items
                } = await recordActions.fetchCurrentPage(
                    recordStore,
                    getState(),
                )
                return items
            },

            inScope: (repeaterId, itemId) => {
                assertDatasetLimitations(
                    getState,
                    'inScope', [READ, WRITE, READ_WRITE],
                    datasetType,
                    false,
                )
                const controller = controllerStore.getController({
                    repeaterId,
                    itemId,
                })
                return controller ? controller.staticExports : api
            },

            getPageSize: () => {
                assertDatasetLimitations(
                    getState,
                    'getPageSize', [READ, READ_WRITE],
                    datasetType,
                )
                return getPageSize({
                    state: getState()
                })
            },

            async setPageSize(size) {
                assertDatasetLimitations(
                    getState,
                    'setPageSize', [READ, READ_WRITE],
                    datasetType,
                    false,
                )
                assertValidNaturalNumber('size', size)

                await new Promise(resolve => api.onReady(resolve))

                if (!isReadOnly(getState())) {
                    await flushDraft()
                }
                await dispatch(datasetActions.setPaginationData({
                    size
                }))
            },
        }

        const routerDatasetApi = routerDatasetApiCreator({
            datasetType,
            siblingDynamicPageUrlGetter,
        })

        const api = Object.assign(baseApi, routerDatasetApi)
        const wrappedApi = {}

        for (const functionName in api) {
            wrappedApi[functionName] = flow(
                fn =>
                breadcrumbReporting(
                    fn,
                    Breadcrumb.with({
                        category: 'datasetAPI',
                        message: `method: ${functionName} - datasetId:${datasetId}`,
                    }),
                ),
                fn => verboseReporting(fn, functionName),
                fn =>
                // errors can be thrown by the server, by datasetApiAssertions, by effects
                // and probaly more, nobody knows
                // TODO: decorate all validation to single throwing func instead of throwing from each validator.
                errorHandling(fn, createErrorHandler(functionName)),
            )(api[functionName])
        }

        return wrappedApi
    }
}

export default datasetApiCreator