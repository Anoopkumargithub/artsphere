import {
    values,
    defaults
} from 'lodash'

import {
    DATASET,
    ROUTER_DATASET,
} from '@wix/wix-data-client-common/dist/esm/datasetTypes'
import {
    DETAILS_DATASET_ROLE
} from '@wix/wix-data-client-common-standalone'
import * as modes from '@wix/wix-data-client-common-standalone'
import {
    defaultDatasetConfiguration
} from '@wix/wix-data-client-common/dist/esm/dataset-configuration/defaults'
import {
    hasDynamicFilter
} from '../filter-resolvers'
import {
    PRIMARY,
    REGULAR,
    UNCONFIGURED
} from '../data/sequenceType'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'
import {
    AppError
} from '../logger'

const {
    WRITE
} = modes

const getDatasetSequenceType = ({
    collectionId,
    datasetHasDynamicFilter,
    datasetIsDeferred,
    datasetIsRouter,
    datasetIsWriteOnly,
}) => {
    if (!collectionId) {
        return UNCONFIGURED
    }
    return !datasetHasDynamicFilter &&
        !datasetIsDeferred &&
        !datasetIsRouter &&
        !datasetIsWriteOnly ?
        PRIMARY :
        REGULAR
}

const getStaticDatasetConfig = (dataset, datasetType, connections) => {
    const {
        readWriteType,
        deferred,
        filter,
        collectionName: collectionId,
    } = dataset
    const datasetIsWriteOnly = readWriteType === WRITE
    const datasetIsMaster = connections.some(
        ({
            role
        }) => role === DETAILS_DATASET_ROLE,
    )
    const datasetIsRouter = datasetType === ROUTER_DATASET
    const datasetIsDeferred =
        Boolean(deferred) &&
        !(datasetIsMaster || datasetIsRouter || datasetIsWriteOnly)

    const datasetHasDynamicFilter = filter && hasDynamicFilter(filter)

    const sequenceType = getDatasetSequenceType({
        collectionId,
        datasetHasDynamicFilter,
        datasetIsDeferred,
        datasetIsRouter,
        datasetIsWriteOnly,
    })

    //TODO: migrate these calculations in redux store, or get rid of redux for dataset settings
    return {
        sequenceType,
        datasetIsWriteOnly,
        datasetIsMaster,
        datasetIsRouter,
        datasetIsDeferred,
        datasetHasDynamicFilter,
    }
}

const completeControllerConfigs = datasetConfigs => {
    //TODO: Split completeControllerConfig. Use new format for dataFetcher instead
    const datasetTypes = values({
        DATASET,
        ROUTER_DATASET,
    })

    return datasetConfigs.map(datasetConfig => {
        const {
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
            dynamicPageData,
            cursor,
        } = datasetConfig
        if (!datasetTypes.includes(type)) {
            appContext.logger.log(
                new AppError(
                    `type of controller MUST be one of ${datasetTypes} but is ${type}`,
                ),
            )
        }

        const dataset = defaults({
                collectionName: collectionId,
                filter,
                sort,
                includes,
                nested,
                pageSize,
                readWriteType,
                cursor,
                deferred,
                uniqueFieldValues: [],
            },
            defaultDatasetConfiguration,
        )

        return {
            id,
            compId: id,
            type,
            livePreviewOptions: {
                shouldFetchData: dataIsInvalidated,
                compsIdsToReset: updatedCompIds,
            },
            connections,
            dynamicPageData,
            config: {
                dataset,
                datasetStaticConfig: getStaticDatasetConfig(dataset, type, connections),
            },
        }
    })
}

export default completeControllerConfigs