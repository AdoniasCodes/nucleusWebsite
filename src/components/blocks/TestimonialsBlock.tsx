import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Social-proof band (synthetic block). Inline quotes for the code-defined homepage.
 * NOTE: quotes here are PLACEHOLDER until real parent testimonials are provided
 * (content/open-questions.md). Swap before publishing: do not present as real to the public.
 */
export type Testimonial = { quote: string; author: string; relationship?: string }
export type TestimonialsProps = {
  blockType: 'testimonials'
  heading?: string
  intro?: string
  background?: SectionBackground
  quotes?: Testimonial[]
}

export function TestimonialsBlock({ heading = 'What Parents Say', intro, background = 'white', quotes = [] }: TestimonialsProps) {
  const dark = isDark(background)
  if (quotes.length === 0) return null

  return (
    <Section background={background}>
      <Container>
        <SectionHeading heading={heading} intro={intro} dark={dark} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {quotes.map((t, i) => (
            <Reveal key={i} variant="up" delay={i * 110} className="h-full">
            <figure
              className={`flex h-full flex-col rounded-2xl border p-7 ${
                dark ? 'border-white/10 bg-white/[0.06]' : 'border-navy/[0.08] bg-white shadow-[0_1px_3px_rgba(17,2,77,0.04)]'
              }`}
            >
              <Icon name="Sparkles" size={22} className={dark ? 'text-ochre' : 'text-ochre-600'} />
              <blockquote className={`mt-4 flex-1 text-[1.02rem] leading-relaxed ${dark ? 'text-pale/90' : 'text-ink/80'}`}>
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5">
                <span className={`block font-display font-semibold ${dark ? 'text-white' : 'text-navy'}`}>{t.author}</span>
                {t.relationship && <span className={`text-sm ${dark ? 'text-pale/70' : 'text-ink/55'}`}>{t.relationship}</span>}
              </figcaption>
            </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
