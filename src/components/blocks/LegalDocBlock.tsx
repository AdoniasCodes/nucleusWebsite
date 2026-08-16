import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

/**
 * A long-form legal document (Terms and Conditions, Privacy Policy).
 *
 * Deliberately NOT built out of `prose` blocks: a twelve part legal text rendered as twelve
 * alternating full-height bands is unreadable, and a parent looking for the refund clause needs
 * to jump straight to it. So this is one document with numbered, deep-linkable sections and a
 * contents rail that sticks beside them on desktop.
 *
 * Legal copy is reproduced from the school's source document. Structure and typography are the
 * only things added here; wording changes belong in the source document first.
 */

export type LegalListItem = { label?: string; text: string }

export type LegalBody =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ol'; items: LegalListItem[] }
  | { type: 'ul'; items: LegalListItem[] }

export type LegalSection = {
  /** Anchor id, e.g. "fees". Used for /terms#fees deep links and the contents rail. */
  id: string
  heading: string
  /** Short label for the contents rail when the heading is long. Defaults to `heading`. */
  navLabel?: string
  body: LegalBody[]
}

export type LegalContactLine = { label: string; value: string; href?: string }

export type LegalDocProps = {
  blockType: 'legalDoc'
  eyebrow?: string
  title: string
  intro?: string
  /** Human readable, e.g. "16 August 2026". Also printed in the document header. */
  effectiveDate?: string
  sections: LegalSection[]
  contact?: {
    heading: string
    intro?: string
    orgName: string
    lines: LegalContactLine[]
  }
  /** The sibling legal page, offered at the foot of the document. */
  seeAlso?: { label: string; href: string }
}

function ItemText({ item }: { item: LegalListItem }) {
  return (
    <>
      {item.label && <strong className="font-semibold text-navy">{item.label}</strong>}
      {item.label ? ' ' : ''}
      {item.text}
    </>
  )
}

function Body({ body }: { body: LegalBody[] }) {
  return (
    <div className="space-y-4">
      {body.map((node, i) => {
        if (node.type === 'h3')
          return (
            <h3 key={i} className="pt-3 font-display text-lg font-semibold text-navy">
              {node.text}
            </h3>
          )
        if (node.type === 'ol')
          return (
            <ol key={i} className="space-y-3 text-ink/75">
              {node.items.map((item, j) => (
                <li key={j} className="grid grid-cols-[1.6rem_1fr] gap-x-2 leading-relaxed">
                  <span aria-hidden="true" className="font-display text-sm font-semibold text-ochre-600 tabular-nums">
                    {j + 1}.
                  </span>
                  <span>
                    <ItemText item={item} />
                  </span>
                </li>
              ))}
            </ol>
          )
        if (node.type === 'ul')
          return (
            <ul key={i} className="space-y-3 text-ink/75">
              {node.items.map((item, j) => (
                <li key={j} className="grid grid-cols-[1.6rem_1fr] gap-x-2 leading-relaxed">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-ochre" />
                  <span>
                    <ItemText item={item} />
                  </span>
                </li>
              ))}
            </ul>
          )
        return (
          <p key={i} className="leading-relaxed text-ink/75">
            {node.text}
          </p>
        )
      })}
    </div>
  )
}

export function LegalDocBlock({
  eyebrow = 'Legal',
  title,
  intro,
  effectiveDate,
  sections,
  contact,
  seeAlso,
}: LegalDocProps) {
  return (
    <>
      {/* Compact header. A legal page gets no photo hero: nobody arrives here to be sold to. */}
      <section className="orb-glow text-pale">
        <Container width="wide" className="py-16 sm:py-20">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ochre">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg text-pale/80">{intro}</p>}
          {effectiveDate && (
            <p className="mt-6 text-sm text-pale/60">
              Effective <time dateTime={effectiveDate}>{effectiveDate}</time>. Nucleus International Schools, Addis
              Ababa, Ethiopia.
            </p>
          )}
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
            {/* Contents rail. Sticks on desktop, sits above the text as a card on mobile. */}
            <nav aria-label={`Contents of the ${title}`} className="lg:sticky lg:top-24 lg:self-start">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ochre-600">Contents</p>
              <ol className="mt-4 space-y-2 border-l border-navy/10 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block border-l-2 border-transparent -ml-px py-1 pl-4 text-ink/65 transition-colors hover:border-ochre hover:text-navy"
                    >
                      <span aria-hidden="true" className="tabular-nums text-ink/40">
                        {i + 1}.
                      </span>{' '}
                      {s.navLabel ?? s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <Reveal variant="up" className="max-w-3xl">
              <div className="space-y-12">
                {sections.map((s, i) => (
                  <section key={s.id} id={s.id} className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-navy sm:text-[1.75rem]">
                      <span aria-hidden="true" className="mr-2 text-ochre-600 tabular-nums">
                        {i + 1}.
                      </span>
                      {s.heading}
                    </h2>
                    <div className="mt-5">
                      <Body body={s.body} />
                    </div>
                  </section>
                ))}

                {contact && (
                  <section id="contact" className="scroll-mt-24 rounded-2xl bg-mist p-7 sm:p-9">
                    <h2 className="text-2xl font-bold text-navy">{contact.heading}</h2>
                    {contact.intro && <p className="mt-3 leading-relaxed text-ink/75">{contact.intro}</p>}
                    <p className="mt-6 font-display text-lg font-semibold text-navy">{contact.orgName}</p>
                    <dl className="mt-4 space-y-3 text-ink/75">
                      {contact.lines.map((line, i) => (
                        <div key={i} className="sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4">
                          <dt className="font-semibold text-navy">{line.label}</dt>
                          <dd className="mt-0.5 sm:mt-0">
                            {line.href ? (
                              <a href={line.href} className="underline decoration-ochre underline-offset-4 hover:text-navy">
                                {line.value}
                              </a>
                            ) : (
                              line.value
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                )}

                {seeAlso && (
                  <p className="border-t border-navy/10 pt-8 text-ink/70">
                    See also:{' '}
                    <Link href={seeAlso.href} className="font-semibold text-navy underline decoration-ochre underline-offset-4">
                      {seeAlso.label}
                    </Link>
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
