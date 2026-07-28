import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/seo/JsonLd'
import { NewsletterSections } from '@/components/newsletter/NewsletterSections'
import { SmartImage, heroUrlOf, formatDate, readingMinutes } from '@/components/newsletter/shared'
import { getPayloadClient } from '@/lib/payload'
import { buildBreadcrumbSchema } from '@/lib/seo'
import { SERVER_URL } from '@/lib/serverUrl'
import type { Playlist, Post } from '@/payload-types'

export const revalidate = 300

async function getArticle(slug: string): Promise<Post | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      category: { equals: 'newsletter' },
      _status: { equals: 'published' },
    },
    depth: 1,
    limit: 1,
  })
  return docs[0] ?? null
}

async function getContext(post: Post) {
  const payload = await getPayloadClient()
  const playlistId = typeof post.playlist === 'object' ? post.playlist?.id : post.playlist
  const [recentRes, partsRes] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: {
        category: { equals: 'newsletter' },
        _status: { equals: 'published' },
        id: { not_equals: post.id },
      },
      sort: '-publishedAt',
      limit: 4,
      depth: 0,
    }),
    playlistId
      ? payload.find({
          collection: 'posts',
          where: {
            playlist: { equals: playlistId },
            _status: { equals: 'published' },
          },
          sort: 'playlistPart',
          limit: 60,
          depth: 0,
        })
      : Promise.resolve({ docs: [] as Post[] }),
  ])
  return { recent: recentRes.docs, parts: partsRes.docs }
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getArticle(slug).catch(() => null)
  if (!post) return {}
  const title = post.meta?.title || post.title
  const description = post.meta?.description || post.excerpt || undefined
  const heroUrl = heroUrlOf(post)
  return {
    title: title ? { absolute: `${title} | Nucleus International Schools` } : undefined,
    description,
    alternates: { canonical: `/newsletter/${slug}` },
    openGraph: {
      type: 'article',
      title: title ?? undefined,
      description,
      url: `/newsletter/${slug}`,
      images: heroUrl ? [{ url: new URL(heroUrl, SERVER_URL).toString() }] : undefined,
    },
  }
}

