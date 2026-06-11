import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { CountUp } from '@/components/ui/CountUp'
import { Orb } from '@/components/ui/Orb'

export type WhyCambridgeProps = {
  blockType: 'whyCambridge'
  eyebrow?: string
  heading?: string
  intro?: string
  stats?: { value: string; label: string }[]
  points?: { iconName: string; title: string; description?: string }[]
  link?: { label: string; url: string }
  /** Optional premium background photo, laid UNDER a near-opaque brand wash. */
  bgImage?: string
}

/**
 * "Why Cambridge" trust band (Lever 2 + Lever 3 atmosphere) — the school's strongest,
 * exclusive credential. Dark orb-glow emphasis band layered with brand texture: a dot
 * grid, two soft nucleus orbs, glassmorphic point cards and a woven-rule accent. Pure
 * CSS/SVG (no media), but accepts an optional `bgImage` shown faintly under the wash.
 */
export function WhyCambridgeBlock(props: WhyCambridgeProps) {
  const stats = props.stats ?? []
  const points = props.points ?? []

  return (
    <section className="relative overflow-hidden orb-glow py-[var(--spacing-section)] text-pale">
      {/* Optional premium photo, kept faint under a near-opaque brand wash (reads premium
          regardless of the photo, and hides quality differences in stock imagery). */}
      {props.bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
            style={{ backgroundImage: `url(${props.bgImage})` }}
            aria-hidden
          />
          <div className="absolute inset-0 orb-glow opacity-[0.92]" aria-hidden />
        </>
      )}

      {/* Brand texture + signature orbs (decorative). */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
      <Orb size={460} className="pointer-events-none absolute -bottom-28 -left-32 opacity-20" />
      <Orb size={300} className="pointer-events-none absolute -right-20 -top-16 opacity-[0.16]" />

      <Container className="relative">
        <SectionHeading eyebrow={props.eyebrow} heading={props.heading} intro={props.intro} dark />

        {stats.length > 0 && (
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-3">
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

        {/* Woven-rule accent (brand hairline). */}
        <div className="woven-rule mx-auto mt-14 h-[3px] w-28 opacity-70" aria-hidden />

        {points.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {points.map((p, i) => (
              <Reveal key={i} variant="up" delay={i * 80} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-200 hover:bg-white/[0.1]">
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
