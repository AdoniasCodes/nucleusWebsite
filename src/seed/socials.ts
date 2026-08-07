import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Writes the school's social profiles into the live `site-settings` global.
 *
 * Site Settings is CMS-first: the `defaultValue` in `SiteSettings.ts` only applies to a fresh
 * database, so production keeps showing an empty footer until this row is written. One list
 * feeds three places: the footer icons, the "Follow Nucleus" band, and `sameAs` in the
 * Organization schema (which is how Google ties the profiles to the school as one entity).
 *
 * Run: `PAYLOAD_SKIP_PUSH=1 pnpm run seed:socials`
 */
const SOCIALS = [
  { platform: 'facebook', url: 'https://www.facebook.com/NucleusDaycare/' },
  { platform: 'tiktok', url: 'https://www.tiktok.com/@nucleusintschools' },
  { platform: 'instagram', url: 'https://www.instagram.com/nucleusintschools/' },
  { platform: 'youtube', url: 'https://www.youtube.com/@Nucleusintschools' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/company/nucleus-international-daycare' },
]

const run = async () => {
  const payload = await getPayload({ config })

  const before = (await payload.findGlobal({ slug: 'site-settings' })) as unknown as Record<string, unknown>
  console.log('before:', JSON.stringify(before.socials ?? [], null, 0))

  await payload.updateGlobal({ slug: 'site-settings', data: { socials: SOCIALS } as never })

  const after = (await payload.findGlobal({ slug: 'site-settings' })) as unknown as Record<string, unknown>
  console.log('\nafter:')
  for (const s of (after.socials ?? []) as { platform: string; url: string }[]) {
    console.log(`  ${s.platform.padEnd(10)} ${s.url}`)
  }

  process.exit(0)
}

run()
