/**
 * Client-side conversion tracking. Safe to call even when the pixels are dark (no IDs set yet) —
 * `fbq`/`ttq`/`gtag` simply won't exist, so each call is guarded and silently no-ops.
 * Call `trackLead()` after a successful lead/registration form submit.
 */
type Win = Window & {
  fbq?: (...args: unknown[]) => void
  ttq?: { track: (event: string, params?: Record<string, unknown>) => void }
  gtag?: (...args: unknown[]) => void
}

export function trackLead(formType?: string) {
  if (typeof window === 'undefined') return
  const w = window as Win
  const isRegistration = formType === 'registration'
  try {
    // Facebook / Meta — Lead for enquiries, CompleteRegistration for registrations.
    w.fbq?.('track', isRegistration ? 'CompleteRegistration' : 'Lead', { content_name: formType ?? 'lead' })
    // TikTok — SubmitForm / CompleteRegistration.
    w.ttq?.track(isRegistration ? 'CompleteRegistration' : 'SubmitForm', { content_type: formType ?? 'lead' })
    // GA4 — generate_lead is the standard recommended event.
    w.gtag?.('event', isRegistration ? 'sign_up' : 'generate_lead', { method: formType ?? 'lead' })
  } catch {
    // Tracking must never break the success UI.
  }
}
