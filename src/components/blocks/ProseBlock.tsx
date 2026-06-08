import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** A readable prose section for narrative page content (About, Academics, etc.). Synthetic block. */
export type ProseItem =
  | { type: 'lead'; text: string }
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }

export type ProseProps = {
  blockType: 'prose'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  align?: 'center' | 'left'
  items?: ProseItem[]
}

export function ProseBlock({ background = 'white', eyebrow, heading, intro, align = 'left', items = [] }: ProseProps) {
  const dark = isDark(background)
  const muted = dark ? 'text-pale/80' : 'text-ink/75'
  return (
    <Section background={background}>
      <Container width="narrow">
        <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} dark={dark} align={align} />
        <div className="space-y-5">
          {items.map((item, i) => {
            if (item.type === 'lead')
              return <p key={i} className={`text-xl leading-relaxed ${dark ? 'text-pale' : 'text-ink/90'}`}>{item.text}</p>
            if (item.type === 'h3')
              return <h3 key={i} className={`pt-4 text-2xl ${dark ? 'text-white' : 'text-navy'}`}>{item.text}</h3>
            if (item.type === 'ul')
              return (
                <ul key={i} className={`list-disc space-y-2 pl-6 ${muted}`}>
                  {item.items.map((li, j) => (
                    <li key={j}>{li}</li>
                  ))}
                </ul>
              )
            return <p key={i} className={`leading-relaxed ${muted}`}>{item.text}</p>
          })}
        </div>
      </Container>
    </Section>
  )
}
