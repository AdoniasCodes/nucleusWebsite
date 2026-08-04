import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

/**
 * Summer Camp landing hero: a bright "bento mosaic": a headline card beside a 2×2 cluster of
 * real activity photos, so the variety of camp IS the hero. Deliberately different from the
 * homepage slider's split layout. Playful brand accents; white ground (camp = sunshine).
 */
type Tile = { src: string; label: string; pill: string }

const TILES: Tile[] = [
  { src: '/images/camp/hero-robotics.webp', label: 'Football', pill: 'bg-periwinkle text-white' },
  { src: '/images/camp/act-basketball.webp', label: 'Sport', pill: 'bg-coral text-white' },
  { src: '/images/camp/act-taekwondo.webp', label: 'Taekwondo', pill: 'bg-ochre text-navy' },
  { src: '/images/camp/act-chess.webp', label: 'Chess', pill: 'bg-teal text-white' },
]

export type SummerCampHeroProps = {
  blockType: 'summerCampHero'
  badge?: string
  eyebrow?: string
  heading?: string
  headingAccent?: string
  subhead?: string
  primaryLabel?: string
  primaryUrl?: string
  secondaryLabel?: string
  secondaryUrl?: string
  facts?: { icon: string; label: string }[]
  tiles?: Tile[]
}

const DEFAULT_FACTS = [
  { icon: 'CalendarCheck', label: 'July 6 – Aug 12' },
  { icon: 'MapPin', label: '2 campuses' },
  { icon: 'Sun', label: 'Ages 4–14' },
]

export function SummerCampHeroBlock({
  badge = 'Registration open · Summer 2026',
  eyebrow = 'Nucleus Summer Camp',
  heading = 'Where summer actually',
  headingAccent = 'means something.',
  subhead = 'Six weeks of robotics, sport, music, art and real discovery, led by qualified Cambridge educators on two secure Addis Ababa campuses.',
  primaryLabel = 'Reserve your child’s spot',
  primaryUrl = '#register',
  secondaryLabel = 'See the activities',
  secondaryUrl = '#activities',
  facts = DEFAULT_FACTS,
  tiles = TILES,
}: SummerCampHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(50% 55% at 92% 6%, rgba(224,169,59,0.12), transparent 60%), radial-gradient(45% 55% at 2% 100%, rgba(63,93,186,0.10), transparent 60%)',
        }}
      />
      <Container width="wide" className="relative">
        <div className="grid grid-cols-2 gap-3 py-8 sm:gap-4 sm:py-14 lg:grid-cols-4 lg:grid-rows-2 lg:h-[560px]">
          {/* Headline card */}
          <div className="col-span-2 flex flex-col justify-center rounded-[1.75rem] border border-navy/10 bg-gradient-to-br from-mist to-white p-6 shadow-[0_30px_70px_-40px_rgba(17,2,77,0.4)] sm:rounded-[2rem] sm:p-9 lg:row-span-2">
            {badge && (
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-ochre/15 px-4 py-1.5 font-display text-sm font-semibold text-ochre-600">
                <span className="h-2 w-2 animate-pulse rounded-full bg-ochre" /> {badge}
              </span>
            )}
            {eyebrow && (
              <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-ochre-600 sm:mt-5">{eyebrow}</p>
            )}
            <h1 className="mt-3 text-[2rem] font-bold leading-[1.05] text-navy sm:text-5xl sm:leading-[1.02] xl:text-6xl">
              {heading} <span className="text-ochre">{headingAccent}</span>
            </h1>
            {subhead && <p className="mt-4 max-w-lg text-base text-ink/75 sm:mt-5 sm:text-lg">{subhead}</p>}
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
              <ButtonLink href={primaryUrl} appearance="primary">
                {primaryLabel}
              </ButtonLink>
              <ButtonLink href={secondaryUrl} appearance="outline">
                {secondaryLabel}
              </ButtonLink>
            </div>
            {facts.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 sm:mt-7">
                {facts.map((f, i) => (
                  <li key={i} className="inline-flex items-center gap-1.5 font-display text-sm font-medium text-navy">
                    <Icon name={f.icon} size={17} className="text-ochre-600" />
                    {f.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 2×2 activity mosaic */}
          {tiles.map((t, i) => (
            <figure
              key={t.label}
              className={`group relative overflow-hidden rounded-2xl ${
                i >= 2 ? 'aspect-[4/3] lg:aspect-auto' : 'aspect-[4/3] lg:aspect-auto'
              }`}
            >
              <Image
                src={t.src}
                alt={t.label}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/45 to-transparent" />
              <figcaption
                className={`absolute left-3 top-3 rounded-full px-3 py-1 font-display text-xs font-semibold ${t.pill}`}
              >
                {t.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
