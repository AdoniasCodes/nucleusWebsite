import type { SiteSetting, SeoSetting } from '@/payload-types'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const mediaUrl = (m: unknown): string | undefined =>
  m && typeof m === 'object' && 'url' in m && typeof (m as { url?: string }).url === 'string'
    ? new URL((m as { url: string }).url, SERVER_URL).toString()
    : undefined

/**
 * Site-wide JSON-LD: EducationalOrganization (with local-business signals — address,
 * geo, phones) + WebSite. Rendered once in the homepage <head>. See project-docs/schema.md.
 */
export function buildOrganizationSchema(settings?: SiteSetting | null, seo?: SeoSetting | null) {
  const name = seo?.siteName ?? settings?.schoolName ?? 'Nucleus International School'
  const phones = (settings?.phones ?? []).map((p) => p.number).filter(Boolean) as string[]
  const sameAs = (settings?.socials ?? []).map((s) => s.url).filter(Boolean) as string[]
  const logo = mediaUrl(seo?.organization?.logo) || `${SERVER_URL}/images/nucleus-logo.png`

  const organization = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${SERVER_URL}/#organization`,
    name,
    legalName: seo?.organization?.legalName ?? name,
    url: SERVER_URL,
    description: seo?.defaultMetaDescription ?? undefined,
    ...(logo ? { logo, image: logo } : {}),
    ...(phones.length ? { telephone: phones } : {}),
    ...(seo?.organization?.foundingYear ? { foundingDate: seo.organization.foundingYear } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings?.address ?? 'Mekanisa, ~100m from Mekanisa Abo Square',
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET',
    },
    ...(settings?.latitude && settings?.longitude
      ? { geo: { '@type': 'GeoCoordinates', latitude: settings.latitude, longitude: settings.longitude } }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SERVER_URL}/#website`,
    url: SERVER_URL,
    name,
    publisher: { '@id': `${SERVER_URL}/#organization` },
  }

  return [organization, website]
}

/** Breadcrumb JSON-LD for inner pages (clarifies hierarchy for search + AEO). */
export function buildBreadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SERVER_URL}${t.path}`,
    })),
  }
}
