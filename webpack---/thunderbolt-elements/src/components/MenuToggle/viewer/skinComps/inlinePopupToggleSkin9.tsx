import classNames from 'clsx';
import React, { ComponentType } from 'react';
import { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin9.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin9: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div
      className={classNames(styles.menuIconBox, isOpen && styles.toggleOpen)}
    >
      <div className={classNames(styles.sideLine, styles.top)} />
      <div className={classNames(styles.middleLine)} />
      <div className={classNames(styles.sideLine, styles.bottom)} />
    </div>
  );
};

export default InlinePopupToggleSkin9;
