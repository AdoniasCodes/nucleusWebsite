import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section, type SectionBackground } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

/**
 * A photo strip of real camp moments — sport, martial arts, strategy, STEM — to make the
 * offer tangible and energetic. Synthetic block. Images live in /public/images/camp.
 */
type Moment = { src: string; label: string }

const MOMENTS: Moment[] = [
  { src: '/images/camp/act-basketball.webp', label: 'Basketball & team sport' },
  { src: '/images/camp/act-taekwondo.webp', label: 'Taekwondo' },
  { src: '/images/camp/act-chess.webp', label: 'Chess & strategy' },
  { src: '/images/camp/act-stem.webp', label: 'STEM & robotics' },
]

export type CampMomentsProps = {
  blockType: 'campMoments'
  background?: SectionBackground
  moments?: Moment[]
}

export function CampMomentsBlock({ background = 'white', moments = MOMENTS }: CampMomentsProps) {
  return (
    <Section background={background}>
      <Container width="wide">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {moments.map((m, i) => (
            <Reveal key={m.label} variant="up" delay={Math.min(i, 4) * 70}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={m.src}
                  alt={m.label}
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 font-display text-sm font-semibold text-white sm:text-base">
                  {m.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
