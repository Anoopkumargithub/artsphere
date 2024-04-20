import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import type { UserFilterMinMaxInitialData } from '../dataset-controller/rootReducer'
import { getUserFilterInitialData as getUserFilterInitialDataFromState } from '../dataset-controller/rootReducer'
import type { AdaptedComponent } from '../inverted-dependencies/components'
import type { AdaptedRangeSlider } from '../inverted-dependencies/components/rangeSliderAdapter'
import type { UoUFilterConnectionConfig } from '../types'
import { handleUserInputFilterOnChange } from './utils'
import { isValidUserInputFilterConnectionConfig } from '../helpers/isValidUserInputFilterConfig'

export const userInputFilterRangeSliderBindingApi: ComponentDatabindingApiFactory<
  AdaptedComponent,
  UoUFilterConnectionConfig
> = (component, connectionConfig, context) => {
  const { getState } = context

  const getUserFilterInitialData = (
    fieldName: string,
  ): { min: number; max: number } | null => {
    const userFilterInitialData = getUserFilterInitialDataFromState(
      getState(),
    )?.find(
      userFilterInitialData =>
        userFilterInitialData.fieldName === fieldName &&
        userFilterInitialData.role === component.role,
    )

    if (!userFilterInitialData) {
      return null
    }

    const { min, max } = userFilterInitialData as UserFilterMinMaxInitialData
    if (min === undefined || max === undefined) {
      return null
    }

    return { min, max }
  }

  const setComponentValue = ({
    firstRender,
    min,
    max,
  }: {
    firstRender: boolean
    min: number
    max: number
  }) => {
    const {
      userInputFilter: { prop },
    } = connectionConfig

    if (firstRender) {
      ;(component as AdaptedRangeSlider).setBounds(min, max)
    }

    component.setValue([min, max], { propPath: prop })
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),

    isValidConnection() {
      return isValidUserInputFilterConnectionConfig(connectionConfig)
    },

    bind() {
      const userFilterInitialData = getUserFilterInitialData(
        connectionConfig.userInputFilter.fieldName,
      )
      if (userFilterInitialData) {
        handleUserInputFilterOnChange(component, connectionConfig, context)

        setComponentValue({ firstRender: true, ...userFilterInitialData })
      }
    },

    resetUserFilter() {
      const userFilterInitialData = getUserFilterInitialData(
        connectionConfig.userInputFilter.fieldName,
      )
      if (userFilterInitialData) {
        setComponentValue({ firstRender: false, ...userFilterInitialData })
      }
    },
  }
}