export default async function NewsletterArticlePage({ params }: Props) {
  const { slug } = await params
  const post = await getArticle(slug).catch(() => null)
  if (!post) notFound()

  let recent: Post[] = []
  let parts: Post[] = []
  try {
    ;({ recent, parts } = await getContext(post))
  } catch (err) {
    console.error('[newsletter article] context query failed:', err)
  }

  const playlist = (typeof post.playlist === 'object' ? post.playlist : null) as Playlist | null
  const heroMedia = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null
  const heroUrl = heroMedia ? null : heroUrlOf(post)
  const date = formatDate(post.publishedAt || post.createdAt)
  const minutes = readingMinutes(post)
  const sections = post.sections ?? []

  const idx = parts.findIndex((p) => p.id === post.id)
  const prev = idx > 0 ? parts[idx - 1] : null
  const next = idx >= 0 && idx < parts.length - 1 ? parts[idx + 1] : null

  return (
    <article className="bg-offwhite">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Newsletter', path: '/newsletter' },
            ...(playlist ? [{ name: playlist.title, path: `/newsletter/series/${playlist.slug}` }] : []),
            { name: post.title, path: `/newsletter/${slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: post.title,
            description: post.excerpt || undefined,
            articleSection: 'Newsletter',
            datePublished: post.publishedAt || post.createdAt,
            dateModified: post.updatedAt,
            image: heroUrlOf(post) ? new URL(heroUrlOf(post) as string, SERVER_URL).toString() : undefined,
            author: { '@type': 'Organization', name: 'Nucleus International Schools' },
            publisher: { '@id': `${SERVER_URL}/#organization` },
            mainEntityOfPage: `${SERVER_URL}/newsletter/${slug}`,
            ...(playlist
              ? {
                  isPartOf: {
                    '@type': 'CreativeWorkSeries',
                    name: playlist.title,
                    url: `${SERVER_URL}/newsletter/series/${playlist.slug}`,
                  },
                }
              : {}),
          },
        ]}
      />

      {/* Full-bleed photographic hero: the image IS the opening spread. */}
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
            <Link
              href="/newsletter"
              className="font-display text-sm font-medium text-pale/90 transition-colors hover:text-white"
            >
              ← Inside Nucleus
            </Link>
            {playlist && (
              <p className="mt-5">
                <Link
                  href={`/newsletter/series/${playlist.slug}`}
                  className="rounded-full bg-ochre px-4 py-1.5 font-display text-xs font-semibold text-navy transition-colors hover:bg-ochre-600"
                >
                  {playlist.title}
                  {post.playlistPart ? ` · Part ${post.playlistPart}` : ''}
                </Link>
              </p>
            )}
            <h1 className="mt-4 max-w-4xl text-3xl font-bold text-white sm:text-5xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <p className="font-display text-sm text-pale/80">
                {date} · {minutes} min read
              </p>
              <a
                href={`/newsletter/${slug}/pdf`}
                className="rounded-full border border-pale/40 px-4 py-1.5 font-display text-xs font-semibold text-pale transition-colors hover:bg-white/10"
              >
                Download PDF ↓
              </a>
            </div>
          </Container>
          </div>
        </div>
      </header>

      <Container width="wide" className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Magazine body */}
          <div className="min-w-0 lg:col-span-8">
            {post.excerpt && (
              <p className="mb-12 border-b border-navy/10 pb-10 font-body text-xl leading-relaxed text-ink/85 sm:text-2xl">
                {post.excerpt}
              </p>
            )}
            {sections.length > 0 ? (
              <NewsletterSections sections={sections} />
            ) : (
              <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-p:text-ink/80 prose-a:text-ochre-600 prose-li:text-ink/80">
                {post.content && <RichText data={post.content} />}
              </div>
            )}

            {/* Series pagination */}
            {(prev || next) && (
              <nav aria-label="Series navigation" className="mt-14 grid gap-4 border-t border-navy/10 pt-8 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/newsletter/${prev.slug}`}
                    className="group rounded-2xl border border-navy/10 bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    <p className="font-display text-xs font-semibold text-ink/55">← Previous in series</p>
                    <p className="mt-1.5 font-display font-bold text-navy group-hover:text-navy-500">{prev.title}</p>
                  </Link>
                ) : (
                  <span aria-hidden className="hidden sm:block" />
                )}
                {next && (
                  <Link
                    href={`/newsletter/${next.slug}`}
                    className="group rounded-2xl border border-navy/10 bg-white p-5 text-right transition-shadow hover:shadow-md"
                  >
                    <p className="font-display text-xs font-semibold text-ink/55">Next in series →</p>
                    <p className="mt-1.5 font-display font-bold text-navy group-hover:text-navy-500">{next.title}</p>
                  </Link>
                )}
              </nav>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-24">
              {playlist && parts.length > 0 && (
                <section aria-label="In this series" className="rounded-3xl border border-navy/10 bg-white p-6">
                  <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-ink/60">
                    In this series
                  </h2>
                  <p className="mt-2 font-display text-lg font-bold text-navy">
                    <Link href={`/newsletter/series/${playlist.slug}`} className="hover:text-navy-500">
                      {playlist.title}
                    </Link>
                  </p>
                  <ol className="mt-4 space-y-1">
                    {parts.map((part) => {
                      const current = part.id === post.id
                      return (
                        <li key={part.id}>
                          <Link
                            href={`/newsletter/${part.slug}`}
                            aria-current={current ? 'page' : undefined}
                            className={`flex items-baseline gap-3 rounded-xl px-3 py-2 transition-colors ${
                              current ? 'bg-mist font-semibold text-navy' : 'text-ink/75 hover:bg-offwhite'
                            }`}
                          >
                            <span className="font-display text-sm font-bold text-ochre-600">
                              {part.playlistPart ?? '·'}
                            </span>
                            <span className="font-display text-sm">{part.title}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ol>
                </section>
              )}

              {recent.length > 0 && (
                <section aria-label="Recent articles" className="rounded-3xl border border-navy/10 bg-white p-6">
                  <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-ink/60">
                    Recent articles
                  </h2>
                  <ul className="mt-4 divide-y divide-navy/5">
                    {recent.map((r) => {
                      const thumbMedia = r.heroImage && typeof r.heroImage === 'object' ? r.heroImage : null
                      const thumbUrl = thumbMedia ? null : heroUrlOf(r)
                      return (
                        <li key={r.id}>
                          <Link href={`/newsletter/${r.slug}`} className="group flex gap-4 py-3">
                            <span className="relative block h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-navy/5">
                              <SmartImage
                                media={thumbMedia}
                                url={thumbUrl}
                                alt={r.title}
                                sizes="80px"
                                className="object-cover"
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="line-clamp-2 font-display text-sm font-semibold text-navy group-hover:text-navy-500">
                                {r.title}
                              </span>
                              <span className="mt-1 block font-display text-xs text-ink/55">
                                {formatDate(r.publishedAt || r.createdAt)}
                              </span>
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )}

              <section aria-label="Register" className="orb-glow rounded-3xl p-6 text-pale">
                <h2 className="font-display text-xl font-bold text-white">Be part of next week&apos;s story</h2>
                <p className="mt-2 text-sm text-pale/85">
                  Registration for Nucleus programs is open all summer.
                </p>
                <ButtonLink href="/register" appearance="primary" className="mt-5 w-full">
                  Register Now
                </ButtonLink>
                <a
                  href={`/newsletter/${slug}/pdf`}
                  className="mt-3 block rounded-full border border-pale/40 px-5 py-2.5 text-center font-display text-sm font-semibold text-pale transition-colors hover:bg-white/10"
                >
                  Download this issue (PDF)
                </a>
              </section>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  )
}
