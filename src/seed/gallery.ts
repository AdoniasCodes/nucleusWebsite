import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Seeds the `gallery` collection (and images into `media`) with the same four campus photos the
 * GalleryBlock currently shows as hardcoded placeholders, so the admin Gallery/Media sections
 * reflect what the site renders and the school can add or swap photos themselves.
 *
 * Run: `npm run seed:gallery`. Idempotent: skips media by filename and gallery docs by title.
 */

const dirname = path.dirname(fileURLToPath(import.meta.url))
const STOCK_DIR = path.resolve(dirname, '../../public/images/stock')

const ITEMS: { title: string; category: 'campus' | 'classroom' | 'stem' | 'sports'; file: string; featured?: boolean }[] = [
  { title: 'Campus', category: 'campus', file: 'gallery-campus.webp', featured: true },
  { title: 'Classrooms', category: 'classroom', file: 'gallery-classroom.webp' },
  { title: 'STEM & Robotics', category: 'stem', file: 'gallery-stem.webp' },
  { title: 'Sports & Play', category: 'sports', file: 'gallery-sports.webp' },
]

async function run() {
  const payload = await getPayload({ config })
  let created = 0

  for (const item of ITEMS) {
    let mediaId: number | string | undefined
    const existingMedia = await payload.find({
      collection: 'media',
      where: { filename: { equals: item.file } },
      limit: 1,
    })
    if (existingMedia.docs[0]) {
      mediaId = existingMedia.docs[0].id
    } else {
      const media = await payload.create({
        collection: 'media',
        data: { alt: `${item.title} at Nucleus International Schools, Addis Ababa` },
        filePath: path.join(STOCK_DIR, item.file),
      })
      mediaId = media.id
      console.log(`  media   + ${item.file}`)
    }

    const existing = await payload.find({
      collection: 'gallery',
      where: { title: { equals: item.title } },
      limit: 1,
    })
    if (existing.docs[0]) {
      console.log(`  gallery = ${item.title} (exists)`)
      continue
    }
    await payload.create({
      collection: 'gallery',
      data: {
        title: item.title,
        category: item.category,
        mediaType: 'image',
        image: mediaId,
        featured: Boolean(item.featured),
      },
    })
    created++
    console.log(`  gallery + ${item.title}`)
  }

  const total = await payload.count({ collection: 'gallery' })
  console.log(`Done. gallery +${created}, gallery total: ${total.totalDocs}`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
