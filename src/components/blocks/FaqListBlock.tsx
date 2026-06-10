import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/ui/Reveal'

/**
 * FAQ accordion. Uses native <details>/<summary> — accessible, SEO-crawlable, and zero client JS.
 * Emits FAQPage JSON-LD to win "People Also Ask" + AI-answer real estate (synthetic block).
 */
export type FaqItem = { q: string; a: string }
export type FaqListProps = {
  blockType: 'faqList'
  heading?: string
  intro?: string
  background?: SectionBackground
  renderSchema?: boolean
  items?: FaqItem[]
}

export function FaqListBlock({ heading = 'Frequently Asked Questions', intro, background = 'offwhite', renderSchema = true, items = [] }: FaqListProps) {
  const dark = isDark(background)
  if (items.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }

  return (
    <Section background={background}>
      {renderSchema && <JsonLd data={schema} />}
      <Container width="narrow">
        <SectionHeading heading={heading} intro={intro} dark={dark} />
        <Reveal variant="up" className="divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
          {items.map((it, i) => (
            <details key={i} className="group px-6 py-4 open:bg-navy/[0.02]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-navy">
                {it.q}
                <span className="shrink-0 text-ochre transition-transform group-open:rotate-45" aria-hidden>＋</span>
              </summary>
              <p className="mt-3 leading-relaxed text-ink/75">{it.a}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
