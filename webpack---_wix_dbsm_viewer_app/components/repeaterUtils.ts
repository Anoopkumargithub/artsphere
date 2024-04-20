import { uniqBy } from 'lodash'
import { DETAILS_REPEATER_ROLE } from '@wix/wix-data-client-common-standalone'
import type { AdaptedComponent } from '../inverted-dependencies/components'
import type { AdaptedRepeaterComponent } from '../inverted-dependencies/components/repeaterAdapter'

type RepeaterScopeType = 'PRIMARY' | 'DETAILS' | 'OTHER'

interface Params {
  datasetId: string
  masterIds: string[]
  connectionsGraph: Record<string, string[]>
}

interface RepeaterUtils {
  isInsidePrimaryOrDetailsRepeater: (component: AdaptedComponent) => boolean
  getDetailsRepeaters: (
    components: AdaptedComponent[],
  ) => AdaptedRepeaterComponent[]
}

export const repeaterUtilsFactory = ({
  datasetId,
  masterIds,
  connectionsGraph,
}: Params): RepeaterUtils => {
  const getRepeaterType = (
    repeater: AdaptedRepeaterComponent,
  ): RepeaterScopeType => {
    if (connectionsGraph[datasetId].includes(repeater.id)) {
      return 'PRIMARY'
    }

    if (
      masterIds.some(masterId =>
        connectionsGraph[masterId].includes(repeater.id),
      )
    ) {
      return 'DETAILS'
    }

    return 'OTHER'
  }

  const isPrimaryOrDetailsRepeater = (repeater?: AdaptedRepeaterComponent) => {
    return (
      !!repeater && ['PRIMARY', 'DETAILS'].includes(getRepeaterType(repeater))
    )
  }

  const utils: RepeaterUtils = {
    isInsidePrimaryOrDetailsRepeater: ({ parentRepeater }) =>
      isPrimaryOrDetailsRepeater(parentRepeater),

    getDetailsRepeaters: components => {
      const detailsRepeaters: AdaptedRepeaterComponent[] = []

      components.forEach(({ parentRepeater }) => {
        if (parentRepeater && getRepeaterType(parentRepeater) === 'DETAILS') {
          detailsRepeaters.push(
            new Proxy(parentRepeater, {
              get(target, prop) {
                if (prop === 'role') {
                  return DETAILS_REPEATER_ROLE
                }
                return target[prop as keyof typeof target]
              },
            }),
          )
        }
      })

      return uniqBy(detailsRepeaters, 'uniqueId')
    },
  }
  return utils
}
