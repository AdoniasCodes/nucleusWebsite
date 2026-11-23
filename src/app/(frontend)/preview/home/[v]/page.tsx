import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlockRenderer, type RenderableBlock } from '@/components/blocks/BlockRenderer'
import { defaultHomeLayout } from '@/components/blocks/defaultHome'
import { VibeStrip } from '@/components/blocks/VibeStrip'
import { getPageBySlug, getPayloadClient } from '@/lib/payload'

// Team-only homepage design previews. Unlinked, noindex (meta + X-Robots-Tag in next.config),
// never cached, so no ISR writes. Delete this folder once one version is chosen.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Homepage preview', robots: { index: false, follow: false } }

const VERSIONS = ['a', 'b', 'c']
const MIN_QUOTES = 3

async function quotes() {
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
    return []
  }
}

export default async function HomePreview({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params
  if (!VERSIONS.includes(v)) notFound()
  const [home, q] = await Promise.all([getPageBySlug('home').catch(() => null), quotes()])
  const layout = (home?.layout as RenderableBlock[] | undefined) ?? defaultHomeLayout
  const blocks = layout.map((b) =>
    b.blockType === 'testimonials' ? { ...b, quotes: q.length >= MIN_QUOTES ? q : [] } : b,
  ) as RenderableBlock[]
  const [hero, ...rest] = blocks

  return (
    <div data-vibe={v}>
      <BlockRenderer blocks={[hero]} />
      {v === 'b' && <VibeStrip />}
      <BlockRenderer blocks={rest} />
    </div>
  )
}
