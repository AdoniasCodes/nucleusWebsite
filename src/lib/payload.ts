import 'server-only'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { SiteSetting, SeoSetting, Page } from '@/payload-types'

/** Single Payload instance reused across the request lifecycle. */
export const getPayloadClient = async () => getPayload({ config: await config })

export const getSiteSettings = async (): Promise<SiteSetting> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
}

export const getSEOSettings = async (): Promise<SeoSetting> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'seo-settings', depth: 1 })
}

/** Fetch a published page by slug, or null. */
export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}
