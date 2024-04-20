import {
    includes,
    isFunction,
    isNumber,
    isInteger
} from 'lodash'
import {
    isDatasetConfigured,
    getReadWriteMode,
    isDuringSave,
    isDatasetReady,
} from '../dataset-controller/rootReducer'
import {
    getCurrentItemIndex
} from '../helpers/paginationUtils'
import * as DATASET_TYPES from '@wix/wix-data-client-common/dist/esm/datasetTypes'
import * as modes from '@wix/wix-data-client-common-standalone'
import {
    DatasetError
} from '../logger'

const {
    READ,
    WRITE,
    READ_WRITE
} = modes
const datasetModeToMessage = {
    [READ]: 'read-only',
    [WRITE]: 'write-only',
    [READ_WRITE]: 'read-write',
}

// TODO: convert to error handling decorators

const assertDatasetConfigured = (getState, operationName, datasetType) => {
    if (!isDatasetConfigured(getState())) {
        throw new DatasetError(
            datasetType === DATASET_TYPES.ROUTER_DATASET ?
            `Operation (${operationName}) is not allowed because the field used to build this page's URL is empty` :
            `Operation (${operationName}) not allowed on an unconfigured dataset`, {
                code: 'OPERATION_NOT_ALLOWED'
            },
        )
    }
}

const assertDatasetMode = (getState, operationName, allowedModes = []) => {
    const readWriteMode = getReadWriteMode(getState())
    if (!includes(allowedModes, readWriteMode)) {
        throw new DatasetError(
            `Operation (${operationName}) not allowed on ${datasetModeToMessage[readWriteMode]} dataset`, {
                code: 'OPERATION_NOT_ALLOWED'
            },
        )
    }
}

const assertOffsetPagingMode = (isCursorPaging, operationName) => {
    if (isCursorPaging) {
        throw new DatasetError(
            `Operation (${operationName}) not allowed on a dataset with non-offset paging mode`, {
                code: 'OPERATION_NOT_ALLOWED'
            },
        )
    }
}

const assertSaveNotInProgress = (getState, operationName) => {
    if (isDuringSave(getState())) {
        throw new DatasetError(
            `Operation (${operationName}) not allowed during save`, {
                code: 'OPERATION_NOT_ALLOWED'
            },
        )
    }
}

const assertDatasetLimitations = (
    getState,
    operationName = '',
    allowedModes,
    datasetType,
    isSupportedDuringSave = true,
) => {
    assertDatasetConfigured(getState, operationName, datasetType)
    assertDatasetMode(getState, operationName, allowedModes)
    if (!isSupportedDuringSave) {
        assertSaveNotInProgress(getState, operationName)
    }
}

const assertValidIndex = index => {
    if (!isInteger(index)) {
        throw new DatasetError(`Parameter (${index}) must be a number`, {
            code: 'PARAMETER_NOT_ALLOWED',
        })
    }
}

const assertValidNumberArgument = (argName, argValue) => {
    if (!isNumber(argValue)) {
        throw new DatasetError(`Parameter (${argName}) must be a number`, {
            code: 'DS_INVALID_ARGUMENT',
        })
    }
}

const assertValidNaturalNumber = (argName, argValue) => {
    if (!isInteger(argValue) || argValue < 1) {
        throw new DatasetError(
            `Parameter (${argName}) must be a positive integer number`, {
                code: 'DS_INVALID_ARGUMENT'
            },
        )
    }
}

const assertValidPageIndex = (pageIndex, totalPageCount) => {
    assertValidNaturalNumber('pageNumber', pageIndex)
    if (pageIndex > totalPageCount) {
        throw new DatasetError(`Page ${pageIndex} does not exist`, {
            code: 'NO_SUCH_PAGE',
        })
    }
}

const assertValidNewItemIndex = ({
    index,
    datasetSize: {
        total,
        loaded
    }
}) => {
    if (index < 0 || index > Math.max(total, loaded)) {
        throw new DatasetError('Invalid index', {
            code: 'DS_INDEX_OUT_OF_RANGE',
        })
    }
}

const assertValidCallback = (operationName, cb) => {
    if (!isFunction(cb)) {
        throw new DatasetError(
            `The callback passed to (${operationName}) must be a function`, {
                code: 'DS_INVALID_ARGUMENT'
            },
        )
    }
}

const assertValidFilter = filter => {
    if (!filter || !isFunction(filter._build)) {
        throw new DatasetError(`The given filter object is invalid`, {
            code: 'DS_INVALID_ARGUMENT',
        })
    }
}

const assertValidSort = sort => {
    if (!sort || !isFunction(sort._build)) {
        throw new DatasetError(`The given sort object is invalid`, {
            code: 'DS_INVALID_ARGUMENT',
        })
    }
}

const assertDatasetReady = (getState, operationName) => {
    if (!isDatasetReady(getState())) {
        throw new DatasetError(
            `The dataset didn't load yet. You need to call ${operationName} inside the onReady for the dataset.`, {
                code: 'DS_NOT_LOADED'
            },
        )
    }
}

const assertHasCurrentItem = getState => {
    const index = getCurrentItemIndex({
        state: getState()
    })
    if (index == null) {
        throw new DatasetError('There is no current item', {
            code: 'DS_NO_CURRENT_ITEM',
        })
    }
}

const assertScopeIsNotFixedItem = (isFixedItem, operationName) => {
    if (isFixedItem) {
        throw new DatasetError(
            `The "${operationName}" function cannot be called on the dataset because the dataset was selected using a repeated item scope selector.\nRead more about repeated item scope selectors: http://wix.to/94BuAAs/$w.Repeater.html#repeated-item-scope`, {
                code: 'OPERATION_NOT_ALLOWED'
            },
        )
    }
}

const assertDatasetTypeIsRouter = (datasetType, operationName) => {
    if (datasetType !== DATASET_TYPES.ROUTER_DATASET) {
        throw new DatasetError(
            `"${operationName}" function on the dataset is not allowed. "${operationName}" can only be called on a Dynamic Page Dataset.`, {
                code: 'OPERATION_NOT_ALLOWED'
            },
        )
    }
}

export {
    assertDatasetLimitations,
    assertOffsetPagingMode,
    assertDatasetReady,
    assertHasCurrentItem,
    assertScopeIsNotFixedItem,
    assertValidCallback,
    assertValidFilter,
    assertValidIndex,
    assertValidNumberArgument,
    assertValidSort,
    assertValidNaturalNumber,
    assertValidPageIndex,
    assertValidNewItemIndex,
    assertDatasetTypeIsRouter,
}