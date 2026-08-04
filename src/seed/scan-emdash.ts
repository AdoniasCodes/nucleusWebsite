import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Read-only audit: finds every em dash held in the CMS database.
 * Source files are clean, but pages/posts/globals serve their copy from Postgres,
 * so the live site keeps rendering em dashes until the DB rows are fixed too.
 *
 * Run: `PAYLOAD_SKIP_PUSH=1 npx tsx src/seed/scan-emdash.ts`
 */
const EM = '\u2014' // by escape, so this file never trips check:emdash

const HITS: { where: string; text: string }[] = []

const walk = (node: unknown, where: string) => {
  if (typeof node === 'string') {
    if (node.includes(EM)) HITS.push({ where, text: node })
    return
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${where}[${i}]`))
    return
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      if (k === 'id' || k === 'updatedAt' || k === 'createdAt') continue
      walk(v, `${where}.${k}`)
    }
  }
}

const run = async () => {
  const payload = await getPayload({ config })

  for (const slug of ['site-settings', 'seo-settings'] as const) {
    try {
      const doc = await payload.findGlobal({ slug: slug as never, depth: 0 })
      walk(doc, `global:${slug}`)
    } catch {
      console.log(`(no global "${slug}")`)
    }
  }

  for (const slug of ['pages', 'posts', 'staff', 'gallery', 'faq', 'playlists'] as const) {
    try {
      const { docs } = await payload.find({ collection: slug as never, limit: 500, depth: 0 })
      for (const d of docs as unknown as Record<string, unknown>[]) {
        walk(d, `${slug}:${(d.slug as string) || (d.name as string) || d.id}`)
      }
      console.log(`scanned ${slug}: ${docs.length} docs`)
    } catch (err) {
      console.log(`(skipped "${slug}": ${(err as Error).message.slice(0, 80)})`)
    }
  }

  const byDoc = new Map<string, number>()
  for (const h of HITS) {
    const key = h.where.split('.')[0]
    byDoc.set(key, (byDoc.get(key) ?? 0) + (h.text.split(EM).length - 1))
  }
  console.log(`\n=== ${HITS.length} strings hold em dashes ===`)
  for (const [k, v] of [...byDoc.entries()].sort((a, b) => b[1] - a[1])) console.log(`${v}\t${k}`)
  console.log('\n=== samples ===')
  for (const h of HITS.slice(0, 200)) console.log(`${h.where}\n  ${h.text.slice(0, 220)}\n`)

  process.exit(0)
}

run()
