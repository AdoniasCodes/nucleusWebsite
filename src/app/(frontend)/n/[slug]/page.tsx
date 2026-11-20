import type { Metadata } from 'next'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { NewsletterSections } from '@/components/newsletter/NewsletterSections'
import { SmartImage, heroUrlOf, formatDate } from '@/components/newsletter/shared'
import { getPayloadClient } from '@/lib/payload'
import { PRIVATE_PREFIX } from '@/collections/Posts'
import type { Post } from '@/payload-types'

// Hidden newsletters: unlisted drafts, shown only to people who have the link. Never cached
// (no ISR writes, edits show at once). Not in the sitemap, lists, llms.txt or search; noindex.
export const dynamic = 'force-dynamic'

const getIssue = cache(async (slug: string): Promise<Post | null> => {
  if (!slug.startsWith(PRIVATE_PREFIX)) return null
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, category: { equals: 'newsletter' } },
    draft: true,
    depth: 1,
    limit: 1,
  })
  return docs[0] ?? null
})

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getIssue(slug)
  return {
    title: { absolute: post ? `${post.title} | Nucleus International Schools` : 'Not found' },
    robots: { index: false, follow: false, nocache: true },
  }
}

export default async function PrivateNewsletterPage({ params }: Props) {
  const { slug } = await params
  const post = await getIssue(slug)
  if (!post) notFound()

  const heroMedia = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null
  const heroUrl = heroMedia ? null : heroUrlOf(post)

  return (
    <article className="bg-offwhite">
      <p className="bg-ochre px-4 py-2 text-center font-display text-xs font-semibold text-navy">
        Private preview for our school community. Please do not share this link.
      </p>
      <header className="relative bg-navy">
        <div className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[560px]">
          <SmartImage
            media={heroMedia}
            url={heroUrl}
            alt={post.title}
            sizes="100vw"
            priority
            className="object-cover object-[50%_32%]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/15" />
          <div className="absolute inset-x-0 bottom-0">
            <Container width="wide" className="pb-10 sm:pb-14">
              <h1 className="max-w-4xl text-3xl font-bold text-white sm:text-5xl">{post.title}</h1>
              <p className="mt-4 font-display text-sm text-pale/80">{formatDate(post.publishedAt || post.createdAt)}</p>
            </Container>
          </div>
        </div>
      </header>

      <Container width="wide" className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {post.excerpt && (
            <p className="mb-12 border-b border-navy/10 pb-10 font-body text-xl leading-relaxed text-ink/85 sm:text-2xl">
              {post.excerpt}
            </p>
          )}
          <NewsletterSections sections={post.sections ?? []} />
        </div>
      </Container>
    </article>
  )
}
