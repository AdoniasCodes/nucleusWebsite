import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * Companion SEO blogs built from the Inside the Nucleus Classroom material.
 *
 * Same division of labour as `camp-story-blogs.ts`: the newsletter issue documents one real
 * lesson, this post answers the query a parent actually types. Issue 01 of the series went
 * inside Tilahun G/Kiristose's Years 7 to 9 Global Perspectives room, so this post takes the
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
            caption: 'A Years 7 to 9 Global Perspectives session at the Nucleus campus in Mekanisa.',
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
            p: 'In our own Years 7 to 9 classroom, Tilahun G/Kiristose starts from something ordinary. A Year 7 topic is Global Brands, and it begins with a shoe, a phone or a packet of food that students already own. Where was it made? Who profits when it sells? What does the advertising do to the person watching it? What happens to an Ethiopian business competing with it?',
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
            p: 'Is Global Perspectives a real subject or an extra activity? It is a full timetabled subject with its own teacher, topics and assessment, not a club or an enrichment slot. At Nucleus it is taught across all year groups, and in Years 7 to 9 it is taught by a subject teacher.',
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
            p: 'Global Perspectives is taught across all year groups at Nucleus International Schools in Mekanisa, Addis Ababa. In Years 7 to 9 it is taught by Tilahun G/Kiristose, whose classroom is the subject of the first issue of Inside the Nucleus Classroom.',
          },
          {
            p: 'That issue has the full account: the Global Brands investigation, how a familiar product turns into a question about trade and employment, and Tilahun’s own description of what changes in a student who learns to argue from evidence.',
          },
          {
            p: 'To see it in person, or to ask what a week actually looks like, call 09 81 99 99 22.',
          },
        ],
      },
    ],
    related: [
      {
        label: 'Inside a Global Perspectives lesson, Years 7 to 9',
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
