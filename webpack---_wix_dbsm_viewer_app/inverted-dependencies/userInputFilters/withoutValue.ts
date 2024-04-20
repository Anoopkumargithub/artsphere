import { fieldSupportsOperator } from '@wix/wix-data-client-common'
import type { WixDataQuery } from '@wix/wix-data-core/dist/types/query'
import type { Schema } from '@wix/wix-data-schema-types'
import { AllowedFilterOperator } from '@wix/wix-data-schema-types'
import { filter, isObject } from 'lodash'
import type { FilterQueryReturnType, Records } from './types'

export type WithoutValueProps = {
  baseQuery: WixDataQuery
  fieldName: string
  schema: Schema
}

export const isRecordReturnType = (
  option: FilterQueryReturnType[number],
): option is Records[number] => isObject(option)

type QueryFunction<Params, Return> = (args: Params) => Promise<Return>

const withoutValue =
  <Params extends WithoutValueProps, Return extends FilterQueryReturnType>(
    valueToRemove: '' | undefined,
    query: QueryFunction<Params, Return>,
  ): QueryFunction<Params, Return> =>
  async (args: Params) => {
    const { baseQuery, fieldName, schema } = args

    const fieldSupportsNotEquals = fieldSupportsOperator(
      schema,
      fieldName,
      AllowedFilterOperator.ne,
    )

    if (fieldSupportsNotEquals) {
      return query({
        ...args,
        baseQuery: baseQuery.ne(fieldName, valueToRemove),
      })
    }

    const options = await query(args)

    return filter(options, (option: Return[number]) => {
      const value = isRecordReturnType(option) ? option[fieldName] : option
      return value !== valueToRemove
    }) as Return
  }

export const withoutEmptyString = <
  Params extends WithoutValueProps,
  Return extends FilterQueryReturnType,
>(
  query: QueryFunction<Params, Return>,
) => withoutValue('', query)

export const withoutUndefined = <
  Params extends WithoutValueProps,
  Return extends FilterQueryReturnType,
>(
  query: QueryFunction<Params, Return>,
) => withoutValue(undefined, query)
