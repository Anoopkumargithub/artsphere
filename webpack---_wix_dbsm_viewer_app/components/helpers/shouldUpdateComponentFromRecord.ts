import type { RecordStoreRecord } from '../../record-store/service'
import { wasFieldUpdated } from './wasFieldUpdated'

const shouldSetAllFields = (previousRecord?: RecordStoreRecord) =>
  !previousRecord

interface Params {
  previousRecord?: RecordStoreRecord
  currentRecord?: RecordStoreRecord
  fieldName: string
}

export const shouldUpdateComponentFromRecord = ({
  previousRecord,
  currentRecord,
  fieldName,
}: Params) =>
  shouldSetAllFields(previousRecord) ||
  wasFieldUpdated({ previousRecord, currentRecord, fieldName })
