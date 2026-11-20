import { buildIssuePdf } from '@/lib/newsletterPdf'
import { PRIVATE_PREFIX } from '@/collections/Posts'

/** GET /n/[slug]/pdf: PDF of a hidden newsletter (link-only, never cached or indexed). */
export const maxDuration = 30

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!slug.startsWith(PRIVATE_PREFIX)) return new Response('Not found', { status: 404 })
  return buildIssuePdf(req, slug, { privateIssue: true })
}
