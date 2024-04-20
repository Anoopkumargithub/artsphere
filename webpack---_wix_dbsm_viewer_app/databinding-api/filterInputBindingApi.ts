import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { AppError } from '../logger'
import {
  getInputComponentDefaultValue,
  getInputComponentValueAccessorName,
} from '../components/helpers/componentValueUtils'
import { isNonEmptyConfig } from '../components/helpers/connectionConfigUtils'

export const filterInputBindingApi: ComponentDatabindingApiFactory = (
  component,
  connectionConfig,
  context,
) => {
  const { errorReporting } = appContext
  const { actions } = context

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),
    isValidConnection() {
      return isNonEmptyConfig(connectionConfig)
    },
    bind() {
      component.onChange(
        errorReporting(
          actions.refresh,
          AppError.withMessage('Filter input adapter onChange failed'),
        ),
      )
    },

    // TODO: maybe we can reuse .clear and also handle default values in there
    // TODO: or use component.setValue(defaultValue, options) inside actions.resetUserInputFilters
    resetUserFilter() {
      const propPath = getInputComponentValueAccessorName(component)
      component.setValue(getInputComponentDefaultValue(component), {
        propPath,
      })
    },
  }
}
