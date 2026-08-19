import { ApplicationForm } from '@/components/admissions/ApplicationForm'
import {
  APPLICATION_VARIANTS,
  type ApplicationVariantKey,
} from '@/components/admissions/applicationVariants'
import { mintFormToken } from '@/lib/formToken'

/**
 * Synthetic block that drops the full admission application onto a page. Server component so the
 * signed form token is minted at render (same anti-bot contract as `formBlock`); the wizard
 * itself is a client component.
 *
 * `variant` picks a campus-locked version of the form: 'primary' registers for the Mekanisa Abo
 * Square campus (Preschool and KG), 'grade-school' for the Vatican campus (Grade 1 to Grade 8).
 * Without it the form shows every grade and lets the parent choose a campus.
 */
export type AdmissionApplicationProps = {
  blockType: 'admissionApplication'
  variant?: ApplicationVariantKey
}

export function AdmissionApplicationBlock({ variant }: AdmissionApplicationProps) {
  return (
    <ApplicationForm
      formToken={mintFormToken()}
      variant={variant ? APPLICATION_VARIANTS[variant] : undefined}
    />
  )
}
