import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section, type SectionBackground } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

/**
 * "Officially registered with Cambridge": the school's Cambridge Primary registration certificate
 * shown as a physical document (white paper, soft navy shadow, tilted) in front of a large Nucleus
 * shield silhouette. The certificate straightens and lifts on hover/focus (motion-safe only).
 * Ends with one quiet inline prospectus download link. Synthetic, code-defined block (no CMS schema).
 */
export type CambridgeCertificateProps = {
  blockType: 'cambridgeCertificate'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  facts?: { label: string; value: string }[]
  imageUrl?: string
  imageAlt?: string
  prospectusUrl?: string
  prospectusLabel?: string
}

const DEFAULT_FACTS = [
  { label: 'Registered as', value: 'Cambridge Primary School' },
  { label: 'Registered school', value: 'ET030' },
  { label: 'Issued', value: '23 September 2026' },
  { label: 'Awarded by', value: 'Cambridge University Press & Assessment' },
]

// Nucleus shield outline in objectBoundingBox units (0..1), aspect width/height = 0.7203.
const SHIELD_PATH =
  'M0.4985,0.0000 L0.0617,0.0853 L0.0555,0.0998 L0.0384,0.1202 L0.0000,0.1466 L0.0000,0.6947 L0.0217,0.7416 L0.0505,0.7849 L0.0801,0.8149 L0.1272,0.8486 L0.2103,0.8930 L0.3237,0.9459 L0.4047,0.9736 L0.4998,1.0000 L0.5953,0.9736 L0.6763,0.9459 L0.8018,0.8870 L0.8707,0.8498 L0.9141,0.8197 L0.9474,0.7873 L0.9783,0.7416 L1.0000,0.6947 L1.0000,0.1466 L0.9604,0.1190 L0.9445,0.0998 L0.9383,0.0853 L0.5015,0.0000 Z'

export function CambridgeCertificateBlock({
  background = 'white',
  eyebrow = 'Cambridge Registration',
  heading = 'Officially registered with Cambridge',
  intro = 'Nucleus International Schools is a registered Cambridge Primary School. The certificate comes from Cambridge International Education, part of Cambridge University Press & Assessment, and it means our primary classrooms teach the international Cambridge curriculum to the standard Cambridge sets and checks.',
  facts = DEFAULT_FACTS,
  imageUrl = '/images/cambridge/nucleus-cambridge-primary-certificate.webp',
  imageAlt = 'Cambridge International Education Certificate of Registration stating that Nucleus International Schools has registered as a Cambridge Primary School, registered school ET030, issued on 23 September 2026.',
  prospectusUrl = '/downloads/nucleus-international-schools-prospectus.pdf',
  prospectusLabel = 'Download the school prospectus (PDF, 5.6 MB)',
}: CambridgeCertificateProps) {
  return (
    <Section background={background} id="cambridge-certificate" className="scroll-mt-24 overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Certificate first on mobile */}
          <Reveal variant="up" className="mx-auto w-full max-w-[320px] md:max-w-[380px]">
            <div className="relative mx-auto w-full py-6">
              {/* Shield silhouette behind the paper */}
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 1 1"
                preserveAspectRatio="none"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[118%] -translate-x-1/2 -translate-y-1/2"
                style={{ aspectRatio: '0.7203' }}
              >
                <path d={SHIELD_PATH} fill="var(--color-pale)" />
              </svg>

              <a
                href={imageUrl}
                target="_blank"
                rel="noopener"
                aria-label="View the full certificate (opens in a new tab)"
                className="group relative z-10 block rounded-[3px] bg-white p-1.5 shadow-[0_28px_50px_-18px_rgba(17,2,77,0.5),0_6px_14px_-6px_rgba(17,2,77,0.3)] ring-1 ring-navy/10 outline-offset-4 motion-safe:rotate-[-2deg] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:-translate-y-2 motion-safe:hover:rotate-0 motion-safe:focus-visible:-translate-y-2 motion-safe:focus-visible:rotate-0"
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={1400}
                  height={1980}
                  sizes="(min-width: 768px) 380px, 320px"
                  loading="lazy"
                  className="h-auto w-full"
                />
              </a>
            </div>
            <p className="mt-4 text-center">
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-navy underline underline-offset-4 hover:text-ochre-600"
              >
                View the full certificate
              </a>
            </p>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <div className="text-center md:text-left">
              {eyebrow && (
                <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ochre-600">{eyebrow}</p>
              )}
              {heading && <h2 className="mt-3 text-3xl text-navy sm:text-4xl">{heading}</h2>}
              {intro && <p className="mt-4 text-lg text-ink/75">{intro}</p>}
            </div>

            {facts.length > 0 && (
              <dl className="mt-8 divide-y divide-navy/10 border-y border-navy/10">
                {facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[8.5rem_1fr] gap-4 py-3 sm:grid-cols-[10rem_1fr]">
                    <dt className="text-sm font-medium uppercase tracking-wide text-ink/60">{f.label}</dt>
                    <dd className="font-display font-semibold text-navy">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {prospectusUrl && (
              <p className="mt-6 text-center md:text-left">
                <a
                  href={prospectusUrl}
                  download
                  className="inline-flex min-h-11 items-center text-[0.95rem] text-ink underline underline-offset-4 hover:text-navy"
                >
                  {prospectusLabel}
                </a>
              </p>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
