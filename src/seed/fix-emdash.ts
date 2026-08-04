import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Strips em dashes out of copy that lives ONLY in the database.
 *
 * Posts and playlists are re-seeded from source, so they fix themselves. Staff bios and the
 * SEO globals are CMS-first: the values in `teamData.ts` / `SEOSettings.ts` are fallbacks that
 * production never reads, so the live site keeps rendering em dashes until these rows change.
 *
 * Replacements are explicit rather than a blanket swap, because an em dash stands in for a
 * comma in some sentences and a full stop in others. Anything not matched falls back to a
 * comma and is reported, so an unreviewed sentence is visible rather than silent.
 *
 * Run: `PAYLOAD_SKIP_PUSH=1 pnpm run fix:emdash`
 */
const EM = '\u2014' // by escape, so this file never trips check:emdash
const D = ` ${EM} ` // the spaced em dash this codebase used everywhere

const REPLACEMENTS: [string, string][] = [
  [`Inventory of Leadership Styles${D}particularly as`, 'Inventory of Leadership Styles, particularly as'],
  [`for every family${D}working with parents`, 'for every family, working with parents'],
  [`in international education${D}leading recruitment`, 'in international education, leading recruitment'],
  [`soft-target risk assessment${D}including counterterrorism`, 'soft-target risk assessment, including counterterrorism'],
  [`marketing & communications${D}with strong skills`, 'marketing & communications, with strong skills'],
  [`piano and keyboard${D}from beginners to advanced performers${D}and has guided`, 'piano and keyboard, from beginners to advanced performers, and has guided'],
  [`nursing experience in London${D}developing exceptional`, 'nursing experience in London, developing exceptional'],
]

let unmatched = 0

/** Apply the reviewed replacements; anything left over becomes a comma and is logged. */
const clean = (s: string, where: string): string => {
  let out = s
  for (const [from, to] of REPLACEMENTS) out = out.split(from).join(to)
  if (out.includes(EM)) {
    unmatched += 1
    console.warn(`  ! unreviewed em dash at ${where}: ${out.slice(Math.max(0, out.indexOf(EM) - 60), out.indexOf(EM) + 60)}`)
    // A title separator reads as a pipe; running prose reads as a comma.
    out = where.endsWith('.title') ? out.split(D).join(' | ') : out.split(D).join(', ').split(EM).join(',')
  }
  return out
}

const walk = (node: unknown, where: string): unknown => {
  if (typeof node === 'string') return node.includes(EM) ? clean(node, where) : node
  if (Array.isArray(node)) return node.map((v, i) => walk(v, `${where}[${i}]`))
  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) out[k] = walk(v, `${where}.${k}`)
    return out
  }
  return node
}

const hasDash = (v: unknown): boolean => JSON.stringify(v ?? '').includes(EM)

const run = async () => {
  const payload = await getPayload({ config })

  // ---- Staff bios (CMS-first: teamData.ts is only a fallback) ----
  const { docs: staff } = await payload.find({ collection: 'staff', limit: 200, depth: 0 })
  for (const member of staff as unknown as Record<string, unknown>[]) {
    if (!hasDash(member.bio)) continue
    const bio = walk(member.bio, `staff:${member.name as string}.bio`)
    await payload.update({ collection: 'staff', id: member.id as number, data: { bio } as never })
    console.log('fixed staff bio:', member.name)
  }

  // ---- SEO / site globals ----
  for (const slug of ['seo-settings', 'site-settings'] as const) {
    try {
      const doc = (await payload.findGlobal({ slug: slug as never, depth: 0 })) as unknown as Record<string, unknown>
      if (!hasDash(doc)) continue
      const { id: _id, createdAt: _c, updatedAt: _u, globalType: _g, ...rest } = doc
      const cleaned = walk(rest, `global:${slug}`) as Record<string, unknown>
      await payload.updateGlobal({ slug: slug as never, data: cleaned as never })
      console.log('fixed global:', slug)
    } catch (err) {
      console.log(`(skipped global "${slug}": ${(err as Error).message.slice(0, 90)})`)
    }
  }

  console.log(unmatched ? `\ndone, but ${unmatched} sentence(s) fell back to a comma, review the warnings above` : '\ndone, every replacement was a reviewed one')
  process.exit(0)
}

run()
