import { uniqueId } from 'lodash'
import { IPropsStore, IStructureAPI, BrowserWindow, ICyclicTabbing } from '@wix/thunderbolt-symbols'
import { isSSR } from '@wix/thunderbolt-commons'
import { ISiteScrollBlocker } from 'feature-site-scroll-blocker'
import { DialogComponentId } from './symbols'
import type { ILink, DialogOptions, ISignUpOptions, PrivacyNoteType } from './types'
import { TRANSLATION_KEYS } from './constants'

export type CommonProps = {
	isCloseable: boolean
	directionByLanguage?: 'ltr' | 'rtl'
	displayMode?: 'fullscreen' | 'popup' | 'customPopup'
	translations: Record<TRANSLATION_KEYS, string | undefined>
}

export type VerificationCodeProps = {
	email: string
	stateToken?: string
	error?: string
}

export type CommonActions = {
	onCloseDialogCallback: () => void
}

type ComponentTypeMap = {
	WelcomeDialog: {
		props: CommonProps & {}
		actions: CommonActions & {
			onSubmitCallback: () => void
		}
	}
	ResetPasswordDialog: {
		props: CommonProps & {
			isTermsOfUseNeeded: boolean
			isPrivacyPolicyNeeded: boolean
			privacyPolicyLink: ILink | undefined
			termsOfUseLink: ILink | undefined
		}
		actions: CommonActions & {
			onSubmitCallback: (password: string) => Promise<void>
		}
	}
	LoggedInResetPasswordDialog: {
		props: CommonProps & {}
		actions: CommonActions & {
			onSubmitCallback: (password: string) => Promise<void>
		}
	}
	RequestPasswordResetDialog: {
		props: CommonProps & {}
		actions: CommonActions & {
			onSubmitCallback: (email: string) => Promise<void>
		}
	}
	MemberLoginDialog: {
		props: CommonProps & {
			// Used to generate social login iframe
			language: string
			biVisitorId: string
			smCollectionId: string
			svSession: string
			metaSiteId: string
			bsi: string
			externalBaseUrl?: string
			headlessRedirectUrl?: string
			shouldKeepPrevDialog?: boolean
		}
		actions: CommonActions & {
			submit: (email: string, password: string) => Promise<void>
			onForgetYourPasswordClick: () => void
			onSwitchDialogLinkClick: () => void
			onBackendSocialLogin: (data: any, vendor: 'google') => Promise<void>
			getHostReadyPayload?: () => any
		}
	}
	SignUpDialog: {
		props: CommonProps & {
			isCommunityInstalled: boolean
			privacyNoteType: PrivacyNoteType
			joinCommunityCheckedByDefault: boolean | undefined
			isTermsOfUseNeeded: boolean
			isPrivacyPolicyNeeded: boolean
			isCodeOfConductNeeded: boolean
			codeOfConductLink: ILink | undefined
			privacyPolicyLink: ILink | undefined
			termsOfUseLink: ILink | undefined
			// Used to generate social login iframe
			language: string
			biVisitorId: string
			smCollectionId: string
			svSession: string
			metaSiteId: string
			bsi: string
			externalBaseUrl?: string
			headlessRedirectUrl?: string
		}
		actions: CommonActions & {
			submit: (email: string, password: string, options: ISignUpOptions) => Promise<void>
			onSwitchDialogLinkClick: () => void
			onBackendSocialLogin: (data: any, vendor: 'google') => Promise<void>
			getHostReadyPayload?: () => any
		}
	}
	NotificationDialog: {
		props: CommonProps & {
			title: string
			description: string
			okButtonText: string
		}
		actions: CommonActions & {
			onOkButtonClick: () => void
		}
	}
	ConfirmationEmailDialog: {
		props: CommonProps & {
			/**
			 * Determines whether the dialog is EmailVerificationDialog (false) or SentConfirmationEmailDialog (true)
			 */
			isSignUp: boolean
		}
		actions: CommonActions & {
			onResendConfirmationEmail: () => void
		}
	}
	NoPermissionsToPageDialog: {
		props: {}
		actions: CommonActions & {
			onSwitchAccountLinkClick: () => void
		}
	}
	VerificationCodeDialog: {
		props: {}
		actions: CommonActions & {
			onResendVerificationCodeEmail: () => void
			onCloseDialogCallback: () => void
			onSubmitCallback: (code: string) => void
		}
	}
}

