import {
    implementations as _tpaActionImplementations
} from '@wix/data-binding-tpa-actions'
import '../helpers/polyfills'
import parseUrl from 'url-parse'
import {
    viewerAutomationsClientCreator
} from '@wix/wix-code-automations-client'
import {
    Trace,
    Breadcrumb,
    AppError
} from '../logger'
import FesDataFetcher from '../inverted-dependencies/FesDataFetcher'
import WixDataFetcher from '../inverted-dependencies/WixDataFetcher'
import {
    WarmupCache
} from '../inverted-dependencies/WarmupCache'
import StaticCache from '../inverted-dependencies/StaticCache'
import {
    createFeatures
} from '../inverted-dependencies/Features'
import Logger from '../inverted-dependencies/Logger'
import DataBinding from './DataBinding'
import {
    createListenersByEvent
} from '../inverted-dependencies/createListenersByEvent'
import {
    createDataSchemasClientForBrowser
} from '@wix/wix-data-schemas-client'
import {
    Platform
} from '../inverted-dependencies/Platform'
import {
    createDatasetConfigs
} from '../inverted-dependencies/helpers/utils'
import {
    createComponentFactory
} from '../inverted-dependencies/components'
import i18nCreatorLite from '../helpers/i18nCreatorLite'
import {
    loadExpressionFunctions
} from '@wix/expressions'
import {
    createAutomationsV2Client
} from '../inverted-dependencies/automationsV2Client'

const setWebpackPublicPathFromAppUrl = url => {
    try {
        __webpack_public_path__ = url.substr(0, url.lastIndexOf('/') + 1) // eslint-disable-line
    } catch {}
}

export const createApp = ({
    verbose = false,
    //TODO: all this crap is in constructor, because it can be passed from IT tests. AAAAAAA!!!!!
    //TODO: kurva!!! should be removed after crappy it tests for internal business logic will be changed to units.
    //TODO: And WixDataFetcher integration with wix data and schemas should be tested separately
    wixDataSchemasForItTests,
    automationsClientCreator = viewerAutomationsClientCreator,
    tpaActionImplementations = _tpaActionImplementations,
} = {}) => {
    let routerData
    let dataBinding
    const initAppForPage = (
        platformSettings,
        platformUtils,
        wixSdk, {
            bi = {},
            monitoring: {
                createMonitor
            },
            fedOpsLoggerFactory,
            biLoggerFactory,
            essentials: {
                httpClient,
                experiments,
                createErrorMonitor
            },
        } = {},
    ) => {
        let logger
        try {
            const platform = new Platform({
                platformUtils,
                wixSdk,
                bi,
                tpaActionImplementations,
                devMode: false,
                verbose,
            })
            const {
                settings
            } = platform
            const {
                instance,
                appData: {
                    gridAppId
                },
                url,
            } = platformSettings
            setWebpackPublicPathFromAppUrl(url)

            const {
                data: wixData,
                window: {
                    warmupData,
                    getRouterData
                },
                location: {
                    baseUrl,
                    protocol
                },
                site: {
                    language,
                    currentPage
                },
            } = wixSdk

            routerData = getRouterData()
            if (experiments.enabled('specs.wixDataClient.RouterDataToWarmupCache')) {
                warmupData.set('routerData', routerData)
            }

            logger = new Logger({
                fedops: {
                    factory: fedOpsLoggerFactory,
                    hooks: {
                        start: ({
                                name
                            }) =>
                            logger.log(
                                new Breadcrumb({
                                    category: 'interaction start',
                                    message: `interaction ${name} started`,
                                }),
                            ),
                        end: ({
                                name,
                                duration
                            }) =>
                            logger.log(
                                new Breadcrumb({
                                    category: 'interaction end',
                                    message: `interaction ${name} ended after ${duration} ms`,
                                }),
                            ),
                    },
                },
                bi: {
                    factory: biLoggerFactory
                },
                monitor: {
                    factory: createMonitor,
                    createErrorMonitor
                },
                verbose: {
                    factory: () => ({
                        // eslint-disable-next-line no-console
                        log: (...args) =>
                            (wixSdk.telemetry ? .console || console).verbose(...args),
                    }),
                },
                console: {
                    factory: () => wixSdk.telemetry ? .console || console,
                },
                platform,
                global: self,
            })

            logger.log(new Trace('databinding/initAppForPage', Trace.types.START))

            const i18n = i18nCreatorLite(language)

            const features = createFeatures({
                experiments,
                settings
            })

            const dataFetcher = features.fes ?
                new FesDataFetcher({
                    httpClient,
                    getRequestParams: () => ({
                        instance,
                        gridAppId
                    }),
                }) :
                new WixDataFetcher({
                    wixData,
                    wixDataSchemas: wixDataSchemasForItTests ||
                        createDataSchemasClientForBrowser(
                            httpClient,
                            instance,
                            gridAppId, {
                                baseUrl: `${settings.env.editor ? 'https' : protocol}://${
                    parseUrl(baseUrl).hostname
                  }/_api/cloud-data`,
                                useApiV2: true,
                            },
                        ),
                })

            const warmupCache = new WarmupCache(warmupData)
            const staticCache = new StaticCache(routerData)
            const listenersByEvent = createListenersByEvent({
                automationsClientCreator: () =>
                    features.automationsClientV2 ?
                    createAutomationsV2Client(httpClient) :
                    automationsClientCreator({
                        httpClient,
                    }),
                pageId: currentPage.id,
            })

            dataBinding = new DataBinding({
                platform,
                dataFetcher,
                warmupCache,
                staticCache,
                features,
                listenersByEvent,
                logger,
                i18n,
                global: self,
                loadExpressionFunctions,
            })

            logger.log(new Trace('databinding/initAppForPage', Trace.types.END))

            return Promise.resolve()
        } catch (e) {
            if (logger) {
                logger.log(new AppError('App initialisation failed', {
                    cause: e
                }))
            }
            return Promise.reject(e)
        }
    }

    const createControllers = rawControllerConfigs => {
        if (!rawControllerConfigs.length) {
            return []
        }

        const datasetConfigs = createDatasetConfigs(
            rawControllerConfigs,
            routerData,
        )

        const fireEventByDatasetId = rawControllerConfigs.reduce(
            (acc, {
                $w,
                compId
            }) => {
                acc[compId] = $w.fireEvent
                return acc
            }, {},
        )

        return dataBinding
            .initializeDatasets({
                datasetConfigs,
                firePlatformEvent: datasetId => fireEventByDatasetId[datasetId],
            })
            .map(dataset => ({
                ...dataset,
                pageReady: $w => dataset.pageReady(createComponentFactory($w)),
            }))
    }

    return {
        initAppForPage,
        createControllers,
    }
}