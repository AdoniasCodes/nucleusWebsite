'use server'

import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { verifyRecaptcha } from '@/lib/recaptcha'

export type FormState = { status: 'idle' | 'success' | 'error'; message: string }

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/**
 * Best-effort in-memory rate limit: max submissions per IP per window. On Vercel this is
 * per-warm-instance (not global), so it throttles bursts but is NOT the primary defense —
 * reCAPTCHA + the locked REST endpoint are. Cheap, zero-dependency, no false-blocking of real users.
 */
const RATE_MAX = 5
const RATE_WINDOW_MS = 10 * 60 * 1000
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  if (!ip) return false
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  // Opportunistic cleanup so the map can't grow unbounded.
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k)
  return recent.length > RATE_MAX
}

/**
 * Handle a public lead-capture submission. Routes to the right collection by formType:
 *  - tour        → tour-bookings
 *  - inquiry     → admissions-inquiries (interest: general)
 *  - fee-request → admissions-inquiries (interest: fee-request)
 * Includes a honeypot ("company"): if filled, we pretend success and drop it (bot).
 */
export async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  // Clamp every field to a sane max so an abusive payload can't bloat the DB. Short fields → 200
  // chars; free-text (message/notes) and sourcePage get a higher cap below. Truncates rather than
  // rejects so a long-but-genuine parent message is never lost.
  const get = (k: string, max = 200) => (formData.get(k)?.toString() ?? '').trim().slice(0, max)

  // Honeypot — bots fill hidden fields. Silently succeed without saving.
  if (get('company')) return { status: 'success', message: 'Thank you — we will be in touch shortly.' }

  // Per-IP rate limit. Pretend success so spammers get no signal they were throttled.
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
  if (rateLimited(ip)) return { status: 'success', message: 'Thank you — we will be in touch shortly.' }

  // Invisible reCAPTCHA v3 check. Skips automatically when no secret is configured (local dev).
  const captcha = await verifyRecaptcha(get('recaptchaToken'), 'lead_form', ip)
  if (!captcha.ok) {
    return { status: 'error', message: 'We couldn’t verify your submission. Please try again, or call us on 0947500992.' }
  }

  const formType = get('formType') || 'inquiry'
  const parentName = get('parentName')
  const email = get('email')
  const phone = get('phone')
  const childAge = get('childAge')
  const childGrade = get('childGrade')
  const sourcePage = get('sourcePage', 300)

  if (!parentName || !email) return { status: 'error', message: 'Please add your name and email.' }
  if (!isEmail(email)) return { status: 'error', message: 'Please enter a valid email address.' }

  try {
    const payload = await getPayloadClient()

    if (formType === 'tour') {
      await payload.create({
        collection: 'tour-bookings',
        data: {
          parentName,
          email,
          phone,
          childAge,
          childGrade,
          preferredDate: get('preferredDate') || undefined,
          preferredTime: (get('preferredTime') as 'morning' | 'afternoon') || undefined,
          notes: get('notes', 3000) || undefined,
          sourcePage,
        },
      })
    } else {
      await payload.create({
        collection: 'admissions-inquiries',
        data: {
          parentName,
          email,
          phone,
          childAge,
          childGrade,
          interest: formType === 'fee-request' ? 'fee-request' : 'general',
          message: get('message', 3000) || undefined,
          sourcePage,
        },
      })
    }

    return { status: 'success', message: 'Thank you — we will be in touch shortly.' }
  } catch {
    return { status: 'error', message: 'Something went wrong. Please call us on 0947500992.' }
  }
}
