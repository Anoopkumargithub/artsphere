import {
    get,
    pick
} from 'lodash'
import {
    defaultDatasetConfiguration
} from '@wix/wix-data-client-common/dist/esm/dataset-configuration/defaults'
import * as readWriteModes from '@wix/wix-data-client-common-standalone'
import actionTypes from './actionTypes'
import rootActions from '../dataset-controller/actions'
import {
    DETAILS_DATASET_ROLE
} from '@wix/wix-data-client-common-standalone'
import * as datasetTypes from '@wix/wix-data-client-common/dist/esm/datasetTypes'
import {
    USER_INPUT_FILTER_ROLES
} from '../helpers/constants'
import {
    isValidUserInputFilterConnectionConfig
} from '../helpers/isValidUserInputFilterConfig'

const {
    WRITE
} = readWriteModes
const {
    ROUTER_DATASET
} = datasetTypes
const canonicalConfigProperties = [
    'collectionName',
    'readWriteType',
    'includes',
    'cursor',
]
const transientConfigProperties = ['filter', 'sort']

const getCanonicalConfig = datasetConfig =>
    pick(datasetConfig, canonicalConfigProperties)
const getTransientConfig = datasetConfig =>
    pick(datasetConfig, transientConfigProperties)
const getCanonicalCalculatedData = ({
    datasetConfig,
    connections,
    isScoped,
    datasetType,
}) => {
    const datasetIsRouter = datasetType === ROUTER_DATASET
    const datasetIsMaster = connections.some(
        ({
            role
        }) => role === DETAILS_DATASET_ROLE,
    )
    const datasetIsVirtual = isScoped
    const datasetIsReal = !isScoped
    const datasetIsWriteOnly = datasetConfig.readWriteType === WRITE
    const datasetIsDeferred =
        Boolean(datasetConfig.deferred) &&
        !(
            datasetIsVirtual ||
            datasetIsMaster ||
            datasetIsRouter ||
            datasetIsWriteOnly
        )
    const dynamicPageNavComponentsShouldBeLinked =
        datasetIsRouter && datasetIsReal

    const userFilterConnectionProps = connections
        .filter(
            ({
                role,
                config
            }) =>
            USER_INPUT_FILTER_ROLES.includes(role) &&
            isValidUserInputFilterConnectionConfig(config),
        )
        .map(({
            config: {
                userInputFilter
            },
            role
        }) => ({
            ...userInputFilter,
            role,
        }))

    return {
        datasetIsRouter,
        datasetIsMaster,
        datasetIsVirtual,
        datasetIsReal,
        datasetIsDeferred,
        dynamicPageNavComponentsShouldBeLinked,
        userFilterConnectionProps,
    }
}

const assignTransientData = (state, transientData) => {
    return {
        ...state,

        transientData: {
            ...state.transientData,
            ...transientData,
        },
    }
}

const initialState = {
    canonicalData: getCanonicalConfig(defaultDatasetConfiguration),
    canonicalCalculatedData: {},
    transientData: {
        isDatasetReady: false,
        ...getTransientConfig(defaultDatasetConfiguration),
    },
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case rootActions.actionTypes.INIT:
            {
                const {
                    datasetConfig,
                    connections,
                    isScoped,
                    datasetType
                } = action
                return {
                    ...state,

                    canonicalData: {
                        ...state.canonicalData,
                        ...getCanonicalConfig(action.datasetConfig),
                    },

                    canonicalCalculatedData: getCanonicalCalculatedData({
                        datasetConfig,
                        connections,
                        isScoped,
                        datasetType,
                    }),
                    transientData: {
                        ...state.transientData,
                        ...getTransientConfig(action.datasetConfig),
                    },
                }
            }

        case actionTypes.SET_FILTER:
            {
                const {
                    filter
                } = action

                return assignTransientData(state, {
                    filter
                })
            }

        case actionTypes.SET_SORT:
            {
                const {
                    sort
                } = action

                return assignTransientData(state, {
                    sort
                })
            }

        case actionTypes.SET_IS_DATASET_READY:
            {
                const {
                    isDatasetReady
                } = action

                return assignTransientData(state, {
                    isDatasetReady
                })
            }

        case actionTypes.SET_FIXED_FILTER_ITEM:
            {
                const {
                    fixedFilterItem
                } = action

                return assignTransientData(state, {
                    fixedFilterItem
                })
            }

        default:
            return state
    }
}

export default {
    reducer,

    isWriteOnly: state =>
        get(state, ['canonicalData', 'readWriteType']) === readWriteModes.WRITE,

    isReadOnly: state =>
        get(state, ['canonicalData', 'readWriteType']) === readWriteModes.READ,

    getReadWriteMode: state => get(state, ['canonicalData', 'readWriteType']),

    isDatasetReady: state => get(state, ['transientData', 'isDatasetReady']),

    isDatasetConfigured: state =>
        !!get(state, ['canonicalData', 'collectionName']),

    isCursorPagingRequired: state => !!get(state, ['canonicalData', 'cursor']),

    isDatasetRouter: ({
            canonicalCalculatedData: {
                datasetIsRouter
            }
        }) =>
        datasetIsRouter,

    isDatasetMaster: ({
            canonicalCalculatedData: {
                datasetIsMaster
            }
        }) =>
        datasetIsMaster,

    isDatasetVirtual: ({
            canonicalCalculatedData: {
                datasetIsVirtual
            }
        }) =>
        datasetIsVirtual,

    isDatasetReal: ({
            canonicalCalculatedData: {
                datasetIsReal
            }
        }) =>
        datasetIsReal,

    isDatasetDeferred: ({
            canonicalCalculatedData: {
                datasetIsDeferred
            }
        }) =>
        datasetIsDeferred,

    shouldLinkDynamicPageNavComponents: ({
        canonicalCalculatedData: {
            dynamicPageNavComponentsShouldBeLinked
        },
    }) => dynamicPageNavComponentsShouldBeLinked,

    getUserFilterConnectionProps: ({
        canonicalCalculatedData: {
            userFilterConnectionProps
        },
    }) => userFilterConnectionProps,

    getFixedFilterItem: state => get(state, ['transientData', 'fixedFilterItem']),

    getFilter: state => get(state, ['transientData', 'filter']),

    getSort: state => get(state, ['transientData', 'sort']),

    getIncludes: state => get(state, ['canonicalData', 'includes']) || [],

    getCollectionName: state => get(state, ['canonicalData', 'collectionName']),
}