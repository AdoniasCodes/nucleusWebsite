import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'
import { LEGACY_NEWSLETTER_SLUGS } from '../lib/legacySlugs'

/**
 * Seeds the newsletter: every series (playlist) and the articles inside them.
 * Re-runnable: upserts each playlist by slug and recreates each article by slug.
 * Run: `PAYLOAD_SKIP_PUSH=1 pnpm run seed:newsletters`
 *
 * To add a series: append to SERIES, then give its issues the matching `seriesSlug`.
 */

const IMG = '/images/newsletter/summer-camp-2026'
const CBT = '/images/newsletter/teachers-cbt'

type SeedSeries = {
  title: string
  slug: string
  description: string
  coverImageUrl: string
  /** Cross-links appended to every article in this series. */
  related: { label: string; url: string }[]
}

const SERIES: SeedSeries[] = [
  {
    title: 'Nucleus International School Summer Camp 2026',
    slug: 'summer-camp-2026',
    description:
      'Weekly recaps of Nucleus Summer Camp 2026: photos from our campuses, what campers built and learned each week, and takeaways from our staff and camp teachers.',
    coverImageUrl: `${IMG}/week1-taekwondo-class.webp`,
    related: [
      { label: 'Explore Nucleus Summer Camp & reserve a spot', url: '/summer-camp' },
      { label: 'Inside Nucleus Summer Camp 2026', url: '/news/nucleus-summer-camp-2026' },
      { label: 'Taekwondo classes for kids in Addis Ababa: a parent’s guide', url: '/news/taekwondo-classes-for-kids-addis-ababa' },
    ],
  },
  {
    title: 'Nucleus International Schools Teachers’ Capacity Building Training',
    slug: 'teachers-capacity-building',
    description:
      'The professional development newsletter of Nucleus International Schools. Each issue documents one module of our Teachers’ Capacity Building Training: the practical tools, global strategies and pedagogical thinking behind every Nucleus classroom in Addis Ababa.',
    coverImageUrl: `${CBT}/cbt01-ei-session.webp`,
    related: [
      { label: 'Meet the team behind the training', url: '/about' },
      { label: 'The Cambridge pathway at Nucleus', url: '/cambridge-pathway' },
    ],
  },
]

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

