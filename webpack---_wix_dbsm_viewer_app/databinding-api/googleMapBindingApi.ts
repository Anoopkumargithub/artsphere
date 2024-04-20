import { get, isEmpty, reduce } from 'lodash'
import type { FieldType } from '@wix/wix-data-schema-types'
import type { ComponentDatabindingApiFactory } from './types'
import type { ComponentRole, GoogleMapConnectionConfig } from '../types'
import type { MapMarker } from '../inverted-dependencies/components/types'
import { baseComponentBindingApi } from './baseComponentBindingApi'
import { appContext } from '../viewer-app-module/DataBindingAppContext'
import { AppError } from '../logger'
import { getCurrentItemIndex } from '../helpers/paginationUtils'
import type { AdaptedGoogleMapComponent } from '../inverted-dependencies/components/googleMapAdapter'
import { getFieldValue } from '../components/helpers'
import { transformFromRecordToView } from '../components/transformData'
import { selectCurrentRecord } from '../dataset-controller/rootReducer'
import type { RecordStoreRecord } from '../record-store/service'
import { isNonEmptyConfig } from '../components/helpers/connectionConfigUtils'
import { evaluateExpression, getExpressionFunctions } from '@wix/expressions'

export const googleMapBindingApi: ComponentDatabindingApiFactory<
  AdaptedGoogleMapComponent,
  GoogleMapConnectionConfig
> = (component, connectionConfig, context) => {
  const { logger } = appContext
  const { actions, getState, getFieldType, wixFormatter } = context

  const createMarkerFromRecord = (
    record: RecordStoreRecord,
    { expressions = {}, properties = {} }: GoogleMapConnectionConfig,
    role: ComponentRole,
  ): MapMarker => {
    const assign = ({
      propPath,
      marker,
      value,
      fieldType,
      format,
    }: {
      propPath: string
      marker: MapMarker
      value: any
      fieldType?: FieldType
      format?: string
    }): MapMarker => {
      if (propPath === 'address') {
        return Object.assign(marker, {
          address: get(value, 'formatted'),
          location: get(value, 'location'),
        })
      } else if (propPath === 'link' && isEmpty(value)) {
        return marker
      }

      const convertedValue = transformFromRecordToView({
        value,
        role,
        fieldType,
        propPath,
        format,
        utils: {
          formatter: wixFormatter,
        },
      })
      return Object.assign(marker, {
        [propPath]: convertedValue,
      })
    }

    let mapMarker = {} as MapMarker
    mapMarker = reduce(
      expressions,
      (marker, { expression }, propPath) => {
        const value = evaluateExpression({
          expression,
          variables: record,
          functions: getExpressionFunctions()!,
        })
        return assign({
          propPath,
          marker,
          value,
        })
      },
      mapMarker,
    )
    mapMarker = reduce(
      properties,
      (marker, { fieldName, format }, propPath) => {
        const value = getFieldValue(record, fieldName)
        return assign({
          propPath,
          marker,
          format,
          value,
          fieldType: getFieldType(fieldName).getOrElse(undefined),
        })
      },
      mapMarker,
    )
    return mapMarker
  }

  const updateComponentFromRecords = async () => {
    const { role } = component
    try {
      const { items: records } = await actions.fetchCurrentItems(getState())
      component.markers = records.map(record =>
        createMarkerFromRecord(record, connectionConfig, role),
      )
    } catch (e) {
      logger.log(new AppError('Failed setting markers', { cause: e }))
    }
  }

  return {
    ...baseComponentBindingApi(component, connectionConfig, context),

    isValidConnection() {
      return isNonEmptyConfig(connectionConfig)
    },

    async onRecordsLoaded() {
      updateComponentFromRecords()
    },

    async onCurrentViewChanged() {
      updateComponentFromRecords()
    },

    async onCurrentIndexChanged() {
      const currentIndex = getCurrentItemIndex({ state: getState() }) as number
      component.setCenter(get(component, ['markers', currentIndex, 'location']))
    },

    async onCurrentRecordModified() {
      const { role } = component
      const record = selectCurrentRecord(getState())
      const currentIndex = getCurrentItemIndex({ state: getState() }) as number
      component.markers[currentIndex] = createMarkerFromRecord(
        record,
        connectionConfig,
        role,
      )
      component.setCenter(get(component, ['markers', currentIndex, 'location']))
    },
  }
}
