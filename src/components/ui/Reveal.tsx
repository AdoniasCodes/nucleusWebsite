'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale' | 'blur'

/**
 * Scroll-reveal wrapper: animates its child into view once, when scrolled near.
 * Pick a `variant` for the motion (fade-up, slide-in, scale, blur). `delay` (ms)
 * staggers groups. Respects prefers-reduced-motion (renders instantly, no motion).
 * Transition-based so variants compose cleanly; see `.reveal-*` rules in styles.css.
 */
export function Reveal({
  children,
  delay = 0,
  variant = 'up',
  once = true,
  className = '',
}: {
  children: ReactNode
  delay?: number
  variant?: RevealVariant
  once?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          if (once) io.disconnect()
        } else if (!once) {
          setShown(false)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${shown ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
