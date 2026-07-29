'use server'

import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { verifyFormToken } from '@/lib/formToken'
import { cleanText } from '@/lib/phone'

export type ApplicationState = { status: 'idle' | 'success' | 'error'; message: string }

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const CONTACT_LINE = 'Please call us on 09 81 99 99 22 and we will take your details over the phone.'

/**
 * Rate limit, mirroring `submitForm`: best-effort, per-warm-instance. A full application is a
 * high-effort action so the ceiling is lower than the lead forms'.
 */
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

/**
 * Handle a full admission application (the web version of the printed Student Profile form).
 * Same defence stack as the short lead forms: honeypot → per-IP rate limit → signed form token.
 *
 * Client-side validation already ran; this re-checks the things that actually matter (a name to
 * file the application under, at least one way to reach the family, well-formed emails) because
 * a server action is a public endpoint and cannot trust the browser.
 */
export async function submitApplication(
  _prev: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  const get = (k: string, max = 200) => cleanText(formData.get(k)?.toString() ?? '').slice(0, max)
  const getLong = (k: string, max = 2000) =>
    cleanText(formData.get(k)?.toString() ?? '', { multiline: true }).slice(0, max)
  /** The Yes/No controls post the literal strings "Yes" / "No" / "". */
  const bool = (k: string) => get(k, 5) === 'Yes'

  if (get('company')) return { status: 'success', message: 'Thank you — your application has been received.' }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
  if (rateLimited(ip)) return { status: 'success', message: 'Thank you — your application has been received.' }

  if (!verifyFormToken(get('formToken', 400))) {
    return {
      status: 'error',
      message: `Something went wrong sending your application. Please refresh the page and try again. ${CONTACT_LINE}`,
    }
  }

  const childFirstName = get('childFirstName', 100)
  const childMiddleName = get('childMiddleName', 100)
  const childLastName = get('childLastName', 100)
  const studentName = [childFirstName, childMiddleName, childLastName].filter(Boolean).join(' ')

  if (!childFirstName || !childLastName) {
    return { status: 'error', message: 'Please add your child’s first and last name.' }
  }

  const fatherEmail = get('fatherEmail').toLowerCase()
  const motherEmail = get('motherEmail').toLowerCase()
  const fatherWorkEmail = get('fatherWorkEmail').toLowerCase()
  const motherWorkEmail = get('motherWorkEmail').toLowerCase()

  for (const email of [fatherEmail, motherEmail, fatherWorkEmail, motherWorkEmail]) {
    if (email && !isEmail(email)) {
      return { status: 'error', message: 'One of the email addresses is not valid — please check and try again.' }
    }
  }

  const phones = [
    get('fatherMobile', 40),
    get('fatherBusinessPhone', 40),
    get('fatherEmergencyPhone', 40),
    get('motherMobile', 40),
    get('motherBusinessPhone', 40),
    get('motherEmergencyPhone', 40),
  ]

  // The registrar has to be able to call the family back — an application with no reachable
  // contact is not actionable, so it is rejected rather than silently filed.
  if (!phones.some(Boolean)) {
    return { status: 'error', message: 'Please add at least one phone number so the school can reach you.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'admission-applications',
      data: {
        studentName,

        // Application
        previousSchool: get('previousSchool') || undefined,
        previousCurriculum: get('previousCurriculum') || undefined,
        currentGrade: get('currentGrade', 100) || undefined,
        gradeApplyingTo: get('gradeApplyingTo', 100) || undefined,
        preferredCampus: get('preferredCampus', 100) || undefined,
        applicationDate: new Date().toISOString().slice(0, 10),

        // Student
        childFirstName,
        childMiddleName: childMiddleName || undefined,
        childLastName,
        gender: (get('gender', 10).toLowerCase() as 'male' | 'female') || undefined,
        dateOfBirth: get('dateOfBirth', 30) || undefined,
        placeOfBirth: get('placeOfBirth', 150) || undefined,
        nationality: get('nationality', 100) || undefined,
        citizenship: get('citizenship', 100) || undefined,
        passportNumber: get('passportNumber', 60) || undefined,
        motherTongue: get('motherTongue', 100) || undefined,
        secondLanguage: get('secondLanguage', 100) || undefined,
        primaryContact: get('primaryContact', 100) || undefined,

        // Father
        fatherSalutation: get('fatherSalutation', 20) || undefined,
        fatherFirstName: get('fatherFirstName', 100) || undefined,
        fatherMiddleName: get('fatherMiddleName', 100) || undefined,
        fatherLastName: get('fatherLastName', 100) || undefined,
        fatherNationality: get('fatherNationality', 100) || undefined,
        fatherOccupation: get('fatherOccupation', 150) || undefined,
        fatherPassport: get('fatherPassport', 60) || undefined,
        fatherPassportExpiry: get('fatherPassportExpiry', 30) || undefined,
        fatherNationalId: get('fatherNationalId', 60) || undefined,
        fatherMobile: phones[0] || undefined,
        fatherBusinessPhone: phones[1] || undefined,
        fatherEmergencyPhone: phones[2] || undefined,
        fatherEmail: fatherEmail || undefined,
        fatherWorkEmail: fatherWorkEmail || undefined,

        // Mother
        motherSalutation: get('motherSalutation', 20) || undefined,
        motherFirstName: get('motherFirstName', 100) || undefined,
        motherMiddleName: get('motherMiddleName', 100) || undefined,
        motherLastName: get('motherLastName', 100) || undefined,
        motherNationality: get('motherNationality', 100) || undefined,
        motherOccupation: get('motherOccupation', 150) || undefined,
        motherPassport: get('motherPassport', 60) || undefined,
        motherPassportExpiry: get('motherPassportExpiry', 30) || undefined,
        motherNationalId: get('motherNationalId', 60) || undefined,
        motherMobile: phones[3] || undefined,
        motherBusinessPhone: phones[4] || undefined,
        motherEmergencyPhone: phones[5] || undefined,
        motherEmail: motherEmail || undefined,
        motherWorkEmail: motherWorkEmail || undefined,

        // Wellbeing
        hasSiblings: bool('hasSiblings'),
        siblingDetails: getLong('siblingDetails', 1000) || undefined,
        isStaffChild: bool('isStaffChild'),
        hasHealthConditions: bool('hasHealthConditions'),
        needsTreatment: bool('needsTreatment'),
        healthDetails: getLong('healthDetails') || undefined,
        hasLearningNeeds: bool('hasLearningNeeds'),
        hasDisability: bool('hasDisability'),
        learningNeedsDetails: getLong('learningNeedsDetails') || undefined,
        hasAllergies: bool('hasAllergies'),
        allergyDetails: getLong('allergyDetails') || undefined,

        // Assessment & consent
        cat4Verbal: get('cat4Verbal', 20) || undefined,
        cat4Quantitative: get('cat4Quantitative', 20) || undefined,
        cat4NonVerbal: get('cat4NonVerbal', 20) || undefined,
        cat4Spatial: get('cat4Spatial', 20) || undefined,
        mediaConsent: bool('mediaConsent'),
        parentsSeparated: bool('parentsSeparated'),
        transportInterest: bool('transportInterest'),
        heardAbout: get('heardAbout') || undefined,
        declarationName: get('declarationName') || undefined,
        declarationAccepted: bool('declarationAccepted') || get('declarationAccepted', 5) === 'Yes',

        sourcePage: get('sourcePage', 300),
      },
    })

    return {
      status: 'success',
      message:
        'Our admissions team will review it and contact you within one business day to arrange the next step.',
    }
  } catch (err) {
    console.error('[submitApplication] create failed:', err)
    return { status: 'error', message: `Something went wrong saving your application. ${CONTACT_LINE}` }
  }
}
