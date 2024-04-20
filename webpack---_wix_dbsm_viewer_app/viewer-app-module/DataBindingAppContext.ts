import type { I18nLite } from '../helpers/i18nCreatorLite'
import type { Platform } from '../inverted-dependencies/Platform'
import type { Logger } from '../logger'

interface AppContext {
  i18n: I18nLite
  logger: Logger
  platform: Platform
  errorReporting: <T>(callback: T, PresetError: any) => T
  features: any
}

class DataBindingAppContext {
  #context = new Proxy({} as AppContext, {
    get(target: AppContext, prop: keyof AppContext) {
      if (target[prop]) {
        return target[prop]
      } else {
        throw new ReferenceError(
          `There is no ${prop} in context. Check if the context has been already set`,
        )
      }
    },
  })

  set(context: Partial<AppContext>) {
    Object.entries(context).forEach(([prop, value]) => {
      this.#context[prop as keyof AppContext] = value
    })
  }

  get() {
    return this.#context
  }
}

const dataBindingAppContext = new DataBindingAppContext()

export const appContext = dataBindingAppContext.get()
export const setAppContext = dataBindingAppContext.set.bind(
  dataBindingAppContext,
)
