import * as React from 'react';
import ResponsiveBox from '@wix/editor-elements-library/src/components/ResponsiveBox/viewer/ResponsiveBox';
import {
  IResponsiveBoxProps,
  IContainerImperativeActions,
} from '../../../Container.types';
import containerSemanticClassNames from '../../../Container.semanticClassNames';

// This container is used in responsive site
const ResponsiveBoxSkin: React.ForwardRefRenderFunction<
  IContainerImperativeActions,
  IResponsiveBoxProps
> = (props, ref) => (
  <ResponsiveBox
    {...props}
    ref={ref}
    semanticClassNames={containerSemanticClassNames}
  />
);

export default React.forwardRef(ResponsiveBoxSkin);
