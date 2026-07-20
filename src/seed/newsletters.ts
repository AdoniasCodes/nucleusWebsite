import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * Seeds the newsletter: the "Nucleus International School Summer Camp 2026"
 * series (playlist) and its Part 1 article, the Week 1 camp recap.
 * Re-runnable — upserts the playlist by slug and recreates the article by slug.
 * Run: `npm run seed:newsletters`
 */

const IMG = '/images/newsletter/summer-camp-2026'

const PLAYLIST = {
  title: 'Nucleus International School Summer Camp 2026',
  slug: 'summer-camp-2026',
  description:
    'Weekly recaps of Nucleus Summer Camp 2026: photos from our campuses, what campers built and learned each week, and takeaways from our staff and camp teachers.',
  coverImageUrl: `${IMG}/week1-taekwondo-class.webp`,
}

type SeedSection = {
  heading?: string
  style?: 'auto' | 'gallery' | 'highlight'
  body: ContentBlock[]
  images?: { imageUrl: string; alt: string; caption?: string }[]
}

const sections: SeedSection[] = [
  {
    heading: 'What a Fantastic Week at Camp',
    body: [
      {
        p: 'Our campers have had an exciting week full of discovery, creativity, friendship and fun. From robotics activities and creative art projects to sports, music and outdoor adventures, every day has been filled with smiles and learning.',
      },
      {
        p: 'Nucleus Summer Camp is designed to help children grow through exploration, creativity and meaningful experiences, and week one delivered exactly that.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week1-dance-joy.webp`,
        alt: 'Nucleus campers laughing and dancing together during a movement session',
        caption: 'Energy levels: fully charged.',
      },
    ],
  },
  {
    heading: 'Creative Challenge of the Week: How the Body Moves',
    body: [
      { p: 'This week our young artists explored how the human body moves, and built it with their own hands:' },
      {
        ul: [
          'Campers made Shape Men from simple paper shapes joined together with fasteners.',
          'Moving the fastener joints let children explore body proportions and different movements.',
          'The activity built creativity, fine motor skills and a real understanding of how the body moves.',
        ],
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week1-shape-men-figures.webp`,
        alt: 'Articulated paper Shape Men with fastener joints laid out on a wooden art table',
        caption: 'Shape Men with working joints, built by campers.',
      },
      {
        imageUrl: `${IMG}/week1-art-class.webp`,
        alt: 'Campers cutting out paper body shapes with their art teacher at the creative studio',
        caption: 'Careful hands in the art studio.',
      },
      {
        imageUrl: `${IMG}/week1-shape-man-wall.webp`,
        alt: 'A finished blue paper Shape Man posed mid-stride on the classroom wall',
        caption: 'One finished Shape Man, ready to run.',
      },
    ],
  },
  {
    heading: 'Story Time & Creative Corner',
    body: [
      { p: 'Between the big projects, our storytellers and creators kept imaginations busy:' },
      {
        ul: [
          'Campers learned about the butterfly life cycle, from caterpillar to butterfly.',
          'Children created colorful butterflies inspired by what they learned.',
          'Through storytelling, campers explored positive characters built on kindness and honesty.',
        ],
      },
    ],
  },
  {
    heading: 'Robotics & Discovery',
    body: [
      { p: 'Our future innovators had a week of hands-on discovery:' },
      {
        ul: [
          'Children explored how robots and technology work through guided demonstrations.',
          'Campers learned about traffic lights, sequencing and following instructions.',
          'Students discovered how robots can move, carry items and help solve everyday problems.',
        ],
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week1-vex-robot.webp`,
        alt: 'A VEX robot with a red carrying basket built during robotics class',
        caption: 'This one carries things. On purpose.',
      },
      {
        imageUrl: `${IMG}/week1-robot-flag-build.webp`,
        alt: 'A camper-built WhalesBot construction with remote control on the robotics table',
        caption: 'Built, programmed and tested by campers.',
      },
    ],
  },
  {
    heading: 'Sports & Outdoor Fun',
    body: [
      { p: 'The playground was buzzing with energy all week:' },
      {
        ul: [
          'Campers learned basic taekwondo and gymnastics for movement and balance.',
          'Running activities helped children build fitness, coordination and teamwork.',
          'Soccer games encouraged sportsmanship, cooperation and active play with friends.',
        ],
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week1-taekwondo-class.webp`,
        alt: 'A full room of campers in fighting stance during a taekwondo lesson',
        caption: 'First taekwondo stances of the summer.',
      },
    ],
  },
  {
    heading: 'Music & Movement',
    body: [
      { p: 'The music wing was loud in all the right ways:' },
      {
        ul: [
          'Campers made their own musical shakers and explored different rhythms and sounds.',
          'Children danced and moved to the beat, building confidence and coordination.',
          'Through imaginative play, campers pretended to be motorcycles, buzzing their lips and creating sound effects while learning about tempo and movement.',
        ],
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week1-music-keyboards.webp`,
        alt: 'Campers playing keyboards while their music teacher guides the session in the music room',
        caption: 'Keyboards and rhythm in the music wing.',
      },
    ],
  },
  {
    heading: 'Camp Snapshots',
    style: 'gallery',
    body: [{ p: 'Week one at Nucleus Summer Camp, in pictures.' }],
    images: [
      { imageUrl: `${IMG}/week1-hula-hoops.webp`, alt: 'Two campers practicing hula hoop skills on the blue outdoor court' },
      { imageUrl: `${IMG}/week1-dance-joy.webp`, alt: 'Campers mid-dance, laughing during a music and movement session' },
      { imageUrl: `${IMG}/week1-shape-men-figures.webp`, alt: 'Paper Shape Men figures with fastener joints on the art table' },
      { imageUrl: `${IMG}/week1-taekwondo-class.webp`, alt: 'Campers holding a taekwondo stance with their instructors' },
      { imageUrl: `${IMG}/week1-vex-robot.webp`, alt: 'A VEX robot with a red basket built in robotics class' },
      { imageUrl: `${IMG}/week1-art-class.webp`, alt: 'Campers cutting paper figures with a teacher in the art studio' },
      { imageUrl: `${IMG}/week1-robot-flag-build.webp`, alt: 'A WhalesBot build with its remote control on the robotics table' },
      { imageUrl: `${IMG}/week1-music-keyboards.webp`, alt: 'Campers playing keyboards with their music teacher in the music room' },
      { imageUrl: `${IMG}/week1-shape-man-wall.webp`, alt: 'A blue paper Shape Man displayed on the classroom wall' },
    ],
  },
  {
    heading: 'Camp Shout-Outs',
    style: 'highlight',
    body: [
      { p: 'Well done to every camper who showed the values we celebrate daily at Nucleus:' },
      { ul: ['Care', 'Resilience', 'Honesty', 'Excellence'] },
      {
        p: 'Learning beyond books: through robotics, sport, music, art and real discovery, our campers keep learning, creating and growing. See you next Friday for the Week 2 recap.',
      },
    ],
  },
]

