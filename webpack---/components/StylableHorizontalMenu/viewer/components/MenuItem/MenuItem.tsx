import { formatClassNames } from '@wix/editor-elements-common-utils';
import classNames from 'clsx';
import React, { memo, useRef } from 'react';
import semanticClassNames from '../../../StylableHorizontalMenu.semanticClassNames';
import type { IMenuItemProps } from '../../../StylableHorizontalMenu.types';
import { testIds } from '../../testIds';
import { isCurrentItem } from '../../utils/getCurrentMenuItem';
import { MenuItemLabel } from './MenuItemLabel';

export const MenuItem: React.FC<IMenuItemProps> = memo(props => {
  const {
    item,
    depth = 0,
    currentItem,
    className,
    submenuProps: { positionUpdaters, getClasses, injectCssVars },
    slots,
    isColumnStretched,
    isContainerStretched,
    hasColumnSubSubs,
    onItemClick,
    onItemMouseIn,
    onItemMouseOut,
    onItemDblClick,
  } = props;

  const { label, items, slot } = item;
  const children = slot && slots[slot];
  const positionBoxRef = useRef<HTMLDivElement | null>(null);
  const isStretched = children ? isContainerStretched : isColumnStretched;

  const submenuClasses = getClasses({
    depth,
    isStretched,
    containsChildren: !!children,
    hasColumnSubSubs,
  });
  // inject CSS vars from stylable panel
  const cssVars = injectCssVars?.(depth);

  return (
    <MenuItemLabel
      className={className}
      item={item}
      isCurrentItem={isCurrentItem(item, currentItem)}
      depth={depth}
      isStretched={isStretched}
      hasColumnSubSubs={hasColumnSubSubs}
      withSubItemsClassname={
        items?.length
          ? classNames(
              submenuClasses.hasSubItems,
              formatClassNames(semanticClassNames.subMenuTitle),
            )
          : ''
      }
      positionUpdaters={positionUpdaters}
      positionBoxRef={positionBoxRef}
      onItemClick={onItemClick}
      onItemDblClick={onItemDblClick}
      onItemMouseIn={onItemMouseIn}
      onItemMouseOut={onItemMouseOut}
    >
      {(items?.length || children) && (
        <div
          className={submenuClasses.positionBox}
          ref={positionBoxRef}
          role="group"
          aria-label={label}
          data-testid={testIds.positionBox}
        >
          <div
            className={classNames(
              submenuClasses.animationBox,
              formatClassNames(semanticClassNames.subMenuContainer),
            )}
            style={cssVars?.animationBox}
          >
            <div className={submenuClasses.alignBox}>
              {children || (
                <ul className={submenuClasses.list} style={cssVars?.list}>
                  {items!.map((subItem, i) => (
                    <MenuItem
                      {...props}
                      key={i}
                      item={subItem}
                      depth={depth + 1}
                      className={submenuClasses.subItem!}
                      slots={slots}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </MenuItemLabel>
  );
});
