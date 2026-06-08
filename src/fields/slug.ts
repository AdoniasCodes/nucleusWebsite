import type { Field } from 'payload'

/** Lowercase, hyphenated, URL-safe slug. */
export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .toLowerCase()
    .trim()

/**
 * Reusable slug field. Auto-derives from `trackField` (default 'title') when left blank,
 * but stays editable. Indexed + unique for fast, canonical URL lookups.
 */
export const slugField = (trackField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'URL path segment. Auto-generated from the title if left blank.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) return formatSlug(value)
        const fallback = data?.[trackField]
        if (typeof fallback === 'string' && fallback.length > 0) return formatSlug(fallback)
        return value
      },
    ],
  },
})
