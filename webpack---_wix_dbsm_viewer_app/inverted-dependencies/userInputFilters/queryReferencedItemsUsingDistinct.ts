import type { QueryReferencedItemsProps, Records } from './types'
import { getFilterOptionsQueryLimit } from './utils'
import type { WithoutValueProps } from './withoutValue'
import { withoutEmptyString, withoutUndefined } from './withoutValue'

const queryReferencedCollection = async ({
  baseQuery,
  schema,
  references,
}: WithoutValueProps & { references: string[] }): Promise<Records> => {
  const limit = getFilterOptionsQueryLimit({
    schema,
    defaultToDbDriverLimit: true,
  })

  const { items: options } = await baseQuery
    .hasSome('_id', references)
    .limit(limit)
    .find()

  return options
}

export const queryReferencedItemsUsingDistinct = async ({
  baseQuery,
  schema,
  wixData,
  customSortExists,
  referencingFieldName,
  referencedFieldName,
  referencedSchema,
}: QueryReferencedItemsProps): Promise<Records> => {
  const limit = getFilterOptionsQueryLimit({
    schema,
    defaultToDbDriverLimit: false,
  })

  const { items: references } = (await baseQuery
    .limit(limit)
    .distinct(referencingFieldName, null)) as { items: string[] }

  const queryReferencedItems = withoutEmptyString(
    withoutUndefined(queryReferencedCollection),
  )

  const referencedItems = await queryReferencedItems({
    baseQuery: wixData.query(referencedSchema.id),
    schema: referencedSchema,
    fieldName: referencedFieldName,
    references,
  })

  const sortedReferencedItems = customSortExists
    ? references.flatMap(id =>
        referencedItems.filter(referencedItem => referencedItem._id === id),
      )
    : referencedItems

  return sortedReferencedItems
}