class DialogService {
	constructor(
		private propsStore: IPropsStore,
		private structureApi: IStructureAPI,
		private siteScrollBlocker: ISiteScrollBlocker,
		private browserWindow: BrowserWindow,
		private cyclicTabbing: ICyclicTabbing
	) {}

	private prevCompIds: Array<string> = []
	private currentCompId?: string
	private activeElementBeforeShowDialog?: HTMLElement | null

	public async displayDialog<DialogComponentType extends keyof ComponentTypeMap>(
		dialogComponentType: DialogComponentType,
		props: ComponentTypeMap[DialogComponentType]['props'],
		actions: ComponentTypeMap[DialogComponentType]['actions'],
		options: DialogOptions = {},
		shouldKeepPrevDialog?: boolean
	): Promise<void> {
		const showDialog = async () => {
			if (!isSSR(this.browserWindow)) {
				this.activeElementBeforeShowDialog = this.browserWindow.document.activeElement as HTMLElement
			}
			const newCompId = uniqueId(DialogComponentId)
			this.propsStore.update({ [newCompId]: { ...props, ...actions } })
			if (this.currentCompId) {
				this.cyclicTabbing.disableCyclicTabbing(this.currentCompId)
			}
			this.cyclicTabbing.enableCyclicTabbing(newCompId)
			await this.structureApi.addComponentToDynamicStructure(newCompId, {
				componentType: dialogComponentType,
				components: [],
			})

			if (this.currentCompId) {
				if (shouldKeepPrevDialog) {
					this.prevCompIds.push(this.currentCompId)
				} else {
					this.structureApi.removeComponentFromDynamicStructure(this.currentCompId)
					this.siteScrollBlocker.setSiteScrollingBlocked(false, this.currentCompId)
				}
			}
			this.siteScrollBlocker.setSiteScrollingBlocked(true, newCompId)

			this.currentCompId = newCompId
		}

		const { shouldWaitForAppDidMount, registerToAppDidMount } = options
		if (shouldWaitForAppDidMount && registerToAppDidMount) {
			// wait for appDidMount before displaying dialog on direct navigation - https://jira.wixpress.com/browse/TB-1103
			registerToAppDidMount(showDialog)
		} else {
			await showDialog()
		}
	}

	public hideDialog(closeAll?: boolean) {
		if (this.currentCompId) {
			this.removeComponentFromDynamicStructure(this.currentCompId)
			if (closeAll) {
				while (this.prevCompIds.length > 0) {
					this.removeComponentFromDynamicStructure(this.prevCompIds.pop()!)
				}
			}
			this.currentCompId = this.prevCompIds.pop()
		}

		if (!isSSR(this.browserWindow)) {
			this.activeElementBeforeShowDialog?.focus()
			this.activeElementBeforeShowDialog = null
		}
	}

	private removeComponentFromDynamicStructure(compId: string) {
		this.structureApi.removeComponentFromDynamicStructure(compId)
		this.siteScrollBlocker.setSiteScrollingBlocked(false, compId)
		this.cyclicTabbing.disableCyclicTabbing(compId)
	}
}

export const getDialogService = (
	propsStore: IPropsStore,
	structureApi: IStructureAPI,
	siteScrollBlocker: ISiteScrollBlocker,
	browserWindow: BrowserWindow,
	cyclicTabbing: ICyclicTabbing
) => {
	return new DialogService(propsStore, structureApi, siteScrollBlocker, browserWindow, cyclicTabbing)
}
