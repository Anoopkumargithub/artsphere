import { useMemo } from 'react';
import { useStyles } from '@wix/tpa-settings/react';
import { type IHostProps, useEnvironment } from '@wix/yoshi-flow-editor';
import { type ISettingsColor, StyleParamType } from '@wix/tpa-settings';
import stylesParams from '../../stylesParams';

export const useStyle = (host: IHostProps) => {
  const styles = useStyles();
  const { isEditor } = useEnvironment();

  // This function is needed for form-viewer to get the styles from the form-app
  const getStylesForHost = () =>
    Object.keys(stylesParams).reduce(
      (acc, key) => {
        const styleParam = stylesParams[key];
        const value = styles.get(styleParam);

        if (styleParam.type === StyleParamType.Boolean) {
          acc.styleParams.booleans[key] = value;
        } else if (styleParam.type === StyleParamType.Color) {
          acc.styleParams.colors[key] = {
            themeName: (value as ISettingsColor).name,
            value: (value as ISettingsColor).value,
          };
        } else if (styleParam.type === StyleParamType.Font) {
          acc.styleParams.fonts[key] = value;
        } else if (styleParam.type === StyleParamType.Number) {
          acc.styleParams.numbers[key] = value;
        }

        return acc;
      },
      {
        ...(host?.style ?? {}),
        styleParams: {
          ...(host?.style?.styleParams ?? {}),
          booleans: { ...(host?.style?.styleParams?.booleans ?? {}) },
          colors: { ...(host?.style?.styleParams?.colors ?? {}) },
          fonts: { ...(host?.style?.styleParams?.fonts ?? {}) },
          numbers: { ...(host?.style?.styleParams?.numbers ?? {}) },
        },
        compId: host.id,
      },
    );

  let style = useMemo(() => getStylesForHost(), []);

  if (isEditor) {
    style = getStylesForHost();
  }

  return { style };
};
