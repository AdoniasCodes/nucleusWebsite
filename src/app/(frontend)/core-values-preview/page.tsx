import type { Metadata } from 'next'
import { CoreValuesOrbit } from '@/components/blocks/CoreValuesOrbit'

// Internal design-review page — do NOT index. Delete once Eyoel picks an alignment.
export const metadata: Metadata = { title: 'Core Values — Option C Alignments', robots: { index: false, follow: false } }

const VALUES = [
  { iconName: 'Handshake', title: 'Honesty', description: 'Living and speaking with absolute truthfulness to build a community rooted in mutual trust.' },
  { iconName: 'ShieldCheck', title: 'Integrity', description: 'Doing what is right, honorable, and ethical in all circumstances, even when no one is watching.' },
  { iconName: 'Eye', title: 'Transparency', description: 'Maintaining open, clear, and visible communication with students, parents, and stakeholders.' },
  { iconName: 'Mountain', title: 'Resilience', description: 'Embracing challenges with grit, learning from mistakes, and persisting through obstacles to solve complex problems.' },
  { iconName: 'Heart', title: 'Care', description: 'Putting the emotional, social, and physical well-being of every child at the center of all decisions.' },
  { iconName: 'Award', title: 'Excellence', description: 'Striving for the highest standards in innovation, academic growth, and personal achievement.' },
]

const OPTIONS = [
  { id: 'left', name: 'Option C1 · Left-aligned', blurb: 'Heading block pinned left in gold — editorial, magazine feel against the framed spotlight photo.' },
  { id: 'center', name: 'Option C2 · Centre-aligned', blurb: 'Heading centred above the orbit in gold — classic and balanced.' },
  { id: 'right', name: 'Option C3 · Right-aligned', blurb: 'Heading block pinned right in gold — modern and asymmetric.' },
] as const

export default function CoreValuesPreview() {
  return (
    <div className="bg-offwhite">
      <header className="border-b border-navy/10 bg-white px-6 py-10 text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ochre">Internal preview</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">Option C (Framed Spotlight) — 3 Heading Alignments</h1>
        <p className="mx-auto mt-3 max-w-2xl text-ink/70">
          Same framed-spotlight background and orbit. Only the heading block changes — left, centre or right, in brand
          gold (the highest-contrast brand colour on this dark panel; navy/purple would not be readable here). Tell me
          which to ship: C1, C2 or C3.
        </p>
      </header>

      {OPTIONS.map((opt) => (
        <div key={opt.id}>
          <div className="bg-navy px-6 py-7 text-center text-pale">
            <h2 className="font-display text-2xl font-bold text-ochre">{opt.name}</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-pale/85">{opt.blurb}</p>
          </div>
          <CoreValuesOrbit
            blockType="coreValuesOrbit"
            eyebrow="Our Foundation"
            heading="Our Core Values"
            intro="The principles that guide our community and shape future leaders."
            bgImage="/images/stock/core-values.webp"
            bgTreatment="spotlight"
            headingAlign={opt.id}
            headingColor="gold"
            values={VALUES}
          />
        </div>
      ))}
    </div>
  )
}
