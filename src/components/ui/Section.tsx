import type { ReactNode } from 'react'

export type SectionBackground = 'white' | 'offwhite' | 'mist' | 'purple' | 'navy'

/**
 * The section background system shared by every block. "purple" is the brand
 * emphasis band — rendered as the navy orb-glow gradient (the brand has no
 * literal purple; the orb motif is the emphasis device). Dark backgrounds get
 * light text automatically.
 */
const styles: Record<SectionBackground, string> = {
  white: 'bg-white text-ink',
  offwhite: 'bg-offwhite text-ink',
  mist: 'bg-mist text-ink',
  navy: 'bg-navy text-pale',
  purple: 'orb-glow text-pale',
}

export const isDark = (bg: SectionBackground) => bg === 'navy' || bg === 'purple'

export function Section({
  children,
  background = 'white',
  className = '',
  id,
}: {
  children: ReactNode
  background?: SectionBackground
  className?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={`py-[var(--spacing-section)] ${styles[background] ?? styles.white} ${className}`}
    >
      {children}
    </section>
  )
}
