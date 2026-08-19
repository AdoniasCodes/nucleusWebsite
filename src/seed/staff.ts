import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks } from '../lib/lexical'
import { TEAM } from '../components/blocks/teamData'

/**
 * Reconciles the `staff` collection (and their photos into `media`) with the hardcoded TEAM
 * roster in teamData.ts, so the school can manage people in the admin. The About page renders the
 * CMS roster via OurTeamServer, falling back to the hardcoded list only when the CMS is empty.
 *
 * Run: `pnpm run seed:staff`. Re-runnable, and it reconciles rather than only appending:
 *   - creates anyone in TEAM who has no staff row yet (uploading their photo first),
 *   - rewrites `order` on every row so the site order matches the TEAM array,
 *   - DELETES staff rows whose name is no longer in TEAM (someone who has left).
 * Existing bios/roles typed by the school in the admin are never overwritten.
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
  let staffReordered = 0

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
        data: { alt: `${member.name}, ${member.role}, Nucleus International Schools` },
        filePath: path.join(TEAM_DIR, filename),
      })
      mediaId = media.id
      mediaCreated++
      console.log(`  media  + ${filename}`)
    }

    // 2. Staff doc: create when missing, otherwise only realign the display order so the school's
    //    own edits to role/bio in the admin survive a re-run.
    const existingStaff = await payload.find({
      collection: 'staff',
      where: { name: { equals: member.name } },
      limit: 1,
    })
    const current = existingStaff.docs[0]
    if (current) {
      if (current.order !== i) {
        await payload.update({ collection: 'staff', id: current.id, data: { order: i } })
        staffReordered++
        console.log(`  staff  ~ ${member.name} (order ${current.order} → ${i})`)
      } else {
        console.log(`  staff  = ${member.name} (exists)`)
      }
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

  // 3. Anyone in the CMS who is no longer on the roster has left the school: remove them, or the
  //    About page keeps showing them (the CMS roster wins over TEAM whenever it is non-empty).
  let staffDeleted = 0
  const names = new Set(TEAM.map((m) => m.name))
  const { docs: allStaff } = await payload.find({ collection: 'staff', limit: 200, depth: 0 })
  for (const doc of allStaff) {
    if (names.has(doc.name)) continue
    await payload.delete({ collection: 'staff', id: doc.id })
    staffDeleted++
    console.log(`  staff  - ${doc.name} (no longer in TEAM)`)
  }

  const total = await payload.count({ collection: 'staff' })
  console.log(
    `Done. media +${mediaCreated}, staff +${staffCreated} ~${staffReordered} -${staffDeleted}, staff total: ${total.totalDocs}`,
  )
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
