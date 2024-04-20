import {
  MEDIA_GALLERY_ROLE,
  RATINGSDISPLAY_ROLE,
  GOOGLEMAP_ROLE,
  PROGRESS_BAR_ROLE,
  TIMEPICKER_ROLE,
  RICH_CONTENT_ROLE,
  DATEPICKER_ROLE,
  ADDRESSINPUT_ROLE,
  TEXT_ROLE,
} from '@wix/wix-data-client-common-standalone'
import { flow } from 'lodash'
import convertValueToString from './convertValueToString'
import convertToStaticLinkIfMediaItemUri from './convertToStaticLinkIfMediaItemUri'
import { isDateValid, getTimeFromDate } from './dateTimeUtils'
import { FieldType } from '@wix/wix-data-schema-types'
import type { RecordFieldValue, Value } from '.'
import formatValue from './formatValue'
import type { ComponentRole } from '../../types'

type Converter<From = unknown, To = unknown> = (
  value: RecordFieldValue<From>,
) => Value<To>
type Format = unknown
type Formatter = unknown

const { mediaGallery, address, date } = FieldType

export const transformFromRecordToView = ({
  value,
  fieldType,
  role,
  componentIsInput,
  propPath,
  format,
  utils: { formatter } = {},
}: {
  value: RecordFieldValue
  role: ComponentRole
  fieldType?: FieldType
  propPath?: string
  componentIsInput?: boolean
  format?: Format
  utils?: { formatter?: Formatter }
}) => {
  const converters = (
    [
      {
        converter: ({ formatted }) => formatted,
        condition: Boolean(
          value && fieldType === address && role !== ADDRESSINPUT_ROLE,
        ),
      },
      {
        converter: convertValueToString,
        condition: Boolean(
          role === TEXT_ROLE ||
            (!componentIsInput &&
              ![
                RATINGSDISPLAY_ROLE,
                MEDIA_GALLERY_ROLE,
                PROGRESS_BAR_ROLE,
                RICH_CONTENT_ROLE,
              ].includes(role) &&
              fieldType !== FieldType.boolean),
        ),
      },
      {
        converter: value => convertToStaticLinkIfMediaItemUri({ value }),
        condition: Boolean(propPath === 'link' && role !== GOOGLEMAP_ROLE),
      },
      {
        converter: () => [],
        condition: Boolean(!value && fieldType === mediaGallery),
      },
      {
        converter: getTimeFromDate,
        condition: Boolean(role === TIMEPICKER_ROLE && isDateValid(value)),
      },
      {
        converter: value => {
          const date = new Date(value as number | string | Date)
          if (value !== null && isDateValid(date)) {
            return date
          }
          return value === '' || value === null ? undefined : value
        },
        condition: Boolean(role === DATEPICKER_ROLE && fieldType === date),
      },
    ] as Array<{ converter: Converter; condition: boolean }>
  )
    .filter(({ condition }) => condition)
    .map(({ converter }) => converter)

  return flow([
    value => formatValue({ value, formatter, fieldType, format }),
    ...converters,
  ])(value)
}
