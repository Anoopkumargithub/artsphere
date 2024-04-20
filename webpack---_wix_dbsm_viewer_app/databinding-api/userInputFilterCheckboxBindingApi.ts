import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import type { AdaptedComponent } from '../inverted-dependencies/components'
import type { UoUFilterConnectionConfig } from '../types'
import { handleUserInputFilterOnChange } from './utils'
import { isValidUserInputFilterConnectionConfig } from '../helpers/isValidUserInputFilterConfig'

export const userInputFilterCheckboxBindingApi: ComponentDatabindingApiFactory<
  AdaptedComponent,
  UoUFilterConnectionConfig
> = (component, connectionConfig, context) => {
  const setInitialComponentValue = () => {
    const {
      userInputFilter: { prop },
    } = connectionConfig
    component.setValue(null, { propPath: prop })
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),

    isValidConnection() {
      return isValidUserInputFilterConnectionConfig(connectionConfig)
    },

    bind() {
      handleUserInputFilterOnChange(component, connectionConfig, context)

      setInitialComponentValue()
      return
    },

    resetUserFilter() {
      setInitialComponentValue()
    },
  }
}