const ARTICLE = {
  title: 'Nucleus Summer Camp 2026, Week 1 Recap: Robotics, Art, Sports and Music',
  slug: 'summer-camp-2026-week-1-recap',
  excerpt:
    'Week one of Nucleus Summer Camp 2026 was full of discovery: campers built moving Shape Men, met real robots, made musical shakers, and learned taekwondo, running and soccer. The full recap, in pictures.',
  heroImageUrl: `${IMG}/week1-hula-hoops.webp`,
  publishedAt: '2026-07-17T15:00:00.000Z',
  playlistPart: 1,
  meta: {
    title: 'Nucleus Summer Camp 2026 Week 1 Recap: Robotics, Art, Sports and Music',
    description:
      'Week 1 at Nucleus Summer Camp 2026 in Addis Ababa: robotics discovery, Shape Men art, taekwondo, running, soccer and music. See the full photo recap from camp.',
  },
}

/** Flatten the visual sections into plain richText for the content fallback + search. */
const contentBlocks: ContentBlock[] = sections.flatMap((s): ContentBlock[] => [
  ...(s.heading ? [{ h2: s.heading }] : []),
  ...s.body,
])
contentBlocks.push({
  related: [
    { label: 'Explore Nucleus Summer Camp & reserve a spot', url: '/summer-camp' },
    { label: 'Inside Nucleus Summer Camp 2026', url: '/news/nucleus-summer-camp-2026' },
  ],
})

const run = async () => {
  const payload = await getPayload({ config })

  // Upsert the series (playlist) by slug — never delete it, articles point at it.
  const existing = await payload.find({
    collection: 'playlists',
    where: { slug: { equals: PLAYLIST.slug } },
    limit: 1,
  })
  const playlist = existing.docs[0]
    ? await payload.update({ collection: 'playlists', id: existing.docs[0].id, data: PLAYLIST })
    : await payload.create({ collection: 'playlists', data: PLAYLIST })
  console.log('playlist ready:', playlist.slug, `(#${playlist.id})`)

  await payload.delete({ collection: 'posts', where: { slug: { equals: ARTICLE.slug } } }).catch(() => {})
  await payload.create({
    collection: 'posts',
    data: {
      title: ARTICLE.title,
      slug: ARTICLE.slug,
      category: 'newsletter',
      excerpt: ARTICLE.excerpt,
      heroImageUrl: ARTICLE.heroImageUrl,
      publishedAt: ARTICLE.publishedAt,
      playlist: playlist.id,
      playlistPart: ARTICLE.playlistPart,
      meta: ARTICLE.meta,
      content: richTextFromBlocks(contentBlocks) as unknown as Post['content'],
      sections: sections.map((s) => ({
        heading: s.heading,
        style: s.style ?? 'auto',
        body: richTextFromBlocks(s.body) as unknown as Post['content'],
        images: (s.images ?? []).map((img) => ({
          imageUrl: img.imageUrl,
          alt: img.alt,
          caption: img.caption,
        })),
      })),
      _status: 'published',
    },
  })
  console.log('seeded article:', ARTICLE.slug)
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
