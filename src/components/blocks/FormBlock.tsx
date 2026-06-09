'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { usePathname } from 'next/navigation'
import type { FormBlockType } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { submitForm, type FormState } from '@/app/(frontend)/actions/submitForm'

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

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
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

export function FormBlock(props: FormBlockType) {
  const [state, action] = useActionState(submitForm, initial)
  const pathname = usePathname()
  const background = (props.background ?? 'offwhite') as SectionBackground
  const dark = isDark(background)
  const formType = props.formType ?? 'inquiry'
  const isTour = formType === 'tour'

  const heading = props.heading ?? (isTour ? 'Book a Tour' : formType === 'fee-request' ? 'Request the Fee Sheet' : 'Send an Enquiry')
  const submitLabel = isTour ? 'Request my visit' : formType === 'fee-request' ? 'Send me the fee sheet' : 'Send enquiry'

  return (
    <Section background={background}>
      <Container width="narrow">
        <SectionHeading heading={heading} intro={props.intro} dark={dark} />

        {state.status === 'success' ? (
          <div className="rounded-2xl border border-grass/30 bg-white p-8 text-center shadow-sm">
            <Icon name="BadgeCheck" size={40} className="mx-auto text-grass" />
            <p className="mt-4 text-lg text-ink/80">{props.successMessage || state.message}</p>
          </div>
        ) : (
          <form action={action} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
            <input type="hidden" name="formType" value={formType} />
            <input type="hidden" name="sourcePage" value={pathname} />
            {/* Honeypot — hidden from humans */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Parent / guardian name *">
                <input name="parentName" required className={inputBase} autoComplete="name" />
              </Field>
              <Field label="Email *">
                <input name="email" type="email" required className={inputBase} autoComplete="email" />
              </Field>
              <Field label="Phone">
                <input name="phone" className={inputBase} autoComplete="tel" inputMode="tel" />
              </Field>
              <Field label="Child’s age">
                <input name="childAge" className={inputBase} inputMode="numeric" placeholder="e.g. 5" />
              </Field>
              <Field label="Grade applying for">
                <input name="childGrade" className={inputBase} placeholder="e.g. KG or Grade 1" />
              </Field>

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
              <SubmitButton label={submitLabel} />
              <span className="text-sm text-ink/55">We’ll reply within one business day.</span>
            </div>
          </form>
        )}
      </Container>
    </Section>
  )
}
