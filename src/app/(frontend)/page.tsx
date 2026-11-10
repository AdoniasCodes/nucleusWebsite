import type { Metadata } from 'next'
import { BlockRenderer, type RenderableBlock } from '@/components/blocks/BlockRenderer'
import { defaultHomeLayout } from '@/components/blocks/defaultHome'
import { JsonLd } from '@/components/seo/JsonLd'
import { getPageBySlug, getSiteSettings, getSEOSettings } from '@/lib/payload'
import { buildOrganizationSchema } from '@/lib/seo'

// Content is editor-driven: cached for a day, refreshed on demand when the admin saves (hooks/revalidateSite.ts).
export const revalidate = 86400

export const metadata: Metadata = { alternates: { canonical: '/' } }

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
