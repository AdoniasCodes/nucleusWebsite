import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * The curriculum cluster (Oct 2026): ten head-term posts on the Cambridge pathway stage by
 * stage, STEM, computing, hands-on learning, choosing a kindergarten and British vs American.
 *
 * Keyword research (Oct 26): Google autocomplete for gl=et and gl=us plus a look at who ranks.
 * Most of these SERPs are held by Gulf school marketing, resource sellers and university theses,
 * so a sourced, Addis-specific answer has room. Each post owns ONE head term that no older post
 * targets (checked against blogs.ts and the other seeds), cites its facts inline to the
 * primary source, links into the site mid-sentence, and carries the same FAQ in its body and in
 * `postFaqs.ts`.
 *
 * Inline links use `[label](url)` inside `p` and `ul` strings (see `lib/lexical.ts`). External
 * links open in a new tab; site links stay in the tab.
 *
 * School facts come from the 2025/26 prospectus only (`Nucleus/prospectus/assets/src/`). Photos
 * are real campus photographs already on the site, so this seed adds no files. Summer camp
 * photos are captioned as campus photos, never as term-time lessons.
 *
 * Run: `pnpm run seed:curriculum-blogs` (re-runnable: deletes by slug, then creates).
 */
const CAMP = '/images/newsletter/summer-camp-2026'
const STOCK = '/images/stock'
const ITC = '/images/newsletter/inside-the-classroom'

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
  // Head term: "cambridge curriculum in ethiopia" (autocomplete gl=et, also "cambridge curriculum
  // schools in ethiopia"). The pillar of the cluster: links down to each stage post. The
  // school listicle `best-cambridge-schools-addis-ababa` owns the "which schools" intent; this
  // post owns "what is it and how does it work here".
  {
    title: 'The Cambridge Curriculum in Ethiopia: How It Works from Age 3 to 19',
    slug: 'cambridge-curriculum-ethiopia',
    category: 'academics',
    excerpt:
      'What the Cambridge curriculum actually is, how its five stages fit together from age 3 to 19, how children are assessed, what it costs a child to switch in or out, and the questions that tell you whether a school in Ethiopia really teaches it.',
    heroImageUrl: `${STOCK}/cta-about.webp`,
    publishedAt: '2026-10-26T08:00:00.000Z',
    meta: {
      title: 'Cambridge Curriculum in Ethiopia: A Parent Guide',
      description:
        'How the Cambridge curriculum works in Ethiopia: the five stages from age 3 to 19, subjects, Checkpoint tests, IGCSE, A Levels and what to ask a school.',
    },
    sections: [
      {
        body: [
          {
            p: 'More and more schools in Addis Ababa describe themselves as Cambridge schools. Some teach the full Cambridge pathway. Some use Cambridge textbooks inside a different programme. Some have a Cambridge logo on the gate and little else. From the outside they look the same.',
          },
          {
            p: 'This guide explains what the Cambridge curriculum really is, how it is structured from age 3 to 19, how children are assessed at each stage, and what to ask so you can tell the difference.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/cta-about.webp`,
            alt: 'The Nucleus Vatican campus building in Addis Ababa with its Cambridge banner',
            caption: 'A logo on the building is the start of the question, not the answer.',
          },
        ],
      },
      {
        heading: 'What the Cambridge curriculum is',
        body: [
          {
            p: 'The Cambridge curriculum is published by Cambridge University Press and Assessment, part of the University of Cambridge, through its schools arm, Cambridge International Education. It describes itself as the world’s largest provider of international education for 3 to 19 year olds, with nearly two million learners ([Cambridge International](https://www.cambridgeinternational.org/why-choose-us/)). Its 2025 parent guides put the community at more than 10,000 schools in over 160 countries.',
          },
          {
            p: 'It is built on the British tradition but it is not the national curriculum of England. It is designed to be taught anywhere, and schools are expected to adapt it to their own country and culture. That is why a school in Addis can teach Amharic, Ethiopian history and local examples alongside the Cambridge curriculum while still working toward the same international standards.',
          },
          {
            p: 'Cambridge also has a history with Ethiopian education beyond private schools. In its own [case study](https://www.cambridge.org/partnership/case-studies/how-cambridge-supported-curriculum-reform-in-ethiopia), Cambridge describes supporting the Ministry of Education’s general education curriculum reform, including training 3,200 textbook authors, editors, designers and reviewers.',
          },
        ],
      },
      {
        heading: 'The five stages, from age 3 to 19',
        body: [
          {
            p: 'Cambridge calls the full journey the Cambridge Pathway. Each stage has its own curriculum and assessments, and each one leads into the next ([Cambridge Primary parent guide](https://www.cambridgeinternational.org/Images/268764-cambridge-primary-a-guide-for-parents.pdf)):',
          },
          {
            ul: [
              'Cambridge Early Years, ages 3 to 6: a play-based programme across six connected learning areas. Read more in our guide to the [Cambridge Early Years curriculum](/news/cambridge-early-years-curriculum).',
              'Cambridge Primary, ages 5 to 11, Stages 1 to 6: up to 13 subjects, with English, mathematics and science at the core. See [Cambridge Primary subjects and stages](/news/cambridge-primary-curriculum-subjects), and [what children learn in Year 1](/news/what-children-learn-in-year-1).',
              'Cambridge Lower Secondary, ages 11 to 14, Stages 7 to 9: the same subjects at greater depth, preparing for IGCSE. See [Cambridge Lower Secondary explained](/news/cambridge-lower-secondary-curriculum).',
              'Cambridge Upper Secondary, ages 14 to 16: Cambridge IGCSE, with more than 70 subjects to choose from, graded A* to G.',
              'Cambridge Advanced, ages 16 to 19: Cambridge International AS and A Levels, with more than 50 subjects.',
            ],
          },
          {
            p: 'A school does not have to offer every stage. Many in Ethiopia teach Early Years to Primary, or Primary to Lower Secondary, and some only IGCSE and A Level. Ask which stages are taught at the school today, and where your child goes next.',
          },
        ],
      },
      {
        heading: 'How it is different in the classroom',
        body: [
          {
            p: 'Three features shape a Cambridge classroom more than any textbook.',
          },
          { h3: 'Learning objectives, stage by stage' },
          {
            p: 'Every subject has a curriculum framework that sets out exactly what a child should learn at each stage. Teachers plan from those objectives, which means a parent can ask, at any point, "what is my child working on this term?" and get a precise answer.',
          },
          { h3: 'Thinking and working, not just knowing' },
          {
            p: 'Cambridge science includes a strand called Thinking and Working Scientifically, and maths a strand called Thinking and Working Mathematically ([Cambridge Primary science](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/science/)). Children are assessed on whether they can plan an investigation, spot a pattern or explain their method, not only on whether they remember the answer. That is a real break from the memorise-and-repeat model many parents grew up with.',
          },
          { h3: 'The five learner attributes' },
          {
            p: 'Since 2011 Cambridge has designed its programmes around five attributes it wants every learner to develop: confident, responsible, reflective, innovative and engaged ([Cambridge learner attributes guide](https://www.cie.org.uk/Images/427425-learner-attributes-foreword.pdf)). In practice that means lessons where children discuss, defend a view, work in groups and reflect on how they learned.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/gallery-classroom.webp`,
            alt: 'Young children working together on a learning activity on the classroom floor at Nucleus',
            caption: 'Children working together on the Nucleus campus in Addis Ababa.',
          },
        ],
      },
      {
        heading: 'How children are assessed',
        body: [
          {
            p: 'Cambridge assessment changes with age, and much of it is optional, so ask each school what it actually uses.',
          },
          {
            ul: [
              'Early Years: no tests at all. Teachers observe children as they learn and track progress against the framework ([Cambridge Early Years assessment](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-early-years/measuring-progress/)).',
              'Primary and Lower Secondary: Progression Tests in English, maths and science, marked by teachers, available from Stage 3. They show where a child is, rather than pass or fail.',
              'End of Primary and end of Lower Secondary: Cambridge Checkpoint, externally marked by Cambridge in English, maths and science, with Global Perspectives as an option. Results come with an international benchmark. From 2026 there are three test series each year, in March, May and October ([Checkpoint FAQ](https://www.cambridgeinternational.org/images/cambridge-primary-and-lower-secondary-checkpoint-faqs.pdf)).',
              'IGCSE at 16 and A Levels at 18: formal qualifications, externally set and marked.',
            ],
          },
        ],
      },
      {
        heading: 'Recognition: what a Cambridge education opens up',
        body: [
          {
            p: 'Cambridge qualifications are widely recognised. In the UK, Cambridge IGCSE is accepted as equivalent to the GCSE, and Cambridge International A Levels are recognised by UK universities ([IGCSE parent guide](https://www.cambridgeinternational.org/Images/268768-cambridge-igcse-a-guide-for-parents.pdf)). [Cambridge](https://www.cambridgeinternational.org/programmes-and-qualifications/recognition-and-acceptance/schools-and-students/) also states that more than 1,000 US universities formally accept its AS and A Levels, including every Ivy League university.',
          },
          {
            p: 'For families who may move, the more immediate benefit comes earlier. Because the same frameworks run in thousands of schools, a child moving between Cambridge-registered schools, say from Addis Ababa to Nairobi, Dubai or London, usually picks up close to where they left off.',
          },
        ],
      },
      {
        heading: 'Questions to ask a school that says it teaches Cambridge',
        body: [
          {
            ul: [
              'Is the school registered with Cambridge International, and for which programmes? A registered school can show its certificate.',
              'Which Cambridge stages are taught at my child’s age this year?',
              'Which Cambridge subjects are taught, and which subjects come from another curriculum?',
              'Does the school use Progression Tests, and does it enter students for Checkpoint?',
              'What training in the Cambridge approach have the teachers had?',
              'Where can my child continue after the last year this school offers?',
            ],
          },
          {
            p: 'A school that genuinely teaches the Cambridge pathway answers all six quickly and in detail. For a wider shortlist, see our [guide to Cambridge schools in Addis Ababa](/news/best-cambridge-schools-addis-ababa).',
          },
        ],
        images: [
          {
            imageUrl: '/images/cambridge/nucleus-cambridge-primary-certificate.webp',
            alt: 'Certificate from Cambridge International Education confirming that Nucleus International Schools is registered with Cambridge',
            caption: 'A registered Cambridge school can show you its certificate.',
          },
        ],
      },
      {
        heading: 'Questions parents ask about the Cambridge curriculum',
        body: [
          {
            p: 'What is the Cambridge curriculum? The Cambridge curriculum is an international programme from Cambridge University Press and Assessment for learners aged 3 to 19. It runs in five stages: Early Years, Primary, Lower Secondary, Upper Secondary (IGCSE) and Advanced (AS and A Level). Each subject has stage-by-stage learning objectives, and it is taught in more than 10,000 schools in over 160 countries.',
          },
          {
            p: 'Is the Cambridge curriculum recognised in Ethiopia? Yes. Cambridge programmes are taught in a number of private and international schools in Ethiopia, and Cambridge IGCSE and A Level qualifications are recognised by universities worldwide. Families planning to re-enter the Ethiopian national system later should ask the school and the Ministry of Education about equivalence for their child’s grade.',
          },
          {
            p: 'What age does the Cambridge curriculum start? Cambridge Early Years starts at age 3, Cambridge Primary at about 5, Lower Secondary at about 11, IGCSE at about 14 and A Levels at about 16.',
          },
          {
            p: 'Is the Cambridge curriculum hard? It is demanding in a different way from memorisation-based systems. Children are expected to explain their reasoning, investigate and apply what they know. Most children adapt well when the teaching is good, and the stage-by-stage objectives make it clear what they need to master next.',
          },
          {
            p: 'What is the difference between Cambridge and the Ethiopian curriculum? The Ethiopian national curriculum is set by the Ministry of Education and leads to national examinations. The Cambridge curriculum is international, taught in English, assessed by Cambridge, and leads to IGCSE and A Level qualifications recognised worldwide. We compare them in more detail in [Cambridge, IB or national curriculum](/news/best-curriculum-for-your-child-ethiopia).',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools in Addis Ababa is registered with Cambridge International and teaches the international Cambridge curriculum from Foundation to Year 9 (Preschool to Grade 8) at our Abo Mekanisa and Sarbet Vatican campuses. Our Totot Campus in Gerji opens Grades 9 to 12 for the 2027/28 academic year, with a Cambridge IGCSE and A Level pathway.',
          },
          {
            p: 'Ask us the six questions above. To visit, call +2519 81 99 99 22, or see [the Cambridge pathway at Nucleus](/cambridge-pathway).',
          },
        ],
      },
    ],
    related: [
      { label: 'The best Cambridge schools in Addis Ababa', url: '/news/best-cambridge-schools-addis-ababa' },
      { label: 'Cambridge or IB in Addis Ababa?', url: '/news/cambridge-vs-ib-addis-ababa' },
      { label: 'The Cambridge pathway at Nucleus', url: '/cambridge-pathway' },
      { label: 'Register your child', url: '/register' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "cambridge early years curriculum" (+ "foundation stage"). Nucleus facts kept
  // to what the prospectus says: it does not claim the school runs the Cambridge Early Years
  // programme itself, only an early years foundation stage leading into Cambridge Primary.
  {
    title: 'The Cambridge Early Years Curriculum: What Children Learn from Age 3 to 6',
    slug: 'cambridge-early-years-curriculum',
    category: 'academics',
    excerpt:
      'Cambridge Early Years is the play-based start of the Cambridge pathway for 3 to 6 year olds. Here are its six learning areas, how play turns into real learning, how progress is tracked without tests, and how to support it at home.',
    heroImageUrl: `${CAMP}/week4-art-group-table.webp`,
    publishedAt: '2026-10-26T09:00:00.000Z',
    meta: {
      title: 'Cambridge Early Years Curriculum Explained',
      description:
        'The Cambridge Early Years curriculum for ages 3 to 6: its six learning areas, how play-based learning works, how progress is tracked and how to help at home.',
    },
    sections: [
      {
        body: [
          {
            p: 'Parents visiting an early years classroom often leave with one worried question: they were playing, but when do they actually learn? In a good foundation stage, the play is the learning, and every part of it is planned.',
          },
          {
            p: 'Cambridge Early Years is the first stage of the Cambridge pathway, written for children aged 3 to 6. Here is what it contains, what a day built on it looks like, and how to tell whether a school is doing it well.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week4-art-group-table.webp`,
            alt: 'Young children painting together around a table at the Nucleus campus in Addis Ababa',
            caption: 'Painting together: fine motor control, colour words, sharing and patience in one activity.',
          },
        ],
      },
      {
        heading: 'What Cambridge Early Years is',
        body: [
          {
            p: 'Cambridge describes Early Years as "a child-centred, play-based programme that helps young learners to develop at their own pace" ([Cambridge Early Years](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-early-years/)). It is the first step of a pathway that runs to age 19, and it is designed to prepare children for the move to more formal teaching in primary school.',
          },
          {
            p: 'The curriculum is built around four areas of early childhood development: physical, cognitive, language and communication, and social and emotional. It uses a spiral approach, returning to the same topics and skills in more depth each year ([Cambridge Early Years curriculum](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-early-years/curriculum/)).',
          },
          {
            p: 'It was also written with multilingual children in mind, supporting learners whose home language is not English. That matters in Addis Ababa, where many children arrive speaking Amharic, Afaan Oromo, French or another language at home.',
          },
        ],
      },
      {
        heading: 'The six learning areas',
        body: [
          {
            p: 'Cambridge splits the content into six areas, but stresses they are "all connected and taught together as children play" ([parent guide](https://www.cambridgeinternational.org/Images/710812-cambridge-early-years-a-guide-for-parents.pdf)).',
          },
          { h3: 'Communication, language and literacy' },
          {
            p: 'Talking, listening, stories, songs and rhymes, then the sounds letters make and the first steps of reading and writing. Cambridge has added a phonics and handwriting scheme to support this stage.',
          },
          { h3: 'Mathematics' },
          {
            p: 'Counting real things, comparing bigger and smaller, sorting by colour and shape, spotting patterns, using words like more, fewer, before and after. Most early maths happens with blocks, sand, water and snacks, not worksheets.',
          },
          { h3: 'Understanding the world' },
          {
            p: 'Plants, animals, weather, materials, the local community, simple technology. Cambridge notes this area lays foundations for science, digital literacy, computing and humanities later on.',
          },
          { h3: 'Personal, social and emotional development' },
          {
            p: 'Making friends, taking turns, naming feelings, managing frustration, becoming independent with coats, shoes and lunch. For many parents this turns out to be the most important area of all.',
          },
          { h3: 'Physical development' },
          {
            p: 'Running, climbing, balancing and throwing, and the fine motor control in fingers and hands that later makes holding a pencil comfortable. The [World Health Organization](https://www.who.int/news/item/24-04-2019-to-grow-up-healthy-children-need-to-sit-less-and-play-more) recommends at least 180 minutes of physical activity a day for children aged three and four.',
          },
          { h3: 'Creative expression' },
          {
            p: 'Painting, building, music, movement, role play and making things up. Creativity at this age is how children test ideas about the world.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week4-robot-floor-drive.webp`,
            alt: 'A young girl driving a small robot car across the classroom floor at Nucleus',
            caption: 'Understanding the world includes simple technology: cause and effect on four wheels.',
          },
        ],
      },
      {
        heading: 'How play becomes learning',
        body: [
          {
            p: 'Planned play is different from free time. The teacher sets up the environment with a purpose, joins in, asks questions and adds new words at the right moment. Take a water tray:',
          },
          {
            ul: [
              'Pouring between cups of different sizes is early measurement: full, empty, half, more, less.',
              'Guessing which objects float is a first scientific prediction.',
              'Sharing the jug with three other children is turn-taking and negotiation.',
              'Describing what happened to the teacher is speaking, listening and new vocabulary.',
            ],
          },
          {
            p: 'The [American Academy of Pediatrics](https://www.healthychildren.org/English/news/Pages/healthier-children-play-according-to-the-AAP.aspx) describes play as "brain building" and says real-time social play is better for young children’s learning than digital media. The research is clear on this point.',
          },
        ],
      },
      {
        heading: 'How progress is tracked without tests',
        body: [
          {
            p: 'There are no exams in Cambridge Early Years. Assessment is "continuous formative assessment, including observations of children in the learning environment and evidence gathered during learning" ([Cambridge](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-early-years/measuring-progress/)). Teachers watch, note, photograph and keep samples of work, then judge progress against the learning statements in the framework.',
          },
          {
            p: 'As a parent, ask what records the school keeps and how often you will see them. A good early years teacher can show you a dated picture, a quote from your child or a note on how they solved a problem, not just a mark.',
          },
        ],
      },
      {
        heading: 'Getting ready for Year 1',
        body: [
          {
            p: 'The last year of Early Years gradually adds structure: slightly longer focused sessions, more letter and number work, more independence. Cambridge describes this as helping children "move from play-based learning to more formal teaching" in primary school.',
          },
          {
            p: 'Ready for Year 1 does not mean reading fluently. It means being able to listen in a group, look after their own things, hold a pencil comfortably, know many letter sounds, count reliably and ask for help. Our guide to [what children learn in Year 1](/news/what-children-learn-in-year-1) shows what comes next.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-handprint-paintings.webp`,
            alt: 'Colourful children’s handprint paintings laid out to dry on a classroom table',
            caption: 'Children’s own work, not shop-bought posters, is a good sign on any early years visit.',
          },
        ],
      },
      {
        heading: 'How to support early years learning at home',
        body: [
          {
            ul: [
              'Talk constantly, in whichever language you speak best at home. A rich home language helps English, not the opposite.',
              'Read aloud every day, and let your child turn the pages and tell you what happens next.',
              'Count real things together: stairs, injera, cars on the road.',
              'Give small jobs: setting the table, sorting socks, watering a plant.',
              'Keep screens short. The WHO recommends no more than one hour a day for children aged two to four.',
              'Let them try before you help. Frustration in small doses builds persistence.',
            ],
          },
        ],
      },
      {
        heading: 'Questions parents ask about the Cambridge Early Years curriculum',
        body: [
          {
            p: 'What is the Cambridge Early Years curriculum? It is the first stage of the Cambridge pathway, a play-based programme for children aged 3 to 6. It covers six connected learning areas: communication, language and literacy; mathematics; understanding the world; personal, social and emotional development; physical development; and creative expression.',
          },
          {
            p: 'Is Cambridge Early Years play-based? Yes. Cambridge describes it as a child-centred, play-based programme. The play is planned by teachers to build specific skills, so children learn early maths, language and social skills through activities designed for that purpose.',
          },
          {
            p: 'Are there tests in Cambridge Early Years? No. Progress is tracked through continuous observation and samples of children’s work, judged against the learning statements in the Cambridge Early Years framework.',
          },
          {
            p: 'What should my child know before starting Year 1? Most children are ready for Year 1 when they can listen in a group, manage their own belongings, hold a pencil comfortably, recognise many letter sounds, count objects reliably and ask an adult for help. Fluent reading is not expected.',
          },
          {
            p: 'What is the difference between Early Years and kindergarten? Kindergarten (KG) is the name of the classes; Early Years is the curriculum stage those classes follow. In a Cambridge school, children in nursery and KG classes are taught the early years curriculum before moving into Cambridge Primary.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'At Nucleus, the early years foundation stage runs at our Abo Mekanisa Campus for KG1 (ages three to four) and KG2 (ages four to five). It focuses on language, numeracy, social skills and play-based learning, with time in the agriculture lab, the music room and the STEM lab, and leads straight into Cambridge Primary at our Vatican campus.',
          },
          {
            p: 'Choosing a kindergarten? Our checklist of [12 things to check](/news/best-kindergarten-addis-ababa) works for any school, including ours. To visit, call +2519 81 99 99 22 or [register for Preschool and KG](/register/primary).',
          },
        ],
      },
    ],
    related: [
      { label: 'How to choose the best kindergarten in Addis Ababa', url: '/news/best-kindergarten-addis-ababa' },
      { label: 'When should my child start school?', url: '/news/best-age-to-start-school' },
      { label: 'The Cambridge curriculum in Ethiopia', url: '/news/cambridge-curriculum-ethiopia' },
      { label: 'Register for Preschool and KG', url: '/register/primary' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "what will my child learn in year 1" / "what do children learn in year 1"
  // (+ "cambridge primary year 1"). Stage 1 objectives are quoted from Cambridge's published
  // curriculum outlines and framed as examples, because the live framework is password-only.
  {
    title: 'What Will My Child Learn in Year 1? A Cambridge Primary Stage 1 Guide',
    slug: 'what-children-learn-in-year-1',
    category: 'academics',
    excerpt:
      'Year 1 is the first year of Cambridge Primary. Here is what children actually learn in English, maths and science at Stage 1, with real examples from the Cambridge curriculum, what a good Year 1 classroom looks like, and how to help at home.',
    heroImageUrl: `${CAMP}/week3-coding-tiles-explain.webp`,
    publishedAt: '2026-10-26T10:00:00.000Z',
    meta: {
      title: 'What Children Learn in Year 1 (Cambridge)',
      description:
        'What children learn in Year 1 on the Cambridge curriculum: Stage 1 English, maths and science with real examples, the best Year 1 classroom, and home tips.',
    },
    sections: [
      {
        body: [
          {
            p: 'Year 1 is the year school starts to feel like school. Your child moves from the play-based foundation stage into the first year of Cambridge Primary, called Stage 1, usually at age five to six. Lessons become a little longer, reading and writing take off, and children begin to be taught subjects by name.',
          },
          {
            p: 'Here is what that year actually contains, with real examples from the Cambridge curriculum, and what separates an excellent Year 1 class from an ordinary one.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-coding-tiles-explain.webp`,
            alt: 'A young girl explaining her sequence of coding tiles to classmates at Nucleus',
            caption: 'Explaining your thinking to a classmate is a Year 1 skill in every subject.',
          },
        ],
      },
      {
        heading: 'How Year 1 fits into Cambridge Primary',
        body: [
          {
            p: 'Cambridge Primary runs for six stages, typically from age 5 to 11 ([Cambridge Primary](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/)). Each subject has a curriculum framework with learning objectives for every stage, so Year 1 is not a loose introduction: it has specific targets, and Year 2 builds directly on them.',
          },
          {
            p: 'There are no formal Cambridge tests in Year 1. Cambridge’s Progression Tests start at Stage 3. Teachers track progress through classwork, observation and their own checks, so the reports you receive should describe what your child can do, not just a score.',
          },
        ],
      },
      {
        heading: 'English in Year 1',
        body: [
          {
            p: 'Cambridge Primary English covers reading, writing, and speaking and listening, and aims for children to "see themselves as readers" and writers ([Cambridge Primary English](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/english/)). In Year 1 that usually looks like:',
          },
          {
            ul: [
              'Phonics every day: learning the sounds letters and letter groups make, then blending them to read words and splitting words to spell them.',
              'Reading simple books independently, and talking about stories read aloud: who, what happened, what might happen next.',
              'Writing short sentences with capital letters and full stops, using sounds to spell new words.',
              'Forming letters correctly, which Cambridge now supports with its own phonics and handwriting scheme.',
              'Speaking in front of the class, listening to others and following instructions with several steps.',
            ],
          },
          {
            p: 'Expect invented spellings like "becos" in Year 1. That is phonics working, not a mistake to panic about.',
          },
        ],
      },
      {
        heading: 'Maths in Year 1',
        body: [
          {
            p: 'Cambridge Primary maths is organised into number, geometry and measure, and statistics and probability, plus a thread called Thinking and Working Mathematically ([Cambridge Primary mathematics](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/mathematics/)). Cambridge’s published [Stage 1 curriculum outline](https://www.cambridgeinternational.org/languages/vietnam/Images/25127-cambridge-primary-maths-curriculum-outline.pdf) gives a feel for the number work. Examples of Stage 1 objectives include:',
          },
          {
            ul: [
              'Recite numbers forwards from 1 to 100 and backwards from 20 to 0.',
              'Read and write numerals from 0 to 20, and count objects up to 20.',
              'Count on in tens to 100, and in twos, beginning to see odd and even numbers.',
              'Say the number that is 1 or 10 more or less than any number up to 30.',
              'Use the = sign to show that two amounts are equal.',
              'Double any single-digit number, and halve even numbers of objects up to 10.',
            ],
          },
          {
            p: 'Alongside number, children name and sort 2D and 3D shapes, compare lengths and weights, begin to tell the time and collect simple data, such as a class tally of favourite fruit. The framework has been revised since that outline was published, so a school’s exact wording may differ, but the level is a good guide.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week2-mosaic-art.webp`,
            alt: 'A young student holding up a mosaic of coloured paper shapes at Nucleus',
            caption: 'Shape work turns up in art as much as in maths lessons.',
            portrait: true,
          },
        ],
      },
      {
        heading: 'Science in Year 1',
        body: [
          {
            p: 'Cambridge Primary science has six strands: biology, chemistry, physics, earth and space, thinking and working scientifically, and science in context ([Cambridge Primary science](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/science/)). Examples from Cambridge’s [Stage 1 outline](https://www.cambridgeinternational.org/languages/vietnam/Images/25128-cambridge-primary-science-curriculum-outline.pdf) include knowing that plants are living things that need light and water to grow, naming the major parts of a plant, exploring how seeds grow, naming the main external parts of the body, and exploring how our senses tell us about the world.',
          },
          {
            p: 'Just as important, Year 1 children start to work like scientists: predicting what will happen, looking closely, measuring in simple ways and saying what they found. A Year 1 class that plants beans and checks them every morning is learning more science than one copying labelled diagrams.',
          },
        ],
      },
      {
        heading: 'Beyond the core subjects',
        body: [
          {
            p: 'Cambridge Primary offers 13 subjects in total, and most schools teach several beyond English, maths and science in Year 1, such as art and design, music, physical education, Global Perspectives, digital literacy or computing, and wellbeing. Ask which ones your school teaches and how often. See the full list in our guide to [Cambridge Primary subjects](/news/cambridge-primary-curriculum-subjects).',
          },
        ],
      },
      {
        heading: 'What the best Year 1 classes have in common',
        body: [
          {
            p: 'Every Year 1 class follows a curriculum. The best ones do five things differently:',
          },
          {
            ul: [
              'Small classes, so the teacher hears every child read several times a week.',
              'A bridge from the foundation stage: plenty of hands-on, active learning in the first term, not a sudden switch to desks and worksheets.',
              'Daily, systematic phonics rather than occasional reading practice.',
              'Real materials in maths and science: counters, scales, seeds, magnets.',
              'Teachers who tell you specifically what your child can do now and what comes next.',
            ],
          },
          {
            p: 'When you visit, ask to see a set of Year 1 writing books from the start and end of last year. The difference between September and June tells you more about a school than its brochure.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-circle-game-lead.webp`,
            alt: 'Young children sitting in a circle and joining in a group learning game at Nucleus',
            caption: 'Group games build the listening and turn-taking Year 1 depends on.',
          },
        ],
      },
      {
        heading: 'How to help your child in Year 1',
        body: [
          {
            ul: [
              'Read together for ten to fifteen minutes every day, and ask your child to read a few words or pages to you.',
              'Ask the teacher which phonics sounds the class is learning, and spot them on signs and packets.',
              'Play number games: count forwards and backwards in the car, double numbers, share snacks fairly.',
              'Ask "how do you know?" when your child tells you something. It builds the reasoning Cambridge assesses.',
              'Keep bedtime regular. Tired children cannot learn to read.',
            ],
          },
        ],
      },
      {
        heading: 'Questions parents ask about Year 1',
        body: [
          {
            p: 'What age is Year 1? Year 1 is usually for children aged five to six. In Cambridge Primary it is Stage 1, the first of six primary stages. At Nucleus, Year 1 is also called Grade 1, and entry is assessed individually.',
          },
          {
            p: 'What do children learn in Year 1 maths? In Cambridge Primary Stage 1, children count to 100, read and write numbers to 20, count in twos and tens, find one more and one less, start doubling and halving, use the equals sign, and work with shapes, measures, time and simple data.',
          },
          {
            p: 'Should my child be reading by the end of Year 1? Most children can read simple books independently by the end of Year 1, using phonics to sound out new words. Children develop at different speeds, so ask the teacher how your child is progressing against the year’s objectives rather than comparing with other children.',
          },
          {
            p: 'Are there exams in Year 1? No. Cambridge Progression Tests begin at Stage 3, and Cambridge Primary Checkpoint is at the end of Stage 6. In Year 1, teachers assess through classwork and observation.',
          },
          {
            p: 'What makes a good Year 1 class? Small class sizes, daily systematic phonics, hands-on maths and science with real materials, a gentle bridge from play-based learning, and teachers who tell parents specifically what their child can do and what comes next.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Year 1 (Grade 1) at Nucleus is taught at our Sarbet Vatican campus, for children aged five to six, on the international Cambridge curriculum. Our school-wide student to teacher ratio is 9:1, and our learning support team works with teachers and families on extra help or extra challenge where a child needs it.',
          },
          {
            p: 'Come and see a Year 1 class on a normal morning. Call +2519 81 99 99 22, or [register for Grade 1 to 8](/register/grade-school).',
          },
        ],
      },
    ],
    related: [
      { label: 'The Cambridge Early Years curriculum', url: '/news/cambridge-early-years-curriculum' },
      { label: 'Cambridge Primary subjects and stages', url: '/news/cambridge-primary-curriculum-subjects' },
      { label: 'Maths anxiety in children', url: '/news/maths-anxiety-in-children' },
      { label: 'Register for Grade 1 to 8', url: '/register/grade-school' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "cambridge primary curriculum subjects" (+ "cambridge primary checkpoint").
  // Covers Years 1 to 6 as one post rather than six thin per-year pages that would compete.
  {
    title: 'Cambridge Primary Curriculum: Subjects, Stages and Checkpoint Explained',
    slug: 'cambridge-primary-curriculum-subjects',
    category: 'academics',
    excerpt:
      'Cambridge Primary covers Years 1 to 6 with up to 13 subjects. Here is every subject and what it is for, how the six stages build, how Progression Tests and the Cambridge Primary Checkpoint work, and what to ask a school about each.',
    heroImageUrl: `${CAMP}/week4-art-teacher-help.webp`,
    publishedAt: '2026-10-26T11:00:00.000Z',
    meta: {
      title: 'Cambridge Primary Curriculum: Subjects & Stages',
      description:
        'All 13 Cambridge Primary subjects, how Stages 1 to 6 build, how Progression Tests and the Primary Checkpoint work, and what to ask a school in Addis Ababa.',
    },
    sections: [
      {
        body: [
          {
            p: 'Cambridge Primary is the stage most children spend longest in: six years, from about age 5 to 11. It is also the stage where schools differ most, because Cambridge lets each school choose which of its subjects to teach and which assessments to use.',
          },
          {
            p: 'This guide lists every Cambridge Primary subject, explains how the six stages build on each other, and sets out exactly how assessment works, including the Cambridge Primary Checkpoint at the end of Year 6.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week4-art-teacher-help.webp`,
            alt: 'A teacher helping primary children with a painting activity at a shared table at Nucleus',
            caption: 'Art and design is one of the 13 Cambridge Primary subjects.',
          },
        ],
      },
      {
        heading: 'How the six stages work',
        body: [
          {
            p: 'Every Cambridge Primary subject has a curriculum framework divided into six stages, one per year group, each with its own learning objectives. Most frameworks then split into strands, for example number, geometry and measure, and statistics and probability in maths. Children meet the same strands every year at a harder level, which is why a gap left in Year 2 tends to show up again in Year 4.',
          },
          {
            p: 'The full frameworks are only available to registered schools, so the best person to show you the objectives for your child’s year is the class teacher. Ask them.',
          },
        ],
      },
      {
        heading: 'All 13 Cambridge Primary subjects',
        body: [
          {
            p: 'Cambridge offers 13 primary subjects, which schools can combine and adapt to their own context ([Cambridge Primary curriculum](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/)).',
          },
          { h3: 'The core: English, mathematics and science' },
          {
            ul: [
              'English, or English as a Second Language: reading, writing, and speaking and listening, supported by Cambridge’s phonics and handwriting scheme in the early stages.',
              'Mathematics: number, geometry and measure, and statistics and probability, with Thinking and Working Mathematically running through all of it ([Cambridge Primary mathematics](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/mathematics/)).',
              'Science: biology, chemistry, physics and earth and space, plus Thinking and Working Scientifically and Science in Context, which looks at how science is used in real life ([Cambridge Primary science](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/science/)).',
            ],
          },
          { h3: 'Thinking and the wider world' },
          {
            ul: [
              'Global Perspectives: research, analysis, evaluation, reflection, collaboration and communication, practised on real issues. We explain it fully in [Cambridge Global Perspectives explained](/news/cambridge-global-perspectives-explained).',
              'Humanities: a newer subject covering history, geography and how societies work.',
              'Modern Foreign Language: also new, for a second or third language.',
            ],
          },
          { h3: 'Technology' },
          {
            ul: [
              'Computing: how computers work and how to program them, from block-based coding upward. See our guide to the [Cambridge computing curriculum](/news/cambridge-computing-curriculum).',
              'Digital Literacy: using technology safely, responsibly and well, which is a different skill from programming.',
            ],
          },
          { h3: 'Creative, physical and personal' },
          {
            ul: ['Art and Design', 'Music', 'Physical Education', 'Wellbeing: emotional health, relationships and looking after yourself.'],
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-music-circle.webp`,
            alt: 'Primary children sitting in a circle with their music teacher in the Nucleus music room',
            caption: 'Music is a full Cambridge Primary subject, not an extra.',
          },
        ],
      },
      {
        heading: 'What changes from Year 1 to Year 6',
        body: [
          {
            ul: [
              'Years 1 and 2 (Stages 1 and 2): learning to read and write, number sense to 100 and beyond, observing and describing in science. Lots of hands-on work. See [what children learn in Year 1](/news/what-children-learn-in-year-1).',
              'Years 3 and 4 (Stages 3 and 4): reading to learn rather than learning to read, times tables and written methods, planning simple fair tests in science. Progression Tests become available.',
              'Years 5 and 6 (Stages 5 and 6): longer writing in different styles, fractions, decimals and percentages, independent investigations, more research and presentation. The Checkpoint comes at the end of Year 6.',
            ],
          },
          {
            p: 'Across all six years, the shift is from being taught to learning independently. By Year 6 a child should be able to plan a piece of work, find information, check it and explain what they did.',
          },
        ],
      },
      {
        heading: 'How assessment works',
        body: [
          {
            p: 'Cambridge offers a set of optional assessments. Schools choose which to use, so ask.',
          },
          { h3: 'Classroom assessment, every year' },
          {
            p: 'Teachers assess against the learning objectives through classwork, questioning and their own tests. This is what most school reports are based on.',
          },
          { h3: 'Progression Tests, Stages 3 to 6' },
          {
            p: 'Short tests in English, maths and science, marked by teachers in school, usually at the end of the year. Cambridge says they show "where your child is on their learning journey, instead of just showing right or wrong answers" ([Cambridge Primary assessment](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/assessment/)).',
          },
          { h3: 'Cambridge Primary Checkpoint, end of Stage 6' },
          {
            p: 'Externally marked tests in English (first or second language), mathematics and science, with Global Perspectives available as a research report. Each child receives a statement of achievement, scored on a 0 to 50 scale within performance bands, and the school receives detailed feedback by strand with an international benchmark ([Cambridge Primary Checkpoint](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/assessment/cambridge-primary-checkpoint/)).',
          },
          {
            p: 'From 2026 Checkpoint runs three times a year, in March, May and October, on dates set by Cambridge, and students must take every paper in a subject to get a result ([Checkpoint FAQ](https://www.cambridgeinternational.org/images/cambridge-primary-and-lower-secondary-checkpoint-faqs.pdf)). In the October 2025 series, more than 22,000 learners in 60 countries took Checkpoint tests ([Cambridge](https://www.cambridgeinternational.org/news/news-details/view/cambridge-checkpoint-results-released-20251218/)).',
          },
          {
            p: 'Checkpoint is not a pass or fail exam, and it does not decide entry to Lower Secondary. Its real value is diagnostic: it tells you and the school which strands to strengthen before secondary school.',
          },
        ],
      },
      {
        heading: 'Questions to ask a school about Cambridge Primary',
        body: [
          {
            ul: [
              'Which of the 13 Cambridge Primary subjects do you teach, and which subjects come from another curriculum?',
              'How many lessons a week does my child get in English, maths and science?',
              'Do you use Progression Tests, and will I see the results?',
              'Do you enter students for Cambridge Primary Checkpoint?',
              'How do you support a child who is behind, or one who is ahead?',
              'Can I see a Year 6 student’s science investigation or extended writing?',
            ],
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-watercolour-painting.webp`,
            alt: 'Two primary students concentrating on watercolour painting at a table at Nucleus',
            caption: 'Ask to see real student work from the year your child will join.',
          },
        ],
      },
      {
        heading: 'Questions parents ask about Cambridge Primary',
        body: [
          {
            p: 'What subjects are in the Cambridge Primary curriculum? Cambridge Primary offers 13 subjects: English, English as a Second Language, Mathematics, Science, Global Perspectives, Computing, Digital Literacy, Art and Design, Music, Physical Education, Wellbeing, Humanities and Modern Foreign Language. English, mathematics and science are the core subjects, and schools choose which others to teach.',
          },
          {
            p: 'What age is Cambridge Primary? Cambridge Primary is typically for children aged 5 to 11, across six stages that match Years 1 to 6.',
          },
          {
            p: 'What is the Cambridge Primary Checkpoint? It is an optional set of tests taken at the end of Stage 6 in English, mathematics and science, with Global Perspectives available. The tests are marked externally by Cambridge, results are reported on a 0 to 50 scale, and schools receive detailed feedback against an international benchmark. From 2026 it runs in March, May and October.',
          },
          {
            p: 'Is the Cambridge Primary Checkpoint compulsory? No. Cambridge describes its primary assessments as optional, and each school decides whether to enter students. Many use it as a check on progress before Lower Secondary.',
          },
          {
            p: 'What comes after Cambridge Primary? Cambridge Lower Secondary, typically for ages 11 to 14 across Stages 7 to 9, followed by Cambridge IGCSE at about 14 to 16.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus is registered with Cambridge International for Cambridge Primary, and our primary years are taught at the Sarbet Vatican campus, 50 metres behind the Embassy of Indonesia. English, mathematics and science sit at the centre, taught through inquiry and hands-on projects, alongside Global Perspectives across all year groups, music, art, sport, the STEM and AI labs, and the agriculture lab.',
          },
          {
            p: 'To see a primary class in session, call +2519 81 99 99 22, or [register for Grade 1 to 8](/register/grade-school).',
          },
        ],
      },
    ],
    related: [
      { label: 'What children learn in Year 1', url: '/news/what-children-learn-in-year-1' },
      { label: 'Cambridge Lower Secondary explained', url: '/news/cambridge-lower-secondary-curriculum' },
      { label: 'Cambridge Global Perspectives explained', url: '/news/cambridge-global-perspectives-explained' },
      { label: 'Register for Grade 1 to 8', url: '/register/grade-school' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "cambridge lower secondary" (+ "lower secondary checkpoint"). Years 7 to 9.
  {
    title: 'Cambridge Lower Secondary Explained: Years 7 to 9 and the Road to IGCSE',
    slug: 'cambridge-lower-secondary-curriculum',
    category: 'academics',
    excerpt:
      'Cambridge Lower Secondary covers Years 7 to 9, ages 11 to 14: the three years that decide how ready a child is for IGCSE. Here are the subjects, what changes from primary, how the Lower Secondary Checkpoint works and what to ask a school.',
    heroImageUrl: `${ITC}/gp01-tilahun-teaching-evidence.webp`,
    publishedAt: '2026-10-26T12:00:00.000Z',
    meta: {
      title: 'Cambridge Lower Secondary: Years 7 to 9 Guide',
      description:
        'Cambridge Lower Secondary explained: subjects for Years 7 to 9, what changes from primary, how the Lower Secondary Checkpoint works, and readiness for IGCSE.',
    },
    sections: [
      {
        body: [
          {
            p: 'Ask a secondary teacher when IGCSE results are really decided and many will say: in Years 7 to 9. Those three years are where children either build the study habits, reading stamina and confidence in maths that IGCSE demands, or fall quietly behind.',
          },
          {
            p: 'Cambridge Lower Secondary is the stage of the Cambridge pathway that covers those years. Here is what it contains, how it differs from primary, and how to judge whether a school is using it well.',
          },
        ],
        images: [
          {
            imageUrl: `${ITC}/gp01-tilahun-teaching-evidence.webp`,
            alt: 'A teacher working through an argument with lower secondary students at a table in a Nucleus classroom',
            caption: 'A Years 7 to 9 Global Perspectives session at Nucleus.',
          },
        ],
      },
      {
        heading: 'What Cambridge Lower Secondary is',
        body: [
          {
            p: 'Cambridge Lower Secondary is "typically for learners aged 11 to 14 years" and runs across Stages 7, 8 and 9 ([Cambridge Lower Secondary](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/)). It follows Cambridge Primary and leads into Cambridge IGCSE, which most students begin at about 14.',
          },
          {
            p: 'Like Primary, each subject has a curriculum framework with learning objectives for every stage. The difference is depth: the same strands continue, but students are expected to reason, explain and work independently at a much higher level.',
          },
        ],
      },
      {
        heading: 'The subjects',
        body: [
          {
            p: 'Cambridge offers 13 Lower Secondary subjects, mirroring Primary: English, English as a Second Language, Mathematics, Science, Global Perspectives, Computing, Digital Literacy, Humanities, Modern Foreign Language, Art and Design, Music, Physical Education and Wellbeing. Schools choose which to teach.',
          },
          {
            ul: [
              'Mathematics moves firmly into algebra, equations, geometry with proof-like reasoning, and probability and statistics with real data.',
              'Science keeps its six strands: biology, chemistry, physics, earth and space, Thinking and Working Scientifically, and Science in Context ([Lower Secondary science](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/science)). Investigations become student-designed rather than teacher-led.',
              'English shifts toward analysing how writers create effects, and writing extended arguments, reports and stories.',
              'Global Perspectives asks students to evaluate sources and build arguments from evidence, the exact skills IGCSE and A Level essays reward. Read more in [Cambridge Global Perspectives explained](/news/cambridge-global-perspectives-explained).',
              'Computing moves from blocks to text-based programming. See the [Cambridge computing curriculum](/news/cambridge-computing-curriculum).',
            ],
          },
        ],
      },
      {
        heading: 'What really changes from primary',
        body: [
          {
            p: 'The content gets harder, but the bigger change is in what is expected of the student:',
          },
          {
            ul: [
              'More subject specialist teachers and more movement between lessons.',
              'Homework that requires planning across several days, not one evening.',
              'Reading longer texts independently, across every subject.',
              'Being marked on the quality of reasoning, not just the answer.',
              'Taking responsibility for organisation: deadlines, equipment, revision.',
            ],
          },
          {
            p: 'Children who struggle in Year 7 are rarely struggling with content. They are struggling with organisation and independence. A good school teaches those skills deliberately rather than assuming them.',
          },
        ],
        images: [
          {
            imageUrl: `${ITC}/gp01-tilahun-with-student.webp`,
            alt: 'A teacher setting out research materials for a lower secondary student at Nucleus',
            caption: 'Independent research is a Lower Secondary skill, taught one step at a time.',
            portrait: true,
          },
        ],
      },
      {
        heading: 'How the Lower Secondary Checkpoint works',
        body: [
          {
            p: 'At the end of Stage 9, schools can enter students for Cambridge Lower Secondary Checkpoint: tests in English (first or second language), mathematics and science, with Global Perspectives as an option. The tests are marked externally by Cambridge. Each student receives a statement of achievement, and the school receives diagnostic feedback against an international benchmark ([Lower Secondary assessment](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/assessment/)).',
          },
          {
            p: 'From 2026, test series run in March, May and October ([Checkpoint FAQ](https://www.cambridgeinternational.org/images/cambridge-primary-and-lower-secondary-checkpoint-faqs.pdf)). Teacher-marked Progression Tests are also available for Stages 7, 8 and 9 in the core subjects.',
          },
          {
            p: 'Checkpoint is recommended rather than required, and it is not a qualification. Its value is timing: it shows, a year or more before IGCSE, exactly which strands in each subject need work.',
          },
        ],
      },
      {
        heading: 'Getting ready for IGCSE',
        body: [
          {
            p: 'Cambridge IGCSE is typically taken from 14 to 16, offers more than 70 subjects, and is graded A* to G ([IGCSE parent guide](https://www.cambridgeinternational.org/Images/268768-cambridge-igcse-a-guide-for-parents.pdf)). In the UK it is accepted as equivalent to the GCSE. Students usually choose their IGCSE subjects during Year 9, so Lower Secondary is also where interests and strengths become clear.',
          },
          {
            p: 'By the end of Year 9 a student well prepared for IGCSE can:',
          },
          {
            ul: [
              'Read a demanding text and summarise its argument.',
              'Write a structured, multi-paragraph answer under time pressure.',
              'Solve multi-step problems in algebra without being told the method.',
              'Plan a fair scientific investigation and evaluate its results.',
              'Revise effectively, which is a skill that has to be taught.',
            ],
          },
        ],
      },
      {
        heading: 'Questions to ask a school about Years 7 to 9',
        body: [
          {
            ul: [
              'Which subjects are taught by subject specialists?',
              'How do you teach study skills and organisation in Year 7?',
              'Do you use Progression Tests and enter students for Lower Secondary Checkpoint?',
              'How do students choose their IGCSE subjects, and when?',
              'Where do your students continue for IGCSE and A Level?',
            ],
          },
        ],
      },
      {
        heading: 'Questions parents ask about Cambridge Lower Secondary',
        body: [
          {
            p: 'What is Cambridge Lower Secondary? It is the stage of the Cambridge pathway for learners aged about 11 to 14, covering Stages 7 to 9 (Years 7 to 9). It follows Cambridge Primary and prepares students for Cambridge IGCSE, with up to 13 subjects including English, mathematics and science.',
          },
          {
            p: 'What is the Cambridge Lower Secondary Checkpoint? It is an optional set of externally marked tests at the end of Stage 9 in English, mathematics and science, with Global Perspectives available. Students receive a statement of achievement and schools receive diagnostic feedback against an international benchmark. From 2026 it runs in March, May and October.',
          },
          {
            p: 'Is Lower Secondary Checkpoint a qualification? No. It is a diagnostic assessment that shows strengths and gaps before IGCSE. IGCSE, usually taken at about 16, is the first formal Cambridge qualification.',
          },
          {
            p: 'What age is Year 7? Year 7 is usually for students aged 11 to 12, the first year of Cambridge Lower Secondary. In American grade terms it sits alongside Grade 6.',
          },
          {
            p: 'How can I help my child prepare for IGCSE? Encourage daily independent reading, make sure gaps in maths are closed early, help them build a weekly homework routine, and ask the school which strands their Progression Test or Checkpoint results show need attention.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus teaches Cambridge Lower Secondary through Grade 8 at our Sarbet Vatican campus, with deeper subject focus and growing student independence. In Years 7 to 9 Global Perspectives is taught by a subject teacher, Tilahun G/Kiristose, whose classroom is the subject of [our first Inside the Nucleus Classroom issue](/newsletter/what-happens-in-a-global-perspectives-lesson).',
          },
          {
            p: 'For the 2027/28 academic year our Totot Campus in Gerji opens Grades 9 to 12 with a Cambridge IGCSE and A Level pathway, so students can continue straight on. Call +2519 81 99 99 22, or [register for Grade 1 to 8](/register/grade-school).',
          },
        ],
      },
    ],
    related: [
      { label: 'Cambridge Primary subjects and stages', url: '/news/cambridge-primary-curriculum-subjects' },
      { label: 'Teaching critical thinking and problem solving', url: '/news/teaching-critical-thinking-problem-solving-ethiopia' },
      { label: 'British vs American curriculum', url: '/news/british-vs-american-curriculum-addis-ababa' },
      { label: 'Register for Grade 1 to 8', url: '/register/grade-school' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "stem education for kids" / "stem programs for kids" (+ "stem schools in
  // ethiopia" by analogy with the Kenya/Ghana autocompletes). `robotics-coding-for-kids-addis-ababa`
  // owns robotics; this post owns the broader "what makes a STEM programme good" query.
  {
    title: 'What the Best STEM Programmes for Kids Have in Common (and How to Spot a Weak One)',
    slug: 'stem-education-for-kids',
    category: 'academics',
    excerpt:
      'Almost every school in Addis Ababa now says it teaches STEM. Here is what the research says a strong STEM programme for children actually does, the engineering design cycle at its heart, why it matters in Ethiopia now, and seven questions that expose a weak one.',
    heroImageUrl: `${CAMP}/week3-robot-team-build.webp`,
    publishedAt: '2026-10-26T13:00:00.000Z',
    meta: {
      title: 'STEM Education for Kids: What the Best Do',
      description:
        'What the best STEM programmes for kids have in common, the evidence behind them, why STEM matters in Ethiopia now, and seven questions that expose a weak one.',
    },
    sections: [
      {
        body: [
          {
            p: 'STEM, short for science, technology, engineering and mathematics, has become the word every school brochure in Addis Ababa needs. Some schools mean a real programme taught every week by trained teachers. Some mean a robot kit in a cupboard that comes out for open day.',
          },
          {
            p: 'Here is what the best STEM programmes for children have in common, what the evidence says about why they work, and how to tell, in one visit, which kind you are looking at.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-robot-team-build.webp`,
            alt: 'A group of children building and testing a robot together on the floor at Nucleus',
            caption: 'Building as a team on the Nucleus campus in Addis Ababa.',
          },
        ],
      },
      {
        heading: 'Why STEM matters more in Ethiopia now',
        body: [
          {
            p: 'The global picture is clear. The [World Economic Forum’s Future of Jobs Report 2025](https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf), based on more than 1,000 employers, expects 170 million jobs to be created and 92 million displaced by 2030, and estimates that 39% of workers’ existing skills will be transformed or outdated. AI and big data top its list of fastest-growing skills, followed by networks and cybersecurity and technological literacy. Creative thinking is rated a core skill by 57% of employers.',
          },
          {
            p: 'Ethiopia is moving in the same direction. The Ethiopian Artificial Intelligence Institute was established in 2020 and a National AI Policy was finalised in 2024 ([GSMA, AI in Ethiopia](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2025/04/AI-in-Ethiopia.pdf)). The national 5 Million Ethiopian Coders initiative had 360,000 young people registered and more than 78,800 certified by December 2024 ([Fana](https://www.fanamc.com/english/some-360000-youth-participating-in-five-million-ethiopian-coders-initiative-mint)). Yet [DataReportal](https://datareportal.com/reports/digital-2026-ethiopia) counts only 21.7% of Ethiopians as internet users at the end of 2025. Children who grow up confident with technology will have a real head start.',
          },
        ],
      },
      {
        heading: 'Start earlier than you think',
        body: [
          {
            p: 'STEM is not something to start at secondary school. A landmark analysis of six long-term studies covering close to 36,000 children found that early maths skills at school entry, around age five, were the strongest predictor of later achievement, predicting later reading as well as later maths ([Duncan and colleagues, 2007](https://www.sciencedaily.com/releases/2007/11/071112182442.htm)).',
          },
          {
            p: 'For young children, STEM looks like counting and sorting, building towers that fall down, planting seeds, pouring water and asking why. A school that only starts STEM in Grade 5 has missed the years when it does the most good.',
          },
        ],
      },
      {
        heading: 'What the best STEM programmes have in common',
        body: [
          { h3: '1. Children do the work, not the teacher' },
          {
            p: 'The strongest evidence for active learning comes from a large analysis in the Proceedings of the National Academy of Sciences: in university science courses, students in active learning classes scored about 6% higher on exams, and failure rates fell from 33.8% under lecturing to 21.8% ([Freeman and colleagues, 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4060654/)). That study was of undergraduates, but the principle holds for children too: a STEM lesson where children watch a demonstration is not a STEM lesson.',
          },
          { h3: '2. It is built on the engineering design cycle' },
          {
            p: 'Good programmes teach children to work like engineers. NASA describes the engineering design process in six repeating steps: ask, imagine, plan, create, experiment, improve ([NASA](https://svs.gsfc.nasa.gov/10341)). The important word is improve. A child whose bridge collapses, works out why and builds a better one has learned more than a child who followed instructions perfectly.',
          },
          { h3: '3. The four letters are connected' },
          {
            p: 'Weak programmes teach a science lesson, a separate maths lesson and occasionally a robot. Strong ones connect them: measuring and graphing plant growth, programming a robot to travel an exact distance, calculating materials for a model.',
          },
          { h3: '4. Children work in small teams and explain their thinking' },
          {
            p: 'The Education Endowment Foundation’s Teaching and Learning Toolkit, reproduced by its Australian partner, rates collaborative learning at about five months of additional progress, and finds groups of three to five with a shared goal work best, especially when every student has to explain their thinking ([Evidence for Learning](https://evidenceforlearning.org.au/education-evidence/teaching-learning-toolkit/collaborative-learning-approaches)).',
          },
          { h3: '5. It happens every week' },
          {
            p: 'A STEM week once a year is a show. STEM skills grow like reading: little and often. Ask how many hours a week your child would spend on hands-on STEM.',
          },
          { h3: '6. It includes real-world and living science' },
          {
            p: 'Gardens, weather, water, food and local problems make science concrete. A review of school garden studies found that in two of the four studies measuring academic outcomes, gardening students scored significantly higher in science ([NAAEE summary](https://eepro.naaee.org/research/eeresearch/school-gardens-enhance-academic-performance-and-dietary-outcomes-children)). The evidence is modest, but the pattern makes sense.',
          },
          { h3: '7. Girls are expected to lead, not just join' },
          {
            p: '[UNESCO](https://www.unesco.org/en/gender-equality/education/stem) reports that women make up only 35% of STEM graduates worldwide, a figure unchanged in ten years. The gap opens in childhood. Watch who holds the screwdriver and who answers questions on your visit.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week1-vex-robot.webp`,
            alt: 'A small student-built robot with a red scoop on the floor at Nucleus',
            caption: 'Ask, imagine, plan, create, experiment, improve. Then improve again.',
          },
        ],
      },
      {
        heading: 'Seven questions that expose a weak STEM programme',
        body: [
          {
            ul: [
              'How many hours a week of hands-on STEM would my child have, and from what age?',
              'Who teaches it, and what training do they have?',
              'Can I see the lab, and does it look used? Look for half-finished projects and student work.',
              'What did students build or investigate last month?',
              'How do you connect STEM with the maths and science curriculum?',
              'What happens when a project fails?',
              'How many girls take part in the robotics or coding activities?',
            ],
          },
          {
            p: 'A school with a real programme answers with specifics and probably takes you to see it. A school with a robot in a cupboard talks about equipment.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week2-robotics-class.webp`,
            alt: 'Children gathered around a robotics table with their instructor in a Nucleus classroom',
            caption: 'A lab that is used looks busy, and a little messy.',
          },
        ],
      },
      {
        heading: 'How to build STEM thinking at home',
        body: [
          {
            ul: [
              'Cook together and let your child measure, weigh and time.',
              'Ask "what do you think will happen?" before you try something, then "why did that happen?" after.',
              'Keep a box of cardboard, tape, string and bottle tops for building.',
              'Grow something on a balcony or windowsill and measure it weekly.',
              'Treat mistakes as data. "That did not work. What could we change?"',
            ],
          },
        ],
      },
      {
        heading: 'Questions parents ask about STEM education',
        body: [
          {
            p: 'What is STEM education for kids? STEM education teaches science, technology, engineering and mathematics through hands-on projects in which children investigate, design, build and test. The best programmes connect the four subjects, use the engineering design cycle of ask, imagine, plan, create, experiment and improve, and run every week rather than as occasional events.',
          },
          {
            p: 'At what age should children start STEM? As early as preschool. Research covering close to 36,000 children found that early maths skills at around age five were the strongest predictor of later achievement. For young children STEM means counting, building, sorting, planting and asking why.',
          },
          {
            p: 'What makes a good STEM programme? Children doing the work themselves, a design cycle that includes improving after failure, connections between science, maths and technology, small teams where every child explains their thinking, weekly practice, real-world and living science, and equal participation by girls.',
          },
          {
            p: 'Why is STEM important in Ethiopia? Ethiopia is investing in AI and digital skills, with an Artificial Intelligence Institute established in 2020, a National AI Policy finalised in 2024 and a national coding initiative for young people. Globally, the World Economic Forum names AI, big data, cybersecurity and technological literacy as the fastest-growing skills to 2030.',
          },
          {
            p: 'Is robotics the same as STEM? No. Robotics is one part of STEM that combines engineering, programming and maths. A good STEM programme also includes hands-on science, measurement, data and design. We look at robotics specifically in [robotics and coding for kids in Addis Ababa](/news/robotics-coding-for-kids-addis-ababa).',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'At Nucleus, STEM is not an add-on. Our STEM labs bring science, technology, engineering and mathematics to life through practical experiments and projects, and our Artificial Intelligence Lab introduces students to AI concepts and tools in an age-appropriate, hands-on way. The agriculture lab adds living science: growing plants, studying soil and learning about food systems.',
          },
          {
            p: 'See it on [our Robotics and STEM page](/robotics-stem), or come and watch a session. Call +2519 81 99 99 22, or [register your child](/register).',
          },
        ],
      },
    ],
    related: [
      { label: 'Robotics and coding for kids in Addis Ababa', url: '/news/robotics-coding-for-kids-addis-ababa' },
      { label: 'Why robotics, STEM and agriculture matter early', url: '/news/why-robotics-stem-agriculture-matter-early' },
      { label: 'Robotics and STEM at Nucleus', url: '/robotics-stem' },
      { label: 'Register your child', url: '/register' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "cambridge computing" / "computing curriculum primary" (the user's "best IT
  // computing program"). Does not claim Nucleus teaches the Cambridge Computing subject: the
  // prospectus lists STEM labs and an AI lab, not the subject.
  {
    title: 'Computing for Kids: What the Cambridge Computing Curriculum Teaches from Year 1 to Year 9',
    slug: 'cambridge-computing-curriculum',
    category: 'academics',
    excerpt:
      'Good school IT is not typing lessons. Here are the five strands of the Cambridge computing curriculum, how children move from Scratch Jr to Python, where AI fits, the difference between computing and digital literacy, and what to look for in a school.',
    heroImageUrl: `${CAMP}/week2-coding-mats.webp`,
    publishedAt: '2026-10-26T14:00:00.000Z',
    meta: {
      title: 'Cambridge Computing Curriculum for Kids',
      description:
        'The Cambridge computing curriculum from Year 1 to 9: five strands, Scratch to Python, where AI fits, computing vs digital literacy, and what to ask a school.',
    },
    sections: [
      {
        body: [
          {
            p: 'Many parents in Addis Ababa remember school IT as a room of old computers and a lesson on typing or Microsoft Word. Modern computing is a different subject. It teaches children how computers think, how to give them precise instructions, and how to solve problems by breaking them into steps.',
          },
          {
            p: 'The Cambridge computing curriculum is a good map of what a strong school IT programme should cover from Year 1 to Year 9. Here is what it contains, how it progresses, and how to judge any school’s offer against it.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week2-coding-mats.webp`,
            alt: 'Young children working with coding mats and a floor robot in a classroom at Nucleus',
            caption: 'Unplugged coding on the Nucleus campus: instructions first, screens later.',
          },
        ],
      },
      {
        heading: 'Computing is not the same as digital literacy',
        body: [
          {
            p: 'Cambridge splits technology into two separate subjects, and the distinction is useful for any school. Computing is how computers work and how to program them. Digital Literacy is how to use computers well and stay safe online ([Cambridge Primary Computing](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/computing/)).',
          },
          {
            p: 'Both matter. But a school that only teaches digital literacy is teaching children to use technology other people made. Computing teaches them to make it.',
          },
        ],
      },
      {
        heading: 'The five strands of Cambridge computing',
        body: [
          {
            p: 'Cambridge added Computing to Primary and Lower Secondary for first teaching from September 2022 ([Cambridge blog](https://blog.cambridgeinternational.org/programming-for-all-introducing-cambridge-primary-and-lower-secondary-computing/)). Both stages share five strands:',
          },
          {
            ul: [
              'Computational thinking: breaking problems into parts, spotting patterns, ignoring unimportant detail and designing step-by-step solutions.',
              'Programming: writing, testing and debugging instructions for a computer.',
              'Managing data: collecting, organising and making sense of information.',
              'Networks and digital communication: how devices connect and how the internet moves information.',
              'Computer systems: what is inside a computer and how hardware and software work together.',
            ],
          },
          {
            p: 'Computational thinking is the one parents underestimate. It is a way of approaching any problem, from a maths word problem to planning a science investigation, and it is useful whether or not a child ever becomes a programmer.',
          },
        ],
      },
      {
        heading: 'From Scratch Jr to Python: how it progresses',
        body: [
          { h3: 'Years 1 and 2: sequences and unplugged coding' },
          {
            p: 'Young children start with floor robots, coding cards and Scratch Jr, a picture-based tool Cambridge suggests for Stages 1 and 2. They learn that a computer follows instructions exactly, in order, and that a wrong step produces a wrong result. Finding and fixing those mistakes, called debugging, builds persistence early.',
          },
          { h3: 'Years 3 to 6: Scratch, loops and decisions' },
          {
            p: 'Children move to Scratch, the free block-based language from the [MIT Media Lab](https://scratch.mit.edu/help/about/), designed mainly for ages 8 to 16 and used in more than 150 countries. They build games and animations with loops, variables and, from Stage 5, selection: IF this, THEN that, ELSE something else. Many schools add physical computing with devices like the [BBC micro:bit](https://microbit.org/about/), which around 73.5 million children worldwide have learned with.',
          },
          { h3: 'Years 7 to 9: text-based programming' },
          {
            p: 'In Lower Secondary, Cambridge moves students to text-based languages such as Python ([Cambridge Lower Secondary Computing](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/computing/)). Students write real code, work with data, and learn the logic, decomposition and abstraction that carry straight into IGCSE Computer Science.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week2-robot-coding-poster.webp`,
            alt: 'A laptop screen showing a block-based coding program at Nucleus',
            caption: 'Block-based code comes before typed code, and it is real programming.',
          },
        ],
      },
      {
        heading: 'How good teachers teach programming',
        body: [
          {
            p: 'Children do not learn to code by copying code. The Raspberry Pi Foundation’s research-based approach, called PRIMM, sets out a better sequence: Predict what a program will do, Run it, Investigate how it works, Modify it, then Make your own. A study with 500 learners aged 11 to 14 found improved outcomes using it ([Raspberry Pi Foundation](https://static.raspberrypi.org/files/curriculum/quickreads/11-Pedagogy_Summary_PRIMM_V4_2023.pdf)).',
          },
          {
            p: 'The idea is simple: read before you write. Ask a school how students learn to code. If the answer is "they follow tutorials", ask what happens after the tutorial.',
          },
        ],
      },
      {
        heading: 'Where AI fits',
        body: [
          {
            p: 'Children already use AI, in search, video recommendations and chat tools. In 2024 UNESCO published an [AI competency framework for students](https://www.unesco.org/en/articles/ai-competency-framework-students) with four dimensions: a human-centred mindset, the ethics of AI, AI techniques and applications, and AI system design. It moves through three levels: understand, apply and create.',
          },
          {
            p: 'For primary children, good AI education is mostly about understanding: what AI is, that it learns from data, that it can be wrong and that people are responsible for how it is used. Building with AI comes later. Ethiopia’s own investment, including the Ethiopian Artificial Intelligence Institute and a National AI Policy finalised in 2024 ([GSMA](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2025/04/AI-in-Ethiopia.pdf)), makes this a practical skill rather than a futuristic one.',
          },
        ],
      },
      {
        heading: 'What to look for in a school’s computing programme',
        body: [
          {
            ul: [
              'Programming from Year 1, starting unplugged and moving to blocks, then text.',
              'All five strands, not just programming or just office software.',
              'A teacher who can code, rather than one who supervises tutorials.',
              'Projects students design themselves, not only exercises.',
              'Teaching on AI that covers how it works and its limits, not just using it.',
              'Online safety taught alongside, as digital literacy.',
            ],
          },
          {
            p: 'When you visit, ask a Year 5 or Year 8 student to show you something they programmed and explain how it works. Their answer is the programme.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-robot-mat-focus.webp`,
            alt: 'Two students concentrating on programming a small robot on a mat at Nucleus',
            caption: 'Debugging is where the learning happens.',
          },
        ],
      },
      {
        heading: 'Questions parents ask about computing for kids',
        body: [
          {
            p: 'What is taught in the Cambridge computing curriculum? Cambridge Primary and Lower Secondary Computing share five strands: computational thinking, programming, managing data, networks and digital communication, and computer systems. Primary learners program in visual languages such as Scratch, and Lower Secondary learners move to text-based languages such as Python.',
          },
          {
            p: 'What age should children start coding? Children can start at five or six with unplugged activities, floor robots and picture-based tools such as Scratch Jr, which Cambridge suggests for Stages 1 and 2. Block-based Scratch suits ages eight and up, and text-based Python usually starts around 11.',
          },
          {
            p: 'What is the difference between computing and digital literacy? Computing teaches how computers work and how to program them. Digital literacy teaches how to use technology effectively and stay safe online. Cambridge teaches them as two separate subjects, and a strong school covers both.',
          },
          {
            p: 'Should primary children learn about AI? Yes, at the right level. UNESCO’s 2024 AI competency framework for students starts with understanding: what AI is, how it learns from data, where it can go wrong and how to use it responsibly. Building AI systems comes later.',
          },
          {
            p: 'Is Scratch real programming? Yes. Scratch, from the MIT Media Lab, uses blocks instead of typed text, but it teaches the same concepts as any language: sequences, loops, variables, conditions and events. Children who learn Scratch well usually move to Python quickly.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus students learn technology by building it. Our STEM labs teach coding and robotics through practical projects, and our Artificial Intelligence Lab introduces students to AI concepts and tools in an age-appropriate, hands-on way. Read more on [our Robotics and STEM page](/robotics-stem) and in [what robotics and coding look like in Addis Ababa](/news/robotics-coding-for-kids-addis-ababa).',
          },
          {
            p: 'Come and ask our students to show you what they built. Call +2519 81 99 99 22, or [register your child](/register).',
          },
        ],
      },
    ],
    related: [
      { label: 'Robotics and coding for kids in Addis Ababa', url: '/news/robotics-coding-for-kids-addis-ababa' },
      { label: 'What the best STEM programmes have in common', url: '/news/stem-education-for-kids' },
      { label: 'Cambridge Lower Secondary explained', url: '/news/cambridge-lower-secondary-curriculum' },
      { label: 'Register your child', url: '/register' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "hands-on learning" (+ "meaning", "examples", "theory"). Deliberately avoids the
  // learning-pyramid retention percentages, which are a myth, and says so.
  {
    title: 'Hands-On Learning: What It Is, Why It Works and What It Looks Like in School',
    slug: 'hands-on-learning',
    category: 'academics',
    excerpt:
      'Hands-on learning means children learn by doing, then thinking about what they did. Here is what it really is, the evidence behind it (and the popular statistic that is a myth), examples by age, and how to tell real hands-on learning from busy work.',
    heroImageUrl: `${CAMP}/week3-paper-collage-class.webp`,
    publishedAt: '2026-10-26T15:00:00.000Z',
    meta: {
      title: 'Hands-On Learning: Meaning, Benefits, Examples',
      description:
        'What hands-on learning really is, the evidence behind it, the famous statistic that is a myth, examples by age, and how to spot real hands-on learning.',
    },
    sections: [
      {
        body: [
          {
            p: 'Hands-on learning is one of the most used phrases in education and one of the least explained. It does not just mean children touching things. A class can be full of glue, paint and cardboard and learn very little. A class can be quiet and still be deeply hands-on.',
          },
          {
            p: 'Here is what hands-on learning really means, what the evidence says about it, and what it should look like at each age.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-paper-collage-class.webp`,
            alt: 'Children making paper collages together around a long classroom table at Nucleus',
            caption: 'Making together on the Nucleus campus in Addis Ababa.',
          },
        ],
      },
      {
        heading: 'What hands-on learning actually means',
        body: [
          {
            p: 'Hands-on learning means children learn by doing something real, then thinking about what happened. The doing is only half of it. The thinking afterwards is what turns an activity into learning.',
          },
          {
            p: 'The best-known model is David Kolb’s experiential learning cycle, which builds on the work of John Dewey, Kurt Lewin and Jean Piaget. It has four stages: a concrete experience, reflective observation on what happened, abstract conceptualisation (working out the general idea), and active experimentation, trying the idea out in a new situation ([Kolb, The Process of Experiential Learning](https://astec.arizona.edu/sites/default/files/2024-08/Kolb_ProcessOfExperientialLearning.pdf)).',
          },
          {
            p: 'In a classroom that might mean: children plant beans in different spots (experience), notice the ones in the cupboard are pale and thin (observation), conclude that plants need light (concept), then predict what will happen to a plant under a box and test it (experimentation).',
          },
        ],
      },
      {
        heading: 'What the evidence says',
        body: [
          {
            p: 'The research supports active, hands-on approaches strongly, with some honest limits.',
          },
          {
            ul: [
              'In a large analysis in the Proceedings of the National Academy of Sciences, university science students in active learning classes scored about 6% higher on exams, and failure rates dropped from 33.8% to 21.8% compared with lectures ([Freeman and colleagues, 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4060654/)). The study was of undergraduates, not children.',
              'The Education Endowment Foundation’s Teaching and Learning Toolkit, as reproduced by its Australian partner, rates metacognition, teaching children to plan, monitor and reflect on their own learning, at about seven months of additional progress ([Evidence for Learning](https://evidenceforlearning.org.au/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation/technical-appendix)). That is the reflection half of hands-on learning.',
              'The same toolkit rates oral language approaches at about six months, and around seven in the early years ([Evidence for Learning](https://evidenceforlearning.org.au/education-evidence/teaching-learning-toolkit/oral-language-interventions)). Talking through what you did is part of doing it.',
              'Research with the Exploratorium in San Francisco on making and tinkering found learning across five dimensions, from problem solving and conceptual understanding to creativity and social engagement, but stressed that results depend on careful design of the activity ([NSTA](https://www.nsta.org/2018/07/making-deeper-learners/)).',
            ],
          },
        ],
      },
      {
        heading: 'The famous statistic that is a myth',
        body: [
          {
            p: 'You may have seen a pyramid claiming people remember 10% of what they read, 20% of what they hear and 90% of what they do or teach. It appears in school brochures all over the world. It is not real research.',
          },
          {
            p: 'Edgar Dale’s 1946 "cone of experience", which the pyramid is usually credited to, contained no percentages. The numbers were added later, and learning researcher Will Thalheimer calls them bogus ([People Matters](https://www.peoplematters.in/article/training-development/the-myth-of-the-dales-cone-of-learning-17104)). Hands-on learning does not need invented numbers. The real evidence above is strong enough. Be wary of any school that relies on the pyramid.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week4-handprints-held-high.webp`,
            alt: 'A group of children proudly holding up their handprint paintings in a Nucleus classroom',
            caption: 'Pride in something you made yourself is part of why it sticks.',
          },
        ],
      },
      {
        heading: 'Hands-on learning examples by age',
        body: [
          { h3: 'Early years (ages 3 to 5)' },
          {
            ul: [
              'Sorting buttons, leaves or blocks by colour, size and shape.',
              'Water and sand play with cups and jugs: full, empty, more, less.',
              'Planting seeds and watering them daily.',
              'Role play shops with real coins.',
            ],
          },
          { h3: 'Primary (ages 5 to 11)' },
          {
            ul: [
              'Measuring the playground to learn about length and area.',
              'Building a bridge from paper and testing how much weight it holds.',
              'Running a fair test: which paper towel absorbs the most water?',
              'Programming a floor robot to follow a route.',
              'Growing vegetables and recording growth on a graph.',
            ],
          },
          { h3: 'Lower secondary (ages 11 to 14)' },
          {
            ul: [
              'Designing and running an independent science investigation.',
              'Building and programming a robot to solve a set challenge.',
              'Surveying the class, analysing the data and presenting the findings.',
              'Making a product, pricing it and selling it, which brings maths, design and enterprise together.',
            ],
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-city-mat-build.webp`,
            alt: 'Two children building on a city map mat during a hands-on activity at Nucleus',
            caption: 'Building a route on a map mat: maths, language and planning at once.',
          },
        ],
      },
      {
        heading: 'Real hands-on learning or busy work?',
        body: [
          {
            p: 'Not every activity is learning. Use these questions to tell them apart:',
          },
          {
            ul: [
              'Can the child say what they were trying to find out or make, and why?',
              'Was there a real problem to solve, or just instructions to follow?',
              'Did anything go wrong, and did the child have to fix it?',
              'Did the teacher ask questions afterwards, so the child had to explain what happened?',
              'Does it connect to what the class is learning in maths, science or language?',
            ],
          },
          {
            p: 'A pretty craft that every child completes identically from a template is busy work. A wobbly model that a child redesigned twice and can explain is learning.',
          },
        ],
      },
      {
        heading: 'Hands-on learning at home',
        body: [
          {
            ul: [
              'Cook together: measuring, timing and following a sequence.',
              'Fix things together and let your child hold the tools.',
              'Turn questions into small experiments: "Which ice cube melts faster, in the sun or the shade?"',
              'After any activity, ask "what happened, and why do you think it happened?"',
            ],
          },
        ],
      },
      {
        heading: 'Questions parents ask about hands-on learning',
        body: [
          {
            p: 'What is hands-on learning? Hands-on learning is an approach in which children learn by doing a real activity, such as building, experimenting, measuring or making, and then reflecting on what happened. It is based on experiential learning theory, which describes a cycle of concrete experience, reflection, forming ideas and testing them in new situations.',
          },
          {
            p: 'What are the benefits of hands-on learning? Research on active learning shows higher exam scores and lower failure rates than lecture-based teaching, and approaches that build reflection and talk are linked to several months of additional progress. Hands-on learning also builds problem solving, persistence, teamwork and confidence.',
          },
          {
            p: 'Is it true we remember 90% of what we do? No. The learning pyramid percentages are a myth. Edgar Dale’s original 1946 cone of experience had no percentages, and the numbers were added later without research behind them. The real evidence for active learning comes from studies such as Freeman and colleagues’ 2014 analysis.',
          },
          {
            p: 'What are examples of hands-on learning? Examples include planting and measuring seeds, building and testing paper bridges, running fair-test science experiments, programming floor robots, measuring the playground for maths, and making and selling a product.',
          },
          {
            p: 'Is hands-on learning only for young children? No. It suits every age. Young children learn through sorting, building and play; primary students through experiments and projects; older students through independent investigations, design challenges and enterprise projects.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Our motto, ትምህርት ከደብተር ያልፋል (learning goes beyond books), is a daily promise. At Nucleus, hands-on learning runs through STEM labs and the Artificial Intelligence Lab, agriculture labs where students grow plants, study soil and learn about food systems, art and crafts, the music band, and a workshop where students learn woodwork and pottery. Items they make are sold at our school stall, a first real taste of enterprise.',
          },
          {
            p: 'See it for yourself. Call +2519 81 99 99 22, explore [agriculture and animal care at Nucleus](/agriculture-animal-care), or [register your child](/register).',
          },
        ],
      },
    ],
    related: [
      { label: 'Why robotics, STEM and agriculture matter early', url: '/news/why-robotics-stem-agriculture-matter-early' },
      { label: 'Teaching critical thinking and problem solving', url: '/news/teaching-critical-thinking-problem-solving-ethiopia' },
      { label: 'What the best STEM programmes have in common', url: '/news/stem-education-for-kids' },
      { label: 'Register your child', url: '/register' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "best kindergarten in addis ababa" (autocomplete gl=et; the SERP is directories
  // and theses, no real guide).
  {
    title: 'How to Choose the Best Kindergarten in Addis Ababa: 12 Things to Check',
    slug: 'best-kindergarten-addis-ababa',
    category: 'parent-resources',
    excerpt:
      'Every kindergarten in Addis Ababa says it is the best. Here are the 12 things that actually separate a good one from a pretty building: ratios, play, language, safety, screens and what happens after KG, with the questions to ask on a visit.',
    heroImageUrl: `${CAMP}/week3-circle-listening.webp`,
    publishedAt: '2026-10-26T06:00:00.000Z',
    meta: {
      title: 'Best Kindergarten in Addis Ababa: How to Choose',
      description:
        'The 12 checks that separate a good kindergarten in Addis Ababa from a pretty building: ratios, play, language, safety, screens and the questions to ask.',
    },
    sections: [
      {
        body: [
          {
            p: 'Ask ten parents in Addis Ababa which kindergarten is the best and you will get ten names. Most of them will be describing the building, the uniform or the fees. Very few will describe what happens inside a classroom at ten in the morning, which is the only thing that matters to a four-year-old.',
          },
          {
            p: 'This guide is the opposite of a ranking. It gives you twelve things to check, what good looks like for each one, and the exact questions to ask, so you can judge any kindergarten in the city yourself in a single visit.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-circle-listening.webp`,
            alt: 'Young children sitting in a circle on the floor listening to their teacher at the Nucleus campus in Addis Ababa',
            caption: 'Circle time on the Nucleus campus. Small groups make real conversation possible.',
          },
        ],
      },
      {
        heading: 'Why the kindergarten years matter more than they look',
        body: [
          {
            p: 'It is tempting to treat kindergarten as a warm-up before "real" school starts in Grade 1. The science says the opposite. The [Harvard Center on the Developing Child](https://developingchild.harvard.edu/science/key-concepts/brain-architecture/) reports that more than one million new neural connections form every second in the first few years of life, and that the brain is built through what researchers call serve and return: a child makes a sound, a gesture or a face, and an adult responds.',
          },
          {
            p: 'That has a very practical meaning for a school visit. A good kindergarten is one where adults talk with children all day long, not at them. You can see it from the doorway: teachers at child height, asking questions, waiting for answers.',
          },
          {
            p: 'It also matters in Ethiopia specifically. Pre-primary education has grown fast: the [World Bank](https://www.worldbank.org/en/news/feature/2023/11/02/transforming-pre-primary-education-through-political-commitment-and-community-engagement-in-afe-ethiopia) records national O-Class coverage rising from 5.3% to 44% between 2011/12 and 2021/22. Quality has not always kept pace. Research from [Addis Ababa University](https://etd.aau.edu.et/items/df332e86-76ec-41bc-b661-cb87dc2cd223) on kindergartens in the city found limited classroom materials and outdoor space, and teachers without training specific to young children. More places means more choice, and more reason to look closely.',
          },
        ],
      },
      {
        heading: 'The 12 things to check',
        body: [
          { h3: '1. How many children for each adult, in the actual room' },
          {
            p: 'Ask for the number in your child’s class, not a school-wide average. The US National Association for the Education of Young Children (NAEYC), whose accreditation standards are widely used as a benchmark, recommends roughly one adult for every 9 or 10 children aged three to five, in groups of no more than 18 to 20 ([summary of the NAEYC guidance](https://www.virtuallabschool.org/node/1411)). Fewer is better. Above that, the serve and return described above simply cannot happen for every child.',
          },
          { h3: '2. Training in early childhood, not just a teaching degree' },
          {
            p: 'Teaching three-year-olds is a specialism. Ask what early years training the class teacher has, and what training staff received this year. A school that invests in its teachers will answer immediately and with specifics.',
          },
          { h3: '3. Play that is planned, not play instead of learning' },
          {
            p: 'The [American Academy of Pediatrics](https://www.healthychildren.org/English/news/Pages/healthier-children-play-according-to-the-AAP.aspx) calls play "brain building" and goes as far as urging doctors to write a prescription for it. But good play-based learning is not children left alone with toys. Ask what a block-building or sand session is meant to teach. A good teacher will tell you: counting, comparing, turn-taking, new words.',
          },
          { h3: '4. Worksheets for three-year-olds are a warning sign' },
          {
            p: 'Many parents in Addis judge a kindergarten by how early children write and how much homework comes home. Rows of copying exercises look like progress. For three- and four-year-olds they mostly teach sitting still. Early reading and writing should grow out of talk, stories, songs and sounds, with pencil work arriving as hands become ready.',
          },
          { h3: '5. How reading actually starts' },
          {
            p: 'Ask how children learn letters. Most strong international programmes teach phonics: the sound each letter makes, then blending sounds into words. Chanting the alphabet song is not the same thing. If English is not your child’s home language, ask how the school supports that too.',
          },
          { h3: '6. Language: English, Amharic and the home language' },
          {
            p: 'Children can learn two or three languages at this age, and Addis is full of children who do. What matters is that the school has a clear plan. Ask which language is used for instruction, whether Amharic is taught, and how a child who arrives speaking neither is helped through the first weeks.',
          },
          { h3: '7. Outdoor space and how long children use it' },
          {
            p: 'The [World Health Organization](https://www.who.int/news/item/24-04-2019-to-grow-up-healthy-children-need-to-sit-less-and-play-more) recommends that children aged three and four get at least 180 minutes of physical activity spread through the day. Ask to see the outdoor area and ask how much time each class spends there. A small courtyard used well beats a large field nobody goes out to.',
          },
          { h3: '8. Screens' },
          {
            p: 'The same WHO guidance says children aged two to four should have no more than one hour of screen time a day, and less is better. A tablet room is not an advantage at this age. Ask whether screens are used, for what, and for how long.',
          },
          { h3: '9. Safety and who can collect your child' },
          {
            p: 'Ask who is allowed to collect your child and how staff check. Ask whether all staff, including drivers, guards and cleaners, have had background checks. Ask who is trained in first aid, what happens if a child is hurt, and whether any adult is ever alone with a child out of sight. These questions are normal. A good school will be glad you asked them.',
          },
          { h3: '10. Food, hygiene and rest' },
          {
            p: 'Ask what children eat, who cooks it and how allergies are handled. Look at the toilets and hand-washing stations, which tell you a great deal about a school. For younger children, ask where and when they rest.',
          },
          { h3: '11. How the school talks to you' },
          {
            p: 'Ask how you will hear about your child’s day and progress: a daily note, a weekly message, a report each term, a meeting with the teacher. Ask who you call if something worries you. Silence until the end of term is not good enough at this age.',
          },
          { h3: '12. What happens after KG' },
          {
            p: 'This is the question parents most often forget. A child who moves to a new school with a different curriculum at Grade 1 starts again with new teachers, new methods and new friends. If the kindergarten leads straight into a primary school on the same curriculum, the move to Grade 1 is a step rather than a jump.',
          },
        ],
      },
      {
        heading: 'What to watch for on the visit itself',
        body: [
          {
            p: 'Visit on a normal school morning, not an open day. Then spend ten minutes simply watching one classroom.',
          },
          {
            ul: [
              'Children’s own work on the walls, at their eye level, not shop-bought posters.',
              'A busy hum of talk, not silence and not shouting.',
              'Teachers kneeling or sitting with children, asking questions.',
              'How a crying or upset child is handled, and how quickly.',
              'Children moving between activities on their own, which shows they know the routine.',
              'Clean toilets, safe gates and staff who notice a stranger walking in.',
            ],
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-paint-hands-teacher.webp`,
            alt: 'A teacher painting handprints with a young child at a table on the Nucleus campus',
            caption: 'Adults at child height, doing the activity with the child, not supervising from a chair.',
          },
        ],
      },
      {
        heading: 'Questions parents ask about kindergartens in Addis Ababa',
        body: [
          {
            p: 'What age do children start kindergarten in Addis Ababa? Most private and international kindergartens in Addis Ababa take children from about age three, with two or three kindergarten years before Grade 1. At Nucleus, KG1 is for children aged three to four and KG2 for children aged four to five, followed by Year 1 (Grade 1) at five to six.',
          },
          {
            p: 'What is a good teacher to child ratio for kindergarten? NAEYC guidance is about one adult for every 9 or 10 children aged three to five, in groups of no more than 18 to 20. Ask for the ratio in your child’s actual classroom, not the school average, and count the adults when you visit.',
          },
          {
            p: 'Is play-based or academic kindergarten better? Planned play is better for young children. The American Academy of Pediatrics describes play as brain building, and children learn early maths, language and self-control through well-designed play. The best kindergartens combine play with clear goals, rather than replacing learning with free time or replacing play with worksheets.',
          },
          {
            p: 'How much screen time is okay in kindergarten? The World Health Organization recommends no more than one hour of screen time a day for children aged two to four, and less is better. A kindergarten does not need tablets to be modern; time outdoors, books and conversation matter far more at this age.',
          },
          {
            p: 'Should my child learn in English or Amharic at kindergarten? Young children can learn both well when the school has a clear plan for each language. Many families in Addis choose an English-medium kindergarten that also teaches Amharic, so children are ready for an international primary school without losing the language of home.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus opened its preschool at the Abo Mekanisa Campus, 100 metres from Mekanisa Abo Square, in 2022. It teaches the early years foundation stage, focused on language, numeracy, social skills and play-based learning, and leads straight into the international Cambridge curriculum through Grade 8 at our Vatican campus.',
          },
          {
            p: 'Our school-wide student to teacher ratio is 9:1. Preschool children also spend time in the agriculture lab, the music room and the STEM lab, because learning goes beyond books from the very first year.',
          },
          {
            p: 'The best way to judge us is the way this guide suggests: come on a normal morning and watch. Call +2519 81 99 99 22 to arrange a visit, or [register for Preschool or KG](/register/primary).',
          },
        ],
      },
    ],
    related: [
      { label: 'When should my child start school?', url: '/news/best-age-to-start-school' },
      { label: 'How to choose an international school in Addis Ababa', url: '/news/how-to-choose-international-school-addis-ababa' },
      { label: 'Emotional intelligence for kids', url: '/news/emotional-intelligence-for-kids' },
      { label: 'Register for Preschool and KG', url: '/register/primary' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "british curriculum vs american curriculum" (+ "which is better"). The SERP is
  // Gulf school marketing; nobody answers it for Addis.
  {
    title: 'British vs American Curriculum: Which Is Better for Your Child in Addis Ababa?',
    slug: 'british-vs-american-curriculum-addis-ababa',
    category: 'academics',
    excerpt:
      'British or American? The honest answer depends on where your child might study at 18. Here is how the two systems differ in structure, assessment, breadth and university entry, with what each really means for a family in Addis Ababa.',
    heroImageUrl: `${STOCK}/blog-expat.webp`,
    publishedAt: '2026-10-26T07:00:00.000Z',
    meta: {
      title: 'British vs American Curriculum: Which Is Better?',
      description:
        'How the British (Cambridge) and American curricula differ in structure, exams, breadth and university entry, and which suits a family in Addis Ababa.',
    },
    sections: [
      {
        body: [
          {
            p: 'Families choosing a school in Addis Ababa usually end up comparing two traditions: the British approach, which most international schools here deliver through Cambridge, and the American approach. Each side’s marketing says it is better. Neither is, in general. One of them will usually be better for your child, and the deciding question is surprisingly specific: where might your child go to university?',
          },
          {
            p: 'Here is how the two actually differ, without the brochure language.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/blog-expat.webp`,
            alt: 'The front of the Nucleus Vatican campus in Addis Ababa with its Cambridge International Education sign',
            caption: 'Most British-style international schools in Addis Ababa teach the Cambridge pathway.',
          },
        ],
      },
      {
        heading: 'The short answer',
        body: [
          {
            ul: [
              'Choose the British (Cambridge) route if you want a clear, subject-by-subject structure, external exams that mean the same thing in any country, and depth in a few subjects at 16 to 18. It suits families who may move between countries, or who are aiming at UK, European, African or Commonwealth universities.',
              'Choose the American route if your child is almost certainly heading to a US university, you value breadth for longer, and you prefer continuous assessment through the year over big end-of-stage exams.',
              'Either route can reach either destination. The difference is how much extra work the crossing takes, which is explained below.',
            ],
          },
        ],
      },
      {
        heading: 'How the years line up',
        body: [
          {
            p: 'The two systems count differently, which confuses many parents in Addis. In England a child starts Year 1 at age five to six, after a Reception year. The [UK government’s national curriculum page](https://www.gov.uk/national-curriculum) groups the years into Key Stages: Years 1 and 2 (ages 5 to 7), Years 3 to 6 (ages 7 to 11), Years 7 to 9 (ages 11 to 14) and Years 10 and 11 (ages 14 to 16), when students sit GCSEs or IGCSEs. Two more years lead to A Levels at 18.',
          },
          {
            p: 'In the United States, children start Kindergarten at about five and then move through Grades 1 to 12, which the [US National Center for Education Statistics](https://nces.ed.gov/fastfacts/display.asp?id=372) groups as kindergarten to Grade 8 and then Grades 9 to 12. As a rough rule, a British year number is one higher than the American grade for the same age: Year 2 sits alongside Grade 1, and Year 9 alongside Grade 8.',
          },
          {
            p: 'Schools in Addis Ababa label their classes in different ways, so always ask which class your child would join based on their date of birth, rather than matching names.',
          },
        ],
      },
      {
        heading: 'One curriculum versus many',
        body: [
          {
            p: 'The British side has a defined curriculum. Cambridge publishes a curriculum framework for each subject with stage-by-stage learning objectives, so a Year 4 science class in Addis is working toward the same goals as one in Lagos or Dubai.',
          },
          {
            p: 'The American side does not, which surprises many families. There is no single US national curriculum. The Common Core standards, the closest thing to one, are explicit that they "are not curricula", and adoption by states is voluntary ([Common Core FAQ](https://www.thecorestandards.org/about-the-standards/frequently-asked-questions/)). Each state, district and school builds its own. An "American curriculum" school abroad is therefore only as good as that particular school’s design, which makes a visit and a look at real student work even more important.',
          },
        ],
      },
      {
        heading: 'How children are assessed',
        body: [
          {
            p: 'British-style schools lean on external assessment at key points: progress tests during primary and lower secondary, then IGCSEs at 16 and A Levels at 18. These are set and marked outside the school, so a grade means the same thing everywhere. The trade-off is pressure at a few big moments.',
          },
          {
            p: 'American schools lean on continuous assessment. Homework, quizzes, projects and participation all feed a grade point average (GPA) built up over four years of high school, plus admissions tests such as the SAT or ACT and, for stronger students, Advanced Placement (AP) exams. The College Board currently offers [43 AP subjects](https://apcentral.collegeboard.org/courses). A bad exam day matters less; consistency all year matters more.',
          },
        ],
      },
      {
        heading: 'Breadth or depth',
        body: [
          {
            p: 'This is the real philosophical difference. An American high school student keeps studying a broad spread of subjects until graduation and specialises at university. A British-route student narrows at 16, typically to three A Levels, and studies them in real depth. The University of Warwick, for example, benchmarks its entry requirements as "typically 3 A Levels".',
          },
          {
            p: 'Neither is better. A child who knows they love the sciences may thrive with depth; a child who is still exploring may prefer breadth for longer. Note that the choice only bites at 16. Up to Year 9 or Grade 8, both systems teach a broad curriculum.',
          },
        ],
        images: [
          {
            imageUrl: `${ITC}/gp01-global-perspectives-class.webp`,
            alt: 'Secondary students working with their teacher on a research task in a Nucleus classroom',
            caption: 'Up to Year 9 both systems are broad. The fork comes at 16.',
          },
        ],
      },
      {
        heading: 'Getting into university from each route',
        body: [
          {
            p: 'This is where the decision really lives, and the details matter more than the slogans.',
          },
          { h3: 'From the British route to the United States' },
          {
            p: 'A Levels are well understood in America. [Cambridge International](https://www.cambridgeinternational.org/programmes-and-qualifications/recognition-and-acceptance/schools-and-students/) states that more than 1,000 US universities formally accept its AS and A Levels, including every Ivy League university, and that strong grades can earn up to a year of course credit. Individual universities set their own terms: the [University of Southern California](https://admission.usc.edu/academic-expectations-for-international-students/) looks for predicted A Levels of at least B in three subjects and will not admit on IGCSEs alone. Some still want an admissions test as well. [Harvard](https://college.harvard.edu/admissions/apply/international-applicants) expects the SAT or ACT and accepts A Level results instead only when a student cannot access those tests.',
          },
          { h3: 'From the American route to the UK and elsewhere' },
          {
            p: 'A US high school diploma on its own is usually not enough for selective UK universities. Warwick, for instance, asks for the diploma plus the equivalent of three A Levels, met through four or five AP exams with top scores ([Warwick entry requirements for US applicants](https://warwick.ac.uk/study/international/countryinformation/northamerica/usa/usa-entry-requirements/)). A strong American-route student can get there, but needs to plan their AP choices years ahead.',
          },
          {
            p: 'The pattern: A Levels travel to the US fairly smoothly, with a test added. The US diploma travels to the UK only when backed by APs. For a family that does not yet know which side of the Atlantic, or which continent, their child will end up on, that asymmetry is worth weighing.',
          },
        ],
      },
      {
        heading: 'What it means for families in Addis Ababa',
        body: [
          {
            ul: [
              'Diplomatic and NGO families who move every few years usually find a Cambridge school easier to transfer between, because the same frameworks run in schools in many countries.',
              'Ethiopian families thinking about universities in the UK, Europe, Canada, Africa or the Middle East are generally well served by the British route, with the US still open.',
              'Families with a firm US plan, or a child already deep in an American school, may be better staying on that route.',
              'Whichever you choose, continuity matters more than the label. Switching systems repeatedly costs a child more than either system does.',
            ],
          },
          {
            p: 'There is also a third option many Addis families weigh, the International Baccalaureate. We compare it with Cambridge in [Cambridge or IB in Addis Ababa?](/news/cambridge-vs-ib-addis-ababa), and with the Ethiopian national curriculum in [Cambridge, IB or national curriculum](/news/best-curriculum-for-your-child-ethiopia).',
          },
        ],
      },
      {
        heading: 'Questions parents ask about British and American curricula',
        body: [
          {
            p: 'Is the British or American curriculum better? Neither is better in general. The British (Cambridge) curriculum offers a defined structure, external exams and depth in a few subjects from 16, and its A Levels are widely accepted, including by more than 1,000 US universities. The American system offers breadth for longer and continuous assessment, and suits students set on a US university. The right choice depends mainly on where your child may go to university.',
          },
          {
            p: 'Do American universities accept A Levels? Yes. Cambridge International states that more than 1,000 US universities formally accept its AS and A Levels, including all Ivy League universities, and strong grades can earn up to a year of credit. Some universities, such as Harvard, still expect the SAT or ACT as well, so check each university’s international admissions page.',
          },
          {
            p: 'Can you get into a UK university with an American high school diploma? Usually only with additional exams. Selective UK universities typically ask for the diploma plus Advanced Placement results; Warwick, for example, looks for four or five AP exams with top scores as the equivalent of three A Levels.',
          },
          {
            p: 'What is the difference between Year and Grade? British schools number years from Year 1 (age five to six), while American schools start with Kindergarten at about five and then Grade 1. As a rough rule the British year number is one higher than the American grade for the same age, so Year 9 sits alongside Grade 8. Ask any school which class your child would join by date of birth.',
          },
          {
            p: 'Is the Cambridge curriculum the same as the British curriculum? Not exactly. Cambridge is an international curriculum from Cambridge University Press and Assessment, designed for schools around the world and built on the British tradition. It is not the national curriculum of England, but it follows the same broad structure and leads to IGCSEs and A Levels.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools teaches the international Cambridge curriculum from Foundation to Year 9 (Preschool to Grade 8). For the 2027/28 academic year we will open Grades 9 to 12 at our new Totot Campus in Gerji, with a Cambridge IGCSE and A Level pathway, so a child can complete the whole British route with us.',
          },
          {
            p: 'Our community includes families from Ethiopia, Canada, the United States, France, Nigeria, Turkey, India and beyond, so we have this conversation often. Call +2519 81 99 99 22 to talk it through, or read about [the Cambridge pathway at Nucleus](/cambridge-pathway).',
          },
        ],
      },
    ],
    related: [
      { label: 'Cambridge or IB in Addis Ababa?', url: '/news/cambridge-vs-ib-addis-ababa' },
      { label: 'Moving to Addis Ababa: a school guide for expat families', url: '/news/moving-to-addis-ababa-expat-school-guide' },
      { label: 'The Cambridge pathway at Nucleus', url: '/cambridge-pathway' },
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
