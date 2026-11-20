import { buildIssuePdf } from '@/lib/newsletterPdf'

/** GET /newsletter/[slug]/pdf: the issue as a downloadable, branded A4 PDF (logic in lib/newsletterPdf). */

// Image conversion + PDF render takes ~5s cold; give the function headroom.
export const maxDuration = 30

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  return buildIssuePdf(req, (await params).slug)
}
