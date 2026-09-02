import { RichText } from '@payloadcms/richtext-lexical/react'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage, sectionImageSrc } from './shared'
import type { Post } from '@/payload-types'

type Section = NonNullable<Post['sections']>[number]

const PROSE =
  'prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-p:text-ink/80 prose-a:text-ochre-600 prose-li:text-ink/80 prose-li:marker:text-ochre'

/** One image with optional caption, at a given aspect. */
function Figure({
  img,
  aspect,
  sizes,
  className = '',
}: {
  img: NonNullable<Section['images']>[number]
  aspect: string
  sizes: string
  className?: string
}) {
  const src = sectionImageSrc(img)
  return (
    <figure className={className}>
      <div className={`relative ${aspect} overflow-hidden rounded-2xl`}>
        <SmartImage {...src} alt={img.alt || ''} sizes={sizes} className="object-cover" />
      </div>
      {img.caption && (
        <figcaption className="mt-2 font-display text-xs text-ink/55">{img.caption}</figcaption>
      )}
    </figure>
  )
}

/** Inline camp video: web only, the PDF route ignores video fields. */
function VideoFigure({ section, className = '' }: { section: Section; className?: string }) {
  if (!section.videoUrl) return null
  return (
    <figure className={className}>
      <div className="relative overflow-hidden rounded-2xl bg-navy/5">
        <video
          controls
          playsInline
          preload="metadata"
          poster={section.videoPoster || undefined}
          src={section.videoUrl}
          className="mx-auto max-h-[34rem] w-full object-contain"
        />
      </div>
      {section.videoCaption && (
        <figcaption className="mt-2 font-display text-xs text-ink/55">{section.videoCaption}</figcaption>
      )}
    </figure>
  )
}

/** Mosaic for gallery sections: first photo leads double-height, the rest tile around it. */
function GalleryMosaic({ images }: { images: NonNullable<Section['images']> }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {images.map((img, i) => {
        const lead = i % 4 === 0
        const src = sectionImageSrc(img)
        return (
          <figure key={img.id ?? i} className={lead ? 'col-span-2 row-span-2' : ''}>
            <div className={`relative h-full min-h-36 ${lead ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden rounded-xl`}>
              <SmartImage
                {...src}
                alt={img.alt || ''}
                sizes={lead ? '(max-width:640px) 100vw, 50vw' : '(max-width:640px) 50vw, 25vw'}
                className="object-cover transition-transform duration-500 ease-out motion-safe:hover:scale-[1.04]"
              />
            </div>
          </figure>
        )
      })}
    </div>
  )
}

/**
 * Magazine renderer for newsletter articles. Each CMS section becomes a visual
 * spread: text+photo sections alternate image sides, photo-heavy sections become
 * mosaics, and highlight sections become navy bands (list items render as chips).
 */
export function NewsletterSections({ sections }: { sections: NonNullable<Post['sections']> }) {
  let flip = false

  return (
    <div className="space-y-14 sm:space-y-16">
      {sections.map((section, idx) => {
        const images = section.images ?? []
        const style = section.style ?? 'auto'

        const heading = section.heading && (
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">{section.heading}</h2>
            <span aria-hidden className="hidden h-1 w-14 shrink-0 self-center rounded-full bg-ochre sm:block" />
          </div>
        )

        if (style === 'highlight') {
          return (
            <Reveal key={section.id ?? idx} variant="up">
              <section className="orb-glow brand-weave rounded-3xl px-6 py-10 text-pale sm:px-10">
                {section.heading && <h2 className="text-2xl font-bold text-white sm:text-3xl">{section.heading}</h2>}
                {section.body && (
                  <div className="prose prose-invert mt-4 max-w-none prose-headings:font-display prose-p:text-pale/90 [&_ul]:mt-6 [&_ul]:flex [&_ul]:list-none [&_ul]:flex-wrap [&_ul]:gap-3 [&_ul]:p-0 [&_li]:m-0 [&_li]:rounded-full [&_li]:bg-white/12 [&_li]:px-5 [&_li]:py-2 [&_li]:font-display [&_li]:text-sm [&_li]:font-semibold [&_li]:text-white [&_li]:before:hidden">
                    <RichText data={section.body} />
                  </div>
                )}
              </section>
            </Reveal>
          )
        }

        if (style === 'gallery' || images.length >= 3) {
          return (
            <Reveal key={section.id ?? idx} variant="up">
              <section>
                {heading}
                {section.body && (
                  <div className={`${PROSE} mt-4`}>
                    <RichText data={section.body} />
                  </div>
                )}
                <div className="mt-6">
                  <GalleryMosaic images={images} />
                </div>
                <VideoFigure section={section} className="mt-6" />
              </section>
            </Reveal>
          )
        }

        if (images.length === 0 && !section.videoUrl) {
          return (
            <Reveal key={section.id ?? idx} variant="up">
              <section className="rounded-3xl bg-mist px-6 py-8 sm:px-8">
                {heading}
                {section.body && (
                  <div className={`${PROSE} mt-4`}>
                    <RichText data={section.body} />
                  </div>
                )}
              </section>
            </Reveal>
          )
        }

        // Text + 1-2 photos: photos beside the text, sides alternating per spread.
        flip = !flip
        return (
          <Reveal key={section.id ?? idx} variant="up">
            <section className="grid items-start gap-6 lg:grid-cols-5 lg:gap-9">
              <div className={`lg:col-span-3 ${flip ? '' : 'lg:order-2'}`}>
                {heading}
                {section.body && (
                  <div className={`${PROSE} mt-4`}>
                    <RichText data={section.body} />
                  </div>
                )}
              </div>
              <div className={`grid gap-4 lg:col-span-2 ${flip ? '' : 'lg:order-1'} ${images.length === 2 ? 'grid-cols-2 lg:grid-cols-1' : ''}`}>
                {images.map((img, i) => (
                  <Figure
                    key={img.id ?? i}
                    img={img}
                    // A headshot marked `portrait` keeps its 3:4 frame even when it is alone:
                    // the default 4:3 box crops a standing portrait off at the neck.
                    aspect={images.length === 2 || img.portrait ? 'aspect-[3/4]' : 'aspect-[4/3]'}
                    sizes="(max-width:1024px) 100vw, 40vw"
                  />
                ))}
                <VideoFigure section={section} />
              </div>
            </section>
          </Reveal>
        )
      })}
    </div>
  )
}
