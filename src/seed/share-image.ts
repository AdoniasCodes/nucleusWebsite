import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Clears `seo-settings.defaultShareImage` so the branded 1200x630 card in `/public/og-default.jpg`
 * is what social scrapers get.
 *
 * The row pointed at "NUCLEUS logo without text.png": a square, transparent-background badge.
 * As a share card that renders as a logo floating in a black or white box, or gets cropped away
 * entirely by WhatsApp's 1.91:1 preview. The field still works: upload a proper landscape card in
 * the admin and it takes precedence over the static file again.
 *
 * Run: `PAYLOAD_SKIP_PUSH=1 pnpm run seed:share-image`
 */
const run = async () => {
  const payload = await getPayload({ config })

  const before = (await payload.findGlobal({ slug: 'seo-settings', depth: 1 })) as unknown as {
    defaultShareImage?: { url?: string } | string | null
  }
  console.log('before:', JSON.stringify(before.defaultShareImage ?? null))

  await payload.updateGlobal({ slug: 'seo-settings', data: { defaultShareImage: null } as never })

  const after = (await payload.findGlobal({ slug: 'seo-settings', depth: 1 })) as unknown as {
    defaultShareImage?: unknown
  }
  console.log('after: ', JSON.stringify(after.defaultShareImage ?? null))
  console.log('\nShare card now served from /og-default.jpg')

  process.exit(0)
}

run()
