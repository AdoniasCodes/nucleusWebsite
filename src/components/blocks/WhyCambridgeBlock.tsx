import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { CountUp } from '@/components/ui/CountUp'
import { InteractiveBackdrop } from '@/components/ui/InteractiveBackdrop'

export type WhyCambridgeProps = {
  blockType: 'whyCambridge'
  eyebrow?: string
  heading?: string
  intro?: string
  stats?: { value: string; label: string }[]
  points?: { iconName: string; title: string; description?: string }[]
  link?: { label: string; url: string }
}

/**
 * "Why Cambridge" trust band: the school's strongest, exclusive credential, on a dark
 * orb-glow band with a mouse-reactive woven-texture + nucleus-glow backdrop (no media).
 */
export function WhyCambridgeBlock(props: WhyCambridgeProps) {
  const stats = props.stats ?? []
  const points = props.points ?? []

  return (
    <section className="relative overflow-hidden orb-glow py-[var(--spacing-section)] text-pale">
      <InteractiveBackdrop />

      <Container className="relative">
        <SectionHeading eyebrow={props.eyebrow} heading={props.heading} intro={props.intro} dark />

        {stats.length > 0 && (
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-3 max-sm:[&>*:last-child:nth-child(odd)]:col-span-2">
            {stats.map((s, i) => (
              <Reveal key={i} variant="scale" delay={i * 90}>
                <div className="text-center">
                  <p className="font-display text-4xl font-bold text-ochre sm:text-5xl">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wide text-pale/75">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {points.length > 0 && (
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {points.map((p, i) => (
              <Reveal key={i} variant="up" delay={i * 80}>
                <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-ochre">
                    <Icon name={p.iconName} size={26} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                  {p.description && (
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-pale/80">{p.description}</p>
                  )}
                </div>
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
    </section>
  )
}
