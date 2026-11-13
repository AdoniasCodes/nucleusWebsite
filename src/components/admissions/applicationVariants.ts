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
  /** Grades this campus accepts. Replaces the full Preschool to Year 9 (Grade 8) list. */
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
    campus: 'Bisrate Gebriel Campus (South African Campus)',
    campusNote: 'Our primary school, South African Campus, Bisrate Gebriel (next to Adot Building), Addis Ababa.',
  },
  'grade-school': {
    key: 'grade-school',
    grades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'],
    campus: 'Vatican Campus',
    campusNote: 'Our grade school at Sarbet Vatican, 50 metres behind the Vatican Embassy, Addis Ababa.',
  },
} as const satisfies Record<string, ApplicationVariant>

/**
 * Visible label for a stored grade value. The stored value stays "Grade N" so old submissions and
 * admin filters keep working; the Cambridge Year (Grade + 1) leads on screen: "Year 9 (Grade 8)".
 */
export function gradeLabel(value: string): string {
  const m = /^Grade (\d+)$/.exec(value)
  return m ? `Year ${Number(m[1]) + 1} (Grade ${m[1]})` : value
}

export type ApplicationVariantKey = keyof typeof APPLICATION_VARIANTS
