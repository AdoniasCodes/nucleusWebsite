import type { Page } from '@/payload-types'

/** The shape produced by the reusable `linkField` (src/fields/link.ts). */
export type CMSLinkValue = {
  appearance?: 'primary' | 'secondary' | 'outline' | 'link' | null
  type?: ('reference' | 'custom') | null
  newTab?: boolean | null
  label?: string | null
  reference?: (number | string | Page) | null
  url?: string | null
}

/** Resolve a CMS link to an href. Internal page refs become "/slug"; "home" → "/". */
export const resolveHref = (link?: CMSLinkValue | null): string => {
  if (!link) return '#'
  if (link.type === 'custom') return link.url || '#'
  const ref = link.reference
  if (ref && typeof ref === 'object' && 'slug' in ref && ref.slug) {
    return ref.slug === 'home' ? '/' : `/${ref.slug}`
  }
  return link.url || '#'
}
