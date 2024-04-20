import {
    includes,
    get,
    uniqBy,
    noop
} from 'lodash'
import {
    Breadcrumb
} from '../logger'
import {
    isDatasetReady,
    isReadOnly,
    isEditable,
    selectNextDynamicPageUrl,
    selectPreviousDynamicPageUrl,
} from '../dataset-controller/rootReducer'
import {
    canLoadMoreItems,
    hasNextItem,
    hasPreviousItem,
    hasNextPage,
    hasPreviousPage,
} from '../helpers/paginationUtils'
import {
    DROPDOWN_OPTIONS_ROLE,
    MOBUI_PICKER_OPTIONS_ROLE,
    USER_INPUT_FILTER_V1_ROLE,
    BUTTON_ROLE,
    ICON_BUTTON_ROLE,
    STYLABLE_BUTTON_ROLE,
    SELECTION_TAGS_OPTIONS_ROLE,
} from '@wix/wix-data-client-common-standalone'
import {
    USER_INPUT_FILTER_ROLES
} from '../helpers/constants'

const LINKABLE_DISABLEABLE_COMPONENTS = [
    BUTTON_ROLE,
    ICON_BUTTON_ROLE,
    STYLABLE_BUTTON_ROLE,
]

const undisableableRoles = [
    DROPDOWN_OPTIONS_ROLE,
    MOBUI_PICKER_OPTIONS_ROLE,
    USER_INPUT_FILTER_V1_ROLE,
    SELECTION_TAGS_OPTIONS_ROLE,
    ...USER_INPUT_FILTER_ROLES,
]

const getDisableableInputComponents = components =>
    components.filter(
        ({
            role,
            isInput
        }) => isInput && !undisableableRoles.includes(role),
    )

const getDisableableLinkedComponents = (components, disableableActions) =>
    components
    .filter(({
        role
    }) => includes(LINKABLE_DISABLEABLE_COMPONENTS, role))
    .filter(({
            connectionConfig
        }) =>
        includes(
            disableableActions,
            get(connectionConfig, 'events.onClick.action'),
        ),
    )

const getDisableableComponents = (components, disableableActions) => {
    const uniqueDisableableComponents = uniqBy(
        components.filter(({
            enabled
        }) => enabled),
        ({
            id
        }) => id,
    )

    return {
        inputComponents: getDisableableInputComponents(uniqueDisableableComponents),
        linkedComponents: getDisableableLinkedComponents(
            uniqueDisableableComponents,
            disableableActions,
        ),
    }
}

const updateComponentEnabledState = (
    component,
    shouldBeEnabled,
    logger,
    datasetId,
) => {
    if (component.enabled !== shouldBeEnabled) {
        if (shouldBeEnabled) {
            component.enable()
        } else {
            component.disable()
        }
        logger.log(
            new Breadcrumb({
                category: 'components',
                message: `${component.id} changed to ${
          shouldBeEnabled ? 'enabled' : 'disabled'
        } (dataset: ${datasetId})`,
            }),
        )
    }
}

const getSyncComponentsWithStateSubscriber =
    ({
        getState,
        inputComponents,
        linkedComponents,
        datasetId,
        logger,
        shouldEnableLinkedComponent,
    }) =>
    () => {
        const state = getState()
        if (!isDatasetReady(state)) {
            return
        }

        const shouldInputComponentsBeEnabled = isEditable(state)
        inputComponents.forEach(component => {
            updateComponentEnabledState(
                component,
                shouldInputComponentsBeEnabled,
                logger,
                datasetId,
            )
        })

        linkedComponents.forEach(component => {
            const {
                action
            } = component.connectionConfig.events.onClick
            const shouldBeEnabled = shouldEnableLinkedComponent[action]()
            updateComponentEnabledState(component, shouldBeEnabled, logger, datasetId)
        })
    }

const syncEnabledStateForComponentsNotDisabledByUser = ({
        getState,
        subscribe
    },
    connectedComponents,
    logger,
    datasetId,
    recordStore,
) => {
    const shouldEnableLinkedComponent = {
        new: () => !isReadOnly(getState()),
        save: () => isEditable(getState()),
        revert: () => isEditable(getState()),
        remove: () => isEditable(getState()),
        next: () =>
            hasNextItem({
                state: getState(),
                recordStore,
            }),
        previous: () => hasPreviousItem({
            state: getState()
        }),
        nextPage: () =>
            hasNextPage({
                state: getState(),
                recordStore,
            }),
        previousPage: () => hasPreviousPage({
            state: getState()
        }),
        nextDynamicPage: () => selectNextDynamicPageUrl(getState()).hasUrl(),
        previousDynamicPage: () =>
            selectPreviousDynamicPageUrl(getState()).hasUrl(),
        loadMore: () =>
            canLoadMoreItems({
                state: getState(),
                recordStore,
            }),
    }

    const {
        inputComponents,
        linkedComponents
    } = getDisableableComponents(
        connectedComponents,
        Object.keys(shouldEnableLinkedComponent),
    )

    const quantityOfDisableableComponents =
        inputComponents.length + linkedComponents.length

    const unsubscribe = quantityOfDisableableComponents ?
        subscribe(
            getSyncComponentsWithStateSubscriber({
                getState,
                inputComponents,
                linkedComponents,
                datasetId,
                logger,
                shouldEnableLinkedComponent,
            }),
        ) :
        noop

    return unsubscribe
}

export default (store, connectedComponents, logger, datasetId, recordStore) => {
    return syncEnabledStateForComponentsNotDisabledByUser(
        store,
        connectedComponents,
        logger,
        datasetId,
        recordStore,
    )
}