import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { selectCurrentRecord } from '../dataset-controller/rootReducer'
import { AppError } from '../logger'
import type { AdaptedRepeaterComponent } from '../inverted-dependencies/components/repeaterAdapter'
import { createComponentFactory } from '../inverted-dependencies/components'
import type { Scoped$W } from '../types'

export const repeaterBindingApi: ComponentDatabindingApiFactory<
  AdaptedRepeaterComponent
> = (component, connectionConfig, context) => {
  const { errorReporting } = appContext
  const { controllerFactory, controllerStore } = context

  const itemReadyPromises: Promise<void>[] = []

  const itemReady = (scoped$w: Scoped$W, itemData: any) => {
    const datasetScope = { repeaterId: component.id, itemId: itemData._id }
    const controller = controllerFactory.createScopedDataset({
      datasetScope,
      fixedItem: itemData,
    })
    controllerStore.setController(datasetScope, controller)
    const componentFactory = createComponentFactory(scoped$w.scoped)
    const pageReadyPromise = controller.pageReady(componentFactory)
    itemReadyPromises.push(pageReadyPromise)
  }

  const itemRemoved = (itemData: any) => {
    const datasetScope = {
      repeaterId: component.id,
      itemId: itemData._id,
    }
    controllerStore.removeController(datasetScope)
  }

  const setData = async () => {
    const { actions, getState, modeIsLivePreview } = context
    const { items } = await actions.fetchCurrentItems(getState())
    if (modeIsLivePreview && items.length === 0) {
      return
    }

    component.setValue(items)

    await Promise.all(itemReadyPromises)

    itemReadyPromises.splice(0)
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),
    bind() {
      component.onItemReady(
        errorReporting(
          itemReady,
          AppError.withMessage('Repeater adapter onItemReady failed'),
        ),
      )

      component.onItemRemoved(
        errorReporting(
          itemRemoved,
          AppError.withMessage('Repeater adapter onItemRemoved failed'),
        ),
      )
    },

    async onRecordsLoaded() {
      return setData()
    },

    async onCurrentViewChanged() {
      setData()
    },

    async onCurrentIndexChanged() {},

    async onCurrentRecordModified() {
      const { getState } = context
      const updatedItem = selectCurrentRecord(getState())
      const currentItems = component.getValue() as any[]
      if (currentItems && currentItems.length > 0) {
        const newItems = currentItems.map(item =>
          item._id === updatedItem._id ? updatedItem : item,
        )
        component.setValue(newItems)
      }
    },
  }
}
