/**
 * Refresh every cached page on the live site. Run after any seed script:
 *   pnpm revalidate:prod
 * Reads PAYLOAD_SECRET from .env and signs a short-lived token for POST /revalidate.
 */
import { createHmac } from 'node:crypto'

const secret = process.env.PAYLOAD_SECRET
if (!secret) {
  console.error('Missing PAYLOAD_SECRET (run through `pnpm revalidate:prod`, which loads .env).')
  process.exit(1)
}
const base = process.env.REVALIDATE_URL || 'https://nucleusinternationalschoolsystem.com'
const ts = Date.now().toString()
const mac = createHmac('sha256', secret).update(`revalidate:${ts}`).digest('hex')

const res = await fetch(`${base}/revalidate`, {
  method: 'POST',
  headers: { 'x-revalidate-token': `${ts}.${mac}` },
})
const body = await res.text()
console.log(res.status, body)
process.exit(res.ok ? 0 : 1)
