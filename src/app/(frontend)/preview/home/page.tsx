import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = { title: 'Homepage previews', robots: { index: false, follow: false } }

const OPTIONS = [
  { href: '/preview/home/a', name: 'Option A: Clear', text: 'Same layout. The navy tint is mostly gone and the photos carry more colour.' },
  { href: '/preview/home/b', name: 'Option B: Photo first', text: 'Only a soft scrim at the bottom of the hero, plus a big Playing. Learning. Laughing. photo band under it.' },
  { href: '/preview/home/c', name: 'Option C: Split panel', text: 'The words sit on a solid navy panel with a slanted edge, so the photo beside it has no tint at all.' },
  { href: '/preview/home/d', name: 'Option D: Split panel, all text inside', text: 'Like C, but the navy panel is wider and its slant is measured from the words, so every word sits on the purple side and the video side stays clean.' },
  { href: '/preview/home/e', name: 'Option E: Nucleus badge', text: 'The video plays inside a Nucleus badge shape with a gold edge. The rest of the section is a brand blue gradient.' },
  { href: '/', name: 'Today: current homepage', text: 'For comparison.' },
]

export default function Index() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-bold text-navy">Homepage options</h1>
      <p className="mt-3 text-ink/70">Open each one on your phone and on a computer. Same page, five looks.</p>
      <ul className="mt-8 space-y-4">
        {OPTIONS.map((o) => (
          <li key={o.href} className="rounded-2xl border border-navy/10 p-5">
            <Link href={o.href} className="font-display text-xl font-bold text-navy underline">{o.name}</Link>
            <p className="mt-1 text-ink/70">{o.text}</p>
          </li>
        ))}
      </ul>
    </Container>
  )
}
