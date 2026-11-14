import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { ExperienceForm } from '@/components/experience/ExperienceForm'
import { StarsDisplay } from '@/components/experience/Stars'
import { buildBreadcrumbSchema, brandTitle } from '@/lib/seo'
import { shareImages } from '@/lib/shareImage'
import { getPayloadClient, getSiteSettings } from '@/lib/payload'
import { mintFormToken } from '@/lib/formToken'

// Daily refresh (and on demand from the admin) so the baked-in form token never ages out.
export const revalidate = 86400

const TITLE = brandTitle('Share Your Nucleus Experience')
const DESCRIPTION =
  'Parents of our international Cambridge curriculum school in Addis Ababa: share your experience to help other families choose. Our team reads every message first.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/experience' },
  robots: { index: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/experience', images: shareImages() },
  twitter: { card: 'summary_large_image', images: shareImages() },
}

const FALLBACK_FACEBOOK = 'https://www.facebook.com/NucleusDaycare/'

export default async function ExperiencePage() {
  const payload = await getPayloadClient()
  // The grid is optional, so a failed read (for example before the status column is pushed to
  // the DB) hides it instead of failing the build. Any testimonial save re-renders the page.
  const [settings, approved] = await Promise.all([
    getSiteSettings().catch(() => null),
    payload.find({
      collection: 'testimonials',
      where: { status: { equals: 'approved' } },
      sort: '-createdAt',
      limit: 12,
      depth: 0,
    }).catch(() => null),
  ])

  const fb = settings?.socials?.find((s) => s.platform === 'facebook')?.url || FALLBACK_FACEBOOK
  const facebookUrl = `${fb.replace(/\/+$/, '')}/reviews`
  const formToken = mintFormToken()
  const items = approved?.docs ?? []

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Share Your Experience', path: '/experience' },
        ])}
      />

      <Section background="mist" className="pt-24 sm:pt-28">
        <Container width="narrow">
          <Reveal variant="up" className="text-center">
            <h1 className="text-4xl text-navy sm:text-5xl">Share Your Nucleus Experience</h1>
            <p className="mt-5 text-lg text-ink/75">
              Your words help other families choose. Tell us what school life is really like for your child. Our staff
              read every message before it appears on the site.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section background="white">
        <Container width="narrow">
          <ExperienceForm formToken={formToken} facebookUrl={facebookUrl} />
        </Container>
      </Section>

      {items.length > 0 && (
        <Section background="mist">
          <Container>
            <SectionHeading heading="What Nucleus parents say" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((t, i) => (
                <Reveal key={t.id} variant="up" delay={(i % 3) * 100} className="h-full">
                  <figure className="flex h-full flex-col rounded-2xl border border-navy/[0.08] bg-white p-7 shadow-[0_1px_3px_rgba(17,2,77,0.04)]">
                    {typeof t.rating === 'number' && <StarsDisplay rating={t.rating} />}
                    <blockquote className="mt-3 flex-1 whitespace-pre-line text-[1.02rem] leading-relaxed text-ink/80">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-5 border-t border-navy/10 pt-4">
                      <span className="font-display font-semibold text-navy">{t.authorName}</span>
                      {(t.childYear || t.relationship) && (
                        <span className="block text-sm text-ink/60">{t.childYear || t.relationship}</span>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
