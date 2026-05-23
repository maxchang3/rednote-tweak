import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

import type schema from '~/assets/locales/en.json'

export type I18nSchema = typeof schema
export type I18nLocales = 'en' | 'zh-CN' | 'zh-TW'

async function getLocale() {
  const stored = await storage.getItem<unknown>(STORAGE_KEY_LOCALE)
  if (stored && typeof stored === 'string') return stored
  const browserLang = browser.i18n.getUILanguage()
  return browserLang
}

export const userLocale = await getLocale()

export default createI18n<[I18nSchema], I18nLocales>({
  legacy: false,
  locale: userLocale,
  messages: messages as any,
  fallbackLocale: {
    'zh-HK': ['zh-TW'],
    'zh-MO': ['zh-TW'],
    zh: ['zh-CN'],
    default: ['en'],
  },
  fallbackWarn: true,
})
