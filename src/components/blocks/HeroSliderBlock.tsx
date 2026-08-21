'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { ButtonAction, ButtonLink } from '@/components/ui/Button'
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
/**
 * The film slide. Its background is a SHORT muted loop cut from the TVC, not the TVC itself:
 * the full film is 15 MB and this plays on arrival, so it has to stay in the same budget as the
 * brand slide's loop. Its primary CTA opens the real film with sound.
 */
type FilmSlide = {
  kind: 'film'
  eyebrow?: string
  heading: string
  headingAccent?: string
  subhead?: string
  bgVideo?: string
  bgPoster?: string
  /** Label for the button that opens the full film. */
  watchLabel: string
  /** An ordinary link shown beside it. */
  link?: Cta
  durationMs?: number
}

export type HeroSlide = BrandSlide | CampaignSlide | FilmSlide

/**
 * The brand film, revealed over the hero when the floating button is pressed.
 * `src` is never requested until then: the <video> is not mounted at all until the first open,
 * so a visitor who never presses the button pays nothing for a 15 MB file.
 */
export type HeroTvc = {
  src: string
  poster: string
  /** Button copy. */
  label: string
  /** Accessible name of the film, and the `name` in the VideoObject schema. */
  title: string
  description?: string
  /** ISO 8601, e.g. PT1M. */
  duration?: string
  uploadDate?: string
}

export type HeroSliderProps = {
  blockType: 'heroSlider'
  slides: HeroSlide[]
  tvc?: HeroTvc
}

const DEFAULT_DURATION = 8000
const SITE = 'https://nucleusinternationalschoolsystem.com'

/**
 * True only once mounted on a desktop-width viewport.
 *
 * The decorative background loops MUST be gated on this rather than on `hidden md:block`.
 * A CSS-hidden <video> with `autoplay` still downloads: measured on a 390px viewport, the phone
 * pulled the full 1.2 MB teaser and the full 1.4 MB brand loop and displayed neither. Not
 * mounting the element is the only thing that actually stops the bytes. Starts false so the
 * server HTML and the first client render agree, then flips after hydration on desktop.
 */
function useDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const apply = () => setIsDesktop(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return isDesktop
}

export function HeroSliderBlock({ slides, tvc }: HeroSliderProps) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useRef(false)
  const count = slides.length
  // `tvcOpen` drives the slide-in. `tvcMounted` stays true once opened, so closing and
  // reopening does not re-download the film or lose the playback position.
  const [tvcOpen, setTvcOpen] = useState(false)
  const [tvcMounted, setTvcMounted] = useState(false)
  const tvcVideoRef = useRef<HTMLVideoElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const openTvc = useCallback(() => {
    setTvcMounted(true)
    setTvcOpen(true)
  }, [])

  const closeTvc = useCallback(() => {
    tvcVideoRef.current?.pause()
    setTvcOpen(false)
  }, [])

  // Play with sound. This runs off the button press, so browsers allow unmuted playback;
  // if a policy still blocks it the controls are right there, so we swallow the rejection.
  useEffect(() => {
    if (!tvcOpen) return
    const v = tvcVideoRef.current
    if (v) {
      v.muted = false
      void v.play().catch(() => {})
    }
    // preventScroll matters: at this instant the panel is still translated fully off to the
    // right, so a normal focus() makes the browser scroll the overflow-hidden section sideways
    // to reveal it, and it never scrolls back. Everything then sits ~47px left of where it
    // belongs and a strip of the slide underneath shows through.
    closeBtnRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTvc()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tvcOpen, closeTvc])
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
      // While the film is open it covers the slides, so a swipe on it must not shuffle
      // the carousel underneath and leave a different slide behind on close.
      if (!start || count < 2 || tvcOpen) return
      const t = e.changedTouches[0]
      const dx = t.clientX - start.x
      const dy = t.clientY - start.y
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        setActive((a) => (a + (dx < 0 ? 1 : -1) + count) % count)
      }
    },
    [count, tvcOpen],
  )

  useEffect(() => {
    reduced.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Per-slide autoplay timer. Resets whenever the active slide changes or autoplay pauses.
  useEffect(() => {
    if (paused || reduced.current || count < 2 || tvcOpen) return
    const dur = slides[active]?.durationMs ?? DEFAULT_DURATION
    const id = setTimeout(() => setActive((a) => (a + 1) % count), dur)
    return () => clearTimeout(id)
  }, [active, paused, slides, count, tvcOpen])

  return (
    // Slides are stacked in ONE grid cell rather than absolutely positioned, so the section
    // grows to the tallest slide instead of clipping it. `min-h` is a floor, not a ceiling.
    // On short laptop viewports (13" Air) 60vh is less than the brand slide needs, and the
    // CTAs used to be cut off by the band below.
    <section
      className="relative grid min-h-[74vh] overflow-hidden lg:min-h-[60vh]"
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
            className={`col-start-1 row-start-1 transition-opacity duration-700 ${
              isActive ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
            }`}
            aria-hidden={!isActive}
          >
            {slide.kind === 'brand' ? (
              <BrandSlideView slide={slide} active={isActive} />
            ) : slide.kind === 'film' ? (
              <FilmSlideView slide={slide} onWatch={openTvc} />
            ) : (
              <CampaignSlideView slide={slide} />
            )}
          </div>
        )
      })}

      {/* Controls. Hidden while the film is open: they sit under it, and leaving them
          focusable would let a keyboard user drive an invisible carousel. */}
      {count > 1 && !tvcOpen && (
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

      {tvc && <TvcLayer tvc={tvc} open={tvcOpen} mounted={tvcMounted} onOpen={openTvc} onClose={closeTvc} videoRef={tvcVideoRef} closeBtnRef={closeBtnRef} />}
    </section>
  )
}

