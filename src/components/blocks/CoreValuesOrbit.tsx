'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

type CoreValue = { iconName: string; title: string; description?: string }
export type BgTreatment = 'duotone' | 'mesh' | 'spotlight'
export type CoreValuesOrbitProps = {
  blockType: 'coreValuesOrbit'
  eyebrow?: string
  heading?: string
  intro?: string
  values?: CoreValue[]
  bgImage?: string
  /** 'dark' = navy band (default); 'light' = white-gradient wash over the photo, dark-text orbit. */
  surface?: 'dark' | 'light'
  /**
   * Premium background treatment over the photo (overrides `surface`). The orbit itself is unchanged.
   *  - duotone:   full-bleed navy×ochre duotone of the photo (editorial).
   *  - mesh:      navy base, faint photo + soft brand "aurora" gradient blobs.
   *  - spotlight: navy section + the photo in a gold-framed, spotlit panel.
   */
  bgTreatment?: BgTreatment
  /** Alignment of the heading block (eyebrow + heading + intro). Default centre. */
  headingAlign?: 'left' | 'center' | 'right'
  /** Heading colour. 'gold' = ochre (best on dark treatments); 'navy' = brand purple; 'auto' = by bg. */
  headingColor?: 'gold' | 'navy' | 'auto'
}

const RADIUS = 35 // % of the (square) orbit container, from centre to each node (shorter arms)

