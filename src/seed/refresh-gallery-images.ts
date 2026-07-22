import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Re-uploads the four gallery images from public/images/stock into the `media`
 * collection. Run after swapping the local stock files for real campus photos —
 * the July seed uploaded the old stock images to S3, so the CMS-driven gallery
 * (homepage + campus-life) keeps serving them until the media docs are refreshed.
 *
 * Run: `npm run refresh:gallery`. Idempotent — updates in place, never duplicates.
 */

const dirname = path.dirname(fileURLToPath(import.meta.url))
const STOCK_DIR = path.resolve(dirname, '../../public/images/stock')

const FILES = [
  'gallery-campus.webp',
  'gallery-classroom.webp',
  'gallery-stem.webp',
  'gallery-sports.webp',
]

async function run() {
  const payload = await getPayload({ config })
  let updated = 0

  for (const file of FILES) {
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: file } },
      limit: 1,
    })
    const doc = existing.docs[0]
    if (!doc) {
      console.log(`  media ? ${file} (not in CMS — skipped, run seed:gallery first)`)
      continue
    }
    await payload.update({
      collection: 'media',
      id: doc.id,
      data: {},
      filePath: path.join(STOCK_DIR, file),
    })
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
