import * as readWriteModes from '@wix/wix-data-client-common-standalone'
import { getReadWriteType } from '../dataset-config/datasetConfigParser'
import type { DatasetApi, DatasetConfig, DatasetStore } from '../types'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { ConsoleEvent, DatasetError } from '../logger'

export const subscribeDetailsDatasetsToMasterOnReady = ({
  detailsDatasetApis,
  masterDatasetApi,
  controllerConfig,
  unsubscribeHandlers,
}: {
  detailsDatasetApis: DatasetApi[]
  masterDatasetApi: DatasetApi
  controllerConfig: DatasetConfig['config']
  unsubscribeHandlers: (() => void)[]
}) => {
  const { logger } = appContext

  detailsDatasetApis.forEach(detailsDatasetApi => {
    const onReady = () => {
      unsubscribeHandlers.push(
        refreshDetailsDatasetWhenMasterChanges({
          masterDatasetApi,
          masterDatasetConfig: controllerConfig,
          detailsDatasetApi,
        }),
      )
    }

    try {
      unsubscribeHandlers.push(masterDatasetApi.onReady(onReady))
    } catch (e) {
      logger.log(
        new ConsoleEvent(
          new DatasetError(
            `The dataset cannot filter by the dynamic dataset because the field used to build this page's URL is empty`,
            { code: 'DS_EMPTY_URL_FIELD', cause: e },
          ),
          'error',
        ),
      )
    }
  })
}

const refreshDetailsDatasetWhenMasterChanges = ({
  masterDatasetConfig,
  masterDatasetApi,
  detailsDatasetApi,
}: {
  masterDatasetConfig: DatasetConfig['config']
  masterDatasetApi: DatasetApi
  detailsDatasetApi: DatasetApi
}) => {
  const masterReadWriteType = getReadWriteType(masterDatasetConfig.dataset)

  let indexChangeUnsubscribe: () => void
  if (masterReadWriteType !== readWriteModes.WRITE) {
    indexChangeUnsubscribe = masterDatasetApi.onCurrentIndexChanged(() =>
      detailsDatasetApi.onReady(() => detailsDatasetApi.refresh()),
    )
  }

  let valuesChangeUnbsubscribe: () => void
  if (masterReadWriteType !== readWriteModes.READ) {
    valuesChangeUnbsubscribe = masterDatasetApi.onItemValuesChanged(() =>
      detailsDatasetApi.refresh(),
    )
  }

  return () =>
    [indexChangeUnsubscribe, valuesChangeUnbsubscribe].forEach(cb => cb?.())
}

export const waitForAllScopedDatasetsToBeReady = (
  controllerStore: DatasetStore,
) => {
  return Promise.all(
    controllerStore.getAll().map(
      controller =>
        new Promise(resolve => {
          controller.staticExports.onReady(resolve)
        }),
    ),
  )
}
