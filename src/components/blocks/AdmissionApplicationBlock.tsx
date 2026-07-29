import { ApplicationForm } from '@/components/admissions/ApplicationForm'
import { mintFormToken } from '@/lib/formToken'

/**
 * Synthetic block that drops the full admission application onto a page. Server component so the
 * signed form token is minted at render (same anti-bot contract as `formBlock`); the wizard
 * itself is a client component.
 */
export type AdmissionApplicationProps = { blockType: 'admissionApplication' }

export function AdmissionApplicationBlock(_props: AdmissionApplicationProps) {
  return <ApplicationForm formToken={mintFormToken()} />
}
