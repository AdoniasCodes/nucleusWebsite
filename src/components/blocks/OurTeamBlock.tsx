'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/**
 * "Our Team" — a badge/arch-framed portrait grid (the brand's shield-arch photo device).
 * Each card opens an accessible bio modal (Esc / backdrop / close, scroll-locked, focus-managed).
 * Content is inline for now; can migrate to the `staff` collection for admin editing later.
 * Client component (modal state). Synthetic block.
 */
import { TEAM, type TeamMember } from './teamData'

export { TEAM, type TeamMember }

export type OurTeamProps = {
  blockType: 'ourTeam'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  /** CMS-managed roster (from the `staff` collection). Falls back to TEAM when absent/empty. */
  members?: TeamMember[]
}

export function OurTeamBlock({
  background = 'offwhite',
  eyebrow = 'The People of Nucleus',
  heading = 'Meet the team behind the promise',
  intro = 'Leaders, educators and specialists who make Nucleus a place where children truly thrive.',
  members,
}: OurTeamProps) {
  const team = members && members.length > 0 ? members : TEAM
  const [active, setActive] = useState<TeamMember | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [active])

  const open = (m: TeamMember, el: HTMLElement) => {
    lastFocus.current = el
    setActive(m)
  }
  const close = () => {
    setActive(null)
    lastFocus.current?.focus()
  }

  return (
    <Section background={background}>
      <Container>
        <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.id} variant="up" delay={Math.min(i, 5) * 70} className="h-full">
              <button
                type="button"
                onClick={(e) => open(m, e.currentTarget)}
                className="group w-full text-left"
                aria-label={`Read ${m.name}’s bio`}
              >
                <div className="flex h-full flex-col items-center rounded-[20px] border border-navy/[0.08] bg-white p-4 pb-6 text-center shadow-[0_1px_3px_rgba(17,2,77,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-ochre/50 hover:shadow-[0_22px_44px_-22px_rgba(17,2,77,0.34)] motion-safe:active:scale-[0.99]">
                  <div className="relative aspect-[4/4.6] w-full max-w-[220px] overflow-hidden rounded-[130px_130px_20px_20px] border border-navy/[0.08] bg-gradient-to-b from-mist to-pale [box-shadow:inset_0_0_0_4px_#fff]">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 220px"
                      className="object-cover object-top [filter:saturate(1.07)_contrast(1.03)]"
                    />
                  </div>
                  <div className="mt-4 font-display text-[1.05rem] font-bold text-navy">{m.name}</div>
                  <div className="mt-0.5 font-display text-sm font-semibold text-ochre-600">{m.role}</div>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-display text-xs font-semibold text-navy/50 transition-opacity duration-200 group-hover:text-navy">
                    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-ochre text-sm leading-none text-navy">+</span>
                    View bio
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-name"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(9,4,28,0.62)] p-4 backdrop-blur-sm sm:p-6"
          onClick={close}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white text-ink shadow-[0_40px_90px_-30px_rgba(9,4,28,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close bio"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg text-navy shadow-[0_4px_12px_rgba(17,2,77,0.2)] transition-colors hover:bg-ochre"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-[14rem_1fr]">
              <div className="relative h-[50vh] min-h-[320px] bg-gradient-to-b from-mist to-pale sm:h-auto sm:min-h-[240px]">
                <Image
                  src={active.photo}
                  alt={active.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 14rem"
                  className="object-cover object-[center_20%]"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 id="team-modal-name" className="font-display text-2xl font-bold text-navy">
                  {active.name}
                </h3>
                <div className="mt-1 font-display text-sm font-semibold text-ochre-600">{active.role}</div>
                <span className="mt-3 inline-block rounded-full bg-mist px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.05em] text-navy">
                  {active.dept}
                </span>
                <div className="mt-4 space-y-3 text-[0.98rem] leading-relaxed text-ink/80">
                  {active.bio.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
