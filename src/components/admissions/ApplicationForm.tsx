'use client'

import { useActionState, useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'
import { COUNTRY_NAMES, DEFAULT_COUNTRY } from '@/lib/countries'
import { HEARD_ABOUT_OPTIONS, HEARD_ABOUT_LABEL } from '@/lib/heardAbout'
import { PhoneField, composePhone, validatePhone, type PhoneValue } from './PhoneField'
import { submitApplication, type ApplicationState } from '@/app/(frontend)/actions/submitApplication'
import { trackLead } from '@/lib/pixels'

/* ------------------------------------------------------------------ shape */

const emptyPhone = (): PhoneValue => ({ iso: DEFAULT_COUNTRY, number: '' })

/** Every text-ish answer lives in one flat string map; phones get their own typed map. */
type Values = Record<string, string>
type Phones = Record<PhoneKey, PhoneValue>
type PhoneKey =
  | 'fatherMobile'
  | 'fatherBusinessPhone'
  | 'fatherEmergencyPhone'
  | 'motherMobile'
  | 'motherBusinessPhone'
  | 'motherEmergencyPhone'

const PHONE_KEYS: PhoneKey[] = [
  'fatherMobile',
  'fatherBusinessPhone',
  'fatherEmergencyPhone',
  'motherMobile',
  'motherBusinessPhone',
  'motherEmergencyPhone',
]

const GRADES = [
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
]

const CAMPUSES = ['Vatican Campus (grade school)', 'Abo Campus (preschool)', 'Totot Campus', 'Not sure yet']

const STEPS = [
  { id: 'application', title: 'Application', blurb: 'Which grade and campus you are applying for.' },
  { id: 'student', title: 'Student', blurb: 'Your child’s details, exactly as on their documents.' },
  { id: 'father', title: 'Father', blurb: 'Father or first guardian.' },
  { id: 'mother', title: 'Mother', blurb: 'Mother or second guardian.' },
  { id: 'wellbeing', title: 'Wellbeing', blurb: 'Health, learning needs and allergies.' },
  { id: 'finish', title: 'Finish', blurb: 'Assessment scores, consent and your declaration.' },
] as const

const STORAGE_KEY = 'nucleus.application.v1'
const SAVE_DEBOUNCE_MS = 600

/* ------------------------------------------------------------- validation */

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/** Fields that must be answered, per step, with the message shown when they are not. */
const REQUIRED: Record<number, { key: string; label: string }[]> = {
  0: [{ key: 'gradeApplyingTo', label: 'the grade you are applying for' }],
  1: [
    { key: 'childFirstName', label: 'your child’s first name' },
    { key: 'childLastName', label: 'your child’s last name' },
    { key: 'dateOfBirth', label: 'your child’s date of birth' },
  ],
  5: [{ key: 'declarationName', label: 'your full name as a signature' }],
}

/* ---------------------------------------------------------------- controls */

const fieldBase =
  'min-h-[3rem] w-full rounded-xl border bg-white px-3.5 py-3 text-base text-ink outline-none transition placeholder:text-ink/35'
const fieldOk = 'border-navy/20 focus:border-ochre focus:ring-2 focus:ring-ochre/30'
const fieldBad = 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/30'

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-display text-sm font-semibold text-navy">
      {children} {required && <span className="text-coral">*</span>}
    </label>
  )
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <span id={id} role="alert" className="mt-1.5 block text-sm font-medium text-coral">
      {children}
    </span>
  )
}

function Text({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  type = 'text',
  inputMode,
  autoComplete,
  placeholder,
  hint,
  maxLength = 150,
}: {
  name: string
  label: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  error?: string
  required?: boolean
  type?: string
  inputMode?: 'text' | 'numeric' | 'email' | 'tel'
  autoComplete?: string
  placeholder?: string
  hint?: string
  maxLength?: number
}) {
  const errorId = `${name}-error`
  const hintId = `${name}-hint`
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined}
        className={`${fieldBase} ${error ? fieldBad : fieldOk}`}
      />
      {hint && !error && (
        <span id={hintId} className="mt-1.5 block text-sm text-ink/55">
          {hint}
        </span>
      )}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  )
}

