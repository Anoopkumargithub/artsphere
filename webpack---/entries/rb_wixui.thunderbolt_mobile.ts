import ExpandableMenuComponent from '../components/ExpandableMenu/viewer/ExpandableMenu';
import ExpandableMenuController from '../components/ExpandableMenu/viewer/ExpandableMenu.controller';
import MenuContainerComponent from '../components/MenuContainer/viewer/MenuContainer';
import MenuContainerController from '../components/MenuContainer/viewer/MenuContainer.controller';
import BackToTopButtonComponent from '@wix/thunderbolt-elements/src/components/BackToTopButton/viewer/BackToTopButton';
import BackToTopButtonController from '@wix/thunderbolt-elements/src/components/BackToTopButton/viewer/BackToTopButton.controller';
import MenuToggleComponent from '@wix/thunderbolt-elements/src/components/MenuToggle/viewer/MenuToggle';
import MenuToggleController from '@wix/thunderbolt-elements/src/components/MenuToggle/viewer/MenuToggle.controller';


const ExpandableMenu = {
  component: ExpandableMenuComponent,
  controller: ExpandableMenuController
};

const MenuContainer = {
  component: MenuContainerComponent,
  controller: MenuContainerController
};

const BackToTopButton = {
  component: BackToTopButtonComponent,
  controller: BackToTopButtonController
};

const MenuToggle = {
  component: MenuToggleComponent,
  controller: MenuToggleController
};


export const components = {
  ['ExpandableMenu']: ExpandableMenu,
  ['MenuContainer']: MenuContainer,
  ['BackToTopButton']: BackToTopButton,
  ['MenuToggle']: MenuToggle
};

