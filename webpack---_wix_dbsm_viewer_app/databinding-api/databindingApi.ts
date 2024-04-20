import { cloneDeep } from 'lodash'
import { Maybe } from '@wix/wix-data-client-wix-code-adt'
import {
  REPEATER_ROLE,
  DETAILS_REPEATER_ROLE,
  USER_INPUT_FILTER_V1_ROLE,
  GRID_ROLE,
  DROPDOWN_OPTIONS_ROLE,
  MOBUI_PICKER_OPTIONS_ROLE,
  SELECTION_TAGS_OPTIONS_ROLE,
  UPLOAD_BUTTON_ROLE,
  GALLERY_ROLE,
  PAGINATION_ROLE,
  GOOGLEMAP_ROLE,
  USER_INPUT_FILTER_DROPDOWN_ROLE,
  USER_INPUT_FILTER_CHECKBOX_ROLE,
  USER_INPUT_FILTER_RADIOGROUP_ROLE,
  USER_INPUT_FILTER_CHECKBOX_GROUP_ROLE,
  USER_INPUT_FILTER_SELECTION_TAGS_ROLE,
  USER_INPUT_FILTER_RANGE_SLIDER_ROLE,
} from '@wix/wix-data-client-common-standalone'
import type { State } from '../dataset-controller/rootReducer'
import { selectSetFilterCalled } from '../dataset-controller/rootReducer'
import {
  setCurrentIndex,
  updateFields,
  refresh,
  fetchCurrentPage,
  doFetch,
  doFetchMax,
} from '../records/actions'
import QueryResults from '../helpers/queryResults'
import {
  getCurrentItemIndex,
  isCursorPaging,
  hasNextPage,
  getTotalPageCount,
} from '../../src/helpers/paginationUtils'
import { resolveDynamicProperties } from '../components/dynamicProperties'
import { defaultComponentBindingApi } from './defaultComponentBindingApi'
import type {
  DatabindingApiContext,
  ComponentDatabindingApiFactory,
  DatabindingApi,
  DatabindingActions,
} from './types'
import type { AdaptedComponent } from '../inverted-dependencies/components/componentFactory'
import type { ComponentRole } from '../types'
import type { RecordStoreService } from '../record-store/service'
import { repeaterBindingApi } from './repeaterBindingApi'
import { detailsRepeaterBindingApi } from './detailsRepeaterBindingApi'
import { inputBindingApi } from './inputBindingApi'
import { filterInputBindingApi } from './filterInputBindingApi'
import { gridBindingApi } from './gridBindingApi'
import { dropdownOptionsBindingApi } from './dropdownOptionsBindingApi'
import { selectionTagsOptionsBindingApi } from './selectionTagsOptionsBindingApi'
import { uploadButtonBindingApi } from './uploadButtonBindingApi'
import { galleryBindingApi } from './galleryBindingApi'
import { paginationBindingApi } from './paginationBindingApi'
import { googleMapBindingApi } from './googleMapBindingApi'
import { userInputFilterListTypeBindingApi } from './userInputFilterListTypeBindingApi'
import { userInputFilterCheckboxBindingApi } from './userInputFilterCheckboxBindingApi'
import { userInputFilterRangeSliderBindingApi } from './userInputFilterRangeSliderBindingApi'
import { USER_INPUT_FILTER_ROLES } from '../helpers/constants'
import { mobuiPickerOptionsBindingApi } from './mobuiPickerOptionsBindingApi'

const factoryByRole = new Map<
  ComponentRole,
  ComponentDatabindingApiFactory<any, any>
>([
  [REPEATER_ROLE, repeaterBindingApi],
  [DETAILS_REPEATER_ROLE, detailsRepeaterBindingApi],
  [USER_INPUT_FILTER_V1_ROLE, filterInputBindingApi],
  [USER_INPUT_FILTER_DROPDOWN_ROLE, userInputFilterListTypeBindingApi],
  [USER_INPUT_FILTER_CHECKBOX_GROUP_ROLE, userInputFilterListTypeBindingApi],
  [USER_INPUT_FILTER_RADIOGROUP_ROLE, userInputFilterListTypeBindingApi],
  [USER_INPUT_FILTER_SELECTION_TAGS_ROLE, userInputFilterListTypeBindingApi],
  [USER_INPUT_FILTER_CHECKBOX_ROLE, userInputFilterCheckboxBindingApi],
  [USER_INPUT_FILTER_RANGE_SLIDER_ROLE, userInputFilterRangeSliderBindingApi],
  [GRID_ROLE, gridBindingApi],
  [DROPDOWN_OPTIONS_ROLE, dropdownOptionsBindingApi],
  [MOBUI_PICKER_OPTIONS_ROLE, mobuiPickerOptionsBindingApi],
  [SELECTION_TAGS_OPTIONS_ROLE, selectionTagsOptionsBindingApi],
  [UPLOAD_BUTTON_ROLE, uploadButtonBindingApi],
  [GALLERY_ROLE, galleryBindingApi],
  [PAGINATION_ROLE, paginationBindingApi],
  [GOOGLEMAP_ROLE, googleMapBindingApi],
])

