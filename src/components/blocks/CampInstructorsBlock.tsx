import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/**
 * "Meet your child's camp instructors" — transparency/trust section for the Summer Camp
 * landing page. Real, qualified educators (not seasonal babysitters). Compact photo cards.
 * Synthetic block. Instructor data is inline (camp roster is seasonal, not the year-round staff).
 */
type Instructor = {
  name: string
  role: string
  photo: string
  bio: string
}

const INSTRUCTORS: Instructor[] = [
  {
    name: 'Mandefro Melaku',
    role: 'Athletic Director and Summer Camp Director',
    photo: '/images/team/mandefro-melaku.webp',
    bio: 'MBA, BSc in Sport Science and a CAF D coaching licence. Nucleus Athletic Director with over 10 years in physical education and youth development, he designs safe, active, Cambridge-aligned camp days.',
  },
  {
    name: 'Ruth Derrick',
    role: 'English & Language Lead',
    photo: '/images/camp/ruth-derrick.webp',
    bio: 'Associate Director of Global Partners for Education with a Master’s in English. Has taught at university level across Asia and Africa — here to build campers’ communication and confidence.',
  },
  {
    name: 'Alice Long',
    role: 'Creative & Fine Arts Lead',
    photo: '/images/camp/alice-long.webp',
    bio: 'A fine-arts educator specialising in hands-on, sensory-rich projects — painting, clay and mixed-media — that let every child truly “Create Boldly.”',
  },
  {
    name: 'Abby',
    role: 'Music & Rhythm Lead',
    photo: '/images/camp/abby.webp',
    bio: 'Holds a degree in Keyboard Pedagogy, teaches piano and directs children’s choirs. Leads vocal, rhythm and keyboard workshops for every age group.',
  },
  {
    name: 'Madelyn',
    role: 'Early-Years Vocal & Rhythm Specialist',
    photo: '/images/camp/madelyn.webp',
    bio: 'Madelyn specialises in early-years vocal and rhythm training, guiding our youngest campers through playful, high-energy workshops that build coordination, confidence and a pure joy for music.',
  },
]

export type CampInstructorsProps = {
  blockType: 'campInstructors'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  instructors?: Instructor[]
}

export function CampInstructorsBlock({
  background = 'offwhite',
  eyebrow = 'Who’s Leading Camp',
  heading = 'Real educators. Not babysitters.',
  intro = 'Every activity is led by a qualified specialist who does this for a living — so your child is learning, safe and genuinely inspired all summer.',
  instructors = INSTRUCTORS,
}: CampInstructorsProps) {
  const dark = isDark(background)
  return (
    <Section background={background}>
      <Container>
        <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} dark={dark} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {instructors.map((p, i) => (
            <Reveal key={p.name} variant="up" delay={Math.min(i, 4) * 80} className="h-full">
              <article className="flex h-full flex-row overflow-hidden rounded-2xl border border-navy/[0.08] bg-white shadow-[0_1px_3px_rgba(17,2,77,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_-22px_rgba(17,2,77,0.3)] sm:flex-col">
                {/* Mobile: compact side photo (fills card height). sm+: full-width portrait on top. */}
                <div className="relative w-[7.5rem] shrink-0 self-stretch overflow-hidden bg-gradient-to-b from-mist to-pale sm:aspect-[4/5] sm:w-full sm:self-auto">
                  {p.photo ? (
                    <Image
                      src={p.photo}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 120px, (max-width: 1024px) 45vw, 220px"
                      className="object-cover object-top [filter:saturate(1.06)_contrast(1.02)]"
                    />
                  ) : (
                    // No photo yet — show tasteful brand initials instead of a broken image.
                    <span className="flex h-full w-full items-center justify-center font-display text-4xl font-bold text-navy/35">
                      {p.name
                        .split(' ')
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="font-display text-lg font-bold text-navy">{p.name}</h3>
                  <p className="mt-0.5 font-display text-sm font-semibold text-ochre-600">{p.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
