'use server'

import { getPayloadClient } from '@/lib/payload'

export type FormState = { status: 'idle' | 'success' | 'error'; message: string }

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/**
 * Handle a public lead-capture submission. Routes to the right collection by formType:
 *  - tour        → tour-bookings
 *  - inquiry     → admissions-inquiries (interest: general)
 *  - fee-request → admissions-inquiries (interest: fee-request)
 * Includes a honeypot ("company"): if filled, we pretend success and drop it (bot).
 */
export async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const get = (k: string) => (formData.get(k)?.toString() ?? '').trim()

  // Honeypot — bots fill hidden fields. Silently succeed without saving.
  if (get('company')) return { status: 'success', message: 'Thank you — we will be in touch shortly.' }

  const formType = get('formType') || 'inquiry'
  const parentName = get('parentName')
  const email = get('email')
  const phone = get('phone')
  const childAge = get('childAge')
  const childGrade = get('childGrade')
  const sourcePage = get('sourcePage')

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
          notes: get('notes') || undefined,
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
          message: get('message') || undefined,
          sourcePage,
        },
      })
    }

    return { status: 'success', message: 'Thank you — we will be in touch shortly.' }
  } catch {
    return { status: 'error', message: 'Something went wrong. Please call us on 0947500992.' }
  }
}
