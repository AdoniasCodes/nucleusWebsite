import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * Companion SEO blogs built from the summer-camp newsletter material.
 *
 * WHY THIS FILE EXISTS: the newsletter issues document what happened, which is worth reading
 * but matches almost no search query. These posts take the same events and the same
 * photographs and aim them at the head terms Addis parents actually type, then link back to
 * the issues. Newsletter = the story; blog = the answer someone searched for.
 *
 * Each post deliberately targets a DIFFERENT cluster so they never compete with each other or
 * with the newsletter issues:
 *   1. robotics / coding for kids        (contested locally: Ethio Robo, Abugida, iCog ACC)
 *   2. summer camp activities            (what a full week contains)
 *   3. camp and confidence               (the parent-outcome question)
 *   4. critical thinking in Ethiopia     (companion to CBT issue 02, the founders' vision)
 *
 * Photos are the real camp photographs already optimised for the newsletter, so this seed adds
 * no new files. Body copy lives in `sections` (which render with the images and alt text);
 * `content` carries only the internal-link row, so nothing is duplicated on the page.
 *
 * Run: `PAYLOAD_SKIP_PUSH=1 npx tsx src/seed/camp-story-blogs.ts`
 */
const IMG = '/images/newsletter/summer-camp-2026'
const CBT = '/images/newsletter/teachers-cbt'

type SeedImage = { imageUrl: string; alt: string; caption?: string }
type SeedSection = {
  heading?: string
  style?: 'auto' | 'highlight' | 'gallery'
  body: ContentBlock[]
  images?: SeedImage[]
}

type SeedPost = {
  title: string
  slug: string
  category: 'news' | 'academics' | 'admissions' | 'campus-life' | 'parent-resources'
  excerpt: string
  heroImageUrl: string
  publishedAt: string
  meta: { title: string; description: string }
  sections: SeedSection[]
  related: { label: string; url: string }[]
}

const posts: SeedPost[] = [
  // ────────────────────────────────────────────────────────────────────────────
  {
    title: 'Robotics and Coding for Kids in Addis Ababa: What It Actually Looks Like',
    slug: 'robotics-coding-for-kids-addis-ababa',
    category: 'parent-resources',
    excerpt:
      'Robotics and coding classes for children are spreading across Addis Ababa, and the quality varies enormously. Here is what real robotics teaching looks like at primary age, what to ask before you enrol, and photographs of children doing it.',
    heroImageUrl: `${IMG}/week2-robotics-class.webp`,
    publishedAt: '2026-08-04T09:00:00.000Z',
    meta: {
      title: 'Robotics and Coding for Kids in Addis Ababa',
      description:
        'What robotics and coding for kids in Addis Ababa really involves at primary age, what to ask before enrolling, and photos of children building and programming.',
    },
    sections: [
      {
        body: [
          { p: 'Robotics and coding for children have arrived in Addis Ababa properly. Ethio Robo runs competitions, iCog has taught tens of thousands of young people, Abugida runs holiday courses, and a growing number of schools list robotics on the prospectus. For a parent the hard part is no longer finding a class. It is telling a real one from a room with a robot kit in the corner.' },
          { p: 'We teach robotics year-round and run it every week of summer camp, so this is what it looks like when it is working, and the questions worth asking before you pay for anything.' },
        ],
        images: [
          { imageUrl: `${IMG}/week2-robotics-class.webp`, alt: 'Children gathered around a table of robotics kits during a coding class in Addis Ababa', caption: 'A robotics session at the Nucleus campus in Mekanisa.' },
        ],
      },
      {
        heading: 'Children should build before they program',
        body: [
          { p: 'A seven-year-old who is handed a laptop and a tutorial learns to copy. A seven-year-old who builds a chassis, watches it veer left because one wheel is loose, and fixes it, learns cause and effect. Physical build first, code second, is the sequence that makes programming make sense.' },
          { p: 'Our campers start with VEX kits and construction before anything appears on a screen. The robot has to exist and misbehave before instructions mean anything.' },
        ],
        images: [
          { imageUrl: `${IMG}/week1-vex-robot.webp`, alt: 'A VEX robotics kit assembled by primary school children at summer camp', caption: 'A VEX build, assembled by campers.' },
          { imageUrl: `${IMG}/week3-robot-team-build.webp`, alt: 'Two children working together to build a robot at a table', caption: 'Building in pairs. One holds, one fixes.' },
          { imageUrl: `${IMG}/week1-robot-flag-build.webp`, alt: 'Children building a robot with an Ethiopian flag at a STEM camp in Addis Ababa', caption: 'Week one, the first working build.' },
        ],
      },
      {
        heading: 'At primary age, the code should be blocks, not typing',
        body: [
          { p: 'Block-based programming lets a child express a real algorithm, a sequence, a loop, a condition, without losing the idea inside a typing error. That matters at 6 to 12. Text languages come later, and they come easily to a child who already understands sequence and debugging.' },
          { p: 'The photograph below is the moment that matters: a camper explaining her sequence to another child. If a class never produces that, it is not teaching computational thinking, it is supervising a toy.' },
        ],
        images: [
          { imageUrl: `${IMG}/week2-coding-mats.webp`, alt: 'Children arranging block coding tiles on a mat to program a robot', caption: 'Block coding on the floor mats, one instruction per tile.' },
          { imageUrl: `${IMG}/week3-coding-tiles-explain.webp`, alt: 'A child explaining her block coding sequence to another child at camp', caption: 'Explaining the sequence out loud is where the learning sticks.' },
          { imageUrl: `${IMG}/week2-robot-mat-play.webp`, alt: 'A robot moving across a printed mat as children watch their program run', caption: 'Running the program and watching it fail is the useful part.' },
          { imageUrl: `${IMG}/week3-city-mat-build.webp`, alt: 'Children building a model city for their robot to navigate', caption: 'Building a city for the robot to cross.' },
        ],
      },
      {
        heading: 'What to ask before you enrol your child',
        style: 'highlight',
        body: [
          { p: 'Five questions that separate a real robotics programme from a marketing line:' },
          { ul: [
            'How many children per kit? One kit shared by eight children means six of them watched.',
            'Who teaches it, and what else do they teach? Ask whether the instructor does this for a living or is a holiday hire.',
            'What does a child take home in writing or in code at the end? Ask to see last term’s work.',
            'Is there debugging? If nothing ever breaks in the lesson, nothing is being learned.',
            'What happens after the holiday course ends? A one-off week rarely sticks unless something continues it.',
          ] },
        ],
      },
      {
        heading: 'Where this fits at Nucleus',
        body: [
          { p: 'Robotics and STEM run through the Cambridge programme at our Vatican campus from the early years to Grade 8, and through every week of summer camp at Mekanisa and Vatican. Children aged 4 to 14 build, program, break and fix, with a specialist in the room rather than a rota of helpers.' },
          { p: 'If you want to see it rather than read about it, book a visit and watch a session.' },
        ],
      },
    ],
    related: [
      { label: 'See a week of robotics at camp, in photos', url: '/newsletter/kids-learning-to-code-robots-addis-ababa' },
      { label: 'Why robotics, STEM and agriculture matter early', url: '/news/why-robotics-stem-agriculture-matter-early' },
      { label: 'Robotics & STEM at Nucleus', url: '/robotics-stem' },
      { label: 'Book a campus visit', url: '/contact' },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    title: 'Summer Camp Activities for Kids in Addis Ababa: A Full Week, Hour by Hour',
    slug: 'summer-camp-activities-for-kids-addis-ababa',
    category: 'parent-resources',
    excerpt:
      'Most camp adverts list activities. Very few show them. Here is what a full week of summer camp activities in Addis Ababa actually contains, from robotics and taekwondo to music, football and art, photographed as it happened.',
    heroImageUrl: `${IMG}/week3-football-banner-field.webp`,
    publishedAt: '2026-08-04T10:00:00.000Z',
    meta: {
      title: 'Summer Camp Activities for Kids in Addis Ababa',
      description:
        'What a full week of summer camp activities in Addis Ababa contains: robotics, taekwondo, football, music and art, photographed as it actually happened.',
    },
    sections: [
      {
        body: [
          { p: 'Every camp in Addis lists the same words: sport, art, music, STEM. The list tells you nothing, because the difference between camps is not what appears on the timetable, it is how much of the day a child spends actually doing it.' },
          { p: 'So rather than another list, here is a real week, with the photographs. Use it as a yardstick for any camp you are considering, including ours.' },
        ],
        images: [
          { imageUrl: `${IMG}/week3-football-banner-field.webp`, alt: 'Children playing football on a full-size pitch at a summer camp in Addis Ababa', caption: 'Afternoon football on the campus pitch.' },
        ],
      },
      {
        heading: 'Mornings: something that makes them think',
        body: [
          { p: 'The first block of the day is when concentration is cheapest, so it goes to work that needs it. Robotics, STEM and the innovation lab sit here, along with the classroom sessions where campers plan what they are going to build.' },
        ],
        images: [
          { imageUrl: `${IMG}/week3-classroom-session.webp`, alt: 'Campers in a morning classroom session at summer camp', caption: 'Morning session, planning the day’s build.' },
          { imageUrl: `${IMG}/week3-robot-mat-focus.webp`, alt: 'A child concentrating on programming a robot on a floor mat', caption: 'Concentration is highest before lunch.' },
        ],
      },
      {
        heading: 'Midday: move properly, not a token twenty minutes',
        body: [
          { p: 'Taekwondo, football, basketball and free play. Children in Addis spend a lot of the school year sitting down, and a holiday programme that continues that is a wasted six weeks. Taekwondo does something the ball sports do not: it gives the quieter children a structure in which to be brave.' },
        ],
        images: [
          { imageUrl: `${IMG}/week3-taekwondo-warmup.webp`, alt: 'Children in white uniforms warming up for a taekwondo class at summer camp', caption: 'Taekwondo warm-up, the whole group together.' },
          { imageUrl: `${IMG}/week2-taekwondo-high-kick.webp`, alt: 'A young student practising a high kick in taekwondo', caption: 'Grading practice on the mats.' },
          { imageUrl: `${IMG}/week3-basketball-shot.webp`, alt: 'A child shooting a basketball on an outdoor court in Addis Ababa', caption: 'Basketball on the outdoor court.' },
          { imageUrl: `${IMG}/week3-football-dribble.webp`, alt: 'A child dribbling a football during a camp match', caption: 'Coached football, not just a loose ball.' },
        ],
      },
      {
        heading: 'Afternoons: make something and take it home',
        body: [
          { p: 'Art and music close the day. This is the part parents underrate and children remember. A camper who comes home with a painting, a mosaic or a song they can play has visible proof the day was theirs.' },
        ],
        images: [
          { imageUrl: `${IMG}/week3-watercolour-painting.webp`, alt: 'A child painting with watercolours at a summer camp art table', caption: 'Watercolour, week three.' },
          { imageUrl: `${IMG}/week2-mosaic-art.webp`, alt: 'Children making a colourful mosaic during an arts and crafts session', caption: 'Mosaic work, built up over several days.' },
          { imageUrl: `${IMG}/week3-keyboard-duo.webp`, alt: 'Two children learning keyboard together in the music room', caption: 'Keyboard, in pairs so nobody stalls alone.' },
          { imageUrl: `${IMG}/week2-guitar-lesson.webp`, alt: 'A music teacher giving a guitar lesson to a camper', caption: 'Guitar with a specialist music teacher.' },
        ],
      },
      {
        heading: 'The test to apply to any camp',
        style: 'highlight',
        body: [
          { ul: [
            'Ratio: how many children to one adult, and is that adult a specialist or a minder?',
            'Movement: at least one proper physical block a day, not a token break.',
            'Output: does your child bring something home, built, painted, played or programmed?',
            'Variety: does the week actually rotate, or is it the same two activities on repeat?',
            'Security: who controls the gate, and can you see the drop-off procedure in writing?',
          ] },
        ],
      },
      {
        heading: 'The Nucleus week',
        body: [
          { p: 'Nucleus Summer Camp runs across the Mekanisa and Vatican campuses for ages 4 to 14, with robotics, STEM, chess, art, music, taekwondo, football, basketball and kite building. Every activity is led by a qualified specialist, and both campuses are secure with controlled access.' },
        ],
      },
    ],
    related: [
      { label: 'See week one at camp, in photos', url: '/newsletter/inside-a-week-at-summer-camp-addis-ababa' },
      { label: 'Explore Nucleus Summer Camp', url: '/summer-camp' },
      { label: 'Why your child should go to summer camp', url: '/news/why-your-child-should-attend-summer-camp' },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    title: 'How Summer Camp Builds Confidence in Children: What Six Weeks Changed',
    slug: 'how-summer-camp-builds-confidence-in-children',
    category: 'parent-resources',
    excerpt:
      'Parents are told camp builds confidence. Almost nobody shows the mechanism. Here is what actually changed in our campers over six weeks, why it works, and how to tell whether a camp will do it for your child.',
    heroImageUrl: `${IMG}/week3-circle-game-lead.webp`,
    publishedAt: '2026-08-04T11:00:00.000Z',
    meta: {
      title: 'How Summer Camp Builds Confidence in Children',
      description:
        'What actually builds confidence in a child at summer camp, the mechanism behind it, and how to tell whether a camp in Addis Ababa will deliver it.',
    },
    sections: [
      {
        body: [
          { p: 'Ask any camp what it gives your child and you will hear confidence. It is true, and it is almost never explained, which makes it sound like marketing. It is not. Confidence has a mechanism, and you can watch it happen.' },
          { p: 'We photographed six weeks of it. Here is what changed, and why.' },
        ],
        images: [
          { imageUrl: `${IMG}/week3-circle-game-lead.webp`, alt: 'A boy leading a circle game with other children at summer camp in Addis Ababa', caption: 'Week three: a camper leading the circle game he joined silently in week one.' },
        ],
      },
      {
        heading: 'Confidence comes from doing, not from praise',
        body: [
          { p: 'Children do not become confident because adults tell them they are good. They become confident when they attempt something with a real chance of failing, fail, try again and succeed. Psychologists call it a mastery experience. Camp is unusually good at producing them because the stakes are genuine but nothing is graded.' },
          { p: 'A missed kick, a robot that drives into a wall, a chord that will not ring: each is a small, survivable failure with a visible fix. School rarely offers that many in a day.' },
        ],
        images: [
          { imageUrl: `${IMG}/week2-taekwondo-pad-punch.webp`, alt: 'A child punching a training pad held by a taekwondo instructor', caption: 'Something to hit, and an instructor watching the technique.' },
        ],
      },
      {
        heading: 'The quiet ones need a structure, not encouragement',
        body: [
          { p: 'The children who arrive shy do not respond to being told to join in. They respond to activities with a defined role, where taking part does not require improvising socially. Taekwondo lines, music parts and robotics pairs all do this. The child has a place to stand and a job to do, and participation happens as a side effect.' },
          { p: 'By week three the same children were volunteering. That is the sequence: structure, then participation, then volunteering. Skipping to the last step does not work.' },
        ],
        images: [
          { imageUrl: `${IMG}/week3-circle-listening.webp`, alt: 'Children sitting in a circle listening to an instructor at camp', caption: 'A defined role: sit here, your turn is coming.' },
          { imageUrl: `${IMG}/week2-hands-up-circle.webp`, alt: 'Campers with their hands raised volunteering during a group activity', caption: 'Week two: hands going up without prompting.' },
        ],
      },
      {
        heading: 'Performing in front of others is the accelerator',
        body: [
          { p: 'The biggest single jump came from music. A child who plays a keyboard line in front of the group, or sings in the choir, has done the thing most adults still avoid. It transfers. Campers who performed were noticeably more willing to speak up in unrelated activities the following week.' },
        ],
        images: [
          { imageUrl: `${IMG}/week3-keyboard-girl.webp`, alt: 'A girl playing keyboard in front of her class at summer camp', caption: 'Playing a line in front of everyone.' },
          { imageUrl: `${IMG}/week3-singing-practice.webp`, alt: 'Children practising singing together in a music session', caption: 'Choir practice, safety in numbers first.' },
          { imageUrl: `${IMG}/week3-music-circle.webp`, alt: 'Children sitting in a circle during a music session with their teacher', caption: 'The music circle, where solos start.' },
        ],
      },
      {
        heading: 'Leading younger children is the proof',
        body: [
          { p: 'The clearest sign a child has gained confidence is not that they speak more. It is that they help someone smaller. In the last fortnight campers began explaining their builds to younger children, holding kit steady for a partner and running warm-ups. Helping requires believing you know something, which is confidence in its most useful form.' },
        ],
        images: [
          { imageUrl: `${IMG}/week3-paint-hands-teacher.webp`, alt: 'A teacher helping a child with a handprint painting project', caption: 'Modelled by staff first, then copied by the older campers.' },
        ],
      },
      {
        heading: 'How to tell whether a camp will do this',
        style: 'highlight',
        body: [
          { ul: [
            'Are there activities where a child can visibly fail and retry in the same session?',
            'Is there a moment each week when a child performs or presents to the group?',
            'Do older campers get given responsibility for younger ones?',
            'Are the adults specialists who can teach the fix, or supervisors who can only encourage?',
            'Does the camp run long enough for the sequence to happen? Confidence took three weeks, not three days.',
          ] },
        ],
      },
      {
        heading: 'See it for yourself',
        body: [
          { p: 'Nucleus Summer Camp runs across two secure Addis Ababa campuses for ages 4 to 14. The weekly issues below document the whole thing, photograph by photograph, including the children who arrived silent.' },
        ],
      },
    ],
    related: [
      { label: 'Week three: from confidence to leadership, in photos', url: '/newsletter/summer-camp-confidence-to-leadership-addis-ababa' },
      { label: 'Summer camp activities in Addis Ababa, a full week', url: '/news/summer-camp-activities-for-kids-addis-ababa' },
      { label: 'Explore Nucleus Summer Camp', url: '/summer-camp' },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    title: 'How to Teach Critical Thinking and Problem Solving to Children in Ethiopia',
    slug: 'teaching-critical-thinking-problem-solving-ethiopia',
    category: 'parent-resources',
    excerpt:
      'Ethiopian classrooms reward memorisation, and it shows on the morning after graduation. Here is what critical thinking actually looks like at primary age, how to tell whether a school teaches it, and what parents can do at home.',
    heroImageUrl: `${CBT}/cbt02-founder-address.webp`,
    publishedAt: '2026-08-05T09:00:00.000Z',
    meta: {
      title: 'Teaching Critical Thinking to Children in Ethiopia',
      description:
        'What critical thinking and problem solving look like at primary age, how to tell whether a school in Addis Ababa really teaches them, and how to support it at home.',
    },
    sections: [
      {
        body: [
          { p: 'Ask most Ethiopian parents what they want from school and the answer is some version of a good future. Ask what the school actually measures and the answer is almost always marks. Those two things are not the same, and the gap between them shows up years later on one specific morning.' },
          { p: 'A young person graduates. The family celebrates, and they should. The next day they wake up with no idea what to do with their life. It is one of the most common experiences in Ethiopian households, and it is usually blamed on the job market. A large part of it starts much earlier, in a classroom that only ever asked for the right answer.' },
        ],
        images: [
          { imageUrl: `${CBT}/cbt02-founder-address.webp`, alt: 'A session on critical thinking in education for teachers at an international Cambridge curriculum school in Addis Ababa', caption: 'Teacher training at the Nucleus Vatican campus, Addis Ababa.' },
        ],
      },
      {
        heading: 'What critical thinking actually means at primary age',
        body: [
          { p: 'It is not debating club and it is not philosophy. At six to thirteen it is much more ordinary than that, and much easier to spot:' },
          { ul: [
            'The child can explain how they got an answer, not only what the answer was.',
            'They notice when something does not make sense and say so.',
            'They can hold two options and give a reason for choosing one.',
            'When their first attempt fails they change something and try again, instead of waiting to be rescued.',
            'They can look at a real situation, in the classroom or on their street, and suggest what might fix it.',
          ] },
          { p: 'Every one of those is a habit, which means it is trainable. It also means it is losable: a child asked only to reproduce material for long enough will stop doing any of it.' },
        ],
      },
      {
        heading: 'Why memorisation still dominates, and what it costs',
        body: [
          { p: 'Memorisation is not stupid. It is efficient, it is easy to mark fairly, and it produces results that look excellent on a report card. In a system with large classes and high-stakes exams, it is the rational thing for a school to optimise.' },
          { p: 'The cost is invisible until it is not. A student can score highly for twelve years without ever being asked to make a decision, design something, or defend a position. They arrive at adulthood with a strong record and no practice at choosing. That is the confused graduate, and it is a training gap rather than a character flaw.' },
        ],
      },
      {
        heading: 'How to tell whether a school really teaches it',
        style: 'highlight',
        body: [
          { p: 'Any school will say it teaches critical thinking. These questions separate the ones that do:' },
          { ul: [
            'Ask to see work where children got it wrong first. A school that only displays perfect work is not letting anyone struggle.',
            'Ask what happens when a child gives a wrong answer in class. If the answer is "the teacher corrects it", nothing is being built.',
            'Ask for an example of an assignment with more than one acceptable answer.',
            'Ask what children make, not what they learn. Making forces decisions; learning alone does not.',
            'Sit in on a lesson if they will let you, and count how many questions the children ask versus the teacher.',
          ] },
        ],
      },
      {
        heading: 'Breadth is the strategy, not the decoration',
        body: [
          { p: 'Parents often read robotics, music, sport and agriculture as extras that justify a fee. Used properly they are the opposite. Each one is a domain where a child meets a real problem with a real consequence: the robot drives into a wall, the plant dies, the chord will not ring, the team loses.' },
          { p: 'Nobody can say which jobs will exist when a six-year-old turns twenty-five. When the destination is genuinely unknown, range is the safer bet than early specialisation. A child who has been bad at several things and got better at them has learned the one transferable skill: how to start from not knowing.' },
        ],
        images: [
          { imageUrl: `${IMG}/week3-coding-tiles-explain.webp`, alt: 'A child explaining her programming sequence to another child, showing reasoning out loud', caption: 'Explaining the reasoning out loud is where the thinking becomes visible.' },
          { imageUrl: `${IMG}/week3-robot-team-build.webp`, alt: 'Two children solving a build problem together at a robotics table', caption: 'A problem with a real consequence: it works or it does not.' },
          { imageUrl: `${IMG}/week3-handprint-paintings.webp`, alt: 'Children making handprint artwork, an activity with more than one right answer', caption: 'Open-ended work forces choices.' },
        ],
      },
      {
        heading: 'What parents can do at home, for free',
        body: [
          { p: 'None of this needs equipment. It needs a change in the questions you ask:' },
          { ul: [
            'Replace "what did you get?" with "how did you work it out?" at the end of the school day.',
            'When they ask you a question you could answer instantly, ask what they think first.',
            'Let small things fail. A collapsed project they rebuild teaches more than one you quietly fix at midnight.',
            'Give real household problems to solve: how to fit everything in the car, how to make the budget stretch, how to organise the shelves.',
            'Ask "what would you do about it?" whenever they complain about something in the neighbourhood.',
          ] },
          { p: 'It feels slower. It is slower. It is also the difference between a child who can answer and a child who can decide.' },
        ],
      },
      {
        heading: 'How this works at Nucleus',
        body: [
          { p: 'Nucleus follows the Cambridge pathway from age 2 through Grade 8 at Vatican, near Mekanisa in Addis Ababa, and the reason we chose it is that it rewards understanding over recall. Around it sit robotics and STEM, agriculture and animal care, music, sport and the arts, each one another chance for a child to meet a problem that is genuinely theirs to solve.' },
          { p: 'Our teachers are trained on this directly rather than by memo. The founders themselves run the session on why the school exists. If you want to see what it looks like in an ordinary lesson, come and visit on a normal school day.' },
        ],
      },
    ],
    related: [
      { label: 'The founders on the gap this school was built to close', url: '/newsletter/why-ethiopian-graduates-feel-lost-after-graduation' },
      { label: 'Why robotics, STEM and agriculture matter early', url: '/news/why-robotics-stem-agriculture-matter-early' },
      { label: 'The best international school in Addis Ababa: a 2026 guide', url: '/news/best-international-schools-addis-ababa' },
      { label: 'Book a campus visit', url: '/contact' },
    ],
  },
]


const run = async () => {
  const payload = await getPayload({ config })

  for (const post of posts) {
    await payload.delete({ collection: 'posts', where: { slug: { equals: post.slug } } }).catch(() => {})
    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        category: post.category,
        excerpt: post.excerpt,
        heroImageUrl: post.heroImageUrl,
        publishedAt: post.publishedAt,
        meta: post.meta,
        // Only the internal-link row: the readable body lives in `sections` so the photos
        // sit inside the article. Putting the copy in both would duplicate it on the page.
        content: richTextFromBlocks([{ related: post.related }]) as unknown as Post['content'],
        sections: post.sections.map((s) => ({
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
    console.log('seeded blog:', post.slug)
  }

  process.exit(0)
}

run()
