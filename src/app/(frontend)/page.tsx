import { BlockRenderer, type RenderableBlock } from '@/components/blocks/BlockRenderer'
import { defaultHomeLayout } from '@/components/blocks/defaultHome'
import { JsonLd } from '@/components/seo/JsonLd'
import { getPageBySlug, getSiteSettings, getSEOSettings } from '@/lib/payload'
import { buildOrganizationSchema } from '@/lib/seo'

// Content is editor-driven; revalidate periodically (ISR) for fast, cacheable delivery.
export const revalidate = 300

export default async function HomePage() {
  const [home, settings, seo] = await Promise.all([
    getPageBySlug('home').catch(() => null),
    getSiteSettings().catch(() => null),
    getSEOSettings().catch(() => null),
  ])

  // Use the CMS "home" page if an editor has created one; otherwise the code default.
  const blocks = (home?.layout as RenderableBlock[] | undefined) ?? defaultHomeLayout

  return (
    <>
      <JsonLd data={buildOrganizationSchema(settings, seo)} />
      <BlockRenderer blocks={blocks} />
    </>
  )
}
