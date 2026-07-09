import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks } from '../lib/lexical'
import { TEAM } from '../components/blocks/OurTeamBlock'

/**
 * Seeds the `staff` collection (and their photos into `media`) from the hardcoded TEAM roster in
 * OurTeamBlock.tsx, so the school can manage people in the admin. The About page renders the CMS
 * roster via OurTeamServer, falling back to the hardcoded list only when the CMS is empty.
 *
 * Run: `npm run seed:staff`. Idempotent — skips media by filename and staff by name.
 */

const dirname = path.dirname(fileURLToPath(import.meta.url))
const TEAM_DIR = path.resolve(dirname, '../../public/images/team')

/** Display dept (hardcoded roster) → `department` select value. */
const DEPT_VALUES: Record<string, string> = {
  Leadership: 'leadership',
  'Early Years': 'early-years',
  Primary: 'primary',
  'STEM & Robotics': 'stem',
  Languages: 'languages',
  'Arts & Music': 'arts',
  'PE & Sports': 'pe',
  Operations: 'operations',
  'Front Office': 'front-office',
}

async function run() {
  const payload = await getPayload({ config })
  let mediaCreated = 0
  let staffCreated = 0

  for (const [i, member] of TEAM.entries()) {
    const filename = path.basename(member.photo)

    // 1. Photo → media (skip if already uploaded)
    let mediaId: number | string | undefined
    const existingMedia = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
    })
    if (existingMedia.docs[0]) {
      mediaId = existingMedia.docs[0].id
    } else {
      const media = await payload.create({
        collection: 'media',
        data: { alt: `${member.name} — ${member.role}, Nucleus International Schools` },
        filePath: path.join(TEAM_DIR, filename),
      })
      mediaId = media.id
      mediaCreated++
      console.log(`  media  + ${filename}`)
    }

    // 2. Staff doc (skip if already present)
    const existingStaff = await payload.find({
      collection: 'staff',
      where: { name: { equals: member.name } },
      limit: 1,
    })
    if (existingStaff.docs[0]) {
      console.log(`  staff  = ${member.name} (exists)`)
      continue
    }
    await payload.create({
      collection: 'staff',
      data: {
        name: member.name,
        role: member.role,
        department: (DEPT_VALUES[member.dept] ?? 'leadership') as never,
        photo: mediaId,
        bio: richTextFromBlocks(member.bio.map((p) => ({ p }))) as never,
        isLeadership: member.dept === 'Leadership',
        order: i,
      },
    })
    staffCreated++
    console.log(`  staff  + ${member.name}`)
  }

  const total = await payload.count({ collection: 'staff' })
  console.log(`Done. media +${mediaCreated}, staff +${staffCreated}, staff total: ${total.totalDocs}`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
