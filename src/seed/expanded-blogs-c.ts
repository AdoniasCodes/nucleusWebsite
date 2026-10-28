import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * Expanded rewrites of three thin posts (Oct 2026). Slugs, categories, hero images and
 * publishedAt dates are unchanged from `blogs.ts`, so the URLs that already rank do not move.
 * Each post owns ONE head term and links to, rather than re-targets, its siblings.
 *
 *  - best-age-to-start-school                    head term: "best age to start school"
 *  - why-robotics-stem-agriculture-matter-early  head term: "benefits of robotics and agriculture
 *                                                for children" (stem-education-for-kids and
 *                                                hands-on-learning own the broader terms)
 *  - best-cambridge-schools-addis-ababa          head term: "best Cambridge schools in Addis
 *                                                Ababa" (the one place that phrase is allowed,
 *                                                because it is the query)
 *
 * Facts about other schools come only from those schools' own websites (read Oct 2026). A school
 * whose own pages could not be read is not described. Nucleus facts come from the 2025/26
 * prospectus only. Fees are never quoted (shared by phone). Camp photos are captioned as campus
 * photos, never as term-time lessons.
 *
 * The FAQ in each post also lives in `expanded-faqs-c.ts` (FAQS_C), word for word. Merge FAQS_C
 * into POST_FAQS in `lib/postFaqs.ts` when this ships.
 *
 * Inline links use `[label](url)` inside `p` and `ul` strings (see `lib/lexical.ts`).
 *
 * Run: cross-env NODE_OPTIONS=--no-deprecation PAYLOAD_SKIP_PUSH=1 tsx src/seed/expanded-blogs-c.ts
 * (re-runnable: deletes by slug, then creates).
 */
const CAMP = '/images/newsletter/summer-camp-2026'
const STOCK = '/images/stock'

