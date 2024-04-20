import {
    USER_INPUT_FILTER_V1_ROLE
} from '@wix/wix-data-client-common-standalone'
const isConnected = (connectionsGraph, from, to) => {
    if (from === to) {
        return true
    }
    return connectionsGraph[from] ? .some(compId =>
        isConnected(connectionsGraph, compId, to),
    )
}

const shouldComponentUpdate = ({
    component,
    updatedCompIds,
    datasetIsReal,
    connectionsGraph,
}) => {
    if (updatedCompIds.length && datasetIsReal) {
        const {
            id
        } = component
        return updatedCompIds.some(
            updatedCompId =>
            isConnected(connectionsGraph, id, updatedCompId) ||
            isConnected(connectionsGraph, updatedCompId, id),
        )
    }

    return true
}

export const getComponentsToUpdate = ({
    components,
    connectionsGraph,
    updatedCompIds,
    datasetIsReal,
}) => {
    const componentsToUpdate = components.filter(component =>
        shouldComponentUpdate({
            component,
            connectionsGraph,
            updatedCompIds,
            datasetIsReal,
        }),
    )
    const updateAllComponents = componentsToUpdate.some(
        ({
            role
        }) => role === USER_INPUT_FILTER_V1_ROLE,
    )
    return updateAllComponents ? components : componentsToUpdate
}