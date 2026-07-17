'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { HeroReveal } from './HeroReveal'

/**
 * Homepage hero SLIDER. Slide 0 is a time-sensitive campaign (e.g. Summer Camp) on a
 * bright/white ground; slide 1 is the evergreen brand hero (looping video + typed tagline).
 * Auto-advances on a per-slide timer (campaign shows first, then the brand hero), with
 * prev/next arrows + dots for manual control. Autoplay pauses on hover/focus and is disabled
 * for prefers-reduced-motion. The brand slide's typewriter replays each time it becomes active.
 */
type Cta = { label: string; url: string; appearance?: 'primary' | 'secondary' | 'outline' }

type BrandSlide = {
  kind: 'brand'
  eyebrow?: string
  heading: string
  tagline: string
  amharic?: string
  subhead?: string
  bgVideo?: string
  bgPoster?: string
  links?: Cta[]
  durationMs?: number
}
type CampaignSlide = {
  kind: 'campaign'
  eyebrow?: string
  heading: string
  headingAccent?: string
  subhead?: string
  image: string
  badge?: string
  links?: Cta[]
  durationMs?: number
}
export type HeroSlide = BrandSlide | CampaignSlide

export type HeroSliderProps = {
  blockType: 'heroSlider'
  slides: HeroSlide[]
}

const DEFAULT_DURATION = 8000

