import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

export type CampusChoiceOption = {
  /** The grade band. This is the headline, because it is what a parent actually knows. */
  grades: string
  campus: string
  where: string
  iconName: string
  href: string
}

export type CampusChoiceProps = {
  blockType: 'campusChoice'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  anchor?: string
  options: CampusChoiceOption[]
}

/**
 * The fork at the top of /register: two campuses, two forms. A parent knows their child's grade,
 * not our campus names, so the grade band leads and the campus follows. The whole card is the
 * link (a full-card tap target beats a small button on a phone on mobile data), and the ochre
 * spine on the left is the only decoration: it thickens on hover and focus so the active card is
 * obvious without a colour change that would hurt contrast.
 */
export function CampusChoiceBlock({
  background = 'white',
  eyebrow,
  heading,
  intro,
  anchor,
  options,
}: CampusChoiceProps) {
  return (
    <Section background={background} id={anchor}>
      <Container>
        <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {options.map((option, i) => (
            <Reveal key={option.href} variant={i === 0 ? 'left' : 'right'} className="h-full">
              <Link
                href={option.href}
                className="group flex h-full flex-col rounded-2xl border border-navy/[0.08] bg-white p-6 shadow-[0_4px_14px_-6px_rgba(17,2,77,0.12)] transition duration-200 hover:-translate-y-0.5 hover:border-ochre hover:shadow-[0_18px_40px_-16px_rgba(17,2,77,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre sm:p-8"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy/[0.06] text-navy transition-colors duration-200 group-hover:bg-navy group-hover:text-ochre">
                    <Icon name={option.iconName} size={22} />
                  </span>
                  <span className="h-8 w-1 rounded-full bg-ochre/40 transition-all duration-200 group-hover:h-10 group-hover:bg-ochre" />
                </span>

                <span className="mt-5 block font-display text-2xl font-bold leading-tight text-navy sm:text-[1.75rem]">
                  {option.grades}
                </span>

                <span className="mt-3 flex items-start gap-2 text-ink/70">
                  <Icon name="MapPin" size={18} className="mt-0.5 shrink-0 text-ochre-600" />
                  <span>
                    <span className="block font-display font-semibold text-navy">{option.campus}</span>
                    <span className="mt-1 block text-sm leading-relaxed">{option.where}</span>
                  </span>
                </span>

                <span className="mt-6 inline-flex items-center gap-2 font-display text-base font-semibold text-navy transition-colors duration-200 group-hover:text-ochre-600">
                  Register here
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