/**
 * The "Watch Our Video" button and the panel it opens.
 *
 * The panel slides in over the whole hero rather than opening a modal on top of the page: the
 * hero is already the right shape for a 16:9 film, and staying in place keeps the transition
 * readable as "the hero turned into the film" instead of "a box appeared".
 */
function TvcLayer({
  tvc,
  open,
  mounted,
  onOpen,
  onClose,
  videoRef,
  closeBtnRef,
}: {
  tvc: HeroTvc
  open: boolean
  mounted: boolean
  onOpen: () => void
  onClose: () => void
  videoRef: React.RefObject<HTMLVideoElement | null>
  closeBtnRef: React.RefObject<HTMLButtonElement | null>
}) {
  // Google reads VideoObject for video rich results. It is plain markup in the SSR HTML, so the
  // client boundary on this block does not hide the film from crawlers.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: tvc.title,
    description: tvc.description ?? tvc.title,
    thumbnailUrl: [`${SITE}${tvc.poster}`],
    contentUrl: `${SITE}${tvc.src}`,
    uploadDate: tvc.uploadDate,
    duration: tvc.duration,
    publisher: { '@type': 'Organization', name: 'Nucleus International Schools', url: SITE },
  }

  return (
    // A grid item pinned to the same cell as the slides, so `absolute inset-0` inside it resolves
    // against the full hero. Positioning these against the <section> directly does NOT work: an
    // absolutely positioned child of a grid container resolves against its grid area, which left
    // the panel offset by tens of pixels and showed a strip of the slide underneath.
    // It carries no content of its own, so it cannot grow the section.
    <div className="pointer-events-none relative col-start-1 row-start-1 z-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {!open && (
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${tvc.label}: ${tvc.title}`}
          className="group pointer-events-auto absolute bottom-16 right-4 sm:bottom-8 sm:right-8"
        >
          {/* The pulse is a ring behind the pill, not the pill itself: a button that changes
              size is hard to hit. The global reduced-motion rule stops the animation. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-ochre/50 [animation-duration:2.2s]"
          />
          <span
            aria-hidden="true"
            className="absolute -inset-1 rounded-full bg-ochre/25 blur-md transition-opacity group-hover:opacity-80"
          />
          <span className="relative flex items-center gap-3 rounded-full bg-ochre px-5 py-3.5 font-display text-base font-bold text-navy shadow-[0_14px_34px_-10px_rgba(17,2,77,0.6)] transition-transform duration-300 group-hover:scale-105 sm:gap-4 sm:px-7 sm:py-5 sm:text-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy sm:h-11 sm:w-11">
              {/* Optical centring: a triangle looks off-centre when centred geometrically. */}
              <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-4 w-4 fill-ochre sm:h-5 sm:w-5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {tvc.label}
          </span>
        </button>
      )}

      <div
        role="dialog"
        aria-modal="false"
        aria-label={tvc.title}
        aria-hidden={!open}
        className={`absolute inset-0 z-30 bg-navy transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'pointer-events-auto translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
      >
        {/* `max-h-full w-full` rather than `h-full`: on a desktop hero the film fills the width and
            is capped by the height, while on a portrait phone it settles to its own 1.9:1 strip
            instead of stretching a letterbox down the whole screen. */}
        <div className="flex h-full w-full flex-col items-center justify-center">
          {mounted && (
            <video
              ref={videoRef}
              src={tvc.src}
              poster={tvc.poster}
              controls
              playsInline
              preload="auto"
              className="max-h-full w-full bg-navy object-contain"
            >
              Your browser does not support video playback.{' '}
              <a href={tvc.src} className="underline">
                Download the film
              </a>
              .
            </video>
          )}
          {/* Phones leave a lot of navy above and below the strip. Naming the film there beats
              empty space, and points at the control that actually fixes it. */}
          <p className="mt-6 max-w-xs px-6 text-center text-sm leading-relaxed text-pale/70 sm:hidden">
            {tvc.title}
            <span className="mt-1 block text-pale/45">Tap fullscreen for the best view.</span>
          </p>
        </div>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close the video and return to the slides"
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-navy/70 text-2xl leading-none text-white backdrop-blur-sm transition hover:bg-navy sm:right-5 sm:top-5"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  )
}

