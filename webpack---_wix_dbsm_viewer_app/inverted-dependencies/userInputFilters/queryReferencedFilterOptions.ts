import { getFieldParts } from '@wix/wix-data-client-common'
import type { ReferenceField } from '@wix/wix-data-schema-types'
import { DataOperation } from '@wix/wix-data-schema-types'
import type { UserFilterListInitialData } from '../../dataset-controller/rootReducer'
import { createBaseQuery } from './queryFilterOptions'
import { queryReferencedItemsUsingDistinct } from './queryReferencedItemsUsingDistinct'
import { queryReferencedItemsUsingFind } from './queryReferencedItemsUsingFind'
import type { QueryReferencedFilterOptionsProps } from './types'
import { getReferencedItemIdsByOption, sortReferencedOptions } from './utils'

export const queryReferencedFilterOptions = async ({
  schema,
  schemas,
  wixData,
  fieldName,
  role,
  sortModel,
  filterModel,
}: QueryReferencedFilterOptionsProps): Promise<UserFilterListInitialData | null> => {
  const baseQuery = createBaseQuery({
    wixData,
    schema,
    fieldName,
    sortModel,
    filterModel,
  })

  const [referencingFieldName, referencedFieldName] = getFieldParts(fieldName)

  const referencedSchemaName = (
    schema.fields[referencingFieldName] as ReferenceField
  ).referencedCollection

  const referencedSchema = schemas[referencedSchemaName]

  if (!referencedSchema) {
    return null
  }

  const customSortExists = sortModel?.length > 0

  const schemaSupportsDistinct = schema.allowedOperations?.includes(
    DataOperation.distinct,
  )

  const queryOptions = schemaSupportsDistinct
    ? queryReferencedItemsUsingDistinct
    : queryReferencedItemsUsingFind

  const referencedItems = await queryOptions({
    baseQuery,
    schema,
    schemas,
    wixData,
    fieldName,
    customSortExists,
    referencingFieldName,
    referencedFieldName,
    referencedSchema,
  })

  const options = sortReferencedOptions({
    referencedItems,
    referencedSchema,
    referencedFieldName,
    customSortExists,
  })

  const referencedItemIdsByOption = getReferencedItemIdsByOption({
    referencedItems,
    options,
    referencedFieldName,
  })

  return {
    fieldName,
    role,
    options,
    referencedItemIdsByOption,
  }
}
