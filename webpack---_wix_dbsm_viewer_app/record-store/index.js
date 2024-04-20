import {
    get
} from 'lodash'
import {
    Result
} from '@wix/wix-data-client-wix-code-adt'
import {
    getFieldReferencedCollection
} from '../data/utils'
import {
    isSameRecord
} from './records'
import recordStoreServiceCreator from './service'

const createRecordStoreService = ({
    primaryDatasetId,
    recordStoreCache,
    refreshStoreCache,
    dataProvider,
    controllerConfig,
}) => {
    const datasetConfig = Result.fromNullable(
        controllerConfig,
        'missing controller configuration',
    ).chain(({
            dataset
        }) =>
        Result.fromNullable(
            dataset,
            'controller configuration is missing dataset object',
        ),
    )
    const collectionName = datasetConfig.chain(({
            collectionName
        }) =>
        Result.fromNullable(
            collectionName,
            'dataset is not connected to a collection',
        ),
    )

    return collectionName.map(mainCollectionName => {
        const includes = get(controllerConfig, ['dataset', 'includes'])
        const nestedFieldKeys = get(controllerConfig, ['dataset', 'nested'])
        const cursorPagingRequired = get(controllerConfig, ['dataset', 'cursor'])
        const readWriteType = get(controllerConfig, ['dataset', 'readWriteType'])
        const uniqueFieldValues = get(controllerConfig, [
            'dataset',
            'uniqueFieldValues',
        ])

        return recordStoreServiceCreator({
            primaryDatasetId,
            recordStoreCache,
            refreshStoreCache,
            dataProvider,
            mainCollectionName,
            includes,
            nestedFieldKeys,
            uniqueFieldValues,
            readWriteType,
            cursorPagingRequired,
        })
    })
}

const createRecordStoreInstance = ({
    recordStoreService,
    getFilter,
    getSort,
    getPageSize,
    datasetId,
    filterResolver,
    getSchema,
    fixedRecordId,
}) => {
    return byRefField => {
        const pageSize = getPageSize()

        return recordStoreService.chain(service => {
            if (byRefField) {
                return Result.fromMaybe(
                    getSchema().map(schema =>
                        getFieldReferencedCollection(byRefField, schema),
                    ),
                    `cannot resolve referenced collection name for field ${byRefField}`,
                ).map(referencedCollectionName => {
                    return service({
                        pageSize,
                        sort: null,
                        filter: null,
                        datasetId,
                        referencedCollectionName,
                        fixedRecordId,
                    })
                })
            } else {
                const unresolvedFilter = getFilter()

                return Result.fromMaybe(
                    filterResolver(unresolvedFilter).map(filter =>
                        service({
                            pageSize,
                            sort: getSort(),
                            filter,
                            datasetId,
                            referencedCollectionName: null,
                            fixedRecordId,
                        }),
                    ),
                    'could not resolve dynamic filter',
                )
            }
        })
    }
}

export {
    isSameRecord,
    createRecordStoreService,
    createRecordStoreInstance
}