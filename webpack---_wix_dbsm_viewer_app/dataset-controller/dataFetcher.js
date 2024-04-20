import seedDataFetcher from './seed'
import {
    Deferred
} from '../helpers'
import {
    hasUserInputDependencies
} from '../filter-resolvers'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'
import {
    getUserFilterConnectionProps
} from './rootReducer'
import {
    setUserFilterInitialData
} from '../records/actions'
import {
    getSort
} from '@wix/wix-data-client-common-standalone'

const getDeferredDependency = (modeIsSSR, queueMicrotask) => {
    const {
        promise: deferringDataFetch,
        resolve: resolveDeferredDataFetcher
    } =
    new Deferred()
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
    // this way we gaurantee deferred controller(dataset) data fetch request
    // to be executed after createControllers returns controllers to the platform
    if (!modeIsSSR) {
        queueMicrotask(resolveDeferredDataFetcher)
    }
    return deferringDataFetch
}
const getUserInputDependency = () => {
    const {
        promise: waitingForUserInput,
        resolve: resolveUserInputDependency
    } =
    new Deferred()
    return {
        waitingForUserInput,
        resolveUserInputDependency
    }
}

const fetchData = ({
    shouldFetchInitialData,
    recordStore,
    store,
    filter,
    sort,
    datasetIsDeferred,
    modeIsSSR,
    queueMicrotask,
    datasetIsReal,
    collectionId,
    filterResolver,
    dependencyManager,
    getSchemas,
    schemasLoading,
    getUserFilterInitialData,
}) => {
    const fetchInitialData = () => {
        const userFilterConnectionProps = getUserFilterConnectionProps(
            store.getState(),
        )
        const seedDataResult = shouldFetchInitialData ?
            seedDataFetcher({
                recordStore
            }) :
            Promise.resolve()

        const shouldFetchUserFilterConnectionProps =
            datasetIsReal && userFilterConnectionProps ? .length > 0
        if (!shouldFetchUserFilterConnectionProps) {
            // Make promise-like type into promise
            return seedDataResult.then(seedData => Promise.resolve([seedData]))
        }

        const userFilterInitialDataResult = filterResolver(filter)
            .map(async resolvedFilter => {
                const availableUserFilterData = getUserFilterInitialData()
                if (availableUserFilterData) {
                    store.dispatch(setUserFilterInitialData(availableUserFilterData))
                    return availableUserFilterData
                }

                await schemasLoading
                const schemas = getSchemas()
                const schema = schemas[collectionId]

                if (schema) {
                    const userFilterInitialData =
                        await appContext.dataFetcher.fetchUserFilterInitialData({
                            filter: resolvedFilter,
                            sort: await getSort({
                                datasetConfigSort: sort,
                                getSchema: () => schema,
                            }),
                            userFilterConnectionProps,
                            schema,
                            schemas,
                        })

                    store.dispatch(setUserFilterInitialData(userFilterInitialData))
                    return userFilterInitialData
                }
            })
            .getOrElse(null)

        return Promise.all([seedDataResult, userFilterInitialDataResult])
    }

    const dependencyResolutionPromise =
        dependencyManager.getDependencyResolutionPromise(filter)

    const deferringDataFetch =
        datasetIsDeferred && getDeferredDependency(modeIsSSR, queueMicrotask)

    const {
        waitingForUserInput,
        resolveUserInputDependency
    } =
    hasUserInputDependencies(filter) && getUserInputDependency()

    const fetchDataDependencies = [
        dependencyResolutionPromise,
        deferringDataFetch,
        waitingForUserInput,
    ].filter(item => Boolean(item))

    const fetchingInitialData = fetchDataDependencies.length ?
        Promise.all(fetchDataDependencies).then(fetchInitialData) :
        fetchInitialData()

    return {
        fetchingInitialData,
        // TODO: Next 2 methods should be combined in a sync single one immediately after fetchingControllerDeps refactoring
        // because we don't need async in a virtual controller
        resolveUserInputDependency: () =>
            resolveUserInputDependency && resolveUserInputDependency(),
    }
}

export default fetchData