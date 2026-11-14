'use server'

import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { verifyFormToken } from '@/lib/formToken'
import { normalizePhone, PHONE_ERROR, cleanText } from '@/lib/phone'
import { bothCampusesText } from '@/lib/campusPhones'
import type { FormState } from './submitForm'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/** Best-effort per-IP throttle (per warm instance), same approach as submitForm. */
const RATE_MAX = 3
const RATE_WINDOW_MS = 10 * 60 * 1000
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  if (!ip) return false
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k)
  return recent.length > RATE_MAX
}

const THANKS = 'Thank you. Our team reads every message before it appears on the site.'

/**
 * Public parent testimonial submission. Saved as `pending` with source `website`; staff approve
 * it in the admin before it shows anywhere. Same defences as submitForm: honeypot, per-IP rate
 * limit, signed form token, sanitised and clamped text.
 */
export async function submitTestimonial(_prev: FormState, formData: FormData): Promise<FormState> {
  const get = (k: string, max = 200) => cleanText(formData.get(k)?.toString() ?? '').slice(0, max)

  if (get('company')) return { status: 'success', message: THANKS }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
  if (rateLimited(ip)) return { status: 'success', message: THANKS }

  if (!verifyFormToken(get('formToken', 400))) {
    return {
      status: 'error',
      message: 'Something went wrong sending your message. Please refresh the page and try again, or call us: ' + bothCampusesText() + '.',
    }
  }

  const authorName = get('authorName', 100)
  const quote = cleanText(formData.get('quote')?.toString() ?? '', { multiline: true })
  const consent = formData.get('consent') === 'on'
  const email = get('email').toLowerCase()
  const phoneRaw = get('phone')
  const childYear = get('childYear', 60)
  const ratingNum = Number(get('rating', 2))
  const rating = Number.isInteger(ratingNum) && ratingNum >= 1 && ratingNum <= 5 ? ratingNum : undefined

  if (!authorName) return { status: 'error', message: 'Please add your name.' }
  if (quote.length < 20) return { status: 'error', message: 'Please write at least a couple of sentences (20 characters or more).' }
  if (quote.length > 1500) return { status: 'error', message: 'Please keep your experience under 1,500 characters.' }
  if (!consent) {
    return { status: 'error', message: 'Please tick the box to let us show your first name and words on the website.' }
  }
  if (email && !isEmail(email)) return { status: 'error', message: 'Please enter a valid email address.' }
  let phone: string | undefined
  if (phoneRaw) {
    const n = normalizePhone(phoneRaw)
    if (!n) return { status: 'error', message: PHONE_ERROR }
    phone = n
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'testimonials',
      overrideAccess: true,
      data: {
        authorName,
        quote,
        relationship: childYear && childYear !== 'Former parent' ? `Parent of ${childYear} student` : 'Parent',
        childYear: childYear || undefined,
        rating,
        email: email || undefined,
        phone,
        consent: true,
        status: 'pending',
        source: 'website',
        featured: false,
      },
    })
    return { status: 'success', message: THANKS }
  } catch {
    return { status: 'error', message: `Something went wrong. Please call us: ${bothCampusesText()}.` }
  }
}
