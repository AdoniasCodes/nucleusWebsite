'use client'

import { useId } from 'react'
import { COUNTRIES, countryByIso } from '@/lib/countries'

/**
 * Phone input with a country dial-code selector. Defaults to Ethiopia (+251) because that is
 * what almost every applicant needs; the dropdown covers the rest of the world for diaspora
 * families without making them think about formats.
 *
 * The pair is rendered as ONE labelled group (`role="group"` + `aria-labelledby`) so screen
 * readers announce "Mobile — Ethiopia +251, phone number" instead of two orphaned controls.
 *
 * Value shape is `{ iso, number }` and the parent composes the E.164 string on submit — keeping
 * the raw digits in state means the field never fights the user mid-typing.
 */
export type PhoneValue = { iso: string; number: string }

export function PhoneField({
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  autoComplete = 'tel',
  hint,
}: {
  label: string
  value: PhoneValue
  onChange: (v: PhoneValue) => void
  onBlur?: () => void
  error?: string
  required?: boolean
  autoComplete?: string
  hint?: string
}) {
  const id = useId()
  const labelId = `${id}-label`
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const country = countryByIso(value.iso)
  const isEthiopia = country.iso === 'ET'

  return (
    <div role="group" aria-labelledby={labelId}>
      <span id={labelId} className="mb-1.5 block font-display text-sm font-semibold text-navy">
        {label} {required && <span className="text-coral">*</span>}
      </span>

      <div
        className={`flex overflow-hidden rounded-xl border bg-white transition focus-within:ring-2 ${
          error ? 'border-coral focus-within:border-coral focus-within:ring-coral/30' : 'border-navy/20 focus-within:border-ochre focus-within:ring-ochre/30'
        }`}
      >
        {/* The dial code leads each option so the (width-capped) closed select always shows the
            number that matters; the country name follows it and is fully readable when open. */}
        <select
          aria-label={`${label} — country code`}
          value={value.iso}
          onChange={(e) => onChange({ ...value, iso: e.target.value })}
          className="min-h-[3rem] w-[7.5rem] shrink-0 cursor-pointer border-r border-navy/15 bg-mist/60 py-3 pl-3 pr-1 font-display text-base text-navy outline-none"
        >
          {COUNTRIES.map((c) => (
            <option key={c.iso} value={c.iso}>
              +{c.dial} {c.name}
            </option>
          ))}
        </select>

        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete={autoComplete}
          required={required}
          maxLength={20}
          value={value.number}
          onChange={(e) => onChange({ ...value, number: e.target.value })}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined}
          placeholder={isEthiopia ? '09 12 34 56 78' : 'Phone number'}
          className="min-h-[3rem] w-full bg-white px-3 py-3 text-base text-ink outline-none placeholder:text-ink/35"
        />
      </div>

      {hint && !error && (
        <span id={hintId} className="mt-1.5 block text-sm text-ink/55">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} role="alert" className="mt-1.5 block text-sm font-medium text-coral">
          {error}
        </span>
      )}
    </div>
  )
}

/**
 * Compose the stored value. Ethiopian numbers keep their familiar local `09…` form (that is what
 * staff dial and what parents recognise); every other country is stored as `+<dial><number>`.
 */
export function composePhone({ iso, number }: PhoneValue): string {
  const digits = number.replace(/\D/g, '')
  if (!digits) return ''
  const country = countryByIso(iso)
  if (iso === 'ET') {
    // Accept 0912…, 912…, 251912… — all collapse to the 9-digit subscriber part.
    const local = digits.replace(/^(?:251|0)/, '')
    return `0${local}`
  }
  const local = digits.replace(new RegExp(`^${country.dial}`), '')
  return `+${country.dial}${local}`
}

/** Validate a phone value. Returns an error string, or '' when the number is dialable. */
export function validatePhone(v: PhoneValue, { required = false }: { required?: boolean } = {}): string {
  const digits = v.number.replace(/\D/g, '')
  if (!digits) return required ? 'Please add a phone number so we can reach you.' : ''
  if (v.iso === 'ET') {
    const local = digits.replace(/^(?:251|0)/, '')
    // Ethiopian mobiles are 9 digits starting 9 (mobile) or 7 (newer mobile ranges).
    if (!/^[79]\d{8}$/.test(local)) return 'Enter a valid Ethiopian number, e.g. 0912 345 678.'
    return ''
  }
  if (digits.length < 6 || digits.length > 15) return 'Enter a valid phone number for the country you chose.'
  return ''
}
