import { createHmac, timingSafeEqual } from 'node:crypto'
import { revalidatePath } from 'next/cache'

/**
 * POST /revalidate clears the whole ISR cache. Used after seed scripts, which write straight to
 * the production DB from a laptop where Payload's revalidate hooks cannot reach Vercel.
 * Run it with `pnpm revalidate:prod` (scripts/revalidate-prod.mjs).
 *
 * Auth: header `x-revalidate-token: <ts>.<hmac>`, HMAC-SHA256("revalidate:" + ts, PAYLOAD_SECRET),
 * valid for 5 minutes. The secret itself never travels over the network.
 */
const MAX_AGE_MS = 5 * 60 * 1000

function valid(token: string | null): boolean {
  const secret = process.env.PAYLOAD_SECRET
  if (!token || !secret) return false
  const [ts, mac] = token.split('.')
  if (!ts || !mac || !/^\d+$/.test(ts)) return false
  const age = Date.now() - Number(ts)
  if (age < -60_000 || age > MAX_AGE_MS) return false
  const expected = createHmac('sha256', secret).update(`revalidate:${ts}`).digest('hex')
  const a = Buffer.from(mac, 'hex')
  const b = Buffer.from(expected, 'hex')
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  if (!valid(request.headers.get('x-revalidate-token'))) {
    return Response.json({ ok: false }, { status: 401 })
  }
  revalidatePath('/', 'layout')
  return Response.json({ ok: true, revalidated: '/' })
}
