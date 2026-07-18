import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Media } from '@/components/ui/Media'
import { Orb } from '@/components/ui/Orb'
import { Reveal } from '@/components/ui/Reveal'
import { getPayloadClient } from '@/lib/payload'
import { stockWebp } from '@/lib/img'
import type { Post } from '@/payload-types'

/**
 * "News & Perspectives" — latest published posts. Synthetic block (not yet a
 * Payload block in the schema); rendered from the Posts collection. TODO: promote
 * to a first-class Payload block once editors need to place it on arbitrary pages.
 */
export type LatestPostsProps = { blockType: 'latestPosts'; heading?: string; intro?: string; limit?: number }

export async function LatestPostsBlock({ heading = 'From the Blog', intro, limit = 3 }: LatestPostsProps) {
  // Degrade gracefully: a DB hiccup (e.g. pooler limit) renders the empty state, never a 500.
  let docs: Post[] = []
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      limit,
      depth: 1,
      // Newsletter issues have their own home at /newsletter — keep this block to blog posts.
      where: {
        _status: { equals: 'published' },
        or: [{ category: { not_equals: 'newsletter' } }, { category: { exists: false } }],
      },
    })
    docs = res.docs
  } catch (err) {
    console.error('[LatestPostsBlock] posts query failed — rendering empty state:', err)
  }

  return (
    <Section background="offwhite">
      <Container>
        <SectionHeading heading={heading} intro={intro} />
        {docs.length === 0 ? (
          <p className="text-center text-ink/55">News and stories from campus will appear here soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {docs.map((post, i) => (
              <Reveal key={post.id} variant="up" delay={i * 110} className="h-full">
              <article className="h-full overflow-hidden rounded-2xl border border-navy/10 bg-white transition-transform duration-200 motion-safe:active:scale-[0.98]">
                <Link href={`/news/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] bg-navy/5">
                    {post.heroImage && typeof post.heroImage === 'object' ? (
                      <Media resource={post.heroImage} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                    ) : post.heroImageUrl ? (
                      <Image src={stockWebp(post.heroImageUrl)} alt={post.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Orb size={56} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {post.category && (
                      <span className="font-display text-xs font-semibold uppercase tracking-wider text-ochre-600">
                        {post.category.replace('-', ' ')}
                      </span>
                    )}
                    <h3 className="mt-2 text-lg font-bold text-navy">{post.title}</h3>
                    {post.excerpt && <p className="mt-2 text-sm leading-relaxed text-ink/70">{post.excerpt}</p>}
                  </div>
                </Link>
              </article>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
