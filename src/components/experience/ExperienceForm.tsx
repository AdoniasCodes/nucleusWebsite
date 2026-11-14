'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { StarRatingInput } from './Stars'
import { submitTestimonial } from '@/app/(frontend)/actions/submitTestimonial'
import type { FormState } from '@/app/(frontend)/actions/submitForm'
import { normalizePhone, PHONE_ERROR } from '@/lib/phone'

const YEAR_OPTIONS = [
  'Preschool',
  'KG',
  ...Array.from({ length: 8 }, (_, i) => `Year ${i + 2} (Grade ${i + 1})`),
  'Former parent',
]

const inputBase =
  'min-h-[3rem] w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-ochre focus:ring-2 focus:ring-ochre/30'

const initial: FormState = { status: 'idle', message: '' }

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-sm font-medium text-navy">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-sm text-ink/55">{hint}</span>}
    </label>
  )
}

export function ExperienceForm({ formToken, facebookUrl }: { formToken: string; facebookUrl: string }) {
  const [state, action, isPending] = useActionState(submitTestimonial, initial)
  const [modal, setModal] = useState<string | null>(null)
  const [phone, setPhone] = useState('')
  const okRef = useRef<HTMLButtonElement>(null)

  // Every error (server or client) opens a blocking modal with an OK button, the site convention.
  useEffect(() => {
    if (state.status === 'error') setModal(state.message)
  }, [state])
  useEffect(() => {
    if (modal) okRef.current?.focus()
  }, [modal])

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-grass/30 bg-white p-8 text-center shadow-sm">
        <Icon name="BadgeCheck" size={40} className="mx-auto text-grass" />
        <h2 className="mt-4 text-2xl text-navy">Thank you</h2>
        <p className="mt-3 text-lg text-ink/80">{state.message}</p>
        <p className="mt-6 text-ink/70">Would you also share it where other parents look?</p>
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-[3rem] items-center justify-center rounded-full bg-ochre px-7 py-3 font-display font-semibold text-navy transition-colors hover:bg-ochre-600"
        >
          Also leave a review on Facebook
        </a>
      </div>
    )
  }

  return (
    <>
      <form
        action={action}
        onSubmit={(e) => {
          if (phone.trim()) {
            const n = normalizePhone(phone)
            if (!n) {
              e.preventDefault()
              setModal(PHONE_ERROR)
            } else setPhone(n)
          }
        }}
        className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8"
      >
        <input type="hidden" name="formToken" value={formToken} />
        {/* Honeypot: hidden from humans */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Your name *">
            <input name="authorName" required maxLength={100} autoComplete="name" className={inputBase} />
          </Field>
          <Field label="Your child’s year">
            <select name="childYear" defaultValue="" className={inputBase}>
              <option value="">Choose one</option>
              {YEAR_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-5">
          <StarRatingInput name="rating" />
        </div>

        <div className="mt-5">
          <Field label="Your experience *" hint="A few sentences is perfect (20 to 1,500 characters).">
            <textarea name="quote" required minLength={20} maxLength={1500} rows={6} className={inputBase} />
          </Field>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Email (optional)" hint="Private. Only the school sees it.">
            <input name="email" type="email" autoComplete="email" className={inputBase} />
          </Field>
          <Field label="Phone (optional)" hint="Private. Only the school sees it.">
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+2519 ..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputBase}
            />
          </Field>
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3">
          <input type="checkbox" name="consent" required className="mt-1 h-6 w-6 shrink-0 accent-[#11024d]" />
          <span className="text-base text-ink/80">You may show my first name and quote on the Nucleus website. *</span>
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="mt-7 inline-flex min-h-[3rem] w-full items-center justify-center rounded-full bg-ochre px-7 py-3 font-display font-semibold text-navy transition-colors hover:bg-ochre-600 disabled:opacity-60 sm:w-auto"
        >
          {isPending ? 'Sending…' : 'Share my experience'}
        </button>
      </form>

      {modal && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="exp-error-title"
          aria-describedby="exp-error-msg"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(9,4,28,0.62)] p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-7 text-ink shadow-xl">
            <h2 id="exp-error-title" className="text-xl text-navy">
              Please check this
            </h2>
            <p id="exp-error-msg" className="mt-3 text-base text-ink/80">
              {modal}
            </p>
            <button
              ref={okRef}
              type="button"
              onClick={() => setModal(null)}
              className="mt-6 inline-flex min-h-[3rem] items-center justify-center rounded-full bg-navy px-8 py-3 font-display font-semibold text-white hover:bg-navy/90"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}
