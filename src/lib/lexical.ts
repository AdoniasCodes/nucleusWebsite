/**
 * Build Payload Lexical richText JSON from a simple block list — used by the blog seed so we
 * author posts as plain content and store valid Lexical without a markdown parser.
 */
export type ContentBlock =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { related: { label: string; url: string }[] } // internal-link row (SEO interlinking)

const text = (t: string) => ({ detail: 0, format: 0, mode: 'normal', style: '', text: t, type: 'text', version: 1 })

const linkNode = (label: string, url: string) => ({
  type: 'link',
  version: 3,
  fields: { linkType: 'custom', url, newTab: false },
  direction: 'ltr',
  format: '',
  indent: 0,
  children: [text(label)],
})

/** "Related reading: A · B" paragraph of real internal links. */
const relatedPara = (items: { label: string; url: string }[]) => ({
  children: [
    { ...text('Related reading: '), format: 1 }, // bold
    ...items.flatMap((it, i) => (i === 0 ? [linkNode(it.label, it.url)] : [text('  ·  '), linkNode(it.label, it.url)])),
  ],
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'paragraph',
  version: 1,
})

const para = (t: string) => ({
  children: [text(t)],
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'paragraph',
  version: 1,
})

const heading = (t: string, tag: 'h2' | 'h3') => ({
  children: [text(t)],
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'heading',
  tag,
  version: 1,
})

const list = (items: string[]) => ({
  children: items.map((t, i) => ({
    children: [text(t)],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'listitem',
    value: i + 1,
    version: 1,
  })),
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'list',
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  version: 1,
})

export function richTextFromBlocks(blocks: ContentBlock[]) {
  const children = blocks.map((b) => {
    if ('h2' in b) return heading(b.h2, 'h2')
    if ('h3' in b) return heading(b.h3, 'h3')
    if ('ul' in b) return list(b.ul)
    if ('related' in b) return relatedPara(b.related)
    return para(b.p)
  })
  return { root: { children, direction: 'ltr', format: '', indent: 0, type: 'root', version: 1 } }
}

/** Plain-text version (for excerpts / meta fallback). */
export function blocksToPlainText(blocks: ContentBlock[]): string {
  return blocks
    .map((b) => ('h2' in b ? b.h2 : 'h3' in b ? b.h3 : 'ul' in b ? b.ul.join('. ') : 'related' in b ? '' : b.p))
    .join(' ')
}
