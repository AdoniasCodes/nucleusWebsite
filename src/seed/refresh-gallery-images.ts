import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Re-uploads the four gallery images from public/images/stock into the `media`
 * collection. Run after swapping the local stock files for real campus photos,
 * the July seed uploaded the old stock images to S3, so the CMS-driven gallery
 * (homepage + campus-life) keeps serving them until the media docs are refreshed.
 *
 * Run: `npm run refresh:gallery`. Idempotent: updates in place, never duplicates.
 */

const dirname = path.dirname(fileURLToPath(import.meta.url))
const STOCK_DIR = path.resolve(dirname, '../../public/images/stock')

const FILES = [
  'gallery-campus.webp',
  'gallery-classroom.webp',
  'gallery-stem.webp',
  'gallery-sports.webp',
]

/** Retry helper for a flaky link: transient ETIMEDOUT/ECONNRESET get 3 attempts with backoff. */
async function withRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt >= 3) throw err
      console.log(`  retry ${attempt}/2 for ${label} (${(err as Error).message?.slice(0, 60)})`)
      await new Promise((r) => setTimeout(r, 4000 * attempt))
    }
  }
}

async function run() {
  const payload = await withRetry('connect', () => getPayload({ config }))
  let updated = 0

  for (const file of FILES) {
    // Match the base name AND suffixed re-uploads (gallery-campus-1.webp, -2, …):
    // Payload appends a counter on every refresh because S3 keys are never overwritten.
    const base = file.replace(/\.webp$/, '')
    const existing = await withRetry(`find ${file}`, () =>
      payload.find({
        collection: 'media',
        where: { filename: { like: base } },
        sort: '-createdAt',
        limit: 1,
      }),
    )
    const doc = existing.docs[0]
    if (!doc) {
      console.log(`  media ? ${file} (not in CMS, skipped, run seed:gallery first)`)
      continue
    }
    await withRetry(`update ${file}`, () =>
      payload.update({
        collection: 'media',
        id: doc.id,
        data: {},
        filePath: path.join(STOCK_DIR, file),
      }),
    )
    updated++
    console.log(`  media ~ ${file} (refreshed)`)
  }

  console.log(`Done. media refreshed: ${updated}/${FILES.length}`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
