import { formatClassNames } from '@wix/editor-elements-common-utils';
import semanticClassNames from '../../../../StylableHorizontalMenu.semanticClassNames';
import style0 from './itemDepth0.st.css';
import style1 from './itemDepth1.st.css';

const depthStyleMap = [style0, style1, style1];

type MenuItemLabelClasses = {
  root: string;
  itemWrapper: string;
  container: string;
  label: string;
};

export type GetMenuItemLabelClassesProps = {
  depth: number;
  isHovered: boolean;
  isCurrentPage: boolean;
  className: string;
};

export const getLabelClasses = ({
  depth,
  isHovered,
  isCurrentPage,
  className: parentClassName,
}: GetMenuItemLabelClassesProps): MenuItemLabelClasses => {
  const { st, classes } = depthStyleMap[depth] || style0;
  const isSubItem = depth !== 0;

  return {
    root: st(
      classes.root,
      { isHovered: isHovered && !isCurrentPage, isCurrentPage },
      parentClassName,
    ),
    itemWrapper: st(
      classes.itemWrapper,
      isSubItem
        ? formatClassNames(semanticClassNames.subMenuItem)
        : formatClassNames(semanticClassNames.menuItem),
    ),
    container: classes.container,
    label: st(
      classes.label,
      isSubItem
        ? formatClassNames(semanticClassNames.subMenuItemLabel)
        : formatClassNames(semanticClassNames.menuItemLabel),
    ),
  };
};
