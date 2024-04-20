import { uniqBy } from 'lodash'
import type { QueryReferencedItemsProps, Records } from './types'
import { getFilterOptionsQueryLimit } from './utils'
import type { WithoutValueProps } from './withoutValue'
import { withoutUndefined } from './withoutValue'

const queryItemsWithIncludedReferences = async ({
  baseQuery,
  schema,
  fieldName,
}: WithoutValueProps): Promise<Records> => {
  const limit = getFilterOptionsQueryLimit({
    schema,
    defaultToDbDriverLimit: true,
  })

  const { items } = await baseQuery.limit(limit).include(fieldName).find()

  return items
}

export const queryReferencedItemsUsingFind = async ({
  baseQuery,
  schema,
  referencingFieldName,
  referencedFieldName,
}: QueryReferencedItemsProps): Promise<Records> => {
  const queryItemsWithReferences = withoutUndefined(
    queryItemsWithIncludedReferences,
  )

  const items = await queryItemsWithReferences({
    baseQuery,
    schema,
    fieldName: referencingFieldName,
  })

  const referencedItems = uniqBy(
    items
      .map(item => item[referencingFieldName])
      .filter(
        referencedItem =>
          !['', undefined].includes(referencedItem[referencedFieldName]),
      ),
    '_id',
  )

  return referencedItems
}