const createDatabindingApiForComponent: ComponentDatabindingApiFactory = (
  component,
  connectionConfig,
  context,
) => {
  return (
    factoryByRole.get(component.role) ||
    (component.isInput
      ? (inputBindingApi as ComponentDatabindingApiFactory<any, any>)
      : defaultComponentBindingApi)
  )(component, connectionConfig, context)
}

interface CreateDatabindingApiParams {
  components: AdaptedComponent[]
  context: Omit<DatabindingApiContext, 'actions'>
}

export const createDatabindingApi = ({
  components,
  context,
}: CreateDatabindingApiParams): DatabindingApi => {
  const createActions = ({
    recordStore,
    dispatch,
  }: Omit<DatabindingApiContext, 'actions'>) => {
    const actions: DatabindingActions = {
      fetchRecordById: (recordId: string, byRefField?: string) =>
        recordStore(byRefField).fold(
          () => Maybe.Nothing(),
          (service: RecordStoreService) => service.getRecordById(recordId),
        ),

      fetchAll: (byRefField?: string) =>
        doFetchMax(recordStore, 0, 1000, byRefField),

      fetchCurrentItems: (state: State) =>
        fetchCurrentPage(recordStore, state).catch(() =>
          QueryResults.Empty().get(),
        ),

      fetchOne: () => doFetch(recordStore, 0, 1),

      fetch: (fromIndex: number, length: number, byRefField?: string) =>
        doFetch(recordStore, fromIndex, length, byRefField),

      getTotalPageCount: state => getTotalPageCount({ state, recordStore }),

      getInitialData: () =>
        recordStore().fold(
          () => QueryResults.Empty(),
          (service: RecordStoreService) => service.externalApi.getSeedRecords(),
        ),

      setCurrentIndex: (index: number, suppressRefreshView?: boolean) =>
        dispatch(setCurrentIndex(index, suppressRefreshView)),

      setFieldInCurrentRecordAndSynchronize: (
        field: string,
        value: any,
        componentIdToExcludeFromUpdatingComponentsBasedOnRecord?: string,
      ) => {
        dispatch(
          updateFields(
            { [field]: cloneDeep(value) },
            componentIdToExcludeFromUpdatingComponentsBasedOnRecord,
          ),
        )
      },

      refresh: () => dispatch(refresh()),

      resetUserInputFilters: () => {
        const userFilterComponents = apis.filter(
          ({ role }) =>
            role === USER_INPUT_FILTER_V1_ROLE ||
            USER_INPUT_FILTER_ROLES.includes(role),
        )
        const setFilterCalled = selectSetFilterCalled(context.getState())
        if (userFilterComponents.length) {
          userFilterComponents.forEach(component => component.resetUserFilter())
          if (!setFilterCalled) {
            actions.refresh()
          }
        }
      },

      isCurrentRecordNew: (state: State) =>
        recordStore().fold(
          () => false,
          (service: RecordStoreService) =>
            service.isNewRecord(getCurrentItemIndex({ state })),
        ),

      isCurrentRecordPristine: (state: State) =>
        recordStore().fold(
          () => false,
          (service: RecordStoreService) =>
            service.isPristine(getCurrentItemIndex({ state })),
        ),

      isCursorPaging: () => isCursorPaging({ recordStore }),

      hasNextPage: (state: State) => hasNextPage({ state, recordStore }),

      getUniqueFieldValues: (fieldKey: string) =>
        recordStore().fold(
          () => false,
          (service: RecordStoreService) =>
            service.getUniqueFieldValues(fieldKey),
        ),
    }

    return actions
  }

  const actions = createActions(context)

  const apis = components
    .map(component =>
      createDatabindingApiForComponent(
        component,
        resolveDynamicProperties(
          component.connectionConfig,
          context.getFieldType,
        ),
        { ...context, actions },
      ),
    )
    .filter(api => api.isValidConnection())

  return {
    bindAll: async () =>
      Promise.all(
        apis.map(api => {
          api.bind()
          return api.onRecordsLoaded()
        }),
      ),

    hideAll: () => {
      return apis.map(api => api.hide())
    },

    showAll: () => {
      return apis.map(api => api.show({ ignoreInitiallyHidden: true }))
    },

    clearAll: () => {
      return apis.map(api => api.clear())
    },

    onRecordsLoaded: () => {
      return apis.map(api => api.onRecordsLoaded())
    },

    onCurrentViewChanged: () => {
      return apis.map(api => api.onCurrentViewChanged())
    },

    onCurrentIndexChanged: () => {
      return apis.map(api => api.onCurrentIndexChanged())
    },

    onCurrentRecordModified: (previousRecord, componentIdToIgnore) => {
      return apis
        .filter(({ id }) => !componentIdToIgnore || componentIdToIgnore !== id)
        .map(api => api.onCurrentRecordModified(previousRecord))
    },
  }
}
