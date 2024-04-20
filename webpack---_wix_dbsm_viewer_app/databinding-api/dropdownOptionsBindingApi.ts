import { orderBy, uniqBy } from 'lodash'
import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import type { RecordStoreRecord } from '../record-store/service'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { transformFromRecordToView } from '../components/transformData'
import {
  getFieldValue,
  transformFromExpressionToView,
} from '../components/helpers'
import {
  getFieldReferencedCollection,
  getSchemaDisplayField,
} from '../data/utils'
import type { AdaptedComponentWithOptions } from '../inverted-dependencies/components'
import type { DropdownOptionsConnectionConfig } from '../types'
import { isNonEmptyConfig } from '../components/helpers/connectionConfigUtils'

type ValueSource =
  | { type: 'field'; fieldName: string }
  | { type: 'expression'; expression: string }

type DataTransformer = (
  record: RecordStoreRecord,
  valueSource: ValueSource,
) => any

interface DropDownOption {
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
): DropDownOption => {
  const value = dataTransformer(record, valueSource)
  return {
    value,
    label: labelField
      ? dataTransformer(record, { type: 'field', fieldName: labelField })
      : value,
  }
}

export const dropdownOptionsBindingApi: ComponentDatabindingApiFactory<
  AdaptedComponentWithOptions,
  DropdownOptionsConnectionConfig
> = (component, connectionConfig, context) => {
  const { logger } = appContext
  const { actions, getFieldType, getSchema } = context

  const fetchDropdownOptions = async (
    dataTransformer: DataTransformer,
    valueSource: ValueSource,
  ) => {
    const isReference =
      valueSource.type === 'field' &&
      getFieldType(valueSource.fieldName)
        .map(fieldType => fieldType === 'reference')
        .getOrElse(false)

    if (isReference) {
      const { fieldName } = valueSource
      return getSchema()
        .chain(schema => {
          const refCollection = getFieldReferencedCollection(fieldName, schema)
          return getSchema(refCollection)
            .map(getSchemaDisplayField)
            .map(async displayField => {
              const { items } = await actions.fetchAll(fieldName)
              const options = items.map(record =>
                createOption(record, {
                  valueSource: { type: 'field', fieldName: '_id' },
                  labelField: displayField,
                  dataTransformer,
                }),
              )
              return orderBy(options, [option => option.label.toLowerCase()])
            })
        })
        .getOrElse(Promise.resolve([] as DropDownOption[]))
    } else {
      // This case happens if exp is off or as a fallback, when exp is on, but comp's value and options are connected to the same field
      // and we don't know whether it's a reference during completeControllerConfig step
      const { items } = await actions.fetchAll()

      const options = items.map(record =>
        createOption(record, {
          valueSource,
          dataTransformer,
        }),
      )

      return uniqBy(options, 'value')
    }
  }

  const handleSingleEmptyOption = (options: DropDownOption[]) => {
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
      await fetchDropdownOptions(
        (record: RecordStoreRecord, valueSource: ValueSource) => {
          if (valueSource.type === 'expression') {
            return transformFromExpressionToView({
              expression: valueSource.expression,
              record,
              prop: 'value',
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
              expression: connectionConfig.expressions.value.expression,
            }
          : {
              type: 'field',
              fieldName: connectionConfig.properties.value.fieldName,
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
