import classNames from 'clsx';
import React, { ComponentType } from 'react';
import { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin10.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin10: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div
      className={classNames(
        styles.icon,
        styles.menu6,
        isOpen && styles.toggleOpen,
      )}
    >
      <span />
      <span />
    </div>
  );
};

export default InlinePopupToggleSkin10;
