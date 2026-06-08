import type { CTABandBlock as CTABandBlockType } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { CMSLink } from '@/components/ui/Button'

/** Full-bleed admissions CTA band. */
export function CTABandBlock(props: CTABandBlockType) {
  const background = (props.background ?? 'purple') as SectionBackground
  const dark = isDark(background)
  return (
    <Section background={background}>
      <Container className="text-center">
        <h2 className={`mx-auto max-w-2xl text-3xl font-bold sm:text-4xl ${dark ? 'text-white' : 'text-navy'}`}>
          {props.heading}
        </h2>
        {props.subhead && (
          <p className={`mx-auto mt-4 max-w-xl text-lg ${dark ? 'text-pale/85' : 'text-ink/70'}`}>
            {props.subhead}
          </p>
        )}
        {props.links && props.links.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {props.links.map((item, i) => (
              <CMSLink key={i} link={item.link} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
