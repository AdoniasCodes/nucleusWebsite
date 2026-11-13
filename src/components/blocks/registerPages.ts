import type { RenderableBlock } from './BlockRenderer'
import type { DefaultPage } from './defaultPages'
import { PRESCHOOL_PHONES, VATICAN_PHONES, type CampusPhoneSet } from '@/lib/campusPhones'

/**
 * The two campus-locked registration forms, at /register/primary and /register/grade-school.
 *
 * They live here rather than in `defaultPages` because their slugs have a path segment and the
 * `[slug]` route only matches one. Each has its own route file under app/(frontend)/register/.
 * `/register` itself is the chooser that sends parents to the right one.
 */

/** Shared tail: what to bring, then a talk-to-us band. Identical on both forms. */
const commonTail = (campus: string, phones: CampusPhoneSet): RenderableBlock[] => [
  {
    blockType: 'prose',
    background: 'white',
    heading: 'What to have ready',
    items: [
      { type: 'p', text: 'Nothing needs to be uploaded now, but the form is quicker with these to hand:' },
      {
        type: 'ul',
        items: [
          'Child’s birth certificate (for the exact date and place of birth)',
          'Previous report card, if your child has been at school before',
          'Parent / guardian ID or passport numbers',
          'Passport-size photographs (bring these with you to campus)',
        ],
      },
    ],
  },
  {
    blockType: 'ctaBand',
    background: 'navy',
    heading: 'Prefer to talk first?',
    subhead: `Visit ${campus} or call us. We’ll walk you through everything.`,
    links: [
      { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
      ...phones.numbers.map((n) => ({
        link: { appearance: 'primary' as const, type: 'custom' as const, label: `Call ${n.display}`, url: `tel:${n.tel}` },
      })),
    ],
  },
]

export const registerPages: Record<'primary' | 'grade-school', DefaultPage> = {
  primary: {
    title: 'Primary School Registration',
    seoTitle: 'Primary School Registration, Bisrate Gebriel | Nucleus International Schools',
    description:
      'Register for Preschool or KG at Nucleus, South African Campus, Bisrate Gebriel, Addis Ababa. Six short steps, and admissions replies within one business day.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'Primary School · Bisrate Gebriel Campus',
        heading: 'Register for\nPreschool or KG',
        bgImage: '/images/stock/admissions-hero.webp',
        subhead:
          'This form registers your child at our Bisrate Gebriel (South African Campus) campus. It takes about ten minutes, it saves as you go, and you can stop and come back to it any time on the same device.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Start the form', url: '#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Joining Year 2 to Year 9 (Grade 1 to Grade 8)?', url: '/register/grade-school' } },
        ],
      },
      { blockType: 'admissionApplication', variant: 'primary' },
      ...commonTail('our Bisrate Gebriel campus', PRESCHOOL_PHONES),
    ],
  },

  'grade-school': {
    title: 'Grade School Registration',
    seoTitle: 'Grade School Registration, Vatican Campus | Nucleus International Schools',
    description:
      'Register for Year 2 to Year 9 (Grade 1 to Grade 8) at Sarbet Vatican, Addis Ababa, on the international Cambridge curriculum. We reply within one business day.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'Grade School · Vatican Campus',
        heading: 'Register for\nYear 2 to Year 9 (Grade 1 to Grade 8)',
        bgImage: '/images/stock/admissions-hero.webp',
        subhead:
          'This form registers your child at our Vatican campus, on the international Cambridge curriculum. It takes about ten minutes, it saves as you go, and you can stop and come back to it any time on the same device.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Start the form', url: '#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Joining Preschool or KG?', url: '/register/primary' } },
        ],
      },
      { blockType: 'admissionApplication', variant: 'grade-school' },
      ...commonTail('our Vatican campus', VATICAN_PHONES),
    ],
  },
}
