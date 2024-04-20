import {
    cloneDeep,
    noop
} from 'lodash'
import createControllerStore from '../dataset-controller/controllerStore'
import initCreateDataset from '../dataset-controller/controller'
import {
    createScopedDatasetId
} from '../helpers/scopedDatasetUtils'

const controllerFactory = (logger, datasetParams) => {
    const controllerStore = createControllerStore(logger)
    const factory = {
        createRealDataset: () =>
            createDataset({ ...datasetParams,
                isScoped: false
            }),

        createScopedDetailsDataset: ({
                datasetScope
            }) =>
            createDataset({
                ...datasetParams,
                isScoped: true,
                firePlatformEvent: noop,
                datasetId: createScopedDatasetId(datasetParams.datasetId, datasetScope),
                datasetScope,
            }),

        createScopedDataset: ({
            datasetScope,
            fixedItem
        }) => {
            const {
                dataProvider,
                controllerConfig,
                dynamicPagesData
            } = datasetParams
            const newControllerConfig = cloneDeep(controllerConfig)
            const fixedData = {
                items: [fixedItem]
            }
            newControllerConfig.dataset.filter = dataProvider.createSimpleFilter(
                '_id',
                fixedItem._id,
            )

            // TODO: case for repeater whose data is set via userCode. We should everything only via datasetAPI
            const {
                collectionName: collectionId
            } = controllerConfig.dataset
            dataProvider.setCollectionData({
                collectionId,
                data: fixedData
            })

            return createDataset({
                ...datasetParams,
                isScoped: true,
                controllerConfig: newControllerConfig,
                firePlatformEvent: noop,
                dynamicPagesData,
                datasetId: createScopedDatasetId(datasetParams.datasetId, datasetScope),
                fixedRecordId: datasetScope.itemId,
            })
        },
    }
    const createDataset = initCreateDataset(factory, controllerStore)

    return factory
}

export default controllerFactory