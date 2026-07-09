import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * One-off migration: move existing summer-camp leads out of `admissions-inquiries` (where they
 * were stored with interest = 'summer-camp') into the dedicated `summer-camp-registrations`
 * collection.
 *
 * Run: `npm run migrate:camp-leads`
 *
 * SAFE BY DESIGN:
 *  - Copies only. Originals in admissions-inquiries are NOT deleted (verify the move, then clean
 *    up manually once you're happy).
 *  - Parses a leading "Preferred campus: X" line out of the old message (that's how the campus was
 *    stored before this collection existed) into the new `preferredCampus` column; the remaining
 *    message text is preserved.
 *  - Prints exactly what it moved.
 */
async function run() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'admissions-inquiries',
    where: { interest: { equals: 'summer-camp' } },
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  })

  console.log(`Found ${docs.length} summer-camp lead(s) in admissions-inquiries.`)

  let moved = 0
  for (const doc of docs) {
    // Split off a leading "Preferred campus: X" line if present.
    const rawMessage = (doc.message ?? '').toString()
    const lines = rawMessage.split('\n')
    let preferredCampus: string | undefined
    let restLines = lines
    const first = lines[0]?.trim() ?? ''
    const match = first.match(/^Preferred campus:\s*(.+)$/i)
    if (match) {
      preferredCampus = match[1].trim()
      restLines = lines.slice(1)
    }
    const message = restLines.join('\n').trim() || undefined

    await payload.create({
      collection: 'summer-camp-registrations',
      data: {
        parentName: doc.parentName,
        email: doc.email,
        phone: doc.phone ?? undefined,
        childAge: doc.childAge ?? undefined,
        childGrade: doc.childGrade ?? undefined,
        preferredCampus,
        message,
        sourcePage: doc.sourcePage ?? undefined,
      },
      overrideAccess: true,
    })

    moved += 1
    console.log(
      `  moved: ${doc.parentName} <${doc.email}>` +
        (preferredCampus ? ` — campus: ${preferredCampus}` : ''),
    )
  }

  console.log(
    `\nDone. Copied ${moved} registration(s) into summer-camp-registrations. ` +
      `Originals in admissions-inquiries were left in place — delete them manually after verifying.`,
  )
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