function Select({
  name,
  label,
  value,
  onChange,
  options,
  error,
  required,
  placeholder = 'Choose one…',
}: {
  name: string
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  error?: string
  required?: boolean
  placeholder?: string
}) {
  const errorId = `${name}-error`
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${fieldBase} cursor-pointer ${error ? fieldBad : fieldOk}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  )
}

/**
 * Yes/No as two big tappable buttons rather than a checkbox pair. The paper form uses
 * Yes/No boxes, parents are used to that, and a 48px target beats a 16px checkbox on a phone.
 */
function YesNo({
  name,
  question,
  value,
  onChange,
}: {
  name: string
  question: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <fieldset className="rounded-xl border border-navy/12 bg-mist/40 p-4">
      <legend className="px-1 font-display text-sm font-semibold text-navy">{question}</legend>
      <div className="mt-2 flex gap-3">
        {['Yes', 'No'].map((opt) => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(active ? '' : opt)}
              aria-pressed={active}
              className={`min-h-[2.75rem] flex-1 cursor-pointer rounded-lg border px-4 py-2.5 font-display text-base font-semibold transition-colors duration-200 ${
                active
                  ? 'border-navy bg-navy text-white'
                  : 'border-navy/20 bg-white text-navy hover:border-navy/45 hover:bg-white'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      <input type="hidden" name={name} value={value} />
    </fieldset>
  )
}

function Textarea({
  name,
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  name: string
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  hint?: string
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        maxLength={2000}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldBase} ${fieldOk} resize-y`}
      />
      {hint && <span className="mt-1.5 block text-sm text-ink/55">{hint}</span>}
    </div>
  )
}

/** Two-column on tablet and up, single column on phones. */
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
}

function StepHeading({ index }: { index: number }) {
  const step = STEPS[index]
  // The step counter lives in the progress bar above the card — repeating it here just
  // duplicates the same number twice in one screen.
  return (
    <div className="border-b border-navy/10 pb-5">
      <h3 className="text-2xl font-bold text-navy">{step.title}</h3>
      <p className="mt-1 text-ink/70">{step.blurb}</p>
    </div>
  )
}

/* -------------------------------------------------------------- the form */

const initialState: ApplicationState = { status: 'idle', message: '' }

