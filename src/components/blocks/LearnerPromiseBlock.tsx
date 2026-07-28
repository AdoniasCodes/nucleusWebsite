'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/**
 * "The Nucleus Promise" statement band (About page, before the team grid).
 * The five Cambridge learner attributes render as interactive pairs inside one
 * large statement. Three behaviors: words rise in with a masked stagger on first
 * view; an ochre "reading light" follows the cursor through the text (a duplicate
 * overlay clipped to a circle at the pointer, so the glow sweeps across words);
 * hovering a pair ignites it and dims the rest, and while idle the pairs take
 * turns lighting up so the section still performs on touch devices.
 */

export type LearnerPromiseProps = {
  blockType: 'learnerPromise'
  eyebrow?: string
  intro?: string
}

const PAIRS: { attribute: string; domain: string }[] = [
  { attribute: 'Confident', domain: 'in learning.' },
  { attribute: 'Responsible', domain: 'in action.' },
  { attribute: 'Reflective', domain: 'in growth.' },
  { attribute: 'Innovative', domain: 'in thinking.' },
  { attribute: 'Engaged', domain: 'with the world.' },
]

/** A run of words, each in its own overflow-hidden riser for the entrance stagger. */
function Risers({ text, from }: { text: string; from: number }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={i}>
          <span className="promise-riser">
            <span className="promise-word" style={{ ['--d' as string]: `${(from + i) * 60}ms` }}>
              {word}
            </span>
          </span>{' '}
        </span>
      ))}
    </>
  )
}

/** The statement itself. Rendered twice: the real layer and the clipped light layer. */
function Statement({ active, onHover }: { active: number; onHover?: (i: number) => void }) {
  return (
    <>
      {PAIRS.map((pair, i) => (
        <span
          key={pair.attribute}
          className={`promise-pair ${active === i ? 'is-active' : ''}`}
          onMouseEnter={onHover ? () => onHover(i) : undefined}
        >
          <span className="promise-attr">
            <Risers text={pair.attribute} from={i * 4} />
          </span>{' '}
          <span className="promise-domain">
            <Risers text={pair.domain} from={i * 4 + 1} />
          </span>{' '}
        </span>
      ))}
    </>
  )
}

export function LearnerPromiseBlock({
  eyebrow = 'The Nucleus Promise',
  intro = 'At Nucleus International Schools, we empower every child to be',
}: LearnerPromiseProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(-1)
  const [inView, setInView] = useState(false)
  const hovering = useRef(false)

  // Entrance + idle cycle both key off first visibility.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Idle cycle: pairs take turns while visible and unhovered. Skipped for reduced motion.
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (!hovering.current) setActive((a) => (a + 1) % PAIRS.length)
    }, 2600)
    return () => clearInterval(id)
  }, [inView])

  // Reading light: pointer coords relative to the statement stage, rAF-throttled.
  // Only wired for fine pointers that can hover.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const rect = stage.getBoundingClientRect()
        stage.style.setProperty('--cx', `${e.clientX - rect.left}px`)
        stage.style.setProperty('--cy', `${e.clientY - rect.top}px`)
      })
    }
    const onLeave = () => {
      stage.style.removeProperty('--cx')
      stage.style.removeProperty('--cy')
    }
    stage.addEventListener('mousemove', onMove)
    stage.addEventListener('mouseleave', onLeave)
    return () => {
      stage.removeEventListener('mousemove', onMove)
      stage.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const statementClass =
    'max-w-5xl font-display text-[2rem] leading-[1.22] font-bold sm:text-5xl sm:leading-[1.18]'

  return (
    <section
      ref={sectionRef}
      className={`promise-band relative overflow-hidden bg-gradient-to-b from-mist/60 via-white to-white py-20 sm:py-24 ${inView ? 'is-inview' : ''}`}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="font-display text-sm font-semibold tracking-[0.22em] text-ochre-600 uppercase">
            {eyebrow}
          </p>
          <Image
            src="/images/nucleus-cambridge-logo.webp"
            alt="Nucleus International Schools and Cambridge International Education"
            width={1206}
            height={243}
            className="h-10 w-auto sm:h-12"
          />
        </div>

        <p className="mt-10 max-w-3xl font-display text-lg text-ink/60 sm:text-xl">{intro}</p>

        <div ref={stageRef} className="promise-stage relative mt-4">
          <p className={`promise-statement ${statementClass}`}>
            <Statement active={active} onHover={setActive} />
          </p>
          <p aria-hidden className={`promise-light ${statementClass}`}>
            <Statement active={active} />
          </p>
        </div>

        <p className="mt-6 font-display text-xs tracking-wide text-ink/45">
          The five attributes of the Cambridge learner, lived daily at Nucleus.
        </p>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-navy/10 pt-6">
          <p className="font-display text-base font-semibold text-navy">
            Nucleus International Schools
          </p>
          <p className="font-display text-base font-semibold tracking-wide">
            <span className="text-ochre-600">Think.</span>{' '}
            <span className="text-ochre-600">Create.</span>{' '}
            <span className="text-ochre-600">Solve.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
