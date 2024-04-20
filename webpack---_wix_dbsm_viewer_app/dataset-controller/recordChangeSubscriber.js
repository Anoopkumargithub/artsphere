import {
    isNull
} from 'lodash'
import {
    selectCurrentRecord
} from './rootReducer'
import {
    isSameRecord
} from '../record-store'
import recordActions from '../records/actions'
import {
    getCurrentItemIndex
} from '../helpers/paginationUtils'
import {
    AppError
} from '../logger'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'

export const createRecordChangeSubscriber = (getState, dispatch) => {
    const {
        logger
    } = appContext
    const areArgumentsIllegal = (before, after) => isNull(before) && isNull(after)
    const recordWasAdded = before => isNull(before)
    const recordWasDeleted = (before, after) => isNull(after)
    const currentRecordWasChanged = (changedRecord, currentRecord) =>
        isSameRecord(changedRecord, currentRecord)

    return (before, after, componentIdToExclude) => {
        const argsAreIllegal = areArgumentsIllegal(before, after)
        if (argsAreIllegal) {
            logger.log(
                new AppError('onChangeHandler invoked with illegal arguments', {
                    extra: {
                        arguments: {
                            before,
                            after,
                            componentIdToExclude
                        }
                    },
                }),
            )
            return
        }

        if (recordWasAdded(before, after)) {
            dispatch(recordActions.refreshCurrentView()).catch(() => {})
            return
        }

        const currentRecord = selectCurrentRecord(getState())

        if (recordWasDeleted(before, after)) {
            if (isSameRecord(before, currentRecord)) {
                dispatch(recordActions.refreshCurrentRecord()).catch(() => {})
            }
            dispatch(recordActions.refreshCurrentView()).catch(() => {})
            return
        }

        if (currentRecordWasChanged(before, currentRecord)) {
            const currentRecordIndex = getCurrentItemIndex({
                state: getState()
            })

            dispatch(
                recordActions.setCurrentRecord(
                    after,
                    currentRecordIndex,
                    componentIdToExclude,
                ),
            ).catch(() => {})
        }
    }
}