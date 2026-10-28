import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'
import { FAQS_B } from './expanded-faqs-b'

/**
 * Expanded rewrites of three thin posts (batch B). Slugs, categories, hero images and
 * publishedAt are unchanged from `blogs.ts`, so the ranking URLs stay put.
 *
 * Head terms:
 *  - benefits-of-international-school-addis-ababa: "benefits of international school"
 *    (also "are international schools better", "disadvantages of international schools")
 *  - private-vs-public-school-ethiopia: "private vs public school in Ethiopia"
 *  - moving-to-addis-ababa-expat-school-guide: "moving to Addis Ababa with children school"
 *    (expat and diplomat relocation, school search and enrolment)
 *
 * Sibling posts own their own terms and are linked, not re-targeted:
 * best-international-schools-addis-ababa, how-to-choose-international-school-addis-ababa, the
 * fee posts, cambridge-curriculum-ethiopia, cambridge-vs-ib-addis-ababa.
 *
 * Inline links use `[label](url)` inside `p` and `ul` strings (see `lib/lexical.ts`). External
 * facts are cited inline to a primary source. World Bank figures come from the World Bank
 * indicators API (api.worldbank.org), read 28 Oct 2026. School facts come from the 2025/26
 * prospectus only. The "Questions parents ask" section is built from FAQS_B so the visible
 * copy and the FAQ markup match word for word.
 *
 * Run: `pnpm exec cross-env NODE_OPTIONS=--no-deprecation PAYLOAD_SKIP_PUSH=1 tsx src/seed/expanded-blogs-b.ts`
 * (re-runnable: deletes by slug, then creates).
 */
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

const faqSection = (slug: string, heading: string): SeedSection => ({
  heading,
  body: FAQS_B[slug].map((f) => ({ p: `${f.q} ${f.a}` })),
})

