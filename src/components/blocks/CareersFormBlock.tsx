'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { normalizePhone, PHONE_ERROR } from '@/lib/phone'
import { JOB_POSITION_GROUPS, OTHER_POSITION } from '@/lib/jobPositions'
import {
  submitCareerApplication,
  type CareerState,
} from '@/app/(frontend)/actions/submitCareerApplication'

/** Mirrors the ceiling enforced in the server action, so a too-big file is caught before upload. */
const MAX_CV_BYTES = 5 * 1024 * 1024
const CV_ACCEPT = '.pdf,.doc,.docx'
const CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const inputBase =
  'w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-ink outline-none transition focus:border-ochre focus:ring-2 focus:ring-ochre/30'

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block font-display text-sm font-medium text-navy">
        {label} {required && <span className="text-coral">*</span>}
      </label>
      {children}
      {hint && !error && <span className="mt-1.5 block text-sm text-ink/55">{hint}</span>}
      {error && (
        <span role="alert" className="mt-1.5 block text-sm font-medium text-coral">
          {error}
        </span>
      )}
    </div>
  )
}

const initial: CareerState = { status: 'idle', message: '' }

export type CareersFormProps = {
  blockType: 'careersForm'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  anchor?: string
  formToken?: string
}

/**
 * The application form on /careers: who you are, the role you want, and your CV.
 *
 * The role dropdown covers the posts an international school actually hires for, grouped so the
 * list stays scannable on a phone. Picking "Another position" reveals a text field instead of
 * forcing an applicant into an approximate match, which is what a speculative applicant needs.
 */
export function CareersFormBlock({
  background = 'offwhite',
  eyebrow,
  heading,
  intro,
  anchor,
  formToken,
}: CareersFormProps) {
  const [state, action, isPending] = useActionState(submitCareerApplication, initial)
  const pathname = usePathname()

  const [position, setPosition] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [cvName, setCvName] = useState('')
  const [cvError, setCvError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (state.status === 'error') errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [state.status])

  const checkPhone = (): boolean => {
    if (!phone.trim()) {
      setPhoneError('Please add a phone number so we can call you.')
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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setCvName('')
      setCvError('')
      return
    }
    setCvName(file.name)
    if (!CV_TYPES.includes(file.type)) {
      setCvError('Your CV must be a PDF or a Word document (.pdf, .doc or .docx).')
      return
    }
    if (file.size > MAX_CV_BYTES) {
      setCvError('That file is larger than 5 MB. Please send a smaller one.')
      return
    }
    setCvError('')
  }

  const checkCv = (): boolean => {
    const file = fileRef.current?.files?.[0]
    if (!file) {
      setCvError('Please attach your CV.')
      return false
    }
    return !cvError
  }

  if (state.status === 'success') {
    return (
      <Section background={background} id={anchor}>
        <Container width="narrow">
          <div className="rounded-2xl border border-grass/30 bg-white p-8 text-center shadow-sm">
            <Icon name="BadgeCheck" size={40} className="mx-auto text-grass" />
            <p className="mt-4 text-lg text-ink/80">{state.message}</p>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section background={background} id={anchor}>
      <Container width="narrow">
        <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />

        <form
          action={action}
          onSubmit={(e) => {
            // Both checks run: a single `&&` would hide the CV error whenever the phone is wrong.
            const phoneOk = checkPhone()
            const cvOk = checkCv()
            if (!phoneOk || !cvOk) e.preventDefault()
          }}
          noValidate
          className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8"
        >
          <input type="hidden" name="sourcePage" value={pathname} />
          <input type="hidden" name="formToken" value={formToken ?? ''} />
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor="fullName" required>
              <input
                id="fullName"
                name="fullName"
                required
                maxLength={200}
                autoComplete="name"
                className={inputBase}
              />
            </Field>

            <Field label="Email" htmlFor="email" required>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                className={inputBase}
              />
            </Field>

            <Field label="Phone" htmlFor="phone" required error={phoneError}>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={50}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (phoneError) setPhoneError('')
                }}
                onBlur={checkPhone}
                aria-invalid={phoneError ? true : undefined}
                className={`${inputBase} ${phoneError ? 'border-coral focus:border-coral focus:ring-coral/30' : ''}`}
              />
            </Field>

            <Field label="Years of experience" htmlFor="yearsExperience">
              <input
                id="yearsExperience"
                name="yearsExperience"
                inputMode="numeric"
                maxLength={20}
                placeholder="e.g. 6"
                className={inputBase}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field
                label="Position applying for"
                htmlFor="position"
                required
                hint="Not on the list? Choose “Another position” and type it in."
              >
                <select
                  id="position"
                  name="position"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className={`${inputBase} cursor-pointer`}
                >
                  <option value="">Choose a position…</option>
                  {JOB_POSITION_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </Field>
            </div>

            {position === OTHER_POSITION && (
              <div className="sm:col-span-2">
                <Field label="Which position?" htmlFor="otherPosition" required>
                  <input
                    id="otherPosition"
                    name="otherPosition"
                    required
                    maxLength={150}
                    placeholder="Type the role you are applying for"
                    className={inputBase}
                  />
                </Field>
              </div>
            )}

            <div className="sm:col-span-2">
              <Field
                label="Your CV"
                htmlFor="cv"
                required
                error={cvError}
                hint="PDF or Word document, up to 5 MB."
              >
                <input
                  ref={fileRef}
                  id="cv"
                  name="cv"
                  type="file"
                  accept={CV_ACCEPT}
                  required
                  onChange={onFileChange}
                  aria-invalid={cvError ? true : undefined}
                  className="block w-full cursor-pointer rounded-xl border border-navy/15 bg-white p-2.5 text-ink file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-navy file:px-4 file:py-2.5 file:font-display file:text-sm file:font-semibold file:text-white hover:file:bg-navy/90"
                />
              </Field>
              {cvName && !cvError && (
                <p className="mt-2 flex items-center gap-2 text-sm text-ink/70">
                  <Icon name="Check" size={16} className="text-grass" />
                  {cvName}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <Field
                label="Cover note"
                htmlFor="message"
                required
                hint="Tell us why this role, and what you would bring. A short paragraph is plenty."
              >
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  minLength={30}
                  maxLength={3000}
                  className={`${inputBase} resize-y`}
                />
              </Field>
            </div>
          </div>

          {state.status === 'error' && (
            <p ref={errorRef} role="alert" className="mt-6 rounded-xl bg-coral/10 p-4 text-coral">
              {state.message}
            </p>
          )}

          <div className="mt-7">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-ochre px-7 py-3 font-display font-semibold text-navy transition-colors hover:bg-ochre-600 disabled:opacity-60"
            >
              {isPending ? 'Sending…' : 'Send my application'}
            </button>
            <p className="mt-3 text-sm text-ink/55">
              Your CV goes straight to our HR team and is never published on the site.
            </p>
          </div>
        </form>
      </Container>
    </Section>
  )
}
