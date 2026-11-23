'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

const SLIDES = [
  { label: 'Campus', src: '/images/stock/gallery-campus.webp', alt: 'The Nucleus campus building at Vatican, Addis Ababa' },
  { label: 'Classrooms', src: '/images/stock/gallery-classroom.webp', alt: 'A bright Nucleus classroom with students at work' },
  { label: 'STEM & Robotics', src: '/images/newsletter/summer-camp-2026/week3-coding-tiles-explain.webp', alt: 'Children explaining a coding-tiles project together' },
  { label: 'Sports & Play', src: '/images/newsletter/summer-camp-2026/week2-football-duel.webp', alt: 'Children racing for the ball on the campus turf pitch' },
  { label: 'Art & Creativity', src: '/images/newsletter/summer-camp-2026/week4-art-group-table.webp', alt: 'Children painting together around a table' },
]

/**
 * Preview-only (homepage option D): the Campus Life band as a 5-photo carousel.
 * Native scroll-snap, so it swipes with a finger on phones; arrows and dots for desktop.
 */
export function CampusCarousel() {
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  const go = (i: number) => {
    const el = track.current
    if (!el) return
    const n = Math.max(0, Math.min(SLIDES.length - 1, i))
    el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <Section background="navy">
      <Container>
        <SectionHeading eyebrow="Moments at Nucleus" heading="Campus Life" dark />
        <div className="relative">
          <ul
            ref={track}
            onScroll={(e) => {
              const el = e.currentTarget
              setActive(Math.round(el.scrollLeft / el.clientWidth))
            }}
            className="flex snap-x snap-mandatory overflow-x-auto rounded-3xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Campus life photos"
          >
            {SLIDES.map((s, i) => (
              <li key={s.label} className="relative aspect-[4/3] w-full shrink-0 snap-center sm:aspect-[16/9]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1152px) 1088px, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 via-navy/25 to-transparent px-6 pb-6 pt-24 sm:px-9 sm:pb-8">
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ochre">A day at Nucleus</p>
                  <p className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">{s.label}</p>
                </div>
              </li>
            ))}
          </ul>
          {(['prev', 'next'] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(active + (d === 'next' ? 1 : -1))}
              disabled={d === 'prev' ? active === 0 : active === SLIDES.length - 1}
              aria-label={d === 'next' ? 'Next photo' : 'Previous photo'}
              className={`absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-navy/45 text-xl leading-none text-white backdrop-blur-sm transition hover:bg-navy/70 disabled:opacity-30 sm:flex ${d === 'next' ? 'right-4' : 'left-4'}`}
            >
              {d === 'next' ? '›' : '‹'}
            </button>
          ))}
        </div>
        <div className="mt-5 flex justify-center gap-2.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show photo ${i + 1}: ${s.label}`}
              aria-current={i === active}
              className={`h-2.5 rounded-full transition-all ${i === active ? 'w-8 bg-ochre' : 'w-2.5 bg-white/45 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
