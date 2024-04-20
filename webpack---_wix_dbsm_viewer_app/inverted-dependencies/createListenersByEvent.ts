import type { Schema } from '@wix/wix-data-schema-types'
import type { WixDataItem } from '@wix/wix-data-client-common-standalone'
import { createFormEventPayload } from './helpers/automationUtils'
import type { State } from '../dataset-controller/rootReducer'

interface ListenersByEvent {
  afterSave: (
    context: {
      datasetId: string
      getSchema: () => Schema | null
      getState: () => State & { records: { isForm: boolean } }
    },
    prevRecord: WixDataItem,
    nextRecord: WixDataItem,
  ) => Promise<void>
}

export const createListenersByEvent = ({
  automationsClientCreator,
  pageId,
}: {
  automationsClientCreator: any
  pageId: string
}): ListenersByEvent => {
  const automationsClient = automationsClientCreator()
  const reportFormEventToAutomation =
    automationsClient.reportFormEventToAutomationCreator()

  return {
    afterSave: async (
      { datasetId, getSchema, getState },
      _prevRecord,
      nextRecord,
    ) => {
      const state = getState()
      const schema = getSchema()
      const isForm = Boolean(state.records.isForm)

      if (!isForm || !schema) {
        return
      }
      const { eventUTCTime, detailedEventPayload, collectionId } =
        createFormEventPayload({
          datasetId,
          record: nextRecord,
          schema,
          getSchema,
        })

      await reportFormEventToAutomation(
        { eventUTCTime, detailedEventPayload },
        collectionId,
        pageId,
      )
    },
  }
}
