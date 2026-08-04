import type { CardsGridBlock as CardsGridBlockType } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Media } from '@/components/ui/Media'
import { Icon } from '@/components/ui/Icon'
import { CMSLink } from '@/components/ui/Button'
import { Reveal, type RevealVariant } from '@/components/ui/Reveal'

const colsClass: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

type Overlay = 'navy' | 'white' | 'gradient'
type CardMode = 'dark' | 'light' | 'invert'

/** Veil drawn over the parallax photo, keyed by `bgOverlay`. */
const overlayClass: Record<Overlay, string> = {
  navy: 'bg-navy/80',
  white: 'bg-white/85',
  // radial: bright white in the middle, fading out to icy-blue then brand blue at the edges
  gradient:
    'bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(217,230,245,0.8)_46%,rgba(63,93,186,0.92)_100%)]',
}

const cardClassByMode: Record<CardMode, string> = {
  dark: 'border-white/10 bg-white/[0.06] hover:bg-white/[0.1]',
  light:
    'border-navy/[0.08] bg-white shadow-[0_1px_3px_rgba(17,2,77,0.04)] hover:-translate-y-0.5 hover:border-ochre/40 hover:shadow-[0_12px_30px_-12px_rgba(17,2,77,0.18)]',
  // solid white, flips to navy on hover with a thin gold border
  invert:
    'border-navy/[0.08] bg-white shadow-[0_4px_14px_-6px_rgba(17,2,77,0.12)] hover:-translate-y-0.5 hover:border-ochre hover:bg-navy hover:shadow-[0_18px_40px_-16px_rgba(17,2,77,0.45)]',
}

const iconClassByMode: Record<CardMode, string> = {
  dark: 'bg-white/10 text-ochre',
  light: 'bg-navy/[0.06] text-navy',
  invert: 'bg-navy/[0.06] text-navy group-hover:bg-white/15 group-hover:text-ochre',
}

/**
 * Cards grid: "Why Leaders Choose Nucleus", values, programs, steps. Uniform card system.
 * Optional code-only `reveal` controls the scroll animation: a RevealVariant applied to every
 * card, or 'mirror' to alternate slide-in-left / slide-in-right. Defaults to fade-up.
 * Optional code-only `bgImage` turns the section into a parallax photo band (bg-fixed). Pair it
 * with `bgOverlay`: 'navy' (dark frosted cards), 'white' (light veil) or 'gradient' (a radial
 * white→icy-blue→blue veil). 'white' and 'gradient' use solid white cards that flip to navy on
 * hover. Defaults to 'navy'.
 */
export function CardsGridBlock(
  props: CardsGridBlockType & {
    reveal?: RevealVariant | 'mirror'
    bgImage?: string
    bgOverlay?: Overlay
    anchor?: string
  },
) {
  const background = (props.background ?? 'white') as SectionBackground
  const overlay = props.bgOverlay ?? 'navy'
  const mode: CardMode = props.bgImage
    ? overlay === 'navy'
      ? 'dark'
      : 'invert'
    : isDark(background)
      ? 'dark'
      : 'light'
  const dark = mode === 'dark'
  const cards = props.cards ?? []
  const reveal = props.reveal ?? 'up'

  const titleClass =
    dark ? 'text-white' : mode === 'invert' ? 'text-navy group-hover:text-white' : 'text-navy'
  const descClass =
    dark ? 'text-pale/80' : mode === 'invert' ? 'text-ink/65 group-hover:text-pale/80' : 'text-ink/65'

  const inner = (
    <>
      <Container className="relative">
        <SectionHeading eyebrow={props.eyebrow} heading={props.heading} intro={props.intro} dark={dark} />
        <div className={`grid grid-cols-1 gap-6 ${colsClass[props.columns ?? '3'] ?? colsClass['3']}`}>
          {cards.map((card, i) => {
            const hasImageIcon = card.icon && typeof card.icon === 'object'
            const variant: RevealVariant = reveal === 'mirror' ? (i % 2 === 0 ? 'left' : 'right') : reveal
            return (
              <Reveal key={i} variant={variant} delay={Math.min(i, 5) * 70} className="h-full">
              <article
                className={`group flex h-full flex-col items-start text-left rounded-2xl border p-6 sm:p-7 transition-all duration-200 motion-safe:active:scale-[0.98] ${cardClassByMode[mode]}`}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200 ${iconClassByMode[mode]}`}
                >
                  {hasImageIcon ? (
                    <Media resource={card.icon} className="h-7 w-7 object-contain" sizes="28px" />
                  ) : (
                    <Icon name={card.iconName} size={26} />
                  )}
                </div>
                <h3 className={`text-lg font-bold transition-colors duration-200 ${titleClass}`}>{card.title}</h3>
                {card.description && (
                  <p className={`mt-2 text-[0.95rem] leading-relaxed transition-colors duration-200 ${descClass}`}>
                    {card.description}
                  </p>
                )}
                {card.enableLink && card.link?.label && (
                  <div className="mt-4">
                    <CMSLink link={{ ...card.link, appearance: 'link' }} />
                  </div>
                )}
              </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </>
  )

  if (props.bgImage) {
    return (
      <section id={props.anchor} className="relative overflow-hidden py-[var(--spacing-section)]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
          style={{ backgroundImage: `url(${props.bgImage})` }}
          aria-hidden
        />
        <div className={`absolute inset-0 ${overlayClass[overlay]}`} aria-hidden />
        {inner}
      </section>
    )
  }

  return (
    <Section background={background} id={props.anchor}>
      {inner}
    </Section>
  )
}