export function HeroSliderBlock({ slides }: HeroSliderProps) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useRef(false)
  const count = slides.length
  // The active slide's ground decides the control colours (light campaign vs. dark brand slide).
  const onLight = slides[active]?.kind === 'campaign'

  const go = useCallback((i: number) => setActive((i + count) % count), [count])

  // Touch swipe (mobile): a horizontal drag past the threshold advances the slide.
  // We only hijack the gesture when the movement is clearly horizontal so vertical
  // page scrolling still works. Autoplay pauses for the duration of the touch.
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
    setPaused(true)
  }, [])
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStart.current
      touchStart.current = null
      setPaused(false)
      if (!start || count < 2) return
      const t = e.changedTouches[0]
      const dx = t.clientX - start.x
      const dy = t.clientY - start.y
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        setActive((a) => (a + (dx < 0 ? 1 : -1) + count) % count)
      }
    },
    [count],
  )

  useEffect(() => {
    reduced.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Per-slide autoplay timer. Resets whenever the active slide changes or autoplay pauses.
  useEffect(() => {
    if (paused || reduced.current || count < 2) return
    const dur = slides[active]?.durationMs ?? DEFAULT_DURATION
    const id = setTimeout(() => setActive((a) => (a + 1) % count), dur)
    return () => clearTimeout(id)
  }, [active, paused, slides, count])

  return (
    <section
      className="relative flex min-h-[74vh] items-center overflow-hidden lg:min-h-[60vh]"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, i) => {
        const isActive = i === active
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              isActive ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
            }`}
            aria-hidden={!isActive}
          >
            {slide.kind === 'brand' ? (
              <BrandSlideView slide={slide} active={isActive} />
            ) : (
              <CampaignSlideView slide={slide} />
            )}
          </div>
        )
      })}

      {/* Controls */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous slide"
            className="group absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-navy/25 text-white backdrop-blur-sm transition hover:bg-navy/50 sm:left-6 sm:flex"
          >
            <span className="text-xl leading-none">‹</span>
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next slide"
            className="group absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-navy/25 text-white backdrop-blur-sm transition hover:bg-navy/50 sm:right-6 sm:flex"
          >
            <span className="text-xl leading-none">›</span>
          </button>
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center sm:bottom-5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                className="group flex h-11 min-w-[44px] items-center justify-center"
              >
                {/* Dots recolour to the active slide's ground: brand blue/purple on the white
                    summer-camp slide (white dots would vanish), white on the dark video slide. */}
                <span
                  className={`block h-2.5 rounded-full transition-all ${
                    onLight
                      ? i === active
                        ? 'w-8 bg-periwinkle'
                        : 'w-2.5 bg-navy/25 group-hover:bg-navy/40'
                      : i === active
                        ? 'w-8 bg-ochre'
                        : 'w-2.5 bg-white/70 group-hover:bg-white'
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

function BrandSlideView({ slide, active }: { slide: BrandSlide; active: boolean }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 orb-glow" />
      {slide.bgPoster && (
        <Image
          src={slide.bgPoster}
          alt=""
          fill
          priority
          className="hero-kenburns img-grade object-cover md:hidden"
          sizes="100vw"
        />
      )}
      {slide.bgVideo && (
        <video
          className="hero-kenburns absolute inset-0 hidden h-full w-full object-cover md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={slide.bgPoster}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={slide.bgVideo} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/65 to-navy/45" />
      {/* text-white so the inherited <h1> ("Nucleus International Schools") is crisp white on the video */}
      <Container className="relative flex h-full w-full items-center py-20 text-white sm:py-24">
        {/* keyed by `active` so the typewriter replays each time this slide returns */}
        <HeroReveal
          key={active ? 'on' : 'off'}
          heading={slide.heading}
          tagline={slide.tagline}
          amharic={slide.amharic}
          eyebrow={slide.eyebrow}
          dark
        >
          {slide.subhead && <p className="mt-6 max-w-xl text-lg text-pale/90 mx-auto sm:mx-0">{slide.subhead}</p>}
          {slide.links && slide.links.length > 0 && (
            <div className="mt-9 flex flex-wrap justify-center gap-4 sm:justify-start">
              {slide.links.map((l, i) => (
                <ButtonLink key={i} href={l.url} appearance={l.appearance ?? 'primary'}>
                  {l.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </HeroReveal>
      </Container>
    </div>
  )
}

/** A small floating icon tile used as decorative "camp" motif on the mobile campaign slide. */
function FloatChip({ icon, tint, className = '' }: { icon: string; tint: string; className?: string }) {
  return (
    <span
      className={`absolute flex h-12 w-12 items-center justify-center rounded-2xl shadow-[0_12px_30px_-10px_rgba(17,2,77,0.45)] sm:h-14 sm:w-14 ${tint} ${className}`}
    >
      <Icon name={icon} size={26} />
    </span>
  )
}

function CampaignSlideView({ slide }: { slide: CampaignSlide }) {
  return (
    <div className="relative h-full w-full bg-white">
      {/* faint brand wash so pure-white never feels flat */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(60% 60% at 88% 12%, rgba(224,169,59,0.10), transparent 60%), radial-gradient(50% 60% at 5% 100%, rgba(63,93,186,0.08), transparent 60%)',
        }}
      />
      {/* Mobile drops the photo entirely — these soft orbs keep the text-only slide from feeling flat. */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-12 h-64 w-64 rounded-full bg-ochre/20 blur-3xl lg:hidden" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-periwinkle/20 blur-3xl lg:hidden" />
      {/* Playful "camp" motifs float in the top/bottom whitespace — mobile only (desktop has the photo). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
        <FloatChip icon="Bot" tint="bg-periwinkle text-white" className="left-4 top-[6%] animate-bob [--tilt:-8deg]" />
        <FloatChip icon="Palette" tint="bg-coral text-white" className="right-4 top-[10%] animate-float [animation-delay:.8s]" />
        <FloatChip icon="Music" tint="bg-teal text-white" className="left-5 bottom-[15%] animate-float-slow [animation-delay:.4s]" />
        <FloatChip icon="Trophy" tint="bg-ochre text-navy" className="right-5 bottom-[8%] animate-bob [--tilt:7deg] [animation-delay:1.1s]" />
      </div>
      <Container className="relative flex h-full w-full items-center py-16 sm:py-20">
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:order-1 lg:text-left">
            {slide.badge && (
              <span className="inline-flex items-center gap-2 rounded-full bg-ochre/15 px-4 py-1.5 font-display text-sm font-semibold text-ochre-600">
                <span className="h-2 w-2 rounded-full bg-ochre" /> {slide.badge}
              </span>
            )}
            {slide.eyebrow && (
              <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-ochre-600">
                {slide.eyebrow}
              </p>
            )}
            <h1 className="mt-3 text-4xl font-bold text-navy sm:text-5xl lg:text-6xl">
              {slide.heading}
              {slide.headingAccent && <span className="text-ochre"> {slide.headingAccent}</span>}
            </h1>
            {slide.subhead && <p className="mx-auto mt-5 max-w-xl text-lg text-ink/75 lg:mx-0">{slide.subhead}</p>}
            {slide.links && slide.links.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                {slide.links.map((l, i) => (
                  <ButtonLink key={i} href={l.url} appearance={l.appearance ?? (i === 0 ? 'primary' : 'outline')}>
                    {l.label}
                  </ButtonLink>
                ))}
              </div>
            )}
          </div>
          <div className="relative hidden lg:order-2 lg:block">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border border-navy/10 shadow-[0_30px_70px_-30px_rgba(17,2,77,0.45)]">
              <Image
                src={slide.image}
                alt={slide.heading}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
