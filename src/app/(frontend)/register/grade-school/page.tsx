import type { Metadata } from 'next'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { registerPages } from '@/components/blocks/registerPages'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo'
import { shareImages } from '@/lib/shareImage'

/**
 * Grade 1 to Grade 8 registration, locked to the Vatican campus. Its own route (rather
 * than a `defaultPages` entry) because the slug has a path segment and `[slug]` matches only one.
 */
const page = registerPages['grade-school']

export const metadata: Metadata = {
  title: { absolute: page.seoTitle },
  description: page.description,
  alternates: { canonical: '/register/grade-school' },
  openGraph: {
    title: page.seoTitle,
    description: page.description,
    url: '/register/grade-school',
    images: shareImages(),
  },
  twitter: { card: 'summary_large_image', images: shareImages() },
}

export default function GradeSchoolRegistrationPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Registration', path: '/register' },
          { name: page.title, path: '/register/grade-school' },
        ])}
      />
      <BlockRenderer blocks={page.layout} />
    </>
  )
}
