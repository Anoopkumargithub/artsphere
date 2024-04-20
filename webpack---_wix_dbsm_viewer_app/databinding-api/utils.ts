import { AppError, reportUserDataFilteringBI } from '../logger'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import type { AdaptedComponent } from '../inverted-dependencies/components'
import type { RecordStoreService } from '../record-store/service'
import type { ConnectionConfig, UoUFilterConnectionConfig } from '../types'
import type { DatabindingApiContext } from './types'
import {
  selectIsApplyUserInputFiltersActionBindingPresent,
  selectSetFilterCalled,
  getCollectionName,
} from '../dataset-controller/rootReducer'

export const handleUserInputFilterOnChange = (
  component: AdaptedComponent<ConnectionConfig>,
  connectionConfig: UoUFilterConnectionConfig,
  context: DatabindingApiContext,
) => {
  const { errorReporting } = appContext
  const { actions, recordStore, getState } = context
  const fieldName = connectionConfig.userInputFilter.fieldName

  const onChangeHandler = async () => {
    const setFilterCalled = selectSetFilterCalled(getState())
    const isApplyUserInputFiltersActionBindingPresent =
      selectIsApplyUserInputFiltersActionBindingPresent(getState())
    if (setFilterCalled || isApplyUserInputFiltersActionBindingPresent) {
      return
    }

    await actions.refresh()

    const total = recordStore().fold(
      () => undefined,
      (service: RecordStoreService) => service.getDatasetSize().total,
    )
    const collectionId = getCollectionName(getState())
    reportUserDataFilteringBI({
      filteredBy: fieldName,
      numberOfResults: total,
      state: context.getState(),
      componentType: component.type,
      fieldType: context.getFieldType(fieldName).getOrElse(undefined),
      schema: context.getSchema(collectionId),
    })
  }

  component.onChange(
    errorReporting(
      onChangeHandler,
      AppError.withMessage('Filter input adapter onChange failed'),
    ),
  )
}
