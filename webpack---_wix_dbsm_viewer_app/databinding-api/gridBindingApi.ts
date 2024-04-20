import { forEach, get } from 'lodash'
import type { ComponentDatabindingApiFactory } from './types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { AppError } from '../logger'
import type { AdaptedGridComponent } from '../inverted-dependencies/components/gridAdapter'
import { selectCurrentRecord } from '../dataset-controller/rootReducer'

interface GridView {
  start: number
  end: number
}
const initialView: GridView = { start: 0, end: 0 }

export const gridBindingApi: ComponentDatabindingApiFactory<
  AdaptedGridComponent
> = (component, connectionConfig, context) => {
  const { errorReporting } = appContext
  const { datasetApi, getState, modeIsLivePreview, actions } = context
  let currentView = initialView

  const setCurrentView = (view: GridView) => (currentView = view)
  const resetCurrentView = () => setCurrentView(initialView)

  const createOffsetBasedDataFetcher =
    ({ fetchRows, logGridValue, disableNavigation = false }: any) =>
    async (startRow: number, endRow: number) => {
      const { items, datasetSize } = await fetchRows(
        startRow,
        endRow - startRow,
      )
      logGridValue(items)

      return {
        pageRows: items,
        totalRowsCount: disableNavigation ? items.length : datasetSize.total,
      }
    }

  const createCursorBasedDataFetcher =
    ({ fetchRows, logGridValue }: any) =>
    async ({ direction, limit }: any) => {
      let { start, end } = currentView

      if (direction === 'previous') {
        end = start
        start = start - limit
      } else {
        start = end
        end = end + limit
      }

      const { items, datasetSize } = await fetchRows(start, end - start)

      setCurrentView({ start, end })

      component.nextEnabled = !!datasetSize.cursor || end < datasetSize.loaded
      component.previousEnabled = start > 0

      logGridValue(items)

      return {
        pageRows: items,
        totalRowsCount: datasetSize.total || undefined,
      }
    }

  const logVerboseForBinding = () => {
    const bindingDescription: Record<
      string,
      { dataPath?: string; linkPath?: string }
    > = {}

    component.columns.forEach(({ label, dataPath, linkPath }) => {
      if (dataPath || linkPath) {
        bindingDescription[label] = Object.assign(
          dataPath ? { dataPath } : {},
          linkPath ? { linkPath } : {},
        )
      }
    })
  }

  const logVerboseValueDescription = (items: Record<any, any>[]) => {
    const valueDescription: any[] = []
    const columns = component.columns

    forEach(items, item => {
      const value: Record<string, string> = {}
      forEach(columns, column => {
        value[column.label] = get(item, column.dataPath)
      })
      valueDescription.push(value)
    })
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),

    bind() {
      // Synchronously set initial data for SEO rendering
      actions.getInitialData().chain(({ items }: any) => {
        component.rows = items
      })

      const record = selectCurrentRecord(getState())

      if (modeIsLivePreview && !record) {
        return
      }

      const isCursor = actions.isCursorPaging()

      component.dataFetcher = isCursor
        ? {
            type: 'directional',
            value: createCursorBasedDataFetcher({
              fetchRows: actions.fetch,
              logGridValue: logVerboseValueDescription,
              component: component,
            }),
          }
        : {
            type: 'pages',
            value: createOffsetBasedDataFetcher({
              fetchRows: actions.fetch,
              logGridValue: logVerboseValueDescription,
            }),
          }

      component.onCellSelect(
        errorReporting(({ cellRowIndex }: { cellRowIndex: number }) => {
          datasetApi.setCurrentItemIndex(cellRowIndex)
        }, AppError.withMessage('Grid adapter onCellSelect failed')),
      )

      component.onRowSelect(
        errorReporting(({ rowIndex }: { rowIndex: number }) => {
          datasetApi.setCurrentItemIndex(rowIndex)
        }, AppError.withMessage('Grid adapter onRowSelect failed')),
      )
      logVerboseForBinding()
    },

    async onCurrentRecordModified() {
      component.refresh()
    },

    async onRecordsLoaded() {
      resetCurrentView()
      component.refresh()
    },

    async onCurrentViewChanged() {
      resetCurrentView()
      component.refresh()
    },
  }
}
