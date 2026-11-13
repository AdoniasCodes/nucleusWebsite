import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import { POST_FAQS } from '../lib/postFaqs'
import type { Post } from '../payload-types'

/**
 * Companion SEO blogs built from the Inside the Nucleus Classroom material.
 *
 * Same division of labour as `camp-story-blogs.ts`: the newsletter issue documents one real
 * lesson, this post answers the query a parent actually types. Issue 01 of the series went
 * inside Tilahun G/Kiristose's Year 7 to Year 9 (Grade 6 to Grade 8) Global Perspectives room, so this post takes the
 * subject itself as the head term and links back to the issue for the proof.
 *
 * Cluster check: `teaching-critical-thinking-problem-solving-ethiopia` already owns the
 * generic "critical thinking at primary age" query. This post is deliberately narrower and
 * curriculum-shaped (what the Cambridge subject is, what it contains, what to ask a school),
 * so the two do not compete.
 *
 * Photos are the newsletter photographs, already optimised, so this seed adds no new files.
 * Body copy lives in `sections`; `content` carries only the internal-link row.
 *
 * Run: `PAYLOAD_SKIP_PUSH=1 pnpm run seed:classroom-blogs`
 */
const ITC = '/images/newsletter/inside-the-classroom'
const CAMP = '/images/newsletter/summer-camp-2026'

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

const faqBody = (slug: string): ContentBlock[] =>
  (POST_FAQS[slug] ?? []).map((f) => ({ p: `${f.q} ${f.a}` }))

