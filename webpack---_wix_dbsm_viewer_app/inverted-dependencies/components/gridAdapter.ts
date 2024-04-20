import type { AdaptedComponent, ComponentAdapter } from './componentFactory'
import type { WixGridComponent, GridColumn } from './types'
import { baseComponentAdapter } from './baseAdapter'
import { extendComponentAdapter } from '../helpers/extendAdapter'

export type AdaptedGridComponent = AdaptedComponent & GridExtendedApi

export interface GridExtendedApi extends Partial<AdaptedComponent> {
  rows: any[]
  columns: GridColumn[]
  dataFetcher: GridDataFetcher
  nextEnabled: boolean
  previousEnabled: boolean
  refresh: () => void
  onCellSelect: (cb: (params: { cellRowIndex: number }) => void) => void
  onRowSelect: (cb: (params: { rowIndex: number }) => void) => void
  setValue: (items: any[]) => void
}

type GridDataFetcher = any

export const gridAdapter: ComponentAdapter<
  WixGridComponent,
  AdaptedGridComponent
> = component => {
  const extendedApi: GridExtendedApi = {
    get nextEnabled() {
      return component.nextEnabled
    },
    set nextEnabled(value: boolean) {
      component.nextEnabled = value
    },
    get previousEnabled() {
      return component.previousEnabled
    },
    set previousEnabled(value: boolean) {
      component.previousEnabled = value
    },
    setValue(items: any[]) {
      component.rows = items
    },
    getValue() {
      return component.rows
    },
    set rows(items: any[]) {
      extendedApi.setValue(items)
    },
    get rows() {
      return component.rows
    },
    get columns() {
      return component.columns
    },
    clear() {
      component.rows = []
      component.dataFetcher = undefined
    },
    set dataFetcher(dataFetcher: GridDataFetcher) {
      component.dataFetcher = dataFetcher
    },
    refresh() {
      return component.refresh()
    },
    onCellSelect(cb) {
      return component.onCellSelect(cb)
    },
    onRowSelect(cb) {
      return component.onRowSelect(cb)
    },
  }

  return extendComponentAdapter(baseComponentAdapter(component), extendedApi)
}
