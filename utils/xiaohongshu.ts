export function buildXiaohongshuSearchUrl(keyword: string) {
  const params = new URLSearchParams({ keyword })

  return `https://www.xiaohongshu.com/search_result?${params.toString()}`
}

const ALLOWED_DOMAINS = ['www.xiaohongshu.com', 'www.rednote.com']

export function isXiaohongshuUrl(url: string) {
  try {
    const { hostname } = new URL(url)

    return ALLOWED_DOMAINS.some((domain) => hostname === domain)
  } catch {
    return false
  }
}
