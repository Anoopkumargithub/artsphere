import { forEach } from 'lodash'
import type { ComponentDatabindingApiFactory } from './types'
import type { ComponentRole, GalleryConnectionConfig } from '../types'
import type { AdaptedGallery } from '../inverted-dependencies/components/galleryAdapter'
import type { GalleryItem } from '../inverted-dependencies/components/types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { AppError } from '../logger'
import { selectCurrentRecord } from '../dataset-controller/rootReducer'
import {
  getFieldValue,
  transformFromExpressionToView,
} from '../components/helpers'
import { transformFromRecordToView } from '../components/transformData'
import { getCurrentItemIndex } from '../helpers/paginationUtils'
import type { RecordStoreRecord } from '../record-store/service'
import { isNonEmptyConfig } from '../components/helpers/connectionConfigUtils'

export const galleryBindingApi: ComponentDatabindingApiFactory<
  AdaptedGallery,
  GalleryConnectionConfig
> = (component, connectionConfig, context) => {
  const { logger, errorReporting } = appContext
  const { actions, getState, getFieldType, modeIsLivePreview, wixFormatter } =
    context

  const copyRecordToImage = (
    image: GalleryItem,
    record: RecordStoreRecord,
    connectionConfig: GalleryConnectionConfig,
    role: ComponentRole,
  ) => {
    forEach(connectionConfig.expressions, ({ expression }, propPath) => {
      const { value } = transformFromExpressionToView({
        expression,
        record,
        prop: propPath,
        role,
        logger,
      })
      image[propPath as keyof Omit<GalleryItem, 'type'>] = value
    })
    forEach(connectionConfig.properties, ({ fieldName, format }, propPath) => {
      const value = transformFromRecordToView({
        value: getFieldValue(record, fieldName),
        role,
        fieldType: getFieldType(fieldName).getOrElse(undefined),
        propPath,
        format,
        utils: {
          formatter: wixFormatter,
        },
      })
      image[propPath as keyof GalleryItem] = value
    })
  }

  const setCurrentIndexOfGallery = () => {
    component.currentIndex = getCurrentItemIndex({
      state: getState(),
    }) as number
  }

  const refreshView = async () => {
    const { role } = component

    const { items: records } = await actions.fetchCurrentItems(getState())

    try {
      const items = records.map(record => {
        const image = {} as GalleryItem
        copyRecordToImage(image, record, connectionConfig, role)
        return image
      })
      const noImages = items.every(({ src }) => !src)

      if (modeIsLivePreview && noImages) {
        return
      }

      component.setValue(items)
    } catch (e: any) {
      // is the value bound to the src property bad?
      if (e.name !== 'URIError') {
        throw e
      }
    }

    setCurrentIndexOfGallery()
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),

    isValidConnection() {
      return isNonEmptyConfig(connectionConfig)
    },

    bind() {
      component.onCurrentItemChanged(
        errorReporting(() => {
          actions.setCurrentIndex(component.currentIndex as number)
        }, AppError.withMessage('Gallery adapter onItemReady failed')),
      )
    },

    async onCurrentRecordModified() {
      const { role } = component

      const record = selectCurrentRecord(getState())
      const currentIndex = getCurrentItemIndex({ state: getState() }) as number

      const imagesToBeChanged = component.getValue() || []
      const imageToBeChanged = imagesToBeChanged[currentIndex]

      if (imageToBeChanged) {
        copyRecordToImage(imageToBeChanged, record, connectionConfig, role)
      }

      component.setValue(imagesToBeChanged)
      setCurrentIndexOfGallery()
    },

    async onRecordsLoaded() {
      refreshView()
    },

    async onCurrentViewChanged() {
      refreshView()
    },

    async onCurrentIndexChanged() {
      setCurrentIndexOfGallery()
    },
  }
}
