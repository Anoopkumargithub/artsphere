import { get, isEmpty, omit, some, values } from 'lodash'
import type { AdaptedComponent, ComponentAdapter } from './componentFactory'
import type { FileType, WixUploadButtonComponent } from './types'
import { baseComponentAdapter } from './baseAdapter'
import { getFieldValue } from '../../components/helpers'
import type { RecordStoreRecord } from '../../record-store/service'
import { extendComponentAdapter } from '../helpers/extendAdapter'

export type AdaptedUploadButton = AdaptedComponent & UploadButtonExtendedApi

interface UploadButtonExtendedApi extends Partial<AdaptedComponent> {
  fileType: FileType
  uploadFiles: () => Promise<any>
}

export const uploadButtonAdapter: ComponentAdapter<
  WixUploadButtonComponent,
  AdaptedUploadButton
> = component => {
  const extendedApi: UploadButtonExtendedApi = {
    isValid(record: RecordStoreRecord) {
      const { connectionConfig, validity } = component
      if (validity.valid) {
        return true
      }

      const hasErrorOtherThanValueMissing = some(
        values(omit(validity, ['valid', 'valueMissing'])),
        value => value,
      )
      if (hasErrorOtherThanValueMissing) {
        return false
      }

      const fieldConnectedToValue =
        get(connectionConfig, 'properties.value.fieldName') || ''

      return !isEmpty(getFieldValue(record, fieldConnectedToValue))
    },

    set fileType(fileType: FileType) {
      component.fileType = fileType
    },

    get fileType() {
      return component.fileType
    },

    getValue() {
      return component.value
    },

    clear() {
      component.reset()
    },

    async uploadFiles() {
      return component.uploadFiles()
    },
  }

  return extendComponentAdapter(baseComponentAdapter(component), extendedApi)
}