const week3Sections: SeedSection[] = [
  {
    heading: 'Week 3 Recap: From Confidence to Leadership',
    body: [
      { p: 'By week three something exciting happened.' },
      {
        p: 'The children who arrived quietly a few weeks ago are now volunteering to lead activities, helping younger campers, solving challenges together and proudly sharing what they have learned. Confidence has become leadership.',
      },
      {
        p: 'Every day our campers are discovering that great leaders begin by being curious, kind and willing to try.',
      },
      { p: 'Learning beyond books. Every day.' },
    ],
    images: [
      {
        imageUrl: `${IMG}/week3-coding-tiles-explain.webp`,
        alt: 'A camper holding up a strip of coding tiles and explaining it to the friends sitting around her on the activity mat',
        caption: 'The quiet ones are running the sessions now.',
      },
    ],
  },
  {
    heading: 'The Big Story: Leaders Are Made Here',
    body: [
      { p: 'Leadership isn’t about standing in front of a crowd.' },
      {
        p: 'It’s about encouraging a teammate, asking thoughtful questions, listening to new ideas and having the courage to try something difficult.',
      },
      {
        p: 'Throughout the week our campers demonstrated leadership in dozens of small moments that made a big difference.',
      },
      { p: 'This week’s leadership skills included:' },
      { ul: ['Initiative', 'Responsibility', 'Communication', 'Teamwork'] },
    ],
    images: [
      {
        imageUrl: `${IMG}/week3-circle-game-lead.webp`,
        alt: 'A camper standing with his arms outstretched leading a floor game while the rest of the circle watches him',
        caption: 'Calling the next round of the game.',
      },
      {
        imageUrl: `${IMG}/week3-classroom-session.webp`,
        alt: 'Campers seated in a circle of chairs listening to their teacher during a group session',
        caption: 'Listening is a leadership skill too.',
      },
      {
        imageUrl: `${IMG}/week3-circle-listening.webp`,
        alt: 'Campers sitting on the floor in a wide circle, laughing and waiting for their turn in the game',
        caption: 'Waiting your turn, cheering the next one on.',
      },
    ],
  },
  {
    heading: 'Innovation Lab: Solving Problems Like Engineers',
    body: [
      { p: 'Our young innovators continued exploring robotics, coding and engineering challenges.' },
      { p: 'Rather than simply building robots, campers learned to:' },
      {
        ul: [
          'Test ideas',
          'Debug mistakes',
          'Improve designs',
          'Think logically',
          'Work together to find solutions',
        ],
      },
      {
        p: 'Every challenge reminded students that innovation isn’t about getting it right the first time. It’s about improving every time.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week3-robot-team-build.webp`,
        alt: 'Four campers kneeling around a robot build on the floor, working through the printed instruction card together',
        caption: 'Four heads, one instruction card, one robot.',
      },
      {
        imageUrl: `${IMG}/week3-city-mat-build.webp`,
        alt: 'Two campers assembling a blue tower on the printed city mat while classmates build behind them',
        caption: 'Building the city, one block at a time.',
      },
      {
        imageUrl: `${IMG}/week3-robot-mat-focus.webp`,
        alt: 'A camper concentrating on his build on the activity mat while a classmate works on a tablet behind him',
        caption: 'Test it, debug it, build it again.',
      },
    ],
  },
  {
    heading: 'Creative Studio: Every Creation Tells a Story',
    body: [
      { p: 'This week our artists transformed simple materials into imaginative creations.' },
      {
        p: 'Through painting, design and craft work, students learned that creativity is one of the world’s greatest problem-solving tools.',
      },
      { p: 'They explored:' },
      {
        ul: [
          'Working together',
          'Colour and pattern',
          'Fine motor development',
          'Confidence through creativity',
        ],
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week3-watercolour-painting.webp`,
        alt: 'Campers painting watercolour scenes at the art table, paint palettes and water cups in front of them',
        caption: 'Watercolours, and a lot of concentration.',
      },
      {
        imageUrl: `${IMG}/week3-paper-collage-class.webp`,
        alt: 'Two art teachers guiding a full table of campers cutting and gluing coloured paper shapes',
        caption: 'Paper, glue and a room full of ideas.',
      },
      {
        imageUrl: `${IMG}/week3-handprint-paintings.webp`,
        alt: 'Finished handprint paintings in blue, orange and red drying on the wooden art table',
        caption: 'Every handprint signed by its artist.',
      },
      {
        imageUrl: `${IMG}/week3-painted-hands-frame.webp`,
        alt: 'A camper holding up both hands painted blue and red to frame his face',
        caption: 'Blue on the left, red on the right, proud of both.',
      },
    ],
  },
  {
    heading: 'Coach’s Corner',
    style: 'highlight',
    body: [
      {
        p: '"The most rewarding part of this week wasn’t seeing perfect projects. It was watching children encourage one another, celebrate each other’s success and discover they are capable of much more than they imagined."',
      },
      { p: 'The Nucleus Summer Camp Team' },
    ],
  },
  {
    heading: 'Music Corner: Finding Their Voice',
    body: [
      { p: 'Music continued filling our classrooms with laughter.' },
      {
        p: 'Campers explored rhythm, movement, singing and keyboard while developing:',
      },
      { ul: ['Listening', 'Memory', 'Confidence', 'Coordination', 'Self-expression'] },
    ],
    images: [
      {
        imageUrl: `${IMG}/week3-keyboard-boy.webp`,
        alt: 'A camper working through a keyboard exercise with his sheet music propped on the stand',
        caption: 'One line at a time, one hand at a time.',
      },
      {
        imageUrl: `${IMG}/week3-keyboard-girl.webp`,
        alt: 'A camper practising her keyboard piece from handwritten notes in the music room',
        caption: 'Finding her voice at the keyboard.',
      },
      {
        imageUrl: `${IMG}/week3-singing-practice.webp`,
        alt: 'A camper singing out mid phrase while the rest of the group sings along beside the piano',
        caption: 'Singing out, no longer under his breath.',
      },
    ],
    videoUrl: '/video/newsletter/week3-music-choir.mp4',
    videoPoster: `${IMG}/week3-music-choir-poster.webp`,
    videoCaption: 'Watch the whole group sing together, with the music teacher on guitar.',
  },
  {
    heading: 'Active Minds, Active Bodies',
    body: [
      { p: 'Learning doesn’t stop in the classroom.' },
      { p: 'Taekwondo and outdoor games continued helping students build:' },
      { ul: ['Resilience', 'Fair play', 'Leadership', 'Healthy habits', 'Respect for others'] },
    ],
    images: [
      {
        imageUrl: `${IMG}/week3-taekwondo-warmup.webp`,
        alt: 'A full taekwondo class of campers in white doboks working through a warm-up stance together',
        caption: 'The whole class, one stance, one count.',
      },
      {
        imageUrl: `${IMG}/week3-football-tackle.webp`,
        alt: 'Two campers going to ground for the ball on the turf in front of the Nucleus International Schools building',
        caption: 'Everything left on the pitch.',
      },
      {
        imageUrl: `${IMG}/week3-playground-hoops.webp`,
        alt: 'The playground busy with campers on the swings, the climbing frame and hula hoops under the big palm tree',
        caption: 'Break time, in full swing.',
      },
      {
        imageUrl: `${IMG}/week3-basketball-shot.webp`,
        alt: 'A camper watching her shot arc towards the hoop on the blue outdoor basketball court',
        caption: 'One shot, everybody watching.',
      },
    ],
  },
  {
    heading: 'This Week’s Character Focus',
    style: 'highlight',
    body: [
      { p: 'At Nucleus we develop more than academic skills.' },
      { p: 'This week our campers demonstrated:' },
      { ul: ['Curiosity', 'Respect', 'Courage', 'Creativity', 'Leadership'] },
      { p: 'These qualities are just as important as mathematics, science and coding.' },
    ],
  },
  {
    heading: 'Camp Snapshots',
    style: 'gallery',
    body: [{ p: 'Week three at Nucleus Summer Camp, in pictures.' }],
    images: [
      {
        imageUrl: `${IMG}/week3-football-banner-field.webp`,
        alt: 'Campers playing football on the turf beneath the Confidence Beyond Classrooms banner',
      },
      {
        imageUrl: `${IMG}/week3-art-table-brushes.webp`,
        alt: 'The art teacher holding up two brushes while campers wait at the paint table by the window',
      },
      {
        imageUrl: `${IMG}/week3-keyboard-duo.webp`,
        alt: 'Two campers at the keyboard together, one playing while the other follows the music with a guitar in hand',
      },
      {
        imageUrl: `${IMG}/week3-campus-turf.webp`,
        alt: 'The Nucleus International Schools building and Cambridge banner seen across the green turf pitch',
      },
      {
        imageUrl: `${IMG}/week3-music-circle.webp`,
        alt: 'The music teacher leading a circle of campers seated on the floor of the music room',
      },
      {
        imageUrl: `${IMG}/week3-paint-hands-teacher.webp`,
        alt: 'A teacher laughing with a camper as he presses his paint covered hand onto paper',
      },
      {
        imageUrl: `${IMG}/week3-football-through-goal.webp`,
        alt: 'Two campers chasing the ball on the turf, seen through the frame of the goal',
      },
      {
        imageUrl: `${IMG}/week3-basketball-court.webp`,
        alt: 'Campers passing a basketball on the blue outdoor court beside the Think Create Solve board',
      },
      {
        imageUrl: `${IMG}/week3-football-dribble.webp`,
        alt: 'A camper in red driving the ball forward on the turf in front of the school building',
      },
    ],
  },
  {
    heading: 'Camper Spotlight: Stars of Week 3',
    style: 'highlight',
    body: [
      { p: 'This week’s campers inspired us by demonstrating our Nucleus values:' },
      { ul: ['Leadership', 'Kindness', 'Curiosity', 'Creativity', 'Teamwork'] },
      {
        p: 'Thank you to our wonderful campers and families for another unforgettable week. Every question asked, every friendship formed and every challenge accepted reminds us why we believe in learning beyond books. We can’t wait to see everyone next week!',
      },
    ],
  },
]

/* ------------------------------------------------------------------------------
 * Summer Camp 2026, Week 4: the confidence to try.
 * Source: the Week 4 doc from leadership, plus 14 photos and 2 taekwondo clips (7 Aug).
 * The doc lists music and science among the week's activities; there are no photos of
 * either in this drop, so the list keeps them and the sections only claim what is shown.
 * ---------------------------------------------------------------------------- */
const week4Sections: SeedSection[] = [
  {
    heading: 'The Confidence to Try',
    body: [
      { p: 'Confidence does not arrive overnight. It grows one challenge at a time.' },
      {
        p: 'Through week four our campers stepped outside their comfort zones in ways that were easy to miss unless you were watching for them. Joining a game that had already started. Starting a painting with no idea how it would end. Standing up in front of the group. Going back to a problem that did not work the first time.',
      },
      {
        p: 'At Nucleus we celebrate the effort as much as the result. A child who tries something hard and does not get it right has already done the difficult part.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week4-football-confidence-banner.webp`,
        alt: 'Campers playing football on the turf pitch beneath a Nucleus banner reading Confidence Beyond Classrooms',
        caption: 'The banner says it. The pitch proves it.',
      },
    ],
    videoUrl: '/video/newsletter/week4-taekwondo-drills.mp4',
    videoPoster: `${IMG}/week4-taekwondo-drills-poster.webp`,
    videoCaption: 'Watch: partner drills in the taekwondo hall, where getting it wrong is part of the lesson.',
  },
  {
    heading: 'Learning Beyond the Classroom',
    body: [
      {
        p: 'The week was built around activities that develop the whole child rather than one narrow slice of them.',
      },
      {
        ul: [
          'Creative arts and imagination',
          'Science discoveries and hands-on experiments',
          'Team sports and cooperative games',
          'Music, movement and self-expression',
          'Problem-solving activities',
          'Friendship-building exercises',
        ],
      },
      {
        p: 'Each one asked children to think for themselves, to speak to each other with respect, and to look out for the person sitting next to them.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week4-art-group-table.webp`,
        alt: 'Campers gathered around the art station table mixing paint in plastic cups and working on their own sheets',
        caption: 'The art station on a busy morning.',
      },
      {
        imageUrl: `${IMG}/week4-art-table-painting.webp`,
        alt: 'Campers standing around the wooden art table painting, one holding up a finished sheet to show the group',
        caption: 'Holding the work up before the paint is dry.',
      },
      {
        imageUrl: `${IMG}/week4-art-teacher-help.webp`,
        alt: 'A camper in a red tracksuit painting at the art table while a teacher helps the children around him',
        caption: 'A teacher on hand, but the choices stay with the child.',
      },
    ],
  },
  {
    heading: 'Every Child Has a Moment to Shine',
    body: [
      { p: 'The best part of the job is watching a child surprise themselves.' },
      {
        p: 'Campers who barely spoke in the first week are now volunteering to lead group activities. Others who preferred to work quietly are putting their ideas to the whole table. Every child moves at their own pace, and every success, big or small, gets marked.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week4-handprints-held-high.webp`,
        alt: 'Six campers standing in a line holding their handprint paintings above their heads for the camera',
        caption: 'Everyone finished. Everyone showed.',
      },
      {
        imageUrl: `${IMG}/week4-handprint-proud.webp`,
        alt: 'A camper holding up her handprint painting in front of the Art Beyond Norms poster in the art room',
        caption: 'Two hands, two colours, one very pleased artist.',
      },
      {
        imageUrl: `${IMG}/week4-art-table-talk.webp`,
        alt: 'Four campers sitting around the art table talking to each other between painting sessions',
        caption: 'Half the learning happens in the gaps between activities.',
      },
    ],
  },
  {
    heading: 'Problem Solving, One Robot at a Time',
    body: [
      {
        p: 'In the innovation lab the brief is never just "build it". It is build it, run it, watch it fail, and work out why.',
      },
      {
        p: 'Campers worked in pairs on the kits and at the laptop, taking turns to test a design and change one thing at a time. Nobody gets a working robot on the first attempt, which is exactly the point.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week4-robotics-build-laptop.webp`,
        alt: 'An instructor kneeling on the floor helping two campers assemble a robotics kit next to an open laptop',
        caption: 'Testing the build against the code on the laptop.',
      },
      {
        imageUrl: `${IMG}/week4-robot-floor-drive.webp`,
        alt: 'A young camper lying on the carpet driving a small wheeled robot she has just finished building',
        caption: 'First successful run of the morning.',
      },
    ],
  },
  {
    heading: 'The Taekwondo Hall',
    body: [
      {
        p: 'Taekwondo is where the week is most obviously about nerve. Campers line up in belt order, run the same pattern until it is clean, then put the pads on and face someone their own size.',
      },
      {
        p: 'It teaches control before it teaches anything else: how hard is too hard, when to stop, how to lose a round and shake hands afterwards.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week4-taekwondo-class.webp`,
        alt: 'A large group of campers in white taekwondo uniforms practising a blocking pattern in the training hall',
        caption: 'The whole hall on the same count.',
      },
      {
        imageUrl: `${IMG}/week4-taekwondo-punch-line.webp`,
        alt: 'Campers in taekwondo uniforms lined up in rows practising a punch drill with the instructor at the front',
        caption: 'Same pattern, again, until it is clean.',
      },
    ],
    videoUrl: '/video/newsletter/week4-taekwondo-sparring.mp4',
    videoPoster: `${IMG}/week4-taekwondo-sparring-poster.webp`,
    videoCaption: 'Watch: sparring in full head guards and gloves, with the coach calling the round.',
  },
  {
    heading: 'On the Pitch and the Court',
    body: [
      {
        p: 'Outside, the turf pitch and the blue court ran all week. Football in the morning while it was still cool, basketball once the sun was over the palm trees.',
      },
      {
        p: 'Team sport does something a classroom cannot. You cannot hide in a five-a-side game, and you cannot win one on your own either.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week4-football-dribble-run.webp`,
        alt: 'Two campers chasing the ball down the turf pitch during a five-a-side football game',
        caption: 'The chase is most of the game at this age.',
      },
      {
        imageUrl: `${IMG}/week4-basketball-drive.webp`,
        alt: 'Two campers playing one on one basketball on the blue outdoor court under the palm tree',
        caption: 'One on one, no referee needed.',
      },
      {
        imageUrl: `${IMG}/week4-basketball-girl.webp`,
        alt: 'A young camper in a white dress standing on the blue basketball court holding a basketball and smiling',
        caption: 'Waiting for the pass.',
      },
    ],
  },
  {
    heading: 'Building Skills for Life',
    style: 'highlight',
    body: [
      {
        p: 'Summer Camp is about more than keeping children busy through the holidays. It is about the things that stay with them after the last day.',
      },
      {
        ul: [
          'Confidence',
          'Communication',
          'Creativity',
          'Critical thinking',
          'Teamwork',
          'Leadership',
          'Resilience',
        ],
      },
      {
        p: 'These are the qualities that make a successful learner, and later, a compassionate leader.',
      },
    ],
  },
  {
    heading: 'Looking Ahead: the Closing Celebration',
    body: [
      {
        p: 'With the final days of camp in sight, everything is now pointing at our Closing Celebration on Friday 14 August, where we mark the friendships made, the skills learned and the memories built over the summer.',
      },
      {
        p: 'Every camper will receive a Certificate of Participation recognising their enthusiasm, their effort and their commitment across the programme.',
      },
      {
        p: 'Thank you to all our parents for trusting Nucleus International Schools with your children this summer. Watching them grow in confidence each day has been a privilege for the whole team.',
      },
      { p: 'Together we are nurturing curious minds, kind hearts and confident futures.' },
    ],
  },
]

