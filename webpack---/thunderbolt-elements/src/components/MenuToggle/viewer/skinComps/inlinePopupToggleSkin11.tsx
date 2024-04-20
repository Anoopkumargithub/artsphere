import classNames from 'clsx';
import React, { ComponentType } from 'react';
import { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin11.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin11: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div className={classNames(styles.menu, isOpen && styles.toggleOpen)}>
      <div className={classNames(styles.top)} />
      <div className={classNames(styles.mid)} />
      <div className={classNames(styles.bottom)} />
    </div>
  );
};

export default InlinePopupToggleSkin11;
