import type { AdaptedComponent, ComponentAdapter } from './componentFactory'
import type { WixRangeSliderComponent } from './types'
import { baseComponentAdapter } from './baseAdapter'
import { extendComponentAdapter } from '../helpers/extendAdapter'

export type AdaptedRangeSlider = AdaptedComponent & RangeSliderExtendedApi

interface RangeSliderExtendedApi extends Partial<AdaptedComponent> {
  setValue: (value: any) => void
  setBounds: (min: number, max: number) => void
  getBounds: () => [number, number]
}

export const rangeSliderAdapter: ComponentAdapter<
  WixRangeSliderComponent
> = component => {
  const extendedApi: RangeSliderExtendedApi = {
    setValue(value) {
      component.value = value
    },
    getValue() {
      return component.value
    },
    clear() {
      // @ts-expect-error TODO
      component.value = []
    },
    setBounds(min, max) {
      component.min = min
      component.max = max
    },
    getBounds() {
      return [component.min, component.max]
    },
  }

  return extendComponentAdapter(baseComponentAdapter(component), extendedApi)
}
