import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

/**
 * Branded A4 PDF of a newsletter issue, rendered from the same section data as
 * the web article (see /newsletter/[slug]/pdf/route.tsx). Pure component: all
 * async work (image conversion, lexical flattening) happens in the route.
 */

export type PdfBlock = { type: 'p' | 'li'; text: string }
export type PdfImage = { src: string; caption?: string; portrait?: boolean }
export type PdfSection = {
  heading?: string
  style: 'auto' | 'gallery' | 'highlight'
  blocks: PdfBlock[]
  images: PdfImage[]
}
export type PdfData = {
  title: string
  excerpt?: string
  dateLabel: string
  seriesLabel?: string
  hero?: PdfImage
  sections: PdfSection[]
  siteHost: string
  /** White Nucleus wordmark (PNG data URI) shown in the masthead. */
  logoSrc?: string
}

export function registerPdfFonts(origin: string) {
  Font.register({
    family: 'Jost',
    fonts: [
      { src: `${origin}/fonts/jost-500.ttf`, fontWeight: 500 },
      { src: `${origin}/fonts/jost-700.ttf`, fontWeight: 700 },
    ],
  })
  Font.register({
    family: 'Lora',
    fonts: [
      { src: `${origin}/fonts/lora-400.ttf`, fontWeight: 400 },
      { src: `${origin}/fonts/lora-700.ttf`, fontWeight: 700 },
    ],
  })
  // Never hyphenate: ragged-right reads better at A4 sizes.
  Font.registerHyphenationCallback((word) => [word])
}

const NAVY = '#11024d'
const NAVY_500 = '#2a1a7a'
const PALE = '#d9e6f5'
const OCHRE = '#e0a93b'
const INK = '#2a2640'
const SLATE = '#8a97a6'

const s = StyleSheet.create({
  page: { paddingTop: 36, paddingHorizontal: 42, paddingBottom: 64, fontFamily: 'Lora', fontSize: 10, color: INK },
  masthead: { backgroundColor: NAVY, borderRadius: 12, paddingVertical: 18, paddingHorizontal: 22, marginBottom: 18, flexDirection: 'row', alignItems: 'center' },
  // 568×429 source; keep the aspect ratio so react-pdf doesn't letterbox it.
  mastheadLogo: { width: 76, height: 57.4, marginRight: 18 },
  mastheadKicker: { fontFamily: 'Jost', fontWeight: 500, fontSize: 8, color: PALE, letterSpacing: 1.6, textTransform: 'uppercase' },
  mastheadTitle: { fontFamily: 'Jost', fontWeight: 700, fontSize: 24, color: '#ffffff', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1.5 },
  mastheadTagline: { fontFamily: 'Jost', fontWeight: 500, fontSize: 8.5, color: OCHRE, marginTop: 6 },
  seriesRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  seriesChip: { backgroundColor: OCHRE, color: NAVY, fontFamily: 'Jost', fontWeight: 700, fontSize: 8, paddingVertical: 3, paddingHorizontal: 9, borderRadius: 9 },
  dateLabel: { fontFamily: 'Jost', fontWeight: 500, fontSize: 8.5, color: SLATE, marginLeft: 8 },
  title: { fontFamily: 'Jost', fontWeight: 700, fontSize: 20, color: NAVY, lineHeight: 1.15, marginBottom: 8 },
  excerpt: { fontSize: 11, lineHeight: 1.5, color: INK, marginBottom: 14 },
  hero: { width: '100%', height: 240, borderRadius: 10, objectFit: 'cover', marginBottom: 6 },
  caption: { fontFamily: 'Jost', fontWeight: 500, fontSize: 7.5, color: SLATE, marginTop: 3 },
  section: { marginTop: 18 },
  headingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  heading: { fontFamily: 'Jost', fontWeight: 700, fontSize: 13.5, color: NAVY },
  headingRule: { width: 26, height: 3, backgroundColor: OCHRE, borderRadius: 2, marginLeft: 8 },
  p: { lineHeight: 1.45, marginBottom: 5 },
  liRow: { flexDirection: 'row', marginBottom: 4, paddingRight: 8 },
  liDot: { width: 4.5, height: 4.5, borderRadius: 3, backgroundColor: OCHRE, marginTop: 4.5, marginRight: 7 },
  liText: { flex: 1, lineHeight: 1.4 },
  imgRow: { flexDirection: 'row', marginTop: 8 },
  highlight: { backgroundColor: NAVY, borderRadius: 12, padding: 16, marginTop: 18 },
  highlightHeading: { fontFamily: 'Jost', fontWeight: 700, fontSize: 13.5, color: '#ffffff', marginBottom: 7 },
  highlightText: { color: PALE, lineHeight: 1.55, marginBottom: 5 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4, marginBottom: 4 },
  chip: { backgroundColor: NAVY_500, color: '#ffffff', fontFamily: 'Jost', fontWeight: 700, fontSize: 8.5, paddingVertical: 4, paddingHorizontal: 11, borderRadius: 10, marginRight: 6, marginBottom: 6 },
  footer: { position: 'absolute', left: 42, right: 42, bottom: 24, borderTopWidth: 1, borderTopColor: '#e3e1ef', paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontFamily: 'Jost', fontWeight: 500, fontSize: 7.5, color: SLATE },
})