/* ------------------------------------------------------------------------------
 * Summer Camp 2026, Week 5: the closing ceremony, 14 August 2026.
 * Source: the final newsletter doc from leadership, plus the photographer's set
 * from the ceremony. No robotics or chess photos were supplied, so the copy
 * names them without claiming a picture of either.
 * ---------------------------------------------------------------------------- */
const week5Sections: SeedSection[] = [
  {
    heading: 'Five Weeks Ago, They Walked In',
    body: [
      {
        p: 'Five weeks ago our campers walked through the doors of Nucleus International Schools ready for a summer adventure. Some arrived excited, some a little shy, and some unsure of what to expect.',
      },
      {
        p: 'Today they leave as a community of young learners who have created, experimented, performed, played, solved problems, made friends and discovered just how much they can do.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week5-ceremony-stage-wide.webp`,
        alt: 'The stage at the Nucleus International Schools summer camp closing ceremony in Addis Ababa, with a host at the podium and parents seated in front',
        caption: 'The closing ceremony, Friday 14 August, with the families in their seats.',
      },
    ],
  },
  {
    heading: 'Look How Far We Have Come',
    body: [
      { p: 'Throughout summer camp, learning has happened everywhere.' },
      {
        p: 'At the art table, imagination became creativity. In chess and robotics, children learned to think, plan and solve problems. Through music and drama, they found new ways to express themselves. Through taekwondo and physical activities, they practised discipline, coordination and perseverance.',
      },
      {
        p: 'But perhaps the most important learning cannot be displayed on a table or demonstrated on a stage. We have watched children become more confident, more independent and more willing to try. We have seen friendships form, teamwork develop and children encourage one another.',
      },
      { p: 'Those are achievements worth celebrating.' },
    ],
    images: [
      {
        imageUrl: `${IMG}/week5-art-exhibition-room.webp`,
        alt: 'Campers and staff in the art classroom at Nucleus, with childrens paintings covering the wall and portraits standing on easels',
        caption: 'Five weeks of art, hung wall to wall for the families to walk through.',
      },
      {
        imageUrl: `${IMG}/week5-taekwondo-instructor-demo.webp`,
        alt: 'A taekwondo instructor mid-movement on the mat while rows of young campers in white uniforms follow behind him',
        caption: 'Discipline and coordination, five weeks in the making.',
      },
      {
        imageUrl: `${IMG}/week5-camper-speaking-podium.webp`,
        alt: 'A young camper speaking into a microphone at the podium during the Nucleus summer camp closing ceremony',
        caption: 'A voice that would not have reached the microphone in week one.',
      },
    ],
  },
  {
    heading: 'Our Final Celebration',
    body: [
      {
        p: 'On Friday 14 August, our first Nucleus International Summer Camp came to a joyful close with a special celebration for our campers and their families.',
      },
      {
        p: 'The children proudly showcased many of the activities they had enjoyed and developed throughout the five weeks:',
      },
      {
        ul: [
          'Music and singing',
          'Speaking and presentation',
          'Taekwondo',
          'Chess',
          'Art',
          'Robotics',
        ],
      },
      {
        p: 'Music, singing, speaking, chess and taekwondo came to life through performances, while art and robotics were showcased in individual classrooms, giving parents the chance to see the children’s work up close. It was a wonderful way for the children to demonstrate not only what they had learned, but also the confidence, creativity and teamwork they had developed along the way.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week5-singing-performance.webp`,
        alt: 'A young camper in a grey suit singing into a microphone on stage while the rest of his group stands behind him in paper crayon hats',
        caption: 'A soloist, and a group that had his back.',
      },
      {
        imageUrl: `${IMG}/week5-camper-presentation-dress.webp`,
        alt: 'A camper in a traditional white Ethiopian dress presenting at the microphone on stage at the closing ceremony',
        caption: 'Speaking and presentation, in front of the whole room.',
      },
      {
        imageUrl: `${IMG}/week5-drama-masks.webp`,
        alt: 'Four campers dressed in white wearing hand-made bird masks performing a drama piece on stage',
        caption: 'Drama, in masks the children made themselves.',
      },
    ],
  },
  {
    heading: 'The Taekwondo Demonstration',
    body: [
      {
        p: 'The taekwondo group took the stage in belt order and ran their patterns for a room full of parents, which is a very different thing from running them in the hall on a Tuesday.',
      },
      {
        p: 'Then came the pads, the headgear and the boards. Some of the smallest children in the camp queued up to break through a target held at their own height, and the room made more noise for them than for anyone else.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week5-taekwondo-group-pattern.webp`,
        alt: 'Rows of young campers in white taekwondo uniforms performing a pattern together on stage at the closing ceremony',
        caption: 'The whole group, on the same count.',
      },
      {
        imageUrl: `${IMG}/week5-taekwondo-board-break.webp`,
        alt: 'A small camper in a taekwondo uniform kicking through a target pad held by her instructor on stage',
        caption: 'Held at her height, and through it on the first attempt.',
      },
      {
        imageUrl: `${IMG}/week5-taekwondo-sparring-gear.webp`,
        alt: 'Two young campers in red and blue taekwondo sparring gear standing either side of their instructor on stage',
        caption: 'Full pads, and a handshake at the end of it.',
      },
    ],
  },
  {
    heading: 'The Classrooms: Every Wall Covered',
    body: [
      {
        p: 'While the performances ran on stage, the art and robotics rooms were open for families to walk through at their own pace.',
      },
      {
        p: 'Every painting from five weeks of art went up on the walls, portraits stood finished on the easels, and parents went looking for the one with their child’s name on it. Several found their child standing next to it, waiting to explain exactly what it was.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week5-artwork-wall.webp`,
        alt: 'Two members of staff pinning childrens paintings to the display wall in the art room while campers watch',
        caption: 'The last few pieces going up before the doors opened.',
      },
      {
        imageUrl: `${IMG}/week5-portrait-painting-easel.webp`,
        alt: 'An artist painting a portrait at an easel in the Nucleus art room while campers and parents look on',
        caption: 'Portraits being painted live for the families.',
      },
      {
        imageUrl: `${IMG}/week5-parent-viewing-artwork.webp`,
        alt: 'A parent studying the wall of childrens paintings at the summer camp art exhibition',
        caption: 'Looking for one name in particular.',
      },
    ],
  },
  {
    heading: 'A Special First',
    style: 'highlight',
    body: [
      { p: 'There is something particularly special about this group of children: they were the first.' },
      {
        p: 'They were the children who helped us launch our very first Nucleus International Summer Camp. They filled our classrooms with questions, our activity spaces with energy and our days with laughter.',
      },
      {
        p: 'Years from now, when Nucleus has welcomed many more groups of summer campers, these children will always hold a unique place in our story.',
      },
    ],
  },
  {
    heading: 'Thank You, Parents',
    body: [
      { p: 'To our parents and families: thank you for trusting us with your children.' },
      {
        p: 'Thank you for bringing them each morning, encouraging them to participate, reading our newsletters, sharing your feedback and allowing us to be part of their summer.',
      },
      {
        p: 'Most of all, thank you for giving them the opportunity to explore, learn and grow with us.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week5-parents-applauding.webp`,
        alt: 'Parents seated in the audience applauding during the Nucleus summer camp closing ceremony in Addis Ababa',
        caption: 'The loudest section of the room, all afternoon.',
      },
    ],
  },
  {
    heading: 'Certificates, Photographs and Cake',
    body: [
      {
        p: 'Our celebration ended the way it should have: with Certificates of Participation, camp photographs and refreshments shared together.',
      },
      {
        p: 'Every camper collected a certificate recognising their enthusiasm, their effort and their commitment across the five weeks. Then the families took their photographs, the cake came out, and nobody was in a hurry to leave.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week5-refreshments-table.webp`,
        alt: 'Campers queueing along the refreshments table for cake and pastries after the closing ceremony',
        caption: 'The queue that formed the moment the certificates were done.',
      },
      {
        imageUrl: `${IMG}/week5-certificates-group.webp`,
        alt: 'Campers walking the red carpet holding their summer camp Certificates of Participation',
        caption: 'Certificates of Participation, earned over five weeks.',
      },
      {
        imageUrl: `${IMG}/week5-certificate-family.webp`,
        alt: 'A parent photographed with her children and their summer camp certificates at the Nucleus campus',
        caption: 'The photograph the family came for.',
      },
    ],
  },
  {
    heading: 'Scenes From the Closing Ceremony',
    style: 'gallery',
    body: [
      {
        p: 'The rest of the afternoon, in pictures: the welcome, the games, the staff who ran the five weeks, and the families who filled the room.',
      },
    ],
    images: [
      {
        imageUrl: `${IMG}/week5-hosts-welcome.webp`,
        alt: 'Two hosts opening the Nucleus International Schools summer camp closing ceremony from the podium',
        caption: 'Opening the afternoon.',
      },
      {
        imageUrl: `${IMG}/week5-director-address.webp`,
        alt: 'A member of the Nucleus leadership team addressing parents at the summer camp closing ceremony',
        caption: 'A word to the parents before the performances began.',
      },
      {
        imageUrl: `${IMG}/week5-leadership-team.webp`,
        alt: 'Three members of the Nucleus International Schools leadership team standing together on stage',
        caption: 'The team behind the programme.',
      },
      {
        imageUrl: `${IMG}/week5-staff-stage-welcome.webp`,
        alt: 'A member of staff on stage with arms open, welcoming campers and families to the closing ceremony',
        caption: 'Every performance got an introduction.',
      },
      {
        imageUrl: `${IMG}/week5-balloon-game.webp`,
        alt: 'Staff members holding balloons on stage during a game at the summer camp closing ceremony',
        caption: 'A game for the parents, run by the staff.',
      },
      {
        imageUrl: `${IMG}/week5-mask-performance-mic.webp`,
        alt: 'Campers on stage holding hand-made animal masks and a microphone during a drama performance',
        caption: 'Props made in the art room, used on the stage.',
      },
    ],
  },
  {
    heading: 'And to Our Campers',
    style: 'highlight',
    body: [
      {
        ul: [
          'Keep asking questions.',
          'Keep creating.',
          'Keep being kind.',
          'Keep trying things that seem difficult.',
          'Never lose the confidence to say, "I can try."',
        ],
      },
      { p: 'Learning Today. Leading Tomorrow.' },
    ],
  },
]

