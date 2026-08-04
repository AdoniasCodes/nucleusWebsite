import Image from 'next/image'
import type { ReactNode } from 'react'
import type { GalleryBlockType, Gallery } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Media } from '@/components/ui/Media'
import { Orb } from '@/components/ui/Orb'
import { Reveal } from '@/components/ui/Reveal'
import { getPayloadClient } from '@/lib/payload'

// TEMP demo stock: swap for real campus photos once provided (open-questions.md Q13).
const PLACEHOLDERS = [
  { label: 'Campus', src: '/images/stock/gallery-campus.webp' },
  { label: 'Classrooms', src: '/images/stock/gallery-classroom.webp' },
  { label: 'STEM & Robotics', src: '/images/stock/gallery-stem.webp' },
  { label: 'Sports & Play', src: '/images/stock/gallery-sports.webp' },
]

// Shield/badge silhouette: the brand's most ownable device, used as photo frames.
const SHIELD = 'polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)'
const TINTS = ['bg-teal', 'bg-periwinkle', 'bg-grass', 'bg-ochre', 'bg-coral', 'bg-navy-500']

type Slide = { key: string; label: string; render: (cls: string) => ReactNode }

export async function GalleryBlock(props: GalleryBlockType) {
  let items: Gallery[] = []

  if (props.source === 'manual') {
    items = (props.items ?? []).filter((i): i is Gallery => typeof i === 'object')
  } else {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'gallery',
      where: props.category ? { category: { equals: props.category } } : {},
      // Featured first: the first item takes the big cinematic slot, so the "featured"
      // checkbox in the admin decides which photo leads the band.
      sort: ['-featured', 'createdAt'],
      limit: props.limit ?? 8,
      depth: 1,
    })
    items = res.docs
  }

  // Normalize CMS items and demo placeholders into one list so a single editorial
  // layout renders both. First slide = cinematic featured image; rest = shield row.
  const slides: Slide[] =
    items.length > 0
      ? items.map((item, i) => ({
          key: String(item.id ?? i),
          label: item.title ?? '',
          render: (cls) =>
            item.image && typeof item.image === 'object' ? (
              <Media resource={item.image} fill className={cls} sizes="(max-width:1024px) 100vw, 50vw" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Orb size={64} />
              </div>
            ),
        }))
      : PLACEHOLDERS.map((ph, i) => ({
          key: String(i),
          label: ph.label,
          render: (cls) => (
            <Image src={ph.src} alt={ph.label} fill className={cls} sizes="(max-width:1024px) 100vw, 50vw" />
          ),
        }))

  if (slides.length === 0) return null

  const [featured, ...rest] = slides

  return (
    <Section background="navy">
      <Container>
        <SectionHeading eyebrow="Moments at Nucleus" heading={props.heading ?? 'Campus Life'} dark />

        {/* Featured: a single large, cinematic frame with the caption laid over it. */}
        <Reveal variant="scale">
          <figure className="group relative aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[21/9]">
            {featured.render('img-grade img-drift object-cover')}
            <div className="photo-scrim absolute inset-0" aria-hidden />
            <figcaption className="absolute bottom-0 left-0 p-6 sm:p-9">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-ochre">
                A day at Nucleus
              </p>
              <p className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">{featured.label}</p>
            </figcaption>
          </figure>
        </Reveal>

        {/* Supporting: shield-framed, brand-graded, with a colour-pop on hover. */}
        {rest.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-5 sm:gap-7">
            {rest.map((slide, i) => (
              <Reveal
                key={slide.key}
                variant="scale"
                delay={(i % 4) * 90}
                className="w-[calc(50%-0.625rem)] max-w-[20rem] sm:w-[calc(50%-0.875rem)] lg:w-[calc(25%-1.3125rem)]"
              >
                <figure className="group">
                  <div
                    className={`relative aspect-[4/5] overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.04] ${TINTS[i % TINTS.length]}`}
                    style={{ clipPath: SHIELD }}
                  >
                    {slide.render('img-grade object-cover')}
                  </div>
                  <figcaption className="mt-3 text-center font-display text-sm font-medium text-pale/85">
                    {slide.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
