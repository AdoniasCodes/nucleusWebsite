import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/seo/JsonLd'
import { SERVER_URL } from '@/lib/serverUrl'
import {
  DEFAULT_TERMS,
  DEPARTMENT_ORDER,
  HR_EMAIL,
  VACANCIES,
  formatVacancyDate,
  type Vacancy,
} from '@/lib/vacancies'
import { OpenDetailsOnHash } from './OpenDetailsOnHash'

/**
 * Vacancy announcements on /careers. Open posts sit on top with an apply route; filled posts
 * stay listed underneath as "Previous vacancies". Every role is a native <details>, so the full
 * job description is in the HTML (crawlable, works without JS) and opens on tap.
 */
export type VacanciesProps = {
  blockType: 'vacancies'
  background?: SectionBackground
  anchor?: string
  eyebrow?: string
  heading?: string
  intro?: string
}

const vacancyId = (v: Vacancy) => `vacancy-${v.slug}`

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-ink/75">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-x-2 leading-relaxed">
          <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-ochre" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function JobHeading({ children }: { children: React.ReactNode }) {
  return <h4 className="font-display text-base font-semibold text-navy">{children}</h4>
}

function VacancyCard({ vacancy: v }: { vacancy: Vacancy }) {
  const filled = v.status === 'filled'
  const mailto = `mailto:${HR_EMAIL}?subject=${encodeURIComponent(`Application: ${v.title}`)}`
  return (
    <details
      id={vacancyId(v)}
      className="group scroll-mt-24 rounded-2xl border border-navy/10 bg-white transition-shadow open:shadow-[0_12px_40px_-24px_rgba(17,2,77,0.35)]"
    >
      <summary className="flex cursor-pointer list-none items-start gap-4 rounded-2xl p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3 className="font-display text-lg font-semibold text-navy">{v.title}</h3>
            {filled ? (
              <span className="rounded-full bg-navy/[0.06] px-2.5 py-0.5 text-xs font-semibold text-ink/60">
                Position filled
              </span>
            ) : (
              <span className="rounded-full bg-ochre/20 px-2.5 py-0.5 text-xs font-semibold text-navy">Now hiring</span>
            )}
          </div>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/70">{v.summary}</p>
          <p className="mt-2 text-sm text-ink/50">
            {v.department} · {v.employmentType} · Posted{' '}
            <time dateTime={v.postedAt}>{formatVacancyDate(v.postedAt)}</time>
          </p>
        </div>
        <span className="mt-1 flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy">
          <span className="hidden sm:inline group-open:hidden">View role</span>
          <span className="hidden sm:group-open:inline">Close</span>
          <ChevronDown
            aria-hidden="true"
            className="h-5 w-5 text-ochre-600 transition-transform duration-200 group-open:rotate-180"
          />
        </span>
      </summary>

      <div className="border-t border-navy/10 px-5 pb-7 pt-6 sm:px-6">
        {filled && (
          <p className="mb-7 rounded-xl bg-mist px-4 py-3 text-sm leading-relaxed text-ink/75">
            This position has been filled. We keep every application on file, so you are welcome to{' '}
            <a href="#apply" className="font-semibold text-navy underline decoration-ochre underline-offset-4">
              send us your CV
            </a>{' '}
            for future openings.
          </p>
        )}

        <div className="max-w-3xl space-y-7">
          {v.sections.map((s) => (
            <div key={s.heading} className="space-y-3">
              <JobHeading>{s.heading}</JobHeading>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="leading-relaxed text-ink/75">
                  {p}
                </p>
              ))}
              {s.items && <Bullets items={s.items} />}
            </div>
          ))}

          <div className="space-y-3">
            <JobHeading>Salary and benefits</JobHeading>
            <p className="leading-relaxed text-ink/75">{v.terms ?? DEFAULT_TERMS}</p>
          </div>

          <div className="space-y-3 rounded-xl bg-offwhite p-5">
            <JobHeading>How to apply</JobHeading>
            <p className="leading-relaxed text-ink/75">
              Email your CV with a covering letter that explains your related experience and educational background
              to{' '}
              <a href={mailto} className="font-semibold text-navy underline decoration-ochre underline-offset-4">
                {HR_EMAIL}
              </a>
              , or apply through the form on this page.
              {v.applicationItems && ' Please also include the following, in a single PDF document:'}
            </p>
            {v.applicationItems && <Bullets items={v.applicationItems} />}
            {v.closingNote && <p className="text-sm font-semibold text-navy">{v.closingNote}</p>}
            {!filled && (
              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink href="#apply">Apply on this page</ButtonLink>
                <ButtonLink href={mailto} appearance="outline" className="text-navy">
                  Email HR
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </details>
  )
}

