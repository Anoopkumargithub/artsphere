import {
  type EditorSDK,
  type ComponentRef,
  type ComponentClientSpecMapEntry,
} from '@wix/platform-editor-sdk';
import { SortOrder } from '@wix/ambassador-forms-v4-form/types';
import { type IHttpClient } from '@wix/yoshi-flow-editor';
import { getPanelUrl } from '@wix/yoshi-flow-editor/utils';
import { NAMESPACE } from '../constants/namespace';
import { queryForms } from '@wix/ambassador-forms-v4-form/http';
import { getRestrictions } from '../services/restrictions';
import { FORM_TEMPLATES } from '../constants/templates';

interface GetFormAppComponentsParams {
  appToken: string;
  sdk: EditorSDK;
}

export const getFormAppComponents = async ({
  sdk,
  appToken,
}: GetFormAppComponentsParams) => {
  const { applicationId } = await sdk.document.tpa.app.getDataByAppDefId(
    appToken,
    '225dd912-7dea-4738-8688-4b8c6955ffc2',
  );
  return sdk.tpa.app.getAllCompsByApplicationId(appToken, applicationId);
};

interface SetComponentFormIdParams {
  sdk: EditorSDK;
  appToken: string;
  formId: string;
  compRef: ComponentRef;
}

export const setComponentFormId = async ({
  sdk,
  appToken,
  formId,
  compRef,
}: SetComponentFormIdParams) =>
  sdk.tpa.data.set(appToken, {
    compRef,
    scope: 'COMPONENT',
    key: 'formId',
    value: formId,
  });

export const getComponentPresetId = (component: ComponentClientSpecMapEntry) =>
  JSON.parse((component as any)?.tpaData?.content ?? null)?.presetId;

export const getComponentFormId = (component: ComponentClientSpecMapEntry) =>
  JSON.parse((component as any)?.tpaData?.content ?? null)?.formId;

interface HandleTemplateParams {
  sdk: EditorSDK;
  appToken: string;
  httpClient: IHttpClient;
  componentRef: ComponentRef;
  presetId?: string;
}

export const handleBlankTemplate = async ({
  appToken,
  sdk,
  httpClient,
  componentRef,
  presetId,
}: HandleTemplateParams) => {
  const formLimitReached = await isFormsLimitReached(httpClient);

  if (formLimitReached) {
    await showUpgradeModal(sdk, appToken);
  } else {
    await sdk.editor.openDashboardPanel(appToken, {
      url: '/wix-forms/form',
      closeOtherPanels: presetId === undefined,
    });
  }

  const response = await httpClient.request(
    queryForms({
      query: {
        filter: { namespace: { $eq: NAMESPACE } },
        cursorPaging: { limit: 1 },
        sort: [{ order: SortOrder.DESC, fieldName: 'createdDate' }],
      },
    }),
  );

  if (
    response.data?.forms?.[0]?.createdDate?.getTime() >
    new Date().getTime() - 200000
  ) {
    await setComponentFormId({
      appToken,
      sdk,
      formId: response.data?.forms?.[0]?.id,
      compRef: componentRef,
    });
  }
};

interface HandlePresetTemplateParams extends HandleTemplateParams {
  presetId: string;
}

export const handlePresetTemplate = async ({
  httpClient,
  sdk,
  appToken,
  presetId,
  componentRef,
}: HandlePresetTemplateParams) => {
  const formLimitReached = await isFormsLimitReached(httpClient);

  if (formLimitReached) {
    await showUpgradeModal(sdk, appToken);
  } else {
    await setComponentFormId({
      appToken,
      sdk,
      formId: FORM_TEMPLATES[presetId],
      compRef: componentRef,
    });

    setTimeout(
      async () =>
        sdk.editor.selection.selectComponentByCompRef(appToken, {
          compsToSelect: [componentRef],
        }),
      5000,
    );
  }
};

export const showUpgradeModal = async (sdk: EditorSDK, appToken: string) => {
  const metaSiteId = await sdk.info.getMetaSiteId(appToken);
  await sdk.editor.openModalPanel(appToken, {
    shouldHideHeader: true,
    url: getPanelUrl('Form', 'UpgradeModal'),
    height: 424,
    width: 600,
    initialData: { metaSiteId },
  });
};

export const isFormsLimitReached = async (httpClient: IHttpClient) => {
  try {
    const restrictionsResponse = await getRestrictions(httpClient);
    const formsLimit = restrictionsResponse.restrictions.formsLimit.limit;
    const totalActiveFormCount = restrictionsResponse.totalFormCount;

    return formsLimit !== -1 && formsLimit <= totalActiveFormCount;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch restrictions');
  }
};
