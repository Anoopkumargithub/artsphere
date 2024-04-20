import { getFilterOptionsSortModel, getFilterOptionsQueryLimit } from './utils'
import { uniq } from 'lodash'
import { DataOperation } from '@wix/wix-data-schema-types'
import type { WithoutValueProps } from './withoutValue'
import { withoutEmptyString, withoutUndefined } from './withoutValue'
import type { BaseQueryProps, QueryFilterOptionsProps, Values } from './types'

const queryOptionsUsingFind = async ({
  baseQuery,
  schema,
  fieldName,
}: WithoutValueProps): Promise<Values> => {
  const limit = getFilterOptionsQueryLimit({
    schema,
    defaultToDbDriverLimit: true,
  })

  const { items } = await baseQuery.limit(limit).find()

  const options = items.flatMap((item: Record<string, any>) => item[fieldName])

  return uniq(options) as Values
}

const queryItemsUsingDistinct = async ({
  baseQuery,
  fieldName,
  schema,
}: WithoutValueProps): Promise<Values> => {
  const limit = getFilterOptionsQueryLimit({
    schema,
    defaultToDbDriverLimit: false,
  })

  const { items } = await baseQuery.limit(limit).distinct(fieldName, null)

  return items
}

export const createBaseQuery = ({
  wixData,
  schema,
  sortModel,
  fieldName,
  filterModel,
}: BaseQueryProps) => {
  const filterOptionsSortModel = getFilterOptionsSortModel({
    wixData,
    schema,
    sortModel,
    fieldName,
  })

  return wixData
    .query(schema.id)
    .setFilterModel(filterModel)
    .setSortModel(filterOptionsSortModel)
}

export const queryFilterOptions = async ({
  wixData,
  schema,
  fieldName,
  role,
  sortModel,
  filterModel,
}: QueryFilterOptionsProps) => {
  const baseQuery = createBaseQuery({
    wixData,
    schema,
    fieldName,
    sortModel,
    filterModel,
  })

  const schemaSupportsDistinct = schema.allowedOperations?.includes(
    DataOperation.distinct,
  )

  const queryOptions = schemaSupportsDistinct
    ? withoutEmptyString(queryItemsUsingDistinct)
    : withoutEmptyString(withoutUndefined(queryOptionsUsingFind))

  const options = await queryOptions({
    baseQuery,
    fieldName,
    schema,
  })

  return { fieldName, role, options }
}
