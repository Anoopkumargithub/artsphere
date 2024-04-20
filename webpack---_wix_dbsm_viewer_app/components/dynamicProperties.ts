import { mapKeys } from 'lodash'
import { FieldType } from '@wix/wix-data-schema-types'
import type { ConnectionConfig, DynamicProp, LiteralProp, Prop } from '../types'
import type { DatabindingApiContext } from '../databinding-api/types'

const { richText } = FieldType

const dynamicPropertiesHandlers: Record<
  DynamicProp,
  (fieldType: FieldType | null) => LiteralProp
> = {
  $text: fieldType => (fieldType === richText ? 'html' : 'text'),
}

interface ResolveDynamicPropertyParams {
  propName: DynamicProp
  getFieldType: () => FieldType | null
}

const resolveDynamicProperty = ({
  propName,
  getFieldType,
}: ResolveDynamicPropertyParams): LiteralProp =>
  propName in dynamicPropertiesHandlers
    ? dynamicPropertiesHandlers[propName](getFieldType())
    : propName

const isDynamicProperty = (propName: Prop): propName is DynamicProp =>
  propName.startsWith('$')

const resolveDynamicProperties = (
  connectionConfig: ConnectionConfig,
  getFieldType: DatabindingApiContext['getFieldType'],
): ConnectionConfig => {
  if (!connectionConfig) {
    return connectionConfig
  }
  const { properties, totalCount } = connectionConfig
  return {
    ...connectionConfig,
    ...(properties
      ? {
          properties: mapKeys(properties, (property, propName) =>
            isDynamicProperty(propName)
              ? resolveDynamicProperty({
                  propName,
                  getFieldType: () =>
                    getFieldType(property.fieldName).getOrElse(null),
                })
              : propName,
          ),
        }
      : {}),
    ...(totalCount
      ? {
          totalCount: {
            prop: isDynamicProperty(totalCount.prop)
              ? resolveDynamicProperty({
                  propName: totalCount.prop,
                  getFieldType: () => null,
                })
              : totalCount.prop,
          },
        }
      : {}),
  }
}

export { resolveDynamicProperties }
