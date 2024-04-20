import {
    cloneDeep,
    isEqual,
    flatten
} from 'lodash'
import {
    isSameRecord
} from '../record-store'
import {
    getPageSize
} from '../helpers/paginationUtils'
import {
    getPaginationData,
    isWriteOnly,
    selectCurrentRecord,
    selectCurrentRecordIndex,
    selectDefaultDraft,
    selectDesiredRecordIndex,
    selectFieldsToUpdate,
    selectNewRecordIndex,
    selectRefreshController,
    selectRefreshCurrentRecord,
    selectRefreshCurrentView,
    selectRemoveCurrentRecord,
    selectRevertChanges,
    selectSaveRecord,
    selectUpdateSource,
} from './rootReducer'
import effectsCreator from './effects'

const _getPageSize = state => getPageSize({
    state
})

export default (
    recordStore,
    databindingApi,
    getFieldType,
    executeHooks,
    controllerId,
    connectedComponents,
    fireEvent,
    dispatcher,
) => {
    const effects = effectsCreator(
        recordStore,
        databindingApi,
        getFieldType,
        executeHooks,
        controllerId,
        connectedComponents,
        fireEvent,
        dispatcher,
    )

    const processIndexChanges = ({
        from,
        to,
        hasChanged,
        hasChangedToFalse,
        hasChangedToTrue,
        hasChangedToMatch,
    }) => {
        const toCurrentIndex = selectCurrentRecordIndex(to)
        const fromCurrentIndex = selectCurrentRecordIndex(from)
        const toDesiredIndex = selectDesiredRecordIndex(to)
        const toRefreshCurrentRecord = selectRefreshCurrentRecord(to)
        const effectsToReturn = []

        if (
            hasChangedToMatch(
                selectDesiredRecordIndex,
                desiredRecordIndex =>
                desiredRecordIndex >= 0 && desiredRecordIndex !== toCurrentIndex,
            ) ||
            hasChangedToTrue(selectRefreshCurrentRecord)
        ) {
            effectsToReturn.push(
                effects.goToRecordByIndex(
                    fromCurrentIndex,
                    toDesiredIndex,
                    toRefreshCurrentRecord,
                ),
            )
        }

        if (
            (hasChanged(selectCurrentRecordIndex) && fromCurrentIndex >= 0) ||
            (hasChangedToFalse(selectRefreshController) && toCurrentIndex === 0)
        ) {
            effectsToReturn.push(effects.notifyIndexChange(toCurrentIndex))
        }

        return effectsToReturn
    }

    const processRecordChanges = ({
        from,
        to,
        hasChanged,
        hasChangedToMatch,
        hasChangedToTrue,
    }) => {
        const toCurrentIndex = selectCurrentRecordIndex(to)
        const toCurrentRecord = selectCurrentRecord(to)
        const fromCurrentRecord = selectCurrentRecord(from)
        const effectsToReturn = []

        if (isSameRecord(fromCurrentRecord, toCurrentRecord)) {
            if (!isEqual(fromCurrentRecord, toCurrentRecord)) {
                effectsToReturn.push(
                    effects.updateComponents(selectUpdateSource(to), fromCurrentRecord),
                )
                effectsToReturn.push(
                    effects.fireEvent(
                        'itemValuesChanged',
                        cloneDeep(fromCurrentRecord),
                        cloneDeep(toCurrentRecord),
                    ),
                )
            }
        } else if (
            fromCurrentRecord != null &&
            toCurrentRecord != null &&
            !hasChanged(selectCurrentRecordIndex)
        ) {
            effectsToReturn.push(effects.updateComponents())
        }

        const toFieldsToUpdate = selectFieldsToUpdate(to)
        if (
            hasChangedToMatch(
                selectFieldsToUpdate,
                fieldsToUpdate => fieldsToUpdate != null,
            )
        ) {
            effectsToReturn.push(
                effects.setFieldsInCurrentRecord(
                    toFieldsToUpdate,
                    toCurrentIndex,
                    selectUpdateSource(to),
                ),
            )
        }

        if (hasChangedToTrue(selectRevertChanges)) {
            effectsToReturn.push(
                effects.revertChanges(toCurrentIndex, selectDefaultDraft(to)),
            )
        }

        if (hasChangedToTrue(selectRemoveCurrentRecord)) {
            effectsToReturn.push(effects.removeCurrentRecord(toCurrentIndex))
        }

        return effectsToReturn
    }

    const processViewChanges = ({
        to,
        hasChanged,
        hasChangedToFalse,
        hasChangedToTrue,
    }) => {
        const effectsToReturn = []

        if (hasChanged(_getPageSize)) {
            effectsToReturn.push(
                effects.refresh(
                    selectCurrentRecordIndex(to),
                    selectDefaultDraft(to),
                    isWriteOnly(to),
                ),
            )
        }

        if (hasChanged(getPaginationData)) {
            effectsToReturn.push(effects.notifyRecordSetLoaded())
        }

        if (hasChangedToTrue(selectRefreshController)) {
            effectsToReturn.push(
                effects.refresh(
                    selectCurrentRecordIndex(to),
                    selectDefaultDraft(to),
                    isWriteOnly(to),
                ),
            )
        }

        if (hasChangedToFalse(selectRefreshController)) {
            effectsToReturn.push(effects.notifyRecordSetLoaded())
        }

        if (hasChangedToTrue(selectRefreshCurrentView)) {
            effectsToReturn.push(effects.updateCurrentView())
        }

        return effectsToReturn
    }

    const processSaveStates = ({
        to,
        hasChangedToTrue
    }) => {
        const toCurrentIndex = selectCurrentRecordIndex(to)
        const toCurrentRecord = selectCurrentRecord(to)

        if (hasChangedToTrue(selectSaveRecord)) {
            return effects.saveRecord(toCurrentIndex, toCurrentRecord)
        }
    }

    const processNewRecord = ({
        to,
        hasChangedToNotNull
    }) => {
        const effectsToReturn = []
        if (hasChangedToNotNull(selectNewRecordIndex)) {
            effectsToReturn.push(
                effects.newRecord(selectNewRecordIndex(to), selectDefaultDraft(to)),
            )
        }

        return effectsToReturn
    }

    return transition =>
        flatten(
            [
                processIndexChanges,
                processRecordChanges,
                processViewChanges,
                processSaveStates,
                processNewRecord,
            ].map(fn => fn(transition)),
        )
}