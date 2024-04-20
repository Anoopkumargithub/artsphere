import type { Schema } from '@wix/wix-data-schema-types'

type DataStore = string[]

type Schemas = {
  [name: string]: Schema
}

type UserFilterData = WixDataResponse

type WixDataResponse = {
  items: any[]
  pagingMetadata: Partial<{
    count: number
    offset: number
    total: number
    tooManyToCount: boolean
    hasNext: boolean
  }>
}

type WarmupDataMap = Partial<{
  schemas: Schemas
  dataStore: DataStore
  [key: `userFilterInitialData-${string}`]: UserFilterData
}>

type WarmupData = {
  set: <K extends keyof WarmupDataMap>(key: K, data: WarmupDataMap[K]) => void
  get: <K extends keyof WarmupDataMap>(key: K) => WarmupDataMap[K]
}
export class WarmupCache {
  private warmupData: WarmupData
  constructor(warmupData: WarmupData) {
    this.warmupData = warmupData
  }

  getSchemas() {
    return this.warmupData.get('schemas')
  }

  setSchemas(data: Schemas) {
    this.warmupData.set('schemas', data)
  }

  getDataStore() {
    return this.warmupData.get('dataStore')
  }

  setDataStore(data: DataStore) {
    this.warmupData.set('dataStore', data)
  }

  getUserFilterInitialData(datasetId: string) {
    return this.warmupData.get(`userFilterInitialData-${datasetId}`)
  }

  setUserFilterInitialData(datasetId: string, data: UserFilterData) {
    this.warmupData.set(`userFilterInitialData-${datasetId}`, data)
  }
}
