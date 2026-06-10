/**
 * Single source of truth for the public site origin.
 *
 * Normalised with NO trailing slash, so canonical tags, OG URLs, the sitemap and
 * robots never emit `//double-slash` URLs (a flaw the SEO checkup flagged).
 *
 * IMPORTANT: set NEXT_PUBLIC_SERVER_URL in the host (Vercel → Project → Settings →
 * Environment Variables) to the LIVE domain of THIS site. It must never point at the
 * legacy WordPress domain, or Google is told the "real" page lives elsewhere (the
 * canonical/sitemap bug from the audit). Locally it falls back to localhost.
 */
export const SERVER_URL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/+$/, '')
