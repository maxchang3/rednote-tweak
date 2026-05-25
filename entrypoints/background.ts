const MENU_ID = 'search-on-xiaohongshu'
const FEATURE_KEY: FeatureKey = 'searchSelectedText'

const removeMenuIfExists = async () => {
  try {
    await browser.contextMenus.remove(MENU_ID)
  } catch {
    // Ignore if menu does not exist yet.
  }
}

const syncMenuEnabled = async (enabled: boolean) => {
  await removeMenuIfExists()

  if (!enabled) return

  const title = browser.i18n.getMessage('searchSelectedTextMenuTitle')

  browser.contextMenus.create({
    id: MENU_ID,
    title: title,
    contexts: ['selection'],
  })
}

export default defineBackground(() => {
  const syncFromStorage = async () => {
    const enabled = await getFeatureValue(FEATURE_KEY)
    await syncMenuEnabled(enabled)
  }

  browser.runtime.onInstalled.addListener(() => {
    void syncFromStorage()
  })

  watchFeatureValue(FEATURE_KEY, (enabled) => {
    void syncMenuEnabled(enabled)
  })

  browser.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId !== MENU_ID || !info.selectionText?.trim()) {
      return
    }

    const useIntl = await getFeatureValue('useIntlSearch')

    await browser.tabs.create({
      url: buildSearchURL(info.selectionText.trim(), useIntl),
    })
  })
})
