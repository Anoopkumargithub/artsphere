import { ITEM_TYPES } from '@wix/advanced-seo-utils/api'
import type { Platform } from '../inverted-dependencies/Platform'
import { AppError } from '../logger'
import type { CollectionSeoData, DynamicItemPageSeoData } from './types'
import { appContext } from '../viewer-app-module/DataBindingAppContext'

interface Params {
  pageUrl: string
  seo: Platform['seo']
}

interface RegularDatasetSeo {
  title: never
  collectionData?: CollectionSeoData
}

interface DynamicDatasetSeo {
  title?: string
  collectionData?: CollectionSeoData
}

export type DatasetSeo = RegularDatasetSeo | DynamicDatasetSeo

export const createSeoManager = ({ seo, pageUrl }: Params) => {
  const { logger } = appContext
  let renderSeoTagsPromise: Promise<void> | undefined

  const aggregatedItemData: DynamicItemPageSeoData = {
    title: undefined,
    pageUrl,
    collections: [],
  }

  return {
    submitSeoData: ({ title, collectionData }: DatasetSeo) => {
      if (renderSeoTagsPromise) {
        return
      }
      if (title) {
        aggregatedItemData.title = title
      }

      if (collectionData) {
        aggregatedItemData.collections.push(collectionData)
      }
    },
    renderSeoTagsOnce: () => {
      if (!renderSeoTagsPromise) {
        renderSeoTagsPromise = seo
          .renderSEOTags({
            itemType: ITEM_TYPES.WIX_DATA_PAGE_ITEM,
            itemData: aggregatedItemData,
          })
          .catch((error: any) => {
            logger.log(
              new AppError('Failed to render seo tags', { cause: error }),
            )
          })
      }
      return renderSeoTagsPromise
    },
  }
}
