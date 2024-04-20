import {
    ROUTER_DATASET
} from '@wix/wix-data-client-common/dist/esm/datasetTypes'

const mergeDatasetWithRouter = (dataset, routerData) => {
    const {
        readWriteType
    } = dataset
    const {
        config: {
            dataset: {
                collectionName: collectionId,
                filter,
                sort,
                includes,
                pageSize,
                lowercase,
                seoV2,
            },
        },
        dynamicUrl,
        userDefinedFilter,
    } = routerData

    return {
        ...dataset,
        collectionId,
        filter,
        sort,
        includes,
        pageSize,
        readWriteType,
        dynamicPageData: {
            lowercase,
            dynamicUrl,
            userDefinedFilter,
            seoV2,
        },
    }
}

export const createDatasetConfigs = (controllerConfigs, routerData) =>
    controllerConfigs.map(
        ({
            compId: id,
            config: {
                dataset: {
                    collectionName: collectionId,
                    filter,
                    sort,
                    includes,
                    nested,
                    pageSize,
                    readWriteType,
                    deferred,
                    cursor,
                } = {}, // Router controllerConfig may have an empty dataset
            } = {}, // Or an empty config
            // That's how platform sends it to us. It will be filled with config from routerData
            type,
            connections,
            livePreviewOptions: {
                shouldFetchData: dataIsInvalidated,
                compsIdsToReset: updatedCompIds = [],
            } = {},
        }) => {
            const dataset = {
                id,
                type,
                collectionId,
                filter,
                sort,
                pageSize,
                readWriteType,
                includes,
                nested,
                deferred,
                connections,
                dataIsInvalidated,
                updatedCompIds,
                cursor,
            }

            return type === ROUTER_DATASET && routerData ?
                mergeDatasetWithRouter(dataset, routerData) :
                dataset
        },
    )