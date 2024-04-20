import { createSettingsParams, SettingsParamType } from '@wix/tpa-settings';

export type ISettingsParams = {
  formId: SettingsParamType.String;
};

export default createSettingsParams<ISettingsParams>({
  formId: {
    type: SettingsParamType.String,
    getDefaultValue: () => '',
  },
});
