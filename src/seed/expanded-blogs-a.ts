import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'
import { FAQS_A } from './expanded-faqs-a'

/**
 * Expanded rewrites, batch A (Oct 2026): three thin June posts turned into sourced,
 * search-focused articles. Slugs, categories and publish dates are unchanged so the ranking
 * URLs survive. Head terms:
 *
 *  - how-to-choose-international-school-addis-ababa : "how to choose an international school
 *    in Addis Ababa" (checklist intent). Does not re-target "best international schools".
 *  - cambridge-vs-ib-addis-ababa : "Cambridge vs IB" (head-to-head comparison). Does not
 *    re-target "British vs American curriculum" or "Cambridge curriculum in Ethiopia".
 *  - best-curriculum-for-your-child-ethiopia : "best curriculum for your child in Ethiopia"
 *    (decision framework by family situation: national, Cambridge, IB).
 *
 * External facts are cited inline to the primary source. ibo.org returns 403 to curl (bot
 * protection) and cambridge.org likewise, but the pages are real. School facts come from the
 * 2025/26 prospectus only. Fees are never quoted. The FAQ section is built from `FAQS_A`, so
 * the body and the FAQ markup are the same text by construction.
 *
 * Inline links use `[label](url)` inside `p` and `ul` strings (see `lib/lexical.ts`).
 *
 * Run: `pnpm exec tsx src/seed/expanded-blogs-a.ts` with the same env as the other seeds
 * (PAYLOAD_SKIP_PUSH=1, NODE_OPTIONS=--no-deprecation). Re-runnable: deletes by slug, then
 * creates.
 */
const STOCK = '/images/stock'
const CAMP = '/images/newsletter/summer-camp-2026'
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

const faqBlocks = (slug: string): ContentBlock[] =>
  (FAQS_A[slug] ?? []).map((f) => ({ p: `${f.q} ${f.a}` }))

