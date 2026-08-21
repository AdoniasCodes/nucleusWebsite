import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'

/**
 * A deliberately small recruitment strip, sized to sit under the team grid without
 * competing with the page's real CTA band. One line of copy, one button. Synthetic block.
 */
export type JoinTeamProps = {
  blockType: 'joinTeam'
  heading?: string
  text?: string
  ctaLabel?: string
  ctaHref?: string
}

export function JoinTeamBlock({
  heading = 'Want to join this team?',
  text = 'We are always glad to hear from teachers and school staff who take their subject seriously.',
  ctaLabel = 'See Careers',
  ctaHref = '/careers',
}: JoinTeamProps) {
  return (
    <section className="bg-offwhite pb-[var(--spacing-section)]">
      <Container>
        <Reveal variant="up">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-navy/10 bg-white px-6 py-7 text-center shadow-[0_18px_40px_-28px_rgba(17,2,77,0.35)] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:text-left">
            <div className="flex items-center gap-4">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mist text-navy sm:flex">
                <Icon name="Users" size={24} />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-navy">{heading}</h3>
                <p className="mt-1 text-[0.98rem] leading-relaxed text-ink/70">{text}</p>
              </div>
            </div>
            <ButtonLink href={ctaHref} appearance="primary" className="shrink-0">
              {ctaLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
