import type { AdaptedComponent, ComponentAdapter } from './componentFactory'
import type { WixGalleryComponent, GalleryItem } from './types'
import { baseComponentAdapter } from './baseAdapter'
import { extendComponentAdapter } from '../helpers/extendAdapter'

export type AdaptedGallery = AdaptedComponent & GalleryExtendedApi

interface GalleryExtendedApi extends Partial<AdaptedComponent> {
  clickAction: WixGalleryComponent['clickAction']
  currentItem?: GalleryItem
  currentIndex?: number
  onCurrentItemChanged: (cb: (item: GalleryItem, index: number) => void) => void
  setValue: (items: GalleryItem[]) => void
  getValue: () => GalleryItem[]
}

export const galleryAdapter: ComponentAdapter<
  WixGalleryComponent,
  AdaptedGallery
> = component => {
  // TODO this is a weird workaround for the non-progallery - figure out when they are going to fix it. The issue appears maybe/afaik when setting .items on component, but try to reproduce this same issue on Velo.
  if (component.clickAction) {
    // eslint-disable-next-line
    component.clickAction = component.clickAction
  }

  const extendedApi: GalleryExtendedApi = {
    setValue(items) {
      component.items = items
    },
    getValue() {
      return component.items
    },
    clear() {
      component.items = []
    },
    set currentIndex(index: number) {
      try {
        if (component.galleryCapabilities.hasCurrentItem) {
          component.currentIndex = index
        }
      } catch {
        // see comments in CLNT-7339, we will use a new API that will allow us to know if we can set the current index
      }
    },
    get currentIndex() {
      return component.currentIndex as number
    },
    get clickAction() {
      return component.clickAction
    },
    onCurrentItemChanged(cb) {
      if (component.galleryCapabilities.hasCurrentItem) {
        component.onCurrentItemChanged!(({ item, itemIndex }) =>
          cb(item, itemIndex),
        )
      }
    },
  }

  return extendComponentAdapter(baseComponentAdapter(component), extendedApi)
}
