import { unescape } from 'lodash'
import { FieldType } from '@wix/wix-data-schema-types'
import type {
  AdaptedComponent,
  ComponentAdapter,
  ComponentValueConfig,
} from './componentFactory'
import type { WixTextComponent } from './types'
import { baseComponentAdapter } from './baseAdapter'
import { extendComponentAdapter } from '../helpers/extendAdapter'

export const textAdapter: ComponentAdapter<WixTextComponent> = component => {
  const extendedApi: Partial<AdaptedComponent> = {
    setValue(
      value,
      { fieldType, propPath = 'text', binding }: ComponentValueConfig = {},
    ) {
      if (fieldType === FieldType.url) {
        const target = binding?.linkTarget || '_blank'
        component.text = `<a href=${value} target="${target}" style="text-decoration: underline">${value}</a>`
        const { html } = component
        component.text = ''
        component.html = unescape(html)
        return
      }
      if (fieldType === FieldType.richText) {
        component.html = value
        return
      }
      // @ts-expect-error TODO
      component[propPath] = value
    },

    clear({ fieldType }: ComponentValueConfig = {}) {
      const prop =
        fieldType === FieldType.richText || fieldType === FieldType.url
          ? 'html'
          : 'text'
      component[prop] = ''
    },
  }

  return extendComponentAdapter(baseComponentAdapter(component), extendedApi)
}