/* ------------------------------------------------------------------------------
 * Teachers' Capacity Building Training, Issue 01: Emotional Intelligence
 * Source: the CBT programme doc from leadership (Vatican Campus session, July 2026).
 * ---------------------------------------------------------------------------- */
const cbt01Sections: SeedSection[] = [
  {
    heading: 'A Message from Leadership',
    body: [
      {
        p: 'Welcome to the inaugural edition of this newsletter. As we roll out our Teachers\u2019 Capacity Building Training across our campuses, the goal is a simple one: to give our teachers the practical tools, global strategies and pedagogical backing they need to lead a modern classroom.',
      },
      {
        p: 'Aligned with our standards and our commitment to excellence, this series will document that professional development journey step by step, module by module, so that what one campus learns, every campus learns.',
      },
    ],
    images: [
      {
        imageUrl: `${CBT}/cbt01-ei-session.webp`,
        alt: 'A facilitator leading the Emotional Intelligence session for Nucleus teachers at the Vatican campus',
        caption: 'The first Capacity Building Training session, Vatican Campus.',
      },
    ],
  },
  {
    heading: 'Module Spotlight: Emotional Intelligence',
    body: [
      {
        p: 'Teaching is an emotional endeavour as much as an intellectual one. Before a student can learn from us, they must feel safe, seen and understood by us. Our inaugural session at the Vatican Campus focused on emotional intelligence in the classroom: what it is, and what it changes on an ordinary Tuesday morning.',
      },
    ],
    images: [
      {
        imageUrl: `${CBT}/cbt01-participants.webp`,
        alt: 'Nucleus teachers taking notes during the Emotional Intelligence module of the Capacity Building Training',
        caption: 'Teachers from across the school, working through the module together.',
      },
    ],
  },
  {
    heading: 'Key Takeaways from the Training',
    style: 'highlight',
    body: [
      {
        ul: [
          'Self-awareness is a teaching tool. High-performing educators recognise their own emotional triggers, and when we regulate our own state, we co-regulate our students.',
          'Empathy is classroom management. Disruptive behaviour is often a request for support. Empathy lets us address the root cause of a disruption without damaging the relationship.',
          'Social-emotional learning belongs in the lesson. Integrating short emotional check-ins into daily lessons improves academic endurance, resilience and exam performance.',
        ],
      },
    ],
  },
  {
    heading: 'Practical Classroom Tip of the Week',
    body: [
      {
        p: 'The 10-second pause. Before responding to a challenging behavioural moment in class, take a full ten seconds. Ask yourself: am I reacting out of frustration, or responding to help this student learn?',
      },
      {
        p: 'It is one habit, and it costs ten seconds, but it shifts a teacher\u2019s posture from reactive to responsive, and students feel the difference immediately.',
      },
    ],
    images: [
      {
        imageUrl: `${CBT}/cbt01-group-activity.webp`,
        alt: 'Nucleus staff working through a group activity on a whiteboard during the training session',
        caption: 'Working the ideas through as a group, not just hearing them.',
      },
    ],
  },
]

