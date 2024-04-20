import {
    flow,
    curry
} from 'lodash'
import {
    assign,
    bind
} from './utils'
import {
    freshCollection
} from './collections'

const freshStore = mainCollectionName => ({
    [mainCollectionName]: {
        ...freshCollection(),
    },
})

const setCollection = curry((name, collection) =>
    assign({
        [name]: collection
    }),
)

const getCollection = collectionName => store => store[collectionName]

const updateCollection = (collectionName, updateFn) =>
    bind(
        flow(getCollection(collectionName), updateFn),
        setCollection(collectionName),
    )

const curriedUpdateCollection = curry(updateCollection)

export {
    freshStore,
    getCollection,
    setCollection,
    curriedUpdateCollection as updateCollection,
}