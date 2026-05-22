export function buildXiaohongshuSearchUrl(keyword: string) {
  const params = new URLSearchParams({ keyword })

  return `https://www.xiaohongshu.com/search_result?${params.toString()}`
}

export function isXiaohongshuUrl(url: string) {
  try {
    const { hostname } = new URL(url)

    return (
      hostname === 'xiaohongshu.com' ||
      hostname === 'www.xiaohongshu.com' ||
      hostname.endsWith('.xiaohongshu.com')
    )
  } catch {
    return false
  }
}