/* ------------------------------------------------------------------------------
 * Teachers' Capacity Building Training, Issue 02: the founders' vision session
 * Source: Eyoel's brief from the 3 Aug 2026 session at the Vatican campus, where
 * Ato Asfaw G/Hiwot took the staff through the founding story and the education gap
 * the school was built to close. Photos from the same morning.
 * ---------------------------------------------------------------------------- */
const cbt02Sections: SeedSection[] = [
  {
    heading: 'The Founder Opened the Training Himself',
    body: [
      {
        p: 'The second module of our Teachers\u2019 Capacity Building Training did not begin with a policy briefing or a curriculum map. It began with the founder.',
      },
      {
        p: 'Ato Asfaw G\u2019Hiwot stood in front of the teaching and support teams at our Vatican campus, under the shield that carries the three words this school is built on, and answered a question most staff inductions skip entirely: not what Nucleus teaches, but why Nucleus exists.',
      },
      {
        p: 'Every teacher who joins us inherits a method. This session was about making sure they inherit the reason behind it too.',
      },
    ],
    images: [
      {
        imageUrl: `${CBT}/cbt02-founder-address.webp`,
        alt: 'Founder Ato Asfaw G\u2019Hiwot addressing Nucleus teaching staff during capacity building training in Addis Ababa',
        caption: 'Ato Asfaw G\u2019Hiwot opening the session beneath the school shield: Think Deeply. Create Boldly. Solve Truly.',
      },
    ],
  },
  {
    heading: 'Nucleus Was Born Out of Love',
    body: [
      {
        p: 'The founding story is short, and it is personal. Ato Asfaw G\u2019Hiwot and Engineer Demitu Feyisa have four children. Every early decision about this school was first a decision about them.',
      },
      {
        p: 'Three years ago they opened a Cambridge-certified preschool at Abo Mekanisa. It has since grown into a full Preschool to Grade 8 school teaching the international Cambridge curriculum at the Vatican campus. The scale changed. The reason did not.',
      },
      {
        p: '"Born out of love" is easy to read as a line on an About page. Said out loud, to the people who will actually deliver it, it lands differently. A school you built for your own children is a school you cannot afford to get wrong.',
      },
    ],
    images: [
      {
        imageUrl: `${CBT}/cbt02-training-room.webp`,
        alt: 'Nucleus teachers and staff seated for the capacity building training session at the Vatican campus in Addis Ababa',
        caption: 'Teaching and support staff together, Vatican campus.',
      },
    ],
  },
  {
    heading: 'The Morning After Graduation',
    body: [
      {
        p: 'Then the founder described the moment that made him build a school.',
      },
      {
        p: 'Picture an Ethiopian family on graduation day. Years of school fees. Years of exams. The gown, the photographs, the celebration at home. Everyone is proud, and they have earned it.',
      },
      {
        p: 'The next morning, the graduate wakes up and has no idea what to do with their life.',
      },
      {
        p: 'It is one of the most familiar experiences in Ethiopian households, and it is almost never discussed as an education problem. It gets blamed on the job market, on connections, on luck, sometimes on the young person themselves. Our founder\u2019s argument is that it starts far earlier than graduation day, in a classroom, years before anyone noticed.',
      },
    ],
  },
  {
    heading: 'What the System Never Asked Them to Do',
    body: [
      {
        p: 'A student can pass through an entire education being rewarded for a single skill: giving back what they were given. Do that well enough for long enough and you graduate with excellent marks and no practice at the things adult life actually demands.',
      },
      {
        ul: [
          'They memorised, but were rarely asked to question what they memorised.',
          'They were graded on the right answer, seldom on how they reached it.',
          'They were rarely asked to make something that did not exist before.',
          'They almost never had to look at a real problem in their own community and design a response to it.',
          'They were given one path and told to follow it, so choosing was never a skill they built.',
        ],
      },
      {
        p: 'So the confused graduate is not lazy and not unintelligent. They are unpractised. For sixteen years nobody asked them to decide anything, and then everything became a decision.',
      },
    ],
  },
  {
    heading: 'Why a Narrow Education Is the Risky One Now',
    body: [
      {
        p: 'The instinct in an uncertain economy is to specialise early and specialise hard. Our founder argued the opposite, and the reasoning is worth sitting with.',
      },
      {
        p: 'Nobody can tell a six-year-old today which jobs will exist when they are twenty-five. When the destination is genuinely unknown, range beats narrowness. A child who has built a robot, kept a garden alive, played in front of an audience, argued a position, lost a match and fixed their own broken design has something more durable than a subject specialism. They have evidence that they can learn a new thing and survive being bad at it first.',
      },
      {
        p: 'That is why robotics, STEM, agriculture and animal care, music, sport and the arts are not enrichment at Nucleus. They are the point. Each one is another chance for a child to discover a capability nobody, including the child, knew was there.',
      },
    ],
  },
  {
    heading: 'What This Changes on Monday Morning',
    style: 'highlight',
    body: [
      { p: 'The session closed on what the vision actually asks of a teacher in an ordinary lesson:' },
      {
        ul: [
          'Ask for the reasoning, not just the answer. "How did you get there?" is the whole curriculum in five words.',
          'Let the first attempt fail. A child who is rescued too early learns that struggle means stop.',
          'Give problems that have more than one good answer, so choosing becomes a practised skill.',
          'Point the work at something real. A problem from their own street beats a problem from a textbook.',
          'Notice the quiet capability. The child who fixes things without being asked is showing you something a test will not.',
        ],
      },
    ],
  },
  {
    heading: 'The Vision and the Mission, in Plain Words',
    body: [
      {
        p: 'Our mission is to empower a generation of thinkers, creators and problem solvers who navigate a globalized world with humility, compassion and a heart for service.',
      },
      {
        p: 'Read against the founding story, every part of that sentence is load bearing. Thinkers, because the graduate who cannot think for themselves is the problem we started with. Creators, because a country is built by people who make things. Problem solvers, because Ethiopia does not need more people who can describe what is wrong. Humility, compassion and service, because capability pointed at nothing but yourself is not what we are trying to produce.',
      },
      {
        p: 'It is the same idea the school shield has carried from the beginning. Think Deeply. Create Boldly. Solve Truly.',
      },
    ],
  },
  {
    heading: 'One Staff, One Vision',
    body: [
      {
        p: 'The morning ended with everyone outside on the pitch: teachers, coaches, administrators, support staff, leadership. New faces and founding ones in the same frame.',
      },
      {
        p: 'A vision statement is only worth the number of people who can act on it without being reminded. That is what this module was for, and it is why the founders delivered it themselves rather than sending it down through a memo.',
      },
      {
        p: 'The children arrive shortly. This is the team that will decide what they leave with.',
      },
    ],
    images: [
      {
        imageUrl: `${CBT}/cbt02-staff-group.webp`,
        alt: 'The full Nucleus International Schools teaching and support staff photographed together at the Addis Ababa campus after capacity building training',
        caption: 'The full Nucleus team after the vision session, Vatican campus, August 2026.',
      },
    ],
  },
]

