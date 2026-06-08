import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Container } from '@/components/ui/Container'
import { Media } from '@/components/ui/Media'
import { JsonLd } from '@/components/seo/JsonLd'
import { getPayloadClient } from '@/lib/payload'
import { buildBreadcrumbSchema } from '@/lib/seo'
import type { Post } from '@/payload-types'

export const revalidate = 300

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

async function getPost(slug: string): Promise<Post | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    depth: 1,
    limit: 1,
  })
  return docs[0] ?? null
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug).catch(() => null)
  if (!post) return {}
  const title = post.meta?.title || post.title
  const description = post.meta?.description || post.excerpt || undefined
  return {
    title: title ? { absolute: `${title} | Nucleus International School` } : undefined,
    description,
    alternates: { canonical: `/news/${slug}` },
    openGraph: { type: 'article', title: title ?? undefined, description, url: `/news/${slug}` },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug).catch(() => null)
  if (!post) notFound()

  const hero = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null
  const heroUrl = hero?.url || post.heroImageUrl || null

  return (
    <article>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'News', path: '/news' },
            { name: post.title, path: `/news/${slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt || undefined,
            datePublished: post.publishedAt || post.createdAt,
            dateModified: post.updatedAt,
            image: heroUrl ? new URL(heroUrl, SERVER_URL).toString() : undefined,
            author: { '@type': 'Organization', name: 'Nucleus International School' },
            publisher: { '@id': `${SERVER_URL}/#organization` },
            mainEntityOfPage: `${SERVER_URL}/news/${slug}`,
          },
        ]}
      />

      {/* Hero */}
      <header className="orb-glow text-pale">
        <Container width="narrow" className="py-20 sm:py-24">
          <Link href="/news" className="font-display text-sm text-ochre hover:underline">
            ← News &amp; Perspectives
          </Link>
          {post.category && (
            <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.16em] text-ochre">
              {post.category.replace('-', ' ')}
            </p>
          )}
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{post.title}</h1>
          {post.excerpt && <p className="mt-5 text-lg text-pale/85">{post.excerpt}</p>}
        </Container>
      </header>

      {heroUrl && (
        <div className="bg-white">
          <Container width="narrow" className="-mt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
              {hero ? (
                <Media resource={hero} fill className="object-cover" sizes="(max-width:768px) 100vw, 768px" priority />
              ) : (
                <Image src={heroUrl} alt={post.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 768px" priority />
              )}
            </div>
          </Container>
        </div>
      )}

      {/* Body */}
      <div className="bg-white">
        <Container width="narrow" className="py-14">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-p:text-ink/80 prose-a:text-ochre-600 prose-li:text-ink/80">
            {post.content && <RichText data={post.content} />}
          </div>
        </Container>
      </div>
    </article>
  )
}
