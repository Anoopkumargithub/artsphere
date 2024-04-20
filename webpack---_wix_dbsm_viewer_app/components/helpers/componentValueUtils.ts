import { ComponentTypes } from '@wix/wix-data-client-common'
import { entries } from '@wix/wix-data-client-common-standalone'
import type { FieldType } from '@wix/wix-data-schema-types'
import type { Maybe } from '@wix/wix-data-client-wix-code-adt'
import { shouldUpdateComponentFromRecord } from '.'
import { transformFromExpressionToView } from './transformFromExpressionToView'
import { transformFromRecordToView } from '../transformData'
import type { Logger } from '../../logger'
import { AppError } from '../../logger'
import { getFieldValue } from './getFieldValue'
import type { AdaptedComponent } from '../../inverted-dependencies/components'
import type { RecordStoreRecord } from '../../record-store/service'
import type { ConnectionConfig, RecordStore } from '../../types'
import { getDatasetSize } from '../../helpers/paginationUtils'
import type { DatabindingActions } from '../../databinding-api/types'

const { Checkbox: checkboxSdkType, Dropdown: dropdownSdkType } = ComponentTypes

// TODO: try to get rid of this func?
export const getInputComponentValueAccessorName = (
  component: AdaptedComponent,
) => {
  switch (component.type) {
    case checkboxSdkType:
      return 'checked'
    default:
      return 'value'
  }
}

// TODO: try to get rid of this func?
export const getInputComponentDefaultValue = (component: AdaptedComponent) => {
  switch (component.type) {
    case checkboxSdkType:
      return false
    case dropdownSdkType:
      return ''
    default:
      return null
  }
}

type PropPath = string
type Value = any
type ValueDescription = Record<PropPath, Value>

const isValueEmpty = (value: Value) =>
  value === undefined ||
  value === '' ||
  (Array.isArray(value) && value.length === 0)

interface UpdateComponentPropsParams {
  component: AdaptedComponent
  connectionConfig: ConnectionConfig
  currentRecord?: RecordStoreRecord
  previousRecord?: RecordStoreRecord
  getFieldType: (fieldName: string) => Maybe<FieldType>
  formatter?: any
  modeIsLivePreview: boolean
  logger: Logger
  recordStore: RecordStore
  actions: DatabindingActions
}

export const updateComponentProps = ({
  component,
  connectionConfig,
  currentRecord,
  previousRecord,
  getFieldType,
  formatter,
  modeIsLivePreview,
  logger,
  recordStore,
  actions,
}: UpdateComponentPropsParams) => {
  const { role, isInput } = component
  const { properties = {}, totalCount, expressions = {} } = connectionConfig
  const valueDescription: ValueDescription = {}

  if (totalCount && !actions.isCursorPaging()) {
    const total = getDatasetSize({ recordStore })?.total
    if (typeof total === 'number') {
      const value = transformFromRecordToView({ value: total, role })
      component.setValue(value, { propPath: totalCount.prop })
    }
  }

  if (!currentRecord) {
    return
  }

  entries(expressions).forEach(([prop, { expression }]) => {
    const { value, propPath } = transformFromExpressionToView({
      expression,
      record: currentRecord,
      prop,
      role,
      componentIsInput: isInput,
      logger,
    })
    valueDescription[propPath] = value
    component.setValue(value, { propPath })
  })

  entries(properties).forEach(([propPath, binding]) => {
    try {
      const { fieldName, format } = binding
      const fieldType = getFieldType(fieldName).getOrElse(undefined)
      const value = transformFromRecordToView({
        value: getFieldValue(currentRecord, fieldName),
        role,
        componentIsInput: isInput,
        fieldType,
        propPath,
        format,
        utils: {
          formatter,
        },
      })

      valueDescription[propPath] = value

      if (
        shouldUpdateComponentFromRecord({
          currentRecord,
          previousRecord,
          fieldName,
        })
      ) {
        if (modeIsLivePreview && isValueEmpty(value)) {
          return
        }

        component.setValue(value, { propPath, fieldType, binding })
      }
    } catch (e) {
      logger.log(new AppError(`Failed setting ${propPath}`, { cause: e }))
    }
  })
}
