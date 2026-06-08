import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * Seeds 5 blog posts into the Posts collection (published, with stock hero images).
 * Run: `npm run seed:blogs`. Re-runnable — deletes existing posts by slug first.
 *
 * Topics chosen from seo/keyword-and-competitor-research.md (buyer-education cluster: highest E-E-A-T
 * + AEO value). Educational/guide content — no unverified Nucleus specifics asserted.
 */
type SeedPost = {
  title: string
  slug: string
  category: 'news' | 'academics' | 'admissions' | 'campus-life' | 'parent-resources'
  excerpt: string
  heroFile: string
  publishedAt: string
  body: ContentBlock[]
}

const posts: SeedPost[] = [
  {
    title: 'Cambridge or IB in Addis Ababa? How to Choose for Your Child',
    slug: 'cambridge-vs-ib-addis-ababa',
    category: 'academics',
    excerpt:
      'Addis Ababa offers both Cambridge and IB international schools. Here is a clear, parent-first look at how they differ — and which suits your child.',
    heroFile: 'blog-cambridge.jpg',
    publishedAt: '2026-06-02T09:00:00.000Z',
    body: [
      { p: 'If you are comparing international schools in Addis Ababa, you will meet two big names quickly: Cambridge and the International Baccalaureate (IB). Both are respected worldwide. Neither is automatically "better." The right one depends on your child and your plans.' },
      { h2: 'What Cambridge actually is' },
      { p: 'The Cambridge pathway runs from the early years through IGCSE and beyond. It is structured and subject-focused, with clear content and recognised exams at each stage. Children who like defined goals and steady progress tend to thrive in it, and the qualifications are accepted by universities across Europe, North America and beyond.' },
      { h2: 'What the IB emphasises' },
      { p: 'The IB leans toward inquiry, projects and connecting subjects together. It asks students to juggle several components at once and to reflect on how they learn. Families who want a broad, discussion-led style often gravitate to it.' },
      { h2: 'Which schools offer what in Addis' },
      { p: 'In Addis Ababa you will find both. Schools such as ICS and the German Embassy School follow the IB. Cambridge and British-curriculum options include Cambridge Academy Ethiopia, Bingham Academy, Reach (RICE) and One Planet, while Sandford offers a mix. Nucleus follows the Cambridge pathway from age 2 through Grade 8.' },
      { h2: 'A simple way to decide' },
      { ul: [
        'Does your child prefer clear targets and exams, or projects and discussion?',
        'Where might you move next — and which qualification travels best there?',
        'What does the school actually offer at your child’s age, today?',
        'Can you visit, see a class in session, and meet the teachers?',
      ] },
      { p: 'Whatever you choose, visit in person. A tour tells you more in an hour than a brochure does in a week.' },
    ],
  },
  {
    title: 'What International Schools in Addis Ababa Really Cost in 2026',
    slug: 'international-school-fees-addis-ababa-2026',
    category: 'admissions',
    excerpt:
      'Tuition is only part of the picture. Here is a transparent look at international school fees in Addis Ababa — including the capital fees that catch families out.',
    heroFile: 'blog-fees.jpg',
    publishedAt: '2026-06-03T09:00:00.000Z',
    body: [
      { p: 'Fees are the first question most parents ask, and the hardest to get a straight answer to. International school costs in Addis Ababa span an enormous range, and the headline tuition is rarely the full story.' },
      { h2: 'The range is wide' },
      { p: 'At the top, premium IB schools can run into the millions of birr per year once one-time fees are added. Mid-range Cambridge and British schools sit well below that, and budget international options lower still. Two schools advertising similar tuition can cost very different amounts once everything is counted.' },
      { h2: 'The fees that catch families out' },
      { ul: [
        'Capital or development fees — often large, sometimes one-time, sometimes recurring.',
        'Registration and application fees, due before your child starts.',
        'Exam, materials, transport and meal charges billed separately.',
        'Currency: fees quoted in USD or euro shift with the exchange rate.',
      ] },
      { p: 'The single biggest reason families switch schools is a sudden capital-fee or tuition hike. It pays to ask for the complete fee sheet — every line — before you commit.' },
      { h2: 'Questions to ask any school about money' },
      { ul: [
        'What is the all-in first-year cost, including one-time fees?',
        'Is there a capital fee, and is it refundable?',
        'How often, and by how much, have fees risen in recent years?',
        'What is the payment schedule, and are instalments possible?',
      ] },
      { p: 'A school that answers these plainly is showing you something important: respect for families. At Nucleus we keep fees transparent and free of hidden capital-fee surprises — you can request the full fee sheet and we will send it directly.' },
    ],
  },
  {
    title: 'How to Choose an International School in Addis Ababa: A Parent’s Checklist',
    slug: 'how-to-choose-international-school-addis-ababa',
    category: 'parent-resources',
    excerpt:
      'A practical, no-nonsense checklist for choosing an international school in Addis Ababa — from curriculum and safety to the questions to ask on your tour.',
    heroFile: 'blog-choose.jpg',
    publishedAt: '2026-06-04T09:00:00.000Z',
    body: [
      { p: 'Choosing a school is one of the bigger decisions a family makes, and it is easy to be swayed by a glossy website. Here is a checklist to keep you focused on what matters.' },
      { h2: '1. Curriculum and portability' },
      { p: 'Decide whether you want Cambridge, IB or another system, and check it travels to wherever you might go next. Ask which curriculum is actually taught at your child’s grade today — not what is planned.' },
      { h2: '2. Safety and safeguarding' },
      { p: 'For young children this often matters most. Look at access control, supervision and how the school talks about safeguarding. You should feel the answer, not just read it.' },
      { h2: '3. Teachers' },
      { p: 'Ask about teacher qualifications, how many are international or multilingual, and how long they stay. Stable, certified staff are a strong signal.' },
      { h2: '4. Beyond academics' },
      { p: 'Robotics, science, sport, music, agriculture, nutrition — the "extras" shape a child as much as the textbooks. See what is real and running, not just listed.' },
      { h2: '5. The visit' },
      { ul: [
        'Can you tour during a normal school day and see real classes?',
        'Are the children engaged and at ease?',
        'Do the staff answer money and safety questions directly?',
        'Does your child light up when they imagine being there?',
      ] },
      { p: 'Trust the tour. A school worth choosing will welcome your questions and let you see it in motion.' },
    ],
  },
  {
    title: 'Beyond the Classroom: Why Robotics, STEM and Agriculture Matter Early',
    slug: 'why-robotics-stem-agriculture-matter-early',
    category: 'campus-life',
    excerpt:
      'Hands-on learning is not a luxury add-on. Here is why robotics, STEM and growing things belong in a child’s education from the start.',
    heroFile: 'blog-beyond.jpg',
    publishedAt: '2026-06-05T09:00:00.000Z',
    body: [
      { p: 'Ask a child what they did at school and "we built a robot" or "my seeds sprouted" beats "we copied notes" every time. That excitement is not a distraction from learning. It is learning.' },
      { h2: 'Why hands-on works' },
      { p: 'When children make something — a circuit, a program, a garden bed — they meet real problems and solve them. They learn that effort and iteration pay off. Those habits carry into reading, maths and everything after.' },
      { h2: 'Robotics and STEM' },
      { p: 'Coding and robotics teach logic, sequencing and resilience. A program that does not work is not a failure; it is a puzzle. Children who grow up debugging grow up unafraid of hard problems.' },
      { h2: 'Agriculture and animal care' },
      { p: 'Tending plants and animals teaches patience, responsibility and a feel for cause and effect that no screen can. It is science you can hold — and it slows childhood down in the best way.' },
      { h2: 'The point' },
      { p: 'A full education reaches beyond the notebook. The aim is not just good marks; it is a curious, capable child who can think, create and solve. That is the whole idea behind learning beyond books.' },
    ],
  },
  {
    title: 'Moving to Addis Ababa? A Diplomat and Expat Family’s Guide to Schooling',
    slug: 'moving-to-addis-ababa-expat-school-guide',
    category: 'parent-resources',
    excerpt:
      'Relocating to Addis Ababa with children? Here is what diplomatic and expat families should know about choosing a school that travels with you.',
    heroFile: 'blog-expat.jpg',
    publishedAt: '2026-06-06T09:00:00.000Z',
    body: [
      { p: 'Relocating with children adds a layer to every decision. School is often the one that decides whether the whole posting feels right. A few things matter more in Addis than anywhere else.' },
      { h2: 'Portability comes first' },
      { p: 'If your family moves on a three- or four-year cycle, choose a curriculum that transfers cleanly — Cambridge or IB — so your child can pick up where they left off in the next country.' },
      { h2: 'Security and reassurance' },
      { p: 'For families new to the city, a secure, supervised campus is non-negotiable. Ask exactly how access is controlled and how the school communicates with parents during the day.' },
      { h2: 'Community and language' },
      { p: 'International and multilingual staff, and a mix of nationalities, help a child settle fast. Ask how the school welcomes mid-year arrivals — because relocations rarely follow the school calendar.' },
      { h2: 'Practical questions for relocating families' },
      { ul: [
        'Can my child start mid-term, and how is that handled?',
        'Which neighbourhoods do most families commute from?',
        'What documents do you need to enrol?',
        'Can we tour before we arrive, in person or virtually?',
      ] },
      { p: 'Nucleus sits in Mekanisa, within reach of Bole, Old Airport and Kazanchis, and welcomes diplomatic and expat families. If you are planning a move, reach out early — the best time to arrange a visit is before you land.' },
    ],
  },
]

const run = async () => {
  const payload = await getPayload({ config })
  for (const post of posts) {
    await payload.delete({ collection: 'posts', where: { slug: { equals: post.slug } } }).catch(() => {})

    // Use the local stock image directly (no Media/S3 upload needed for the demo).
    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        category: post.category,
        excerpt: post.excerpt,
        heroImageUrl: `/images/stock/${post.heroFile}`,
        content: richTextFromBlocks(post.body) as unknown as Post['content'],
        publishedAt: post.publishedAt,
        _status: 'published',
      },
    })
    console.log('seeded:', post.slug)
  }
  console.log('Done. Seeded', posts.length, 'posts.')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
