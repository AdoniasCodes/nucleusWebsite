import type { Metadata } from 'next'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { registerPages } from '@/components/blocks/registerPages'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo'

/**
 * Preschool / KG registration, locked to the Mekanisa Abo Square campus. Its own route (rather
 * than a `defaultPages` entry) because the slug has a path segment and `[slug]` matches only one.
 */
const page = registerPages.primary

export const metadata: Metadata = {
  title: { absolute: page.seoTitle },
  description: page.description,
  alternates: { canonical: '/register/primary' },
  openGraph: { title: page.seoTitle, description: page.description, url: '/register/primary' },
}

export default function PrimaryRegistrationPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Registration', path: '/register' },
          { name: page.title, path: '/register/primary' },
        ])}
      />
      <BlockRenderer blocks={page.layout} />
    </>
  )
}
