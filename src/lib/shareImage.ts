/**
 * The site-wide social share card. Parents share Nucleus links in WhatsApp groups, and a link
 * with no `og:image` renders as a blank grey row there, so every route must carry one.
 *
 * JPEG on purpose: WhatsApp's preview fetcher is unreliable with WebP, which is what most of
 * the site's photography is. Source of the card: `scripts/og-default.html` (rendered 1200x630
 * with headless Chrome).
 *
 * Next.js merges metadata SHALLOWLY: a route that sets `openGraph` at all replaces the parent's
 * whole `openGraph` object. So every `generateMetadata` that touches openGraph/twitter has to
 * pass images itself, which is what `shareImages()` is for.
 */
export const DEFAULT_OG_IMAGE = '/og-default.jpg'

export type ShareImage = { url: string; width?: number; height?: number; alt?: string }

/** Resolves to `url` when there is one, otherwise the branded default card. */
export function shareImages(url?: string | null, alt?: string): ShareImage[] {
  if (url) return [{ url, alt }]
  return [
    {
      url: DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
      alt: alt ?? 'Nucleus International Schools, Vatican campus, Addis Ababa',
    },
  ]
}
