export function useLocale() {
  const { state: storedLocale } = useStoredValue<string>(STORAGE_KEY.LOCALE, userLocale)
  const { locale } = useI18n()

  if (storedLocale.value) {
    locale.value = storedLocale.value as I18nLocales
  }

  const syncedLocale = computed({
    get: () => locale.value,
    set: (val: string) => {
      locale.value = val as I18nLocales
      storedLocale.value = val
    },
  })

  return {
    syncedLocale,
  }
}
