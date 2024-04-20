import React from 'react';
import classNames from 'clsx';
import { SkinFiveGridLineProps } from '../SkinFiveGridLine';
import { FiveGridLineWrapper } from '../../FiveGridLineWrapper';
import skinsStyle from './SolidLineStudio.scss';

const SolidLineStudio: React.FC<SkinFiveGridLineProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  ...rest
}) => {
  return (
    <FiveGridLineWrapper
      {...rest}
      className={classNames(rest.className, skinsStyle.root)}
    />
  );
};

export default SolidLineStudio;
