/**
 * Old newsletter URLs that were shared before the issues were retitled for search intent.
 * The `redirects` COLLECTION is not wired to middleware or next.config, so nothing consumes
 * it at runtime; these routes do their own 301 instead. Add a row here whenever a published
 * slug changes, and never delete one, the whole point is that the old link keeps working.
 */
export const LEGACY_NEWSLETTER_SLUGS: Record<string, string> = {
  'summer-camp-2026-week-1-recap': 'inside-a-week-at-summer-camp-addis-ababa',
  'summer-camp-2026-week-2-recap': 'kids-learning-to-code-robots-addis-ababa',
  'summer-camp-2026-week-3-recap': 'summer-camp-confidence-to-leadership-addis-ababa',
  'educators-core-issue-01-emotional-intelligence': 'emotional-intelligence-in-the-classroom',
}
