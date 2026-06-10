import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

/** Code-only block: location + embedded Google Map. Reassures parents near the conversion CTA. */
export type MapProps = {
  blockType: 'map'
  eyebrow?: string
  heading?: string
  intro?: string
  /** Google Maps embed src (output=embed). */
  embedSrc: string
  /** Short link / place URL for the "Get directions" button. */
  directionsUrl: string
  /** Address + orientation lines shown beside the map. */
  rows?: { iconName: string; title: string; description: string }[]
  /** Soft note, e.g. our preschool location. */
  note?: string
}

const DEFAULT_EMBED =
  'https://www.google.com/maps?q=Peace+Corps+Ethiopia,+Addis+Ababa&z=15&hl=en&output=embed'

export function MapBlock(props: MapProps) {
  const rows = props.rows ?? []
  return (
    <Section background="white">
      <Container>
        <SectionHeading eyebrow={props.eyebrow} heading={props.heading} intro={props.intro} />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-stretch">
          {/* Location details */}
          <Reveal variant="left">
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-navy/[0.08] bg-mist/60 p-7 sm:p-8">
              <ul className="flex flex-col gap-5">
                {rows.map((row, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/[0.06] text-navy">
                      <Icon name={row.iconName} size={22} />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-navy">{row.title}</h3>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/65">{row.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {props.note && (
                <p className="rounded-xl border border-ochre/30 bg-ochre/[0.07] px-4 py-3 text-[0.9rem] leading-relaxed text-ink/70">
                  {props.note}
                </p>
              )}

              <a
                href={props.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 self-start rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ochre hover:text-navy"
              >
                <Icon name="MapPin" size={18} />
                Get directions
              </a>
            </div>
          </Reveal>

          {/* Embedded map */}
          <Reveal variant="right" delay={120}>
            <div className="h-full min-h-[340px] overflow-hidden rounded-2xl border border-navy/[0.08] shadow-[0_12px_40px_-18px_rgba(17,2,77,0.28)]">
              <iframe
                title="Nucleus International School location map"
                src={props.embedSrc || DEFAULT_EMBED}
                className="h-full w-full"
                style={{ border: 0, minHeight: 340 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
