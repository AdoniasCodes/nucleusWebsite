import Link from 'next/link'
import type { ReactNode } from 'react'
import { resolveHref, type CMSLinkValue } from '@/lib/link'

type Appearance = 'primary' | 'secondary' | 'outline' | 'link'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-[color,background-color,border-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

// Solid/outline buttons get padding + a tactile tap-press; text links don't (scaling inline text reads odd).
const sizes = 'px-7 py-3 text-[0.95rem] motion-safe:active:scale-[0.97]'

const appearances: Record<Appearance, string> = {
  primary: 'bg-ochre text-navy hover:bg-ochre-600',
  secondary: 'bg-pale text-navy hover:bg-white',
  outline: 'border border-current text-current hover:bg-white/10',
  link: 'px-0 py-0 underline underline-offset-4 hover:text-ochre',
}

/** Render a CMS link (with appearance) as a styled button/link. */
export function CMSLink({ link, className = '' }: { link?: CMSLinkValue | null; className?: string }) {
  if (!link?.label) return null
  const appearance = (link.appearance ?? 'primary') as Appearance
  return (
    <ButtonLink
      href={resolveHref(link)}
      appearance={appearance}
      newTab={Boolean(link.newTab)}
      className={className}
    >
      {link.label}
    </ButtonLink>
  )
}

/**
 * Same styling as ButtonLink, but a real <button> for in-page actions that go nowhere
 * (opening the hero film, for one). Kept here so an action never drifts from a link visually.
 */
export function ButtonAction({
  children,
  onClick,
  appearance = 'primary',
  className = '',
  ...rest
}: {
  children: ReactNode
  onClick: () => void
  appearance?: Exclude<Appearance, 'link'>
  className?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className'>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${sizes} ${appearances[appearance]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function ButtonLink({
  href,
  children,
  appearance = 'primary',
  newTab = false,
  className = '',
}: {
  href: string
  children: ReactNode
  appearance?: Appearance
  newTab?: boolean
  className?: string
}) {
  const isLink = appearance === 'link'
  const cls = `${base} ${isLink ? '' : sizes} ${appearances[appearance]} ${className}`
  // Text links get a chevron that slides on hover/tap, a small, consistent "go" cue site-wide.
  const content = isLink ? (
    <>
      {children}
      <span aria-hidden className="transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-active:translate-x-1">→</span>
    </>
  ) : (
    children
  )
  const external = href.startsWith('http') || newTab
  if (external) {
    return (
      <a href={href} className={cls} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  )
}
