const MAIN_DOMAIN = 'www.xiaohongshu.com'
const INTL_DOMAIN = 'www.rednote.com'
const ALLOWED_DOMAINS = <const>[MAIN_DOMAIN, INTL_DOMAIN]

export const buildSearchURL = (keyword: string, useIntl = false) => {
  const params = new URLSearchParams({ keyword })
  const domain = useIntl ? INTL_DOMAIN : MAIN_DOMAIN

  return `https://${domain}/search_result?${params.toString()}`
}

export const isIntlDomain = (url?: string) => {
  try {
    if (!url) return false
    const { hostname } = new URL(url)
    return hostname === INTL_DOMAIN
  } catch {
    return false
  }
}

export const isAllowedURL = (url?: string) => {
  if (!url) return false
  try {
    const { hostname } = new URL(url)

    return ALLOWED_DOMAINS.some((domain) => hostname === domain)
  } catch {
    return false
  }
}
