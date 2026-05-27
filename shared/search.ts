const buildSearchURL = (keyword: string, useIntl = false) => {
  const params = new URLSearchParams({ keyword, source: 'web_explore_feed' })
  const domain = useIntl ? INTL_DOMAIN : MAIN_DOMAIN

  return `https://${domain}/search_result?${params.toString()}`
}

export const openSearchTab = async (keyword: string, useIntl: boolean) => {
  const url = buildSearchURL(keyword, useIntl)
  const targetDomain = useIntl ? INTL_DOMAIN : MAIN_DOMAIN

  const sameDomainTabs = await browser.tabs.query({
    currentWindow: true,
    url: `https://${targetDomain}/*`,
  })

  if (sameDomainTabs.length === 0) return browser.tabs.create({ url })

  // Prefer the active tab, then the most recently accessed, then the rightmost
  const anchorTab =
    sameDomainTabs.find((tab) => tab.active) ??
    sameDomainTabs.reduce((best, tab) => {
      if (tab.lastAccessed == null) return best
      if (best.lastAccessed == null) return tab
      if (tab.lastAccessed !== best.lastAccessed) {
        return tab.lastAccessed > best.lastAccessed ? tab : best
      }
      return tab.index > best.index ? tab : best
    })

  return browser.tabs.create({ url, index: anchorTab.index + 1 })
}
