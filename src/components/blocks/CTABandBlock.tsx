import type { CTABandBlock as CTABandBlockType } from '@/payload-types'
import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { CMSLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Full-bleed admissions CTA band. Heading, subhead and CTAs reveal in a soft stagger.
 * Optional code-only `bgImage` turns the band into a parallax panel: the photo is pinned
 * with `bg-fixed` (background-attachment: fixed) so it stays put while the page scrolls over
 * it, under a navy overlay for legibility. (iOS falls back to a normal scroll — graceful.)
 */
export function CTABandBlock(props: CTABandBlockType & { bgImage?: string }) {
  const background = (props.background ?? 'purple') as SectionBackground
  const dark = props.bgImage ? true : isDark(background)

  const inner = (
    <Container className="relative text-center">
      <Reveal variant="up">
        <h2 className={`mx-auto max-w-2xl text-3xl font-bold sm:text-4xl ${dark ? 'text-white' : 'text-navy'}`}>
          {props.heading}
        </h2>
      </Reveal>
      {props.subhead && (
        <Reveal variant="up" delay={100}>
          <p
            className={`mx-auto mt-4 max-w-xl text-lg ${
              props.bgImage ? 'text-pale' : dark ? 'text-pale/85' : 'text-ink/70'
            }`}
          >
            {props.subhead}
          </p>
        </Reveal>
      )}
      {props.links && props.links.length > 0 && (
        <Reveal variant="up" delay={180}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {props.links.map((item, i) => (
              <CMSLink key={i} link={item.link} />
            ))}
          </div>
        </Reveal>
      )}
    </Container>
  )

  if (props.bgImage) {
    return (
      <section className="relative overflow-hidden py-[var(--spacing-section)] text-pale">
        <div
          className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
          style={{ backgroundImage: `url(${props.bgImage})` }}
          aria-hidden
        />
        {/* Two-part tint instead of one flat wash. The photo should stay bright and readable as
            a photo, so the overall tint is deliberately light — but these campus shots have a
            blown-out sky and sunlit turf, and white text over that is illegible. So the light
            wash is paired with a soft scrim that sits only behind the copy, fading out well
            before the edges. The frame reads open; the words still clear AA contrast. */}
        <div className="absolute inset-0 bg-navy/25" aria-hidden />
        <div
          className="absolute inset-0 [background:radial-gradient(72%_68%_at_50%_50%,rgba(26,29,74,0.84)_0%,rgba(26,29,74,0.68)_40%,rgba(26,29,74,0.16)_74%,transparent_100%)]"
          aria-hidden
        />
        {inner}
      </section>
    )
  }

  return <Section background={background}>{inner}</Section>
}