const posts: SeedPost[] = [
  // ---------------------------------------------------------------------------------------
  // Head term: "benefits of international school".
  {
    title: 'Benefits of an International School in Addis Ababa: What Parents Get',
    slug: 'benefits-of-international-school-addis-ababa',
    category: 'parent-resources',
    excerpt:
      'What an international school really gives a child in Addis Ababa: a portable qualification, English-language teaching, smaller classes and a fuller week, plus the costs and caveats that come with them.',
    heroImageUrl: `${STOCK}/gallery-classroom.webp`,
    publishedAt: '2026-05-24T09:00:00.000Z',
    meta: {
      title: 'Benefits of International School in Addis Ababa',
      description:
        'Benefits of an international school in Addis Ababa: portable curriculum, English teaching, smaller classes and a fuller week, plus the caveats.',
    },
    sections: [
      {
        body: [
          {
            p: 'The benefits of an international school in Addis Ababa come down to four things: a curriculum that other countries recognise, teaching in English, smaller classes, and room in the week for science, music, sport and practical work. Each one is real only if the school delivers it in practice, and each comes at a price.',
          },
          {
            p: 'This guide covers what an international education gives a child here, where the claims run ahead of the evidence, and how to test a school on a visit. It is written for diplomatic and expat families, diaspora families coming home and Ethiopian parents weighing a switch from a national-curriculum school.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/gallery-classroom.webp`,
            alt: 'Children sitting on a classroom floor building and playing with construction kits at Nucleus in Addis Ababa',
            caption: 'Hands-on work on the classroom floor at Nucleus.',
          },
        ],
      },
      {
        heading: 'What “international” means, and what it does not',
        body: [
          {
            p: 'No licence controls the word. A school is international because of what it teaches and who assesses it, not because of its sign. In Addis Ababa the most common route is a Cambridge programme. Cambridge International Education says nearly two million students in 10,000 schools across 160 countries prepare for its qualifications ([Cambridge International](https://www.cambridgeinternational.org/why-choose-us/benefits-of-a-cambridge-education/)). Other schools teach the IB or the national curriculum of another country, and some blend them.',
          },
          {
            p: 'Our guides to [the Cambridge curriculum in Ethiopia](/news/cambridge-curriculum-ethiopia) and to [Cambridge or IB](/news/cambridge-vs-ib-addis-ababa) explain the two main options. The rest of this post assumes you have a school in mind and want to know what the label should deliver.',
          },
        ],
      },
      {
        heading: 'A qualification that travels',
        body: [
          {
            p: 'For most families the biggest benefit is portability. Cambridge IGCSE, taken at 14 to 16, is described by Cambridge as the world’s most popular international qualification for that age group. It offers a choice of over 70 subjects, and its standards are aligned with the GCSE taken in England ([Cambridge IGCSE](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/)).',
          },
          {
            p: 'Later qualifications carry on the same logic. Many US universities award college credit for Cambridge International AS and A Levels ([Cambridge in the USA](https://www.cambridgeinternational.org/programmes-and-qualifications/recognition-and-acceptance/country/usa)), and applicants to UK universities apply through UCAS with the same qualifications ([Cambridge in the UK](https://www.cambridgeinternational.org/programmes-and-qualifications/recognition-and-acceptance/country/uk)).',
          },
          {
            p: 'For a family on a three or four year posting, this is the practical point. A child who finishes a year in Addis Ababa can start the next in another Cambridge school without relearning the syllabus. Cambridge says of its Global Perspectives programme that each stage builds on the learner’s development “whether from a previous Cambridge stage or from another educational system” ([Cambridge Global Perspectives](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-global-perspectives/)), which is the same arrangement that makes arrivals from other systems manageable.',
          },
          {
            p: 'Nucleus International Schools is registered with Cambridge International and teaches the international Cambridge curriculum from Preschool to Grade 8 at its Abo Mekanisa and Sarbet Vatican campuses. The school plans to add Grades 9 to 12 at a new Totot Campus in Gerji for the 2027/28 academic year, with a Cambridge IGCSE and A Level pathway.',
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
        heading: 'Smaller classes and more attention',
        body: [
          {
            p: 'Smaller classes matter because they let a teacher notice who has stalled. In a very large room a child can stop following long division for weeks without anyone seeing it. In a small group the teacher sees the pencil stop.',
          },
          {
            p: 'The Nucleus prospectus gives a student-to-teacher ratio of 9:1. Treat any ratio as the start of a question rather than the answer. Does it count every adult on staff or only the lead teacher? What is the real class size at your child’s grade? The simplest test is to count heads in a classroom during a visit.',
          },
          {
            p: 'Attention is also about structure. According to its prospectus, Nucleus has a Learning Support Department that works with families and teachers on individual learning plans and on enrichment for children who need more challenge. It also runs a pastoral care programme in which each student is connected with a dedicated staff member who follows their progress and wellbeing.',
          },
        ],
      },
      {
        heading: 'Teaching in English, in a multilingual classroom',
        body: [
          {
            p: 'International schools teach in English throughout. That helps diplomatic and expat children who arrive without Amharic, and diaspora children who speak Amharic at home but have studied in English elsewhere. At Nucleus the main language of instruction is English, and the teaching staff are a mix of locally experienced and internationally qualified educators.',
          },
          {
            p: 'The prospectus lists students from Ethiopia, Canada, the United States, France, Nigeria, Turkey and India, among others. A mixed classroom is one of the quiet benefits: children meet other accents, foods and holidays as ordinary things. Ask any school how it supports the home language, whether that is Amharic or another, because a child who loses it loses something real.',
          },
        ],
      },
      {
        heading: 'Learning to think, not only to recall',
        body: [
          {
            p: 'Cambridge builds its programmes around five learner attributes: confident, responsible, reflective, innovative and engaged. It says they are built into all of its syllabuses ([Cambridge teaching and learning](https://www.cambridgeinternational.org/why-choose-us/benefits-of-a-cambridge-education/teaching-and-learning)). In a lesson that usually means children explain their reasoning, work in groups and say what they would do differently next time.',
          },
          {
            p: 'Cambridge Global Perspectives goes further. It is a skills programme for ages 5 to 19 that focuses on critical thinking, research and collaboration, using global issues where there is more than one point of view ([Cambridge Global Perspectives](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-global-perspectives/)). A school can offer every stage or only some, so ask whether it is taught at your child’s grade. Our [explainer on Global Perspectives](/news/cambridge-global-perspectives-explained) shows what a lesson looks like.',
          },
        ],
      },
      {
        heading: 'A fuller week',
        body: [
          {
            p: 'The fourth benefit is time. A national timetable can leave little room beyond the core subjects. International schools tend to build more into the week, though the range varies a great deal from school to school. The Nucleus prospectus describes:',
          },
          {
            ul: [
              'STEM labs for practical experiments and projects, and an Artificial Intelligence Lab that introduces AI concepts and tools in an age-appropriate way.',
              'Agricultural labs where children grow plants, study soil and learn about food systems.',
              'A music band, art and crafts, and a workshop for woodwork and pottery, where finished items are sold at a school stall.',
              'Basketball, football and taekwondo as part of the weekly routine.',
            ],
          },
          {
            p: 'We write more about why this matters in [hands-on learning](/news/hands-on-learning) and [STEM education for kids](/news/stem-education-for-kids). The point for a parent is to ask what happens on an ordinary Tuesday, not what is on the brochure.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/gallery-stem.webp`,
            alt: 'Two young boys stacking colourful robotics pieces together on a grid mat in a Nucleus classroom',
            caption: 'Building with a robotics kit in a Nucleus classroom.',
          },
        ],
      },
      {
        heading: 'What an international school does not guarantee',
        body: [
          {
            p: 'The honest caveats matter as much as the benefits.',
          },
          {
            ul: [
              'Cost. International schools charge more than most local schools, and the gap can be wide. We do not publish Nucleus fees in articles. They are shared by phone on +2519 81 99 99 22, and our guide to [how to compare international school fees](/news/international-school-fees-addis-ababa-2026) shows what to ask any school for.',
              'Quality. The label does not assure it. A strong local school can serve a child better than a weak international one. Our comparison of [private and public schools in Ethiopia](/news/private-vs-public-school-ethiopia) sets out the trade-offs.',
              'The way back. If your child may later re-enter the Ethiopian national system, ask the Ministry or the receiving school about grade placement, language of teaching and examinations before you commit.',
              'Fit. A child who thrives on routine and repetition may settle better in a different setting from one who thrives on discussion. Visit and watch your own child in the room.',
            ],
          },
          {
            p: 'If you are still comparing options across the city, [the best international schools in Addis Ababa](/news/best-international-schools-addis-ababa) and [how to choose an international school](/news/how-to-choose-international-school-addis-ababa) are the better places to start. They are built for comparing schools, which this post is not.',
          },
        ],
      },
      {
        heading: 'How to test the benefits on a visit',
        body: [
          {
            p: 'Take this list with you. The answers tell you more than any brochure.',
          },
          {
            ul: [
              'Which Cambridge stages, or which other programme, are taught at my child’s grade this year, not planned for later?',
              'Can I see the registration certificate from the awarding body?',
              'How many children are in the classroom I am standing in, and how many adults?',
              'What happened to last year’s leavers, and where did they go next?',
              'Who supports a child who is struggling, and who stretches a child who is ahead?',
              'Can I sit in on an ordinary lesson, not a prepared one?',
            ],
          },
          {
            p: 'If you would like to see Nucleus for yourself, you can [start a registration enquiry](/register) or call +2519 81 99 99 22 to book a tour. The prospectus says visits are welcome at any time during the academic year.',
          },
        ],
      },
      faqSection(
        'benefits-of-international-school-addis-ababa',
        'Questions parents ask about international schools',
      ),
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools teaches the international Cambridge curriculum from Preschool to Grade 8 at Abo Mekanisa and Sarbet Vatican, with STEM and AI labs, agricultural labs, music, workshop and sport built into the week. Admission is open to students of all nationalities and starts with an age-appropriate placement assessment. To begin, [register your child](/register) or see [the Cambridge pathway at Nucleus](/cambridge-pathway).',
          },
        ],
      },
    ],
    related: [
      { label: 'Private vs public school in Ethiopia', url: '/news/private-vs-public-school-ethiopia' },
      { label: 'The best international schools in Addis Ababa', url: '/news/best-international-schools-addis-ababa' },
      { label: 'How to choose an international school', url: '/news/how-to-choose-international-school-addis-ababa' },
      { label: 'Register your child', url: '/register' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "private vs public school in Ethiopia".
  {
    title: 'Private vs Public School in Ethiopia: How to Choose for Your Child',
    slug: 'private-vs-public-school-ethiopia',
    category: 'parent-resources',
    excerpt:
      'Private or government school? A balanced comparison for families in Addis Ababa, with World Bank figures on enrolment and funding, and the questions that decide which fits your child.',
    heroImageUrl: `${STOCK}/academics-hero.webp`,
    publishedAt: '2026-05-28T09:00:00.000Z',
    meta: {
      title: 'Private vs Public School in Ethiopia: A Guide',
      description:
        'Private vs public school in Ethiopia: how they differ on class size, curriculum, language, cost and exams, with World Bank data and what to ask on a visit.',
    },
    sections: [
      {
        body: [
          {
            p: 'The main differences between private and public school in Ethiopia are class size, choice of curriculum, language of teaching, facilities and cost. Public schools follow the national curriculum and charge little or no tuition. Private schools charge fees, range from national-curriculum schools to Cambridge and IB schools, and generally keep classes smaller.',
          },
          {
            p: 'Neither route wins for every child. This guide puts numbers on the national picture, sets out what each kind of school offers, and ends with the questions that decide which one fits your family.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/academics-hero.webp`,
            alt: 'The front of the Nucleus campus in Addis Ababa with Nucleus and Cambridge banners and the words Think. Create. Solve. above the ground floor',
            caption: 'A banner on the front wall is where the questions start, not where they end.',
          },
        ],
      },
      {
        heading: 'The national picture in four numbers',
        body: [
          {
            p: 'A few figures from the World Bank frame the choice. They describe the country, not any one school, and they are the latest values the World Bank series reports.',
          },
          {
            ul: [
              'Private schools enrolled about 4.4 percent of primary pupils in 2021 ([World Bank, private primary enrolment](https://data.worldbank.org/indicator/SE.PRM.PRIV.ZS?locations=ET)). Most children are not in private schools.',
              'About 22 percent of primary-school-age children were out of school in 2024 ([World Bank, out-of-school children](https://data.worldbank.org/indicator/SE.PRM.UNER.ZS?locations=ET)). Access is still the first challenge for many families.',
              'Government spending on education was about 2.3 percent of GDP in 2024 ([World Bank, education spending](https://data.worldbank.org/indicator/SE.XPD.TOTL.GD.ZS?locations=ET)).',
              'The primary pupil-teacher ratio was about 55 to 1 in 2011, the most recent year the World Bank series reports ([World Bank, pupil-teacher ratio](https://data.worldbank.org/indicator/SE.PRM.ENRL.TC.ZS?locations=ET)).',
            ],
          },
          {
            p: 'Read the last figure with care. It is a national average for primary schools, it is fifteen years old, and it says nothing about the best government school in your neighbourhood. Many families have good experiences in public schools, and the system as a whole is carrying a very large number of children.',
          },
        ],
      },
      {
        heading: 'What public schools offer',
        body: [
          {
            p: 'Public schools teach the national curriculum set by the Ministry of Education and prepare children for the national examinations. They sit in the local community, so children often walk to school with neighbours. They charge little or no tuition, which makes them the practical choice for most families.',
          },
          {
            p: 'The national curriculum has also been through reform. Cambridge describes supporting the Ministry of Education’s general education curriculum reform, including training 3,200 textbook authors, editors, designers and reviewers, in its own [Ethiopia case study](https://www.cambridge.org/partnership/case-studies/how-cambridge-supported-curriculum-reform-in-ethiopia). For current rules on grades, language of teaching and examinations, the [Ministry of Education](https://www.moe.gov.et/) is the place to check, because directives change.',
          },
          {
            p: 'If you plan for your child to take national examinations and stay in Ethiopia, a good public school is a sound choice. The route is direct, and nothing needs to be converted.',
          },
        ],
      },
      {
        heading: 'What private schools offer',
        body: [
          {
            p: 'Private schools are a mixed group. Some teach the national curriculum in smaller classes. Others teach an international curriculum such as Cambridge or the IB. Cambridge says more than 10,000 schools in 160 countries teach its programmes ([Cambridge International](https://www.cambridgeinternational.org/why-choose-us/benefits-of-a-cambridge-education/)), so a child who leaves Ethiopia can usually find a school that knows the stages.',
          },
          {
            p: 'You are paying for four things: smaller classes, a choice of curriculum, more English-language teaching and a wider week with sport, music and practical subjects. What you get depends on the school. The Nucleus prospectus gives a student-to-teacher ratio of 9:1. That is a school’s own figure for its own roll, so it is not a like-for-like comparison with the national average above, but it shows the scale of the difference some private schools aim for.',
          },
          {
            p: 'Ethiopia also classifies private schools into levels, and the level affects how much a school may raise fees. Our guide to [school levels and what they mean](/news/ethiopian-private-school-levels-explained) explains it. A level tells you about regulation. It does not tell you whether a child is happy.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/gallery-classroom.webp`,
            alt: 'Children playing and building together on a classroom floor at Nucleus in Addis Ababa',
            caption: 'A small group working on the floor at Nucleus. Ask to see a real classroom at any school you visit.',
          },
        ],
      },
      {
        heading: 'Where the real trade-offs sit',
        body: [
          { h3: 'Cost' },
          {
            p: 'Private fees vary enormously, and tuition is rarely the whole bill. Ask every school for the full first-year cost in writing, including registration, uniform, meals and transport. We do not publish Nucleus fees in articles. They are shared by phone on +2519 81 99 99 22, and our guide to [international school fees in Addis Ababa](/news/international-school-fees-addis-ababa-2026) explains how to compare. At a public school, ask what costs such as uniforms or materials apply to your child’s grade.',
          },
          { h3: 'Class size and attention' },
          {
            p: 'An average hides the spread between schools, so the national figure above cannot tell you what your child would find on the first morning. Count the children in the room, count the adults, and ask what happens when a child falls behind or runs ahead. Nucleus describes a Learning Support Department that works with families and teachers on individual learning plans, which is the kind of structure worth asking every school about, public or private.',
          },
          { h3: 'Language of teaching' },
          {
            p: 'International private schools teach in English. If your child will study at university abroad, that is an advantage. If your child is just starting to read, ask each school how the home language is supported alongside English.',
          },
          { h3: 'Direction of travel' },
          {
            p: 'Moving from a national-curriculum school into a private international school, or the other way, is possible but needs planning. Grades, subjects and language of teaching may not line up. Ask the receiving school about placement before you decide, and ask the Addis Ababa Education Bureau if you need an official view.',
          },
          { h3: 'Safety and supervision' },
          {
            p: 'This varies school by school in both sectors. On any visit, notice who is supervising the playground and how arrivals and pick-ups are handled. Do not assume either label answers it.',
          },
        ],
      },
      {
        heading: 'Five questions that settle it',
        body: [
          {
            ul: [
              'What does my child need most: structure, stimulation or extra support?',
              'Could we move abroad within the next five years? If yes, a portable curriculum matters more.',
              'How large is the class my child would actually join, and how many adults are in it?',
              'Can we pay comfortably every year, with no strain in year three?',
              'Does the school let us sit in on a normal lesson and talk to the teacher?',
            ],
          },
          {
            p: 'If the answers point toward a private international school, our guides on [which curriculum is best for your child](/news/best-curriculum-for-your-child-ethiopia) and [the benefits of an international school](/news/benefits-of-international-school-addis-ababa) go into the detail. For early years specifically, see [the best age to start school](/news/best-age-to-start-school).',
          },
        ],
      },
      faqSection(
        'private-vs-public-school-ethiopia',
        'Questions parents ask about private and public schools',
      ),
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools is a private school teaching the international Cambridge curriculum from Preschool to Grade 8 at Abo Mekanisa and Sarbet Vatican. Teaching is in English by a mix of local and internationally qualified staff, with a Learning Support Department and a pastoral care programme. Admission is open to students of all nationalities, and every child sits an age-appropriate placement assessment. To take the next step, [register your child](/register) or call +2519 81 99 99 22.',
          },
        ],
      },
    ],
    related: [
      { label: 'The real benefits of an international school', url: '/news/benefits-of-international-school-addis-ababa' },
      { label: 'Ethiopian school levels explained', url: '/news/ethiopian-private-school-levels-explained' },
      { label: 'Cambridge, IB or national curriculum', url: '/news/best-curriculum-for-your-child-ethiopia' },
      { label: 'Register your child', url: '/register' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "moving to Addis Ababa with children school".
  {
    title: 'Moving to Addis Ababa with Kids: How to Choose a School',
    slug: 'moving-to-addis-ababa-expat-school-guide',
    category: 'parent-resources',
    excerpt:
      'Relocating to Addis Ababa with children? A practical guide for diplomatic, NGO and expat families: curriculum portability, enrolment documents, mid-year starts and the questions to ask before you land.',
    heroImageUrl: `${STOCK}/blog-expat.webp`,
    publishedAt: '2026-06-06T09:00:00.000Z',
    meta: {
      title: 'Moving to Addis Ababa With Kids: School Guide',
      description:
        'Moving to Addis Ababa with kids? How to choose a school: portable curriculum, enrolment documents, mid-year starts and what to ask before you arrive.',
    },
    sections: [
      {
        body: [
          {
            p: 'If you are moving to Addis Ababa with children, choose the school before you choose the house. Pick a curriculum that matches where your child has been and where you may go next, check how the school welcomes new arrivals, and start the application as soon as your dates are firm.',
          },
          {
            p: 'This guide is written for diplomatic, NGO and expat families, and for diaspora families returning. It covers what to decide first, the documents schools ask for, how to handle a mid-year start, and what to check before you land.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/blog-expat.webp`,
            alt: 'The Cambridge International Education sign beside a Nucleus banner reading Learning Goes Beyond Books, in English and Amharic',
            caption: 'A Nucleus campus entrance in Addis Ababa.',
          },
        ],
      },
      {
        heading: 'Decide on the curriculum first',
        body: [
          {
            p: 'Curriculum comes before location because it decides how smoothly your child arrives and, later, leaves. Cambridge says nearly two million students in 10,000 schools across 160 countries prepare for its qualifications ([Cambridge International](https://www.cambridgeinternational.org/why-choose-us/benefits-of-a-cambridge-education/)). If your next posting has a Cambridge school, staying in the same programme means no gap and no repeated topics.',
          },
          {
            p: 'Cambridge also plans for children who come from elsewhere. Of its Global Perspectives programme it says each stage builds on the learner’s development “whether from a previous Cambridge stage or from another educational system” ([Cambridge Global Perspectives](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-global-perspectives/)). For older children, recognition matters at the other end. Cambridge IGCSE is accepted by leading universities and employers worldwide ([Cambridge International recognition](https://www.cambridgeinternational.org/why-choose-us/benefits-of-a-cambridge-education/international-recognition)), and Cambridge publishes guidance for applying to universities in the UK, the USA and elsewhere.',
          },
          {
            p: 'The IB is the other portable option. If you are weighing the two, [Cambridge or IB in Addis Ababa](/news/cambridge-vs-ib-addis-ababa) compares them, and [the Cambridge curriculum in Ethiopia](/news/cambridge-curriculum-ethiopia) explains the stages from age 3 to 19.',
          },
        ],
      },
      {
        heading: 'Choose by age, because the campuses differ',
        body: [
          {
            p: 'Nucleus International Schools runs two campuses in Addis Ababa, split by age. The Preschool campus is at Abo Mekanisa, 100 metres from Mekanisa Abo Square. The Grade School campus is at Sarbet Vatican, 50 metres behind the Embassy of Indonesia. The prospectus gives the entry ages: Kindergarten 1 at 3 to 4 years, Kindergarten 2 at 4 to 5, and Year 1 (Grade 1) at 5 to 6.',
          },
          {
            p: 'For the youngest children, see [the best kindergarten in Addis Ababa](/news/best-kindergarten-addis-ababa) and [the Cambridge Early Years curriculum](/news/cambridge-early-years-curriculum). For older ones, [Cambridge Primary subjects](/news/cambridge-primary-curriculum-subjects) and [Cambridge Lower Secondary](/news/cambridge-lower-secondary-curriculum) show what each stage covers.',
          },
          {
            p: 'Teenagers need a plan of their own. Nucleus currently teaches to Grade 8, and the school plans to open Grades 9 to 12 at its Totot Campus in Gerji for 2027/28, with a Cambridge IGCSE and A Level pathway. If your child will be in the IGCSE years during your posting, ask every school whether it can carry them through the exams, because moving partway through a two-year course is the hardest transfer.',
          },
        ],
      },
      {
        heading: 'Apply early, and know the documents',
        body: [
          {
            p: 'Application timelines and the number of places differ from school to school, so ask each one what it needs and how long it takes. The Nucleus prospectus sets out five steps: contact the admissions team for an application form or a campus tour, submit the form with the documents, complete an age-appropriate assessment, receive a decision, and then receive a formal offer letter with enrolment details. Admission is open to students of all nationalities.',
          },
          {
            p: 'The prospectus lists these documents. Other schools will ask for similar things, though lists differ.',
          },
          {
            ul: [
              'A completed application form.',
              'A certified copy of the birth certificate or passport.',
              'Two passport-size photographs.',
              'The most recent school report or transcript.',
              'A transfer certificate from the previous school, where applicable.',
              'Relevant medical information, including conditions, allergies or special health needs.',
              'Any documents on learning needs or support your child has had.',
            ],
          },
          {
            p: 'Gather the school report and transfer certificate before you leave your current school, because they are far easier to get while you are still there. The prospectus also encourages families to share medical and learning information openly and says doing so will not disadvantage an application.',
          },
        ],
      },
      {
        heading: 'Starting mid-year',
        body: [
          {
            p: 'Relocations rarely follow the school calendar, so ask every school the same questions about a mid-year start.',
          },
          {
            ul: [
              'Is there a place in my child’s grade now, and is there a waiting list?',
              'How is a child who arrives mid-year assessed and placed?',
              'Who is my child’s first point of contact, and how soon do they meet the class teacher?',
              'What help is there if my child is behind in one subject and ahead in another?',
            ],
          },
          {
            p: 'The Nucleus prospectus describes an orientation process once enrolment is confirmed. It may include meeting the class teacher, a school orientation, campus familiarisation, transition activities, information for parents and a welcome meeting with the admissions team. It also describes a Learning Support Department and a pastoral care programme in which each student is connected with a dedicated staff member. The admissions team can tell you what is possible for your child’s grade and dates.',
          },
        ],
      },
      {
        heading: 'Check official sources for travel, entry and residency',
        body: [
          {
            p: 'Schools cannot tell you your family’s entry or residency position, and this post does not either. Rules for dependants change, so confirm them on the official [Ethiopian eVisa site](https://www.evisa.gov.et) and with your embassy or employer before you book flights or sign a lease.',
          },
          {
            p: 'Travel advice also changes. The UK government’s [Ethiopia travel advice](https://www.gov.uk/foreign-travel-advice/ethiopia) carries regional warnings and is updated often, and other governments publish their own. Read your own government’s current advice, then ask the school how it communicates with parents during the day and what its arrangements are for pick-up and drop-off.',
          },
        ],
      },
      {
        heading: 'Visit before you land, if you can',
        body: [
          {
            p: 'The Nucleus prospectus says families are welcome to book a campus tour at any time during the academic year. If you cannot be in Addis Ababa to visit, ask whether a call with the admissions team can be arranged, and ask for the names of the people who would meet your child on the first day.',
          },
          {
            p: 'When you do visit, ask about the journey too. Traffic in Addis Ababa varies a great deal by time of day, so ask each school for realistic travel times from your neighbourhood at school-run hours before you decide where to rent. For a broader shortlist, see [the best international schools in Addis Ababa](/news/best-international-schools-addis-ababa) and [how to choose an international school](/news/how-to-choose-international-school-addis-ababa).',
          },
          {
            p: 'When you are ready, you can [register your child](/register) and the admissions team will walk you through the next steps, or call +2519 81 99 99 22.',
          },
        ],
      },
      faqSection(
        'moving-to-addis-ababa-expat-school-guide',
        'Questions parents ask about moving to Addis Ababa with children',
      ),
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools is registered with Cambridge International and teaches the international Cambridge curriculum from Preschool to Grade 8. Its prospectus says the student body includes children from Ethiopia, Canada, the United States, France, Nigeria, Turkey and India, among others, taught in English by local and internationally qualified staff. See [the benefits of an international school](/news/benefits-of-international-school-addis-ababa) for what that means in practice.',
          },
        ],
      },
    ],
    related: [
      { label: 'How to choose an international school', url: '/news/how-to-choose-international-school-addis-ababa' },
      { label: 'The best international schools in Addis Ababa', url: '/news/best-international-schools-addis-ababa' },
      { label: 'Cambridge or IB in Addis Ababa?', url: '/news/cambridge-vs-ib-addis-ababa' },
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
