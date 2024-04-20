import { type CreateControllerFn } from '@wix/yoshi-flow-editor';
import { FormKind, initFormController } from '@wix/form-viewer/controller';
import settingsParams from './settingsParams';
import { isTemplateForm } from './utils/templates';
import { NAMESPACE } from '../../constants/namespace';
import { createEventHandler } from '@wix/tpa-settings';
import {
  type SettingsEvents,
  SettingsEventsKeys,
} from '../../constants/settings';
import { type ForcedState, type FormControllerAPI } from '@wix/form-viewer';
import { FORM_TEMPLATES, FormAppPreset } from '../../constants/templates';
import { isFormsLimitReached } from '../../editor-script/utils';
import { EXPERIMENTS } from '../../constants/experiments';
import { createVeloApi } from './velo-api';
import { createFireSubmitTrackEvent } from './utils/submission-track-event';
import {
  type AIAssistantState,
  createAIAssistantService,
} from './aIAssistantService';

const createController: CreateControllerFn = async ({
  flowAPI,
  controllerConfig,
}) => {
  let formControllerApi: FormControllerAPI;
  const { veloProps, veloApi, veloSetSteps } = createVeloApi(controllerConfig);

  const aiAssistantEnabled = flowAPI.experiments.enabled(
    EXPERIMENTS.AI_ASSISTANT,
  );

  const updateFormAssistantStateProp = (state: AIAssistantState) => {
    controllerConfig.setProps({ aiAssistantState: state });
  };

  const aiAssistantService = aiAssistantEnabled
    ? createAIAssistantService({
        httpClient: flowAPI.httpClient,
        updateFormAssistantStateProp,
      })
    : undefined;

  const componentEventHandler = createEventHandler<SettingsEvents>(
    controllerConfig.config.publicData.COMPONENT || {},
  );

  let formId = flowAPI.settings.get(settingsParams.formId) as string;
  const templateForm = isTemplateForm(formId);

  if (formId) {
    formControllerApi = await initFormController(flowAPI, {
      formId,
      formKind: templateForm ? FormKind.EXTENSION : undefined,
      namespace: NAMESPACE,
      throwWhenFormMissing: false,
      useWarmupData: true,
      useListInsteadQuery: true,
    });

    veloSetSteps(formControllerApi.getFormSteps(formId));
  }

  return {
    pageReady: async () => {
      aiAssistantEnabled &&
        aiAssistantService &&
        aiAssistantService.setFormId(formId);
      const presetId = controllerConfig.config.publicData.COMPONENT.presetId;
      const newlyAddedTemplateForm =
        Object.keys(FORM_TEMPLATES).includes(presetId) && formId === '';
      const shouldCheckIfFormLimitReached = !(
        flowAPI.environment.isViewer || flowAPI.environment.isPreview
      );

      // set loading initially
      controllerConfig.setProps({
        fitToContentHeight: true,
        loading: true,
      });

      try {
        const formLimitReached = shouldCheckIfFormLimitReached
          ? await isFormsLimitReached(flowAPI.httpClient)
          : false;

        const shouldShowEmptyState =
          ([FormAppPreset.Blank, FormAppPreset.Existing, undefined].includes(
            presetId,
          ) &&
            formId === '') ||
          (newlyAddedTemplateForm && formLimitReached);

        if (shouldShowEmptyState) {
          controllerConfig.setProps({
            fitToContentHeight: true,
            loading: false,
          });
        } else {
          if (formId && formControllerApi) {
            const { hasForm, getFormName, getFieldPropertiesByTarget } =
              formControllerApi;

            if (hasForm(formId)) {
              controllerConfig.setProps({
                formId,
                loading: false,
                fireSubmitTrackEvent: createFireSubmitTrackEvent(
                  formId,
                  getFormName(formId),
                  getFieldPropertiesByTarget(formId),
                  controllerConfig,
                ),
                aiAssistantService,
                ...veloProps,
              });
            } else {
              controllerConfig.setProps({
                loading: false,
                formDeleted: true,
              });
            }
          }
        }
      } catch (e) {
        // if error was encountered, set loading false, widget should show empty state
        console.log(e);
        controllerConfig.setProps({
          fitToContentHeight: true,
          loading: false,
        });
      }

      componentEventHandler.on(
        SettingsEventsKeys.ForceView,
        (forceView: ForcedState) =>
          controllerConfig.setProps({
            forceView,
          }),
      );
    },
    updateConfig: async (_, updatedConfig) => {
      const updatedFormId = updatedConfig?.publicData?.COMPONENT?.formId;
      const templateForm = isTemplateForm(updatedFormId);

      componentEventHandler.notify(updatedConfig.publicData.COMPONENT || {});

      if (!updatedFormId) {
        return;
      }

      if (formId !== updatedFormId) {
        controllerConfig.setProps({
          fitToContentHeight: true,
          loading: true,
        });

        const { getFormSteps } = await initFormController(flowAPI, {
          formId: updatedFormId,
          formKind: templateForm ? FormKind.EXTENSION : undefined,
          namespace: NAMESPACE,
        });

        veloSetSteps(getFormSteps(updatedFormId));
      }

      controllerConfig.setProps({
        fitToContentHeight: true,
        formId: updatedFormId,
        loading: false,
      });

      formId = updatedFormId;
    },
    exports: flowAPI.experiments.enabled(EXPERIMENTS.VELO_API)
      ? () => veloApi
      : undefined,
  };
};

export default createController;
