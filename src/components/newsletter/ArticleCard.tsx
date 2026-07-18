import Link from 'next/link'
import { SmartImage, heroUrlOf, formatDate } from './shared'
import type { Post } from '@/payload-types'

/**
 * Image-first article card for the newsletter index mosaic. `scale` controls
 * how loud the card is: the image always leads, text sits on a navy scrim.
 */
export function ArticleCard({ post, scale = 'standard' }: { post: Post; scale?: 'large' | 'standard' | 'compact' }) {
  const media = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null
  const url = media ? null : heroUrlOf(post)
  const playlist = post.playlist && typeof post.playlist === 'object' ? post.playlist : null

  const aspect = scale === 'large' ? 'aspect-[4/3] sm:aspect-[16/10]' : scale === 'compact' ? 'aspect-[4/3]' : 'aspect-[4/3]'
  const title = scale === 'large' ? 'text-2xl sm:text-3xl' : scale === 'compact' ? 'text-base' : 'text-lg sm:text-xl'

  return (
    <Link
      href={`/newsletter/${post.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-navy shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      <div className={`relative ${aspect}`}>
        <SmartImage
          media={media}
          url={url}
          alt={post.title}
          sizes={scale === 'large' ? '(max-width:1024px) 100vw, 60vw' : '(max-width:640px) 100vw, 33vw'}
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        {playlist && (
          <p className="font-display text-xs font-semibold text-ochre">
            {playlist.title}
            {post.playlistPart ? ` · Part ${post.playlistPart}` : ''}
          </p>
        )}
        <h3 className={`mt-1.5 font-bold text-white ${title}`}>{post.title}</h3>
        {scale !== 'compact' && post.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-pale/85">{post.excerpt}</p>
        )}
        <p className="mt-3 font-display text-xs text-pale/70">{formatDate(post.publishedAt || post.createdAt)}</p>
      </div>
    </Link>
  )
}
