/**
 * Payload media docs carry ABSOLUTE urls (serverURL + /api/media/file/...), but next/image only
 * accepts same-site images as RELATIVE paths (next.config `images.localPatterns` allows
 * /api/media/file/**; absolute URLs would need remotePatterns and break when
 * NEXT_PUBLIC_SERVER_URL drifts, e.g. a localhost fallback baked into a prod render).
 * Normalizing to the pathname sidesteps both failure modes.
 */
export function relativeMediaUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const u = new URL(url)
      return `${u.pathname}${u.search}`
    } catch {
      return url
    }
  }
  return url
}
