import type { CTABandBlock as CTABandBlockType, Page } from '@/payload-types'
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
import { AdmissionApplicationBlock, type AdmissionApplicationProps } from './AdmissionApplicationBlock'
import { CampusComingSoonBlock, type CampusComingSoonProps } from './CampusComingSoonBlock'
import { SocialFollowBlock, type SocialFollowProps } from './SocialFollowBlock'
import { CampusVideoBlock, type CampusVideoProps } from './CampusVideoBlock'
import { LegalDocBlock, type LegalDocProps } from './LegalDocBlock'
import { CampusChoiceBlock, type CampusChoiceProps } from './CampusChoiceBlock'
import { CareersFormBlock, type CareersFormProps } from './CareersFormBlock'
import { mintFormToken } from '@/lib/formToken'

/**
 * A CTA band with the code-only `bgImage` prop. `bgImage` is deliberately NOT a CMS field,
 * these background photos are chosen per page in code, so the union carries the augmented shape
 * rather than every default page needing an `as RenderableBlock[]` cast to get past it.
 */
type CTABandWithImage = CTABandBlockType & { bgImage?: string }

/** A CMS layout block, plus the synthetic code-only blocks (homepage + inner pages). */
export type RenderableBlock =
  | NonNullable<Page['layout']>[number]
  | CTABandWithImage
  | LatestPostsProps
  | ProseProps
  | FaqListProps
  | TestimonialsProps
  | MapProps
  | WhyCambridgeProps
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
  | AdmissionApplicationProps
  | CampusComingSoonProps
  | SocialFollowProps
  | CampusVideoProps
  | LegalDocProps
  | CampusChoiceProps
  | CareersFormProps

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
  admissionApplication: AdmissionApplicationBlock,
  campusComingSoon: CampusComingSoonBlock,
  socialFollow: SocialFollowBlock,
  campusVideo: CampusVideoBlock,
  legalDoc: LegalDocBlock,
  campusChoice: CampusChoiceBlock,
  careersForm: CareersFormBlock,
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
        const extra =
          block.blockType === 'formBlock' || block.blockType === 'careersForm'
            ? { formToken: mintFormToken() }
            : {}
        return <Component key={('id' in block && block.id) || i} {...block} {...extra} />
      })}
    </>
  )
}
