import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { LatestPostsBlock } from '@/components/blocks/LatestPostsBlock'
import { ArticleCard } from '@/components/newsletter/ArticleCard'
import { SeriesRail } from '@/components/newsletter/SeriesRail'
import { SmartImage, heroUrlOf, formatDate } from '@/components/newsletter/shared'
import { getPayloadClient } from '@/lib/payload'
import { buildBreadcrumbSchema } from '@/lib/seo'
import { SERVER_URL } from '@/lib/serverUrl'
import type { Playlist, Post } from '@/payload-types'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Newsletter: Inside Nucleus',
  description:
    'Inside Nucleus is the newsletter of Nucleus International Schools in Addis Ababa: weekly updates, school news, summer camp recaps, monthly highlights and practical information for parents.',
  alternates: { canonical: '/newsletter' },
  openGraph: {
    title: 'Inside Nucleus: the Nucleus International Schools newsletter',
    description:
      'Weekly updates, school news, summer camp recaps and monthly highlights from Nucleus International Schools, Addis Ababa.',
    url: '/newsletter',
  },
}

async function getData() {
  const payload = await getPayloadClient()
  const [postsRes, playlistsRes] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: { category: { equals: 'newsletter' }, _status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 25,
      depth: 1,
    }),
    payload.find({ collection: 'playlists', limit: 20, depth: 1 }),
  ])
  const posts = postsRes.docs
  const series = playlistsRes.docs.map((playlist: Playlist) => ({
    playlist,
    partCount: posts.filter(
      (p) => (typeof p.playlist === 'object' ? p.playlist?.id : p.playlist) === playlist.id,
    ).length,
  }))
  return { posts, series }
}

/** Mosaic scale pattern: a repeating 5-card rhythm of large / standard / compact. */
function scaleFor(i: number): 'large' | 'standard' | 'compact' {
  const step = i % 5
  if (step === 0) return 'large'
  if (step === 1 || step === 2) return 'standard'
  return 'compact'
}
function spanFor(i: number): string {
  const step = i % 5
  if (step === 0) return 'sm:col-span-2 lg:col-span-4'
  if (step === 1 || step === 2) return 'lg:col-span-2'
  return 'lg:col-span-2'
}

