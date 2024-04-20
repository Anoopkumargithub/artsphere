import { clamp } from 'lodash'
import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { AppError } from '../logger'
import { getCurrentPageIndex, getPageSize } from '../helpers/paginationUtils'
import type { AdaptedPaginationComponent } from '../inverted-dependencies/components/paginationAdapter'

const beginningOfPage = (pageNumber: number, pageSize: number) =>
  pageSize * (pageNumber - 1)

export const paginationBindingApi: ComponentDatabindingApiFactory<
  AdaptedPaginationComponent
> = (component, connectionConfig, context) => {
  const { errorReporting } = appContext
  const { actions, getState } = context

  const refreshOffsetBased = () => {
    const currentPage = getCurrentPageIndex({ state: getState() }) as number
    const totalPages = actions.getTotalPageCount(getState()) as number

    component.currentPage = currentPage

    if (totalPages < 1) {
      component.disable()
    } else {
      component.enable()
      component.totalPages = totalPages
    }
  }

  const refreshCursorBased = () => {
    const currentPage = getCurrentPageIndex({ state: getState() }) as number

    component.nextEnabled = actions.hasNextPage(getState())
    component.previousEnabled = currentPage > 1
  }

  const refreshView = () => {
    if (actions.isCursorPaging()) {
      refreshCursorBased()
    } else {
      refreshOffsetBased()
    }
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),

    bind() {
      const isCursor = actions.isCursorPaging()

      const navigateToPage = ({
        delta,
        index,
      }: {
        delta?: number
        index?: number
      }) => {
        const currentPage = getCurrentPageIndex({ state: getState() }) as number
        const requestedPage = (delta ? currentPage + delta : index) as number
        const pageSize = getPageSize({ state: getState() })
        const pageIndex = isCursor
          ? requestedPage
          : clamp(
              requestedPage,
              1,
              actions.getTotalPageCount(getState()) as number,
            )

        actions.setCurrentIndex(beginningOfPage(pageIndex, pageSize))
      }

      if (isCursor) {
        component.navigationType = 'arrowsOnly'

        component.onNextClicked(
          errorReporting(
            () => navigateToPage({ delta: 1 }),
            AppError.withMessage('Pagination adapter onNextClicked failed'),
          ),
        )
        component.onPreviousClicked(
          errorReporting(
            () => navigateToPage({ delta: -1 }),
            AppError.withMessage('Pagination adapter onPreviousClicked failed'),
          ),
        )
      } else {
        component.onChange(
          errorReporting(
            (event: any) => navigateToPage({ index: event.target.currentPage }),
            AppError.withMessage('Pagination adapter onChange failed'),
          ),
        )
      }
    },

    async onRecordsLoaded() {
      refreshView()
    },

    async onCurrentViewChanged() {
      refreshView()
    },
  }
}
