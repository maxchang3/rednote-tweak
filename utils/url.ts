const MAIN_DOMAIN = 'www.xiaohongshu.com'
const INTL_DOMAIN = 'www.rednote.com'
const ALLOWED_DOMAINS = <const>[MAIN_DOMAIN, INTL_DOMAIN]

export function buildSearchURL(keyword: string, useIntl = false) {
  const params = new URLSearchParams({ keyword })
  const domain = useIntl ? INTL_DOMAIN : MAIN_DOMAIN

  return `https://${domain}/search_result?${params.toString()}`
}

export function isIntlDomain(url: string | null | undefined) {
  try {
    const { hostname } = new URL(url ?? '')
    return hostname === INTL_DOMAIN
  } catch {
    return false
  }
}

export function isAllowedURL(url: string) {
  try {
    const { hostname } = new URL(url)

    return ALLOWED_DOMAINS.some((domain) => hostname === domain)
  } catch {
    return false
  }
}
