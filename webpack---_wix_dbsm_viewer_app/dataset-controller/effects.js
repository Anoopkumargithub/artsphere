import {
    isBoolean,
    isEqual,
    mapValues
} from 'lodash'
import recordsActions from '../records/actions'
import {
    AppError,
    DatasetError,
    Breadcrumb,
    VerboseMessage
} from '../logger'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'
import {
    getNormalizedIndex,
    isCursorPaging,
    loadItemsUpToIndex,
} from '../helpers/paginationUtils'

const isFalse = val => isEqual(false, val)

//TODO: consider moving all validations to datasetApi.
// It also seems that not all DatasetErrors are really caused by wrong user input. Check.

function convertToFieldType(fieldType, value) {
    switch (fieldType) {
        case 'number':
            {
                return Number(value)
            }

        case 'boolean':
            {
                if (typeof value === 'string') {
                    return value.toLowerCase() === 'true' || value.toLowerCase() === '1'
                }
                break
            }

        case 'text':
            {
                if (value != null && typeof value.toString === 'function') {
                    return value.toString()
                }
                break
            }
    }

    return value
}

function ensureSchemaTypes(getFieldType, record) {
    return mapValues(record, (value, fieldName) =>
        getFieldType(fieldName)
        .map(fieldType => convertToFieldType(fieldType, value))
        .getOrElse(value),
    )
}

