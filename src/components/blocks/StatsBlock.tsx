import type { StatsBlock as StatsBlockType } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section, type SectionBackground } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CountUp } from '@/components/ui/CountUp'

/** Trust/stats strip. Numbers scale-reveal in a quick stagger as the strip enters view. */
export function StatsBlock(props: StatsBlockType) {
  const background = (props.background ?? 'purple') as SectionBackground
  const items = props.items ?? []
  if (items.length === 0) return null

  return (
    <Section background={background} className="!py-12">
      <Container>
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={i} variant="scale" delay={i * 90}>
              <div className="text-center">
                <dt className="font-display text-[1.6rem] font-bold leading-tight text-ochre sm:text-5xl">
                  <CountUp value={item.value} />
                </dt>
                <dd className="mt-2 text-sm font-medium uppercase tracking-wide text-pale/75">{item.label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
