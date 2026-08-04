import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Jost, Lora, Noto_Sans_Ethiopic } from 'next/font/google'
import './styles.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Analytics } from '@/components/seo/Analytics'
import { getSEOSettings, getSiteSettings } from '@/lib/payload'
import { SERVER_URL } from '@/lib/serverUrl'

// Century Gothic → Jost (geometric sans). Hornbill → Lora (warm serif). Self-hosted = no CLS.
const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' })
// Amharic appears only in a few sublines, load one weight and don't preload it, so it never
// blocks render (the audit flagged the Ethiopic font as render-blocking page weight).
const ethiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  weight: ['400'],
  variable: '--font-ethiopic',
  display: 'swap',
  preload: false,
})

export const viewport: Viewport = {
  themeColor: '#11024d',
  colorScheme: 'light',
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOSettings().catch(() => null)
  const siteName = seo?.siteName ?? 'Nucleus International Schools'
  // Keep ≤ 60 chars (the audit flagged a 66-char title). Front-loads the core keywords.
  const title = seo?.defaultMetaTitle ?? 'Nucleus International Schools | Cambridge in Addis Ababa'
  const description =
    seo?.defaultMetaDescription ??
    'A Cambridge-curriculum international school at Vatican, Addis Ababa (near Mekanisa Abo Square) for ages 2–Grade 8: secure campus, robotics, STEM and multilingual learning.'

  return {
    metadataBase: new URL(SERVER_URL),
    title: {
      default: title,
      template: seo?.titleTemplate ?? `%s | ${siteName}`,
    },
    description,
    applicationName: siteName,
    icons: {
      icon: [
        { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
        { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
        { url: '/favicon-512.png', type: 'image/png', sizes: '512x512' },
      ],
      shortcut: '/favicon-32.png',
      apple: '/apple-touch-icon.png',
    },
    openGraph: { type: 'website', siteName, title, description, locale: 'en_US', url: SERVER_URL },
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
        <Analytics />
      </body>
    </html>
  )
}
