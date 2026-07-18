import Link from 'next/link'
import { SmartImage } from './shared'
import type { Playlist } from '@/payload-types'

/**
 * Horizontal, finger-swipeable rail of newsletter series. Native overflow-x
 * scroll with snap points, so touch swiping works with zero JS (workspace rule:
 * every slider must swipe on mobile).
 */
export function SeriesRail({ series }: { series: { playlist: Playlist; partCount: number }[] }) {
  if (series.length === 0) return null
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 [scrollbar-width:thin] snap-x snap-mandatory">
      <div className="flex w-max gap-5">
        {series.map(({ playlist, partCount }) => {
          const media = playlist.coverImage && typeof playlist.coverImage === 'object' ? playlist.coverImage : null
          return (
            <Link
              key={playlist.id}
              href={`/newsletter/series/${playlist.slug}`}
              className="group w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-navy/10 bg-white transition-shadow hover:shadow-lg sm:w-[330px]"
            >
              <div className="relative aspect-[16/10] bg-navy/5">
                <SmartImage
                  media={media}
                  url={media ? null : playlist.coverImageUrl}
                  alt={playlist.title}
                  sizes="330px"
                  className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 font-display text-xs font-semibold text-pale">
                  {partCount} {partCount === 1 ? 'part' : 'parts'}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-navy">{playlist.title}</h3>
                {playlist.description && (
                  <p className="mt-1.5 line-clamp-2 text-sm text-ink/70">{playlist.description}</p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
