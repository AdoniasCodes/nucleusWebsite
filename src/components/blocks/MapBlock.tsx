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
 * (Google Business Profile / local-SEO signal: accurate NAP for each site).
 */
export type MapCampus = {
  /** Campus label, e.g. "Grade School Campus". */
  name: string
  /** Google Maps embed src (output=embed). Omit when no verified location exists (no map is shown). */
  embedSrc?: string
  /** Short link / place URL for the "Get directions" button. Omit with embedSrc. */
  directionsUrl?: string
  /** Optional "Call <campus>" button on the card: label + tel number (no spaces). */
  callLabel?: string
  callTel?: string
  /** Address + orientation lines shown beside the map. */
  rows: { iconName: string; title: string; description: string }[]
  /** Plain address string used for the LocalBusiness schema. */
  streetAddress: string
  /** Optional phone(s) for this campus's schema. */
  telephone?: string[]
  /**
   * Set for a campus that is announced but not yet operating. It still renders (families
   * planning ahead should see it is coming) but is EXCLUDED from the School/LocalBusiness
   * JSON-LD: publishing a school entity at an address with no school at it is a bad local-SEO
   * signal and simply not true yet.
   */
  notYetOpen?: boolean
}

export type MapProps = {
  blockType: 'map'
  eyebrow?: string
  heading?: string
  intro?: string
  campuses: MapCampus[]
  /** Soft note shown under the campuses. */
  note?: string
  /** Code-only HTML id so a link like #our-campuses scrolls here (lands on the campus cards). */
  anchor?: string
  /** Code-only. 'columns' puts the campuses side by side on desktop (card above a shorter
   * map), so both fit on one laptop screen. Default 'rows': one campus per row, map beside it. */
  layout?: 'rows' | 'columns'
}

function CampusBlock({ campus, columns = false }: { campus: MapCampus; columns?: boolean }) {
  const mapHeight = columns ? 260 : 340
  return (
    <div
      className={
        columns
          ? 'grid gap-5'
          : campus.embedSrc
            ? 'grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-stretch'
            : 'grid gap-8'
      }
    >
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
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/65">
                    {row.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {(campus.callTel || campus.directionsUrl) && (
            <div className="mt-auto flex flex-wrap items-center gap-3">
              {campus.callTel && (
                <a
                  href={`tel:${campus.callTel}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ochre px-6 py-3 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-ochre-600"
                >
                  <Icon name="Phone" size={18} />
                  {campus.callLabel ?? 'Call us'}
                </a>
              )}
              {campus.directionsUrl && (
                <a
                  href={campus.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ochre hover:text-navy"
                >
                  <Icon name="MapPin" size={18} />
                  Get directions
                </a>
              )}
            </div>
          )}
        </div>
      </Reveal>

      {/* Embedded map (skipped for a campus with no verified map location) */}
      {campus.embedSrc && (
        <Reveal variant="right" delay={120}>
          <div
            className="h-full overflow-hidden rounded-2xl border border-navy/[0.08] shadow-[0_12px_40px_-18px_rgba(17,2,77,0.28)]"
            style={{ minHeight: mapHeight }}
          >
            <iframe
              title={`${campus.name} location map`}
              src={campus.embedSrc}
              className="h-full w-full"
              style={{ border: 0, minHeight: mapHeight }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      )}
    </div>
  )
}

export function MapBlock(props: MapProps) {
  const campuses = props.campuses ?? []

  // One LocalBusiness/School node per OPERATING campus, accurate NAP for Google Business
  // Profile / local SEO. Campuses still under construction are deliberately left out.
  const schema = campuses
    .filter((c) => !c.notYetOpen)
    .map((c) => ({
      '@context': 'https://schema.org',
      '@type': ['School', 'LocalBusiness'],
      name: `Nucleus International Schools, ${c.name}`,
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
        <div
          id={props.anchor}
          className={`scroll-mt-28 ${props.layout === 'columns' ? 'grid gap-10 lg:grid-cols-2 lg:gap-8' : 'flex flex-col gap-10'}`}
        >
          {campuses.map((campus, i) => (
            <CampusBlock key={i} campus={campus} columns={props.layout === 'columns'} />
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
