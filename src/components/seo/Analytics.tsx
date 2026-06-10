import Script from 'next/script'

/**
 * Analytics loader — Google Analytics 4 + Microsoft Clarity.
 *
 * Both are OFF until their IDs are present, so this is safe to ship now and "lights up"
 * the moment the env vars are set (no redeploy of code needed, just the vars + a rebuild):
 *   NEXT_PUBLIC_GA_ID       e.g. G-XXXXXXXXXX
 *   NEXT_PUBLIC_CLARITY_ID  e.g. abcdefghij
 * Scripts load `afterInteractive` so they never block first paint / hurt the speed score.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID

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
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}
    </>
  )
}
