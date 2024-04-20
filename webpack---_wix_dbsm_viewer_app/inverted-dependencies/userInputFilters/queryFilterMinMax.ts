import { DataOperation } from '@wix/wix-data-schema-types'
import type { UserFilterMinMaxInitialData } from '../../dataset-controller/rootReducer'
import type { AggregateFilterOptionsProps } from './types'

const queryMinMaxUsingAggregate = async ({
  wixData,
  schema,
  filterModel,
  fieldName,
  role,
}: AggregateFilterOptionsProps): Promise<UserFilterMinMaxInitialData> => {
  const filter = wixData.filter().setFilterModel(filterModel)

  const { items } = await wixData
    .aggregate(schema.id)
    .filter(filter)
    .max(fieldName, 'max')
    .min(fieldName, 'min')
    .run()

  const { min, max } = items[0] ?? {}

  return { fieldName, role, min, max }
}

const queryMinMaxUsingFind = async ({
  wixData,
  schema,
  filterModel,
  fieldName,
  role,
}: AggregateFilterOptionsProps): Promise<UserFilterMinMaxInitialData> => {
  const baseQuery = wixData
    .query(schema.id)
    .setFilterModel(filterModel)
    .limit(1)

  const [{ items: ascendingItems }, { items: descendingItems }] =
    await Promise.all([
      baseQuery.ascending(fieldName).find(),
      baseQuery.descending(fieldName).find(),
    ])

  const min = ascendingItems.map(
    (item: Record<string, any>) => item[fieldName],
  )[0]
  const max = descendingItems.map(
    (item: Record<string, any>) => item[fieldName],
  )[0]

  return { fieldName, role, min, max }
}

export const queryFilterMinMax = async ({
  schema,
  wixData,
  fieldName,
  role,
  filterModel,
}: AggregateFilterOptionsProps): Promise<UserFilterMinMaxInitialData> => {
  const schemaSupportsAggregate = schema.allowedOperations?.includes(
    DataOperation.aggregate,
  )

  const queryProps = {
    wixData,
    schema,
    filterModel,
    fieldName,
    role,
  }

  return schemaSupportsAggregate
    ? queryMinMaxUsingAggregate(queryProps)
    : queryMinMaxUsingFind(queryProps)
}
