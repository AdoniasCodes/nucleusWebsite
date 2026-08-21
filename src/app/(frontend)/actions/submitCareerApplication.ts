'use server'

import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { verifyFormToken } from '@/lib/formToken'
import { cleanText } from '@/lib/phone'
import { JOB_POSITION_VALUES, OTHER_POSITION, jobPositionLabel } from '@/lib/jobPositions'

export type CareerState = { status: 'idle' | 'success' | 'error'; message: string }

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const CONTACT_LINE = 'You can also email your CV to info@nucleusinternationalschoolsystem.com.'

/** 5 MB. Big enough for a CV with a photo, small enough that an upload finishes on mobile data. */
const MAX_CV_BYTES = 5 * 1024 * 1024

/**
 * Accepted CV formats. Checked server-side against the real declared type, not just the file
 * extension, so the `accept` attribute on the input stays a convenience rather than the control.
 */
const CV_TYPES: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
}

/** Rate limit, mirroring `submitApplication`: best-effort, per-warm-instance. */
const RATE_MAX = 3
const RATE_WINDOW_MS = 15 * 60 * 1000
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

/** `Some Name` + `pdf` → `some-name-cv.pdf`, so the admin file list is readable. */
function cvFilename(applicantName: string, ext: string): string {
  const stem =
    applicantName
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'applicant'
  return `${stem}-cv.${ext}`
}

/**
 * Handle a job application from /careers. Same defence stack as the parent-facing forms
 * (honeypot → per-IP rate limit → signed form token), plus the checks a file upload needs: a
 * declared type we accept and a hard size ceiling, both enforced here rather than in the browser.
 *
 * The CV is stored in `career-cvs`, a staff-only collection, and the application row links to it.
 */
export async function submitCareerApplication(
  _prev: CareerState,
  formData: FormData,
): Promise<CareerState> {
  const get = (k: string, max = 200) => cleanText(formData.get(k)?.toString() ?? '').slice(0, max)

  // Honeypot: answer as though it worked so a bot learns nothing.
  if (get('company')) return { status: 'success', message: 'Thank you. Your application has been received.' }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
  if (rateLimited(ip)) return { status: 'success', message: 'Thank you. Your application has been received.' }

  if (!verifyFormToken(get('formToken', 400))) {
    return {
      status: 'error',
      message: `Something went wrong sending your application. Please refresh the page and try again. ${CONTACT_LINE}`,
    }
  }

  const fullName = get('fullName', 200)
  const email = get('email').toLowerCase()
  const phone = get('phone', 50)
  const position = get('position', 60)
  const otherPosition = get('otherPosition', 150)
  const yearsExperience = get('yearsExperience', 20)
  const message = cleanText(formData.get('message')?.toString() ?? '', { multiline: true }).slice(0, 3000)

  if (!fullName) return { status: 'error', message: 'Please add your full name.' }
  if (!email || !isEmail(email)) {
    return { status: 'error', message: 'Please add a valid email address so we can reply to you.' }
  }
  if (!JOB_POSITION_VALUES.has(position)) {
    return { status: 'error', message: 'Please choose the position you are applying for.' }
  }
  if (position === OTHER_POSITION && !otherPosition) {
    return { status: 'error', message: 'Please type the position you are applying for.' }
  }
  if (message.length < 30) {
    return {
      status: 'error',
      message: 'Please add a short cover note telling us why this role and what you would bring.',
    }
  }

  const file = formData.get('cv')
  if (!(file instanceof File) || file.size === 0) {
    return { status: 'error', message: 'Please attach your CV as a PDF or Word document.' }
  }
  const ext = CV_TYPES[file.type]
  if (!ext) {
    return { status: 'error', message: 'Your CV must be a PDF or a Word document (.pdf, .doc or .docx).' }
  }
  if (file.size > MAX_CV_BYTES) {
    return { status: 'error', message: 'Your CV is larger than 5 MB. Please send a smaller file.' }
  }

  const positionLabel = position === OTHER_POSITION ? otherPosition : jobPositionLabel(position)

  try {
    const payload = await getPayloadClient()

    const cv = await payload.create({
      collection: 'career-cvs',
      overrideAccess: true,
      data: { applicantName: fullName },
      file: {
        data: Buffer.from(await file.arrayBuffer()),
        mimetype: file.type,
        name: cvFilename(fullName, ext),
        size: file.size,
      },
    })

    await payload.create({
      collection: 'career-applications',
      overrideAccess: true,
      data: {
        fullName,
        email,
        phone,
        position: position as never,
        otherPosition: position === OTHER_POSITION ? otherPosition : undefined,
        positionLabel,
        yearsExperience,
        message,
        cv: cv.id,
        sourcePage: get('sourcePage', 300),
        status: 'new',
      },
    })
  } catch (err) {
    console.error('[submitCareerApplication] failed:', err)
    return {
      status: 'error',
      message: `Something went wrong sending your application. Please try again. ${CONTACT_LINE}`,
    }
  }

  return {
    status: 'success',
    message: 'Thank you. Your application and CV have reached us, and we will be in touch if there is a match.',
  }
}
