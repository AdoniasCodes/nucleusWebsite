'use client'

import { useCallback, useEffect } from 'react'

/**
 * Loads Google reCAPTCHA v3 (invisible) once and returns an `executeRecaptcha(action)` that
 * mints a fresh, short-lived token at submit time. v3 has no checkbox — zero friction for the
 * parent. The token is verified server-side in the form action (see lib/recaptcha.ts).
 *
 * If NEXT_PUBLIC_RECAPTCHA_SITE_KEY is absent (local dev), this is a no-op that returns '' —
 * the server then skips verification, so forms still work without keys.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const SCRIPT_ID = 'recaptcha-v3'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, opts: { action: string }) => Promise<string>
    }
  }
}

export function useRecaptcha() {
  useEffect(() => {
    if (!SITE_KEY || typeof document === 'undefined') return
    if (document.getElementById(SCRIPT_ID)) return
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.async = true
    document.head.appendChild(script)
  }, [])

  const executeRecaptcha = useCallback(async (action: string): Promise<string> => {
    if (!SITE_KEY || typeof window === 'undefined' || !window.grecaptcha) return ''
    try {
      await new Promise<void>((resolve) => window.grecaptcha!.ready(() => resolve()))
      return await window.grecaptcha!.execute(SITE_KEY, { action })
    } catch {
      // If grecaptcha throws, return '' — server fails open so the parent isn't blocked.
      return ''
    }
  }, [])

  return { executeRecaptcha }
}
