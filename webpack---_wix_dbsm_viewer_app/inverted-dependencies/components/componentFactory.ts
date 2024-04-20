import { uniq } from 'lodash'
import {
  DETAILS_DATASET_ROLE,
  PAGE_ROLE,
  TEXT_ROLE,
  GALLERY_ROLE,
  GRID_ROLE,
  UPLOAD_BUTTON_ROLE,
  REPEATER_ROLE,
  DETAILS_REPEATER_ROLE,
  PAGINATION_ROLE,
  GOOGLEMAP_ROLE,
  SIGNATURE_INPUT_ROLE,
  USER_INPUT_FILTER_RANGE_SLIDER_ROLE,
} from '@wix/wix-data-client-common-standalone'
import type { FieldType } from '@wix/wix-data-schema-types'
import type {
  $W,
  ComponentRole,
  Connection,
  ConnectionConfig,
  ConnectionConfigEventName,
  FieldBindingConfig,
  UserCodeDatasetApi,
} from '../../types'
import type {
  WixComponent,
  WixComponentType,
  WixGridComponent,
  WixRepeaterComponent,
  WixTextComponent,
  WixUploadButtonComponent,
  WixSignatureInputComponent,
  WixGalleryComponent,
  WixPaginationComponent,
  WixGoogleMapComponent,
  WixRangeSliderComponent,
} from './types'
import type { RecordStoreRecord } from '../../record-store/service'
import { textAdapter } from './textAdapter'
import type { AdaptedRepeaterComponent } from './repeaterAdapter'
import { repeaterAdapter } from './repeaterAdapter'
import { gridAdapter } from './gridAdapter'
import { baseComponentAdapter } from './baseAdapter'
import { uploadButtonAdapter } from './uploadButtonAdapter'
import { signatureInputAdapter } from './signatureInputAdapter'
import { galleryAdapter } from './galleryAdapter'
import { paginationAdapter } from './paginationAdapter'
import { googleMapAdapter } from './googleMapAdapter'
import { rangeSliderAdapter } from './rangeSliderAdapter'

export type ComponentAdapter<
  WixComp extends WixComponent = WixComponent,
  AdaptedComp extends AdaptedComponent = AdaptedComponent,
> = (component: WixComp) => AdaptedComp

export interface ComponentValueConfig {
  propPath?: string
  fieldType?: FieldType
  binding?: FieldBindingConfig
}

export interface Option<Value = string> {
  label: string
  value: Value
}

export type AdaptedComponentWithOptions = AdaptedComponent & WithOptions

interface WithOptions extends AdaptedComponent {
  setOptions: (options: Option[]) => void
}

export type AdaptedComponent<
  ConnectionConfigType extends ConnectionConfig = ConnectionConfig,
> = {
  id: string
  connectionConfig: ConnectionConfigType
  nickname: string
  type: WixComponentType
  role: ComponentRole
  enabled: boolean
  isInput: boolean
  parentRepeater?: AdaptedRepeaterComponent
  placeholder?: string
  getValue: (config?: ComponentValueConfig) => any
  setValue: (value: any, config?: ComponentValueConfig) => void
  setOptions: (options: Option[]) => void
  hide: () => void
  show: (config?: { ignoreInitiallyHidden: boolean }) => void
  enable: () => void
  disable: () => void
  isValid: (currentRecord: RecordStoreRecord) => boolean
  updateValidityIndication: () => void
  resetValidityIndication: () => void
  clear: (config?: ComponentValueConfig) => void
  onChange: (callback: (event: any) => void) => void
  on: (
    eventName: ConnectionConfigEventName,
    callback: (event: any) => void,
  ) => void
}

const adaptComponent = (component: WixComponent) => {
  switch (component.role) {
    case TEXT_ROLE:
      return textAdapter(component as WixTextComponent)
    case REPEATER_ROLE:
    case DETAILS_REPEATER_ROLE:
      return repeaterAdapter(component as WixRepeaterComponent)
    case GRID_ROLE:
      return gridAdapter(component as WixGridComponent)
    case UPLOAD_BUTTON_ROLE:
      return uploadButtonAdapter(component as WixUploadButtonComponent)
    case SIGNATURE_INPUT_ROLE:
      return signatureInputAdapter(component as WixSignatureInputComponent)
    case GALLERY_ROLE:
      return galleryAdapter(component as WixGalleryComponent)
    case PAGINATION_ROLE:
      return paginationAdapter(component as WixPaginationComponent)
    case GOOGLEMAP_ROLE:
      return googleMapAdapter(component as WixGoogleMapComponent)
    case USER_INPUT_FILTER_RANGE_SLIDER_ROLE:
      return rangeSliderAdapter(component as WixRangeSliderComponent)
    default:
      return baseComponentAdapter(component)
  }
}

export type ComponentFactory = (connections: Connection[]) => {
  components: AdaptedComponent[]
  detailsDatasetApis: UserCodeDatasetApi[]
}

export const createComponentFactory =
  ($w: $W): ComponentFactory =>
  connections => {
    const wixComponents: WixComponent[] = []

    const detailsDatasetApis: UserCodeDatasetApi[] = []

    uniq(connections.map(({ role }) => role)).forEach(role => {
      if (role === DETAILS_DATASET_ROLE) {
        const comps: UserCodeDatasetApi[] = $w('@' + role) || []
        comps.forEach(c => c && detailsDatasetApis.push(c))
        return
      }

      if (role === PAGE_ROLE) {
        const pages = $w('@' + PAGE_ROLE) || []
        const [page] = Array.isArray(pages) ? pages : [pages]
        const doc = $w('Document') as WixComponent

        if (doc && page) {
          const documentProxy = new Proxy(doc, {
            get(target, prop) {
              if (prop === 'connectionConfig') {
                return page.connectionConfig
              }
              if (prop === 'role') {
                return PAGE_ROLE
              }
              return target[prop as keyof typeof target]
            },
          })
          wixComponents.push(documentProxy)
        }
        return
      }

      // TODO: refactor, when fake-viewer is no longer used
      // fake-viewer's $w returns undefined or object with .forEach method
      // production $w always returns array
      const comps = $w('@' + role) || []
      comps.forEach((component: WixComponent) => {
        if (component) {
          wixComponents.push(component)
        }
      })
    })

    const adaptedComponents = wixComponents.map(component =>
      adaptComponent(component),
    )

    return {
      components: adaptedComponents,
      detailsDatasetApis,
    }
  }
