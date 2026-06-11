import Script from 'next/script'

/**
 * Analytics loader — Google Analytics 4 only.
 *
 * GA4 is OFF until its ID is present, so this is safe to ship and "lights up" the moment the
 * env var is set (just the var + a rebuild):
 *   NEXT_PUBLIC_GA_ID  e.g. G-XXXXXXXXXX
 * Loads `afterInteractive` so it never blocks first paint / hurts the speed score.
 * (Microsoft Clarity was removed 2026-06-11 — re-add from git history if heatmaps are wanted later.)
 */
// GA4 — defaults to the live Nucleus Measurement ID; override via env if it ever changes.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-9WN6K3GHST'

export function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
    </>
  )
}
