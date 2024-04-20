import { getExpressions } from '../filter-resolvers'
import type {
  DatasetApi,
  Filter,
  DatasetConfig,
  DatasetScope,
  DetailsDatasetConnection,
} from '../types'
import { DETAILS_DATASET_ROLE } from '@wix/wix-data-client-common-standalone'

export interface DatasetDependency {
  id: string
  isResolved: boolean
  promise: Promise<void>
  resolve: () => void
  fieldName: string
  masterDatasetId: string
  masterDataset?: Dataset
}

interface Dataset {
  id: string
  api: DatasetApi
  config: DatasetConfig
}

interface Params {
  datasetConfigs: DatasetConfig[]
}

export type DependencyManager = ReturnType<typeof createDependencyManager>

const getDatabindingDependencyIds = (filter: Filter) =>
  getExpressions(filter).map(({ filterExpression: { filterId } }) => filterId)

export const createDependencyManager = ({ datasetConfigs }: Params) => {
  const datasetById: Record<string, Dataset> = {}
  const dependencyById: Record<string, DatasetDependency> = {}

  const getDependencyById = (
    id: string,
    datasetScope?: DatasetScope,
  ): DatasetDependency | undefined => {
    const dependency = dependencyById[id]

    if (!dependency) {
      return
    }

    const masterDataset = datasetById[dependency.masterDatasetId]

    if (!masterDataset) {
      return dependency
    }

    return {
      ...dependency,
      masterDataset: datasetScope
        ? {
            ...masterDataset,
            api: masterDataset.api.inScope(
              datasetScope.repeaterId,
              datasetScope.itemId,
            ),
          }
        : masterDataset,
    }
  }

  const getDependenciesByFilter = (
    filter: Filter,
    datasetScope?: DatasetScope,
  ) =>
    getDatabindingDependencyIds(filter).flatMap(
      id => getDependencyById(id, datasetScope) || [],
    )

  const getDependencyResolutionPromise = (
    filter: Filter,
  ): Promise<void[]> | void => {
    const promises = getDatabindingDependencyIds(filter).flatMap(id =>
      dependencyById[id] && !dependencyById[id].isResolved
        ? [dependencyById[id].promise]
        : [],
    )
    return promises.length > 0 ? Promise.all(promises) : undefined
  }

  const registerDataset = ({ id, api, config }: Dataset) => {
    datasetById[id] = {
      id,
      api,
      config,
    }
  }

  const resolveDependants = (masterId: string) =>
    Object.values(dependencyById).forEach(({ id, masterDatasetId }) => {
      if (masterId === masterDatasetId) {
        dependencyById[id].resolve()
      }
    })

  const initialize = () => {
    datasetConfigs.forEach(({ id: masterDatasetId, connections }) => {
      connections.forEach(({ role, config }) => {
        if (role !== DETAILS_DATASET_ROLE) {
          return
        }
        Object.entries(
          (config as DetailsDatasetConnection['config']).filters,
        ).forEach(([id, { fieldName }]) => {
          let resolve: () => void
          dependencyById[id] = {
            id,
            fieldName,
            masterDatasetId,
            isResolved: false,
            promise: new Promise<void>(r => (resolve = r)),
            resolve: () => {
              dependencyById[id].isResolved = true
              resolve()
            },
          }
        })
      })
    })
  }

  initialize()

  return {
    resolveDependants,
    getDependencyResolutionPromise,
    getDependencyById,
    getDependenciesByFilter,
    registerDataset,
  }
}
