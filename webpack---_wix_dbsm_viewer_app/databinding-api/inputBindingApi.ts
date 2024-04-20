import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import type { RecordStoreRecord } from '../record-store/service'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { selectCurrentRecord } from '../dataset-controller/rootReducer'
import { AppError } from '../logger'
import { transformFromViewToRecord } from '../components/transformData'
import { updateComponentProps } from '../components/helpers/componentValueUtils'
import { getFieldValue } from '../components/helpers'
import type { AdaptedComponent } from '../inverted-dependencies/components'
import type { InputConnectionConfig } from '../types'
import { isNonEmptyConfig } from '../components/helpers/connectionConfigUtils'

export const inputBindingApi: ComponentDatabindingApiFactory<
  AdaptedComponent,
  InputConnectionConfig
> = (component, connectionConfig, context) => {
  const { logger, errorReporting } = appContext
  const { getState, getFieldType, actions, modeIsLivePreview } = context

  const setFieldOnComponentChange = () => {
    const { id, role } = component
    const { properties } = connectionConfig

    component.onChange(
      errorReporting((event: any) => {
        const propName = properties.checked ? 'checked' : 'value'
        const fieldName = properties[propName].fieldName
        const record = selectCurrentRecord(getState())

        const value = transformFromViewToRecord({
          value: event.target[propName],
          currentValue: getFieldValue(record, fieldName),
          fieldType: getFieldType(fieldName).getOrElse(undefined),
          fieldName,
          utils: {
            referenceFetcher: (value: any, fieldName: string) =>
              actions.fetchRecordById(value, fieldName).getOrElse(value),
          },
          role,
        })

        actions.setFieldInCurrentRecordAndSynchronize(fieldName, value, id)
      }, AppError.withMessage('Input adapter onChange - setting value to record failed')),
    )
  }

  const updateComponentFromCurrentRecord = (
    previousRecord?: RecordStoreRecord,
  ) => {
    updateComponentProps({
      currentRecord: selectCurrentRecord(getState()),
      previousRecord,
      component,
      connectionConfig,
      modeIsLivePreview,
      getFieldType,
      logger,
      recordStore: context.recordStore,
      actions: context.actions,
    })
  }

  const syncValidityIndication = () => {
    const pristine = actions.isCurrentRecordPristine(getState())
    const newRecord = actions.isCurrentRecordNew(getState())
    if (pristine && newRecord) {
      component.resetValidityIndication()
    }
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),
    isValidConnection() {
      return isNonEmptyConfig(connectionConfig)
    },
    bind() {
      setFieldOnComponentChange()

      if (connectionConfig.filters) {
        component.onChange(
          errorReporting(
            actions.refresh,
            AppError.withMessage(
              'Input adapter onChange - sync actions failed',
            ),
          ),
        )
      }
    },

    async onRecordsLoaded() {
      updateComponentFromCurrentRecord()
      syncValidityIndication()
    },

    async onCurrentViewChanged() {
      updateComponentFromCurrentRecord()
      syncValidityIndication()
    },

    async onCurrentIndexChanged() {
      updateComponentFromCurrentRecord()
      syncValidityIndication()
    },

    async onCurrentRecordModified(previousRecord) {
      updateComponentFromCurrentRecord(previousRecord)
      syncValidityIndication()
    },
  }
}
