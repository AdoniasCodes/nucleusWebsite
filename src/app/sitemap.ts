import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { defaultPages } from '@/components/blocks/defaultPages'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** Auto-generated sitemap of canonical URLs: home + all code/CMS pages + published posts. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    { url: SERVER_URL, changeFrequency: 'weekly', priority: 1 },
    // Every code-defined page (about, academics, program pages, admissions, contact, news…).
    ...Object.keys(defaultPages).map((slug) => ({
      url: `${SERVER_URL}/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: slug === 'admissions' ? 0.9 : 0.7,
    })),
  ]

  try {
    const payload = await getPayloadClient()
    const [pages, posts] = await Promise.all([
      payload.find({ collection: 'pages', limit: 500, depth: 0, where: { _status: { equals: 'published' } } }),
      payload.find({ collection: 'posts', limit: 500, depth: 0, where: { _status: { equals: 'published' } } }),
    ])

    for (const p of pages.docs) {
      if (!p.slug || p.slug === 'home') continue
      base.push({ url: `${SERVER_URL}/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'monthly', priority: 0.7 })
    }
    for (const post of posts.docs) {
      if (!post.slug) continue
      base.push({ url: `${SERVER_URL}/news/${post.slug}`, lastModified: post.updatedAt, changeFrequency: 'monthly', priority: 0.5 })
    }
  } catch {
    // DB unavailable at build/runtime → still return the static routes.
  }

  return base
}
