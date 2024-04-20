import * as modes from '@wix/wix-data-client-common-standalone'
import isCompConfiguredToReadData from '../helpers/isCompConfiguredToReadData'
import isForm from '../helpers/isForm'
import {
    getReadWriteMode,
    getCollectionName,
    selectCurrentRecord,
} from '../dataset-controller/rootReducer'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'
import {
    DataBindingBi
} from '.'

const {
    READ_WRITE,
    READ
} = modes
const reportDatasetActiveOnPage = (
    state,
    connections,
    datasetType,
    isScoped,
    datasetId,
    schema,
) => {
    if (isScoped) {
        return
    }
    const collectionId = getCollectionName(state)
    if (!collectionId) {
        return
    }
    const collectionName = schema.fold(
        () => collectionId,
        schema => schema.displayName,
    )

    const datasetMode = getReadWriteMode(state)
    const someRecordLoaded = !!selectCurrentRecord(state)

    const {
        logger,
        platform: {
            settings: {
                env: {
                    editor: isEditor
                },
            },
        },
    } = appContext

    if (
        someRecordLoaded && [READ_WRITE, READ].includes(datasetMode) &&
        connections.find(({
                role,
                config
            }) =>
            isCompConfiguredToReadData(role, config),
        )
    ) {
        logger.log(
            new DataBindingBi({
                id: isEditor ? 153 : 152,
                collectionId,
                collectionName,
                datasetId,
                datasetType,
                datasetMode,
            }),
        )
    }

    if (isForm(getReadWriteMode(state), connections)) {
        logger.log(
            new DataBindingBi({
                id: isEditor ? 157 : 156,
                collectionId,
                collectionName,
                datasetId,
                datasetType,
                datasetMode,
            }),
        )
    }
}

const reportUserDataFilteringBI = ({
    state,
    numberOfResults,
    filteredBy,
    componentType,
    fieldType,
    schema,
}) => {
    const {
        logger,
        platform: {
            settings: {
                env: {
                    editor: isEditor
                },
            },
        },
    } = appContext

    const datasetMode = getReadWriteMode(state)
    const collectionId = getCollectionName(state)
    if (!collectionId) {
        return
    }
    const collectionName = schema.getOrElse({
        displayName: collectionId,
    }).displayName

    logger.log(
        new DataBindingBi({
            id: isEditor ? 366 : 371,
            collectionId,
            collectionName,
            datasetMode,
            numberOfResults,
            filteredBy,
            componentType,
            fieldType,
        }),
    )
}

export {
    reportDatasetActiveOnPage,
    reportUserDataFilteringBI
}