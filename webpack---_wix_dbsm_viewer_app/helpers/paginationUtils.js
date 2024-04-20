import {
    getPaginationData as selectPaginationData,
    selectCurrentRecordIndex,
} from '../dataset-controller/rootReducer'
import {
    appContext
} from '../../src/viewer-app-module/DataBindingAppContext'

export const isCursorPaging = ({
        recordStore
    }) =>
    recordStore().fold(
        () => null,
        service => service.isCursorPaging(),
    )

export const getPageSize = ({
    state
}) => {
    const {
        size
    } = selectPaginationData(state)
    return size
}

export const getPageOffset = ({
    state
}) => {
    const {
        offset
    } = selectPaginationData(state)
    return offset
}

export const getNumberOfItemsToShow = ({
    state
}) => {
    const {
        size,
        numPagesToShow
    } = selectPaginationData(state)
    return size * numPagesToShow
}

export const getCurrentItemIndex = ({
    state
}) => {
    const currentIndex = selectCurrentRecordIndex(state)
    return currentIndex == null ? null : currentIndex
}

export const getCurrentPageIndex = ({
    state
}) => {
    const currentIndex = getCurrentItemIndex({
        state
    })
    if (currentIndex == null) {
        return null
    }

    const {
        features
    } = appContext
    if (features.newCurrentPageIndex) {
        const {
            size,
            offset
        } = selectPaginationData(state)
        return offset / size + 1
    }

    const {
        size,
        offset,
        numPagesToShow
    } = selectPaginationData(state)
    return offset / size + numPagesToShow
}

export const getDatasetSize = ({
        recordStore
    }) =>
    recordStore().fold(
        () => null,
        service => service.getDatasetSize(),
    )

export const getTotalRecordCount = ({
    recordStore
}) => {
    const datasetSize = getDatasetSize({
        recordStore
    })
    if (!datasetSize) {
        return null
    }
    return datasetSize.total
}

export const getTotalPageCount = ({
    state,
    recordStore
}) => {
    const datasetSize = getDatasetSize({
        recordStore
    })
    if (!datasetSize) {
        return null
    }
    return Math.ceil(datasetSize.total / getPageSize({
        state
    }))
}

export const hasCursorToLoadMore = ({
        recordStore
    }) =>
    recordStore().fold(
        () => false,
        service => {
            const datasetSize = service.getDatasetSize()
            return service.isCursorPaging() && !!datasetSize ? .cursor
        },
    )

export const canLoadMoreItems = ({
    state,
    recordStore
}) => {
    if (hasCursorToLoadMore({
            recordStore
        })) {
        return true
    }
    const datasetSize = getDatasetSize({
        recordStore,
    })
    if (!datasetSize) {
        return false
    }
    const offset = getPageOffset({
        state
    })
    const items = getNumberOfItemsToShow({
        state
    })
    return offset + items < datasetSize.total
}

export const hasPreviousItem = ({
    state
}) => {
    const currentIndex = getCurrentItemIndex({
        state
    })
    return currentIndex != null && currentIndex > 0
}

export const hasNextItem = ({
    state,
    recordStore
}) => {
    if (hasCursorToLoadMore({
            recordStore
        })) {
        return true
    }
    const datasetSize = getDatasetSize({
        recordStore
    })
    if (!datasetSize) {
        return false
    }
    const currentIndex = getCurrentItemIndex({
        state
    })

    return currentIndex != null && currentIndex < datasetSize.total - 1
}

export const hasPreviousPage = ({
    state
}) => {
    const {
        offset
    } = selectPaginationData(state)
    return offset > 0
}

export const hasNextPage = ({
    state,
    recordStore
}) => {
    if (hasCursorToLoadMore({
            recordStore
        })) {
        return true
    }
    const datasetSize = getDatasetSize({
        recordStore
    })
    if (!datasetSize) {
        return false
    }
    const {
        offset,
        size: pageSize
    } = selectPaginationData(state)
    return offset + pageSize < datasetSize.total
}

export const isDatasetEmpty = ({
        loaded,
        total,
        cursor
    }) =>
    !loaded && !total && !cursor

export const getNewItemIndex = ({
    state
}) => {
    const currentItemIndex = getCurrentItemIndex({
        state
    })
    return currentItemIndex == null ? 0 : currentItemIndex + 1
}

export const getNormalizedIndex = ({
    recordStore,
    index
}) => {
    const {
        total,
        loaded
    } = recordStore().fold(
        error => {
            throw error
        },
        service => service.getDatasetSize(),
    )
    return Math.max(Math.min(index, Math.max(total, loaded) - 1), 0)
}

export const calculateUpperBound = ({
    from,
    length,
    datasetSize,
    cursorPaging,
}) => {
    if (!datasetSize) {
        return from + length
    }

    const {
        total,
        loaded,
        cursor
    } = datasetSize

    const upperBound = cursorPaging ? (cursor ? Infinity : loaded) : total

    return Math.min(from + length, upperBound)
}

export const loadItemsUpToIndex = async ({
    index,
    recordStore
}) => {
    await recordStore().fold(
        () => {},
        service => service.getRecords(index, 1),
    )
}