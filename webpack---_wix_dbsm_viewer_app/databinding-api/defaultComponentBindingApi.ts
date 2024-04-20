import { forEach } from 'lodash'
import type { Action as TpaAction } from '@wix/data-binding-tpa-actions'
import { prefix as tpaActionPrefix } from '@wix/data-binding-tpa-actions'
import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { AppError, DataBindingError } from '../logger'
import type { DynamicPageUrlADT } from '../dataset-controller/rootReducer'
import {
  selectCurrentRecord,
  selectNextDynamicPageUrl,
  selectPreviousDynamicPageUrl,
} from '../dataset-controller/rootReducer'
import { getEmptyValueForFieldType, getFieldValue } from '../components/helpers'
import { updateComponentProps } from '../components/helpers/componentValueUtils'
import type {
  Behavior,
  ConnectionConfigEvent,
  ConnectionConfigEventName,
} from '../types'
import type { RecordStoreRecord } from '../record-store/service'
import { isNonEmptyConfig } from '../components/helpers/connectionConfigUtils'

export const defaultComponentBindingApi: ComponentDatabindingApiFactory = (
  component,
  connectionConfig,
  context,
) => {
  const {
    logger,
    platform: { location, utils, executeTpaAction },
  } = appContext
  const { getState, getFieldType, wixFormatter, modeIsLivePreview } = context

  const updateComponent = (previousRecord?: RecordStoreRecord) => {
    updateComponentProps({
      currentRecord: selectCurrentRecord(getState()),
      previousRecord,
      component,
      connectionConfig,
      formatter: wixFormatter,
      modeIsLivePreview,
      getFieldType,
      logger,
      recordStore: context.recordStore,
      actions: context.actions,
    })
  }

  const getNavigateUrl = (navigate: any, record: RecordStoreRecord) => {
    if (navigate.fieldName) {
      return getFieldValue(record, navigate.fieldName)
    }
    if (navigate.linkObject) {
      return utils.links.toUrl(navigate.linkObject)
    }
  }

  const navigateToDynamicPage = (dynamicPageUrlState: DynamicPageUrlADT) =>
    dynamicPageUrlState.matchWith({
      Empty() {},
      Loading() {},
      Loaded({ url }: any) {
        location.navigateTo(url)
      },
    })

  const bindEvents = (
    events: Record<ConnectionConfigEventName, ConnectionConfigEvent>,
  ) => {
    const { datasetApi, getState, actions } = context
    forEach(events, ({ action, postAction }, eventName) => {
      component.on(eventName as ConnectionConfigEventName, async () => {
        try {
          if (action.startsWith(tpaActionPrefix)) {
            const currentItem = datasetApi.getCurrentItem()
            await executeTpaAction({ currentItem, action: action as TpaAction })
            return
          }
          if (action === 'nextDynamicPage') {
            return navigateToDynamicPage(selectNextDynamicPageUrl(getState()))
          }
          if (action === 'previousDynamicPage') {
            return navigateToDynamicPage(
              selectPreviousDynamicPageUrl(getState()),
            )
          }
          if (action === 'applyUserInputFilters') {
            return actions.refresh()
          }
          if (action === 'resetUserFilter') {
            return actions.resetUserInputFilters()
          }

          const record = await Promise.resolve(datasetApi[action]())

          if (postAction && postAction.navigate) {
            const url = getNavigateUrl(postAction.navigate, record)
            location.navigateTo(url)
          }
        } catch (e) {
          // error could have already been logged in datasetApi, so no need to log it again here
          // TODO: but if in some future the internal and external datasetApi's will be split
          // don't forget to properly log errors here.
          if (!(e instanceof DataBindingError)) {
            logger.log(
              new AppError(`${action} operation failed:`, { cause: e }),
            )
          }
        }
      })
    })
  }

  const bindBehaviors = (behaviors: Behavior[]) => {
    const {
      dispatcher,
      eventListeners: { register },
    } = context

    behaviors.forEach((behavior: Behavior) => {
      let ignoreNextIndexChange = false
      switch (behavior.type) {
        case 'saveSuccessFeedback':
          register('beforeSave', () => component.hide())
          register('afterSave', () => {
            component.show()
            ignoreNextIndexChange = true
          })
          register('currentIndexChanged', () => {
            if (ignoreNextIndexChange) {
              ignoreNextIndexChange = false
            } else {
              component.hide()
            }
          })
          register('itemValuesChanged', () => component.hide())
          break
        case 'saveFailureFeedback':
          register('beforeSave', () => component.hide())
          register('currentIndexChanged', () => component.hide())
          dispatcher.subscribe('datasetSaveError', () => component.show())
          break
      }
    })
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),
    isValidConnection() {
      return isNonEmptyConfig(connectionConfig)
    },
    bind() {
      const { events, behaviors } = connectionConfig
      if (events) {
        bindEvents(events)
      }
      if (behaviors) {
        bindBehaviors(behaviors)
      }
    },

    clear() {
      const { getFieldType } = context
      const { properties } = connectionConfig
      forEach(properties, (binding, propPath) => {
        const fieldType = getFieldType(binding.fieldName).getOrElse(undefined)
        const emptyValue = getEmptyValueForFieldType(fieldType)
        component.setValue(emptyValue, { propPath, fieldType, binding })
      })
    },

    async onRecordsLoaded() {
      const { behaviors } = component.connectionConfig

      updateComponent()

      if (behaviors) {
        behaviors.forEach(behavior => {
          if (behavior.type === 'saveSuccessFeedback') {
            component.hide()
          }
        })
      }
    },

    async onCurrentViewChanged() {
      updateComponent()
    },

    async onCurrentIndexChanged() {
      updateComponent()
    },

    async onCurrentRecordModified(previousRecord) {
      updateComponent(previousRecord)
    },
  }
}
