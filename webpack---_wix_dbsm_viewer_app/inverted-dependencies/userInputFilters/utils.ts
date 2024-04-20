import { getReferenceFieldName } from '@wix/wix-data-client-common'
import type { Schema } from '@wix/wix-data-schema-types'
import { FieldType } from '@wix/wix-data-schema-types'
import { isArray, uniq } from 'lodash'
import { getSchemaMaxPageSize } from '../../data/utils'
import {
  USER_INPUT_FILTER_UNIQUE_DB_DRIVER_OPTIONS_LIMIT,
  USER_INPUT_FILTER_UNIQUE_OPTIONS_LIMIT,
} from '../../helpers/constants'
import type WixData from '@wix/wix-data-core/dist/types/data-api'
import type { Records, SortModel } from './types'

export const getFilterOptionsSortModel = ({
  wixData,
  schema,
  sortModel: customSort,
  fieldName: fieldPath,
}: {
  wixData: WixData
  schema: Schema
  sortModel: SortModel
  fieldName: string
}) => {
  const fieldName = getReferenceFieldName(fieldPath)

  if (fieldName) {
    const isFieldSortable = schema.fields[fieldName]?.sortable ?? true
    const defaultSort = schema.defaultSort
      ? [
          {
            [schema.defaultSort.fieldName]: schema.defaultSort.direction,
          },
        ]
      : null
    const customSortExists = customSort?.length > 0
    const fieldAlreadyBeingSorted =
      customSort?.find(
        (sortObject: Record<string, any>) => sortObject[fieldName],
      ) || schema?.defaultSort?.fieldName === fieldName
    const includeFallbackSort = !fieldAlreadyBeingSorted && isFieldSortable
    const fallbackSort = wixData.sort().ascending(fieldName).getSortModel()

    if (customSortExists) {
      return includeFallbackSort ? [...customSort, ...fallbackSort] : customSort
    } else if (defaultSort) {
      return includeFallbackSort
        ? [...defaultSort, ...fallbackSort]
        : defaultSort
    } else if (isFieldSortable) {
      return fallbackSort
    }
  }

  return null
}

export const sortReferencedOptions = ({
  referencedItems,
  referencedSchema,
  referencedFieldName,
  customSortExists,
}: {
  referencedItems: Records
  referencedFieldName: string
  customSortExists: boolean
  referencedSchema: Schema
}) => {
  const options = uniq(
    referencedItems.flatMap(item => item[referencedFieldName]),
  )

  const referencedFieldType = referencedSchema.fields[referencedFieldName].type

  return customSortExists
    ? options
    : referencedFieldType === FieldType.number
      ? (options as number[]).sort((a: number, b: number) => a - b)
      : options.sort()
}

export const getReferencedItemIdsByOption = ({
  referencedItems,
  referencedFieldName,
  options,
}: {
  referencedItems: Records
  options: string[] | number[]
  referencedFieldName: string
}) => {
  const referencedItemIdsByOption = Object.fromEntries(
    options.map(option => [
      option,
      referencedItems
        .filter(item =>
          isArray(item[referencedFieldName])
            ? item[referencedFieldName].includes(option)
            : item[referencedFieldName] === option,
        )
        .map(item => item._id),
    ]),
  )

  return referencedItemIdsByOption
}

export const getFilterOptionsQueryLimit = ({
  schema,
  defaultToDbDriverLimit,
}: {
  schema: Schema
  defaultToDbDriverLimit: boolean
}) => {
  const fallbackLimit = defaultToDbDriverLimit
    ? USER_INPUT_FILTER_UNIQUE_DB_DRIVER_OPTIONS_LIMIT
    : USER_INPUT_FILTER_UNIQUE_OPTIONS_LIMIT
  return getSchemaMaxPageSize(schema) ?? fallbackLimit
}
