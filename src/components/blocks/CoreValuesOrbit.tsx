'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

type CoreValue = { iconName: string; title: string; description?: string }
export type CoreValuesOrbitProps = {
  blockType: 'coreValuesOrbit'
  eyebrow?: string
  heading?: string
  intro?: string
  values?: CoreValue[]
  bgImage?: string
}

const RADIUS = 35 // % of the (square) orbit container, from centre to each node (shorter arms)

/**
 * Core Values — VARIATION 2 "Nucleus Orbit": the six values orbit a glowing nucleus on a
 * dark brand band — hover (or focus) a value and its description reveals in the centre.
 * Embodies the brand name (Nucleus = atom). Desktop = orbit; mobile = clean list. The only
 * JS is a single hover-index state — no animation loop.
 */
export function CoreValuesOrbit(props: CoreValuesOrbitProps) {
  const values = props.values ?? []
  const n = values.length || 1
  const [active, setActive] = useState<number | null>(null)
  const current = active !== null ? values[active] : null

  return (
    <section
      className={`relative overflow-hidden py-[var(--spacing-section)] text-pale ${props.bgImage ? 'bg-navy' : 'orb-glow'}`}
    >
      {props.bgImage && (
        <>
          <div
            className="img-grade absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
            style={{ backgroundImage: `url(${props.bgImage})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/72 to-navy/88" aria-hidden />
        </>
      )}
      <Container className="relative">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          {props.eyebrow && (
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ochre">{props.eyebrow}</p>
          )}
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{props.heading}</h2>
          {props.intro && <p className="mt-4 text-lg text-pale/80">{props.intro}</p>}
        </div>

        {/* Desktop orbit */}
        <Reveal variant="scale" className="hidden lg:block">
          <div
            className="relative mx-auto aspect-square w-full max-w-[44rem]"
            onMouseLeave={() => setActive(null)}
          >
            {/* bond lines (centre → node) */}
            {values.map((_, i) => {
              const angle = -90 + (360 / n) * i
              return (
                <div
                  key={`line-${i}`}
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-px origin-left bg-gradient-to-r from-white/30 to-transparent"
                  style={{ width: `${RADIUS}%`, transform: `rotate(${angle}deg)` }}
                />
              )
            })}

            {/* central nucleus — opaque (orb-glow) so the bond lines hide beneath it */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-72 w-72 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/15 orb-glow p-8 text-center shadow-[0_0_90px_-20px_rgba(224,169,59,0.5)]">
              {current ? (
                <>
                  <p className="font-display text-2xl font-bold text-ochre">{current.title}</p>
                  <p className="mt-2 text-sm leading-snug text-pale/90">{current.description}</p>
                </>
              ) : (
                <>
                  <p className="font-display text-xl font-bold uppercase tracking-wide text-white">
                    {props.heading ?? 'Core Values'}
                  </p>
                  <p className="mt-1.5 text-sm text-pale/70">Hover a value to explore</p>
                </>
              )}
            </div>

            {/* value nodes around the ring */}
            {values.map((v, i) => {
              const deg = -90 + (360 / n) * i
              const rad = (deg * Math.PI) / 180
              const left = 50 + RADIUS * Math.cos(rad)
              const top = 50 + RADIUS * Math.sin(rad)
              const isActive = active === i
              return (
                <div key={i} className="absolute" style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%,-50%)' }}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`flex w-32 cursor-pointer flex-col items-center gap-2 rounded-2xl border p-4 text-center backdrop-blur-sm transition-all duration-200 ${
                      isActive
                        ? '-translate-y-0.5 border-ochre bg-white/15'
                        : 'border-white/12 bg-white/[0.06] hover:bg-white/10'
                    }`}
                  >
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full ${isActive ? 'bg-ochre/20' : 'bg-white/10'} text-ochre`}>
                      <Icon name={v.iconName} size={22} />
                    </span>
                    <span className="font-display text-sm font-bold text-white">{v.title}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* Mobile / tablet list */}
        <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
          {values.map((v, i) => (
            <Reveal key={i} variant="up" delay={i * 55}>
              <div className="flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-ochre">
                  <Icon name={v.iconName} size={22} />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">{v.title}</h3>
                  {v.description && <p className="mt-1 text-sm leading-relaxed text-pale/80">{v.description}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
