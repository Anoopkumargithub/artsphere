import { type FormValues } from '@wix/form-viewer';
import { type IWidgetControllerConfig } from '@wix/native-components-infra';

interface FieldProperties {
  fieldType: string;
}

interface FieldPropertiesByTarget {
  [key: string]: FieldProperties | FieldPropertiesByTarget | undefined;
}

enum SUBMIT_TRACK_EVENT_CATEGORY {
  CONTACT = 'contact',
  SUBSCRIBE = 'subscribe',
}

const SUBMIT_TRACK_EVENT_NAME = 'Lead';

export type SubmitTrackEventProps = {
  fireSubmitTrackEvent: (
    formValues: FormValues,
    subscribeFieldType: string,
  ) => void;
};

export const hasFieldByType = (
  propertiesByTarget: FieldPropertiesByTarget,
  type: string,
) =>
  Object.values(propertiesByTarget).some((property) => {
    if (typeof property === 'object') {
      const nestedPropertyHasFieldByType = hasFieldByType(
        property as FieldPropertiesByTarget,
        type,
      );

      if (nestedPropertyHasFieldByType) {
        return true;
      }
    }

    return property.fieldType === type;
  });

export const createFireSubmitTrackEvent =
  (
    formId: string,
    formName: string | undefined,
    fieldPropertiesByTarget: FieldPropertiesByTarget,
    controllerConfig: IWidgetControllerConfig,
  ) =>
  (formValues: FormValues, subscribeFieldType: string) => {
    const hasSubscribeField = hasFieldByType(
      fieldPropertiesByTarget,
      subscribeFieldType,
    );

    const trackEventCategory = hasSubscribeField
      ? SUBMIT_TRACK_EVENT_CATEGORY.SUBSCRIBE
      : SUBMIT_TRACK_EVENT_CATEGORY.CONTACT;

    const submitTrackEventParams = {
      formId,
      userData: formValues,
      category: trackEventCategory,
      label: `Form name: ${formName}`,
    };

    controllerConfig.wixCodeApi.window.trackEvent(
      SUBMIT_TRACK_EVENT_NAME,
      submitTrackEventParams,
    );
  };