function BrandSlideView({ slide, active }: { slide: BrandSlide; active: boolean }) {
  const showVideo = useDesktopViewport()
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 orb-glow" />
      {/* The still is the base layer on every width, so the slide is never empty before the loop
          mounts, and never empty at all without JS. The loop draws on top of it on desktop. */}
      {slide.bgPoster && (
        <Image
          src={slide.bgPoster}
          alt=""
          fill
          priority
          className="hero-kenburns img-grade object-cover"
          sizes="100vw"
        />
      )}
      {slide.bgVideo && showVideo && (
        <video
          className="hero-kenburns absolute inset-0 h-full w-full object-cover"
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
      {/* pb-32 on mobile reserves the bottom band for the dots and the floating film button.
          Without it the button lands on top of the slide's own CTAs on a phone. */}
      <Container className="relative flex h-full w-full items-center pb-40 pt-16 text-white sm:py-20 lg:py-24">
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

/**
 * The film slide. Same dark treatment as the brand slide, but the CTA opens the film in place
 * rather than navigating, and there is no typewriter: the moving footage is the motion here, and
 * animating the heading on top of it is one thing too many.
 */
function FilmSlideView({ slide, onWatch }: { slide: FilmSlide; onWatch: () => void }) {
  // Phones get the still only. The loop is 1.2 MB and purely decorative.
  const showVideo = useDesktopViewport()
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 orb-glow" />
      {slide.bgPoster && (
        <Image
          src={slide.bgPoster}
          alt=""
          fill
          priority
          className="img-grade object-cover"
          sizes="100vw"
        />
      )}
      {slide.bgVideo && showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
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
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/70 to-navy/45" />
      <Container className="relative flex h-full w-full items-center pb-40 pt-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center sm:mx-0 sm:text-left">
          {slide.eyebrow && (
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ochre">
              {slide.eyebrow}
            </p>
          )}
          {/* h2, not h1: the brand slide already owns the homepage's single h1. */}
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            {slide.heading}
            {slide.headingAccent && (
              <>
                {' '}
                <span className="text-ochre">{slide.headingAccent}</span>
              </>
            )}
          </h2>
          {slide.subhead && <p className="mt-5 max-w-xl text-lg text-pale/85">{slide.subhead}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:justify-start">
            <ButtonAction onClick={onWatch} appearance="primary">
              {/* Optical centring: a triangle looks off-centre when centred geometrically. */}
              <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-4 w-4 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
              {slide.watchLabel}
            </ButtonAction>
            {slide.link && (
              <ButtonLink href={slide.link.url} appearance={slide.link.appearance ?? 'outline'}>
                {slide.link.label}
              </ButtonLink>
            )}
          </div>
        </div>
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
      {/* Mobile drops the photo entirely, so these soft orbs keep the text-only slide from feeling flat. */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-12 h-64 w-64 rounded-full bg-ochre/20 blur-3xl lg:hidden" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-periwinkle/20 blur-3xl lg:hidden" />
      {/* Playful "camp" motifs float in the top/bottom whitespace, mobile only (desktop has the photo). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
        <FloatChip icon="Bot" tint="bg-periwinkle text-white" className="left-4 top-[6%] animate-bob [--tilt:-8deg]" />
        <FloatChip icon="Palette" tint="bg-coral text-white" className="right-4 top-[10%] animate-float [animation-delay:.8s]" />
        <FloatChip icon="Music" tint="bg-teal text-white" className="left-5 bottom-[15%] animate-float-slow [animation-delay:.4s]" />
        <FloatChip icon="Trophy" tint="bg-ochre text-navy" className="right-5 bottom-[8%] animate-bob [--tilt:7deg] [animation-delay:1.1s]" />
      </div>
      {/* Same reserved bottom band as the brand slide, for the dots and the film button. */}
      <Container className="relative flex h-full w-full items-center pb-40 pt-16 sm:py-20">
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
