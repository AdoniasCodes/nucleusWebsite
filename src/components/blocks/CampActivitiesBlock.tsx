'use client'

import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'

/**
 * Camp activities as a horizontal snap-CAROUSEL (10 cards), more dynamic than a static grid.
 * Swipe on touch; prev/next arrows on desktop. Client component (scroll control). Synthetic block.
 */
type Activity = { icon: string; title: string; description: string }

const ACTIVITIES: Activity[] = [
  { icon: 'FlaskConical', title: 'STEM Labs', description: 'Hands-on experiments that make science click.' },
  { icon: 'Bot', title: 'Robotics', description: 'Build and program real robots: the skill of the future.' },
  { icon: 'Crown', title: 'Chess', description: 'Patience, strategy and focus, one move at a time.' },
  { icon: 'Palette', title: 'Arts & Crafts', description: 'Paint, clay and mixed-media: room to Create Boldly.' },
  { icon: 'Music', title: 'Music Wing', description: 'Voice, rhythm and keyboard for every level.' },
  { icon: 'Swords', title: 'Taekwondo', description: 'Discipline, respect and confidence on the mat.' },
  { icon: 'Trophy', title: 'Football', description: 'Coached drills, teamwork and plenty of match play.' },
  { icon: 'Target', title: 'Basketball', description: 'Skills, agility and the joy of playing together.' },
  { icon: 'Volleyball', title: 'Volleyball', description: 'Communication and coordination, rally by rally.' },
  { icon: 'Wind', title: 'Kites & Paper Planes', description: 'Design, build and fly: physics you can feel.' },
]

export type CampActivitiesProps = {
  blockType: 'campActivities'
  background?: SectionBackground
  anchor?: string
  eyebrow?: string
  heading?: string
  intro?: string
  activities?: Activity[]
}

export function CampActivitiesBlock({
  background = 'offwhite',
  anchor,
  eyebrow = 'What They’ll Do',
  heading = 'Ten ways to spend a brilliant summer',
  intro = 'A full, balanced week of mind, body and imagination. Children rotate through hands-on activities led by specialists, not screens.',
  activities = ACTIVITIES,
}: CampActivitiesProps) {
  const track = useRef<HTMLDivElement>(null)
  const dark = isDark(background)

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.getBoundingClientRect().width + 16 : 300
    el.scrollBy({ left: dir * step * Math.max(1, Math.floor(el.clientWidth / step) - 1), behavior: 'smooth' })
  }

  const arrow =
    'flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-ochre hover:bg-ochre hover:text-navy disabled:opacity-40'

  return (
    <Section background={background} id={anchor}>
      <Container width="wide">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className={`font-display text-sm font-semibold uppercase tracking-[0.16em] ${dark ? 'text-ochre' : 'text-ochre-600'}`}>
                {eyebrow}
              </p>
            )}
            {heading && <h2 className={`mt-3 text-3xl sm:text-4xl ${dark ? 'text-white' : 'text-navy'}`}>{heading}</h2>}
            {intro && <p className={`mt-4 text-lg ${dark ? 'text-pale/80' : 'text-ink/70'}`}>{intro}</p>}
          </div>
          <div className="hidden gap-3 sm:flex">
            <button type="button" aria-label="Previous activities" className={arrow} onClick={() => scroll(-1)}>
              <span className="text-xl leading-none">‹</span>
            </button>
            <button type="button" aria-label="Next activities" className={arrow} onClick={() => scroll(1)}>
              <span className="text-xl leading-none">›</span>
            </button>
          </div>
        </div>

        <div
          ref={track}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {activities.map((a) => (
            <article
              data-card
              key={a.title}
              className="group flex w-[248px] shrink-0 snap-start flex-col rounded-2xl border border-navy/[0.08] bg-white p-6 shadow-[0_1px_3px_rgba(17,2,77,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-ochre/50 hover:shadow-[0_18px_40px_-20px_rgba(17,2,77,0.28)] sm:w-[268px]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/[0.06] text-navy transition-colors group-hover:bg-ochre/15 group-hover:text-ochre-600">
                <Icon name={a.icon} size={26} />
              </div>
              <h3 className="text-lg font-bold text-navy">{a.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/65">{a.description}</p>
            </article>
          ))}
          {/* trailing spacer so the last card can snap fully into view */}
          <span aria-hidden className="w-1 shrink-0 sm:w-5" />
        </div>
      </Container>
    </Section>
  )
}