type SeedIssue = {
  /** Which SERIES entry this issue belongs to. */
  seriesSlug: string
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
    seriesSlug: 'summer-camp-2026',
    article: {
      title: 'Inside a Week at Summer Camp in Addis Ababa: Robotics, Art, Sport and Music',
      slug: 'inside-a-week-at-summer-camp-addis-ababa',
      excerpt:
        'What does a week at a kids summer camp in Addis Ababa actually look like? Campers built moving Shape Men, met real robots, made musical shakers, and learned taekwondo, running and soccer. Week one at Nucleus, in pictures.',
      heroImageUrl: `${IMG}/week1-hula-hoops.webp`,
      publishedAt: '2026-07-17T15:00:00.000Z',
      playlistPart: 1,
      meta: {
        title: 'Inside a Week at Summer Camp in Addis Ababa',
        description:
          'What a real week at a kids summer camp in Addis Ababa looks like: robotics, Shape Men art, taekwondo, running, soccer and music, in photos.',
      },
    },
    sections: week1Sections,
  },
  {
    seriesSlug: 'summer-camp-2026',
    article: {
      title: 'Kids Learning to Code Robots in Addis Ababa: A Week of Coding, Art and Guitar',
      slug: 'kids-learning-to-code-robots-addis-ababa',
      excerpt:
        'How do children actually learn to program a robot? Campers built the sequence block by block, made bold mosaics, picked up guitar, and went from shy on Monday to leading games by Friday. With video from the robotics lab at Nucleus Summer Camp, Addis Ababa.',
      heroImageUrl: `${IMG}/week2-football-field.webp`,
      publishedAt: '2026-07-24T15:00:00.000Z',
      playlistPart: 2,
      meta: {
        title: 'Kids Learning to Code Robots in Addis Ababa',
        description:
          'Watch children in Addis Ababa program their first robot, block by block, plus mosaic art, guitar, taekwondo and football. Video from the robotics lab.',
      },
    },
    sections: week2Sections,
  },
  {
    seriesSlug: 'summer-camp-2026',
    article: {
      title: 'How Summer Camp Turns Shy Children Into Leaders: A Week in Addis Ababa',
      slug: 'summer-camp-confidence-to-leadership-addis-ababa',
      excerpt:
        'The week confidence turned into leadership. Campers volunteered to lead activities, helped younger friends, debugged their own designs in the innovation lab, and found their voice at the keyboard. Week three at Nucleus Summer Camp, Addis Ababa.',
      heroImageUrl: `${IMG}/week3-taekwondo-warmup.webp`,
      publishedAt: '2026-07-31T15:00:00.000Z',
      playlistPart: 3,
      meta: {
        title: 'How Summer Camp Turns Shy Children Into Leaders',
        description:
          'What actually builds confidence in a child? Campers in Addis Ababa start leading activities, fixing their own designs and finding their voice at camp.',
      },
    },
    sections: week3Sections,
  },
  {
    seriesSlug: 'summer-camp-2026',
    article: {
      // Week 3 owns "confidence to leadership" and the blog owns the confidence head term,
      // so week 4 takes the outcome query instead: what a child comes home with.
      title: 'What Children Take Home From a Summer Camp in Addis Ababa',
      slug: 'what-children-take-home-from-summer-camp-addis-ababa',
      excerpt:
        'Confidence, communication and the nerve to try again. Week four at Nucleus Summer Camp: robotics that fail before they work, sparring in full pads, handprints held high, and a closing celebration in sight.',
      heroImageUrl: `${IMG}/week4-football-confidence-banner.webp`,
      publishedAt: '2026-08-07T15:00:00.000Z',
      playlistPart: 4,
      meta: {
        title: 'What Kids Take Home From Summer Camp',
        description:
          'Confidence, communication, resilience. What children take home from a summer camp in Addis Ababa, and what the final week of the programme looks like.',
      },
    },
    sections: week4Sections,
  },
  {
    seriesSlug: 'summer-camp-2026',
    article: {
      // The final issue is the only page that can own the closing-ceremony query,
      // and it does not compete with the camp blogs, which hold the activity head terms.
      title: 'Inside Our Summer Camp Closing Ceremony in Addis Ababa: Five Weeks, One Stage',
      slug: 'summer-camp-closing-ceremony-addis-ababa',
      excerpt:
        'Five weeks, one stage. Our first summer camp closed on 14 August with singing, speaking, drama, a taekwondo demonstration, an art exhibition in the classrooms and a Certificate of Participation for every camper. The final issue from Nucleus Summer Camp, Addis Ababa.',
      heroImageUrl: `${IMG}/week5-camp-choir-lineup.webp`,
      publishedAt: '2026-08-14T15:00:00.000Z',
      playlistPart: 5,
      meta: {
        title: 'Summer Camp Closing Ceremony in Addis Ababa',
        description:
          'How our first summer camp in Addis Ababa ended: performances, a taekwondo demonstration, an art exhibition and a certificate for every camper.',
      },
    },
    sections: week5Sections,
  },
  {
    seriesSlug: 'teachers-capacity-building',
    article: {
      title: 'Emotional Intelligence in the Classroom: Why the Best Teachers Read the Room First',
      slug: 'emotional-intelligence-in-the-classroom',
      excerpt:
        'The first issue of our professional development newsletter: why teaching is an emotional endeavour as much as an intellectual one, three takeaways from our inaugural training session at the Vatican campus, and the ten-second habit that makes a teacher responsive.',
      heroImageUrl: `${CBT}/cbt01-ei-session.webp`,
      publishedAt: '2026-07-28T15:00:00.000Z',
      playlistPart: 1,
      meta: {
        title: 'Emotional Intelligence in the Classroom',
        description:
          'How teachers use self-awareness and empathy to run a calmer classroom. Practical notes from the Nucleus teacher training on emotional intelligence.',
      },
    },
    sections: cbt01Sections,
  },
  {
    seriesSlug: 'teachers-capacity-building',
    article: {
      title: 'Why Ethiopian Graduates Feel Lost After Graduation, and What Schools Must Teach Instead',
      slug: 'why-ethiopian-graduates-feel-lost-after-graduation',
      excerpt:
        'Our founder built a school because of one moment he kept seeing: a young Ethiopian celebrates their graduation, then wakes up the next morning with no idea what to do with their life. Issue 02 of our teacher training newsletter, on the gap Nucleus exists to close.',
      heroImageUrl: `${CBT}/cbt02-founder-address.webp`,
      publishedAt: '2026-08-03T15:00:00.000Z',
      playlistPart: 2,
      meta: {
        title: 'Why Ethiopian Graduates Feel Lost After Graduation',
        description:
          'Passing exams is not the same as being able to think, create or solve. Our founder on the gap in Ethiopian education, and how Nucleus teachers close it.',
      },
    },
    sections: cbt02Sections,
  },
]

