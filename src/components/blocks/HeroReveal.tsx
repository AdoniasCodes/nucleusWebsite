'use client'

import { useEffect, useState, type ReactNode } from 'react'

/**
 * Homepage hero animation: types the heading line-by-line, then fades in the subhead + CTAs.
 * A small touch of wonder, kept tasteful. Reduced-motion → everything shows instantly.
 */
export function HeroReveal({
  lines,
  amharic,
  eyebrow,
  children,
  dark,
}: {
  lines: string[]
  amharic?: string | null
  eyebrow?: string | null
  children: ReactNode // subhead + CTA buttons
  dark: boolean
}) {
  const full = lines.join('\n')
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(full)
      setDone(true)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(id)
        setDone(true)
      }
    }, 45)
    return () => clearInterval(id)
  }, [full])

  const typedLines = typed.split('\n')

  return (
    <div className="max-w-3xl">
      {amharic && (
        <p lang="am" className={`mb-4 text-lg animate-fade-up ${dark ? 'text-ochre' : 'text-ochre-600'}`}>
          {amharic}
        </p>
      )}
      {eyebrow && (
        <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-ochre animate-fade-up">
          {eyebrow}
        </p>
      )}
      <h1 className="min-h-[1.1em] text-4xl font-bold sm:text-6xl">
        {typedLines.map((line, i) => {
          const isLastFull = i === lines.length - 1 && lines.length > 1
          const isCaretLine = !done && i === typedLines.length - 1
          return (
            <span key={i} className={`block ${isLastFull ? 'text-ochre' : ''} ${isCaretLine ? 'caret' : ''}`}>
              {line || ' '}
            </span>
          )
        })}
      </h1>
      <div className={done ? 'animate-fade-up' : 'pointer-events-none opacity-0'}>{children}</div>
    </div>
  )
}
