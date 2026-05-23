export function useLocale() {
  const { state: storedLocale } = useStoredValue<string>(STORAGE_KEY_LOCALE, userLocale)
  const { t, locale } = useI18n()

  const resolvedLocale = computed({
    get: () => {
      return t('#currentLocale')
    },
    set: (val: string) => {
      locale.value = val as I18nLocales
      storedLocale.value = val
    },
  })

  return {
    resolvedLocale,
  }
}
