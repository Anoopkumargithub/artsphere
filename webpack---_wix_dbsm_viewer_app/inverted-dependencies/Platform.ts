import { sdk as imageKitSDK } from '@wix/image-kit'
import type { Action } from '@wix/data-binding-tpa-actions'
import type { RecordStoreRecord } from '../record-store/service'
import type { DynamicItemPageSeo } from '../seo/types'

interface SeoApi {
  renderSEOTags: (payload: DynamicItemPageSeo) => Promise<void>
}

interface WixSdk {
  location: any
  user: any
  environment: any
  window: any
  site: any
  seo: SeoApi
}

interface PlatformUtils {
  links: any
  mediaItemUtils: any
}

type Bi = any

type TpaActionImplementation = (params: {
  currentItem: RecordStoreRecord
  wixSdk: any
}) => void

export class Platform {
  constructor({
    platformUtils,
    wixSdk,
    bi,
    tpaActionImplementations,
    devMode,
    verbose,
  }: {
    platformUtils: PlatformUtils
    wixSdk: WixSdk
    bi: Bi
    tpaActionImplementations: Record<Action, TpaActionImplementation>
    devMode: boolean
    verbose: boolean
  }) {
    // you need to note, that some of those params are not static during app's lifecycle
    // some are static nowm but may change in the future.
    // for non-static props see the `#user` implementation
    this.#settings = this._getSettings({ wixSdk, bi, devMode, verbose })
    this.#user = this._getUser(wixSdk.user)
    this.#location = this._getLocation(wixSdk.location, bi)
    this.#utils = this._getUtils(platformUtils)
    this.#timers = this._getTimers(wixSdk)

    this.#executeTpaAction = async ({
      currentItem,
      action,
    }: {
      currentItem: RecordStoreRecord
      action: Action
    }) => {
      const implementation = tpaActionImplementations[action]
      await implementation({ wixSdk, currentItem })
    }
    this.#seo = this._getSeo(wixSdk)
  }

  get settings() {
    return this.#settings
  }

  get user() {
    return this.#user
  }

  get location() {
    return this.#location
  }

  get utils() {
    return this.#utils
  }

  get timers() {
    return this.#timers
  }

  get executeTpaAction() {
    return this.#executeTpaAction
  }

  get seo() {
    return this.#seo
  }

  #settings
  #user
  #location
  #utils
  #timers
  #executeTpaAction
  #seo

  _getSettings({
    wixSdk: {
      window: {
        viewMode,
        rendering: { env },
        browserLocale,
      },
      site: { regionalSettings = browserLocale },
    },
    bi: { metaSiteId, viewerName },
    devMode,
    verbose,
  }: {
    wixSdk: WixSdk
    bi: Bi
    devMode: boolean
    verbose: boolean
  }) {
    return {
      metaSiteId,
      locale: regionalSettings,
      mode: {
        name: env,
        dev: devMode,
        verbose,
        ssr: env === 'backend',
        csr: env !== 'backend',
      },
      env: {
        name: viewMode,
        live: viewMode === 'Site',
        preview: viewMode === 'Preview',
        livePreview: viewMode === 'Editor',
        editor: viewMode === 'Preview' || viewMode === 'Editor',
        renderer: viewerName,
      },
    }
  }

  _getUser(user: WixSdk['user']) {
    return {
      get id() {
        return user.currentUser.id
      },
      get loggedIn() {
        return user.currentUser.loggedIn
      },
      onLogin: user.onLogin,
    }
  }

  _getLocation({ baseUrl, url, to }: WixSdk['location'], { pageId }: Bi) {
    return { pageId, pageUrl: url, baseUrl, navigateTo: to }
  }

  _getUtils({ links, mediaItemUtils }: PlatformUtils) {
    return {
      links,
      media: {
        ...mediaItemUtils,
        getScaleToFillImageURL: imageKitSDK.getScaleToFillImageURL,
      },
    }
  }

  _getTimers(wixSdk: WixSdk) {
    return {
      queueMicrotask:
        wixSdk.environment?.timers?.queueMicrotask || queueMicrotask,
    }
  }

  _getSeo(wixSdk: WixSdk) {
    return {
      renderSEOTags: wixSdk.seo.renderSEOTags,
    }
  }
}
