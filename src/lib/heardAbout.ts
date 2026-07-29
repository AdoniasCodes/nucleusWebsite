/**
 * Marketing attribution options — "How did you hear about us?".
 *
 * This is the school's real channel list, supplied by marketing: paid/organic social (including
 * the individual TikTok creators the school sponsors), broadcast, print and physical placements.
 * Kept in one place so the contact form and the admission form report against the SAME taxonomy —
 * two slightly different lists would make the numbers impossible to add up.
 *
 * Values are stored verbatim, so DO NOT rename an existing entry without also migrating the rows
 * already saved against it; add new channels to the end of their group instead.
 */
export const HEARD_ABOUT_OPTIONS = [
  'Google Search',
  'AI Search',
  'Our TikTok Page',
  'Temar Lije TikTok',
  'Brook News TikTok',
  'Yadeshi TikTok',
  'Bertemios TikTok',
  'Comedian Yasino TikTok',
  'Musse Solomon TikTok',
  'Our Instagram Page',
  'Our Facebook Page',
  'EBS TV',
  'Kana TV',
  'Abay TV',
  'Radio',
  'Personal Recommendation',
  'Brochure / Flyers',
  'Magazine',
  'Digital Screen',
  'Outdoor Signage',
] as const

export const HEARD_ABOUT_LABEL = 'How did you hear about us?'
