'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Self-hosted campus film with a click-to-play poster.
 *
 * `preload="none"` is the point: the file is 8 MB and most visitors are on Ethiopian mobile
 * data, so nothing downloads until someone actually presses play. Until then the page shows the
 * poster, which costs 143 KB. The <video> element is only mounted after the first click, so the
 * browser cannot start buffering early on its own.
 */
export type CampusVideoProps = {
  blockType: 'campusVideo'
  eyebrow?: string
  heading?: string
  intro?: string
  src?: string
  poster?: string
  posterAlt?: string
  background?: SectionBackground
  /** ISO 8601, e.g. PT40S. Emitted in the VideoObject schema. */
  duration?: string
  uploadDate?: string
}

const SITE = 'https://nucleusinternationalschoolsystem.com'

export function CampusVideoBlock({
  eyebrow = 'Take a Look Around',
  heading = 'A Walk Through Our Campus',
  intro,
  src = '/video/campus-tour.mp4',
  poster = '/video/campus-tour-poster.webp',
  posterAlt = 'The Nucleus International Schools campus at Vatican, Addis Ababa',
  background = 'navy',
  duration = 'PT40S',
  uploadDate = '2026-08-07',
}: CampusVideoProps) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const dark = isDark(background)

  // Google reads VideoObject for video rich results. Rendered in the SSR HTML, so the client
  // boundary on this block does not hide it from crawlers.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: heading,
    description:
      intro ??
      'A walk through the Nucleus International Schools campus at Vatican, Addis Ababa: classrooms, science and computer labs, music room, library and grounds.',
    thumbnailUrl: [`${SITE}${poster}`],
    contentUrl: `${SITE}${src}`,
    uploadDate,
    duration,
    publisher: {
      '@type': 'Organization',
      name: 'Nucleus International Schools',
      url: SITE,
    },
  }

  return (
    <Section background={background}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Container>
        <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} dark={dark} />
        <Reveal variant="up">
          <div
            className={`relative overflow-hidden rounded-2xl border shadow-lg ${
              dark ? 'border-white/10 bg-black/40' : 'border-navy/10 bg-navy/5'
            }`}
          >
            <div className="relative aspect-video w-full">
              {playing ? (
                <video
                  ref={videoRef}
                  src={src}
                  poster={poster}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full bg-black"
                >
                  Your browser does not support video playback.{' '}
                  <a href={src} className="underline">
                    Download the campus tour
                  </a>
                  .
                </video>
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Play the Nucleus campus tour video"
                  className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
                >
                  <Image
                    src={poster}
                    alt={posterAlt}
                    fill
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute inset-0 bg-navy/25 transition-colors group-hover:bg-navy/15" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform duration-300 group-hover:scale-110">
                      {/* Optical centring: a triangle looks off-centre when centred geometrically. */}
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-8 w-8 fill-navy">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