export default async function NewsletterPage() {
  let posts: Post[] = []
  let series: { playlist: Playlist; partCount: number }[] = []
  try {
    ;({ posts, series } = await getData())
  } catch (err) {
    console.error('[newsletter] query failed, rendering empty state:', err)
  }

  const [featured, ...rest] = posts

  return (
    <div className="bg-offwhite">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Newsletter', path: '/newsletter' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': `${SERVER_URL}/newsletter#blog`,
            name: 'Inside Nucleus',
            description:
              'The newsletter of Nucleus International Schools: weekly updates, school news, summer camp recaps and monthly highlights for parents and the public.',
            url: `${SERVER_URL}/newsletter`,
            publisher: { '@id': `${SERVER_URL}/#organization` },
            blogPost: posts.slice(0, 10).map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              url: `${SERVER_URL}/newsletter/${p.slug}`,
              datePublished: p.publishedAt || p.createdAt,
            })),
          },
        ]}
      />

      {/* Masthead: a proper magazine nameplate, ruled like print. */}
      <header className="border-b border-navy/10 bg-white">
        <Container className="pb-10 pt-12 text-center sm:pb-12 sm:pt-16">
          <p className="font-display text-sm font-medium text-ink/60">Nucleus International Schools presents</p>
          <h1 className="mx-auto mt-3 max-w-4xl font-display text-[clamp(2.4rem,6.5vw,4.6rem)] font-bold uppercase leading-none tracking-[0.06em] text-navy">
            Inside Nucleus
          </h1>
          <div className="woven-rule mx-auto mt-6 h-1 w-40" aria-hidden />
          <p className="mx-auto mt-5 max-w-2xl text-ink/75">
            Weekly updates, school news, camp recaps and monthly highlights, written for our parents
            and for everyone curious about life at Nucleus.
          </p>
        </Container>
      </header>

      {/* Featured cover: the latest issue, full-width and image-led. */}
      {featured ? (
        <section aria-label="Latest issue">
          <Container width="wide" className="pt-10 sm:pt-14">
            <Reveal variant="fade">
              <Link
                href={`/newsletter/${featured.slug}`}
                className="group relative block overflow-hidden rounded-3xl bg-navy shadow-lg"
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]">
                  <SmartImage
                    media={featured.heroImage && typeof featured.heroImage === 'object' ? featured.heroImage : null}
                    url={featured.heroImage && typeof featured.heroImage === 'object' ? null : heroUrlOf(featured)}
                    alt={featured.title}
                    sizes="(max-width:1280px) 100vw, 1280px"
                    priority
                    className="object-cover object-[50%_32%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                  <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-navy via-navy/40 to-navy/5 sm:block" />
                </div>
                {/* Text: in-flow on navy for phones, image overlay from sm up. */}
                <div className="p-6 sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-10">
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-ochre">
                    Latest issue
                    {typeof featured.playlist === 'object' && featured.playlist
                      ? ` · ${featured.playlist.title}${featured.playlistPart ? `, part ${featured.playlistPart}` : ''}`
                      : ''}
                  </p>
                  <h2 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="mt-3 max-w-2xl text-pale/90 sm:text-lg">{featured.excerpt}</p>
                  )}
                  <p className="mt-5 inline-flex items-center gap-3 font-display text-sm font-semibold text-white">
                    <span className="rounded-full bg-ochre px-5 py-2 text-navy transition-colors group-hover:bg-ochre-600">
                      Read this issue
                    </span>
                    <span className="text-pale/75">{formatDate(featured.publishedAt || featured.createdAt)}</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      ) : (
        <Container className="py-20 text-center text-ink/60">
          <p>The first issue of Inside Nucleus is on its way. Check back soon.</p>
        </Container>
      )}

      {/* Mosaic of further issues, at varying scales. */}
      {rest.length > 0 && (
        <section aria-label="More issues">
          <Container width="wide" className="pt-8 sm:pt-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {rest.map((post, i) => (
                <Reveal key={post.id} variant="up" delay={(i % 3) * 90} className={spanFor(i)}>
                  <ArticleCard post={post} scale={scaleFor(i)} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Series: curated runs of related issues. Swipeable rail on touch. */}
      {series.length > 0 && (
        <section aria-label="Newsletter series">
          <Container width="wide" className="pt-14 sm:pt-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-navy sm:text-3xl">Series</h2>
                <p className="mt-1.5 text-ink/70">Follow a story as it unfolds, week by week.</p>
              </div>
            </div>
            <div className="mt-6">
              <SeriesRail series={series} />
            </div>
          </Container>
        </section>
      )}

      {/* What this newsletter is (crawlable intro for search + AI answers). */}
      <section aria-label="About the newsletter">
        <Container className="pt-14 sm:pt-16">
          <div className="rounded-3xl bg-mist px-6 py-8 sm:px-10 sm:py-10">
            <h2 className="text-xl font-bold text-navy sm:text-2xl">What you will find here</h2>
            <p className="mt-3 max-w-3xl text-ink/75">
              Inside Nucleus shares weekly updates from our classrooms and campuses in Addis
              Ababa, recaps of programs like Nucleus Summer Camp, monthly school highlights,
              teacher takeaways and practical information for parents. New issues are published
              every week during term and camp season.
            </p>
          </div>
        </Container>
      </section>

      {/* Cross-links into the blog keep readers (and crawlers) moving. */}
      <LatestPostsBlock blockType="latestPosts" heading="More from Nucleus" limit={3} />

      {/* CTA band — same photo + two-part tint treatment as the ctaBand block on the other
          pages (light overall wash, soft scrim behind the copy only). */}
      <section aria-label="Register" className="relative overflow-hidden text-pale">
        <div
          className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
          style={{ backgroundImage: 'url(/images/stock/cta-newsletter.webp)' }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-navy/25" aria-hidden />
        <div
          className="absolute inset-0 [background:radial-gradient(72%_68%_at_50%_50%,rgba(26,29,74,0.84)_0%,rgba(26,29,74,0.68)_40%,rgba(26,29,74,0.16)_74%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative">
          <Container className="py-16 text-center text-pale sm:py-20">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Want your child in the story?</h2>
            <p className="mx-auto mt-3 max-w-xl text-pale">
              Registration for Nucleus is open. Come see the campuses the newsletter writes about.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/register" appearance="primary">
                Register Now
              </ButtonLink>
              <ButtonLink href="/contact" appearance="outline">
                Book a Tour
              </ButtonLink>
            </div>
          </Container>
        </div>
      </section>
    </div>
  )
}
