import {
    unset,
    get
} from 'lodash'
import {
    Breadcrumb
} from '../logger'

const controllerStore = logger => {
    const scopesMap = {}
    return {
        setController: ({
            repeaterId,
            itemId
        }, controller) => {
            logger.log(
                new Breadcrumb({
                    category: 'scopeStore',
                    message: 'adding scope',
                    data: {
                        componentId: repeaterId,
                        itemId
                    },
                }),
            )
            scopesMap[repeaterId] = scopesMap[repeaterId] || {}
            scopesMap[repeaterId][itemId] = controller
        },
        getController: ({
            repeaterId,
            itemId
        }) => {
            const componentScopes = scopesMap[repeaterId]
            return componentScopes && componentScopes[itemId]
        },
        removeController: ({
            repeaterId,
            itemId
        }) => {
            logger.log(
                new Breadcrumb({
                    category: 'scopeStore',
                    message: 'removing scope',
                    data: {
                        componentId: repeaterId,
                        itemId
                    },
                }),
            )
            const componentScopes = scopesMap[repeaterId]
            if (get(componentScopes, itemId)) {
                componentScopes[itemId].dispose()
                unset(componentScopes, itemId)
            }
        },
        getAll: () => {
            return Object.values(scopesMap).reduce(
                (acc, curr) => acc.concat(Object.values(curr)), [],
            )
        },
    }
}

export default controllerStore