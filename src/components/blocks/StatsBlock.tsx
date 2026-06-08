import type { StatsBlock as StatsBlockType } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section, type SectionBackground } from '@/components/ui/Section'

/** Trust/stats strip. Static numbers (SEO + perf first); animate later if desired. */
export function StatsBlock(props: StatsBlockType) {
  const background = (props.background ?? 'purple') as SectionBackground
  const items = props.items ?? []
  if (items.length === 0) return null

  return (
    <Section background={background} className="!py-12">
      <Container>
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <dt className="font-display text-4xl font-bold text-ochre sm:text-5xl">{item.value}</dt>
              <dd className="mt-2 text-sm font-medium uppercase tracking-wide text-pale/75">{item.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
