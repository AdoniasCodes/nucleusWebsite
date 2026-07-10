import { getPayloadClient } from '@/lib/payload'
import { relativeMediaUrl } from '@/lib/mediaUrl'
import { OurTeamBlock, type OurTeamProps } from './OurTeamBlock'
import { TEAM, type TeamMember } from './teamData'

/**
 * Server wrapper for the "Our Team" grid: fetches the roster from the `staff` collection so the
 * school can manage people in the admin. Falls back to the hardcoded TEAM when the CMS is empty
 * or unreachable — a CMS hiccup must never blank the About page.
 */

const DEPT_LABELS: Record<string, string> = {
  leadership: 'Leadership',
  'early-years': 'Early Years',
  primary: 'Primary',
  stem: 'STEM & Robotics',
  languages: 'Languages',
  arts: 'Arts & Music',
  pe: 'PE & Sports',
  operations: 'Operations',
  'front-office': 'Front Office',
}

/** Flatten a lexical richText bio into plain paragraphs (the modal renders <p> per entry). */
function bioToParagraphs(bio: unknown): string[] {
  const root = (bio as { root?: { children?: unknown[] } } | null | undefined)?.root
  if (!root?.children) return []
  return root.children
    .map((node) => {
      const children = (node as { children?: { text?: string }[] })?.children ?? []
      return children.map((c) => c?.text ?? '').join('')
    })
    .filter((s) => s.trim().length > 0)
}

export async function OurTeamServer(props: OurTeamProps) {
  let members: TeamMember[] | undefined
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'staff', sort: 'order', limit: 50, depth: 1 })
    if (docs.length > 0) {
      members = docs
        .map((d): TeamMember => {
          // Same-name hardcoded entry backfills anything missing in the CMS doc.
          const fallback = TEAM.find((t) => t.name === d.name)
          const photo =
            relativeMediaUrl(typeof d.photo === 'object' ? d.photo?.url : undefined) ||
            fallback?.photo ||
            ''
          const bio = bioToParagraphs(d.bio)
          return {
            id: String(d.id),
            name: d.name,
            role: d.role,
            dept: (d.department && DEPT_LABELS[d.department]) || fallback?.dept || 'Nucleus',
            photo,
            bio: bio.length > 0 ? bio : (fallback?.bio ?? []),
          }
        })
        .filter((m) => m.photo !== '')
      if (members.length === 0) members = undefined
    }
  } catch (err) {
    // CMS unreachable → render the hardcoded fallback.
    console.error('[OurTeamServer] staff fetch failed, using fallback:', err)
  }
  return <OurTeamBlock {...props} members={members} />
}
