import * as readWriteModes from '@wix/wix-data-client-common-standalone'
import type { DatasetConfig } from '../types'

type Config = DatasetConfig['config']['dataset']

export const getCollectionName = (datasetConfig: Config) =>
  datasetConfig?.collectionName

export const getPageSize = (datasetConfig: Config) => datasetConfig?.pageSize

export const getCursor = (datasetConfig: Config) => datasetConfig?.cursor

export const isWriteOnly = (datasetConfig: Config) =>
  datasetConfig?.readWriteType === readWriteModes.WRITE

export const getReadWriteType = (datasetConfig: Config) =>
  datasetConfig?.readWriteType

export default { getCollectionName, getPageSize, isWriteOnly, getReadWriteType }
