import * as React from 'react';
import { withCompController } from '@wix/editor-elements-integrations';
import {
  AnalyticsClicksGroups,
  tryReportAnalyticsClicksBi,
} from '@wix/editor-elements-common-utils';
import {
  IStylableHorizontalMenuProps,
  StylableHorizontalMenuControllerProps,
  StylableHorizontalMenuMapperProps,
  StylableHorizontalMenuStateRefs,
} from '../StylableHorizontalMenu.types';

const compController = withCompController<
  StylableHorizontalMenuMapperProps,
  StylableHorizontalMenuControllerProps,
  IStylableHorizontalMenuProps,
  StylableHorizontalMenuStateRefs
>(({ stateValues, mapperProps }) => {
  const { currentUrl, reportBi } = stateValues;
  const {
    compId,
    language,
    mainPageId,
    trackClicksAnalytics,
    ...restMapperProps
  } = mapperProps;

  const reportBiOnMenuItemClick: StylableHorizontalMenuControllerProps['reportBiOnMenuItemClick'] =
    React.useCallback(
      (event: React.SyntheticEvent, item: any = {}) => {
        tryReportAnalyticsClicksBi(reportBi, {
          link: item.link,
          language,
          trackClicksAnalytics,
          elementTitle: item.label,
          pagesMetadata: { mainPageId },
          element_id: compId ?? event.currentTarget.id,
          elementType: restMapperProps.fullNameCompType,
          elementGroup: AnalyticsClicksGroups.MenuAndSearch,
        });
      },
      [
        reportBi,
        language,
        trackClicksAnalytics,
        compId,
        restMapperProps.fullNameCompType,
        mainPageId,
      ],
    );

  return {
    ...restMapperProps,
    currentUrl,
    reportBiOnMenuItemClick,
  };
});

export default compController;