const posts: SeedPost[] = [
  // ---------------------------------------------------------------------------------------
  // Head term: "how to choose an international school in Addis Ababa".
  {
    title: 'How to Choose an International School in Addis Ababa: Nine Checks',
    slug: 'how-to-choose-international-school-addis-ababa',
    category: 'parent-resources',
    excerpt:
      'Nine checks for choosing an international school in Addis Ababa, from the curriculum taught this year to safeguarding, teachers, class size and what happens after the last grade, plus the questions to ask on your tour.',
    heroImageUrl: `${STOCK}/blog-choose.webp`,
    publishedAt: '2026-06-04T09:00:00.000Z',
    meta: {
      title: 'Choose an International School in Addis Ababa',
      description:
        'How to choose an international school in Addis Ababa: nine checks on curriculum, safeguarding, teachers, class size and fit, plus tour questions.',
    },
    sections: [
      {
        body: [
          {
            p: 'To choose an international school in Addis Ababa, check nine things in order: the curriculum actually taught at your child’s grade this year, safeguarding, teacher qualifications and turnover, class size, learning support, what happens beyond the textbook, the route after the final grade, how openly the school talks about fees, and how it feels on an ordinary school day. Visit at least three schools and ask each the same questions.',
          },
          {
            p: 'Most families here arrive at that list the hard way. Diplomats and NGO staff are choosing from abroad, in a hurry. Diaspora families are comparing a school to the one they remember. Local families are weighing a switch away from the national system. This guide gives all of them the same footing.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/blog-expat.webp`,
            alt: 'The front of the Nucleus Vatican campus in Addis Ababa with its Cambridge International Education sign',
            caption: 'A sign on the gate tells you the name of a curriculum. A tour tells you whether it is taught.',
          },
        ],
      },
      {
        heading: '1. The curriculum taught at your child’s grade this year',
        body: [
          {
            p: 'Start here, because everything else depends on it. “Cambridge school” and “IB school” are loose labels. Cambridge describes itself as serving nearly two million students in 10,000 schools across 160 countries ([Cambridge International](https://www.cambridgeinternational.org/why-choose-us/benefits-of-a-cambridge-education/)), and that spread means schools differ widely in how much of the programme they really run.',
          },
          {
            p: 'Ask which stage your child will join and which subjects come from the programme. A school can be registered for one stage and teach the rest from another source. If you want the detail of how one pathway is built, read our [guide to the Cambridge curriculum in Ethiopia](/news/cambridge-curriculum-ethiopia). If you are still deciding between systems, our comparisons of [Cambridge and IB](/news/cambridge-vs-ib-addis-ababa) and [British and American curricula](/news/british-vs-american-curriculum-addis-ababa) cover that ground.',
          },
          {
            p: 'Portability is the second half of this check. Cambridge runs stages for ages 3 to 19, and the IB runs its Primary Years Programme for ages 3 to 12 ([IB Primary Years Programme](https://www.ibo.org/programmes/primary-years-programme/)) and its Diploma for ages 16 to 19 ([IB Diploma Programme](https://www.ibo.org/programmes/diploma-programme/)). If you may move, ask whether your next country’s schools run the same programme.',
          },
        ],
      },
      {
        heading: '2. Safeguarding and safety',
        body: [
          {
            p: 'For young children this is often the deciding factor, and you should feel the answer rather than read it. Look at how visitors are admitted, who collects each child, how playgrounds are supervised and where the adults stand during the day.',
          },
          {
            p: 'Then ask the policy question: who is the named safeguarding lead, what training have staff had, and what happens when a concern is raised? A school that has thought about this answers in specifics. A vague reply is information too.',
          },
        ],
      },
      {
        heading: '3. Teacher qualifications and turnover',
        body: [
          {
            p: 'Ask how many teachers hold a teaching qualification, how many have trained in the programme the school teaches, and how many left in the past two years. High turnover is common in international schools and it hurts young children most, because they attach to one adult.',
          },
          {
            p: 'A mix of local and international staff is a strength when it is deliberate. Local teachers know the context your child grows up in. International teachers bring classroom habits from other systems. Ask how the school helps the two groups work together.',
          },
        ],
      },
      {
        heading: '4. Class size and learning support',
        body: [
          {
            p: 'Raw class size matters less than the number of adults per child and how they use their time. Ask for the student-to-teacher ratio and whether it is a policy or an average. Then ask what happens when a child struggles, and when a child is ahead.',
          },
          {
            p: 'Good support is written down: a named team, a way to flag a concern early, and individual plans agreed with parents. It also covers children who need more challenge. If your child has a medical or learning need, tell the school during admissions. A school worth choosing treats that as information to plan with, not a mark against the application.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/gallery-classroom.webp`,
            alt: 'Young children working together on a learning activity on the classroom floor at Nucleus',
            caption: 'Ask to watch a class, not just see the room it happens in.',
          },
        ],
      },
      {
        heading: '5. What happens beyond the textbook',
        body: [
          {
            p: 'Science labs, robotics, music, sport, gardening and workshops shape a child as much as the timetable. The test is whether they are running. Look for tools that have been used, work on the walls that is clearly the children’s own, and a timetable that shows when these sessions happen.',
          },
          {
            p: 'Cambridge Primary, for example, builds in a strand called Thinking and Working Scientifically ([Cambridge Primary science](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/science/)), so a school with a real lab is giving that strand somewhere to happen. Ask what a Year 4 child does in the lab in a typical week.',
          },
        ],
      },
      {
        heading: '6. The route after the last grade',
        body: [
          {
            p: 'Many schools stop at Grade 6 or Grade 8. That is fine, as long as you know where your child goes next and whether the move is smooth. Ask whether the next school teaches the same programme, and whether this school helps with placement.',
          },
          {
            p: 'University recognition is the long view. UCAS, the UK application service, says there is no list of “accepted qualifications” because each university sets its own entry requirements ([UCAS](https://www.ucas.com/international/international-advisers/qualifications-advice-for-international-advisers)). Rather than trusting a school’s claim that a qualification is “accepted everywhere,” check the course pages of two or three universities your child might apply to.',
          },
        ],
      },
      {
        heading: '7. How openly the school discusses fees',
        body: [
          {
            p: 'Fees vary a great deal between international schools in Addis Ababa, and some add one-time charges on top of tuition. Ask for the complete picture in writing: tuition, registration, any capital or development fee, transport, meals and uniforms, and how much each can rise. Compare schools on the total, not the headline figure.',
          },
          {
            p: 'At Nucleus we share fees by phone on +2519 81 99 99 22, so a conversation comes first and nothing is left to a brochure. Ask every school on your list how it handles the same question.',
          },
        ],
      },
      {
        heading: '8. How the school feels on an ordinary day',
        body: [
          {
            p: 'Book a visit during term, not an open day. Watch how children greet adults, whether teachers crouch to a child’s height, what the corridors sound like at break time and whether the children look relaxed. Ask to see current student work from the year your child will join.',
          },
          {
            p: 'Take your child if you can, and watch what they notice. The shortlist in our [guide to the best international schools in Addis Ababa](/news/best-international-schools-addis-ababa) can help you decide whom to visit, and if your child is under six, [choosing a kindergarten](/news/best-kindergarten-addis-ababa) has its own checklist.',
          },
        ],
      },
      {
        heading: '9. Admissions you can understand',
        body: [
          {
            p: 'A clear process is a good sign. You should be able to find out what documents are needed, whether there is a placement assessment, how long a decision takes and what happens after an offer. Ask what the school does before your child’s first day to help them settle.',
          },
          {
            p: 'Questions to take on every tour:',
          },
          {
            ul: [
              'Which curriculum stage and subjects will my child be taught this year?',
              'Who is the safeguarding lead, and what training do staff have?',
              'How many teachers left in the last two years?',
              'What is the student-to-teacher ratio, and how does the school support a child who is behind or ahead?',
              'Where do students go after the last grade you offer?',
              'What is the full cost in writing, including one-time charges?',
            ],
          },
        ],
        images: [
          {
            imageUrl: '/images/cambridge/nucleus-cambridge-primary-certificate.webp',
            alt: 'Certificate from Cambridge International Education confirming that Nucleus International Schools is registered with Cambridge',
            caption: 'A registered school can show you its certificate. Ask for it.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools is a Cambridge certified school teaching the international Cambridge curriculum from Preschool to Grade 8. The preschool is at our Abo Mekanisa campus and the grade school at our Vatican campus in Sarbet. The student-to-teacher ratio is 9:1, and our STEM and AI labs, agricultural lab, music band, workshop and sport are part of the weekly timetable. Our Learning Support department works with families on individual plans.',
          },
          {
            p: 'Families come from Ethiopia, Canada, the United States, France, Nigeria, Turkey, India and beyond. We would rather you compare us honestly than choose us in a hurry. Book a tour through the [registration page](/register), and read the [guide for families moving to Addis Ababa](/news/moving-to-addis-ababa-expat-school-guide) if you are arriving from abroad. When you are ready, [register your child](/register).',
          },
        ],
      },
      {
        heading: 'Questions parents ask about choosing an international school',
        body: faqBlocks('how-to-choose-international-school-addis-ababa'),
      },
    ],
    related: [
      { label: 'Best international schools in Addis Ababa', url: '/news/best-international-schools-addis-ababa' },
      { label: 'Cambridge or IB in Addis Ababa?', url: '/news/cambridge-vs-ib-addis-ababa' },
      { label: 'Moving to Addis Ababa: a school guide for expat families', url: '/news/moving-to-addis-ababa-expat-school-guide' },
      { label: 'Register your child', url: '/register' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "Cambridge vs IB" (with "in Addis Ababa" as the local qualifier).
  {
    title: 'Cambridge or IB in Addis Ababa? A Parent’s Comparison',
    slug: 'cambridge-vs-ib-addis-ababa',
    category: 'academics',
    excerpt:
      'Cambridge or IB in Addis Ababa: how the two programmes differ at each age, how they are assessed, how universities treat them, and which suits which child.',
    heroImageUrl: `${STOCK}/blog-cambridge.webp`,
    publishedAt: '2026-06-02T09:00:00.000Z',
    meta: {
      title: 'Cambridge vs IB in Addis Ababa: A Parent Guide',
      description:
        'Cambridge vs IB in Addis Ababa: how the programmes differ at each age, how they are assessed, how universities treat them and which suits your child.',
    },
    sections: [
      {
        body: [
          {
            p: 'Neither Cambridge nor the IB is better in general. Cambridge offers a flexible, staged pathway with exams at about 16 and 18, and children choose their subjects. The IB asks every student to keep six subjects plus a core of essay, reflection and service going until 19. Both are respected by universities. The better fit is the one your child will do well in and your family can keep following.',
          },
          {
            p: 'One disclosure before we go on. Nucleus teaches the international Cambridge curriculum, so we are not neutral. We have written this comparison from the programmes’ own published descriptions, so that you can check every claim yourself.',
          },
        ],
        images: [
          {
            imageUrl: `${ITC}/gp01-global-perspectives-class.webp`,
            alt: 'Secondary students working with their teacher on a research task in a Nucleus classroom',
            caption: 'Up to age 14 the two systems look alike. The difference shows at 16.',
          },
        ],
      },
      {
        heading: 'The short version',
        body: [
          {
            ul: [
              'Age range: Cambridge runs from 3 to 19. The IB runs the Primary Years Programme for ages 3 to 12 ([IB](https://www.ibo.org/programmes/primary-years-programme/)), the Middle Years Programme for 11 to 16 ([IB programme overview](https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/ib-continuum-brochure-en.pdf)) and the Diploma for 16 to 19 ([IB Diploma Programme](https://www.ibo.org/programmes/diploma-programme/)).',
              'Shape: Cambridge is a series of stages, each with its own curriculum and assessments. The IB is a continuum with a distinctive, tightly specified final two years.',
              'Choice: Cambridge lets students narrow down. The IB keeps them broad.',
              'Final exams: Cambridge IGCSE at about 16 and AS and A Levels at about 18. The IB Diploma at about 18 or 19.',
            ],
          },
        ],
      },
      {
        heading: 'How they compare before age 14',
        body: [
          {
            p: 'In the primary years the two feel more alike than their reputations suggest. Both want children to ask questions, work in groups and explain their thinking. Cambridge Primary, for instance, builds in a strand called Thinking and Working Scientifically ([Cambridge Primary science](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/science/)), and the IB’s primary programme is built around inquiry.',
          },
          {
            p: 'The practical differences at this age are mostly how each school organises the day. Cambridge frameworks set out what a child should learn in each subject at each stage, so a teacher can tell you precisely what your child is working on. IB schools plan around themes that cut across subjects. Both can be taught well or badly, and the school matters more than the label. Our guide to [the Cambridge curriculum in Ethiopia](/news/cambridge-curriculum-ethiopia) shows how the Cambridge stages fit together.',
          },
        ],
      },
      {
        heading: 'Where they fork: ages 14 to 19',
        body: [
          { h3: 'Cambridge: IGCSE, then AS and A Levels' },
          {
            p: 'At 14 to 16 Cambridge students prepare for IGCSE, which Cambridge describes as the world’s most popular international qualification for this age group, with a choice of over 70 subjects in any combination ([Cambridge IGCSE](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/)). At 16 to 19 students move to Cambridge International AS and A Levels ([Cambridge Advanced](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-advanced/)). A student usually studies three or four subjects in depth, which suits a child who already knows what they want to pursue.',
          },
          { h3: 'IB: the Diploma' },
          {
            p: 'The IB Diploma is a two-year programme. Students take six subjects, with at least three and no more than four at higher level, and also complete a core: Theory of Knowledge, an extended essay of up to 4,000 words and at least 150 hours of creativity, activity and service ([IB Diploma Programme core](https://www.ibo.org/programmes/diploma-programme/curriculum/dp-core/)). The IB sets out its subject groups and how many subjects must be studied at each level in its [curriculum overview](https://www.ibo.org/programmes/diploma-programme/curriculum/). To earn the diploma a student needs a minimum of 24 points out of a possible 45 ([IB passing criteria](https://www.ibo.org/about-the-ib/what-it-means-to-be-an-ib-student/recognizing-student-achievement/about-assessment/dp-passing-criteria/)).',
          },
          {
            p: 'That breadth is the heart of the IB. A student who loves science still studies a language, a humanities subject and maths. Some children find that stretching. Others find it a grind. Be honest about which describes yours.',
          },
        ],
        images: [
          {
            imageUrl: `${ITC}/gp01-tilahun-with-student.webp`,
            alt: 'A teacher setting out research materials for a lower secondary student at Nucleus',
            caption: 'Independent research is built up step by step in both systems.',
          },
        ],
      },
      {
        heading: 'What university admissions teams do with each',
        body: [
          {
            p: 'Universities in the UK, Europe, North America and elsewhere accept both. They do not publish a ranking of one over the other. UCAS says plainly that it keeps no list of accepted qualifications because each university sets its own entry requirements for each course ([UCAS](https://www.ucas.com/international/international-advisers/qualifications-advice-for-international-advisers)). The same page notes that the IB Diploma is included in the UCAS Tariff, and that universities can choose to accept Tariff points for it.',
          },
          {
            p: 'The practical rule: pick two or three target courses or universities and read their entry requirements for both routes. A competitive course may ask for particular subjects at higher level in the IB, or particular A Level subjects, and that tells you more than any general claim.',
          },
        ],
      },
      {
        heading: 'Who tends to thrive in each',
        body: [
          {
            p: 'Cambridge tends to suit a child who:',
          },
          {
            ul: [
              'likes clear goals and knows, or will soon know, which subjects they enjoy',
              'wants to go deep rather than wide in the last two years',
              'may move between Cambridge schools, since the stages are standard',
            ],
          },
          {
            p: 'The IB tends to suit a child who:',
          },
          {
            ul: [
              'is comfortable juggling several demands at once',
              'enjoys writing, discussion and linking subjects together',
              'does not yet know a specialism and wants to keep doors open',
            ],
          },
          {
            p: 'These are tendencies, not rules. A strong, motivated child does well on either route, and a struggling child struggles on either route. What changes is where the pressure falls.',
          },
        ],
      },
      {
        heading: 'Questions to put to any school offering either',
        body: [
          {
            p: 'A programme’s name tells you little until you hear how a school runs it. Whichever you lean towards, ask the same things:',
          },
          {
            ul: [
              'Which stages or programmes does the school run today, and which are only planned?',
              'How many teachers have trained specifically in this programme?',
              'What do students do after the final year, and how does the school help with applications?',
              'Can I see a sample of real student work, such as an extended essay, a science investigation or a project portfolio?',
            ],
          },
          {
            p: 'A school proud of its programme answers quickly and shows you the evidence. A school that falls back on the logo has told you what you needed to know.',
          },
        ],
      },
      {
        heading: 'What this means in Addis Ababa',
        body: [
          {
            p: 'Both programmes exist in the city, and the right question is what is actually offered at your child’s age. The IB keeps a public directory of authorised IB World Schools at [ibo.org](https://www.ibo.org/programmes/find-an-ib-school/). For Cambridge, ask a school to show its registration certificate and tell you which stages it runs.',
          },
          {
            p: 'Also think about where your child will be at 16. If you may move, check that the next country’s schools run the same programme. If you plan to stay, check the school’s own route after the last grade. Our [guide to choosing an international school](/news/how-to-choose-international-school-addis-ababa) lists the questions, and our [overview of the best international schools in Addis Ababa](/news/best-international-schools-addis-ababa) names the options.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools is a Cambridge certified school teaching the international Cambridge curriculum from Preschool to Grade 8. We do not teach the IB. For the 2027/28 academic year we plan to open Grades 9 to 12 at our Totot campus in Gerji, on a Cambridge IGCSE and A Level pathway, so that students who start with us can finish with us.',
          },
          {
            p: 'If you are weighing the two for a young child, you have time, because the two routes only fork at about 14. See the [Cambridge pathway at Nucleus](/cambridge-pathway), or [register your child](/register) and ask our admissions team anything you want to know. Families deciding between a UK-style and a US-style system can read the [British and American curriculum comparison](/news/british-vs-american-curriculum-addis-ababa).',
          },
        ],
        images: [
          {
            imageUrl: '/images/cambridge/nucleus-cambridge-primary-certificate.webp',
            alt: 'Certificate from Cambridge International Education confirming that Nucleus International Schools is registered with Cambridge',
            caption: 'Whichever programme you choose, ask to see the school’s certificate.',
          },
        ],
      },
      {
        heading: 'Questions parents ask about Cambridge and IB',
        body: faqBlocks('cambridge-vs-ib-addis-ababa'),
      },
    ],
    related: [
      { label: 'The Cambridge curriculum in Ethiopia', url: '/news/cambridge-curriculum-ethiopia' },
      { label: 'British or American curriculum in Addis Ababa?', url: '/news/british-vs-american-curriculum-addis-ababa' },
      { label: 'How to choose an international school', url: '/news/how-to-choose-international-school-addis-ababa' },
      { label: 'Register your child', url: '/register' },
    ],
  },

  // ---------------------------------------------------------------------------------------
  // Head term: "best curriculum for your child in Ethiopia".
  {
    title: 'The Best Curriculum for Your Child in Ethiopia: A Decision Guide',
    slug: 'best-curriculum-for-your-child-ethiopia',
    category: 'academics',
    excerpt:
      'The best curriculum for your child in Ethiopia depends on where they will study next and how they learn. A decision guide to the national curriculum, Cambridge and the IB, by family situation.',
    heroImageUrl: `${STOCK}/blog-cambridge.webp`,
    publishedAt: '2026-06-01T09:00:00.000Z',
    meta: {
      title: 'Best Curriculum for Your Child in Ethiopia',
      description:
        'The best curriculum for your child in Ethiopia depends on where they study next and how they learn. Compare national, Cambridge and IB by family.',
    },
    sections: [
      {
        body: [
          {
            p: 'The best curriculum for your child in Ethiopia is the one that matches where your child will study next and how they learn. Families who plan to stay and study in Ethiopia often choose the national curriculum. Families who may move, or who want an overseas university, usually choose an international programme such as Cambridge or the IB. No curriculum is best for every child.',
          },
          {
            p: 'This guide works by family situation instead of ranking the options. Find the paragraph that sounds like you, then test it against the questions near the end.',
          },
        ],
        images: [
          {
            imageUrl: `${STOCK}/cta-about.webp`,
            alt: 'The Nucleus Vatican campus building in Addis Ababa with its Cambridge banner',
            caption: 'The curriculum is the framework. The teaching inside it is what your child feels.',
          },
        ],
      },
      {
        heading: 'Start with the question that actually decides it',
        body: [
          {
            p: 'Parents often start with “which is best?” The more useful question is “where will my child be at 16, and at 18?” A curriculum is a route, and the route should end somewhere you want to go.',
          },
          {
            p: 'Your child’s age matters too. Under about 11, any well-taught programme builds the same foundations of reading, number sense and curiosity, and a switch later is easier. The decision gets heavier from age 14, when courses and exams diverge. If your child is still small, you have more room than you think. Our guide to the [best age to start school](/news/best-age-to-start-school) covers the early years.',
          },
        ],
      },
      {
        heading: 'If you plan to stay and study in Ethiopia',
        body: [
          {
            p: 'The national curriculum is set by the Ministry of Education and leads to the national examinations. It is rooted in the local context and is generally the most affordable route. For a family that expects its children to study and work here, it is a sensible default, and quality varies by school, so visit before you decide.',
          },
          {
            p: 'Some families blend the two: an international programme in the primary years, then a decision at the end of Grade 8 about which route the secondary years should follow. Our guide to [private and public school in Ethiopia](/news/private-vs-public-school-ethiopia) and to [Ethiopian private school levels](/news/ethiopian-private-school-levels-explained) explain how the local system is organised.',
          },
          {
            p: 'Cambridge has a long record with Ethiopian education itself. Its own case study describes supporting the Ministry of Education’s general education curriculum reform, including training 3,200 textbook authors, editors, designers and reviewers ([Cambridge case study](https://www.cambridge.org/partnership/case-studies/how-cambridge-supported-curriculum-reform-in-ethiopia)). That is a point about Cambridge’s experience here, not a claim that one system outranks the other.',
          },
        ],
      },
      {
        heading: 'If you may move countries',
        body: [
          {
            p: 'Portability is the main reason diplomats, NGO staff and internationally mobile families choose an international programme. The aim is for your child to land in the next school on the same page. Cambridge runs in around 10,000 schools in 160 countries ([Cambridge International](https://www.cambridgeinternational.org/why-choose-us/benefits-of-a-cambridge-education/)), so there is a decent chance your next posting has a Cambridge school.',
          },
          {
            p: 'The IB is built for the same purpose and runs in schools around the world. Its Primary Years Programme covers ages 3 to 12 ([IB](https://www.ibo.org/programmes/primary-years-programme/)) and its Diploma ages 16 to 19 ([IB Diploma Programme](https://www.ibo.org/programmes/diploma-programme/)). Check which programmes the schools in your likely destinations run, then choose to match. Staying in one system across a move avoids a gap, and that is worth more than the difference between the systems. Our [school guide for families moving to Addis Ababa](/news/moving-to-addis-ababa-expat-school-guide) covers the arrival side.',
          },
        ],
      },
      {
        heading: 'If you want an overseas university',
        body: [
          {
            p: 'Universities treat IGCSE and A Levels, the IB Diploma and strong national results on a course-by-course basis. UCAS, the UK application service, publishes no list of accepted qualifications because each university sets its own requirements ([UCAS](https://www.ucas.com/international/international-advisers/qualifications-advice-for-international-advisers)). So choose two or three target universities and read their entry pages for each route, rather than trusting a general promise.',
          },
          {
            p: 'In practice, Cambridge IGCSE is described by Cambridge as the world’s most popular international qualification for 14 to 16 year olds, with over 70 subjects to choose from ([Cambridge IGCSE](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/)). If the IB route interests you, [Cambridge or IB in Addis Ababa?](/news/cambridge-vs-ib-addis-ababa) sets the two side by side.',
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
        heading: 'If your priority is how your child learns',
        body: [
          { h3: 'A child who needs structure' },
          {
            p: 'Clear stages and clear objectives help children who feel safer knowing what is expected. Cambridge frameworks set out what a child should learn in each subject at each stage, which also lets parents ask a precise question: what is my child working on this term?',
          },
          { h3: 'A child who thrives on connecting ideas' },
          {
            p: 'A programme built around inquiry and themes, and a school that gives children real projects, suits the child who asks why. This is a feature of how a school teaches as much as of the curriculum. Hands-on labs, workshops and a garden do the same job in any system.',
          },
          { h3: 'A child who is anxious or behind' },
          {
            p: 'Here the school matters more than the framework. Look for small groups, a named learning support team and teachers who know each child. Our guide on [how to choose an international school](/news/how-to-choose-international-school-addis-ababa) has the questions to ask.',
          },
        ],
      },
      {
        heading: 'Four mistakes families make',
        body: [
          {
            ul: [
              'Choosing by brand. A famous programme taught thinly in a weak school gives your child less than a modest programme taught well.',
              'Choosing because a friend’s child is there. Their child is not yours, and their plan may not be your plan.',
              'Planning for the final exam when your child is five. At that age, the quality of daily teaching and the warmth of the classroom count for far more than the exam board.',
              'Ignoring the school run. Addis Ababa traffic is real, and a long daily journey wears on a small child. Check the commute at drop-off time before you commit.',
            ],
          },
        ],
      },
      {
        heading: 'The practical test: five questions before you decide',
        body: [
          {
            ul: [
              'Where will my child be at 16 and 18, and does this route lead there?',
              'If we move, do schools in the likely countries run the same programme?',
              'Does the school teach the whole programme at my child’s age, or only part?',
              'Can I watch a lesson and see real student work?',
              'If this turns out wrong, how hard is it to switch, and when?',
            ],
          },
          {
            p: 'Switching is easiest early. Cambridge’s own descriptions of its stages show how each one leads into the next, and moving between schools that run the same stages is smooth. Moving between systems after about 14 takes planning, so make the call before then if you can.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools teaches the international Cambridge curriculum from Preschool to Grade 8, with Grades 9 to 12 planned at our Totot campus for 2027/28. Lessons run in English, and the curriculum sits alongside STEM and AI labs, an agricultural lab, music, a workshop and sport. If you would like to see how the framework works in a real classroom, [book a visit](/register).',
          },
          {
            p: 'We also help families decide even when the answer is not Nucleus. Read our [guide to the Cambridge curriculum in Ethiopia](/news/cambridge-curriculum-ethiopia), then call +2519 81 99 99 22 to talk it through, or [register your child](/register) to start the conversation.',
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
        heading: 'Questions parents ask about choosing a curriculum',
        body: faqBlocks('best-curriculum-for-your-child-ethiopia'),
      },
    ],
    related: [
      { label: 'Cambridge or IB in Addis Ababa?', url: '/news/cambridge-vs-ib-addis-ababa' },
      { label: 'The Cambridge curriculum in Ethiopia', url: '/news/cambridge-curriculum-ethiopia' },
      { label: 'Private or public school in Ethiopia?', url: '/news/private-vs-public-school-ethiopia' },
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
