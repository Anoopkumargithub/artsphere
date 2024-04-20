import { throttle } from '@wix/editor-elements-common-utils';
import { PositionUpdaters, Elements } from './types';
import { clearCss, setCss, getCss } from './helpers';
import { setVerticalPosition } from './setVerticalPosition';

const getAlign = (positionBox: HTMLElement): string =>
  getCss(positionBox.firstChild as HTMLElement, '--flyoutAlignment').trim();

const setSubmenuPosition = ({ label, positionBox }: Elements): void => {
  const { bottom, left, width } = label.getBoundingClientRect();

  /**
   * Sometimes parent <selection> has "transform: translate..." property,
   * which changes the behavior of "position: fixed"
   * @see https://stackoverflow.com/a/37953806
   * So we need to calculate difference between relative and absolute position
   * and substract it from the top coordinate.
   */
  const delta = positionBox.getBoundingClientRect().top - positionBox.offsetTop;

  // setting position box right under menu item
  setCss(positionBox, 'top', bottom - delta, 'px');
  // width should be same as the parent item or larger
  setCss(positionBox, 'min-width', width, 'px');

  const boxWidth = positionBox.offsetWidth;

  const align = getAlign(positionBox);

  if (align === 'center') {
    // center aligned is always center aligned
    setCss(positionBox, 'left', left + (width - boxWidth) / 2, 'px');
    return;
  }

  // align should be reverted if there is not enough space for element to render
  const shouldAlignLeft =
    align === 'right'
      ? left + width - boxWidth < 0 // left edge is out of viewport
      : left + boxWidth <= document.body.offsetWidth; // right edge is in the viewport

  setCss(
    positionBox,
    'left',
    shouldAlignLeft ? left : left + width - boxWidth,
    'px',
  );
};

export const depth0PositionUpdaters_flyout: PositionUpdaters = ({
  label,
  positionBox,
}) => {
  let throttledSetPosition = () => {};

  return {
    onEnter: () => {
      throttledSetPosition = throttle(
        () => setSubmenuPosition({ label, positionBox }),
        50,
      );
      throttledSetPosition();

      setVerticalPosition(
        {
          label,
          positionBox,
        },
        'flyout',
      );

      window.addEventListener('scroll', throttledSetPosition);
      label.closest('nav')?.addEventListener('scroll', throttledSetPosition);
    },
    onLeave: () => {
      window.removeEventListener('scroll', throttledSetPosition);
      label.closest('nav')?.removeEventListener('scroll', throttledSetPosition);
      clearCss(positionBox);
    },
  };
};
