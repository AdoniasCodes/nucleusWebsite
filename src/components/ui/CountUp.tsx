'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Makes a stat value feel alive when it scrolls into view:
 *  • PURE numbers ("160", "10,000+", "95%") count UP from zero;
 *  • everything else ("Cambridge", "2–G8", "8:1") reveals letter-by-letter.
 * One IntersectionObserver, fires once. SSR renders the plain value (no hydration
 * mismatch, never invisible without JS). Respects prefers-reduced-motion.
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
  const [mounted, setMounted] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (target !== null) setN(target)
      setRevealed(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setRevealed(true)
        if (target !== null) {
          const start = performance.now()
          const tick = (t: number) => {
            const p = Math.min((t - start) / durationMs, 1)
            setN(Math.round((1 - Math.pow(1 - p, 3)) * target))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [mounted, target, durationMs])

  // Numbers → count up
  if (target !== null) {
    return (
      <span ref={ref} className={className}>
        {n.toLocaleString('en-US')}
        {suffix}
      </span>
    )
  }

  // SSR / pre-hydration → plain visible text (safe, indexable, never hidden without JS)
  if (!mounted) return <span className={className}>{value}</span>

  // Text → staggered per-letter reveal
  return (
    <span ref={ref} className={className} aria-label={value}>
      {[...value].map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block"
          style={revealed ? { animation: `fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.035}s both` } : { opacity: 0 }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}
