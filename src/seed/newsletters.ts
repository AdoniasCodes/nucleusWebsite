import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * Seeds the newsletter: the "Nucleus International School Summer Camp 2026"
 * series (playlist) and its weekly recap articles.
 * Re-runnable — upserts the playlist by slug and recreates each article by slug.
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
  videoUrl?: string
  videoPoster?: string
  videoCaption?: string
}

const week1Sections: SeedSection[] = [
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

const week2Sections: SeedSection[] = [
  {
    heading: 'Invent. Explore. Grow.',
    body: [
      {
        p: 'Every week at Nucleus is another adventure in curiosity. This week our campers continued exploring the world through creativity, teamwork and hands-on discovery. Whether building, painting, coding, playing or performing, every child discovered something new about themselves.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week2-playground-hoops.webp`,
        alt: 'Campers playing with hula hoops on the green playground under the big tree, with swings and a climbing frame behind them',
        caption: 'Another week of adventures underway.',
      },
    ],
  },
  {
    heading: 'The Big Story: Confidence Is Growing',
    body: [
      {
        p: 'If week one was about discovering camp, week two was about discovering confidence.',
      },
      {
        p: 'Children who were shy on Monday were leading games by Friday. New friendships formed, hands went up more often, and every activity became another opportunity to ask questions, solve problems and celebrate success.',
      },
      { p: 'At Nucleus, confidence grows through doing.' },
    ],
    images: [
      {
        imageUrl: `${IMG}/week2-hands-up-circle.webp`,
        alt: 'Campers seated in a circle raising their hands to answer while a teacher leads the discussion',
        caption: 'Hands up more often, every day.',
      },
    ],
  },
  {
    heading: "Innovation Lab: Today's Young Engineers",
    body: [
      { p: 'This week’s innovation challenge encouraged campers to think like designers. Children experimented, tested ideas, improved their creations and learned that mistakes are simply another step toward success.' },
      { p: 'Skills the lab put to work:' },
      {
        ul: ['Critical thinking', 'Problem solving', 'Creativity', 'Teamwork', 'Communication'],
      },
      { p: '"What can we change to make it even better?" became the question of the week.' },
    ],
    images: [
      {
        imageUrl: `${IMG}/week2-coding-mats.webp`,
        alt: 'Campers working on floor activity mats, one threading a colorful string toy while others study their coding mats',
        caption: 'Test it, improve it, try again.',
      },
      {
        imageUrl: `${IMG}/week2-robot-mat-play.webp`,
        alt: 'Children gathered around a purple robot coding mat with wooden shelves behind them',
        caption: 'Design thinking, floor edition.',
      },
    ],
  },
  {
    heading: 'Creative Studio: Where Imagination Comes Alive',
    body: [
      { p: 'Paint, colour, paper, glue and imagination filled our Creative Studio this week. Our artists learned that there is no single "right answer" in art: every project reflected each child’s own personality and ideas.' },
      { p: 'This week’s creative focus:' },
      { ul: ['Imagination', 'Fine motor skills', 'Colour exploration', 'Self-expression'] },
    ],
    images: [
      {
        imageUrl: `${IMG}/week2-mosaic-art.webp`,
        alt: 'A camper proudly holding up a colorful geometric paper mosaic made of orange, green, yellow and pink shapes',
        caption: 'One artist, one very bold mosaic.',
      },
      {
        imageUrl: `${IMG}/week2-paper-craft.webp`,
        alt: 'Campers working on yellow paper craft projects on the classroom floor with their teachers',
        caption: 'Scissors, glue and full focus.',
      },
    ],
  },
  {
    heading: 'Robot Report: Meet Our Little Programmers',
    body: [
      { p: 'Robots don’t just move. They follow instructions.' },
      {
        p: 'Campers explored sequencing, simple programming and logical thinking while discovering how technology helps solve real-life problems. One of our programmers spent the session building a full command sequence, block by block.',
      },
      { p: 'One camper proudly announced: "I made the robot do exactly what I wanted!"' },
    ],
    images: [
      {
        imageUrl: `${IMG}/week2-robotics-class.webp`,
        alt: 'A robotics instructor holding up a robot part while campers raise their hands during robotics class',
        caption: 'Robotics class, hands up as usual.',
      },
    ],
    videoUrl: '/video/newsletter/week2-robot-coding.mp4',
    videoPoster: `${IMG}/week2-robot-coding-poster.webp`,
    videoCaption: 'A camper programming a robot, block by block.',
  },
  {
    heading: 'Playground Pulse: Learning Through Play',
    body: [
      { p: 'Outside the classroom, learning continued. Campers strengthened their bodies while learning:' },
      { ul: ['Cooperation', 'Resilience', 'Fair play', 'Leadership'] },
      {
        p: 'Whether running, kicking a football or learning taekwondo, everyone discovered that teamwork makes every game more enjoyable.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week2-football-duel.webp`,
        alt: 'Two campers contesting a football on the artificial turf in front of the Nucleus International Schools building',
        caption: 'A proper one-on-one on the turf.',
      },
      {
        imageUrl: `${IMG}/week2-taekwondo-pad-punch.webp`,
        alt: 'A young camper striking a training pad held by the taekwondo instructor while a coach watches',
        caption: 'Pad work with the taekwondo coaches.',
      },
    ],
  },
  {
    heading: "Coach's Corner",
    style: 'highlight',
    body: [
      {
        p: '"One of the greatest joys this week was watching children who were nervous on Monday become confident leaders by Friday. They are learning that trying is more important than being perfect."',
      },
      { p: 'The Nucleus Summer Camp Team' },
    ],
  },
  {
    heading: 'Music Makers: Rhythm, Movement and Joy',
    body: [
      { p: 'The music room was alive with laughter this week. Children explored rhythm through instruments, movement games and singing.' },
      { p: 'Music helps develop:' },
      { ul: ['Listening skills', 'Confidence', 'Memory', 'Coordination'] },
      { p: 'And plenty of smiles.' },
    ],
    images: [
      {
        imageUrl: `${IMG}/week2-guitar-focus.webp`,
        alt: 'A camper concentrating on an acoustic guitar chord beneath a Nucleus banner in the music room',
        caption: 'First chords, full concentration.',
      },
      {
        imageUrl: `${IMG}/week2-guitar-lesson.webp`,
        alt: 'A music teacher sitting on the floor guiding two campers holding acoustic guitars',
        caption: 'Guitar circle with the music teacher.',
      },
    ],
  },
  {
    heading: 'Camp Snapshots',
    style: 'gallery',
    body: [{ p: 'Week two at Nucleus Summer Camp, in pictures.' }],
    images: [
      { imageUrl: `${IMG}/week2-football-field.webp`, alt: 'Campers playing football on the turf below the Confidence Beyond Classrooms banner' },
      { imageUrl: `${IMG}/week2-taekwondo-coaching.webp`, alt: 'A taekwondo instructor kneeling to coach a young camper through a stance' },
      { imageUrl: `${IMG}/week2-music-room.webp`, alt: 'Campers doing movement actions on the music room floor while a teacher plays the keyboard' },
      { imageUrl: `${IMG}/week2-taekwondo-high-kick.webp`, alt: 'A small camper landing a high kick on a training pad held by the instructor' },
      { imageUrl: `${IMG}/week2-playground-hoops.webp`, alt: 'The playground full of campers with hula hoops, swings and the climbing frame' },
      { imageUrl: `${IMG}/week2-mosaic-art.webp`, alt: 'A camper holding up a colorful geometric paper mosaic artwork' },
      { imageUrl: `${IMG}/week2-hands-up-circle.webp`, alt: 'Campers raising their hands in a discussion circle with their teacher' },
      { imageUrl: `${IMG}/week2-guitar-lesson.webp`, alt: 'Two campers practicing acoustic guitar with their music teacher' },
      { imageUrl: `${IMG}/week2-robotics-class.webp`, alt: 'The robotics instructor demonstrating a build while campers raise their hands' },
    ],
  },
  {
    heading: 'Camper Spotlight: Stars of the Week',
    style: 'highlight',
    body: [
      { p: 'This week’s campers impressed us by showing our Nucleus values:' },
      { ul: ['Creativity', 'Kindness', 'Curiosity', 'Teamwork'] },
      {
        p: 'Congratulations to everyone who encouraged a friend, tried something new or never gave up. Thank you to all our wonderful campers and families for another amazing week. Every smile, every question and every new friendship reminds us why learning beyond books matters. We can’t wait to see everyone again on Monday!',
      },
    ],
  },
]

type SeedIssue = {
  article: {
    title: string
    slug: string
    excerpt: string
    heroImageUrl: string
    publishedAt: string
    playlistPart: number
    meta: { title: string; description: string }
  }
  sections: SeedSection[]
}

const ISSUES: SeedIssue[] = [
  {
    article: {
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
    },
    sections: week1Sections,
  },
  {
    article: {
      title: 'Nucleus Summer Camp 2026, Week 2 Recap: Confidence, Coding and Creativity',
      slug: 'summer-camp-2026-week-2-recap',
      excerpt:
        'Week two of Nucleus Summer Camp 2026 was about discovering confidence: campers programmed robots block by block, built bold mosaics, learned guitar, and grew from shy on Monday to leading games by Friday. With video from the robotics lab.',
      heroImageUrl: `${IMG}/week2-football-field.webp`,
      publishedAt: '2026-07-24T15:00:00.000Z',
      playlistPart: 2,
      meta: {
        title: 'Nucleus Summer Camp 2026 Week 2 Recap: Confidence, Coding and Creativity',
        description:
          'Week 2 at Nucleus Summer Camp 2026 in Addis Ababa: robot programming on video, mosaic art, guitar lessons, taekwondo and football. See how confidence grew all week at camp.',
      },
    },
    sections: week2Sections,
  },
]

/** Flatten an issue's visual sections into plain richText for the content fallback + search. */
const contentBlocksFor = (sections: SeedSection[]): ContentBlock[] => {
  const blocks = sections.flatMap((s): ContentBlock[] => [
    ...(s.heading ? [{ h2: s.heading }] : []),
    ...s.body,
  ])
  blocks.push({
    related: [
      { label: 'Explore Nucleus Summer Camp & reserve a spot', url: '/summer-camp' },
      { label: 'Inside Nucleus Summer Camp 2026', url: '/news/nucleus-summer-camp-2026' },
    ],
  })
  return blocks
}

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

  for (const { article, sections } of ISSUES) {
    await payload.delete({ collection: 'posts', where: { slug: { equals: article.slug } } }).catch(() => {})
    await payload.create({
      collection: 'posts',
      data: {
        title: article.title,
        slug: article.slug,
        category: 'newsletter',
        excerpt: article.excerpt,
        heroImageUrl: article.heroImageUrl,
        publishedAt: article.publishedAt,
        playlist: playlist.id,
        playlistPart: article.playlistPart,
        meta: article.meta,
        content: richTextFromBlocks(contentBlocksFor(sections)) as unknown as Post['content'],
        sections: sections.map((s) => ({
          heading: s.heading,
          style: s.style ?? 'auto',
          body: richTextFromBlocks(s.body) as unknown as Post['content'],
          images: (s.images ?? []).map((img) => ({
            imageUrl: img.imageUrl,
            alt: img.alt,
            caption: img.caption,
          })),
          videoUrl: s.videoUrl,
          videoPoster: s.videoPoster,
          videoCaption: s.videoCaption,
        })),
        _status: 'published',
      },
    })
    console.log('seeded article:', article.slug)
  }
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
