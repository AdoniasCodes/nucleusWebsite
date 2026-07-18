import Image from 'next/image'
import { Media } from '@/components/ui/Media'
import { stockWebp } from '@/lib/img'
import type { Media as MediaDoc, Post } from '@/payload-types'

/** Shared helpers for the newsletter surfaces (/newsletter, article + series pages). */

export type SectionImage = NonNullable<NonNullable<Post['sections']>[number]['images']>[number]

export function heroUrlOf(post: Post): string | null {
  const hero = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null
  return hero?.url || stockWebp(post.heroImageUrl) || null
}

export function formatDate(iso?: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Rough plain-text extraction from a lexical richText value (for reading time). */
export function lexicalText(data: unknown): string {
  const out: string[] = []
  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    const n = node as { text?: string; children?: unknown[] }
    if (typeof n.text === 'string') out.push(n.text)
    if (Array.isArray(n.children)) n.children.forEach(walk)
  }
  walk((data as { root?: unknown } | null | undefined)?.root)
  return out.join(' ')
}

export function readingMinutes(post: Post): number {
  let words = lexicalText(post.content).split(/\s+/).filter(Boolean).length
  for (const s of post.sections ?? []) {
    words += lexicalText(s.body).split(/\s+/).filter(Boolean).length
  }
  return Math.max(2, Math.round(words / 200))
}

/**
 * Renders a CMS media upload or a static /images/... path with next/image.
 * The single image primitive for every newsletter surface.
 */
export function SmartImage({
  media,
  url,
  alt,
  sizes,
  priority = false,
  className = '',
}: {
  media?: MediaDoc | number | null
  url?: string | null
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}) {
  if (media && typeof media === 'object') {
    return <Media resource={media} fill className={className} sizes={sizes} priority={priority} />
  }
  if (url) {
    return <Image src={url} alt={alt} fill className={className} sizes={sizes} priority={priority} />
  }
  return <div className={`bg-navy/10 ${className}`} aria-hidden />
}

export function sectionImageSrc(img: SectionImage): { media?: MediaDoc | null; url?: string | null } {
  return {
    media: img.image && typeof img.image === 'object' ? img.image : null,
    url: img.imageUrl || null,
  }
}
