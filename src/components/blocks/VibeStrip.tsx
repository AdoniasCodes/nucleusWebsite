import Image from 'next/image'
import { Container } from '@/components/ui/Container'

const BASE = '/images/newsletter/summer-camp-2026/'
const TILES = [
  { word: 'Playing', src: 'week2-football-duel.webp', alt: 'Children racing for the ball on the Nucleus turf pitch' },
  { word: 'Learning', src: 'week3-coding-tiles-explain.webp', alt: 'Children building and explaining a coding-tiles project together' },
  { word: 'Laughing', src: 'week1-dance-joy.webp', alt: 'Children dancing and laughing together in a Nucleus classroom' },
]

/** Preview-only band for homepage variant B: three big, full-colour photos straight under the hero. */
export function VibeStrip() {
  return (
    <section className="vibe-strip bg-white py-10 sm:py-14">
      <Container>
        <h2 className="text-center font-display text-3xl font-bold text-navy sm:text-4xl">
          Playing. Learning. <span className="text-ochre-600">Laughing.</span>
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {TILES.map((t) => (
            <li key={t.word} className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[4/5]">
              <Image
                src={BASE + t.src}
                alt={t.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent px-5 pb-4 pt-12 font-display text-2xl font-bold text-white">
                {t.word}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
