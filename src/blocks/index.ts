import type { Block } from 'payload'

import { CardsGrid } from './CardsGrid'
import { CTABand } from './CTABand'
import { FAQBlock } from './FAQBlock'
import { FormBlock } from './FormBlock'
import { GalleryBlock } from './GalleryBlock'
import { Hero } from './Hero'
import { MediaBlock } from './MediaBlock'
import { RichTextBlock } from './RichTextBlock'
import { Stats } from './Stats'
import { TestimonialsBlock } from './TestimonialsBlock'

/** Every block available to the Pages layout builder. Add new sections here. */
export const layoutBlocks: Block[] = [
  Hero,
  RichTextBlock,
  CardsGrid,
  Stats,
  MediaBlock,
  GalleryBlock,
  TestimonialsBlock,
  FAQBlock,
  CTABand,
  FormBlock,
]
