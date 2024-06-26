import {
	LifeCycle,
	PlatformEnvDataProviderSymbol,
	PlatformViewportAPISym,
	PlatformWorkerPromiseSym,
	SamePageUrlChangeListenerSymbol,
	StoresProviderSymbol,
	WixCodeSdkHandlersProviderSym,
} from '@wix/thunderbolt-symbols'
import { PlatformInitializerSym, PlatformWarmupDataManagerSymbol, UnfinishedTasksManagerSymbol } from './symbols'
import type { PlatformInitializer } from './types'
import { Platform } from './platform'
import { ContainerModuleLoader, FactoryWithDependencies } from '@wix/thunderbolt-ioc'
import { Storage } from './storage/storage'
import * as platformEnvDataProviders from './platformEnvData/platformEnvData'
import { biEnvDataProvider } from './platformEnvData/biEnvDataProvider'
import { locationEnvDataProvider } from './platformEnvData/locationEnvDataProvider'
import { siteAssetsEnvDataProvider } from './platformEnvData/siteAssetsEnvDataProvider'
import { platformHandlersProvider } from './handlers/platformHandlers'
import { platformViewportAPI } from './handlers/viewportHandlers'
import { WarmupDataEnricherSymbol } from 'feature-warmup-data'
import { platformUrlManager } from './handlers/platformUrlManager'
import { storesSdkHandlersProvider } from './handlers/storesSdkHandlersProvider'
import { unfinishedTasksHandlersProvider } from './handlers/unfinishedTasksHandlersProvider'
import { PlatformWarmupDataManager } from './client/platformWarmupManager'
import { mainGridAppIdProvider } from './platformEnvData/mainGridAppIdProvider'

export function createLoaders(platformInitializer: FactoryWithDependencies<PlatformInitializer>): { site: ContainerModuleLoader } {
	return {
		site: (bind) => {
			bind(WixCodeSdkHandlersProviderSym, UnfinishedTasksManagerSymbol).to(unfinishedTasksHandlersProvider)
			bind(LifeCycle.AppWillLoadPageHandler).to(Platform)
			bind(WixCodeSdkHandlersProviderSym, PlatformEnvDataProviderSymbol).to(Storage)
			bind(WixCodeSdkHandlersProviderSym).to(platformHandlersProvider)
			bind(WixCodeSdkHandlersProviderSym, StoresProviderSymbol).to(storesSdkHandlersProvider)
			bind(PlatformViewportAPISym, LifeCycle.AppWillLoadPageHandler).to(platformViewportAPI)
			bind(PlatformEnvDataProviderSymbol).to(locationEnvDataProvider)
			bind(PlatformEnvDataProviderSymbol).to(biEnvDataProvider)
			bind(PlatformEnvDataProviderSymbol).to(siteAssetsEnvDataProvider)
			bind(PlatformEnvDataProviderSymbol).to(mainGridAppIdProvider)
			bind(WixCodeSdkHandlersProviderSym, SamePageUrlChangeListenerSymbol).to(platformUrlManager)
			Object.values(platformEnvDataProviders).forEach((envDataProvider) => {
				bind(PlatformEnvDataProviderSymbol).to(envDataProvider)
			})
			if (process.env.browser) {
				bind(PlatformInitializerSym).to(platformInitializer)
				bind(PlatformWarmupDataManagerSymbol, LifeCycle.AppWillRenderFirstPageHandler).to(PlatformWarmupDataManager)
				bind(PlatformWorkerPromiseSym).toConstantValue(require('./client/create-worker'))
			} else {
				bind(PlatformInitializerSym, WarmupDataEnricherSymbol).to(platformInitializer)
			}
		},
	}
}
