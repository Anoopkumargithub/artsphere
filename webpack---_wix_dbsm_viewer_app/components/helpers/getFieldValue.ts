import { get } from 'lodash'
import type { RecordStoreRecord } from '../../record-store/service'

export const getFieldValue = (
  record: RecordStoreRecord | undefined,
  fieldPath: string,
) => get(record, fieldPath)
