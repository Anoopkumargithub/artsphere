import type { Scoped$W } from '../../types'
import type { AdaptedComponent, ComponentAdapter } from './componentFactory'
import type { WixRepeaterComponent } from './types'
import { baseComponentAdapter } from './baseAdapter'
import { extendComponentAdapter } from '../helpers/extendAdapter'

type ItemReadyCallback = (
  scoped$W: Scoped$W,
  itemData: any,
  index: number,
) => void

type ItemRemovedCallback = (itemData: any) => void

export type AdaptedRepeaterComponent = AdaptedComponent & RepeaterExtendedApi

interface RepeaterExtendedApi extends Partial<AdaptedComponent> {
  onItemReady: (cb: ItemReadyCallback) => void
  onItemRemoved: (cb: (itemData: any) => void) => void
  setValue: (items: any[]) => void
  getValue: () => any[]
}

export const repeaterAdapter: ComponentAdapter<
  WixRepeaterComponent,
  AdaptedRepeaterComponent
> = component => {
  const extendedApi: RepeaterExtendedApi = {
    getValue() {
      return component.data
    },

    setValue(items: any[]) {
      component.data = items
    },

    clear() {
      component.data = []
    },

    onItemReady(callback: ItemReadyCallback) {
      component.onItemReady(callback)
    },

    onItemRemoved(callback: ItemRemovedCallback) {
      component.onItemRemoved(callback)
    },
  }

  return extendComponentAdapter(baseComponentAdapter(component), extendedApi)
}
