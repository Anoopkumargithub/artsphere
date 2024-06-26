import type { MotionEffectsReactions, IScrubReactionManager, TriggersAndReactionsPageConfig } from './types'
import { named, withDependencies } from '@wix/thunderbolt-ioc'
import { MotionEffectsReactionsSymbol, name } from './symbols'
import { BrowserWindow, BrowserWindowSymbol, PageFeatureConfigSymbol } from '@wix/thunderbolt-symbols'
import type { BreakpointRange, ScrubTriggerVariant } from '@wix/thunderbolt-becky-types'
import { isSSR } from '@wix/thunderbolt-commons'
import { isTriggerBpRangeInCurrentWindowRange } from './utils'

const getMatchMediaString = (range: Pick<BreakpointRange, 'min' | 'max'>): string => {
	const mediaString = []

	if (range.max) {
		mediaString.push(`(max-width:${range!.max}px)`)
	}
	if (range.min) {
		mediaString.push(`(min-width:${range!.min}px)`)
	}

	return mediaString.join(' and ')
}

export const scrubReactionsManager = withDependencies(
	[named(PageFeatureConfigSymbol, name), BrowserWindowSymbol, MotionEffectsReactionsSymbol],
	(
		{ scrubReactionWithBpRanges, scrubBpRanges }: TriggersAndReactionsPageConfig,
		browserWindow: NonNullable<BrowserWindow>,
		motionEffectsReactions: MotionEffectsReactions
	): IScrubReactionManager => {
		const activeListeners: Array<MediaQueryList> = []
		let isHoverSupported = false

		const checkForHoverSupport = () => browserWindow.matchMedia('(hover: hover)').matches

		const triggerScrub = (isBreakpointChange?: boolean) => {
			const viewportWidth = browserWindow.innerWidth
			motionEffectsReactions.scrub(getEffectsCurrentBreakpoint(viewportWidth), isBreakpointChange)
		}

		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			if (event.matches) {
				triggerScrub(true)
			}
		}

		const getEffectsCurrentBreakpoint = (viewportWidth?: number) => {
			return scrubReactionWithBpRanges.reduce((acc, reactionData) => {
				const isTriggerSupported = isHoverSupported || reactionData.triggerData.trigger !== 'pointer-move'
				if (!isTriggerSupported) {
					return acc
				}

				const isInBreakpoint = isTriggerBpRangeInCurrentWindowRange(reactionData.triggerBpRange, viewportWidth)
				if (isInBreakpoint) {
					reactionData.reactions.forEach((reaction) => {
						acc[reaction.reactionData.effect] = reactionData.triggerData
					})
				}
				return acc
			}, {} as Record<string, ScrubTriggerVariant>)
		}

		const observeBreakpointChange = () => {
			let hasDefaultScope = false
			let hasMatch = false

			scrubBpRanges.forEach((range) => {
				const matchMediaString = getMatchMediaString(range)

				if (matchMediaString) {
					const mediaQueryList = browserWindow.matchMedia(matchMediaString)
					activeListeners.push(mediaQueryList)
					mediaQueryList.addEventListener('change', handleMediaQueryChange)

					if (mediaQueryList.matches) {
						hasMatch = true
						triggerScrub()
					}
				} else {
					hasDefaultScope = true
				}
			})

			if (!hasMatch && hasDefaultScope) {
				triggerScrub()
			}
		}

		const init = () => {
			if (isSSR(browserWindow)) {
				return
			}

			isHoverSupported = checkForHoverSupport()

			observeBreakpointChange()
		}

		const destroy = () => {
			if (isSSR(browserWindow)) {
				return
			}

			activeListeners.forEach((mediaQueryList) => {
				mediaQueryList.removeEventListener('change', handleMediaQueryChange)
			})

			activeListeners.length = 0
		}

		return {
			init,
			destroy,
		}
	}
)
