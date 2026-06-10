import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/payload'
import { NAV } from './nav'

const PROGRAMS = [
  { label: 'Cambridge Pathway', href: '/cambridge-pathway' },
  { label: 'Robotics & STEM', href: '/robotics-stem' },
  { label: 'Agriculture & Animal Care', href: '/agriculture-animal-care' },
  { label: 'Admissions & Fees', href: '/admissions' },
]

export async function Footer() {
  const settings = await getSiteSettings().catch(() => null)
  const schoolName = settings?.schoolName ?? 'Nucleus International School'
  const phones = settings?.phones ?? []
  const address =
    settings?.address ??
    'Vatican, Addis Ababa — beside the Vatican Embassy (former Peace Corps compound), just before Mekanisa Abo Square'
  const email = settings?.email
  const tagline = settings?.footerTagline ?? 'Think Deeply. Create Boldly. Solve Truly.'
  const socials = settings?.socials ?? []

  return (
    <footer className="bg-navy text-pale">
      <div className="woven-rule h-1 w-full" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/nucleus-logo-white.webp"
            alt={schoolName}
            width={568}
            height={429}
            className="h-30 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm text-pale/75">{tagline}</p>
          <p lang="am" className="mt-2 text-sm text-ochre">
            ትምህርት ከደብተር ያልፋል
          </p>
        </div>

        <nav aria-label="Footer — explore">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-ochre">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm text-pale/80">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer — programs">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-ochre">Programs</p>
          <ul className="mt-4 space-y-2.5 text-sm text-pale/80">
            {PROGRAMS.map((item, i) => (
              <li key={i}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-ochre">Visit & Contact</p>
          <address className="mt-4 space-y-2.5 text-sm text-pale/80 not-italic">
            <p>{address}</p>
            {phones.map((p, i) => (
              <p key={i}>
                <a href={`tel:${(p.number ?? '').replace(/\s/g, '')}`} className="hover:text-white">
                  {p.number}
                </a>
              </p>
            ))}
            {email && (
              <p>
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </p>
            )}
          </address>
          {socials.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {socials.map((s, i) => (
                <li key={i}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="capitalize text-pale/80 hover:text-ochre">
                    {s.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-7xl px-5 py-6 text-xs text-pale/60 sm:px-8">
          © {schoolName}. A Cambridge international school at Vatican, Addis Ababa.
        </div>
      </div>
    </footer>
  )
}
