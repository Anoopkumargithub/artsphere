import type { HttpClient } from '@wix/http-client'
import { keys } from '@wix/wix-data-client-common-standalone'
import type { FieldType } from '@wix/wix-data-schema-types'

interface AutomationsV2Client {
  reportFormEventToAutomationCreator: () => (
    payload: SubmissionDescriptor,
    collectionId: string,
    pageId: string,
  ) => void
}

interface SubmissionDescriptor {
  detailedEventPayload: {
    [key: string]: {
      value: string
      keyName: string
      index: number
      valueType: FieldType
    }
  }
  eventUTCTime: Date
}

interface TriggerPayload {
  formId: string
  submissionTime: Date
  collectionId: string
  pageId: string
  fields: {
    [key: string]: {
      displayName: string
      value: string | number | boolean | Date | string[]
      type: FieldType
    }
  }
}

export const createAutomationsV2Client = (
  httpClient: HttpClient,
): AutomationsV2Client => {
  return {
    reportFormEventToAutomationCreator:
      () =>
      async (
        payload: SubmissionDescriptor,
        collectionId: string,
        pageId: string,
      ): Promise<void> => {
        const formId = payload.detailedEventPayload['form-id'].value
        const submittedKeys = keys(payload.detailedEventPayload).filter(
          key => key !== 'form-id',
        ) as string[]

        const fieldValues = submittedKeys.reduce(
          (fieldValues, key) => {
            const fieldKey = key.split('.')[1]
            const {
              keyName: displayName,
              valueType: type,
              value,
            } = payload.detailedEventPayload[key]
            fieldValues[fieldKey] = { displayName, value, type }
            return fieldValues
          },
          {} as TriggerPayload['fields'],
        )

        const triggerPayload: TriggerPayload = {
          formId,
          pageId,
          submissionTime: new Date(),
          fields: fieldValues,
          collectionId,
        }

        await httpClient.post(
          '/_serverless/cms-automations/report-cms-form-submission',
          triggerPayload,
        )
      },
  }
}
