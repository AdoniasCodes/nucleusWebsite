import type { Page } from '@/payload-types'
import { HeroBlock } from './HeroBlock'
import { StatsBlock } from './StatsBlock'
import { CardsGridBlock } from './CardsGridBlock'
import { CTABandBlock } from './CTABandBlock'
import { GalleryBlock } from './GalleryBlock'
import { LatestPostsBlock, type LatestPostsProps } from './LatestPostsBlock'
import { ProseBlock, type ProseProps } from './ProseBlock'
import { FaqListBlock, type FaqListProps } from './FaqListBlock'
import { TestimonialsBlock, type TestimonialsProps } from './TestimonialsBlock'
import { FormBlock } from './FormBlock'

/** A CMS layout block, plus the synthetic code-only blocks (homepage + inner pages). */
export type RenderableBlock =
  | NonNullable<Page['layout']>[number]
  | LatestPostsProps
  | ProseProps
  | FaqListProps
  | TestimonialsProps

/* eslint-disable @typescript-eslint/no-explicit-any */
const REGISTRY: Record<string, (props: any) => React.ReactNode> = {
  hero: HeroBlock,
  stats: StatsBlock,
  cardsGrid: CardsGridBlock,
  ctaBand: CTABandBlock,
  galleryBlock: GalleryBlock,
  latestPosts: LatestPostsBlock,
  prose: ProseBlock,
  faqList: FaqListBlock,
  testimonials: TestimonialsBlock,
  formBlock: FormBlock,
}

export function BlockRenderer({ blocks }: { blocks?: RenderableBlock[] | null }) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block, i) => {
        const Component = REGISTRY[block.blockType]
        if (!Component) return null
        return <Component key={('id' in block && block.id) || i} {...block} />
      })}
    </>
  )
}
