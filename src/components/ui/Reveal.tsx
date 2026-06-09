'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Subtle scroll-reveal: fades + lifts its child into view once. Respects reduced-motion
 * (renders immediately). `delay` (ms) staggers groups. Keep usage light — accents, not everywhere.
 */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
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
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${shown ? 'is-visible' : ''} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
