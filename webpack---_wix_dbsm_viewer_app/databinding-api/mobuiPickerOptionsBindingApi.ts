import { uniqBy } from 'lodash'
import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import type { RecordStoreRecord } from '../record-store/service'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { transformFromRecordToView } from '../components/transformData'
import {
  getFieldValue,
  transformFromExpressionToView,
} from '../components/helpers'
import type { AdaptedComponentWithOptions } from '../inverted-dependencies/components'
import type { MobuiPickerOptionsConnectionConfig } from '../types'
import { isNonEmptyConfig } from '../components/helpers/connectionConfigUtils'

type ValueSource =
  | { type: 'field'; fieldName: string }
  | { type: 'expression'; expression: string }

type DataTransformer = (
  record: RecordStoreRecord,
  valueSource: ValueSource,
) => any

interface PickerOption {
  value: string
  label: string
}

interface OptionMapperConfig {
  valueSource: ValueSource
  labelField?: string
  dataTransformer: DataTransformer
}

const createOption = (
  record: RecordStoreRecord,
  { valueSource, labelField, dataTransformer }: OptionMapperConfig,
): PickerOption => {
  const value = dataTransformer(record, valueSource)
  return {
    value,
    label: labelField
      ? dataTransformer(record, { type: 'field', fieldName: labelField })
      : value,
  }
}

export const mobuiPickerOptionsBindingApi: ComponentDatabindingApiFactory<
  AdaptedComponentWithOptions,
  MobuiPickerOptionsConnectionConfig
> = (component, connectionConfig, context) => {
  const { logger } = appContext
  const { actions } = context

  const fetchMobuiPickerOptions = async (
    dataTransformer: DataTransformer,
    valueSource: ValueSource,
  ) => {
    const { items } = await actions.fetchAll()

    const options = items.map(record =>
      createOption(record, {
        valueSource,
        dataTransformer,
      }),
    )

    return uniqBy(options, 'value')
  }

  const handleSingleEmptyOption = (options: PickerOption[]) => {
    const firstOption = options[0]
    if (
      options.length === 1 &&
      firstOption.label === '' &&
      firstOption.value === ''
    ) {
      return []
    }

    return options
  }

  const updateComponent = async () => {
    const { role } = component

    const options = handleSingleEmptyOption(
      await fetchMobuiPickerOptions(
        (record: RecordStoreRecord, valueSource: ValueSource) => {
          if (valueSource.type === 'expression') {
            return transformFromExpressionToView({
              expression: valueSource.expression,
              record,
              prop: 'options',
              role,
              logger,
            }).value
          }
          return transformFromRecordToView({
            value: getFieldValue(record, valueSource.fieldName),
            role,
          })
        },

        connectionConfig.expressions?.value
          ? {
              type: 'expression',
              expression: connectionConfig.expressions.options.expression,
            }
          : {
              type: 'field',
              fieldName: connectionConfig.properties.options.fieldName,
            },
      ),
    )

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
