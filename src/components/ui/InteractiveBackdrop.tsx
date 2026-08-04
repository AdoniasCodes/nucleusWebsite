'use client'

import { useEffect, useRef } from 'react'

/**
 * Decorative, mouse-reactive backdrop for dark brand bands: a faint woven brand texture
 * with an ochre→blue "nucleus" glow that follows the cursor.
 *
 * Performance-first by design: NO canvas, NO library, NO per-frame render loop:
 *  • one mousemove listener, rAF-throttled, writing just two CSS variables;
 *  • attached ONLY while the band is on screen (IntersectionObserver);
 *  • attached ONLY on fine-pointer + motion-allowed devices.
 * On mobile / reduced-motion the glow simply rests at its default position (pure CSS).
 */
export function InteractiveBackdrop() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const section = el?.parentElement
    if (!el || !section) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let mx = 50
    let my = 30
    const apply = () => {
      raf = 0
      el.style.setProperty('--mx', `${mx}%`)
      el.style.setProperty('--my', `${my}%`)
    }
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect()
      mx = ((e.clientX - r.left) / r.width) * 100
      my = ((e.clientY - r.top) / r.height) * 100
      if (!raf) raf = requestAnimationFrame(apply)
    }

    let listening = false
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !listening) {
        listening = true
        section.addEventListener('mousemove', onMove)
      } else if (!entry.isIntersecting && listening) {
        listening = false
        section.removeEventListener('mousemove', onMove)
      }
    })
    io.observe(section)

    return () => {
      io.disconnect()
      section.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="brand-weave absolute inset-0" />
      <div className="cursor-orb absolute inset-0" />
    </div>
  )
}
