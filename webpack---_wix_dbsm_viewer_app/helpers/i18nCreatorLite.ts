import type { TranslationKeys } from '../assets/locales'
import { translationsByLanguage } from '../assets/locales'

const englishTranslations = translationsByLanguage.en

export interface I18nLite {
  t: (key: TranslationKeys) => string
}

export default (language: string): I18nLite => {
  const translations = translationsByLanguage[language] ?? englishTranslations

  const t = (key: TranslationKeys) => translations?.[key] ?? key

  return { t }
}
