/**
 * Per-campus phone numbers (client fact change, 11 Nov 2026). Plain module (no 'use client') so
 * server code, client components and the block seed files can all import real values.
 * Display format is "+2519 XX XX XX XX"; tel links and JSON-LD carry no spaces.
 */

export type CampusPhone = { display: string; tel: string }

export type CampusPhoneSet = {
  /** Label for running text, e.g. "Preschool and KG (Bisrate Gebriel)". */
  label: string
  /** Short name for buttons ("Call ..."), kept short so a button fits one line. */
  short: string
  numbers: CampusPhone[]
}

export const PRESCHOOL_PHONES: CampusPhoneSet = {
  label: 'Preschool and KG (Bisrate Gebriel)',
  short: 'Preschool and KG (Bisrate Gebriel)',
  numbers: [
    { display: '+2519 47 50 09 92', tel: '+251947500992' },
    { display: '+2519 47 50 04 94', tel: '+251947500494' },
  ],
}

export const VATICAN_PHONES: CampusPhoneSet = {
  label: 'Year 2 to Year 9 (Grade 1 to Grade 8), Vatican',
  short: 'Grade School (Vatican)',
  numbers: [
    { display: '+2519 81 99 99 22', tel: '+251981999922' },
    { display: '+2519 81 99 99 33', tel: '+251981999933' },
  ],
}

/** "+2519 47 50 09 92 · +2519 47 50 04 94" */
export const phoneText = (set: CampusPhoneSet, sep = ' · ') => set.numbers.map((n) => n.display).join(sep)

/** Both campuses on one line, labelled: "Preschool and KG (Bisrate Gebriel): ... / Year 2 to Year 9 (Grade 1 to Grade 8), Vatican: ..." */
export const bothCampusesText = (sep = ' / ') =>
  [PRESCHOOL_PHONES, VATICAN_PHONES].map((s) => `${s.label}: ${phoneText(s, ' or ')}`).join(sep)

export const phoneTels = (set: CampusPhoneSet) => set.numbers.map((n) => n.tel)
