'use server'

import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { verifyFormToken } from '@/lib/formToken'

export type FormState = { status: 'idle' | 'success' | 'error'; message: string }

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/**
 * Best-effort in-memory rate limit: max submissions per IP per window. On Vercel this is
 * per-warm-instance (not global), so it throttles bursts but is NOT the primary defense —
 * the signed form token + the locked REST endpoint are. Cheap, zero-dependency, no
 * false-blocking of real users.
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
 *  - tour         → tour-bookings
 *  - summer-camp  → summer-camp-registrations
 *  - inquiry      → admissions-inquiries (interest: general)
 *  - fee-request  → admissions-inquiries (interest: fee-request)
 *  - registration → admissions-inquiries (interest: registration)
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

  // Signed form token: minted on the server at page render, embedded as a hidden field. A bot
  // POSTing straight at this action without loading the page has no valid token and is rejected.
  if (!verifyFormToken(get('formToken', 400))) {
    return {
      status: 'error',
      message:
        'Something went wrong sending your request. Please refresh the page and try again, or call us on 0981999922.',
    }
  }

  const formType = get('formType') || 'inquiry'
  const parentName = get('parentName')
  const email = get('email')
  const phone = get('phone')
  const childAge = get('childAge')
  const childGrade = get('childGrade')
  const preferredCampus = get('preferredCampus')
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
    } else if (formType === 'summer-camp') {
      // Summer camp has its own collection so staff see camp sign-ups clearly, with the
      // preferred campus as its own column (no longer folded into the message).
      await payload.create({
        collection: 'summer-camp-registrations',
        data: {
          parentName,
          email,
          phone,
          childAge,
          childGrade,
          preferredCampus: preferredCampus || undefined,
          message: get('message', 3000) || undefined,
          sourcePage,
        },
      })
    } else {
      const interest =
        formType === 'fee-request' ? 'fee-request' : formType === 'registration' ? 'registration' : 'general'

      await payload.create({
        collection: 'admissions-inquiries',
        data: {
          parentName,
          email,
          phone,
          childAge,
          childGrade,
          interest,
          message: get('message', 3000) || undefined,
          sourcePage,
        },
      })
    }

    return { status: 'success', message: 'Thank you — we will be in touch shortly.' }
  } catch {
    return { status: 'error', message: 'Something went wrong. Please call us on 0981999922.' }
  }
}
