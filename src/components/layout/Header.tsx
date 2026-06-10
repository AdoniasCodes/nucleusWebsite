'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { NAV } from './nav'

export function Header({ schoolName = 'Nucleus International School' }: { schoolName?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-offwhite/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" aria-label={`${schoolName} — home`}>
          <Image
            src="/images/nucleus-logo.webp"
            alt={schoolName}
            width={1802}
            height={758}
            priority
            className="h-[3.375rem] w-auto sm:h-[4.125rem]"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-medium text-ink/80 transition-colors hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contact" appearance="primary">
            Book a Tour
          </ButtonLink>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-navy" />
          <span className="mt-1.5 block h-0.5 w-6 bg-navy" />
          <span className="mt-1.5 block h-0.5 w-6 bg-navy" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-navy/10 bg-offwhite px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 font-display font-medium text-ink hover:bg-navy/5"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <ButtonLink href="/contact" appearance="primary" className="w-full">
                Book a Tour
              </ButtonLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
