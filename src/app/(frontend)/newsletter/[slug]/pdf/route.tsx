import sharp from 'sharp'
import { renderToBuffer } from '@react-pdf/renderer'
import { getPayloadClient } from '@/lib/payload'
import { heroUrlOf, formatDate, sectionImageSrc } from '@/components/newsletter/shared'
import {
  NewsletterPdf,
  registerPdfFonts,
  type PdfBlock,
  type PdfData,
  type PdfImage,
} from '@/components/newsletter/pdf/NewsletterPdf'

/**
 * GET /newsletter/[slug]/pdf: the issue as a downloadable, branded A4 PDF.
 * Rendered on demand from the same CMS data as the web article, so admin edits
 * are always reflected. Cached at the CDN for an hour.
 */

// Image conversion + PDF render takes ~5s cold; give the function headroom.
export const maxDuration = 30

/** Flatten a lexical richText tree into paragraph/list-item runs for the PDF. */
function lexicalToBlocks(data: unknown): PdfBlock[] {
  const out: PdfBlock[] = []
  const textOf = (node: unknown): string => {
    const n = node as { text?: string; children?: unknown[] }
    if (typeof n?.text === 'string') return n.text
    return (n?.children ?? []).map(textOf).join('')
  }
  const root = (data as { root?: { children?: unknown[] } } | null | undefined)?.root
  for (const node of root?.children ?? []) {
    const n = node as { type?: string; children?: unknown[] }
    if (n.type === 'list') {
      for (const item of n.children ?? []) {
        const text = textOf(item).trim()
        if (text) out.push({ type: 'li', text })
      }
    } else {
      const text = textOf(n).trim()
      if (text) out.push({ type: 'p', text })
    }
  }
  return out
}

/** Fetch the white masthead logo as a PNG data URI (JPEG would flatten its transparency onto black). */
async function logoDataUri(origin: string): Promise<string | undefined> {
  try {
    const res = await fetch(new URL('/images/newsletter/pdf-logo-white.png', origin).toString(), { cache: 'no-store' })
    if (!res.ok) return undefined
    return `data:image/png;base64,${Buffer.from(await res.arrayBuffer()).toString('base64')}`
  } catch {
    return undefined
  }
}

/** Fetch any site image (webp/png/jpg, relative or absolute) → JPEG data URI (react-pdf has no webp support). */
async function toJpegDataUri(url: string, origin: string, width: number): Promise<string | null> {
  try {
    const abs = new URL(url, origin).toString()
    const res = await fetch(abs, { cache: 'no-store' })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const jpeg = await sharp(buf).resize({ width, withoutEnlargement: true }).jpeg({ quality: 72 }).toBuffer()
    return `data:image/jpeg;base64,${jpeg.toString('base64')}`
  } catch {
    return null
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const origin = new URL(req.url).origin

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, category: { equals: 'newsletter' }, _status: { equals: 'published' } },
    depth: 1,
    limit: 1,
  })
  const post = docs[0]
  if (!post) return new Response('Not found', { status: 404 })

  const playlist = typeof post.playlist === 'object' ? post.playlist : null
  const heroUrl = heroUrlOf(post)

  // Convert every image up front, in parallel (webp → jpeg for react-pdf).
  const hero: PdfImage | undefined = heroUrl
    ? await toJpegDataUri(heroUrl, origin, 1000).then((src) => (src ? { src } : undefined))
    : undefined

  const sections = await Promise.all(
    (post.sections ?? []).map(async (section) => {
      const gallery = (section.style ?? 'auto') === 'gallery' || (section.images?.length ?? 0) >= 3
      const images = (
        await Promise.all(
          (section.images ?? []).map(async (img) => {
            const { media, url } = sectionImageSrc(img)
            const raw = (media && typeof media === 'object' ? media.url : null) || url
            if (!raw) return null
            const src = await toJpegDataUri(raw, origin, gallery ? 480 : 640)
            return src ? { src, caption: img.caption || undefined, portrait: img.portrait || undefined } : null
          }),
        )
      ).filter(Boolean) as PdfImage[]
      return {
        heading: section.heading || undefined,
        style: (section.style ?? 'auto') as 'auto' | 'gallery' | 'highlight',
        blocks: lexicalToBlocks(section.body),
        images,
      }
    }),
  )

  // Articles without magazine sections (plain posts) fall back to the content field.
  const effectiveSections =
    sections.length > 0
      ? sections
      : [{ heading: undefined, style: 'auto' as const, blocks: lexicalToBlocks(post.content), images: [] }]

  const data: PdfData = {
    title: post.title,
    excerpt: post.excerpt || undefined,
    dateLabel: formatDate(post.publishedAt || post.createdAt),
    seriesLabel: playlist
      ? `${playlist.title}${post.playlistPart ? ` · Part ${post.playlistPart}` : ''}`
      : undefined,
    hero,
    sections: effectiveSections,
    siteHost: new URL(origin).host,
    logoSrc: await logoDataUri(origin),
  }

  registerPdfFonts(origin)
  const buffer = await renderToBuffer(<NewsletterPdf data={data} />)

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="nucleus-spark-${slug}.pdf"`,
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
