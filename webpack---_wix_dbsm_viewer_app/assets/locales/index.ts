import * as ar from './messages_ar.json'
import * as bg from './messages_bg.json'
import * as ca from './messages_ca.json'
import * as cs from './messages_cs.json'
import * as da from './messages_da.json'
import * as de from './messages_de.json'
import * as el from './messages_el.json'
import * as en from './messages_en.json'
import * as es from './messages_es.json'
import * as fr from './messages_fr.json'
import * as he from './messages_he.json'
import * as hi from './messages_hi.json'
import * as hu from './messages_hu.json'
import * as id from './messages_id.json'
import * as it from './messages_it.json'
import * as ja from './messages_ja.json'
import * as ko from './messages_ko.json'
import * as lt from './messages_lt.json'
import * as ms from './messages_ms.json'
import * as nl from './messages_nl.json'
import * as no from './messages_no.json'
import * as pl from './messages_pl.json'
import * as pt from './messages_pt.json'
import * as ro from './messages_ro.json'
import * as ru from './messages_ru.json'
import * as sk from './messages_sk.json'
import * as sl from './messages_sl.json'
import * as sv from './messages_sv.json'
import * as th from './messages_th.json'
import * as tl from './messages_tl.json'
import * as tr from './messages_tr.json'
import * as uk from './messages_uk.json'
import * as vi from './messages_vi.json'
import * as zh from './messages_zh.json'

export type Language = string
export type Translations = typeof en
export type TranslationKeys = keyof Translations

export const translationsByLanguage: Record<Language, Translations> = {
  ar,
  bg,
  ca,
  cs,
  da,
  de,
  el,
  en,
  es,
  fr,
  he,
  hi,
  hu,
  id,
  it,
  ja,
  ko,
  lt,
  ms,
  nl,
  no,
  pl,
  pt,
  ro,
  ru,
  sk,
  sl,
  sv,
  th,
  tl,
  tr,
  uk,
  vi,
  zh,
}
