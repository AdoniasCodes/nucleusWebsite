/**
 * Campus-locked variants of the admission form. Plain module (NO 'use client') so BOTH the client
 * form (ApplicationForm) and server code (AdmissionApplicationBlock) can import real values:
 * importing data from a 'use client' module into a server component yields an opaque client
 * reference, and the block would hand the form an object whose fields are all undefined.
 *
 * Parents were picking the wrong campus on a single combined form, so each campus now has its own
 * page: the grade list is cut down to what that campus actually teaches, and the campus itself is
 * fixed rather than a choice.
 */

export type ApplicationVariant = {
  /** Storage-key suffix, so a half-filled draft never leaks between the two forms. */
  key: string
  /** Grades this campus accepts. Replaces the full Preschool-to-Grade-8 list. */
  grades: string[]
  /** The one campus this form registers for. Shown read-only and posted as `preferredCampus`. */
  campus: string
  /** Human sentence under the campus, e.g. where it is. */
  campusNote: string
}

export const APPLICATION_VARIANTS = {
  primary: {
    key: 'primary',
    grades: ['Preschool', 'KG'],
    campus: 'Mekanisa Abo Square Campus',
    campusNote: 'Our primary school, 100 metres from Mekanisa Abo Square, Addis Ababa.',
  },
  'grade-school': {
    key: 'grade-school',
    grades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'],
    campus: 'Vatican Campus',
    campusNote: 'Our grade school at Sarbet Vatican, 50 metres behind the Vatican Embassy, Addis Ababa.',
  },
} as const satisfies Record<string, ApplicationVariant>

export type ApplicationVariantKey = keyof typeof APPLICATION_VARIANTS
