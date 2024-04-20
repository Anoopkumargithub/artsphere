import { isEqual } from 'lodash'
import { getFieldValue } from './getFieldValue'
import type { RecordStoreRecord } from '../../record-store/service'

interface Params {
  previousRecord?: RecordStoreRecord
  currentRecord?: RecordStoreRecord
  fieldName: string
}

export const wasFieldUpdated = ({
  previousRecord,
  currentRecord,
  fieldName,
}: Params) =>
  !isEqual(
    getFieldValue(previousRecord, fieldName),
    getFieldValue(currentRecord, fieldName),
  )
