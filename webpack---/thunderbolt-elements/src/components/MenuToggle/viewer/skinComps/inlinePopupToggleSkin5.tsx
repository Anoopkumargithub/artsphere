import classNames from 'clsx';
import React, { ComponentType } from 'react';
import { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin5.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin5: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div
      className={classNames(styles.toggleButton, isOpen && styles.toggleOpen)}
    >
      <div className={classNames(styles.nameContainer)}>
        <span className={classNames(styles.menuName)}>
          ME
          <br />
          NU
        </span>
      </div>
      <div className={classNames(styles.lineOne)} />
      <div className={classNames(styles.lineTwo)} />
    </div>
  );
};

export default InlinePopupToggleSkin5;
