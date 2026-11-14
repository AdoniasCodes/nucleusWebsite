import type { Metadata } from 'next'
import { BlockRenderer, type RenderableBlock } from '@/components/blocks/BlockRenderer'
import { defaultHomeLayout } from '@/components/blocks/defaultHome'
import { JsonLd } from '@/components/seo/JsonLd'
import { getPageBySlug, getSiteSettings, getSEOSettings, getPayloadClient } from '@/lib/payload'
import { buildOrganizationSchema } from '@/lib/seo'

// Content is editor-driven: cached for a day, refreshed on demand when the admin saves (hooks/revalidateSite.ts).
export const revalidate = 86400

export const metadata: Metadata = { alternates: { canonical: '/' } }

const MIN_QUOTES = 3

/** Approved parent testimonials for the homepage band: featured first, then newest. */
async function getApprovedQuotes() {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'testimonials',
      where: { status: { equals: 'approved' } },
      sort: ['-featured', '-createdAt'],
      limit: MIN_QUOTES,
      depth: 0,
      overrideAccess: false,
    })
    return res.docs.map((t) => ({
      quote: t.quote,
      author: t.authorName,
      relationship: t.relationship ?? (t.childYear ? `Parent of ${t.childYear} student` : undefined),
    }))
  } catch {
    // A failed read hides the band; it never takes the homepage down.
    return []
  }
}

export default async function HomePage() {
  const [home, settings, seo, quotes] = await Promise.all([
    getPageBySlug('home').catch(() => null),
    getSiteSettings().catch(() => null),
    getSEOSettings().catch(() => null),
    getApprovedQuotes(),
  ])

  // Use the CMS "home" page if an editor has created one; otherwise the code default.
  const layout = (home?.layout as RenderableBlock[] | undefined) ?? defaultHomeLayout
  // The testimonials section shows real, staff-approved parent quotes only, and only once there
  // are at least three. Until then the block gets no quotes and renders nothing.
  const blocks = layout.map((b) =>
    b.blockType === 'testimonials' ? { ...b, quotes: quotes.length >= MIN_QUOTES ? quotes : [] } : b,
  ) as RenderableBlock[]

  return (
    <>
      <JsonLd data={buildOrganizationSchema(settings, seo)} />
      <BlockRenderer blocks={blocks} />
    </>
  )
}