type SeedImage = { imageUrl: string; alt: string; caption?: string; portrait?: boolean }
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
  // ---------------------------------------------------------------------------------------
  // Head term: "best age to start school"
  {
    title: 'What Is the Best Age to Start School? A Guide for Addis Ababa Parents',
    slug: 'best-age-to-start-school',
    category: 'parent-resources',
    excerpt:
      'The best age to start school is the age your child is ready, and the ages the systems use differ. Here is what Cambridge, Ethiopia and the research say, and the signs of readiness to watch.',
    heroImageUrl: `${STOCK}/admissions-hero.webp`,
    publishedAt: '2026-06-05T09:00:00.000Z',
    meta: {
      title: 'Best Age to Start School: A Parent Guide',
      description:
        'Best age to start school: when early years and Year 1 begin, what the research says and how to read your child’s readiness, for parents in Addis Ababa.',
    },
    sections: [
      {
        body: [
          {
            p: 'The best age to start school is the age your child is ready for it, and for most families in Addis Ababa that happens in two steps. A structured, play-based early years programme suits most children from about 3, and some settle well from 2. Formal primary school, Year 1 in the Cambridge system, usually begins at 5. Ethiopia’s government pre-primary year, the O-class, is for six-year-olds. No study names one perfect birthday, so the decision rests on your child, the programme and how well the school hands them on from one stage to the next.',
          },
          {
            p: 'This guide sets out the ages the main systems use, what the research does and does not say, the signs of readiness worth watching, and the questions that matter more than the number itself.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-circle-listening.webp`,
            alt: 'Young children sitting in a circle on the floor listening to their teacher at the Nucleus campus in Addis Ababa',
            caption: 'Circle time on the Nucleus campus in Addis Ababa.',
          },
        ],
      },
      {
        heading: 'The ages the Cambridge system and Ethiopia use',
        body: [
          {
            p: 'Cambridge describes its Early Years programme as being for 3 to 6 year olds, a "child-centred, play-based programme that helps young learners to develop at their own pace" ([Cambridge International](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-early-years/)). Cambridge Primary follows. It is typically for 5 to 11 year olds ([Cambridge Primary](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/)). In a school that uses the international Cambridge curriculum, a child therefore spends roughly ages 3 to 5 in early years and begins Year 1 at 5.',
          },
          {
            p: 'Ethiopia’s government system draws its lines differently. The O-class is the pre-primary year for six-year-olds, and the research group Young Lives reports that it reached just under 1.5 million six-year-olds in 2021/22, about 54 percent of children that age ([Young Lives](https://www.younglives.org.uk/node/1864)). So the same child can be in a pre-primary class under one system and in Year 1 under another.',
          },
          {
            p: 'Schools also count age from a cut-off date. One Planet International School, for example, states that a child entering Year 1 must be 5 by September 1 of the school year ([One Planet](https://oneplanetschool.com/curriculum/primary-school-years-1-6/)). A child born in October is almost a year younger than a classmate born in August, so ask every school which date it uses. This matters most for families who move between schools or countries.',
          },
        ],
      },
      {
        heading: 'What the research says about starting early',
        body: [
          { h3: 'The first three years matter most, and school is only part of them' },
          {
            p: 'The World Health Organization’s Nurturing Care framework states that the period from pregnancy to age 3 is the most critical for brain development. It adds that healthy development in those years depends on a safe, loving environment, good nutrition and stimulation from the people who care for the child ([WHO](https://www.who.int/publications/i/item/9789241514064)). Most of what a two-year-old needs comes from home. A good programme adds to that. It does not replace it, and starting at 2 is not a rescue for a child who is missing something.',
          },
          { h3: 'Play-based learning is promising, not proven' },
          {
            p: 'The Education Endowment Foundation, a UK research charity, rates play-based learning as having a moderate positive impact on learning, worth a few months of additional progress, but it also rates the evidence behind that finding as very limited ([EEF](https://educationendowmentfoundation.org.uk/early-years/toolkit/play-based-learning)). A fair reading is that play-based early years are a sensible choice for young children, and that no one should promise you a measurable score gain from them.',
          },
          { h3: 'A later start is not a failure' },
          {
            p: 'In Finland, formal primary education starts in the year a child turns seven, with a mandatory pre-primary year at six ([Education Finland](https://www.educationfinland.fi/taxonomy/term/2)). Countries set the line in different places, and children do well under several of them. What differs is what the years before the line contain. A calm, language-rich year at 4 can do more than a rushed academic one.',
          },
        ],
      },
      {
        heading: 'Signs your child is ready',
        body: [
          {
            p: 'Readiness is a set of small abilities, not a single skill. These are the ones teachers tend to look for:',
          },
          {
            ul: [
              'They can stay with a teacher for a morning. Some tears at drop-off are normal if they recover within a few minutes.',
              'They notice other children and play beside them or with them.',
              'They can follow a short two-step instruction, such as "put your bag away and sit down".',
              'They can tell an adult what they need, in words or gestures, and they can ask for help.',
              'They enjoy stories, songs, drawing or building for a stretch of time.',
            ],
          },
          {
            p: 'None of these is a test. A child who cannot do one of them at 3 is ordinary. Many schools also ask about toilet training for the youngest group, and policies differ, so ask what the school expects before you assume.',
          },
        ],
      },
      {
        heading: 'What changes at 2, 3, 4 and 5',
        body: [
          { h3: 'Age 2 to 3: routine and warm adults' },
          {
            p: 'At this age the programme should feel like a well-run, loving home with more children in it. Look for short sessions, predictable routines, songs and stories, and adults who get down to the child’s level. The number of children per adult matters more than any curriculum label. Nucleus’s 2025/26 prospectus lists a student-to-teacher ratio of 9:1.',
          },
          { h3: 'Age 3 to 5: early years proper' },
          {
            p: 'This is the range Cambridge Early Years is written for. Children learn language, early number and social skills through play, stories and practical tasks. Our guide to the [Cambridge Early Years curriculum](/news/cambridge-early-years-curriculum) explains what that looks like week to week.',
          },
          { h3: 'Age 5: Year 1' },
          {
            p: 'Year 1 brings more structure, longer concentration and the first steady work in reading and number. It is a smoother step when the early years class and the Year 1 class sit in the same school and the teachers have talked to each other. That handover is worth asking about directly.',
          },
        ],
      },
      {
        heading: 'If your family is moving countries',
        body: [
          {
            p: 'Diplomatic and NGO families often face a different version of the question: not "when is my child ready" but "which stage will they be in when we move?" Cambridge describes the same stages in the same way across the 160 countries where its schools operate ([Cambridge International](https://www.cambridgeinternational.org/why-choose-us/)), so a child who finishes a stage in one Cambridge-curriculum school can usually continue at the next stage in another. If a posting ends in two years, a start date that lets your child complete a stage before the move is worth more than an early start. Our [expat school guide for Addis Ababa](/news/moving-to-addis-ababa-expat-school-guide) covers the timing in more detail. If you already know your arrival date, you can [register your child](/register) and we will tell you which stage fits.',
          },
        ],
      },
      {
        heading: 'What a good early years programme looks like',
        body: [
          {
            p: 'There is a real difference between a place that minds children and one that teaches them through play. The second builds early literacy, number and emotional skills on purpose. Use these checks on any school you visit, and see our guide to [choosing a kindergarten in Addis Ababa](/news/best-kindergarten-addis-ababa) for a fuller list:',
          },
          {
            ul: [
              'A secure campus with clear rules about who collects each child.',
              'Qualified, warm staff who stay for more than a year.',
              'Play with a plan behind it: you can ask what a given activity is meant to teach and get a specific answer.',
              'A written path into Year 1, not a separate application to a different school.',
            ],
          },
        ],
      },
      {
        heading: 'How Nucleus handles the early years',
        body: [
          {
            p: 'Nucleus International Schools teaches the international Cambridge curriculum from Preschool to Grade 8. The preschool opened at our Abo Mekanisa campus in 2022, and Grade 1 to Grade 8 is taught at our Vatican campus in Sarbet. The prospectus describes the preschool stage as a foundation stage focused on language, numeracy, social skills and play-based learning, and we welcome children from age 2. Because the early years and the primary years sit on one pathway, the move into Year 1 is a planned step inside the same school community.',
          },
          {
            p: 'Fees are shared by phone: call +2519 81 99 99 22 and we will walk you through them. When you are ready, you can [register your child](/register) or book a visit and watch a normal school day.',
          },
        ],
      },
      {
        heading: 'Questions parents ask',
        body: [
          { h3: 'What is the best age to start school?' },
          {
            p: 'There is no single best age. Most children do well in a play-based early years programme from about 3, and some are ready at 2. Formal primary school in the Cambridge system, Year 1, usually begins at 5. Readiness matters more than the birthday, so look at how your child separates, plays and follows simple instructions.',
          },
          { h3: 'Is 3 too early to start school?' },
          {
            p: 'No. Cambridge designs its Early Years programme for ages 3 to 6, and a play-based programme at 3 is normal. What matters is that the day is short enough, the adults are warm, and the programme is built around play rather than worksheets.',
          },
          { h3: 'What age is a child ready for school?' },
          {
            p: 'A child is ready when they can stay with a teacher for a morning, notice and play with other children, follow a short two-step instruction and ask an adult for help. Missing one of these at age 3 is common and not a reason to wait.',
          },
          { h3: 'Is it better to start school later?' },
          {
            p: 'Not necessarily. Finland starts formal primary education in the year a child turns seven, so a later start can work well. The quality of the years before that line matters more than where the line is drawn.',
          },
          { h3: 'What age do children start school in Ethiopia?' },
          {
            p: 'The government O-class is the pre-primary year for six-year-olds, and international schools using the Cambridge curriculum start early years at about 3 and Year 1 at about 5. Each school sets its own cut-off date, so ask which date it counts age from.',
          },
        ],
      },
    ],
    related: [
      { label: 'How to choose a kindergarten in Addis Ababa', url: '/news/best-kindergarten-addis-ababa' },
      { label: 'The Cambridge Early Years curriculum, explained', url: '/news/cambridge-early-years-curriculum' },
      { label: 'Moving to Addis Ababa: a school guide for expat families', url: '/news/moving-to-addis-ababa-expat-school-guide' },
      { label: 'Register your child', url: '/register' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "benefits of robotics and agriculture education for children"
  {
    title: 'Why Robotics, STEM and Agriculture Matter in a Child’s Early Years',
    slug: 'why-robotics-stem-agriculture-matter-early',
    category: 'campus-life',
    excerpt:
      'What children gain from robotics, STEM labs and growing things, what the evidence does and does not show, and how these subjects fit a Cambridge classroom in Addis Ababa.',
    heroImageUrl: `${STOCK}/blog-beyond.webp`,
    publishedAt: '2026-06-05T09:00:00.000Z',
    meta: {
      title: 'Benefits of Robotics and Agriculture for Children',
      description:
        'Benefits of robotics, STEM and agriculture for children: what each teaches, what the evidence shows and how it fits a Cambridge classroom in Addis Ababa.',
    },
    sections: [
      {
        body: [
          {
            p: 'The main benefit of robotics, STEM and agriculture for young children is that they give them a place to practise the thinking a good curriculum already asks for: plan something, try it, watch what happens, explain it and change it. A robot that turns the wrong way and a seedling that does not sprout both teach a child that a first attempt is data, not a verdict. In Ethiopia there is a second reason. Agriculture still employs most working people, so a child who understands soil, water and food systems is learning about the economy they will grow up in.',
          },
          {
            p: 'This guide covers what each subject teaches, what Cambridge expects, what the research supports and where it is thin, and what to ask a school that says it offers them.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/gallery-stem.webp`,
            alt: 'Children working on a hands-on science and technology activity at Nucleus in Addis Ababa',
            caption: 'Hands-on STEM work on the Nucleus campus.',
          },
        ],
      },
      {
        heading: 'What each subject actually teaches',
        body: [
          { h3: 'Robotics and coding' },
          {
            p: 'A floor robot that follows a sequence of arrow tiles asks a child to break a journey into steps, predict the result, run it and fix the step that failed. That is sequencing, logic and debugging before a child can type. Children also learn to work in pairs, because one person rarely holds the whole plan in their head.',
          },
          { h3: 'STEM labs' },
          {
            p: 'A lab turns a science idea into something a child can hold: a circuit that lights a bulb, a bridge that fails at a certain weight, a measurement that comes out differently from the guess. For young children the point is less the formula and more the habit of checking an idea against the world.',
          },
          { h3: 'Agriculture and animal care' },
          {
            p: 'Growing plants teaches patience and cause and effect on a timescale a screen cannot match. Children measure growth, notice that the plant in the shade grows differently, and learn that care has to be regular. Looking after living things adds responsibility, because the plant does not wait until the child feels like watering it.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-robot-team-build.webp`,
            alt: 'A group of children building and testing a robot together on the floor at Nucleus',
            caption: 'A robot build during summer camp on the Nucleus campus.',
          },
        ],
      },
      {
        heading: 'What the Cambridge curriculum already asks for',
        body: [
          {
            p: 'These subjects are not a decoration on the curriculum. Cambridge Primary science includes a strand called Thinking and Working Scientifically, which develops understanding of scientific models and enquiry and practical work ([Cambridge Primary science](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/science/)). Cambridge Primary mathematics has a matching strand, which it calls a unique feature of the curriculum, in which learners talk with others, challenge ideas and give evidence for what they claim ([Cambridge Primary mathematics](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/mathematics/)).',
          },
          {
            p: 'A robotics build, a lab or a vegetable bed is a natural place to practise those strands. A child who has tested three designs and can say why the second one failed is doing what the curriculum describes. Our [STEM education guide for parents](/news/stem-education-for-kids) and our piece on [hands-on learning](/news/hands-on-learning) go deeper on the method.',
          },
        ],
      },
      {
        heading: 'Why this matters in Ethiopia',
        body: [
          {
            p: 'Ethiopia’s own education planning points the same way. A 2024 study of STEM centres in Ethiopia notes that the national Education Roadmap "underscores the need for STEM curriculum and ICT-supported instruction at primary education" ([European Journal of STEM Education](https://lectitopublishing.nl/Article/Detail/stem-education-in-the-stem-centers-in-ethiopia-implementation-practices-challenges-and-prospects-15131)). The same study found variation between STEM centres in how the programme was delivered, partly because there was no national scheme. In plain terms, the need is recognised, and delivery is uneven. A school that timetables it does something many do not.',
          },
          {
            p: 'Agriculture is the other half. A World Bank report on employment in urban and rural Ethiopia found that almost three quarters of Ethiopians were employed in agriculture in 2019, and about 90 percent of rural workers ([World Bank](https://documents1.worldbank.org/curated/en/717091632198808079/pdf/Employment-in-Urban-and-Rural-Ethiopia.pdf)). The same report found that the share of workers in agriculture falls as education rises. For a child in Addis Ababa, understanding how food is grown, stored and sold is useful whether they later farm, trade, engineer or study abroad.',
          },
        ],
      },
      {
        heading: 'Why the three belong together',
        body: [
          {
            p: 'Each subject covers a gap in the others. Robotics gives fast feedback: a program fails in seconds and the child fixes it in minutes. Agriculture is slow: a bed planted today shows its first answer a week later, and the full answer weeks after that. A child who has practised both learns to work at two speeds, to try quickly when feedback is quick and to wait when it is not. STEM labs sit between them, with experiments that run for a lesson or a week.',
          },
          {
            p: 'Parents sometimes worry that all this crowds out the basics. It should not. Cambridge Primary has up to 13 subjects, with English, mathematics and science at the core ([Cambridge Primary parent guide](https://www.cambridgeinternational.org/Images/268764-cambridge-primary-a-guide-for-parents.pdf)). The practical subjects are a way of using the core, not a rival to it. If a school cannot say how its lab time connects to its maths and science, treat that as a warning sign.',
          },
        ],
      },
      {
        heading: 'What the evidence does and does not show',
        body: [
          {
            p: 'It is worth being honest here, because a lot of school marketing is not. We are not aware of strong research showing that a robotics club raises exam scores in young children, and we will not claim it does. The Education Endowment Foundation’s review of play-based learning, the nearest well-known evidence for practical early learning, finds a moderate positive effect but rates the evidence behind it as very limited ([EEF](https://educationendowmentfoundation.org.uk/early-years/toolkit/play-based-learning)).',
          },
          {
            p: 'The case for these subjects therefore rests on three things we can stand behind. They give children a real task for the thinking Cambridge assesses. They let children who struggle with pen-and-paper work show what they understand. And they make learning feel like something children do rather than something done to them. If a school promises a specific grade gain from robotics, ask for the study.',
          },
        ],
      },
      {
        heading: 'How it looks at Nucleus',
        body: [
          {
            p: 'The 2025/26 prospectus lists STEM Labs where science, technology, engineering and mathematics are explored through practical experiments and projects, an Artificial Intelligence Lab that introduces AI concepts and tools in an age-appropriate way, and Agricultural Labs where students grow plants, study soil and learn about food systems and sustainability. Our own pages describe the work in more detail: see [Robotics and STEM](/robotics-stem) and [Agriculture and Animal Care](/agriculture-animal-care).',
          },
          {
            p: 'We teach these alongside the international Cambridge curriculum, not instead of it. English, mathematics and science stay at the core, and the labs are where children apply them. The photos in this guide were taken on our campus during summer camp, which runs as a separate programme from term-time lessons. To see the term-time labs themselves, [register your child](/register) and ask for a visit.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week4-robot-floor-drive.webp`,
            alt: 'A young girl driving a small robot car across the classroom floor at Nucleus',
            caption: 'A summer camp robotics session on the Nucleus campus.',
          },
        ],
      },
      {
        heading: 'What to ask a school that offers these subjects',
        body: [
          {
            ul: [
              'Is it on the weekly timetable for every child, or only a club for a few?',
              'Who teaches it, and what are they qualified in?',
              'Can I see what a child made last term, and hear them explain it?',
              'How does the work connect to what children learn in maths and science?',
              'What happens to a child who finds it difficult?',
            ],
          },
          {
            p: 'A school that answers these easily is probably doing the work. If you want to see it in motion, [register your child](/register) or ask to visit, or call +2519 81 99 99 22 to ask about fees and places. If you are choosing between schools, our guide to [robotics and coding for kids in Addis Ababa](/news/robotics-coding-for-kids-addis-ababa) lists what to look for in a programme.',
          },
        ],
      },
      {
        heading: 'Questions parents ask',
        body: [
          { h3: 'Why is STEM education important for young children?' },
          {
            p: 'STEM gives young children a practical way to ask questions, test ideas and explain results, which is the thinking the Cambridge science and mathematics curriculum assesses. It also builds confidence with problems that have no obvious answer. Our guide to STEM education for kids covers the subject in depth.',
          },
          { h3: 'At what age can children start learning robotics?' },
          {
            p: 'Children can start in the early primary years with floor robots and coding tiles, which teach sequencing before a child can type. Younger children can start with building and pattern games. Check that the activity matches your child’s age and that an adult guides it.',
          },
          { h3: 'What are the benefits of teaching agriculture in schools?' },
          {
            p: 'Growing plants teaches patience, responsibility and cause and effect, and it links science to food systems. In Ethiopia it also connects learning to the largest area of employment: a World Bank report found almost three quarters of Ethiopians worked in agriculture in 2019.',
          },
          { h3: 'Does robotics improve grades?' },
          {
            p: 'We are not aware of strong evidence that it does, and we do not claim it. Robotics gives children a real task for the planning, testing and explaining that Cambridge science and mathematics reward, so it supports those skills without guaranteeing a grade.',
          },
          { h3: 'Is hands-on learning only for older children?' },
          {
            p: 'No. Young children learn through doing, which is why Cambridge describes its Early Years programme as play-based. The tasks should be simple and guided, and they should lead into the reading, number and science work of the school day.',
          },
        ],
      },
    ],
    related: [
      { label: 'STEM education for kids: a parent’s guide', url: '/news/stem-education-for-kids' },
      { label: 'Hands-on learning: what it is and why it works', url: '/news/hands-on-learning' },
      { label: 'Robotics and coding for kids in Addis Ababa', url: '/news/robotics-coding-for-kids-addis-ababa' },
      { label: 'Robotics and STEM at Nucleus', url: '/robotics-stem' },
      { label: 'Agriculture and Animal Care at Nucleus', url: '/agriculture-animal-care' },
      { label: 'Register your child', url: '/register' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "best Cambridge schools in Addis Ababa". The only post where "Cambridge schools in
  // Addis Ababa" may appear, because it is the query. Facts about other schools come from their
  // own websites (Oct 2026). Sandford, Cambridge Academy Ethiopia, Flipper and Reach could not be
  // read from their own pages, so they are named only as "not described".
  {
    title: 'The Best Cambridge Schools in Addis Ababa (2026): An Honest Comparison',
    slug: 'best-cambridge-schools-addis-ababa',
    category: 'academics',
    excerpt:
      'Which Cambridge schools in Addis Ababa are there, who can enrol, and how do you check a school’s claims? A fair comparison built from each school’s own website.',
    heroImageUrl: `${STOCK}/blog-choose.webp`,
    publishedAt: '2026-06-09T09:00:00.000Z',
    meta: {
      title: 'Best Cambridge Schools in Addis Ababa (2026)',
      description:
        'Best Cambridge schools in Addis Ababa compared from their own websites: Bingham, One Planet and Nucleus, who can enrol and how to verify any school.',
    },
    sections: [
      {
        body: [
          {
            p: 'There is no single best among the Cambridge schools in Addis Ababa, because the right one depends on your child’s age, your family’s passport and how long you will stay. Three schools state on their own websites that they teach Cambridge programmes: Bingham Academy, which enrols only foreign passport holders; One Planet International School, which runs Kindergarten to Year 13; and Nucleus International Schools, which teaches the international Cambridge curriculum from Preschool to Grade 8.',
          },
          {
            p: 'We run one of the three, so we have limited what we say about the others to what their own sites state, and we say when we could not confirm something. This guide was prepared in October 2026. Check each school’s current position before you decide.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/cta-about.webp`,
            alt: 'The front of the Nucleus Vatican campus in Addis Ababa with its Cambridge International Education sign',
            caption: 'A sign on the gate is where the questions start, not where they end.',
          },
        ],
      },
      {
        heading: 'What "Cambridge school" means',
        body: [
          {
            p: 'Cambridge International Education is part of Cambridge University Press and Assessment. It says nearly two million learners a year prepare for their future with a Cambridge education ([Cambridge International](https://www.cambridgeinternational.org/why-choose-us/)), and that its community spans 160 countries. It publishes a curriculum framework and assessments for each stage from age 3 to 19, and schools choose which stages to teach. Our guide to the [Cambridge curriculum in Ethiopia](/news/cambridge-curriculum-ethiopia) explains the stages.',
          },
          {
            p: 'Cambridge has also worked with Ethiopia directly. In its own [case study](https://www.cambridge.org/partnership/case-studies/how-cambridge-supported-curriculum-reform-in-ethiopia), it describes supporting the Ministry of Education’s curriculum reform, including training 3,200 textbook authors, editors, designers and reviewers.',
          },
          {
            p: 'Two things are easy to confuse. A school that teaches a Cambridge stage is one thing. An exam centre that only administers Cambridge exams is another, and Cambridge states that approved exam centres are not schools and do not offer teaching and learning services. Cambridge publishes a search tool for this, described under [Find a Cambridge school](https://www.cambridgeinternational.org/why-choose-us/find-a-cambridge-school/), which lists each school’s address and web address.',
          },
        ],
      },
      {
        heading: 'The schools, from their own websites',
        body: [
          { h3: 'Bingham Academy' },
          {
            p: 'Bingham describes itself as an international Christian school established in 1946, with about 360 students from nearly thirty countries. It states that it teaches the Cambridge International Examinations curriculum from Kindergarten to Grade 12, leading to Cambridge IGCSE and A Level examinations. It also says that, under government regulations, it can only enrol students who hold a foreign passport ([Bingham Academy](https://binghamacademy.net/about-us)). For a diplomatic or missionary family with a long history in Addis, that may be exactly right. For an Ethiopian family, it is not an option.',
          },
          { h3: 'One Planet International School' },
          {
            p: 'One Planet says it was founded in 2006 with just over 30 kindergarten students and now serves around 950 students from Kindergarten through Year 13, in Summit ([One Planet](https://oneplanetschool.com/about/)). Its site lists Cambridge Early Years, Primary, Lower Secondary, Upper Secondary and Advanced programmes. It says its primary curriculum is primarily based on the Cambridge International Curriculum, enriched and adapted to include local cultural understanding, and its primary subject list includes Amharic ([One Planet primary](https://oneplanetschool.com/curriculum/primary-school-years-1-6/)). Its early years programme covers ages 3 to 6 ([One Planet early years](https://oneplanetschool.com/early-years/)).',
          },
          { h3: 'Nucleus International Schools' },
          {
            p: 'Nucleus teaches the international Cambridge curriculum from Preschool to Grade 8. The preschool opened at Abo Mekanisa in 2022 and the grade school is at Sarbet Vatican. The 2025/26 prospectus lists a student-to-teacher ratio of 9:1, a mix of local and internationally qualified teachers, and a plan to open Grades 9 to 12 at a new Totot campus in Gerji for the 2027/28 academic year. Students come from Ethiopia, Canada, the United States, France, Nigeria, Turkey, India and beyond. We are the youngest of the three, and we say so: the older schools have track records that ours is still building. Read more about [the Cambridge pathway at Nucleus](/cambridge-pathway).',
          },
        ],
      },
      {
        heading: 'Other names you will hear',
        body: [
          {
            p: 'Directory sites also list schools including Sandford International School, Cambridge Academy Ethiopia and Flipper International School under Cambridge or British curricula. We could not confirm their programmes from their own published pages when we wrote this, and directory listings sometimes disagree with one another. So we have not described them. Contact them directly, and use the questions below. A fair comparison will include them once you have the facts.',
          },
        ],
      },
      {
        heading: 'The three side by side',
        body: [
          {
            ul: [
              'Bingham Academy: Kindergarten to Grade 12, Cambridge IGCSE and A Level route, foreign passport holders only, Christian ethos.',
              'One Planet International School: Kindergarten to Year 13, Cambridge stages listed from Early Years to Advanced, Summit campus, around 950 students.',
              'Nucleus International Schools: Preschool to Grade 8, international Cambridge curriculum, Mekanisa Abo and Sarbet Vatican campuses, Grades 9 to 12 planned for 2027/28.',
            ],
          },
          {
            p: 'Each of these is a different answer to a different family. A child who will need A Levels in Addis should shortlist schools that already teach them. A child entering Preschool or Grade 1 has more options, and the question becomes where the next stage will be.',
          },
        ],
      },
      {
        heading: 'How to check any Cambridge school',
        body: [
          {
            p: 'Whichever schools you shortlist, run the same checks. They take an afternoon and they work on any school, including ours. Our wider guides to [choosing an international school](/news/how-to-choose-international-school-addis-ababa) and [comparing international schools in Addis Ababa](/news/best-international-schools-addis-ababa) add checks that are not specific to Cambridge.',
          },
          {
            ul: [
              'Look the school up on Cambridge’s Find a Cambridge school tool and confirm it is a school, not only an exam centre.',
              'Ask which Cambridge stages are taught at your child’s grade this year, not which are planned.',
              'Ask what happens at the end of the last stage the school teaches, and where graduates go.',
              'Ask how many teachers hold a teaching qualification and how long they have stayed.',
              'Ask for the full first-year cost in writing, including registration, uniform, transport, meals and exam fees, and compare totals rather than tuition lines.',
              'Visit on a normal school day and watch a lesson, not an event.',
            ],
          },
          {
            p: 'If your question is Cambridge against the IB, our comparison of [Cambridge and IB in Addis Ababa](/news/cambridge-vs-ib-addis-ababa) sets out the trade-offs.',
          },
        ],
      },
      {
        heading: 'Where Nucleus is not the answer',
        body: [
          {
            p: 'We would rather you chose well than chose us. If your child needs Cambridge IGCSE or A Level classes in Addis Ababa this year, Nucleus does not teach them yet, since our Grades 9 to 12 are planned for 2027/28. If you hold a foreign passport and want a Christian community, Bingham may suit you better. If you want a school with a long record across every year group from Kindergarten to Year 13, One Planet has one. If you want a young school with a 9:1 student-to-teacher ratio, a hands-on programme in STEM and agriculture, and a campus you can walk through on any school day, we would like to meet you. You can [register your child](/register) to start the conversation.',
          },
        ],
      },
      {
        heading: 'A word on cost',
        body: [
          {
            p: 'We have not quoted any school’s fees here. They change every year, and published figures go stale quickly. For Nucleus, fees are shared by phone: call +2519 81 99 99 22. If you are already leaning towards Nucleus, [register your child](/register) and we will arrange a visit to the Vatican campus on a normal school day.',
          },
        ],
      },
      {
        heading: 'Questions parents ask',
        body: [
          { h3: 'What are the best Cambridge schools in Addis Ababa?' },
          {
            p: 'There is no single best. Bingham Academy, One Planet International School and Nucleus International Schools each state on their own websites that they teach Cambridge programmes, and they differ in age range, who can enrol and ethos. Shortlist two or three and visit each on a normal school day.',
          },
          { h3: 'Which schools in Addis Ababa teach the Cambridge curriculum?' },
          {
            p: 'From their own websites, Bingham Academy teaches it from Kindergarten to Grade 12, One Planet lists Cambridge stages from Early Years to Advanced, and Nucleus teaches the international Cambridge curriculum from Preschool to Grade 8. Other schools also appear in directories, so confirm each one with Cambridge’s school search.',
          },
          { h3: 'Can Ethiopian children attend Cambridge schools in Addis Ababa?' },
          {
            p: 'Often yes, but it depends on the school. Nucleus enrols Ethiopian children alongside families from Canada, the United States, France, Nigeria, Turkey, India and beyond. Bingham Academy states that, under government regulations, it can only accept students who hold a foreign passport, so confirm admissions rules with each school.',
          },
          { h3: 'How do I know if a school really teaches Cambridge?' },
          {
            p: 'Look the school up on Cambridge’s Find a Cambridge school tool, then ask which stages are taught at your child’s grade today. Cambridge notes that approved exam centres are not schools, so a centre listing alone does not show that a school teaches the curriculum.',
          },
          { h3: 'Is a Cambridge school better than an IB school?' },
          {
            p: 'Neither is better in general. Cambridge is built from subject-by-subject stages and exams, while the IB is a single integrated diploma at the top end. The better choice depends on your child and where your family may move next.',
          },
        ],
      },
    ],
    related: [
      { label: 'The Cambridge curriculum in Ethiopia, explained', url: '/news/cambridge-curriculum-ethiopia' },
      { label: 'Cambridge or IB in Addis Ababa?', url: '/news/cambridge-vs-ib-addis-ababa' },
      { label: 'The best international schools in Addis Ababa', url: '/news/best-international-schools-addis-ababa' },
      { label: 'How to choose an international school: a checklist', url: '/news/how-to-choose-international-school-addis-ababa' },
      { label: 'Register your child', url: '/register' },
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
            portrait: img.portrait ?? false,
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
