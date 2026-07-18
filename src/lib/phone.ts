/**
 * Phone validation + normalization for lead forms. The audience is Ethiopian
 * first: mobile numbers are 09XXXXXXXX or 07XXXXXXXX (also written +2519...,
 * 002517..., 9XXXXXXXX etc). Staff call every lead, so a number that can't be
 * dialed is a lost lead: anything that doesn't normalize is rejected at
 * submission time. International (diaspora) numbers in E.164 form are kept.
 *
 * Returns the canonical form to store:
 *  - Ethiopian mobiles: local dialable form 09XXXXXXXX / 07XXXXXXXX
 *  - other countries:   +<8..15 digits> (must be entered with a leading +)
 *  - not a phone:       null
 */
export function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  // Keep digits; note whether the user wrote a leading + (international intent).
  const hasPlus = /^\+/.test(trimmed)
  const digits = trimmed.replace(/\D/g, '')
  if (!digits) return null

  // Ethiopian forms: +251 9/7XXXXXXXX, 00251..., 251..., 09/07XXXXXXXX, 9/7XXXXXXXX.
  let local: string | null = null
  if (/^(?:00)?251[79]\d{8}$/.test(digits)) local = digits.slice(-9)
  else if (/^0[79]\d{8}$/.test(digits)) local = digits.slice(1)
  else if (/^[79]\d{8}$/.test(digits)) local = digits
  if (local) return `0${local}`

  // Everything else must be an explicit international number: +, then 8-15 digits
  // (E.164). Without the +, a random digit string is far more likely a typo than
  // a foreign number, so it is rejected.
  if (hasPlus && /^\d{8,15}$/.test(digits) && !digits.startsWith('251')) return `+${digits}`

  return null
}

export const isValidPhone = (raw: string): boolean => normalizePhone(raw) !== null

export const PHONE_ERROR =
  'Please enter a valid phone number we can call, e.g. 0912 345 678 (or +44... for international numbers).'

/**
 * General text sanitizer for form fields: strips control characters (keeps
 * newlines in multi-line fields), collapses runs of spaces, trims.
 */
export function cleanText(value: string, { multiline = false }: { multiline?: boolean } = {}): string {
  // eslint-disable-next-line no-control-regex
  const control = multiline ? /[\u0000-\u0008\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g
  return value
    .replace(control, ' ')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .trim()
}