/** Flatten an issue's visual sections into plain richText for the content fallback + search. */
const contentBlocksFor = (sections: SeedSection[], related: SeedSeries['related']): ContentBlock[] => {
  const blocks = sections.flatMap((s): ContentBlock[] => [
    ...(s.heading ? [{ h2: s.heading }] : []),
    ...s.body,
  ])
  blocks.push({ related })
  return blocks
}

const run = async () => {
  const payload = await getPayload({ config })

  // Issues retitled for search intent changed slug, so the rows created under the OLD slugs
  // are still published and would sit in the sitemap as duplicates of the new ones. Delete
  // them here; the route 301s the old paths to the new ones via LEGACY_NEWSLETTER_SLUGS.
  for (const oldSlug of Object.keys(LEGACY_NEWSLETTER_SLUGS)) {
    const { docs } = await payload.delete({ collection: 'posts', where: { slug: { equals: oldSlug } } })
    if (docs.length) console.log('removed legacy slug:', oldSlug)
  }

  // Upsert every series (playlist) by slug. Never delete them: articles point at them.
  const playlistIds = new Map<string, number>()
  const relatedBySeries = new Map<string, SeedSeries['related']>()
  for (const series of SERIES) {
    const { related, ...data } = series
    const existing = await payload.find({
      collection: 'playlists',
      where: { slug: { equals: series.slug } },
      limit: 1,
    })
    const playlist = existing.docs[0]
      ? await payload.update({ collection: 'playlists', id: existing.docs[0].id, data })
      : await payload.create({ collection: 'playlists', data })
    playlistIds.set(series.slug, playlist.id as number)
    relatedBySeries.set(series.slug, related)
    console.log('playlist ready:', playlist.slug, `(#${playlist.id})`)
  }

  for (const { seriesSlug, article, sections } of ISSUES) {
    const playlistId = playlistIds.get(seriesSlug)
    if (!playlistId) throw new Error(`Unknown seriesSlug "${seriesSlug}" on article "${article.slug}"`)
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
        playlist: playlistId,
        playlistPart: article.playlistPart,
        meta: article.meta,
        content: richTextFromBlocks(
          contentBlocksFor(sections, relatedBySeries.get(seriesSlug) ?? []),
        ) as unknown as Post['content'],
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
