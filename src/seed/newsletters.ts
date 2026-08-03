import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * Seeds the newsletter: every series (playlist) and the articles inside them.
 * Re-runnable — upserts each playlist by slug and recreates each article by slug.
 * Run: `npm run seed:newsletters`
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
    ],
  },
  {
    title: 'The Educators’ Core: Teachers’ Capacity Building Training',
    slug: 'teachers-capacity-building',
    description:
      'The continuous professional development newsletter of Nucleus International Schools. Each issue documents one module of our Teachers’ Capacity Building Training programme — the practical tools, global strategies and pedagogical backing behind our classrooms.',
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
        imageUrl: `${IMG}/week3-circle-game-lead.webp`,
        alt: 'A camper standing with his arms outstretched leading a floor game while the rest of the circle watches him',
        caption: 'The quiet ones are running the games now.',
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
        imageUrl: `${IMG}/week3-coding-tiles-explain.webp`,
        alt: 'A camper holding up a strip of coding tiles and explaining it to the friends sitting around her on the activity mat',
        caption: 'Explaining her sequence to the group, tile by tile.',
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
 * The Educators' Core — Issue 01: Emotional Intelligence
 * Source: the CBT programme doc from leadership (Vatican Campus session, July 2026).
 * ---------------------------------------------------------------------------- */
const cbt01Sections: SeedSection[] = [
  {
    heading: 'A Message from Leadership',
    body: [
      {
        p: 'Welcome to the inaugural edition of The Educators\u2019 Core. As we roll out our Teachers\u2019 Capacity Building Training programme across our campuses, the goal is a simple one: to give our teachers the practical tools, global strategies and pedagogical backing they need to lead a modern classroom.',
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
        p: 'Teaching is an emotional endeavour as much as an intellectual one. Before a student can learn from us, they must feel safe, seen and understood by us. Our inaugural session at the Vatican Campus focused on emotional intelligence in the classroom \u2014 what it is, and what it changes on an ordinary Tuesday morning.',
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
          'Self-awareness is a teaching tool. High-performing educators recognise their own emotional triggers \u2014 and when we regulate our own state, we co-regulate our students.',
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
        p: 'It is one habit, and it costs ten seconds \u2014 but it shifts a teacher\u2019s posture from reactive to responsive, and students feel the difference immediately.',
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
    seriesSlug: 'summer-camp-2026',
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
  {
    seriesSlug: 'summer-camp-2026',
    article: {
      title: 'Nucleus Summer Camp 2026, Week 3 Recap: From Confidence to Leadership',
      slug: 'summer-camp-2026-week-3-recap',
      excerpt:
        'Week three of Nucleus Summer Camp 2026 was the week confidence turned into leadership: campers volunteering to lead activities, helping younger friends, debugging their own designs in the innovation lab, and finding their voice at the keyboard.',
      heroImageUrl: `${IMG}/week3-taekwondo-warmup.webp`,
      publishedAt: '2026-07-31T15:00:00.000Z',
      playlistPart: 3,
      meta: {
        title: 'Nucleus Summer Camp 2026 Week 3 Recap: From Confidence to Leadership',
        description:
          'Week 3 at Nucleus Summer Camp 2026 in Addis Ababa: campers leading activities, engineering fixes in the innovation lab, keyboard lessons in the music corner and taekwondo on the mats.',
      },
    },
    sections: week3Sections,
  },
  {
    seriesSlug: 'teachers-capacity-building',
    article: {
      title: 'The Educators\u2019 Core, Issue 01: Emotional Intelligence, the Heart of Effective Teaching',
      slug: 'educators-core-issue-01-emotional-intelligence',
      excerpt:
        'The first issue of our professional development newsletter: why teaching is an emotional endeavour as much as an intellectual one, three takeaways from our inaugural training session at the Vatican campus, and the ten-second habit that makes a teacher responsive.',
      heroImageUrl: `${CBT}/cbt01-ei-session.webp`,
      publishedAt: '2026-07-28T15:00:00.000Z',
      playlistPart: 1,
      meta: {
        title: 'Emotional Intelligence in the Classroom | Nucleus Teachers\u2019 Capacity Building Training',
        description:
          'Issue 01 of The Educators\u2019 Core, the professional development newsletter of Nucleus International Schools: emotional intelligence in the classroom, self-awareness, empathy-driven classroom management and social-emotional learning.',
      },
    },
    sections: cbt01Sections,
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

  // Upsert every series (playlist) by slug — never delete them, articles point at them.
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