const posts: SeedPost[] = [
  {
    title: 'Cambridge Global Perspectives Explained: What Your Child Actually Learns',
    slug: 'cambridge-global-perspectives-explained',
    category: 'academics',
    excerpt:
      'Global Perspectives appears on almost every Cambridge curriculum list and almost nobody explains it. Here is what the subject really contains, the six skills it is built on, what a lesson looks like in Addis Ababa, and what to ask a school before you believe the brochure.',
    heroImageUrl: `${ITC}/gp01-global-perspectives-class.webp`,
    publishedAt: '2026-09-21T10:00:00.000Z',
    meta: {
      title: 'Cambridge Global Perspectives Explained',
      description:
        'What Cambridge Global Perspectives really teaches, the six skills behind it, what a lesson looks like, and the questions to ask a school in Addis Ababa.',
    },
    sections: [
      {
        body: [
          {
            p: 'Global Perspectives sits on the subject list of almost every school teaching the international Cambridge curriculum, usually with one line of explanation next to it. Parents read it, recognise none of it from their own schooling, and move on to the subjects they understand.',
          },
          {
            p: 'It deserves more attention than that. Of everything on the timetable, Global Perspectives is the subject most likely to change how your child handles information for the rest of their life, and it is the one where the gap between a school that teaches it properly and a school that lists it is widest.',
          },
          {
            p: 'Here is what the subject actually contains, what a real lesson looks like, and how to tell the difference.',
          },
        ],
        images: [
          {
            imageUrl: `${ITC}/gp01-global-perspectives-class.webp`,
            alt: 'Students and their teacher working through a Global Perspectives investigation around a table in Addis Ababa',
            caption: 'A Year 7 to Year 9 (Grade 6 to Grade 8) Global Perspectives session at the Nucleus campus in Mekanisa.',
          },
        ],
      },
      {
        heading: 'It is a thinking subject, not a knowledge subject',
        body: [
          {
            p: 'Every other subject on the timetable has a body of content your child is expected to learn. Global Perspectives does not work that way. There is no list of facts to memorise for the exam, because the subject is not testing what your child knows. It is testing what your child can do with what they find.',
          },
          {
            p: 'Students take a real issue, research it, work out which sources can be trusted, compare how the issue looks to different people, build an argument from the evidence and then explain their reasoning to someone else. The topic is the vehicle. The thinking is the subject.',
          },
          {
            p: 'That is why the same subject runs all the way through a Cambridge school, from the youngest primary classes to A Level, getting harder rather than changing shape.',
          },
        ],
      },
      {
        heading: 'The six skills it is built on',
        body: [
          { p: 'At lower secondary level the subject is organised around six skills:' },
          {
            ul: [
              'Research: finding information that is relevant to a question, not just available.',
              'Analysis: taking an argument apart to see what it is actually claiming.',
              'Evaluation: judging whether a source, a claim or a piece of evidence deserves to be believed.',
              'Reflection: noticing how your own view formed and whether it has changed.',
              'Collaboration: working on a problem with people who see it differently.',
              'Communication: presenting a conclusion so that someone else can follow the reasoning.',
            ],
          },
          {
            p: 'Read that list against a job advertisement for a graduate role and it is almost the same list. That is not a coincidence, and it is the honest argument for the subject.',
          },
        ],
      },
      {
        heading: 'What a lesson actually looks like',
        body: [
          {
            p: 'A Global Perspectives lesson usually opens with a question rather than a statement. Why do people leave their home countries? Can we trust everything we read online? Do international brands help or harm Ethiopian businesses?',
          },
          {
            p: 'Students then do the work in the room: they research, they argue, they compare what they found, and they present a conclusion they can support. The teacher is not delivering an answer at the front. The teacher is keeping the reasoning honest.',
          },
          {
            p: 'In our own Year 7 to Year 9 (Grade 6 to Grade 8) classroom, Tilahun G/Kiristose starts from something ordinary. A Year 7 topic is Global Brands, and it begins with a shoe, a phone or a packet of food that students already own. Where was it made? Who profits when it sells? What does the advertising do to the person watching it? What happens to an Ethiopian business competing with it?',
          },
          {
            p: 'By the end, students are not expected to agree with each other. They are expected to explain their thinking and back it with evidence that holds.',
          },
        ],
        images: [
          {
            imageUrl: `${ITC}/gp01-tilahun-teaching-evidence.webp`,
            alt: 'A teacher working through an argument with secondary students around a table of research notes',
            caption: 'The teacher keeps the reasoning honest rather than supplying the answer.',
          },
        ],
      },
      {
        heading: 'Why this matters more here than the syllabus admits',
        body: [
          {
            p: 'Children in Addis Ababa get most of their information the same way children everywhere now do: from a phone. TikTok, YouTube, Telegram groups, forwarded screenshots and advertising dressed as news arrive faster than any adult can filter them.',
          },
          {
            p: 'A child who cannot tell a sourced claim from a confident one is not short of information. They are defenceless in front of it. The five questions Global Perspectives trains into students are the whole defence:',
          },
          {
            ul: [
              'Who produced this information?',
              'What evidence supports it?',
              'Is the source reliable?',
              'Is it fact, opinion or advertising?',
              'Is another point of view missing?',
            ],
          },
          {
            p: 'The subject also does something quieter that matters in a country as plural as Ethiopia. It makes students hold two genuine viewpoints at once, on purpose, without deciding in advance which one is stupid.',
          },
        ],
      },
      {
        heading: 'How it grows from Year 7 to Year 9',
        body: [
          {
            p: 'The subject looks deceptively similar year to year. What changes is how much of the thinking the student has to do alone.',
          },
          {
            p: 'Year 7 students start by learning to write a research question that can actually be answered, and to separate a fact from an opinion. By Year 9 the same students are expected to judge sources against each other, construct an argument that survives challenge, and propose a response to the problem rather than just describe it.',
          },
          {
            p: 'In the younger primary years the same habits are built without the vocabulary: noticing, asking, taking turns, listening to a classmate who saw it differently.',
          },
        ],
        images: [
          {
            imageUrl: `${ITC}/gp01-tilahun-with-student.webp`,
            alt: 'A teacher setting out research materials for a student in a Global Perspectives classroom',
            caption: 'The materials are ordinary. The question asked about them is not.',
            portrait: true,
          },
        ],
      },
      {
        heading: 'Questions to ask a school about Global Perspectives',
        body: [
          {
            p: 'The subject is easy to list on a prospectus and hard to teach, so ask specifically. Four questions separate the schools quickly:',
          },
          {
            ul: [
              'Who teaches it, and is it their subject or a spare period given to whoever was free?',
              'What was the last topic, and what did students actually produce at the end of it?',
              'How is it assessed, given there is no body of facts to test?',
              'Can I see the classroom, and is there student work on the walls or only posters?',
            ],
          },
          {
            p: 'A school teaching it properly answers all four in a minute. A school that lists it will move you on to something else.',
          },
        ],
      },
      {
        heading: 'How to support it at home, without knowing the syllabus',
        body: [
          {
            p: 'Parents do not need specialist knowledge for this one, which is unusual. A news story, an advertisement or a popular product is enough material for a useful conversation.',
          },
          { p: 'Three questions do most of the work:' },
          {
            ul: [
              'What evidence do you have?',
              'How do you know the source is reliable?',
              'Could another person see the issue differently?',
            ],
          },
          {
            p: 'Ask them often enough and they stop being your questions. That is the entire point of the subject.',
          },
        ],
      },
      {
        heading: 'Questions parents ask about Global Perspectives',
        body: [
          {
            p: 'What is Cambridge Global Perspectives? It is a skills-based subject in the international Cambridge curriculum in which students investigate real global and local issues rather than memorise content. They practise research, analysis, evaluation, reflection, collaboration and communication, and they are assessed on the quality of their reasoning and evidence rather than on recalled facts. It runs from the primary years through to A Level, growing in difficulty while keeping the same shape.',
          },
          {
            p: 'Is Global Perspectives a real subject or an extra activity? It is a full timetabled subject with its own teacher, topics and assessment, not a club or an enrichment slot. At Nucleus it is taught across all year groups, and in Year 7 to Year 9 (Grade 6 to Grade 8) it is taught by a subject teacher.',
          },
          {
            p: 'What topics do students study? Topics are chosen to connect international issues to a student’s own life. Ours have included global brands and trade, migration, education, food security, disease prevention, sustainability, identity, communication and scarce resources.',
          },
          {
            p: 'Will it help my child in other subjects? Yes, and this is the strongest practical argument for it. Research, source evaluation and structured argument are the same skills that carry a student through science write-ups, history essays, university study and eventually the workplace.',
          },
          {
            p: 'How can I support Global Perspectives at home? Ask your child three questions about anything they believe: what evidence do you have, how do you know the source is reliable, and could another person see this differently. No subject knowledge is required.',
          },
        ],
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Global Perspectives is taught across all year groups at Nucleus International Schools in Mekanisa, Addis Ababa. In Year 7 to Year 9 (Grade 6 to Grade 8) it is taught by Tilahun G/Kiristose, whose classroom is the subject of the first issue of Inside the Nucleus Classroom.',
          },
          {
            p: 'That issue has the full account: the Global Brands investigation, how a familiar product turns into a question about trade and employment, and Tilahun’s own description of what changes in a student who learns to argue from evidence.',
          },
          {
            p: 'To see it in person, or to ask what a week actually looks like, call +2519 81 99 99 22.',
          },
        ],
      },
    ],
    related: [
      {
        label: 'Inside a Global Perspectives lesson, Year 7 to Year 9 (Grade 6 to Grade 8)',
        url: '/newsletter/what-happens-in-a-global-perspectives-lesson',
      },
      { label: 'The Cambridge pathway at Nucleus', url: '/cambridge-pathway' },
      {
        label: 'Teaching critical thinking and problem solving in Ethiopia',
        url: '/news/teaching-critical-thinking-problem-solving-ethiopia',
      },
      { label: 'Register your child at Nucleus', url: '/register' },
    ],
  },
  {
    title: 'Inquiry-Based Learning in Primary School: What It Is and How It Works',
    slug: 'inquiry-based-learning-primary-school',
    category: 'academics',
    excerpt:
      'Inquiry-based learning means children learn by asking and investigating questions instead of only memorising answers. Here is what it is, what it looks like from Year 1 to Year 6, what the teacher actually does, and how parents can support it at home.',
    heroImageUrl: `${CAMP}/week3-classroom-session.webp`,
    publishedAt: '2026-10-26T10:00:00.000Z',
    meta: {
      title: 'Inquiry-Based Learning in Primary School',
      description:
        'What inquiry-based learning is, how it works from Year 1 to Year 6, what the teacher does, and how parents can help at home. A guide from Addis Ababa.',
    },
    sections: [
      {
        body: [
          {
            p: 'Ask a parent what their child did at school today and the answer is often a list of facts. Ask what question their child was trying to answer, and the room goes quiet. That second question is the heart of inquiry-based learning.',
          },
          {
            p: 'This guide explains what inquiry-based learning is, how it differs from the way most of us were taught, what it looks like at each age in primary school, and what you can do at home to support it. The examples come from real lessons in the international Cambridge curriculum at Nucleus International Schools in Addis Ababa.',
          },
        ],
      },
      {
        heading: 'What is inquiry-based learning?',
        body: [
          {
            p: 'Inquiry-based learning is an approach in which children learn by asking questions, investigating them and explaining what they find, rather than only receiving and repeating information. The question comes first. Knowledge is gathered on the way to answering it.',
          },
          {
            p: 'A typical inquiry has a simple shape that repeats at every age, only growing in difficulty:',
          },
          {
            ul: [
              'Notice something and ask a question about it.',
              'Find out: observe, ask people, read, measure or test.',
              'Look at what you found and decide what it shows.',
              'Listen to how other people see it.',
              'Explain your conclusion and your reasons.',
              'Reflect: did my thinking change, and what would I ask next?',
            ],
          },
        ],
      },
      {
        heading: 'How is it different from traditional teaching?',
        body: [
          {
            p: 'In a traditional lesson the teacher presents the content, the children practise it, and a test checks whether they remember it. That model works well for many things, and good schools still use it. Times tables and spelling need practice, not debate.',
          },
          {
            p: 'Inquiry adds something the traditional model does not train directly: the ability to handle a question nobody has answered for you yet. The child is not only asked what the answer is, but why they think so, how they know, and whether someone else could reasonably disagree.',
          },
          {
            p: 'Good inquiry is not a free-for-all. It is guided. Children who are simply left to discover things on their own tend to learn less, so the teacher plans the question, shapes the investigation and steps in at the right moments.',
          },
        ],
      },
      {
        heading: 'What does inquiry-based learning look like from Year 1 to Year 6?',
        body: [
          {
            p: 'In Cambridge Primary, inquiry is built most deliberately through Global Perspectives, a subject designed around six skills: research, analysis, evaluation, reflection, collaboration and communication. Here is how the same habit grows across the primary years at Nucleus.',
          },
          {
            ul: [
              'Year 1: noticing. Children sorted fruit flashcards, talked about favourites and told sweet from sour. Their teacher noticed them naming fruits they had not known before, without prompting. That is where inquiry starts: what do I know, and what is new to me?',
              'Year 2: following a chain. Children chose a favourite food and traced it back from the shop to the farm, animal or tree it came from. An ordinary meal turned into a link to a much wider world.',
              'Year 3: comparing experiences. Children studied their own journeys to school. One preferred walking to the car because of motion sickness: an observation, a comparison and a reasoned preference in one sentence.',
              'Years 4 and 5: investigating. Children start writing their own questions, using interviews and simple questionnaires, drawing conclusions from small sets of data and recognising that others may see the same issue differently.',
              'Year 6: researching a big question. One student asked, “Will AI kill us?” The lesson was not the dramatic wording but what came next: what does AI mean, which sources can be trusted, and might the answer change his mind?',
            ],
          },
          {
            p: 'The questions get bigger because the children’s ability to investigate them is growing. The full account of these lessons is in Part Two of Inside the Nucleus Classroom.',
          },
        ],
        images: [
          {
            imageUrl: `${CAMP}/week3-city-mat-build.webp`,
            alt: 'Two primary-age children at Nucleus International Schools working together on a building task on a classroom floor mat',
            caption: 'Working a problem out together, rather than being handed the answer.',
          },
        ],
      },
      {
        heading: 'What does the teacher do in an inquiry classroom?',
        body: [
          {
            p: 'More, not less. The teacher chooses a question that is worth investigating and right for the age group, plans how the children will find things out, and decides when to guide and when to leave space for a child to work something out alone.',
          },
          {
            p: 'In the lesson, the teacher’s main tools are questions: What makes you think that? How could we check? Does anyone see it differently? Cambridge lets schools choose topics that fit their students and their setting, so in Addis Ababa a lesson on food or transport starts from the children’s own lives. The topic is the starting point. The thinking skill is the purpose.',
          },
        ],
      },
      {
        heading: 'What are the benefits of inquiry-based learning?',
        body: [
          {
            ul: [
              'Children learn to ask better questions, which is the starting point of all research.',
              'They learn to check whether information is reliable, a skill that matters more every year children spend online.',
              'They learn to listen to other views without giving up their own.',
              'They learn to explain their reasons, which carries straight into science write-ups, essays and later exams.',
              'Curiosity stays alive. A child whose questions are taken seriously keeps asking them.',
            ],
          },
          {
            p: 'Progress here is less visible than a mark in Mathematics or English. Parents tend to notice it in small ways: a more thoughtful question at dinner, more patience with someone else’s opinion, a child who wonders aloud whether something online is true.',
          },
        ],
      },
      {
        heading: 'How can parents support inquiry-based learning at home?',
        body: [
          {
            ul: [
              'Answer a question with a question now and then: “What do you think? How could we find out?”',
              'Turn ordinary things into investigations. Where did this food come from? Why is the traffic worse on Mondays?',
              'When your child states an opinion, ask for the reason, kindly, and give yours.',
              'Check one thing online together and talk about whether the source is trustworthy.',
              'Praise good questions, not only right answers.',
              'Let a big question stay open for a few days. Not every answer needs to arrive tonight.',
            ],
          },
        ],
      },
      {
        heading: 'What to ask a school about inquiry-based learning',
        body: [
          {
            p: 'Many schools say they teach through inquiry. When you visit, ask to hear a real example from a recent lesson in your child’s year group, ask what the teacher does when a child asks an unexpected question, and ask how they make sure core skills such as reading and arithmetic are still practised properly. Clear, specific answers are a good sign.',
          },
          {
            p: 'If you are comparing options, our guide to choosing an international school in Addis Ababa has more questions worth asking.',
          },
        ],
      },
      {
        heading: 'Questions parents ask about inquiry-based learning',
        body: faqBody('inquiry-based-learning-primary-school'),
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools teaches the international Cambridge curriculum, including Cambridge Primary Global Perspectives from Year 1, at our campuses in Addis Ababa. As our Cambridge Coordinator Teklebrhan Tesfaye puts it, children are learning “not simply what to think about the world, but how to think about issues in the world.”',
          },
          {
            p: 'To see an inquiry lesson for yourself, call +2519 81 99 99 22 or start the registration form.',
          },
        ],
      },
    ],
    related: [
      {
        label: 'Inside Global Perspectives from Year 1 to Year 6',
        url: '/newsletter/primary-global-perspectives-year-1-to-6',
      },
      {
        label: 'Cambridge Global Perspectives explained',
        url: '/news/cambridge-global-perspectives-explained',
      },
      {
        label: 'How to choose an international school in Addis Ababa',
        url: '/news/how-to-choose-international-school-addis-ababa',
      },
      { label: 'Register your child at Nucleus', url: '/register' },
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
