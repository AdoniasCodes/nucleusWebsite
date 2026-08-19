'use client'

import { useActionState, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { normalizePhone, PHONE_ERROR } from '@/lib/phone'
import { HEARD_ABOUT_OPTIONS, HEARD_ABOUT_LABEL } from '@/lib/heardAbout'
import type { FormBlockType } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { submitForm, type FormState } from '@/app/(frontend)/actions/submitForm'
import { trackLead } from '@/lib/pixels'

/** Grades served: Preschool through Grade 8. Used by the "Grade applying for" dropdown. */
const GRADE_OPTIONS = [
  'Preschool',
  'KG',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Not sure yet',
]

const inputBase =
  'w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-ink outline-none transition focus:border-ochre focus:ring-2 focus:ring-ochre/30'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-sm font-medium text-navy">{label}</span>
      {children}
    </label>
  )
}

function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-ochre px-7 py-3 font-display font-semibold text-navy transition-colors hover:bg-ochre-600 disabled:opacity-60"
    >
      {pending ? 'Sending…' : label}
    </button>
  )
}

const initial: FormState = { status: 'idle', message: '' }

export function FormBlock(props: FormBlockType & { anchor?: string; formToken?: string }) {
  const [state, action, isPending] = useActionState(submitForm, initial)
  const pathname = usePathname()

  // Phone is validated client-side before the action runs. Staff call every
  // lead, so a mistyped number is a lost lead. Normalized in place on blur.
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const checkPhone = (): boolean => {
    if (!phone.trim()) {
      setPhoneError('Please add a phone number so we can call you back.')
      return false
    }
    const normalized = normalizePhone(phone)
    if (!normalized) {
      setPhoneError(PHONE_ERROR)
      return false
    }
    setPhone(normalized)
    setPhoneError('')
    return true
  }

  const background = (props.background ?? 'offwhite') as SectionBackground
  const dark = isDark(background)
  const formType = props.formType ?? 'inquiry'
  const isTour = formType === 'tour'
  const isRegistration = formType === 'registration'
  const isSummerCamp = formType === 'summer-camp'

  // Fire the marketing-pixel conversion event once the submission succeeds.
  useEffect(() => {
    if (state.status === 'success') trackLead(formType)
  }, [state.status, formType])

  // No fee-sheet wording anywhere: the gated fee-request form is retired, so even a legacy CMS
  // row with formType 'fee-request' renders as a plain enquiry.
  const heading =
    props.heading ??
    (isTour
      ? 'Visit Now'
      : isRegistration
        ? 'Start Registration'
        : isSummerCamp
          ? 'Reserve your child’s spot'
          : 'Send an Enquiry')
  const submitLabel = isTour
    ? 'Request my visit'
    : isRegistration
      ? 'Submit registration'
      : isSummerCamp
        ? 'Reserve my child’s spot'
        : 'Send enquiry'

  return (
    <Section background={background} id={props.anchor}>
      <Container width="narrow">
        <SectionHeading heading={heading} intro={props.intro} dark={dark} />

        {state.status === 'success' ? (
          <div className="rounded-2xl border border-grass/30 bg-white p-8 text-center shadow-sm">
            <Icon name="BadgeCheck" size={40} className="mx-auto text-grass" />
            <p className="mt-4 text-lg text-ink/80">{props.successMessage || state.message}</p>
          </div>
        ) : (
          <form
            action={action}
            onSubmit={(e) => {
              if (!checkPhone()) e.preventDefault()
            }}
            className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8"
          >
            <input type="hidden" name="formType" value={formType} />
            <input type="hidden" name="sourcePage" value={pathname} />
            {/* Server-minted signed token: proves this POST came from a rendered page, not a bot. */}
            <input type="hidden" name="formToken" value={props.formToken ?? ''} />
            {/* Honeypot: hidden from humans */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Parent / guardian name *">
                <input name="parentName" required className={inputBase} autoComplete="name" />
              </Field>
              <Field label="Email *">
                <input name="email" type="email" required className={inputBase} autoComplete="email" />
              </Field>
              <Field label="Phone *">
                <input
                  name="phone"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (phoneError) setPhoneError('')
                  }}
                  onBlur={() => {
                    if (phone.trim()) checkPhone()
                  }}
                  aria-invalid={phoneError ? true : undefined}
                  aria-describedby={phoneError ? 'phone-error' : undefined}
                  className={`${inputBase} ${phoneError ? '!border-coral focus:!ring-coral/30' : ''}`}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="e.g. 0912 345 678"
                  maxLength={20}
                />
                {phoneError && (
                  <span id="phone-error" role="alert" className="mt-1.5 block text-sm font-medium text-coral">
                    {phoneError}
                  </span>
                )}
              </Field>
              <Field label="Child’s age">
                <input name="childAge" className={inputBase} inputMode="numeric" placeholder="e.g. 5" />
              </Field>
              {isSummerCamp ? (
                <Field label="Preferred campus">
                  <select name="preferredCampus" className={inputBase} defaultValue="">
                    <option value="">No preference</option>
                    <option value="Mekanisa">Mekanisa Campus</option>
                    <option value="Vatican">Vatican Campus</option>
                  </select>
                </Field>
              ) : (
                <Field label="Grade applying for">
                  <select name="childGrade" className={inputBase} defaultValue="">
                    <option value="">Select a grade…</option>
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {isTour && (
                <>
                  <Field label="Preferred date">
                    <input name="preferredDate" type="date" className={inputBase} />
                  </Field>
                  <Field label="Preferred time">
                    <select name="preferredTime" className={inputBase} defaultValue="">
                      <option value="">No preference</option>
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                    </select>
                  </Field>
                  {/* Marketing attribution: the school's paid channels are the main lead source,
                      so knowing which one sent a parent decides where the next budget goes. */}
                  <Field label={HEARD_ABOUT_LABEL}>
                    <select name="heardAbout" className={`${inputBase} cursor-pointer`} defaultValue="">
                      <option value="">Select one…</option>
                      {HEARD_ABOUT_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                </>
              )}
            </div>

            <div className="mt-4">
              <Field label={isTour ? 'Anything we should know?' : 'Your message'}>
                <textarea name={isTour ? 'notes' : 'message'} rows={4} className={inputBase} />
              </Field>
            </div>

            {state.status === 'error' && (
              <p className="mt-4 text-sm font-medium text-coral">{state.message}</p>
            )}

            <div className="mt-6 flex items-center gap-4">
              <SubmitButton label={submitLabel} pending={isPending} />
              <span className="text-sm text-ink/55">We’ll reply within one business day.</span>
            </div>
          </form>
        )}
      </Container>
    </Section>
  )
}
