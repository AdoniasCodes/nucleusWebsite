import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlockRenderer, type RenderableBlock } from '@/components/blocks/BlockRenderer'
import { defaultHomeLayout } from '@/components/blocks/defaultHome'
import { VibeStrip } from '@/components/blocks/VibeStrip'
import { CampusCarousel } from '@/components/blocks/CampusCarousel'
import { getPageBySlug, getPayloadClient } from '@/lib/payload'

// Team-only homepage design previews. Unlinked, noindex (meta + X-Robots-Tag in next.config),
// never cached, so no ISR writes. Delete this folder once one version is chosen.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Homepage preview', robots: { index: false, follow: false } }

const VERSIONS = ['a', 'b', 'd', 'e']
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
  // E drops the Core Values orbit; D swaps the Campus Life gallery for a 5-photo carousel.
  const kept = v === 'e' ? blocks.filter((b) => b.blockType !== 'coreValuesOrbit') : blocks
  const [hero, ...rest] = kept
  const gi = v === 'd' ? rest.findIndex((b) => b.blockType === 'galleryBlock') : -1

  return (
    <div data-vibe={v}>
      {v === 'e' && (
        // The Nucleus badge outline (0 to 1 box), used to cut the hero video; same shape as the certificate shield.
        <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
          <clipPath id="nucleus-badge" clipPathUnits="objectBoundingBox">
            <path d="M0.4985,0.0000 L0.0617,0.0853 L0.0555,0.0998 L0.0384,0.1202 L0.0000,0.1466 L0.0000,0.6947 L0.0217,0.7416 L0.0505,0.7849 L0.0801,0.8149 L0.1272,0.8486 L0.2103,0.8930 L0.3237,0.9459 L0.4047,0.9736 L0.4998,1.0000 L0.5953,0.9736 L0.6763,0.9459 L0.8018,0.8870 L0.8707,0.8498 L0.9141,0.8197 L0.9474,0.7873 L0.9783,0.7416 L1.0000,0.6947 L1.0000,0.1466 L0.9604,0.1190 L0.9445,0.0998 L0.9383,0.0853 L0.5015,0.0000 Z" />
          </clipPath>
        </svg>
      )}
      <BlockRenderer blocks={[hero]} />
      {v === 'b' && <VibeStrip />}
      {gi >= 0 ? (
        <>
          <BlockRenderer blocks={rest.slice(0, gi)} />
          <CampusCarousel />
          <BlockRenderer blocks={rest.slice(gi + 1)} />
        </>
      ) : (
        <BlockRenderer blocks={rest} />
      )}
    </div>
  )
}