export function ApplicationForm({ formToken }: { formToken: string }) {
  const [state, action, isPending] = useActionState(submitApplication, initialState)
  const pathname = usePathname()

  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Values>({})
  const [phones, setPhones] = useState<Phones>(() =>
    Object.fromEntries(PHONE_KEYS.map((k) => [k, emptyPhone()])) as Phones,
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [restored, setRestored] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  const topRef = useRef<HTMLDivElement>(null)
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  const set = useCallback((key: string, v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev))
  }, [])

  const val = (k: string) => values[k] ?? ''

  /* --- session restore -------------------------------------------------- */
  // Read once on mount rather than lazily in useState: localStorage does not exist during SSR,
  // and touching it in the initializer would make the first client render differ from the
  // server HTML (hydration mismatch).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as { values?: Values; phones?: Phones; step?: number; at?: number }
      if (!saved || typeof saved !== 'object') return
      const hasContent = saved.values && Object.values(saved.values).some((v) => v && v.trim())
      if (!hasContent) return
      setValues(saved.values ?? {})
      if (saved.phones) {
        setPhones(
          Object.fromEntries(
            PHONE_KEYS.map((k) => [k, saved.phones?.[k] ?? emptyPhone()]),
          ) as Phones,
        )
      }
      if (typeof saved.step === 'number') setStep(Math.min(Math.max(saved.step, 0), STEPS.length - 1))
      setRestored(true)
    } catch {
      // Corrupt or blocked storage (private mode) — start clean rather than break the form.
    }
  }, [])

  /* --- autosave --------------------------------------------------------- */
  // Debounced so a fast typist does not write to disk on every keystroke.
  useEffect(() => {
    const filled = Object.values(values).some((v) => v && v.trim())
    if (!filled) return
    const t = setTimeout(() => {
      try {
        const at = Date.now()
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, phones, step, at }))
        setSavedAt(at)
      } catch {
        // Storage full or disabled — autosave is a convenience, never a blocker.
      }
    }, SAVE_DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [values, phones, step])

  /* --- clear the draft once the application is safely in --------------- */
  useEffect(() => {
    if (state.status !== 'success') return
    trackLead('registration')
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* nothing to clean up */
    }
  }, [state.status])

  /* --- validation ------------------------------------------------------- */

  const validateStep = (i: number): Record<string, string> => {
    const next: Record<string, string> = {}

    for (const { key, label } of REQUIRED[i] ?? []) {
      if (!val(key).trim()) next[key] = `Please add ${label}.`
    }

    // Emails: optional everywhere, but a typo'd address is worse than a blank one.
    const emailKeys = i === 2 ? ['fatherEmail', 'fatherWorkEmail'] : i === 3 ? ['motherEmail', 'motherWorkEmail'] : []
    for (const k of emailKeys) {
      const v = val(k).trim()
      if (v && !isEmail(v)) next[k] = 'That email address does not look right — check for a typo.'
    }

    const phoneKeys: PhoneKey[] =
      i === 2
        ? ['fatherMobile', 'fatherBusinessPhone', 'fatherEmergencyPhone']
        : i === 3
          ? ['motherMobile', 'motherBusinessPhone', 'motherEmergencyPhone']
          : []
    for (const k of phoneKeys) {
      const err = validatePhone(phones[k])
      if (err) next[k] = err
    }

    // The school must be able to reach at least one parent — enforced on the mother step,
    // which is the last point where either number can still be entered.
    if (i === 3) {
      const anyPhone = PHONE_KEYS.some((k) => phones[k].number.replace(/\D/g, ''))
      const anyEmail = ['fatherEmail', 'motherEmail'].some((k) => val(k).trim())
      if (!anyPhone) next.motherMobile = 'Please give us at least one phone number for a parent or guardian.'
      else if (!anyEmail) next.motherEmail = 'Please give us at least one parent email address.'
    }

    if (i === 5 && !val('declarationAccepted')) {
      next.declarationAccepted = 'Please confirm the declaration before submitting.'
    }

    return next
  }

  const goTo = (next: number) => {
    setStep(next)
    setErrors({})
    // Scroll the card (not the page top) into view so the parent sees the new step immediately.
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleNext = () => {
    const found = validateStep(step)
    if (Object.keys(found).length) {
      setErrors(found)
      requestAnimationFrame(() => errorSummaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
      return
    }
    goTo(Math.min(step + 1, STEPS.length - 1))
  }

  /** Final gate: re-check every step so a parent cannot skip ahead with an invalid earlier step. */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let all: Record<string, string> = {}
    let firstBad = -1
    for (let i = 0; i < STEPS.length; i++) {
      const found = validateStep(i)
      if (Object.keys(found).length && firstBad === -1) firstBad = i
      all = { ...all, ...found }
    }
    if (Object.keys(all).length) {
      e.preventDefault()
      setErrors(all)
      if (firstBad !== -1 && firstBad !== step) setStep(firstBad)
      requestAnimationFrame(() => errorSummaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
    }
  }

  const discardDraft = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* already gone */
    }
    setValues({})
    setPhones(Object.fromEntries(PHONE_KEYS.map((k) => [k, emptyPhone()])) as Phones)
    setErrors({})
    setRestored(false)
    setSavedAt(null)
    setStep(0)
  }

  const phoneProps = (key: PhoneKey, label: string, hint?: string) => ({
    label,
    hint,
    value: phones[key],
    error: errors[key],
    onChange: (v: PhoneValue) => {
      setPhones((prev) => ({ ...prev, [key]: v }))
      setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev))
    },
    onBlur: () => {
      const err = validatePhone(phones[key])
      if (err) setErrors((prev) => ({ ...prev, [key]: err }))
    },
  })

  /* --- success ---------------------------------------------------------- */

  if (state.status === 'success') {
    return (
      <Section background="offwhite" id="application">
        <Container width="narrow">
          <div className="rounded-2xl border border-grass/30 bg-white p-8 text-center shadow-sm sm:p-12">
            <Icon name="BadgeCheck" size={48} className="mx-auto text-grass" />
            <h2 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">Application received</h2>
            <p className="mx-auto mt-3 max-w-lg text-lg text-ink/75">{state.message}</p>
            <p className="mt-6 text-ink/70">
              Any questions in the meantime? Call{' '}
              <a href="tel:0981999922" className="font-semibold text-navy underline decoration-ochre decoration-2 underline-offset-4">
                09 81 99 99 22
              </a>{' '}
              or{' '}
              <a href="tel:0981999933" className="font-semibold text-navy underline decoration-ochre decoration-2 underline-offset-4">
                09 81 99 99 33
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <Section background="offwhite" id="application">
      <Container width="narrow">
        <div ref={topRef} className="scroll-mt-28" />

        {/* Progress — a labelled bar plus a step rail. The rail is horizontally scrollable on
            phones rather than wrapping into an unreadable stack. */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-navy">
              Step {step + 1} of {STEPS.length}
            </p>
            {savedAt && (
              <p className="text-sm text-ink/55" aria-live="polite">
                <Icon name="Check" size={14} className="mr-1 inline text-grass" />
                Progress saved on this device
              </p>
            )}
          </div>
          <div
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-navy/10"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-valuenow={step + 1}
            aria-label={`Application progress: step ${step + 1} of ${STEPS.length}, ${STEPS[step].title}`}
          >
            <div
              className="h-full rounded-full bg-ochre transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <ol className="mt-3 flex gap-2 overflow-x-auto pb-1 text-sm">
            {STEPS.map((s, i) => {
              const done = i < step
              const current = i === step
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => (i <= step ? goTo(i) : undefined)}
                    disabled={i > step}
                    aria-current={current ? 'step' : undefined}
                    className={`min-h-[2.25rem] rounded-full px-3.5 py-1.5 font-display font-semibold transition-colors duration-200 ${
                      current
                        ? 'bg-navy text-white'
                        : done
                          ? 'cursor-pointer bg-white text-navy ring-1 ring-navy/20 hover:ring-navy/50'
                          : 'bg-white/60 text-ink/40 ring-1 ring-navy/10'
                    }`}
                  >
                    {done && <Icon name="Check" size={13} className="mr-1 inline text-grass" />}
                    {s.title}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {restored && (
          <div className="mb-6 flex flex-wrap items-start gap-3 rounded-xl border border-ochre/40 bg-ochre/10 p-4">
            <Icon name="RotateCcw" size={20} className="mt-0.5 shrink-0 text-ochre-600" />
            <div className="min-w-[12rem] flex-1">
              <p className="font-display font-semibold text-navy">We brought back your unfinished form</p>
              <p className="mt-0.5 text-sm text-ink/70">
                You can carry on where you stopped. Nothing has been sent to the school yet.
              </p>
            </div>
            <button
              type="button"
              onClick={discardDraft}
              className="min-h-[2.5rem] cursor-pointer rounded-full px-4 py-2 font-display text-sm font-semibold text-navy underline decoration-navy/40 underline-offset-4 transition-colors hover:decoration-navy"
            >
              Start over
            </button>
          </div>
        )}

        <form
          action={action}
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm sm:p-8"
        >
          <input type="hidden" name="sourcePage" value={pathname} />
          <input type="hidden" name="formToken" value={formToken} />
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          {/* Every answer is posted on submit, including steps that are not currently mounted. */}
          {Object.entries(values).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} />
          ))}
          {PHONE_KEYS.map((k) => (
            <input key={k} type="hidden" name={k} value={composePhone(phones[k])} />
          ))}

          <StepHeading index={step} />

          <div className="mt-6 space-y-5">
            {step === 0 && (
              <>
                <Grid>
                  <Select
                    name="gradeApplyingTo"
                    label="Grade applying to"
                    required
                    value={val('gradeApplyingTo')}
                    onChange={(v) => set('gradeApplyingTo', v)}
                    options={GRADES}
                    error={errors.gradeApplyingTo}
                    placeholder="Select a grade…"
                  />
                  <Select
                    name="preferredCampus"
                    label="Preferred campus"
                    value={val('preferredCampus')}
                    onChange={(v) => set('preferredCampus', v)}
                    options={CAMPUSES}
                  />
                  <Text
                    name="previousSchool"
                    label="Previous school name"
                    value={val('previousSchool')}
                    onChange={(v) => set('previousSchool', v)}
                    placeholder="Leave blank if this is their first school"
                  />
                  <Text
                    name="previousCurriculum"
                    label="Previous curriculum"
                    value={val('previousCurriculum')}
                    onChange={(v) => set('previousCurriculum', v)}
                    placeholder="e.g. Cambridge, National, IB"
                  />
                  <Text
                    name="currentGrade"
                    label="Current year level / grade"
                    value={val('currentGrade')}
                    onChange={(v) => set('currentGrade', v)}
                  />
                </Grid>
              </>
            )}

            {step === 1 && (
              <>
                <Grid>
                  <Text
                    name="childFirstName"
                    label="Child’s first name"
                    required
                    autoComplete="off"
                    value={val('childFirstName')}
                    onChange={(v) => set('childFirstName', v)}
                    error={errors.childFirstName}
                  />
                  <Text
                    name="childMiddleName"
                    label="Child’s middle name"
                    value={val('childMiddleName')}
                    onChange={(v) => set('childMiddleName', v)}
                  />
                  <Text
                    name="childLastName"
                    label="Child’s last name"
                    required
                    value={val('childLastName')}
                    onChange={(v) => set('childLastName', v)}
                    error={errors.childLastName}
                  />
                  <Select
                    name="gender"
                    label="Gender"
                    value={val('gender')}
                    onChange={(v) => set('gender', v)}
                    options={['Male', 'Female']}
                  />
                  <Text
                    name="dateOfBirth"
                    label="Date of birth"
                    required
                    type="date"
                    value={val('dateOfBirth')}
                    onChange={(v) => set('dateOfBirth', v)}
                    error={errors.dateOfBirth}
                  />
                  <Select
                    name="placeOfBirth"
                    label="Country of birth"
                    value={val('placeOfBirth')}
                    onChange={(v) => set('placeOfBirth', v)}
                    options={COUNTRY_NAMES}
                  />
                  <Select
                    name="nationality"
                    label="Nationality (country)"
                    value={val('nationality')}
                    onChange={(v) => set('nationality', v)}
                    options={COUNTRY_NAMES}
                  />
                  <Select
                    name="citizenship"
                    label="Citizenship (country)"
                    value={val('citizenship')}
                    onChange={(v) => set('citizenship', v)}
                    options={COUNTRY_NAMES}
                  />
                  <Text
                    name="motherTongue"
                    label="Mother tongue / first language"
                    value={val('motherTongue')}
                    onChange={(v) => set('motherTongue', v)}
                    placeholder="e.g. Amharic"
                  />
                  <Text
                    name="secondLanguage"
                    label="Second language"
                    value={val('secondLanguage')}
                    onChange={(v) => set('secondLanguage', v)}
                  />
                  <Text
                    name="passportNumber"
                    label="Passport number"
                    value={val('passportNumber')}
                    onChange={(v) => set('passportNumber', v)}
                    hint="Only if your child has one."
                  />
                  <Select
                    name="primaryContact"
                    label="Who should we contact first?"
                    value={val('primaryContact')}
                    onChange={(v) => set('primaryContact', v)}
                    options={['Father', 'Mother', 'Both parents']}
                  />
                </Grid>
              </>
            )}

            {step === 2 && (
              <>
                <Grid>
                  <Select
                    name="fatherSalutation"
                    label="Salutation"
                    value={val('fatherSalutation')}
                    onChange={(v) => set('fatherSalutation', v)}
                    options={['Mr', 'Dr', 'Eng', 'Ato', 'Prof']}
                  />
                  <Text
                    name="fatherFirstName"
                    label="First name"
                    value={val('fatherFirstName')}
                    onChange={(v) => set('fatherFirstName', v)}
                  />
                  <Text
                    name="fatherMiddleName"
                    label="Middle name"
                    value={val('fatherMiddleName')}
                    onChange={(v) => set('fatherMiddleName', v)}
                  />
                  <Text
                    name="fatherLastName"
                    label="Last name"
                    value={val('fatherLastName')}
                    onChange={(v) => set('fatherLastName', v)}
                  />
                  <Select
                    name="fatherNationality"
                    label="Nationality (country)"
                    value={val('fatherNationality')}
                    onChange={(v) => set('fatherNationality', v)}
                    options={COUNTRY_NAMES}
                  />
                  <Text
                    name="fatherOccupation"
                    label="Occupation"
                    value={val('fatherOccupation')}
                    onChange={(v) => set('fatherOccupation', v)}
                  />
                  <Text
                    name="fatherNationalId"
                    label="Digital ID / Ethiopian ID no."
                    value={val('fatherNationalId')}
                    onChange={(v) => set('fatherNationalId', v)}
                  />
                  <Text
                    name="fatherPassport"
                    label="Passport number"
                    value={val('fatherPassport')}
                    onChange={(v) => set('fatherPassport', v)}
                  />
                  <Text
                    name="fatherPassportExpiry"
                    label="Passport expiry date"
                    type="date"
                    value={val('fatherPassportExpiry')}
                    onChange={(v) => set('fatherPassportExpiry', v)}
                  />
                </Grid>
                <Grid>
                  <PhoneField {...phoneProps('fatherMobile', 'Mobile')} />
                  <PhoneField {...phoneProps('fatherBusinessPhone', 'Telephone (business)')} />
                  <PhoneField {...phoneProps('fatherEmergencyPhone', 'Emergency contact number')} />
                </Grid>
                <Grid>
                  <Text
                    name="fatherEmail"
                    label="Email address"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={val('fatherEmail')}
                    onChange={(v) => set('fatherEmail', v)}
                    error={errors.fatherEmail}
                    onBlur={() => {
                      const v = val('fatherEmail').trim()
                      if (v && !isEmail(v))
                        setErrors((p) => ({ ...p, fatherEmail: 'That email address does not look right — check for a typo.' }))
                    }}
                    maxLength={200}
                  />
                  <Text
                    name="fatherWorkEmail"
                    label="Work email"
                    type="email"
                    inputMode="email"
                    value={val('fatherWorkEmail')}
                    onChange={(v) => set('fatherWorkEmail', v)}
                    error={errors.fatherWorkEmail}
                    maxLength={200}
                  />
                </Grid>
              </>
            )}

            {step === 3 && (
              <>
                <Grid>
                  <Select
                    name="motherSalutation"
                    label="Salutation"
                    value={val('motherSalutation')}
                    onChange={(v) => set('motherSalutation', v)}
                    options={['Mrs', 'Ms', 'Dr', 'Eng', 'W/ro', 'W/rt', 'Prof']}
                  />
                  <Text
                    name="motherFirstName"
                    label="First name"
                    value={val('motherFirstName')}
                    onChange={(v) => set('motherFirstName', v)}
                  />
                  <Text
                    name="motherMiddleName"
                    label="Middle name"
                    value={val('motherMiddleName')}
                    onChange={(v) => set('motherMiddleName', v)}
                  />
                  <Text
                    name="motherLastName"
                    label="Last name"
                    value={val('motherLastName')}
                    onChange={(v) => set('motherLastName', v)}
                  />
                  <Select
                    name="motherNationality"
                    label="Nationality (country)"
                    value={val('motherNationality')}
                    onChange={(v) => set('motherNationality', v)}
                    options={COUNTRY_NAMES}
                  />
                  <Text
                    name="motherOccupation"
                    label="Occupation"
                    value={val('motherOccupation')}
                    onChange={(v) => set('motherOccupation', v)}
                  />
                  <Text
                    name="motherNationalId"
                    label="Digital ID / Ethiopian ID no."
                    value={val('motherNationalId')}
                    onChange={(v) => set('motherNationalId', v)}
                  />
                  <Text
                    name="motherPassport"
                    label="Passport number"
                    value={val('motherPassport')}
                    onChange={(v) => set('motherPassport', v)}
                  />
                  <Text
                    name="motherPassportExpiry"
                    label="Passport expiry date"
                    type="date"
                    value={val('motherPassportExpiry')}
                    onChange={(v) => set('motherPassportExpiry', v)}
                  />
                </Grid>
                <Grid>
                  <PhoneField {...phoneProps('motherMobile', 'Mobile')} />
                  <PhoneField {...phoneProps('motherBusinessPhone', 'Telephone (business)')} />
                  <PhoneField {...phoneProps('motherEmergencyPhone', 'Emergency contact number')} />
                </Grid>
                <Grid>
                  <Text
                    name="motherEmail"
                    label="Email address"
                    type="email"
                    inputMode="email"
                    value={val('motherEmail')}
                    onChange={(v) => set('motherEmail', v)}
                    error={errors.motherEmail}
                    onBlur={() => {
                      const v = val('motherEmail').trim()
                      if (v && !isEmail(v))
                        setErrors((p) => ({ ...p, motherEmail: 'That email address does not look right — check for a typo.' }))
                    }}
                    maxLength={200}
                  />
                  <Text
                    name="motherWorkEmail"
                    label="Work email"
                    type="email"
                    inputMode="email"
                    value={val('motherWorkEmail')}
                    onChange={(v) => set('motherWorkEmail', v)}
                    error={errors.motherWorkEmail}
                    maxLength={200}
                  />
                </Grid>
              </>
            )}

            {step === 4 && (
              <>
                <YesNo
                  name="hasSiblings"
                  question="Does the student have sibling(s) currently studying at, or applying to, this school?"
                  value={val('hasSiblings')}
                  onChange={(v) => set('hasSiblings', v)}
                />
                {val('hasSiblings') === 'Yes' && (
                  <Textarea
                    name="siblingDetails"
                    label="Sibling names and grades"
                    value={val('siblingDetails')}
                    onChange={(v) => set('siblingDetails', v)}
                  />
                )}

                <YesNo
                  name="isStaffChild"
                  question="Is the father or mother of the student an employee of our school?"
                  value={val('isStaffChild')}
                  onChange={(v) => set('isStaffChild', v)}
                />

                <YesNo
                  name="hasHealthConditions"
                  question="Are there any health problems the school should be aware of?"
                  value={val('hasHealthConditions')}
                  onChange={(v) => set('hasHealthConditions', v)}
                />
                <YesNo
                  name="needsTreatment"
                  question="Are any treatments required?"
                  value={val('needsTreatment')}
                  onChange={(v) => set('needsTreatment', v)}
                />
                {(val('hasHealthConditions') === 'Yes' || val('needsTreatment') === 'Yes') && (
                  <Textarea
                    name="healthDetails"
                    label="Please tell us more about your child’s health"
                    value={val('healthDetails')}
                    onChange={(v) => set('healthDetails', v)}
                    hint="Medication, conditions, or anything our staff should know day to day."
                  />
                )}

                <YesNo
                  name="hasLearningNeeds"
                  question="Does the child have any learning difficulty or special educational need?"
                  value={val('hasLearningNeeds')}
                  onChange={(v) => set('hasLearningNeeds', v)}
                />
                <YesNo
                  name="hasDisability"
                  question="Does the child have any disability, or behavioural, emotional or social difficulty?"
                  value={val('hasDisability')}
                  onChange={(v) => set('hasDisability', v)}
                />
                {(val('hasLearningNeeds') === 'Yes' || val('hasDisability') === 'Yes') && (
                  <Textarea
                    name="learningNeedsDetails"
                    label="Please tell us more"
                    value={val('learningNeedsDetails')}
                    onChange={(v) => set('learningNeedsDetails', v)}
                    hint="This helps us support your child properly from day one. It does not count against the application."
                  />
                )}

                <YesNo
                  name="hasAllergies"
                  question="Does the student have allergies of any kind?"
                  value={val('hasAllergies')}
                  onChange={(v) => set('hasAllergies', v)}
                />
                {val('hasAllergies') === 'Yes' && (
                  <Textarea
                    name="allergyDetails"
                    label="Which allergies?"
                    value={val('allergyDetails')}
                    onChange={(v) => set('allergyDetails', v)}
                  />
                )}
              </>
            )}

            {step === 5 && (
              <>
                <fieldset>
                  <legend className="font-display text-sm font-semibold text-navy">CAT4 scores (if available)</legend>
                  <p className="mt-1 text-sm text-ink/60">Leave blank if your child has not taken a CAT4 assessment.</p>
                  <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      ['cat4Verbal', 'Verbal'],
                      ['cat4Quantitative', 'Quantitative'],
                      ['cat4NonVerbal', 'Non-verbal'],
                      ['cat4Spatial', 'Spatial'],
                    ].map(([key, label]) => (
                      <Text
                        key={key}
                        name={key}
                        label={label}
                        inputMode="numeric"
                        maxLength={10}
                        value={val(key)}
                        onChange={(v) => set(key, v)}
                      />
                    ))}
                  </div>
                </fieldset>

                <YesNo
                  name="mediaConsent"
                  question="Do you give permission for the school to take and use photos or videos of your child in school media?"
                  value={val('mediaConsent')}
                  onChange={(v) => set('mediaConsent', v)}
                />
                <YesNo
                  name="parentsSeparated"
                  question="Are the parents separated or divorced?"
                  value={val('parentsSeparated')}
                  onChange={(v) => set('parentsSeparated', v)}
                />
                <YesNo
                  name="transportInterest"
                  question="If the school offered a transport service in the future, would you be interested?"
                  value={val('transportInterest')}
                  onChange={(v) => set('transportInterest', v)}
                />

                <Select
                  name="heardAbout"
                  label={HEARD_ABOUT_LABEL}
                  value={val('heardAbout')}
                  onChange={(v) => set('heardAbout', v)}
                  options={[...HEARD_ABOUT_OPTIONS]}
                />

                <div className="rounded-xl border border-navy/12 bg-mist/50 p-5">
                  <h4 className="font-display font-semibold text-navy">Declaration</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">
                    I confirm that the information above is true to the best of my knowledge. I understand that
                    incomplete or inaccurate information, or a duplicated application, may result in the application
                    being rejected, and that any advance fee paid would not be refunded.
                  </p>

                  <div className="mt-4">
                    <Text
                      name="declarationName"
                      label="Type your full name as your signature"
                      required
                      autoComplete="name"
                      value={val('declarationName')}
                      onChange={(v) => set('declarationName', v)}
                      error={errors.declarationName}
                    />
                  </div>

                  <label
                    htmlFor="declarationAccepted"
                    className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg p-1"
                  >
                    <input
                      id="declarationAccepted"
                      type="checkbox"
                      checked={val('declarationAccepted') === 'Yes'}
                      onChange={(e) => set('declarationAccepted', e.target.checked ? 'Yes' : '')}
                      aria-invalid={errors.declarationAccepted ? true : undefined}
                      aria-describedby={errors.declarationAccepted ? 'declarationAccepted-error' : undefined}
                      className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-ochre"
                    />
                    <span className="font-display text-sm font-semibold text-navy">
                      I have read and accept the declaration above. <span className="text-coral">*</span>
                    </span>
                  </label>
                  {errors.declarationAccepted && (
                    <ErrorText id="declarationAccepted-error">{errors.declarationAccepted}</ErrorText>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Error summary + server errors, announced together and scrolled to on failure. */}
          <div ref={errorSummaryRef} className="scroll-mt-24">
            {errorCount > 0 && (
              <div role="alert" className="mt-6 rounded-xl border border-coral/40 bg-coral/10 p-4">
                <p className="font-display font-semibold text-navy">
                  {errorCount === 1
                    ? 'One answer still needs your attention'
                    : `${errorCount} answers still need your attention`}
                </p>
                <p className="mt-1 text-sm text-ink/70">The fields are marked in red below.</p>
              </div>
            )}
            {state.status === 'error' && (
              <p role="alert" className="mt-6 rounded-xl border border-coral/40 bg-coral/10 p-4 text-sm font-medium text-coral">
                {state.message}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-navy/10 pt-6">
            {step > 0 && (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="min-h-[3rem] cursor-pointer rounded-full border border-navy/25 px-6 py-3 font-display font-semibold text-navy transition-colors duration-200 hover:border-navy hover:bg-navy/5"
              >
                Back
              </button>
            )}

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="min-h-[3rem] flex-1 cursor-pointer rounded-full bg-ochre px-7 py-3 font-display font-semibold text-navy transition-colors duration-200 hover:bg-ochre-600 sm:flex-none"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending}
                className="min-h-[3rem] flex-1 cursor-pointer rounded-full bg-ochre px-7 py-3 font-display font-semibold text-navy transition-colors duration-200 hover:bg-ochre-600 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
              >
                {isPending ? 'Sending your application…' : 'Submit application'}
              </button>
            )}

            <p className="w-full text-sm text-ink/55 sm:w-auto">
              {step < STEPS.length - 1
                ? 'Your answers are saved on this device as you go.'
                : 'We reply within one business day.'}
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-ink/60">
          Prefer to fill this in with us? Call{' '}
          <a href="tel:0981999922" className="font-semibold text-navy underline decoration-ochre decoration-2 underline-offset-4">
            09 81 99 99 22
          </a>{' '}
          or{' '}
          <a href="/contact" className="font-semibold text-navy underline decoration-ochre decoration-2 underline-offset-4">
            visit a campus
          </a>
          .
        </p>
      </Container>
    </Section>
  )
}
