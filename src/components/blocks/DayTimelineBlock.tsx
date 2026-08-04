import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

export type DayTimelineProps = {
  blockType: 'dayTimeline'
  eyebrow?: string
  heading?: string
  intro?: string
  steps?: { time: string; iconName: string; title: string; description?: string }[]
}

/**
 * "A Day at Nucleus" icon timeline (Lever 2): tells the daily-experience story with
 * icons + the brand palette, no photos. Horizontal connected line on desktop, stacked
 * rows on mobile. The icon ring uses the section bg colour so the line reads as "threaded".
 */
export function DayTimelineBlock(props: DayTimelineProps) {
  const steps = props.steps ?? []
  if (steps.length === 0) return null

  return (
    <Section background="offwhite">
      <Container>
        <SectionHeading eyebrow={props.eyebrow} heading={props.heading} intro={props.intro} />

        <div className="relative">
          {/* Desktop connecting line, threaded behind the icon rings. */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-ochre/45 to-transparent lg:block"
            aria-hidden
          />
          <ol className="grid gap-9 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((step, i) => (
              <li key={i}>
                <Reveal variant="up" delay={(i % 6) * 70}>
                  <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-ochre ring-4 ring-offwhite">
                      <Icon name={step.iconName} size={24} />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-ochre-600">{step.time}</p>
                      <h3 className="mt-0.5 font-display text-base font-bold text-navy">{step.title}</h3>
                      {step.description && (
                        <p className="mt-1 text-sm leading-relaxed text-ink/65">{step.description}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
