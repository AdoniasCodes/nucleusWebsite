import Image from 'next/image'
import type { Media as MediaType } from '@/payload-types'
import { relativeMediaUrl } from '@/lib/mediaUrl'

type Resource = MediaType | number | string | null | undefined

/**
 * Render a Payload media upload via next/image (perf: responsive, lazy by default).
 * Returns null when unpopulated so callers can fall back to a brand motif.
 */
export function Media({
  resource,
  className = '',
  sizes,
  priority = false,
  fill = false,
}: {
  resource: Resource
  className?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
}) {
  if (!resource || typeof resource !== 'object') return null
  const { url: rawUrl, alt, width, height } = resource
  const url = relativeMediaUrl(rawUrl)
  if (!url) return null

  if (fill) {
    return (
      <Image
        src={url}
        alt={alt ?? ''}
        fill
        className={className}
        sizes={sizes ?? '100vw'}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={url}
      alt={alt ?? ''}
      width={width ?? 1200}
      height={height ?? 800}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  )
}
