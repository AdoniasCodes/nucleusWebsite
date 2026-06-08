import Image from 'next/image'
import type { GalleryBlockType, Gallery } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Media } from '@/components/ui/Media'
import { Orb } from '@/components/ui/Orb'
import { getPayloadClient } from '@/lib/payload'

// TEMP demo stock — swap for real campus photos once provided (open-questions.md Q13).
const PLACEHOLDERS = [
  { label: 'Campus', src: '/images/stock/gallery-campus.jpg' },
  { label: 'Classrooms', src: '/images/stock/gallery-classroom.jpg' },
  { label: 'STEM & Robotics', src: '/images/stock/gallery-stem.jpg' },
  { label: 'Sports & Play', src: '/images/stock/gallery-sports.jpg' },
]

// Shield/badge silhouette — the brand's most ownable device, used as photo frames.
const SHIELD = 'polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)'
const TINTS = ['bg-teal', 'bg-periwinkle', 'bg-grass', 'bg-ochre', 'bg-coral', 'bg-navy-500']

export async function GalleryBlock(props: GalleryBlockType) {
  let items: Gallery[] = []

  if (props.source === 'manual') {
    items = (props.items ?? []).filter((i): i is Gallery => typeof i === 'object')
  } else {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'gallery',
      where: props.category ? { category: { equals: props.category } } : {},
      limit: props.limit ?? 8,
      depth: 1,
    })
    items = res.docs
  }

  return (
    <Section background="navy">
      <Container>
        <SectionHeading heading={props.heading ?? 'Campus Life'} dark />
        <div className="grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4">
          {items.length > 0
            ? items.map((item, i) => (
                <figure key={item.id ?? i} className="group">
                  <div
                    className={`relative aspect-[4/5] overflow-hidden ${TINTS[i % TINTS.length]}`}
                    style={{ clipPath: SHIELD }}
                  >
                    {item.image && typeof item.image === 'object' ? (
                      <Media resource={item.image} fill className="object-cover" sizes="(max-width:1024px) 50vw, 25vw" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Orb size={64} />
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-3 text-center font-display text-sm font-medium text-pale/85">
                    {item.title}
                  </figcaption>
                </figure>
              ))
            : PLACEHOLDERS.map((ph, i) => (
                <figure key={i} className="group">
                  <div
                    className={`relative aspect-[4/5] overflow-hidden ${TINTS[i % TINTS.length]}`}
                    style={{ clipPath: SHIELD }}
                  >
                    <Image
                      src={ph.src}
                      alt={ph.label}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width:1024px) 50vw, 25vw"
                    />
                  </div>
                  <figcaption className="mt-3 text-center font-display text-sm font-medium text-pale/85">
                    {ph.label}
                  </figcaption>
                </figure>
              ))}
        </div>
      </Container>
    </Section>
  )
}
