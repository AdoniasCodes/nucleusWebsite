import Link from 'next/link'
import { Orb } from '@/components/ui/Orb'
import { getSiteSettings } from '@/lib/payload'
import { NAV } from './nav'

const PROGRAMS = [
  { label: 'Cambridge Pathway', href: '/academics' },
  { label: 'Robotics & STEM', href: '/academics' },
  { label: 'Agriculture & Animal Care', href: '/academics' },
  { label: 'Admissions', href: '/admissions' },
]

export async function Footer() {
  const settings = await getSiteSettings().catch(() => null)
  const schoolName = settings?.schoolName ?? 'Nucleus International School'
  const phones = settings?.phones ?? []
  const address = settings?.address ?? 'Mekanisa, ~100m from Mekanisa Abo Square, Addis Ababa, Ethiopia'
  const email = settings?.email
  const tagline = settings?.footerTagline ?? 'Think Deeply. Create Boldly. Solve Truly.'
  const socials = settings?.socials ?? []

  return (
    <footer className="bg-navy text-pale">
      <div className="woven-rule h-1 w-full" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Orb size={40} />
            <span className="font-display text-lg font-bold text-white">{schoolName}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-pale/75">{tagline}</p>
          <p lang="am" className="mt-2 text-sm text-ochre">
            ትምህርት ከደብተር ያልፋል
          </p>
        </div>

        <nav aria-label="Footer — explore">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-ochre">Explore</h2>
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
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-ochre">Programs</h2>
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
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-ochre">Visit & Contact</h2>
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
          © {schoolName}. A Cambridge international school in Mekanisa, Addis Ababa.
        </div>
      </div>
    </footer>
  )
}
