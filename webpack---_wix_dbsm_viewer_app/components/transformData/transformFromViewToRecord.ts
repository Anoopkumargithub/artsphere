import { flow } from 'lodash'
import {
  DATEPICKER_ROLE,
  RADIOGROUP_ROLE,
  TIMEPICKER_ROLE,
  UPLOAD_BUTTON_ROLE,
} from '@wix/wix-data-client-common-standalone'
import convertDateTime from './convertDateTime'
import convertUploadResult from './convertUploadResult'
import { FieldType } from '@wix/wix-data-schema-types'
import { toDateOnlyISOString } from './dateTimeUtils'
import type { ComponentRole } from '../../types'
import type { RecordFieldValue, Value } from '.'
import type { RecordStoreRecord } from '../../record-store/service'

const { reference, dateTime, date } = FieldType

type Converter<From = unknown, To = unknown> = (
  value: Value<From>,
) => RecordFieldValue<To>

export const transformFromViewToRecord = ({
  value,
  currentValue,
  fieldType,
  fieldName,
  role,
  utils: { referenceFetcher } = {},
}: {
  value: Value
  currentValue: RecordFieldValue
  fieldType?: FieldType
  fieldName: string
  role: ComponentRole
  utils?: {
    referenceFetcher?: (itemId: string, fieldName: string) => RecordStoreRecord
  }
}): RecordFieldValue => {
  const converters = (
    [
      {
        converter: (value =>
          referenceFetcher!(
            value, // referenced record id
            fieldName,
          )) as Converter<string, RecordStoreRecord>,
        condition: Boolean(fieldType === reference),
      },
      {
        converter: value => convertDateTime(currentValue, value),
        condition: Boolean(
          fieldType === dateTime &&
            [DATEPICKER_ROLE, TIMEPICKER_ROLE, RADIOGROUP_ROLE].includes(role),
        ),
      },
      {
        converter: toDateOnlyISOString,
        condition: Boolean(fieldType === date && role === DATEPICKER_ROLE),
      },
      {
        converter: value =>
          convertUploadResult({
            value,
            currentValue: currentValue as unknown[],
            fieldType,
          }),
        condition: Boolean(role === UPLOAD_BUTTON_ROLE),
      },
    ] as Array<{ converter: Converter; condition: boolean }>
  )
    .filter(({ condition }) => condition)
    .map(({ converter }) => converter)

  return flow(converters)(value)
}
