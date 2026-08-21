import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Container } from '@/components/ui/Container'
import { Media } from '@/components/ui/Media'
import { JsonLd } from '@/components/seo/JsonLd'
import { NewsletterSections } from '@/components/newsletter/NewsletterSections'
import { POST_FAQS } from '@/lib/postFaqs'
import { getPayloadClient } from '@/lib/payload'
import { buildBreadcrumbSchema } from '@/lib/seo'
import { stockWebp } from '@/lib/img'
import { SERVER_URL } from '@/lib/serverUrl'
import { shareImages } from '@/lib/shareImage'
import type { Post } from '@/payload-types'

export const revalidate = 300

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
  // The hero, absolute-ised (scrapers do not resolve relative URLs reliably), else the default card.
  const metaHero = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage.url : null
  const rawShare = metaHero || stockWebp(post.heroImageUrl) || null
  const shareUrl = rawShare ? new URL(rawShare, SERVER_URL).toString() : null
  return {
    title: title ? { absolute: `${title} | Nucleus International Schools` } : undefined,
    description,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      type: 'article',
      title: title ?? undefined,
      description,
      url: `/news/${slug}`,
      images: shareImages(shareUrl, title ?? undefined),
    },
    twitter: { card: 'summary_large_image', images: shareImages(shareUrl, title ?? undefined) },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug).catch(() => null)
  if (!post) notFound()
  // Newsletter articles canonically live under /newsletter, never render them here.
  if (post.category === 'newsletter') redirect(`/newsletter/${slug}`)

  const hero = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null
  const heroUrl = hero?.url || stockWebp(post.heroImageUrl) || null

  return (
    <article>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/news' },
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
            author: { '@type': 'Organization', name: 'Nucleus International Schools' },
            publisher: { '@id': `${SERVER_URL}/#organization` },
            mainEntityOfPage: `${SERVER_URL}/news/${slug}`,
          },
          // Head-term posts carry an FAQ block; the same Q&As are rendered as visible copy
          // in the post body, which Google requires before it will show the rich result.
          ...(POST_FAQS[slug]
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: POST_FAQS[slug].map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                  })),
                },
              ]
            : []),
        ]}
      />

      {/* Hero */}
      <header className="orb-glow text-pale">
        <Container width="narrow" className="py-20 sm:py-24">
          <Link href="/news" className="font-display text-sm text-ochre hover:underline">
            ← The Nucleus Blog
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

      {/* Body. Photo-led posts author their copy as `sections` (same shape the newsletter
          uses) so real campus photos sit inside the article with alt text and captions;
          text-only posts still render the plain richText `content`. */}
      <div className="bg-white">
        {post.sections && post.sections.length > 0 ? (
          <Container width="narrow" className="py-14">
            <NewsletterSections sections={post.sections} />
            {post.content && (
              <div className="mt-12 border-t border-navy/10 pt-8 prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-p:text-ink/80 prose-a:text-ochre-600 prose-li:text-ink/80">
                <RichText data={post.content} />
              </div>
            )}
          </Container>
        ) : (
          <Container width="narrow" className="py-14">
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-p:text-ink/80 prose-a:text-ochre-600 prose-li:text-ink/80">
              {post.content && <RichText data={post.content} />}
            </div>
          </Container>
        )}
      </div>
    </article>
  )
}
