import classNames from 'clsx';
import React, { ComponentType } from 'react';
import { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin15.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin15: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div className={classNames(styles.menuButton, isOpen && styles.toggleOpen)}>
      <div className={classNames(styles.top, styles.bar, styles.left)} />
      <div className={classNames(styles.top, styles.bar, styles.right)} />
      <div className={classNames(styles.middle, styles.bar)} />
      <div className={classNames(styles.bottom, styles.bar, styles.left)} />
      <div className={classNames(styles.bottom, styles.bar, styles.right)} />
    </div>
  );
};

export default InlinePopupToggleSkin15;
