'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Counts a number up from zero the first time it scrolls into view.
 * Only PURE numeric values animate — "160", "10,000+", "95%" → animate;
 * anything else ("8:1", "2–G8", "Cambridge") renders unchanged. Respects
 * prefers-reduced-motion (shows the final value instantly, no motion).
 */
export function CountUp({
  value,
  className = '',
  durationMs = 1500,
}: {
  value: string
  className?: string
  durationMs?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const match = value.trim().match(/^(\d[\d,]*)\s*([+%k]?)$/i)
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : null
  const suffix = match ? match[2] : ''
  const [n, setN] = useState(0)

  useEffect(() => {
    if (target === null || typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (t: number) => {
          const p = Math.min((t - start) / durationMs, 1)
          const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
          setN(Math.round(eased * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, durationMs])

  if (target === null) return <span className={className}>{value}</span>

  return (
    <span ref={ref} className={className}>
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
