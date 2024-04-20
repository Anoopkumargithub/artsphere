import { MenuItemProps } from '../../StylableHorizontalMenu.types';

export const getHasSubSubs = (item: MenuItemProps) =>
  !!item?.items?.some(subItem => !!subItem.items?.length);
export const getHasSubSubItems = (menuItems: MenuItemProps) =>
  getTreeDepth(menuItems) === 3;

const getTreeDepth = (tree: MenuItemProps): number => {
  let depth = 1;
  const setDepth = (list: Array<MenuItemProps>, newDepth: number = 1) => {
    if (depth < newDepth) {
      depth = newDepth;
    }
    list.forEach((listItem: MenuItemProps) => {
      if (listItem?.items?.length! > 0) {
        return setDepth(listItem!.items!, newDepth + 1);
      }
    });
  };
  setDepth(tree.items!);
  return depth;
};
