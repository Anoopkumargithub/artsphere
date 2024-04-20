import React, { type FC } from 'react';
import { useEnvironment, type WidgetProps } from '@wix/yoshi-flow-editor';
import { FormViewerContext } from '@wix/form-viewer/widget';
import { EmptyState } from './components/EmptyState';
import { FormViewer } from './components/FormViewer';
import { classes, vars } from './index.st.css';
import { useStyles } from '@wix/tpa-settings/react';
import classNames from 'classnames';
import stylesParams from '../stylesParams';
import { type ControllerProps } from './interfaces';
import { getShadowOffsets } from '../utils/shadow-offsets';

export const WIDGET_HOOKS = {
  wrapper: 'Form-wrapper',
};

const Widget: FC<WidgetProps<ControllerProps>> = (props) => {
  const styles = useStyles();
  const { isEditor } = useEnvironment();

  const shadowOffsets = getShadowOffsets({
    angle: styles.get(stylesParams.shadowAngle),
    distance: styles.get(stylesParams.shadowDistance),
  });

  if (!props.formId || props.loading || props.formDeleted) {
    return <EmptyState loading={props.loading} />;
  }

  return (
    <FormViewerContext {...props}>
      <div
        style={{
          [vars.shadowXOffset]: shadowOffsets.xOffset + 'px',
          [vars.shadowYOffset]: shadowOffsets.yOffset + 'px',
          overflow: isEditor ? 'hidden' : 'visible',
        }}
        className={classNames(classes.container, {
          [classes.shadow]: styles.get(stylesParams.enableShadow),
        })}
        data-hook={WIDGET_HOOKS.wrapper}
      >
        <FormViewer {...props} />
      </div>
    </FormViewerContext>
  );
};

export default Widget;
