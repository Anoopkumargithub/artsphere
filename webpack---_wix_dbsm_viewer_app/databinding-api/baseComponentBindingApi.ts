import type { ComponentDatabindingApiFactory } from './types'

export const baseComponentBindingApi: ComponentDatabindingApiFactory =
  component => {
    return {
      id: component.id,

      role: component.role,

      isValidConnection: () => true,

      bind: () => {},

      clear: () => component.clear(),

      hide: () => component.hide(),

      show: config => component.show(config),

      resetUserFilter: () => {},

      onRecordsLoaded: async () => {},

      onCurrentViewChanged: async () => {},

      onCurrentIndexChanged: async () => {},

      onCurrentRecordModified: async () => {},
    }
  }
