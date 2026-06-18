import Script from 'next/script'

/**
 * Analytics + marketing pixels. Each tag is independent and stays DARK until its ID is present,
 * so this is safe to ship and "lights up" the moment the env var is set (var + a rebuild):
 *   NEXT_PUBLIC_GA_ID            e.g. G-XXXXXXXXXX   (Google Analytics 4)
 *   NEXT_PUBLIC_FB_PIXEL_ID      e.g. 123456789012345 (Facebook / Meta Pixel)
 *   NEXT_PUBLIC_TIKTOK_PIXEL_ID  e.g. CXXXXXXXXXXXXXXXXXXX (TikTok Pixel)
 * Everything loads `afterInteractive` so it never blocks first paint / hurts the speed score.
 * A standard PageView fires on load; the lead/registration forms fire a conversion event via
 * `src/lib/pixels.ts` (`trackLead`) on successful submit.
 * (Microsoft Clarity was removed 2026-06-11 — re-add from git history if heatmaps are wanted later.)
 */
// GA4 — defaults to the live Nucleus Measurement ID; override via env if it ever changes.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-9WN6K3GHST'
// Marketing pixels — OFF until Eyoel adds the IDs (env or hardcode default here, like GA4 above).
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || ''
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || ''

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

      {FB_PIXEL_ID && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,
'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}

      {TIKTOK_PIXEL_ID && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var i=d.createElement("script");i.type="text/javascript",i.async=!0,i.src=r+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(i,a)};ttq.load('${TIKTOK_PIXEL_ID}');ttq.page();}(window,document,'ttq');`}
        </Script>
      )}
    </>
  )
}
