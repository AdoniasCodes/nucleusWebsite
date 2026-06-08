/** Eyebrow + heading + intro, shared by content sections. Centered by default. */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  dark = false,
  align = 'center',
}: {
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  dark?: boolean
  align?: 'center' | 'left'
}) {
  if (!eyebrow && !heading && !intro) return null
  const alignCls = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
  return (
    <div className={`${alignCls} mb-12`}>
      {eyebrow && (
        <p className={`font-display text-sm font-semibold uppercase tracking-[0.16em] ${dark ? 'text-ochre' : 'text-ochre-600'}`}>
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2 className={`mt-3 text-3xl sm:text-4xl ${dark ? 'text-white' : 'text-navy'}`}>{heading}</h2>
      )}
      {intro && <p className={`mt-4 text-lg ${dark ? 'text-pale/80' : 'text-ink/70'}`}>{intro}</p>}
    </div>
  )
}