/** Premium photo-background treatments (the orbit on top is identical across all of them). */
function TreatmentBg({ treatment, img }: { treatment: BgTreatment; img: string }) {
  if (treatment === 'duotone') {
    return (
      <>
        <div
          className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
          style={{ backgroundImage: `url(${img})`, filter: 'grayscale(1) contrast(1.08) brightness(0.92)' }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-navy" style={{ mixBlendMode: 'multiply', opacity: 0.9 }} aria-hidden />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(110% 80% at 50% 22%, rgba(224,169,59,0.42), transparent 60%)', mixBlendMode: 'screen' }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-navy/30" aria-hidden />
      </>
    )
  }
  if (treatment === 'mesh') {
    return (
      <>
        <div className="absolute inset-0 bg-navy" aria-hidden />
        <div
          className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
          style={{ backgroundImage: `url(${img})`, opacity: 0.32 }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(42% 52% at 16% 22%, rgba(224,169,59,0.40), transparent 70%),' +
              'radial-gradient(46% 56% at 84% 28%, rgba(63,93,186,0.55), transparent 70%),' +
              'radial-gradient(54% 62% at 50% 100%, rgba(217,230,245,0.30), transparent 70%)',
            filter: 'blur(6px)',
          }}
        />
        <div className="absolute inset-0 bg-navy/30" aria-hidden />
      </>
    )
  }
  // spotlight
  return (
    <>
      <div className="absolute inset-0 bg-navy" aria-hidden />
      <div
        className="absolute inset-x-4 inset-y-6 overflow-hidden rounded-[2rem] border border-ochre/40 shadow-[0_36px_90px_-44px_rgba(0,0,0,0.8)] sm:inset-x-10 md:inset-x-16"
        aria-hidden
      >
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(58% 58% at 50% 46%, rgba(255,255,255,0.42), rgba(17,2,77,0.35) 68%, rgba(17,2,77,0.7))' }}
        />
        {/* Top-left light wash so a dark/purple left-aligned heading stays readable over the photo. */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(46% 44% at 14% 16%, rgba(255,255,255,0.72), transparent 60%)' }}
        />
      </div>
    </>
  )
}

/**
 * Core Values: "Nucleus Orbit": the six values orbit a glowing nucleus. Hover (or focus) a value
 * and its description reveals in the centre. The orbit + white/gold value cards are fixed; the
 * background is configurable (`surface` or, premium, `bgTreatment`).
 */
export function CoreValuesOrbit(props: CoreValuesOrbitProps) {
  const values = props.values ?? []
  const n = values.length || 1
  const [active, setActive] = useState<number | null>(null)
  const current = active !== null ? values[active] : null

  const treatment = props.bgTreatment
  // White/gold cards (the "loved" look) whenever light surface OR any premium treatment.
  const light = props.surface === 'light' || Boolean(treatment)
  // Treatments sit on a dark navy base → the section heading/intro/bond-lines go light.
  const darkSurround = Boolean(treatment) || (!light && Boolean(props.bgImage)) || (!light && !props.bgImage)

  return (
    <section
      className={`relative overflow-hidden py-[var(--spacing-section)] ${
        treatment ? 'bg-navy text-pale' : light ? 'bg-white text-ink' : props.bgImage ? 'bg-navy text-pale' : 'orb-glow text-pale'
      }`}
    >
      {/* --- Background --- */}
      {treatment && props.bgImage ? (
        <TreatmentBg treatment={treatment} img={props.bgImage} />
      ) : (
        props.bgImage && (
          <>
            <div
              className="img-grade absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
              style={{ backgroundImage: `url(${props.bgImage})` }}
              aria-hidden
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                light ? 'from-white/60 via-white/78 to-white/92' : 'from-navy/90 via-navy/72 to-navy/88'
              }`}
              aria-hidden
            />
          </>
        )
      )}

      <Container className="relative z-10">
        {(() => {
          const align = props.headingAlign ?? 'center'
          const alignWrap =
            align === 'left' ? 'mr-auto text-left' : align === 'right' ? 'ml-auto text-right' : 'mx-auto text-center'
          const headingCls =
            props.headingColor === 'gold'
              ? 'text-ochre'
              : props.headingColor === 'navy'
                ? 'text-navy'
                : darkSurround
                  ? 'text-white'
                  : 'text-navy'
          return (
            <div className={`mb-14 max-w-2xl ${alignWrap}`}>
              {props.eyebrow && (
                <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ochre">{props.eyebrow}</p>
              )}
              <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${headingCls}`}>{props.heading}</h2>
              {props.intro && <p className={`mt-4 text-lg ${darkSurround ? 'text-pale/85' : 'text-ink/70'}`}>{props.intro}</p>}
            </div>
          )
        })()}

        {/* Desktop orbit */}
        <Reveal variant="scale" className="hidden lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-[44rem]" onMouseLeave={() => setActive(null)}>
            {/* bond lines (centre → node) */}
            {values.map((_, i) => {
              const angle = -90 + (360 / n) * i
              return (
                <div
                  key={`line-${i}`}
                  aria-hidden
                  className={`absolute left-1/2 top-1/2 h-px origin-left bg-gradient-to-r to-transparent ${
                    darkSurround ? 'from-white/30' : 'from-navy/25'
                  }`}
                  style={{ width: `${RADIUS}%`, transform: `rotate(${angle}deg)` }}
                />
              )
            })}

            {/* central nucleus: white/gold card (fixed look) */}
            <div
              className={`absolute left-1/2 top-1/2 z-10 flex h-72 w-72 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full p-8 text-center backdrop-blur ${
                light
                  ? 'border-[1.5px] border-ochre bg-white/90 shadow-[0_0_70px_-20px_rgba(17,2,77,0.3)]'
                  : 'border border-white/15 orb-glow shadow-[0_0_90px_-20px_rgba(224,169,59,0.5)]'
              }`}
            >
              {current ? (
                <>
                  <p className={`font-display text-2xl font-bold ${light ? 'text-ochre-600' : 'text-ochre'}`}>{current.title}</p>
                  <p className={`mt-2 text-sm leading-snug ${light ? 'text-ink/75' : 'text-pale/90'}`}>{current.description}</p>
                </>
              ) : (
                <>
                  <p className={`font-display text-xl font-bold uppercase tracking-wide ${light ? 'text-navy' : 'text-white'}`}>
                    {props.heading ?? 'Core Values'}
                  </p>
                  <p className={`mt-1.5 text-sm ${light ? 'text-ink/55' : 'text-pale/70'}`}>Hover a value to explore</p>
                </>
              )}
            </div>

            {/* value nodes around the ring */}
            {values.map((v, i) => {
              const deg = -90 + (360 / n) * i
              const rad = (deg * Math.PI) / 180
              const leftPos = 50 + RADIUS * Math.cos(rad)
              const topPos = 50 + RADIUS * Math.sin(rad)
              const isActive = active === i
              return (
                <div key={i} className="absolute" style={{ left: `${leftPos}%`, top: `${topPos}%`, transform: 'translate(-50%,-50%)' }}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`flex w-32 cursor-pointer flex-col items-center gap-2 rounded-2xl p-4 text-center backdrop-blur-sm transition-all duration-200 ${
                      light
                        ? isActive
                          ? '-translate-y-0.5 border-[1.5px] border-ochre bg-white shadow-[0_8px_24px_-8px_rgba(224,169,59,0.5)]'
                          : 'border-[1.5px] border-ochre bg-white hover:bg-white/95'
                        : isActive
                          ? '-translate-y-0.5 border border-ochre bg-white/15'
                          : 'border border-white/12 bg-white/[0.06] hover:bg-white/10'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${
                        light ? 'bg-ochre/15 text-ochre-600' : `${isActive ? 'bg-ochre/20' : 'bg-white/10'} text-ochre`
                      }`}
                    >
                      <Icon name={v.iconName} size={22} />
                    </span>
                    <span className={`font-display text-sm font-bold ${light ? 'text-navy' : 'text-white'}`}>{v.title}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* Mobile / tablet list */}
        <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
          {values.map((v, i) => (
            <Reveal key={i} variant="up" delay={i * 55}>
              <div
                className={`flex h-full gap-4 rounded-2xl p-5 ${
                  light ? 'border-[1.5px] border-ochre bg-white shadow-sm' : 'border border-white/10 bg-white/[0.06]'
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    light ? 'bg-ochre/15 text-ochre-600' : 'bg-white/10 text-ochre'
                  }`}
                >
                  <Icon name={v.iconName} size={22} />
                </span>
                <div>
                  <h3 className={`font-display text-base font-bold ${light ? 'text-navy' : 'text-white'}`}>{v.title}</h3>
                  {v.description && (
                    <p className={`mt-1 text-sm leading-relaxed ${light ? 'text-ink/70' : 'text-pale/80'}`}>{v.description}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
