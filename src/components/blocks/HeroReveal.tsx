'use client'

import { useEffect, useState, type ReactNode } from 'react'

/**
 * Homepage hero. Heading hierarchy:
 *   • eyebrow  → small keyword line up top ("International Cambridge Curriculum in Addis Ababa")
 *   • heading  → the page's single <h1> ("Nucleus International Schools")
 *   • tagline  → bold <h2> beneath it ("Think Deeply. Create Boldly. Solve Truly."), typed in
 *
 * The verbs "Think / Create / Solve" are emphasised in brand ochre. The tagline types in
 * character-by-character; its full size is reserved up-front (an invisible copy in the same CSS-grid
 * cell) so the hero never grows/reflows while typing. Reduced-motion → shows instantly.
 */
const HIGHLIGHT = new Set(['Think', 'Create', 'Solve'])

// Split into space-preserving tokens, flagging the emphasis verbs for ochre.
function buildSegments(text: string) {
  return text.split(/(\s+)/).map((tok) => ({ text: tok, ochre: HIGHLIGHT.has(tok.replace(/[^A-Za-z]/g, '')) }))
}

export function HeroReveal({
  heading,
  tagline,
  amharic,
  eyebrow,
  children,
  dark,
}: {
  heading: string
  tagline: string
  amharic?: string | null
  eyebrow?: string | null
  children: ReactNode // subhead + CTA buttons
  dark: boolean
}) {
  const segments = buildSegments(tagline)
  const [typed, setTyped] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(tagline.length)
      setDone(true)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(i)
      if (i >= tagline.length) {
        clearInterval(id)
        setDone(true)
      }
    }, 45)
    return () => clearInterval(id)
  }, [tagline])

  const base = dark ? 'text-pale' : 'text-ink'

  // Slice each segment to the number of characters typed so far.
  let offset = 0
  const rendered = segments.map((seg, i) => {
    const start = offset
    offset += seg.text.length
    const vis = Math.max(0, Math.min(typed - start, seg.text.length))
    if (vis <= 0) return null
    return (
      <span key={i} className={seg.ochre ? 'text-ochre' : base}>
        {seg.text.slice(0, vis)}
      </span>
    )
  })

  return (
    <div className="mx-auto max-w-3xl text-center sm:mx-0 sm:text-left">
      {amharic && (
        <p lang="am" className={`mb-3 text-lg animate-fade-up ${dark ? 'text-ochre' : 'text-ochre-600'}`}>
          {amharic}
        </p>
      )}
      {eyebrow && (
        <p
          className={`mb-4 font-display text-sm font-semibold uppercase tracking-[0.18em] animate-fade-up ${
            dark ? 'text-ochre' : 'text-ochre-600'
          } sm:text-base`}
        >
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl font-bold animate-fade-up sm:text-6xl">{heading}</h1>
      {/* Brand tagline: bold, larger than body but smaller than the H1; verbs in ochre; types in. */}
      <h2 className="mt-4 grid text-xl font-bold sm:text-3xl">
        {/* Invisible height-reservation copy: holds the full final size in grid cell 1/1. */}
        <span aria-hidden className="invisible col-start-1 row-start-1">
          {tagline}
        </span>
        {/* Visible animated copy: same grid cell, so no layout shift as it types. */}
        <span className="col-start-1 row-start-1">
          {rendered}
          {!done && <span className="caret" aria-hidden />}
        </span>
      </h2>
      <div className={done ? 'animate-fade-up' : 'pointer-events-none opacity-0'}>{children}</div>
    </div>
  )
}