function effectsCreator(
    recordStore,
    databindingApi,
    getFieldType,
    executeHooks,
    controllerId,
    connectedComponents,
    fireEvent,
    dispatcher,
) {
    const {
        logger,
        errorReporting,
        breadcrumbReporting
    } = appContext

    const breadcrumbReportingFor = (effectName, fn) =>
        breadcrumbReporting(
            fn,
            Breadcrumb.with({
                category: 'effects',
                message: effectName,
                data: {
                    datasetId: controllerId
                },
            }),
        )

    function updateComponents(
        componentIdToExcludeFromUpdatingComponentsBasedOnRecord,
        previousRecord,
    ) {
        databindingApi.onCurrentRecordModified(
            previousRecord,
            componentIdToExcludeFromUpdatingComponentsBasedOnRecord,
        )
    }

    function executeBeforeSaveHooks() {
        logger.log(
            new VerboseMessage(VerboseMessage.types.DS_API.TRIGGERED, {
                eventName: 'beforeSave',
            }),
        )
        return executeHooks('beforeSave')
            .then(hookResults => hookResults.some(isFalse))
            .catch(e => ({
                error: e
            }))
            .then(shouldCancelSave => {
                if (shouldCancelSave) {
                    throw new DatasetError(
                        `Operation cancelled by user code. ${
              isBoolean(shouldCancelSave) ? '' : shouldCancelSave.error
            }`, {
                            code: 'DS_OPERATION_CANCELLED'
                        },
                    )
                }
            })
    }

    function removeRecordByIndex(index) {
        return recordStore().fold(throwDsOperationFailed, service =>
            service.removeRecord(index),
        )
    }

    function newRecordAtIndex(atIndex, defaultDraft) {
        return recordStore().fold(throwDsOperationFailed, service =>
            service.newRecord(atIndex, defaultDraft),
        )
    }

    function assertComponentsValid(currentRecord) {
        const invalidComponents = connectedComponents.filter(
            component => !component.isValid(currentRecord),
        )

        invalidComponents.forEach(component => component.updateValidityIndication())

        if (invalidComponents.length) {
            throw new DatasetError('Some of the elements validation failed', {
                code: 'DS_VALIDATION_ERROR',
            })
        }
    }

    function fireEventByName(eventName, ...payload) {
        return errorReporting(
            // under the hood it not only fires an event, but also executes listeners,
            // registered by our system and via dataset API. see eventListeners.js
            // so here we have mixed responsibility - dispatching event to the outer world (platform)
            // and executing internaly and externaly registered listeners
            // TODO: read again about Single Responsibility Principle and fix
            fireEvent,
            AppError.withMessage(`Dataset ${eventName} event execution failed`),
        )(eventName, ...payload)
    }

    function notifyIndexChange() {
        return databindingApi.onCurrentIndexChanged()
    }

    function notifyRecordSetLoaded() {
        return Promise.all(databindingApi.onRecordsLoaded())
    }

    function updateCurrentView() {
        return Promise.all(databindingApi.onCurrentViewChanged())
    }

    const throwDsOperationFailed = error => {
        throw new DatasetError(error, {
            code: 'DS_OPERATION_FAILED'
        })
    }

    const getRecord = index =>
        recordStore().fold(throwDsOperationFailed, service =>
            service.getRecords(index, 1),
        )

    return {
        goToRecordByIndex: (currentIndex, requestedIndex, forceRefreshRecord) => ({
            run: breadcrumbReportingFor(
                'goToRecordByIndex',
                async function goToRecordByIndex() {
                    if (isCursorPaging({
                            recordStore
                        })) {
                        await loadItemsUpToIndex({
                            index: requestedIndex,
                            recordStore
                        })
                    }
                    let realIndex
                    try {
                        realIndex = getNormalizedIndex({
                            recordStore,
                            index: requestedIndex,
                        })
                    } catch (err) {
                        throwDsOperationFailed(err)
                    }

                    if (currentIndex !== realIndex || forceRefreshRecord) {
                        const queryResult = await getRecord(realIndex)

                        return queryResult.matchWith({
                            Empty: () => recordsActions.GoToIndexResult.NoRecord(),
                            Results: ({
                                    items
                                }) =>
                                recordsActions.GoToIndexResult.Record(realIndex, items[0]),
                        })
                    } else {
                        return recordsActions.GoToIndexResult.InvalidIndex()
                    }
                },
            ),
            isQueued: true,
            resultActionCreator: recordsActions.goToRecordByIndexResult,
        }),

        setFieldsInCurrentRecord: (fields, index, source) => ({
            run: breadcrumbReportingFor(
                'setFieldsInCurrentRecord',
                function setFieldsInCurrentRecord() {
                    const convertedFieldValues = ensureSchemaTypes(getFieldType, fields)

                    return recordStore().fold(throwDsOperationFailed, service =>
                        service.setFieldsValues(index, convertedFieldValues, source).fold(
                            e => {
                                throw e
                            },
                            () => {},
                        ),
                    )
                },
            ),
            isQueued: false,
        }),

        revertChanges: (index, defaultDraft) => ({
            run: breadcrumbReportingFor('revertChanges', function revertChanges() {
                recordStore().chain(service => service.resetDraft(index, defaultDraft))

                // This updateComponentsBasedOnRecord is still needed because of upload buttons' behaviour.
                // Upload buttons, when a file is selected, do not update the record data, but still
                // need to be reverted to clear that selection. Therefore, the revert action must always
                // call the adapters' currentRecordModified event.
                updateComponents()
            }),
            isQueued: false,
            resultActionCreator: recordsActions.revertResult,
        }),

        saveRecord: (index, record) => ({
            run: breadcrumbReportingFor('saveRecord', async function saveRecord() {
                await executeBeforeSaveHooks(executeHooks)
                return recordStore().fold(
                    () => false,
                    async service => {
                        if (service.hasDraft(index)) {
                            assertComponentsValid(record)

                            const afterSaveRecord = await service.saveRecord(index)
                            fireEventByName('afterSave', record, afterSaveRecord)
                            dispatcher.dispatch('afterSave', record, afterSaveRecord)
                            return afterSaveRecord
                        }
                    },
                )
            }),
            isQueued: true,
            resultActionCreator: recordsActions.saveRecordResult,
        }),

        removeCurrentRecord: index => ({
            run: breadcrumbReportingFor('removeCurrentRecord', () =>
                removeRecordByIndex(index),
            ),
            isQueued: true,
            resultActionCreator: recordsActions.removeCurrentRecordResult,
        }),

        newRecord: (atIndex, defaultDraft) => ({
            run: breadcrumbReportingFor('newRecord', () =>
                newRecordAtIndex(atIndex, defaultDraft),
            ),
            isQueued: true,
            resultActionCreator: recordsActions.newRecordResult,
        }),

        fireEvent: (eventName, ...payload) => ({
            run: breadcrumbReportingFor('fireEvent', () =>
                fireEventByName(eventName, ...payload),
            ),
            isQueued: false,
        }),

        notifyIndexChange: toCurrentIndex => ({
            run: breadcrumbReportingFor('notifyIndexChange', () => {
                notifyIndexChange()
                fireEventByName('currentIndexChanged', toCurrentIndex)
            }),
            isQueued: false,
        }),

        notifyRecordSetLoaded: () => ({
            run: breadcrumbReportingFor(
                'notifyRecordSetLoaded',
                notifyRecordSetLoaded,
            ),
            isQueued: true,
        }),

        updateCurrentView: actionType => ({
            run: breadcrumbReportingFor('updateCurrentView', () =>
                updateCurrentView(actionType),
            ),
            isQueued: true,
            resultActionCreator: recordsActions.updateCurrentViewResult,
        }),

        refresh: (index, defaultDraft, isWriteOnly) => ({
            run: breadcrumbReportingFor('refresh', async function refresh() {
                return recordStore().fold(throwDsOperationFailed, async service => {
                    service.reset()

                    return isWriteOnly ?
                        recordsActions.GoToIndexResult.Record(
                            0,
                            service.newRecord(0, defaultDraft),
                        ) :
                        service.getRecords(0, 1).then(queryResult =>
                            queryResult.matchWith({
                                Empty: () => recordsActions.GoToIndexResult.NoRecord(),
                                Results: ({
                                        items
                                    }) =>
                                    recordsActions.GoToIndexResult.Record(0, items[0]),
                            }),
                        )
                })
            }),
            isQueued: true,
            resultActionCreator: recordsActions.refreshResult,
        }),

        updateComponents: (compIdsToExclude, previousRecord) => ({
            run: breadcrumbReportingFor('updateComponents', () => {
                updateComponents(compIdsToExclude, previousRecord)
            }),
            isQueued: false,
        }),
    }
}

export default effectsCreator