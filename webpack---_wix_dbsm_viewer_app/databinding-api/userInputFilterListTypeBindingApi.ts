import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import type { UserFilterListInitialData } from '../dataset-controller/rootReducer'
import { getUserFilterInitialData as getUserFilterInitialDataFromState } from '../dataset-controller/rootReducer'
import type {
  AdaptedComponent,
  Option,
} from '../inverted-dependencies/components'
import type { UoUFilterConnectionConfig } from '../types'
import {
  LIST_TYPE_USER_INPUT_FILTER_ROLES,
  RESET_ALL,
} from '../helpers/constants'
import { handleUserInputFilterOnChange } from './utils'
import { isValidUserInputFilterConnectionConfig } from '../helpers/isValidUserInputFilterConfig'
import { USER_INPUT_FILTER_CONDITIONS } from '@wix/wix-data-client-common'

const { NOT_EQUALS, EXCLUDES_ANY } = USER_INPUT_FILTER_CONDITIONS

export const userInputFilterListTypeBindingApi: ComponentDatabindingApiFactory<
  AdaptedComponent,
  UoUFilterConnectionConfig
> = (component, connectionConfig, context) => {
  const { i18n } = appContext
  const { getState } = context

  const getUserFilterInitialData = (fieldName: string) =>
    getUserFilterInitialDataFromState(getState())?.find(
      userFilterInitialData =>
        userFilterInitialData.fieldName === fieldName &&
        LIST_TYPE_USER_INPUT_FILTER_ROLES.includes(userFilterInitialData.role),
    )

  const componentHasPlaceholderField = (component: any) =>
    'placeholder' in component

  const setInitialComponentValue = (prop: string) => {
    const value = Array.isArray(component.getValue({ propPath: prop }))
      ? []
      : RESET_ALL
    component.setValue(value, { propPath: prop })
  }

  const getDefaultOptionLabel = (condition: USER_INPUT_FILTER_CONDITIONS) => {
    const excludingConditions: USER_INPUT_FILTER_CONDITIONS[] = [
      NOT_EQUALS,
      EXCLUDES_ANY,
    ]

    if (excludingConditions.includes(condition)) {
      return i18n.t('USER_INPUT_FILTER_OPTION_NONE')
    } else {
      return i18n.t('USER_INPUT_FILTER_OPTION_RESET_ALL')
    }
  }

  const getComponentOptions = ({
    component,
    prop,
    userFilterInitialData,
    condition,
  }: {
    component: AdaptedComponent
    prop: string
    userFilterInitialData: UserFilterListInitialData
    condition: USER_INPUT_FILTER_CONDITIONS
  }) =>
    [
      !Array.isArray(component.getValue({ propPath: prop })) && {
        value: RESET_ALL,
        label: getDefaultOptionLabel(condition),
      },
      ...userFilterInitialData.options.map((option: string | number) => ({
        value: String(option),
        label: String(option),
      })),
    ].filter(Boolean) as Option[]

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),

    isValidConnection() {
      return isValidUserInputFilterConnectionConfig(connectionConfig)
    },

    bind() {
      handleUserInputFilterOnChange(component, connectionConfig, context)

      const {
        userInputFilter: { prop, fieldName, condition },
      } = connectionConfig

      const userFilterInitialData = getUserFilterInitialData(fieldName)

      if (userFilterInitialData) {
        component.setOptions(
          getComponentOptions({
            component,
            prop,
            userFilterInitialData:
              userFilterInitialData as UserFilterListInitialData,
            condition: condition as USER_INPUT_FILTER_CONDITIONS,
          }),
        )

        if (!componentHasPlaceholderField(component)) {
          setInitialComponentValue(prop)
        }
      }
    },

    resetUserFilter() {
      const {
        userInputFilter: { prop },
      } = connectionConfig
      if (component.getValue({ propPath: prop })) {
        setInitialComponentValue(prop)
      }
    },
  }
}
