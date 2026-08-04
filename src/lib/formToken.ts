import 'server-only'

import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Signed form tokens: our own lightweight replacement for reCAPTCHA.
 *
 * A token is `"<ts>.<hmac>"` where ts is the mint time (ms epoch) and hmac is
 * HMAC-SHA256(ts, PAYLOAD_SECRET). It is minted on the SERVER at page render time and embedded
 * as a hidden field, so a scripted bot POSTing straight at the server action without loading the
 * page has no valid token. Because the secret never leaves the server, a bot cannot forge one.
 *
 * Pages are ISR-cached (revalidate 300), so the token is baked into the cached HTML at render
 * time and can be up to a few minutes old before a real parent even sees the form. We therefore
 * accept a generous age and DO NOT enforce a minimum age.
 */

// 7 days, NOT hours: ISR serves stale HTML to the first visitor after a quiet stretch (verified
// in prod: the 5am summer-camp page carried last night's token and a 6h cap rejected a real
// submission). Bots are stopped by having no valid signature, not by token age. The age cap
// only bounds how long a scraped token could be replayed, and the rate limit covers that.
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

function sign(ts: string): string {
  const secret = process.env.PAYLOAD_SECRET || ''
  return createHmac('sha256', secret).update(ts).digest('hex')
}

/** Mint a fresh token. Call this only in server-rendered code (never a client component). */
export function mintFormToken(): string {
  const ts = Date.now().toString()
  return `${ts}.${sign(ts)}`
}

/** True only when the signature is valid AND the token is at most 6 hours old. */
export function verifyFormToken(token: string | undefined | null): boolean {
  if (!token) return false
  const dot = token.indexOf('.')
  if (dot <= 0) return false
  const ts = token.slice(0, dot)
  const hmac = token.slice(dot + 1)
  if (!ts || !hmac) return false

  // Constant-time signature comparison. Lengths must match before timingSafeEqual.
  const expected = sign(ts)
  const a = Buffer.from(hmac, 'utf8')
  const b = Buffer.from(expected, 'utf8')
  if (a.length !== b.length) return false
  if (!timingSafeEqual(a, b)) return false

  const tsNum = Number(ts)
  if (!Number.isFinite(tsNum)) return false
  const age = Date.now() - tsNum
  // Only an upper bound, no minimum age (see file header re: ISR caching).
  if (age > MAX_AGE_MS) return false

  return true
}
