export const createScopedDatasetId = (datasetId, {
    repeaterId,
    itemId
}) => [datasetId, 'componentId', repeaterId, 'itemId', itemId].join('_')

export const extractRealDatasetId = datasetId =>
    datasetId.split('_componentId_')[0]