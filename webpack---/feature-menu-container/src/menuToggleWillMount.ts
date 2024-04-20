import { named, withDependencies } from '@wix/thunderbolt-ioc'
import type { MenuContainerComponent, MenuToggleComponent, MenuToggleWillMountFactory } from './types'
import { name } from './symbols'
import { ComponentsStoreSymbol } from 'feature-components'
import { PageFeatureConfigSymbol, BrowserWindowSymbol, ExperimentsSymbol } from '@wix/thunderbolt-symbols'

const menuToggleWillMount: MenuToggleWillMountFactory = ({ menuTogglesConfig }, componentsStore, browserWindow) => {
	const getMenuContainer = (toggleButton: MenuToggleComponent): MenuContainerComponent | null => {
		const { menuContainerId } = menuTogglesConfig[toggleButton.id]
		const comp = componentsStore.get<MenuContainerComponent>(menuContainerId)
		return comp?.componentType === 'MenuContainer' ? comp : null
	}

	const toggleMenu = (toggleButton: MenuToggleComponent, isVectorImage: boolean) => {
		const menuContainer = getMenuContainer(toggleButton)
		if (menuContainer) {
			menuContainer.toggle(false, isVectorImage)

			if (isVectorImage) {
				const cleanup = menuContainer.onToggle((isOpen) => {
					if (!isOpen) {
						browserWindow.document.getElementById(toggleButton.id)?.focus()
					}
					cleanup()
				})
			}
		}
	}

	const isMenuToggle = (componentType: string) => componentType === 'MenuToggle'
	const isVectorImage = (componentType: string) => componentType === 'VectorImage'

	return {
		componentTypes: ['MenuToggle', 'VectorImage'],
		componentWillMount: (toggleButton) => {
			if (!menuTogglesConfig[toggleButton.id]) {
				return
			}

			const isVectorImageType = isVectorImage(toggleButton.componentType)

			toggleButton.onClick(() => {
				toggleMenu(toggleButton, isVectorImageType)
			})

			if (isMenuToggle(toggleButton.componentType)) {
				toggleButton.onKeyDown((keyboardEvent) => {
					if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
						toggleMenu(toggleButton, false)
					}
				})
			}

			if (isMenuToggle(toggleButton.componentType)) {
				return getMenuContainer(toggleButton)?.onToggle((isOpen) => toggleButton.updateProps({ isOpen }))
			} else if (isVectorImageType) {
				return getMenuContainer(toggleButton)?.onToggle((isOpen) => {
					toggleButton.updateProps({
						ariaExpanded: isOpen,
					})
				})
			}
		},
	}
}

export const MenuToggleWillMount = withDependencies(
	[named(PageFeatureConfigSymbol, name), ComponentsStoreSymbol, BrowserWindowSymbol, ExperimentsSymbol],
	menuToggleWillMount
)
