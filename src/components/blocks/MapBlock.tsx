import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { SERVER_URL } from '@/lib/serverUrl'

/**
 * Code-only block: one or more campus locations, each with an address panel + embedded Google Map.
 * Reassures parents near the conversion CTA and emits a LocalBusiness/School schema per campus
 * (Google Business Profile / local-SEO signal — accurate NAP for each site).
 */
export type MapCampus = {
  /** Campus label, e.g. "Grade School Campus". */
  name: string
  /** Google Maps embed src (output=embed). */
  embedSrc: string
  /** Short link / place URL for the "Get directions" button. */
  directionsUrl: string
  /** Address + orientation lines shown beside the map. */
  rows: { iconName: string; title: string; description: string }[]
  /** Plain address string used for the LocalBusiness schema. */
  streetAddress: string
  /** Optional phone(s) for this campus's schema. */
  telephone?: string[]
}

export type MapProps = {
  blockType: 'map'
  eyebrow?: string
  heading?: string
  intro?: string
  campuses: MapCampus[]
  /** Soft note shown under the campuses. */
  note?: string
}

function CampusBlock({ campus }: { campus: MapCampus }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-stretch">
      {/* Location details */}
      <Reveal variant="left">
        <div className="flex h-full flex-col gap-6 rounded-2xl border border-navy/[0.08] bg-mist/60 p-7 sm:p-8">
          <h3 className="font-display text-xl font-bold text-navy">{campus.name}</h3>
          <ul className="flex flex-col gap-5">
            {campus.rows.map((row, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/[0.06] text-navy">
                  <Icon name={row.iconName} size={22} />
                </span>
                <div>
                  <h4 className="text-base font-bold text-navy">{row.title}</h4>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/65">{row.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href={campus.directionsUrl}
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
            title={`${campus.name} location map`}
            src={campus.embedSrc}
            className="h-full w-full"
            style={{ border: 0, minHeight: 340 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Reveal>
    </div>
  )
}

export function MapBlock(props: MapProps) {
  const campuses = props.campuses ?? []

  // One LocalBusiness/School node per campus — accurate NAP for Google Business Profile / local SEO.
  const schema = campuses.map((c) => ({
    '@context': 'https://schema.org',
    '@type': ['School', 'LocalBusiness'],
    name: `Nucleus International Schools — ${c.name}`,
    url: SERVER_URL,
    ...(c.telephone?.length ? { telephone: c.telephone } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.streetAddress,
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET',
    },
  }))

  return (
    <Section background="white">
      <Container>
        <SectionHeading eyebrow={props.eyebrow} heading={props.heading} intro={props.intro} />
        <div className="flex flex-col gap-10">
          {campuses.map((campus, i) => (
            <CampusBlock key={i} campus={campus} />
          ))}
        </div>

        {props.note && (
          <p className="mt-8 rounded-xl border border-ochre/30 bg-ochre/[0.07] px-4 py-3 text-[0.95rem] leading-relaxed text-ink/70">
            {props.note}
          </p>
        )}
      </Container>
      {schema.length > 0 && <JsonLd data={schema} />}
    </Section>
  )
}
