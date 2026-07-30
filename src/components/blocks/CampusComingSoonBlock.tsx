'use client'

import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'

/**
 * A campus that is announced but not yet open — Totot, behind World Vision.
 *
 * Deliberately NOT part of the map block: there is no embed and no "Get directions", because a
 * parent following a pin to an unfinished building is exactly the outcome we want to avoid. The
 * section says where it is in words, and asks people not to come yet.
 *
 * The interaction is literal rather than decorative: the build track fills to the stage the work
 * has actually reached, the completed stages tick over one by one, and the current stage keeps a
 * slow pulse — so the section *shows* "nearly there, still being finished" rather than saying it.
 */

type Stage = { label: string; note: string; done: boolean }

const STAGES: Stage[] = [
  { label: 'Site & structure', note: 'Built and standing.', done: true },
  { label: 'Classrooms & services', note: 'Walls, wiring, water.', done: true },
  { label: 'Finishing touches', note: 'Paint, fittings, furniture — happening now.', done: false },
  { label: 'Doors open', note: 'We will announce the date here first.', done: false },
]

/** How far along the build is. Sits inside the third stage — nearly there, not there. */
const PROGRESS = 78

export type CampusComingSoonProps = { blockType: 'campusComingSoon' }

export function CampusComingSoonBlock(_props: CampusComingSoonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Reduced motion: show the finished state immediately, never animate the fill.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLive(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const currentIndex = STAGES.findIndex((s) => !s.done)

  return (
    <Section background="navy">
      <Container>
        <div ref={ref} className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-ochre/45 bg-ochre/10 px-3.5 py-1.5 font-display text-sm font-semibold text-ochre">
              <Icon name="HardHat" size={16} />
              Opening soon
            </span>
            <span className="font-display text-sm text-pale/60">Totot, behind World Vision, Addis Ababa</span>
          </div>

          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
            Our third campus is in its{' '}
            {/* The "wet paint" sweep is the finishing touch, applied to the words that name it. */}
            <span className={`campus-paint ${live ? 'is-painted' : ''}`}>final finishing</span>
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pale/80">
            The building is up and the classrooms are in. What is left is the part you can see —
            paint, fittings and furniture. We would rather show it to you finished, so there is no
            map pin here yet.
          </p>

          {/* Build track */}
          <div className="mt-10">
            <div
              className="h-2.5 w-full overflow-hidden rounded-full bg-white/12"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={PROGRESS}
              aria-label={`Totot campus build progress: ${PROGRESS} percent, currently ${STAGES[currentIndex]?.label.toLowerCase()}`}
            >
              <div
                className="campus-track h-full rounded-full bg-ochre"
                style={{ width: live ? `${PROGRESS}%` : '0%' }}
              />
            </div>

            <ol className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STAGES.map((stage, i) => {
                const isCurrent = i === currentIndex
                return (
                  <li
                    key={stage.label}
                    className={`rounded-xl border p-4 transition-colors duration-500 ${
                      stage.done
                        ? 'border-ochre/35 bg-white/[0.06]'
                        : isCurrent
                          ? 'border-ochre/60 bg-ochre/[0.09]'
                          : 'border-white/10 bg-transparent'
                    }`}
                    style={{ transitionDelay: live ? `${i * 160}ms` : '0ms' }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                          stage.done
                            ? 'bg-ochre text-navy'
                            : isCurrent
                              ? 'campus-pulse bg-ochre/25 text-ochre'
                              : 'bg-white/10 text-pale/45'
                        }`}
                        aria-hidden
                      >
                        {stage.done ? (
                          <Icon name="Check" size={14} strokeWidth={3} />
                        ) : (
                          <span className="text-xs font-bold">{i + 1}</span>
                        )}
                      </span>
                      <span
                        className={`font-display text-sm font-semibold ${
                          stage.done || isCurrent ? 'text-white' : 'text-pale/50'
                        }`}
                      >
                        {stage.label}
                      </span>
                    </div>
                    <p className={`mt-2 text-sm ${stage.done || isCurrent ? 'text-pale/70' : 'text-pale/40'}`}>
                      {stage.note}
                    </p>
                    {stage.done && <span className="sr-only">(complete)</span>}
                    {isCurrent && <span className="sr-only">(in progress)</span>}
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-white/10 pt-7">
            <a
              href="tel:0981999922"
              className="inline-flex min-h-[3rem] cursor-pointer items-center justify-center rounded-full bg-ochre px-7 py-3 font-display font-semibold text-navy transition-colors duration-200 hover:bg-ochre-600"
            >
              Ask about Totot
            </a>
            <p className="text-sm text-pale/60">
              Call 09 81 99 99 22 for opening dates and early registration. Please don’t visit the
              site yet — it is still a working build.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
