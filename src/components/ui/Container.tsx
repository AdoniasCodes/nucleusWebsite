import type { ReactNode } from 'react'

const widths = {
  default: 'max-w-6xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-7xl',
} as const

/** Centered content column with consistent gutters. */
export function Container({
  children,
  width = 'default',
  className = '',
}: {
  children: ReactNode
  width?: keyof typeof widths
  className?: string
}) {
  return <div className={`mx-auto w-full px-5 sm:px-8 ${widths[width]} ${className}`}>{children}</div>
}
