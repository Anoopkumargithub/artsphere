import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { transformFromRecordToView } from '../components/transformData'
import {
  transformFromExpressionToView,
  getFieldValue,
} from '../components/helpers'
import type { AdaptedComponentWithOptions } from '../inverted-dependencies/components'
import type { SelectionTagsOptionsConnectionConfig } from '../types'
import { isNonEmptyConfig } from '../components/helpers/connectionConfigUtils'

interface Option {
  value: string
  label: string
}

export const selectionTagsOptionsBindingApi: ComponentDatabindingApiFactory<
  AdaptedComponentWithOptions,
  SelectionTagsOptionsConnectionConfig
> = (component, connectionConfig, context) => {
  const { logger } = appContext
  const { actions, modeIsLivePreview } = context

  const updateComponent = async () => {
    const { role } = component
    const { items } = await actions.fetchAll()

    const options = items.reduce((acc: Option[], record) => {
      if (connectionConfig.expressions?.['options']) {
        const { value } = transformFromExpressionToView({
          expression: connectionConfig.expressions.options.expression,
          record,
          prop: 'options',
          role,
          logger,
        })
        acc.push({ value, label: value })
        return acc
      }

      const {
        properties: {
          options: { fieldName },
        },
      } = connectionConfig

      const value = transformFromRecordToView({
        value: getFieldValue(record, fieldName),
        role,
      })

      if (value) {
        acc.push({ value, label: value })
      }

      return acc
    }, [])

    if (modeIsLivePreview && options.length === 0) {
      return
    }

    component.setOptions(options)
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),

    isValidConnection() {
      return isNonEmptyConfig(connectionConfig)
    },

    clear() {
      component.setOptions([])
    },
    async onRecordsLoaded() {
      updateComponent()
    },

    async onCurrentRecordModified() {
      updateComponent()
    },
  }
}
