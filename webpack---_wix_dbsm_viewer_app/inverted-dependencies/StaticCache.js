import {
    convertDataToDataBindingContract
} from '../data/utils'

export default class StaticCache {
    constructor(routerPayload) {
        if (routerPayload && routerPayload.config) {
            //TODO: remove additional checks after TB stop passing memberData via routerData
            // https://wix.slack.com/archives/C0107T7BLSC/p1641982577002100
            this._collectionId = routerPayload.config.dataset.collectionName
            this._items = routerPayload.items
            this._schemas = routerPayload.schemas
            const cursor = routerPayload.nextCursor || undefined
            const total = routerPayload.totalCount || 0
            const loaded = (routerPayload.items || []).length
            this._datasetSize = {
                cursor,
                total,
                loaded,
            }
        }
    }

    getSchemas() {
        return this._schemas
    }

    getDataStore() {
        if (this._items) {
            return convertDataToDataBindingContract({
                items: this._items,
                datasetSize: this._datasetSize,
                collectionId: this._collectionId,
            })
        }
    }

    getItems() {
        return this._items
    }
}