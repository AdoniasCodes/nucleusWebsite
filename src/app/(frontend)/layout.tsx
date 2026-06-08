import React from 'react'
import type { Metadata } from 'next'
import { Jost, Lora, Noto_Sans_Ethiopic } from 'next/font/google'
import './styles.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getSEOSettings, getSiteSettings } from '@/lib/payload'

// Century Gothic → Jost (geometric sans). Hornbill → Lora (warm serif). Self-hosted = no CLS.
const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' })
const ethiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  weight: ['400', '600'],
  variable: '--font-ethiopic',
  display: 'swap',
})

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOSettings().catch(() => null)
  const siteName = seo?.siteName ?? 'Nucleus International School'
  const title = seo?.defaultMetaTitle ?? 'Nucleus International School — Cambridge School in Addis Ababa'
  const description =
    seo?.defaultMetaDescription ??
    'A Cambridge-curriculum international school in Mekanisa, Addis Ababa for ages 2–Grade 8.'

  return {
    metadataBase: new URL(SERVER_URL),
    title: {
      default: title,
      template: seo?.titleTemplate ?? `%s | ${siteName}`,
    },
    description,
    applicationName: siteName,
    openGraph: { type: 'website', siteName, title, description, locale: 'en_US' },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
    alternates: { canonical: '/' },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings().catch(() => null)

  return (
    <html lang="en" className={`${jost.variable} ${lora.variable} ${ethiopic.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header schoolName={settings?.schoolName ?? 'Nucleus International'} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
