import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { AppError } from '../logger'
import type { AdaptedRepeaterComponent } from '../inverted-dependencies/components/repeaterAdapter'
import { createComponentFactory } from '../inverted-dependencies/components'
import type { Scoped$W } from '../types'

export const detailsRepeaterBindingApi: ComponentDatabindingApiFactory<
  AdaptedRepeaterComponent
> = (component, connectionConfig, context) => {
  const { errorReporting } = appContext
  const { controllerFactory, controllerStore } = context

  const itemReady = (scoped$w: Scoped$W, itemData: any) => {
    const datasetScope = { repeaterId: component.id, itemId: itemData._id }
    const controller = controllerFactory.createScopedDetailsDataset({
      datasetScope,
    })
    controllerStore.setController(datasetScope, controller)
    const componentFactory = createComponentFactory(scoped$w.scoped)
    controller.pageReady(componentFactory)
  }

  const itemRemoved = (itemData: any) => {
    const datasetScope = { repeaterId: component.id, itemId: itemData._id }
    controllerStore.removeController(datasetScope)
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),
    bind() {
      component.onItemReady(
        errorReporting(
          itemReady,
          AppError.withMessage('Details repeater adapter onItemReady failed'),
        ),
      )
      component.onItemRemoved(
        errorReporting(
          itemRemoved,
          AppError.withMessage('Details repeater adapter onItemRemoved failed'),
        ),
      )
    },
  }
}
