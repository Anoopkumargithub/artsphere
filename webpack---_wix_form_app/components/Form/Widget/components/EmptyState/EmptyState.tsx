import React, { type FC, type ReactNode } from 'react';
import s from './EmptyState.scss';
import {
  Text,
  type TextProps,
  TextTypography,
  Spinner,
  SpinnerTypes,
} from 'wix-ui-tpa/cssVars';
import { FormAppEmptyState } from './FormAppEmptyState';
import { useEnvironment, useTranslation } from '@wix/yoshi-flow-editor';
import { type EmptyStateProps } from '.';
import { WIDGET_HOOKS } from '../..';

const TextWithChildren = Text as unknown as FC<
  TextProps & { children: ReactNode }
>;

export const EmptyState = ({ loading }: EmptyStateProps) => {
  const { t } = useTranslation();
  const { isEditor } = useEnvironment();

  if (!isEditor) {
    return <div data-hook={WIDGET_HOOKS.wrapper} />;
  }

  return (
    <div className={s.container} data-hook={WIDGET_HOOKS.wrapper}>
      {loading ? (
        <Spinner type={SpinnerTypes.slim} />
      ) : (
        <>
          <FormAppEmptyState />
          <TextWithChildren
            className={s.title}
            typography={TextTypography.smallTitle}
          >
            {t('emptyState_title')}
          </TextWithChildren>
          <TextWithChildren className={s.description}>
            {t('emptyState_lineOne')}
          </TextWithChildren>
          <TextWithChildren className={s.description}>
            {t('emptyState_lineTwo')}
          </TextWithChildren>
        </>
      )}
    </div>
  );
};
