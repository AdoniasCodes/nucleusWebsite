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
import { type OurTeamProps } from './OurTeamBlock'
import { OurTeamServer } from './OurTeamServer'
import { HeroSliderBlock, type HeroSliderProps } from './HeroSliderBlock'
import { SummerCampHeroBlock, type SummerCampHeroProps } from './SummerCampHeroBlock'
import { CampInstructorsBlock, type CampInstructorsProps } from './CampInstructorsBlock'
import { CampMomentsBlock, type CampMomentsProps } from './CampMomentsBlock'
import { CampActivitiesBlock, type CampActivitiesProps } from './CampActivitiesBlock'
import { LearnerPromiseBlock, type LearnerPromiseProps } from './LearnerPromiseBlock'
import { mintFormToken } from '@/lib/formToken'

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
  | LearnerPromiseProps

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
  ourTeam: OurTeamServer,
  heroSlider: HeroSliderBlock,
  summerCampHero: SummerCampHeroBlock,
  campInstructors: CampInstructorsBlock,
  campMoments: CampMomentsBlock,
  campActivities: CampActivitiesBlock,
  learnerPromise: LearnerPromiseBlock,
}

export function BlockRenderer({ blocks }: { blocks?: RenderableBlock[] | null }) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block, i) => {
        const Component = REGISTRY[block.blockType]
        if (!Component) return null
        // Form blocks get a fresh server-minted signed token, embedded as a hidden field so the
        // server action can prove the POST came from a rendered page (our reCAPTCHA replacement).
        const extra = block.blockType === 'formBlock' ? { formToken: mintFormToken() } : {}
        return <Component key={('id' in block && block.id) || i} {...block} {...extra} />
      })}
    </>
  )
}