/** Group blocks into runs: each paragraph alone, consecutive list items together. */
function groupRuns(blocks: PdfBlock[]): { type: 'p' | 'li'; items: string[] }[] {
  const runs: { type: 'p' | 'li'; items: string[] }[] = []
  for (const b of blocks) {
    const last = runs[runs.length - 1]
    if (b.type === 'li' && last?.type === 'li') last.items.push(b.text)
    else runs.push({ type: b.type, items: [b.text] })
  }
  return runs
}

function Blocks({ blocks, light = false }: { blocks: PdfBlock[]; light?: boolean }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.type === 'li' ? (
          // wrap=false: a bullet must never leave its dot on one page and its text on the next.
          <View key={i} style={s.liRow} wrap={false}>
            <View style={s.liDot} />
            <Text style={[s.liText, light ? { color: PALE } : {}]}>{b.text}</Text>
          </View>
        ) : (
          <Text key={i} style={light ? s.highlightText : s.p}>
            {b.text}
          </Text>
        ),
      )}
    </>
  )
}

/** Image strip: 2-up for regular sections, 3-up rows for galleries. */
function ImageRows({ images, perRow, height }: { images: PdfImage[]; perRow: number; height: number }) {
  // A lone portrait would be sliced across the chest by the full-width band, so it gets a
  // tall half-width frame instead. Mirrors the web renderer's `portrait` flag.
  const solePortrait = images.length === 1 && images[0].portrait
  if (solePortrait) {
    const img = images[0]
    return (
      <View style={s.imgRow} wrap={false}>
        <View style={{ width: '46%' }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt prop */}
          <Image src={img.src} style={{ width: '100%', height: 236, borderRadius: 8, objectFit: 'cover' }} />
          {img.caption && <Text style={s.caption}>{img.caption}</Text>}
        </View>
      </View>
    )
  }
  const rows: PdfImage[][] = []
  for (let i = 0; i < images.length; i += perRow) rows.push(images.slice(i, i + perRow))
  return (
    <>
      {rows.map((row, r) => (
        <View key={r} style={s.imgRow} wrap={false}>
          {row.map((img, i) => (
            <View key={i} style={{ flex: 1, marginLeft: i === 0 ? 0 : 8 }}>
              {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt prop */}
              <Image src={img.src} style={{ width: '100%', height, borderRadius: 8, objectFit: 'cover' }} />
              {img.caption && <Text style={s.caption}>{img.caption}</Text>}
            </View>
          ))}
        </View>
      ))}
    </>
  )
}

export function NewsletterPdf({ data }: { data: PdfData }) {
  return (
    <Document title={data.title} author="Nucleus International Schools">
      <Page size="A4" style={s.page}>
        {/* Masthead */}
        <View style={s.masthead}>
          {data.logoSrc && (
            // eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt prop
            <Image src={data.logoSrc} style={s.mastheadLogo} />
          )}
          <View>
            <Text style={s.mastheadKicker}>Nucleus International Schools presents</Text>
            <Text style={s.mastheadTitle}>Inside Nucleus</Text>
            <Text style={s.mastheadTagline}>Think Deeply. Create Boldly. Solve Truly.</Text>
          </View>
        </View>

        <View style={s.seriesRow}>
          {data.seriesLabel && <Text style={s.seriesChip}>{data.seriesLabel}</Text>}
          <Text style={s.dateLabel}>{data.dateLabel}</Text>
        </View>
        <Text style={s.title}>{data.title}</Text>
        {data.excerpt && <Text style={s.excerpt}>{data.excerpt}</Text>}
        {data.hero && (
          <View wrap={false}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={data.hero.src} style={s.hero} />
            {data.hero.caption && <Text style={s.caption}>{data.hero.caption}</Text>}
          </View>
        )}

        {/* Sections */}
        {data.sections.map((section, i) => {
          if (section.style === 'highlight') {
            return (
              <View key={i} style={s.highlight} wrap={false}>
                {section.heading && <Text style={s.highlightHeading}>{section.heading}</Text>}
                {/* Blocks render in source order; each run of list items becomes a chip row. */}
                {groupRuns(section.blocks).map((run, j) =>
                  run.type === 'li' ? (
                    <View key={j} style={s.chipRow}>
                      {run.items.map((text, k) => (
                        <Text key={k} style={s.chip}>
                          {text}
                        </Text>
                      ))}
                    </View>
                  ) : (
                    <Text key={j} style={s.highlightText}>
                      {run.items[0]}
                    </Text>
                  ),
                )}
              </View>
            )
          }
          const gallery = section.style === 'gallery' || section.images.length >= 3
          return (
            <View key={i} style={s.section}>
              {section.heading && (
                <View style={s.headingRow} minPresenceAhead={60}>
                  <Text style={s.heading}>{section.heading}</Text>
                  <View style={s.headingRule} />
                </View>
              )}
              <Blocks blocks={section.blocks} />
              {section.images.length > 0 && (
                <ImageRows
                  images={section.images}
                  perRow={gallery ? 3 : Math.min(section.images.length, 2)}
                  height={gallery ? 105 : 150}
                />
              )}
            </View>
          )
        })}

        {/* Fixed footer with page numbers */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>Nucleus International Schools · Learning Beyond Books</Text>
          <Text
            style={s.footerText}
            render={({ pageNumber, totalPages }) =>
              `${data.siteHost} · 09 81 99 99 22 · Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}
