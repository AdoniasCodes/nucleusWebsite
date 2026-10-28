import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlockRenderer, type RenderableBlock } from '@/components/blocks/BlockRenderer'
import { defaultPages } from '@/components/blocks/defaultPages'
import { JsonLd } from '@/components/seo/JsonLd'
import { getPageBySlug } from '@/lib/payload'
import { buildBreadcrumbSchema } from '@/lib/seo'
import { shareImages } from '@/lib/shareImage'

export const revalidate = 300

// Pre-render the known code-defined pages at build time.
export function generateStaticParams() {
  return Object.keys(defaultPages).map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  // No .catch: a DB error must fail the render so ISR keeps the last good copy, rather than
  // caching the code default (or a 404) in place of an editor's CMS page.
  const cms = await getPageBySlug(slug)
  const fallback = defaultPages[slug]
  if (!cms && !fallback) return {}

  const title = cms?.meta?.title || fallback?.seoTitle || cms?.title || fallback?.title
  const description = cms?.meta?.description || fallback?.description
  return {
    // absolute → don't re-append the brand template; these titles already include it.
    title: title ? { absolute: title } : undefined,
    description,
    alternates: { canonical: `/${slug}` },
    // Next merges metadata shallowly, so this openGraph replaces the root one entirely and has
    // to carry its own images or the page ships with a blank share preview.
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      url: `/${slug}`,
      images: shareImages(),
    },
    twitter: { card: 'summary_large_image', images: shareImages() },
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const cms = await getPageBySlug(slug)
  const fallback = defaultPages[slug]
  if (!cms && !fallback) notFound()

  const blocks = (cms?.layout as RenderableBlock[] | undefined) ?? fallback.layout
  const label = cms?.title ?? fallback.title

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: label, path: `/${slug}` },
        ])}
      />
      <BlockRenderer blocks={blocks} />
    </>
  )
}
