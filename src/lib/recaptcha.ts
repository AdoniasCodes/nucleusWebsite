import 'server-only'

/**
 * Server-side Google reCAPTCHA v3 verification.
 *
 * v3 is invisible: the browser runs grecaptcha.execute() and sends a short-lived token with the
 * form. Here we exchange that token with Google for a score (0.0 = almost certainly a bot,
 * 1.0 = almost certainly human) plus the action name the token was minted for.
 *
 * Graceful fallback (mirrors the S3/SMTP pattern in payload.config.ts): when RECAPTCHA_SECRET_KEY
 * is absent (e.g. local dev), verification is SKIPPED and returns ok — so the app still works
 * without credentials. In production the key is set, so real verification runs.
 */

const SECRET = process.env.RECAPTCHA_SECRET_KEY
const MIN_SCORE = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5)
const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'

export type RecaptchaResult = { ok: boolean; reason?: string; score?: number }

export async function verifyRecaptcha(
  token: string | undefined | null,
  expectedAction: string,
  ip?: string,
): Promise<RecaptchaResult> {
  // No secret configured → skip (local dev / not-yet-provisioned). Don't block real users.
  if (!SECRET) return { ok: true, reason: 'skipped-no-secret' }

  if (!token) return { ok: false, reason: 'missing-token' }

  try {
    const body = new URLSearchParams({ secret: SECRET, response: token })
    if (ip) body.set('remoteip', ip)

    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      // Don't let a slow Google call hang the form forever.
      signal: AbortSignal.timeout(8000),
    })
    const data = (await res.json()) as {
      success?: boolean
      score?: number
      action?: string
      'error-codes'?: string[]
    }

    if (!data.success) return { ok: false, reason: (data['error-codes'] || ['verify-failed']).join(',') }
    // Make sure the token was minted for THIS action (stops token replay from another page).
    if (expectedAction && data.action && data.action !== expectedAction)
      return { ok: false, reason: `action-mismatch:${data.action}`, score: data.score }
    if (typeof data.score === 'number' && data.score < MIN_SCORE)
      return { ok: false, reason: 'low-score', score: data.score }

    return { ok: true, score: data.score }
  } catch (err) {
    // Network/timeout talking to Google. Fail OPEN so a Google outage never blocks real parents
    // from booking a tour — the honeypot + locked REST endpoint + rate limit still apply.
    return { ok: true, reason: `verify-error-failopen:${(err as Error)?.message ?? err}` }
  }
}
