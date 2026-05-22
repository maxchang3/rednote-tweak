const MENU_ID = 'search-on-xiaohongshu'
const FEATURE_KEY: FeatureKey = 'searchSelectedText'
const FEATURE_STORAGE_KEY = getFeatureStorageKey(FEATURE_KEY)

async function removeMenuIfExists() {
  try {
    await browser.contextMenus.remove(MENU_ID)
  } catch {
    // Ignore if menu does not exist yet.
  }
}

async function syncMenuEnabled(enabled: boolean) {
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
    const enabled =
      (await storage.getItem<boolean>(FEATURE_STORAGE_KEY)) ?? FEATURE_DEFAULTS[FEATURE_KEY]
    await syncMenuEnabled(enabled)
  }

  browser.runtime.onInstalled.addListener(() => {
    void syncFromStorage()
  })

  storage.watch<boolean>(FEATURE_STORAGE_KEY, (nextValue) => {
    const enabled = nextValue ?? FEATURE_DEFAULTS[FEATURE_KEY]
    void syncMenuEnabled(enabled)
  })

  browser.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId !== MENU_ID || !info.selectionText?.trim()) {
      return
    }

    await browser.tabs.create({
      url: buildXiaohongshuSearchUrl(info.selectionText.trim()),
    })
  })
})
