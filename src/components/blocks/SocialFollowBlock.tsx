import { Container } from '@/components/ui/Container'
import { Section, isDark, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { getSiteSettings } from '@/lib/payload'

/**
 * "Follow Nucleus" band (synthetic block). Reads the same `socials` array as the footer from
 * Site Settings, so the school maintains the links in one place.
 *
 * Worth a section of its own rather than a footer-only link: in Addis, Facebook and TikTok are
 * where parents actually check a school out before they call.
 */
export type SocialFollowProps = {
  blockType: 'socialFollow'
  heading?: string
  intro?: string
  background?: SectionBackground
}

export async function SocialFollowBlock({
  heading = 'Follow Nucleus',
  intro = 'See the classrooms, the camps and the day-to-day. We post most often on Facebook and TikTok.',
  background = 'mist',
}: SocialFollowProps) {
  const settings = await getSiteSettings().catch(() => null)
  const socials = settings?.socials ?? []
  if (socials.length === 0) return null

  const dark = isDark(background)

  return (
    <Section background={background}>
      <Container>
        <SectionHeading heading={heading} intro={intro} dark={dark} />
        <Reveal variant="up">
          <SocialLinks
            socials={socials}
            schoolName={settings?.schoolName ?? undefined}
            tone={dark ? 'footer' : 'light'}
            className="justify-center gap-3"
          />
        </Reveal>
      </Container>
    </Section>
  )
}
