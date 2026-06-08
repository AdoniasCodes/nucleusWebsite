import Link from 'next/link'
import type { ReactNode } from 'react'
import { resolveHref, type CMSLinkValue } from '@/lib/link'

type Appearance = 'primary' | 'secondary' | 'outline' | 'link'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

const sizes = 'px-7 py-3 text-[0.95rem]'

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
  const cls = `${base} ${appearance === 'link' ? '' : sizes} ${appearances[appearance]} ${className}`
  const external = href.startsWith('http') || newTab
  if (external) {
    return (
      <a href={href} className={cls} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
