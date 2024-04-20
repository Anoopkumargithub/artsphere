import type {
  AdaptedComponent,
  ComponentAdapter,
  ComponentValueConfig,
} from './componentFactory'
import type { WixSignatureInputComponent } from './types'
import { baseComponentAdapter } from './baseAdapter'
import { extendComponentAdapter } from '../helpers/extendAdapter'

export type AdaptedSignatureInput = AdaptedComponent & SignatureInputExtendedApi

type SignatureInputExtendedApi = Partial<AdaptedComponent>

export const signatureInputAdapter: ComponentAdapter<
  WixSignatureInputComponent
> = component => {
  const baseApi = baseComponentAdapter(component)

  const extendedApi: SignatureInputExtendedApi = {
    setValue(value: any, config?: ComponentValueConfig) {
      if (!value) {
        component.clear()
      } else {
        baseApi.setValue(value, config)
      }
    },
  }

  return extendComponentAdapter(baseApi, extendedApi)
}
