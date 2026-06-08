import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** Auto-generated sitemap of canonical URLs: static routes + published pages + posts. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    { url: SERVER_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SERVER_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SERVER_URL}/academics`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SERVER_URL}/admissions`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SERVER_URL}/campus-life`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SERVER_URL}/news`, changeFrequency: 'weekly', priority: 0.6 },
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
