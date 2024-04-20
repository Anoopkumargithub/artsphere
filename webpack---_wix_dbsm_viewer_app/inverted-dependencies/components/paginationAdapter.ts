import type { AdaptedComponent, ComponentAdapter } from './componentFactory'
import type { WixPaginationComponent } from './types'
import { baseComponentAdapter } from './baseAdapter'
import { extendComponentAdapter } from '../helpers/extendAdapter'

export type AdaptedPaginationComponent = AdaptedComponent &
  PaginationExtendedApi

interface PaginationExtendedApi extends Partial<AdaptedComponent> {
  currentPage: number
  totalPages: number
  nextEnabled: boolean
  previousEnabled: boolean
  navigationType: WixPaginationComponent['navigationType']
  onNextClicked: (cb: () => void) => void
  onPreviousClicked: (cb: () => void) => void
}

export const paginationAdapter: ComponentAdapter<
  WixPaginationComponent,
  AdaptedPaginationComponent
> = component => {
  const extendedApi: PaginationExtendedApi = {
    get currentPage() {
      return component.currentPage
    },
    set currentPage(pageIndex) {
      component.currentPage = pageIndex
    },
    get totalPages() {
      return component.totalPages
    },
    set totalPages(value) {
      component.totalPages = value
    },
    get nextEnabled() {
      return component.nextEnabled
    },
    set nextEnabled(value) {
      component.nextEnabled = value
    },
    get previousEnabled() {
      return component.previousEnabled
    },
    set previousEnabled(value) {
      component.previousEnabled = value
    },
    get navigationType() {
      return component.navigationType
    },
    set navigationType(value) {
      component.navigationType = value
    },
    onNextClicked(cb) {
      component.onNextClicked(cb)
    },
    onPreviousClicked(cb) {
      component.onPreviousClicked(cb)
    },
  }

  return extendComponentAdapter(baseComponentAdapter(component), extendedApi)
}
