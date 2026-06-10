import Image from 'next/image'
import type { HeroBlock as HeroBlockType } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { CMSLink } from '@/components/ui/Button'
import { Media } from '@/components/ui/Media'
import { Orb } from '@/components/ui/Orb'
import { isDark, type SectionBackground } from '@/components/ui/Section'
import { HeroReveal } from './HeroReveal'

/**
 * Page hero. Background priority: uploaded media image → local `bgVideo` (muted
 * looping clip) → local `bgImage` (stock/demo) → orb-glow. On dark backgrounds the
 * multi-line heading's final line is accented in ochre (the "Solve Truly." emphasis).
 * `bgVideo`/`bgPoster`/`bgImage` are code-only props used by the default layouts; CMS uses `image`.
 */
export function HeroBlock(
  props: HeroBlockType & { bgImage?: string; bgVideo?: string; bgPoster?: string; tagline?: string },
) {
  const background = (props.background ?? 'purple') as SectionBackground
  const dark = isDark(background)
  const lines = (props.heading ?? '').split('\n')
  const hasMedia = props.image && typeof props.image === 'object'
  const hasBg = hasMedia || Boolean(props.bgVideo) || Boolean(props.bgImage)
  // Fixed viewport height so the hero never grows/reflows (e.g. while the homepage
  // heading types in). Homepage/animated/video hero is immersive; inner heroes shorter.
  const heroTall = Boolean(props.animateHeading) || Boolean(props.bgVideo)

  return (
    <section
      className={`relative flex ${heroTall ? 'min-h-[75vh]' : 'min-h-[52vh]'} items-center overflow-hidden ${dark ? 'orb-glow text-pale' : 'bg-offwhite text-ink'}`}
    >
      {hasMedia ? (
        <div className="absolute inset-0">
          <Media resource={props.image} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-navy/55" />
        </div>
      ) : props.bgVideo ? (
        <div className="absolute inset-0">
          {/* Mobile: a static WebP poster only — the video is hidden (display:none) so phones never
              download the ~870KB clip. Desktop: the decorative muted/looping ken-burns video. */}
          {props.bgPoster && (
            <Image
              src={props.bgPoster}
              alt=""
              fill
              priority
              className="hero-kenburns object-cover md:hidden"
              sizes="100vw"
            />
          )}
          <video
            className="hero-kenburns absolute inset-0 hidden h-full w-full object-cover md:block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={props.bgPoster}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={props.bgVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/65 to-navy/45" />
        </div>
      ) : props.bgImage ? (
        <div className="absolute inset-0">
          <Image src={props.bgImage} alt="" fill priority className="hero-kenburns object-cover" sizes="100vw" />
          {/* Navy gradient overlay keeps text legible over any photo. */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/65 to-navy/45" />
        </div>
      ) : (
        dark && <Orb size={520} className="pointer-events-none absolute -right-32 -top-24 opacity-30" />
      )}

      <Container className="relative w-full py-20 sm:py-24">
        {(() => {
          const subheadAndLinks = (
            <>
              {props.subhead && (
                <p className={`mt-6 max-w-xl text-lg ${dark || hasBg ? 'text-pale/90' : 'text-ink/75'}`}>
                  {props.subhead}
                </p>
              )}
              {props.links && props.links.length > 0 && (
                <div className="mt-9 flex flex-wrap gap-4">
                  {props.links.map((item, i) => (
                    <CMSLink key={i} link={item.link} />
                  ))}
                </div>
              )}
            </>
          )

          if (props.animateHeading) {
            return (
              <HeroReveal
                heading={props.heading ?? ''}
                tagline={props.tagline ?? props.heading ?? ''}
                amharic={props.amharicSubline}
                eyebrow={props.eyebrow}
                dark={dark || hasBg}
              >
                {subheadAndLinks}
              </HeroReveal>
            )
          }

          return (
            <div className="max-w-3xl">
              {props.amharicSubline && (
                <p lang="am" className={`mb-4 text-lg ${dark || hasBg ? 'text-ochre' : 'text-ochre-600'}`}>
                  {props.amharicSubline}
                </p>
              )}
              {props.eyebrow && (
                <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-ochre">
                  {props.eyebrow}
                </p>
              )}
              <h1 className="text-4xl font-bold sm:text-6xl">
                {lines.map((line, i) => (
                  <span key={i} className={`block ${i === lines.length - 1 && lines.length > 1 ? 'text-ochre' : ''}`}>
                    {line}
                  </span>
                ))}
              </h1>
              {subheadAndLinks}
            </div>
          )
        })()}
      </Container>
    </section>
  )
}
