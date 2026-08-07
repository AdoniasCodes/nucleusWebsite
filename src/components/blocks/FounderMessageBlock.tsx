import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/**
 * "A Message From Our Founders": a paired diptych of the two founders (a father's
 * vision + an engineer-mother's precision), each a warm white card with a portrait
 * cutout floating on a soft pale glow. Light ground by design (the site already leans
 * hard on navy elsewhere: this section stays airy). Synthetic block.
 */
export type Founder = {
  name: string
  title: string
  photo: string
  width: number
  height: number
  paragraphs: string[]
}

export type FounderMessageProps = {
  blockType: 'founderMessage'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  founders?: Founder[]
}

const DEFAULT_FOUNDERS: Founder[] = [
  {
    name: 'Ato Asfaw G/Hiwot',
    title: 'Founder',
    photo: '/images/founders/asfaw.webp',
    width: 1198,
    height: 1500,
    paragraphs: [
      'Nucleus International School was born out of love, a love for our four children, and a deep belief that every child deserves an education that sees the whole person, not just the student.',
      'Three years ago we opened our Cambridge-certified preschool at Abo Mekanisa. What began there has grown into a full Preschool-to-Grade-8 school teaching the international Cambridge curriculum at our Vatican campus, and we are only just beginning.',
    ],
  },
  {
    name: 'Engineer Demitu Feyisa',
    title: 'Co-Founder',
    photo: '/images/founders/demitu.webp',
    width: 1200,
    height: 1355,
    paragraphs: [
      'To be a mother of four and an engineer is to understand that the strongest structures are built on a foundation of absolute love. Every detail of this campus we perfect is for our children.',
      'When we welcomed our first preschool families, I made a quiet promise: to build a complete, world-class academic sanctuary where their children could grow safely, all the way through their school years. Our Vatican campus is that promise kept.',
    ],
  },
]

// Soft "whitish" glow behind each portrait cutout, white → pale, with a faint ochre warmth.
const portraitGlow =
  'radial-gradient(68% 56% at 50% 20%, rgba(224,169,59,0.13), transparent 60%), linear-gradient(180deg, #ffffff 0%, var(--color-mist) 55%, var(--color-pale) 100%)'

export function FounderMessageBlock({
  background = 'offwhite',
  eyebrow = 'A Message From Our Founders',
  heading = 'Nucleus was born out of love.',
  intro = 'A husband-and-wife team, a father’s vision and an engineer-mother’s precision, built Nucleus for their own four children first.',
  founders = DEFAULT_FOUNDERS,
}: FounderMessageProps) {
  return (
    <Section background={background}>
      <Container>
        <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {founders.map((f, i) => (
            <Reveal key={f.name} variant={i === 0 ? 'left' : 'right'} delay={i * 90} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-navy/[0.08] bg-white p-4 shadow-[0_10px_40px_-24px_rgba(17,2,77,0.35)] sm:p-6">
                <div
                  className="relative flex items-end justify-center overflow-hidden rounded-2xl border border-navy/[0.06]"
                  style={{ backgroundImage: portraitGlow }}
                >
                  <Image
                    src={f.photo}
                    alt={f.name}
                    width={f.width}
                    height={f.height}
                    sizes="(max-width: 768px) 90vw, 42vw"
                    className="h-auto w-full max-w-[340px] drop-shadow-[0_20px_34px_rgba(17,2,77,0.24)]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-2 pt-6 sm:px-3">
                  <span aria-hidden className="font-display text-5xl leading-[0.4] text-ochre">“</span>
                  <div className="mt-4 flex-1 space-y-4 text-ink/80">
                    {f.paragraphs.map((p, j) => (
                      <p key={j} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="mt-6">
                    <div className="font-body text-2xl italic text-navy">{f.name}</div>
                    <div className="mt-1 h-0.5 w-28 rounded bg-ochre" />
                    <div className="mt-2 font-display text-xs font-semibold uppercase tracking-[0.12em] text-ochre-600">
                      {f.title}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
