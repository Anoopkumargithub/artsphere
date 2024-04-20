import classNames from 'clsx';
import React, { ComponentType } from 'react';
import { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin4.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin4: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div className={classNames(styles.menu, isOpen && styles.toggleOpen)}>
      <span className={classNames(styles.menuLine, styles.menuLine1)} />
      <span className={classNames(styles.menuLine, styles.menuLine2)} />
      <span className={classNames(styles.menuLine, styles.menuLine3)} />
    </div>
  );
};

export default InlinePopupToggleSkin4;
