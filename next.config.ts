import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

/**
 * Content-Security-Policy. Whitelists exactly the third parties this site loads (Google
 * reCAPTCHA v3 (google.com/gstatic.com), GA4 (googletagmanager/google-analytics), and Supabase
 * Storage media) and blocks everything else, plus clickjacking (frame-ancestors), <base> hijack
 * (base-uri), plugin/object embeds (object-src none) and off-site form posts (form-action).
 *
 * 'unsafe-inline'/'unsafe-eval' are required by Next's hydration scripts, the GA4 init snippet and
 * the Payload admin UI; full nonce-based CSP isn't compatible with the Payload admin, so this is the
 * strongest CSP that doesn't break the dashboard. img-src allows any https for CMS-managed images.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://www.google.com https://www.google-analytics.com https://region1.google-analytics.com https://*.supabase.co https://*.supabase.com",
  "frame-src 'self' https://www.google.com https://recaptcha.google.com",
  "worker-src 'self' blob:",
].join('; ')

// Baseline security headers (the audit flagged missing HSTS et al.). HSTS only takes
// effect over HTTPS, which Vercel serves. X-Frame SAMEORIGIN keeps Payload's live-preview
// iframe (same origin) working while blocking external framing/clickjacking.
const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // No `preload` on purpose: the cPanel email subdomains (mail./webmail.) must stay flexible,
  // and HSTS preload is effectively irreversible. includeSubDomains is safe (cPanel AutoSSL covers them).
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/images/**',
      },
      {
        // Hero poster (HeroBlock bgPoster) lives under /public/video, and Next 16 blocks any
        // local image path not explicitly allowed here.
        pathname: '/video/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
