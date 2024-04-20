import type { DatasetDependency } from '../dataset-controller/dependencyManager'
import type { AdaptedComponent } from '../inverted-dependencies/components'
import { repeaterUtilsFactory } from './repeaterUtils'

interface Config {
  datasetId: string
  connectionsGraph: Record<string, string[]>
  datasetIsReal: boolean
  getDependencies: () => DatasetDependency[]
}

export const getComponentsToDatabind = (
  components: AdaptedComponent[],
  { datasetId, connectionsGraph, datasetIsReal, getDependencies }: Config,
) => {
  if (!datasetIsReal) {
    return components
  }

  const { isInsidePrimaryOrDetailsRepeater, getDetailsRepeaters } =
    repeaterUtilsFactory({
      datasetId,
      connectionsGraph,
      masterIds: getDependencies().map(
        dependency => dependency.masterDatasetId,
      ),
    })

  const componentsToDatabind = components.filter(
    component => !isInsidePrimaryOrDetailsRepeater(component),
  )

  componentsToDatabind.push(...getDetailsRepeaters(components))

  return componentsToDatabind
}
