import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { SmartImage, heroUrlOf, formatDate } from '@/components/newsletter/shared'
import { getPayloadClient } from '@/lib/payload'
import { buildBreadcrumbSchema } from '@/lib/seo'
import { SERVER_URL } from '@/lib/serverUrl'
import type { Playlist, Post } from '@/payload-types'

export const revalidate = 300

async function getSeries(slug: string): Promise<{ playlist: Playlist; parts: Post[] } | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'playlists',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  const playlist = docs[0]
  if (!playlist) return null
  const parts = await payload.find({
    collection: 'posts',
    where: { playlist: { equals: playlist.id }, _status: { equals: 'published' } },
    sort: 'playlistPart',
    limit: 100,
    depth: 0,
  })
  return { playlist, parts: parts.docs }
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getSeries(slug).catch(() => null)
  if (!data) return {}
  return {
    title: `${data.playlist.title}: Newsletter Series`,
    description:
      data.playlist.description ||
      `All parts of the ${data.playlist.title} series from The Nucleus Spark, the Nucleus International Schools newsletter.`,
    alternates: { canonical: `/newsletter/series/${slug}` },
    openGraph: { title: data.playlist.title, url: `/newsletter/series/${slug}` },
  }
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params
  const data = await getSeries(slug).catch(() => null)
  if (!data) notFound()
  const { playlist, parts } = data

  const cover = playlist.coverImage && typeof playlist.coverImage === 'object' ? playlist.coverImage : null
  const updated = parts.length > 0 ? parts[parts.length - 1].publishedAt || parts[parts.length - 1].createdAt : null

  return (
    <div className="bg-offwhite">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Newsletter', path: '/newsletter' },
            { name: playlist.title, path: `/newsletter/series/${slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWorkSeries',
            name: playlist.title,
            description: playlist.description || undefined,
            url: `${SERVER_URL}/newsletter/series/${slug}`,
            publisher: { '@id': `${SERVER_URL}/#organization` },
            hasPart: parts.map((p, i) => ({
              '@type': 'NewsArticle',
              position: p.playlistPart ?? i + 1,
              headline: p.title,
              url: `${SERVER_URL}/newsletter/${p.slug}`,
              datePublished: p.publishedAt || p.createdAt,
            })),
          },
        ]}
      />

      {/* Series hero */}
      <header className="relative bg-navy">
        <div className="relative min-h-[360px] sm:min-h-[440px]">
          <SmartImage
            media={cover}
            url={cover ? null : playlist.coverImageUrl}
            alt={playlist.title}
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/20" />
          <div className="absolute inset-x-0 bottom-0">
            <Container width="wide" className="pb-10 sm:pb-12">
              <Link
                href="/newsletter"
                className="font-display text-sm font-medium text-pale/90 transition-colors hover:text-white"
              >
                ← The Nucleus Spark
              </Link>
              <p className="mt-5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-ochre">
                Newsletter series
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-5xl">{playlist.title}</h1>
              {playlist.description && (
                <p className="mt-4 max-w-2xl text-pale/90 sm:text-lg">{playlist.description}</p>
              )}
              <p className="mt-5 font-display text-sm text-pale/75">
                {parts.length} {parts.length === 1 ? 'part' : 'parts'}
                {updated ? ` · Updated ${formatDate(updated)}` : ''}
              </p>
            </Container>
          </div>
        </div>
      </header>

      {/* Ordered parts */}
      <Container width="wide" className="py-12 sm:py-16">
        {parts.length === 0 ? (
          <p className="py-10 text-center text-ink/60">The first part of this series is coming soon.</p>
        ) : (
          <ol className="space-y-6">
            {parts.map((post, i) => {
              const media = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null
              const url = media ? null : heroUrlOf(post)
              return (
                <li key={post.id}>
                  <Reveal variant="up" delay={(i % 3) * 80}>
                    <Link
                      href={`/newsletter/${post.slug}`}
                      className="group grid items-center gap-5 rounded-3xl border border-navy/10 bg-white p-5 transition-shadow hover:shadow-lg sm:grid-cols-[auto_220px_1fr] sm:gap-8 sm:p-6"
                    >
                      <span className="hidden font-display text-5xl font-bold text-pale sm:block" aria-hidden>
                        {String(post.playlistPart ?? i + 1).padStart(2, '0')}
                      </span>
                      <span className="relative block aspect-[16/10] overflow-hidden rounded-2xl bg-navy/5 sm:aspect-[4/3]">
                        <SmartImage
                          media={media}
                          url={url}
                          alt={post.title}
                          sizes="(max-width:640px) 100vw, 220px"
                          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.05]"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="font-display text-xs font-semibold uppercase tracking-wider text-ochre-600">
                          Part {post.playlistPart ?? i + 1}
                        </span>
                        <span className="mt-1.5 block text-xl font-bold text-navy group-hover:text-navy-500 sm:text-2xl">
                          {post.title}
                        </span>
                        {post.excerpt && (
                          <span className="mt-2 line-clamp-2 block text-sm text-ink/70 sm:text-base">
                            {post.excerpt}
                          </span>
                        )}
                        <span className="mt-3 block font-display text-xs text-ink/55">
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        )}
      </Container>
    </div>
  )
}
