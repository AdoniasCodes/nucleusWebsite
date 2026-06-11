import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

export type FeeTransparencyProps = {
  blockType: 'feeTransparency'
  eyebrow?: string
  heading?: string
  intro?: string
  points?: { iconName: string; title: string; description?: string }[]
  link?: { label: string; url: string }
}

/**
 * Fee-transparency / value band (Lever 2) — the brand strategy's #1 conversion weapon
 * against competitors' capital-fee surprises and mid-year hikes. Type + icons, no photos.
 */
export function FeeTransparencyBlock(props: FeeTransparencyProps) {
  const points = props.points ?? []

  return (
    <Section background="white">
      <Container>
        <SectionHeading eyebrow={props.eyebrow} heading={props.heading} intro={props.intro} />

        {points.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-3">
            {points.map((p, i) => (
              <Reveal key={i} variant="up" delay={i * 80} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-navy/[0.08] bg-offwhite p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-ochre/40 hover:shadow-[0_12px_30px_-12px_rgba(17,2,77,0.18)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/[0.06] text-navy">
                    <Icon name={p.iconName} size={26} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy">{p.title}</h3>
                  {p.description && (
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/65">{p.description}</p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {props.link && (
          <div className="mt-12 text-center">
            <ButtonLink href={props.link.url} appearance="primary">
              {props.link.label}
            </ButtonLink>
          </div>
        )}
      </Container>
    </Section>
  )
}
