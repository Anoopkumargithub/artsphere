import { FieldType } from '@wix/wix-data-schema-types'

const { mediaGallery } = FieldType

export const getEmptyValueForFieldType = (fieldType?: FieldType) =>
  fieldType === mediaGallery ? [] : undefined
