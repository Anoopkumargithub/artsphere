import { get, isEmpty } from 'lodash'
import type { ComponentDatabindingApiFactory } from './types'
import type { ConnectionConfig } from '../types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { AppError, UserError } from '../logger'
import { transformFromViewToRecord } from '../components/transformData'
import { getFieldValue, wasFieldUpdated } from '../components/helpers'
import type { AdaptedUploadButton } from '../inverted-dependencies/components/uploadButtonAdapter'
import {
  isReadOnly,
  selectCurrentRecord,
} from '../dataset-controller/rootReducer'
import { isNonEmptyConfig } from '../components/helpers/connectionConfigUtils'

const getValueFieldName = (connectionConfig: ConnectionConfig) =>
  get(connectionConfig, 'properties.value.fieldName') || ''

export const uploadButtonBindingApi: ComponentDatabindingApiFactory<
  AdaptedUploadButton
> = (component, connectionConfig, context) => {
  const { logger, errorReporting } = appContext
  const { actions, datasetApi, getState, getFieldType } = context

  const modified: Record<string, boolean> = {}

  const syncValidityIndicationAndValue = (valueFieldChanged = false) => {
    const record = selectCurrentRecord(getState())
    const fieldName = getValueFieldName(connectionConfig)

    const newRecord = actions.isCurrentRecordNew(getState())
    const valueIsInvalid = isEmpty(getFieldValue(record, fieldName))
    const pristine = actions.isCurrentRecordPristine(getState())

    if (pristine || valueFieldChanged) {
      component.clear()
    }

    if (valueIsInvalid && (!newRecord || valueFieldChanged)) {
      component.updateValidityIndication()
    }
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),

    isValidConnection() {
      return isNonEmptyConfig(connectionConfig)
    },

    bind() {
      if (isReadOnly(getState())) {
        return
      }

      const { id, role } = component
      const fieldName = getValueFieldName(connectionConfig)
      const fieldType = getFieldType(fieldName).getOrElse(undefined)

      component.onChange(
        errorReporting(() => {
          modified[id] = true
        }, AppError.withMessage('Upload button adapter onChange failed')),
      )

      datasetApi.onBeforeSave(() => {
        if (!modified[id] || !component.getValue().length) {
          return
        }

        return component
          .uploadFiles()
          .then(uploadResult => {
            modified[id] = false
            const record = selectCurrentRecord(getState())
            const value = transformFromViewToRecord({
              value: uploadResult,
              currentValue: getFieldValue(record, fieldName),
              fieldType,
              fieldName,
              role,
            })

            actions.setFieldInCurrentRecordAndSynchronize(fieldName, value, id)
          })
          .catch(error => {
            const expectedFiles = component.getValue()
            const expectedFileName =
              Array.isArray(expectedFiles) && expectedFiles.length === 1
                ? expectedFiles[0].name
                : 'unknown'

            //TODO: this is only for reporting to console. ihork do we really need it?
            logger.log(
              new UserError(
                `The ${expectedFileName} file failed to upload. Please try again later.`,
                { cause: error },
              ),
            )

            throw error
          })
      })

      // eslint-disable-next-line array-callback-return
      getFieldType(fieldName).map(fieldType => {
        switch (fieldType) {
          case 'image':
            component.fileType = 'Image'
            break
          case 'document':
            component.fileType = 'Document'
            break
        }
      })
    },

    async onCurrentRecordModified(previousRecord) {
      const { id } = component
      const fieldName = getValueFieldName(connectionConfig)
      const currentRecord = selectCurrentRecord(getState())
      const valueFieldChanged = wasFieldUpdated({
        previousRecord,
        currentRecord,
        fieldName,
      })
      if (valueFieldChanged) {
        modified[id] = false
      }
      syncValidityIndicationAndValue(valueFieldChanged)
    },

    async onRecordsLoaded() {
      syncValidityIndicationAndValue()
    },

    async onCurrentViewChanged() {
      syncValidityIndicationAndValue()
    },

    async onCurrentIndexChanged() {
      syncValidityIndicationAndValue()
    },
  }
}