/** JobPosting schema, for open posts only. Google wants filled jobs to carry none. */
function jobPostingSchema(v: Vacancy) {
  const html = v.sections
    .map(
      (s) =>
        `<h4>${s.heading}</h4>` +
        (s.paragraphs ?? []).map((p) => `<p>${p}</p>`).join('') +
        (s.items ? `<ul>${s.items.map((i) => `<li>${i}</li>`).join('')}</ul>` : ''),
    )
    .join('')
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: v.title,
    description: html,
    datePosted: v.postedAt,
    employmentType: v.employmentType === 'Full-time' ? 'FULL_TIME' : 'PART_TIME',
    directApply: true,
    url: `${SERVER_URL}/careers#${vacancyId(v)}`,
    hiringOrganization: {
      '@type': 'EducationalOrganization',
      name: 'Nucleus International School',
      sameAs: SERVER_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Addis Ababa', addressCountry: 'ET' },
    },
  }
}

export function VacanciesBlock({
  background = 'white',
  anchor = 'vacancies',
  eyebrow = 'Vacancies',
  heading = 'Open positions',
  intro,
}: VacanciesProps) {
  const open = VACANCIES.filter((v) => v.status === 'open')
  const filled = VACANCIES.filter((v) => v.status === 'filled')
  const filledGroups = DEPARTMENT_ORDER.map((dept) => ({
    dept,
    roles: filled.filter((v) => v.department === dept),
  })).filter((g) => g.roles.length)

  return (
    <Section background={background} id={anchor} className="scroll-mt-20">
      {open.length > 0 && <JsonLd data={open.map(jobPostingSchema)} />}
      <OpenDetailsOnHash />
      <Container>
        <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />

        <div className="mx-auto max-w-4xl">
          {open.length > 0 ? (
            <div className="space-y-4">
              {open.map((v) => (
                <VacancyCard key={v.slug} vacancy={v} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-mist p-6 text-center sm:p-8">
              <p className="font-display text-lg font-semibold text-navy">No open vacancies right now.</p>
              <p className="mx-auto mt-2 max-w-xl leading-relaxed text-ink/70">
                New posts are announced here first. In the meantime, send us your CV: we keep every application on
                file and go to it first when a post opens.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <ButtonLink href="#apply">Send your CV</ButtonLink>
                <ButtonLink href={`mailto:${HR_EMAIL}`} appearance="outline" className="text-navy">
                  {HR_EMAIL}
                </ButtonLink>
              </div>
            </div>
          )}

          {filledGroups.length > 0 && (
            <div className="mt-16">
              <h3 className="font-display text-2xl font-bold text-navy">Previous vacancies</h3>
              <p className="mt-2 leading-relaxed text-ink/70">
                Roles we have advertised and since filled. Tap any role to read the full job description.
              </p>
              <div className="mt-8 space-y-10">
                {filledGroups.map((g) => (
                  <div key={g.dept}>
                    <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ochre-600">
                      {g.dept}
                    </p>
                    <div className="mt-4 space-y-3">
                      {g.roles.map((v) => (
                        <VacancyCard key={v.slug} vacancy={v} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
