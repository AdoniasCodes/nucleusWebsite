import type { CardsGridBlock as CardsGridBlockType } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Media } from '@/components/ui/Media'
import { Icon } from '@/components/ui/Icon'
import { CMSLink } from '@/components/ui/Button'

const colsClass: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

/** Cards grid — "Why Leaders Choose Nucleus", values, programs, steps. Uniform card system. */
export function CardsGridBlock(props: CardsGridBlockType) {
  const background = (props.background ?? 'white') as SectionBackground
  const dark = isDark(background)
  const cards = props.cards ?? []

  return (
    <Section background={background}>
      <Container>
        <SectionHeading eyebrow={props.eyebrow} heading={props.heading} intro={props.intro} dark={dark} />
        <div className={`grid grid-cols-1 gap-6 ${colsClass[props.columns ?? '3'] ?? colsClass['3']}`}>
          {cards.map((card, i) => {
            const hasImageIcon = card.icon && typeof card.icon === 'object'
            return (
              <article
                key={i}
                className={`group flex flex-col rounded-2xl border p-7 transition-all duration-200 ${
                  dark
                    ? 'border-white/10 bg-white/[0.06] hover:bg-white/[0.1]'
                    : 'border-navy/[0.08] bg-white shadow-[0_1px_3px_rgba(17,2,77,0.04)] hover:-translate-y-0.5 hover:border-ochre/40 hover:shadow-[0_12px_30px_-12px_rgba(17,2,77,0.18)]'
                }`}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
                    dark ? 'bg-white/10 text-ochre' : 'bg-navy/[0.06] text-navy'
                  }`}
                >
                  {hasImageIcon ? (
                    <Media resource={card.icon} className="h-7 w-7 object-contain" sizes="28px" />
                  ) : (
                    <Icon name={card.iconName} size={26} />
                  )}
                </div>
                <h3 className={`text-lg font-bold ${dark ? 'text-white' : 'text-navy'}`}>{card.title}</h3>
                {card.description && (
                  <p className={`mt-2 text-[0.95rem] leading-relaxed ${dark ? 'text-pale/75' : 'text-ink/65'}`}>
                    {card.description}
                  </p>
                )}
                {card.enableLink && card.link?.label && (
                  <div className="mt-4">
                    <CMSLink link={{ ...card.link, appearance: 'link' }} />
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
