export default class AppState {
    constructor() {
        this._datasetConfigs = new Map()
    }

    get datasetConfigs() {
        return this._datasetConfigs
    }
}