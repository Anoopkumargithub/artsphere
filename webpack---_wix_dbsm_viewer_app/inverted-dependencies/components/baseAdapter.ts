import { get, isObject, has } from 'lodash'
import { ComponentTypes } from '@wix/wix-data-client-common'
import { FieldType } from '@wix/wix-data-schema-types'
import type { ConnectionConfigEventName } from '../../types'
import type {
  AdaptedComponent,
  ComponentAdapter,
  ComponentValueConfig,
} from './componentFactory'
import type { WixComponent, WixRepeaterComponent } from './types'
import type { AdaptedRepeaterComponent } from './repeaterAdapter'
import { repeaterAdapter } from './repeaterAdapter'

const isInput = (component: WixComponent) =>
  'onChange' in component && ('value' in component || 'checked' in component)

const isLink = (fieldType?: FieldType) =>
  fieldType === FieldType.url || fieldType === FieldType.pageLink

const isRecord = (value: any) => isObject(value) && has(value, '_id')

const getPath = (component: WixComponent, propPath: string) => {
  const propNames = propPath.split('.')
  const path = propNames.slice(0, -1)
  const [prop] = propNames.slice(-1)
  const obj = path.length > 0 ? get(component, path) : component

  return { obj, prop }
}

export const findParentRepeater = (
  component: WixComponent,
): AdaptedRepeaterComponent | undefined => {
  if (!component || !component.parent) {
    return undefined
  }
  const { parent } = component
  return parent.type === ComponentTypes.Repeater
    ? repeaterAdapter(parent as WixRepeaterComponent)
    : findParentRepeater(parent)
}

export const baseComponentAdapter: ComponentAdapter = component => {
  const { connectionConfig, uniqueId, type, role, id: nickname } = component
  const isHiddenInitially = !!component.hidden

  const api: AdaptedComponent = {
    id: uniqueId,
    connectionConfig,
    nickname,
    type: type,
    role: role,
    isInput: isInput(component),
    parentRepeater: findParentRepeater(component),
    getValue({ propPath }: ComponentValueConfig = {}) {
      if (propPath) {
        const { obj, prop } = getPath(component, propPath)
        return obj[prop]
      }
      return undefined
    },
    setValue(
      value: any,
      { propPath, fieldType, binding }: ComponentValueConfig = {},
    ) {
      if (propPath) {
        const { obj, prop } = getPath(component, propPath)
        obj[prop] =
          fieldType === 'reference' && isRecord(value) ? value._id : value

        const target = binding?.linkTarget
        if (isLink(fieldType) && target) {
          obj['target'] = target
        }
      }
    },
    setOptions(options) {
      if ('options' in component) {
        component.options = options
      }
    },
    hide() {
      if (!component.hidden) {
        component.hide?.()
      }
    },
    show({ ignoreInitiallyHidden } = { ignoreInitiallyHidden: false }) {
      if (!component.hidden || (ignoreInitiallyHidden && isHiddenInitially)) {
        return
      }
      component.show?.()
    },
    clear(config?: ComponentValueConfig) {
      api.setValue(undefined, config)
    },
    get enabled() {
      return 'enabled' in component ? component.enabled : true
    },
    enable() {
      if ('enable' in component && !api.enabled) {
        component.enable()
      }
    },
    disable() {
      if ('disable' in component && api.enabled) {
        component.disable()
      }
    },
    isValid() {
      if ('validity' in component && typeof component.validity === 'object') {
        return component.validity.valid as boolean
      }
      return true
    },
    updateValidityIndication() {
      if ('updateValidityIndication' in component) {
        component.updateValidityIndication()
      }
    },
    resetValidityIndication() {
      if ('resetValidityIndication' in component) {
        component.resetValidityIndication()
      }
    },
    onChange(callback: (event: any) => void) {
      api.on('onChange', callback)
    },
    on(eventName: ConnectionConfigEventName, callback: (event: any) => void) {
      component[eventName]?.(callback)
    },
  }

  if ('placeholder' in component) {
    Object.defineProperty(api, 'placeholder', {
      get() {
        return component.placeholder
      },
    })
  }

  return api
}
