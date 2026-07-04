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
import { MapBlock, type MapProps } from './MapBlock'
import { FormBlock } from './FormBlock'
import { WhyCambridgeBlock, type WhyCambridgeProps } from './WhyCambridgeBlock'
import { FeeTransparencyBlock, type FeeTransparencyProps } from './FeeTransparencyBlock'
import { DayTimelineBlock, type DayTimelineProps } from './DayTimelineBlock'
import { CoreValuesOrbit, type CoreValuesOrbitProps } from './CoreValuesOrbit'
import { FounderMessageBlock, type FounderMessageProps } from './FounderMessageBlock'
import { OurTeamBlock, type OurTeamProps } from './OurTeamBlock'
import { HeroSliderBlock, type HeroSliderProps } from './HeroSliderBlock'
import { SummerCampHeroBlock, type SummerCampHeroProps } from './SummerCampHeroBlock'
import { CampInstructorsBlock, type CampInstructorsProps } from './CampInstructorsBlock'
import { CampMomentsBlock, type CampMomentsProps } from './CampMomentsBlock'
import { CampActivitiesBlock, type CampActivitiesProps } from './CampActivitiesBlock'

/** A CMS layout block, plus the synthetic code-only blocks (homepage + inner pages). */
export type RenderableBlock =
  | NonNullable<Page['layout']>[number]
  | LatestPostsProps
  | ProseProps
  | FaqListProps
  | TestimonialsProps
  | MapProps
  | WhyCambridgeProps
  | FeeTransparencyProps
  | DayTimelineProps
  | CoreValuesOrbitProps
  | FounderMessageProps
  | OurTeamProps
  | HeroSliderProps
  | SummerCampHeroProps
  | CampInstructorsProps
  | CampMomentsProps
  | CampActivitiesProps

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
  map: MapBlock,
  formBlock: FormBlock,
  whyCambridge: WhyCambridgeBlock,
  feeTransparency: FeeTransparencyBlock,
  dayTimeline: DayTimelineBlock,
  coreValuesOrbit: CoreValuesOrbit,
  founderMessage: FounderMessageBlock,
  ourTeam: OurTeamBlock,
  heroSlider: HeroSliderBlock,
  summerCampHero: SummerCampHeroBlock,
  campInstructors: CampInstructorsBlock,
  campMoments: CampMomentsBlock,
  campActivities: CampActivitiesBlock,
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
