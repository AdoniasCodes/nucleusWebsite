import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Retires "Cambridge School in Addis Ababa" from the live CMS copy.
 *
 * That phrasing reads as the competitor Cambridge International School, so every Nucleus
 * self-description now says "international Cambridge curriculum" instead. Two places need this
 * script rather than a source edit:
 *
 *   1. seo-settings is CMS-first. The defaults in `SEOSettings.ts` are fallbacks production never
 *      reads, so the live title only changes when this row does.
 *   2. Newsletter bodies are expensive to re-seed (28 images), so their prose is patched in place.
 *      Posts are re-seeded from source instead, via `seed:blogs` / `seed:camp-story-blogs`.
 *
 * Category phrasing is deliberately left alone. "The best Cambridge schools in Addis Ababa" is a
 * listicle about the whole market and a live target keyword; it is not Nucleus describing itself.
 *
 * Run: `PAYLOAD_SKIP_PUSH=1 pnpm run fix:cambridge`
 */
const TITLE = 'International Cambridge Curriculum in Addis Ababa | Nucleus International Schools'
const DESCRIPTION =
  'Nucleus teaches the international Cambridge curriculum in Mekanisa, Addis Ababa, ages 2 to Grade 8. Robotics, STEM, secure campus, multilingual staff.'

/** Reviewed sentence-level rewrites. A blanket find/replace would produce broken grammar. */
const REPLACEMENTS: [string, string][] = [
  [
    'It has since grown into a full Preschool to Grade 8 Cambridge school at the Vatican campus.',
    'It has since grown into a full Preschool to Grade 8 school teaching the international Cambridge curriculum at the Vatican campus.',
  ],
  [
    'grown into a full Preschool-to-Grade-8 Cambridge school at our Vatican campus',
    'grown into a full Preschool-to-Grade-8 school teaching the international Cambridge curriculum at our Vatican campus',
  ],
]

const walk = (node: unknown): unknown => {
  if (typeof node === 'string') {
    let out = node
    for (const [from, to] of REPLACEMENTS) out = out.split(from).join(to)
    return out
  }
  if (Array.isArray(node)) return node.map(walk)
  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) out[k] = walk(v)
    return out
  }
  return node
}

const needsFix = (v: unknown): boolean => {
  const json = JSON.stringify(v ?? '')
  return REPLACEMENTS.some(([from]) => json.includes(from))
}

const run = async () => {
  const payload = await getPayload({ config })

  const before = (await payload.findGlobal({ slug: 'seo-settings' })) as unknown as Record<string, unknown>
  console.log('before.defaultMetaTitle:', before.defaultMetaTitle)
  console.log('before.defaultMetaDescription:', before.defaultMetaDescription)

  await payload.updateGlobal({
    slug: 'seo-settings',
    data: { defaultMetaTitle: TITLE, defaultMetaDescription: DESCRIPTION },
  })

  const after = (await payload.findGlobal({ slug: 'seo-settings' })) as unknown as Record<string, unknown>
  console.log('\nafter.defaultMetaTitle:', after.defaultMetaTitle)
  console.log('after.defaultMetaDescription:', after.defaultMetaDescription)

  for (const collection of ['posts'] as const) {
    const { docs } = await payload.find({ collection, limit: 300, depth: 0 })
    for (const doc of docs as Record<string, any>[]) {
      if (needsFix(doc.content)) {
        await payload.update({
          collection,
          id: doc.id,
          data: { content: walk(doc.content) as never },
        })
        console.log(`patched: ${collection}/${doc.slug}`)
      }
      const meta = `${doc.meta?.title ?? ''} ${doc.meta?.description ?? ''} ${doc.excerpt ?? ''}`
      if (/nucleus[^.]{0,60}cambridge school|cambridge international school/i.test(meta)) {
        console.warn(`  ! ${collection}/${doc.slug} meta still self-describes as a Cambridge school`)
      }
    }
  }

  process.exit(0)
}

run()
