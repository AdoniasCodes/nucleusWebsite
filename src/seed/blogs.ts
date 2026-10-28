import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * Seeds 5 blog posts into the Posts collection (published, with stock hero images).
 * Nine of the original posts were expanded in Oct 2026 and now live in `expanded-blogs-{a,b,c}.ts`;
 * do not re-add them here or this seed would overwrite the long versions with the old short ones.
 *
 * Run: `pnpm run seed:blogs`. Re-runnable: deletes existing posts by slug first.
 *
 * Topics chosen from seo/keyword-and-competitor-research.md (buyer-education cluster: highest E-E-A-T
 * + AEO value). Educational/guide content: no unverified Nucleus specifics asserted.
 */
type SeedPost = {
  title: string
  slug: string
  /** Optional tight SERP title/description. Falls back to title + excerpt when omitted. */
  meta?: { title: string; description: string }
  category: 'news' | 'academics' | 'admissions' | 'campus-life' | 'parent-resources'
  excerpt: string
  heroFile: string
  publishedAt: string
  body: ContentBlock[]
}

const posts: SeedPost[] = [
  {
    title: 'What International Schools in Addis Ababa Really Cost in 2026',
    slug: 'international-school-fees-addis-ababa-2026',
    category: 'admissions',
    excerpt:
      'Tuition is only part of the picture. Here is a transparent look at international school fees in Addis Ababa, including the capital fees that catch families out.',
    heroFile: 'blog-fees.webp',
    publishedAt: '2026-06-03T09:00:00.000Z',
    body: [
      { p: 'Fees are the first question most parents ask, and the hardest to get a straight answer to. International school costs in Addis Ababa span an enormous range, and the headline tuition is rarely the full story.' },
      { h2: 'The range is wide' },
      { p: 'At the top, premium IB schools can run into the millions of birr per year once one-time fees are added. Mid-range Cambridge and British schools sit well below that, and budget international options lower still. Two schools advertising similar tuition can cost very different amounts once everything is counted.' },
      { h2: 'The fees that catch families out' },
      { ul: [
        'Capital or development fees: often large, sometimes one-time, sometimes recurring.',
        'Registration and application fees, due before your child starts.',
        'Exam, materials, transport and meal charges billed separately.',
        'Currency: fees quoted in USD or euro shift with the exchange rate.',
      ] },
      { p: 'The single biggest reason families switch schools is a sudden capital-fee or tuition hike. It pays to ask for the complete fee sheet, every line, before you commit.' },
      { h2: 'Questions to ask any school about money' },
      { ul: [
        'What is the all-in first-year cost, including one-time fees?',
        'Is there a capital fee, and is it refundable?',
        'How often, and by how much, have fees risen in recent years?',
        'What is the payment schedule, and are instalments possible?',
      ] },
      { p: 'A school that answers these plainly is showing you something important: respect for families. At Nucleus we keep fees transparent and free of hidden capital-fee surprises, and you can request the full fee sheet and we will send it directly.' },
    ],
  },

  // ── Added 2026-06-10: FAQ-cluster + ranking posts from the Google "People also ask" export.
  {
    title: 'Ethiopian School “Levels” Explained: What the Categories Mean for Fees',
    slug: 'ethiopian-private-school-levels-explained',
    category: 'parent-resources',
    excerpt:
      'Confused by “Level 2, 3, 4” or “category” private schools in Addis Ababa? A plain-English guide to how Ethiopia classifies schools, and what it means for fees.',
    heroFile: 'blog-fees.webp',
    publishedAt: '2026-05-20T09:00:00.000Z',
    body: [
      { p: 'When you start comparing schools in Addis Ababa, you quickly meet terms like “Level 2,” “Level 3,” or “category” schools, and sometimes “C1 to C4.” Here is what those labels actually mean, and what they do not.' },
      { h2: 'The official system is “levels,” not “C1–C4”' },
      { p: 'The Ministry of Education classifies private schools using a national standards package, grouping them into levels (roughly 1 to 5) based on facilities, staffing and how the curriculum is delivered. In Addis Ababa, most kindergarten-to-high-school private schools fall into levels 2, 3 and 4. “C1–C4” is not the official wording, so if a school quotes it, ask exactly what they mean by it.' },
      { h2: 'What the level mainly affects: fee increases' },
      { p: 'The level matters most for how much a school is allowed to raise tuition. Reported caps in Addis have let a Level 2 kindergarten increase fees by up to around 45%, a Level 3 by up to 50%, and a Level 4 by up to 55% within the regulated framework. The exact percentages change with each directive, so treat any single figure as a guide, not gospel.' },
      { h2: 'What the level does NOT tell you' },
      { ul: [
        'Whether your child will actually be safe and happy there.',
        'Whether the curriculum (Cambridge, IB or national) fits your plans.',
        'The all-in first-year cost, once capital and registration fees are added.',
        'How qualified and stable the teaching staff are.',
      ] },
      { h2: 'How to use this when comparing schools' },
      { ul: [
        'Ask which level the school is registered under, and when it was last reviewed.',
        'Ask for the complete fee sheet: tuition plus every one-time charge.',
        'If fees are a deciding factor, confirm the current rules with the Addis Ababa Education Bureau.',
      ] },
      { p: 'A school’s level is a useful filter, not the whole story. What matters more is what you see on a visit: the safety, the teaching, and whether your child lights up. At Nucleus we keep fees transparent and are happy to walk any family through ours, line by line.' },
      { related: [
        { label: 'The real benefits of an international school', url: '/news/benefits-of-international-school-addis-ababa' },
        { label: 'What ICS costs, and the alternatives', url: '/news/ics-addis-ababa-fees-and-alternatives' },
        { label: 'How to choose an international school', url: '/news/how-to-choose-international-school-addis-ababa' },
      ] },
    ],
  },
  {
    title: 'The Best International School in Addis Ababa: A 2026 Parent’s Guide',
    slug: 'best-international-schools-addis-ababa',
    category: 'parent-resources',
    meta: {
      title: 'Best International School in Addis Ababa (2026 Guide)',
      description:
        'An honest 2026 guide to the best international schools in Addis Ababa, compared by curriculum, real all-in cost, campus safety and who each one actually suits.',
    },
    excerpt:
      'Looking for the best international school in Addis Ababa? An honest 2026 guide to every tier of the market, compared by curriculum, all-in cost and who each school actually suits.',
    heroFile: 'campus-hero.webp',
    publishedAt: '2026-06-08T09:00:00.000Z',
    body: [
      { p: '“What is the best international school in Addis Ababa?” It is the most common question we get from parents, and the honest answer is that there is no single winner. The best international school in Addis Ababa depends on your budget, your child and where your family might move next. What follows is an honest map of the whole market, including where we fit and where we do not.' },
      { p: 'If you read nothing else: shortlist three schools, visit each on a normal school day rather than an open day, and compare the total first-year cost instead of the tuition line. That process finds the right school far more reliably than any ranking.' },

      { h2: 'The premium tier' },
      { p: 'At the top sit the International Community School (ICS, following the IB and widely treated as the market ceiling, with fees quoted in USD), the German Embassy School and Bingham Academy. You are paying for elite facilities, large international faculties and long track records. Expect premium fees, usually with substantial one-time capital or development charges on top of tuition.' },
      { p: 'Best for: diplomatic and corporate-package families whose employer covers school fees, and families who want the IB specifically.' },

      { h2: 'The balanced middle' },
      { p: 'In the middle are schools such as Cambridge Academy Ethiopia, Flipper International, One Planet and Sandford, which offers a mix of curricula. These aim at international standards at more accessible, largely birr-denominated price points, with smaller international faculties than the premium tier.' },
      { p: 'Best for: families paying school fees themselves who still want a recognised international curriculum.' },

      { h2: 'Value and newer Cambridge options' },
      { p: 'Then there are newer, value-focused schools, including Nucleus, which teaches the international Cambridge curriculum at Vatican near Mekanisa from age 2 through Grade 8. This tier is built around a secure campus, holistic learning such as robotics, agriculture, music and sport, and transparent fees without surprise capital-fee jumps. Facilities are smaller than the premium tier; the trade is cost and class size.' },
      { p: 'Best for: first-time international-school families, families switching from a private national-curriculum school, and diplomatic families who want quality without premium-tier capital fees.' },

      { h2: 'How to judge any school on this list' },
      { p: 'Ranking tables do not know your child. These five checks do more work than any list:' },
      { ul: [
        'Curriculum fit and portability: Cambridge, IB or national, and whether it transfers to wherever you may go next.',
        'The all-in first-year cost: tuition plus registration, capital or development fees, transport, meals, uniform and exams.',
        'Safety and supervision: who controls the gate, what the drop-off procedure is, and whether it is written down.',
        'Class size and who is actually teaching your child’s grade this year.',
        'The commute, measured at the hour you would really be driving it.',
      ] },
      { p: 'Ask each school for the complete fee sheet in writing before you commit. A school that answers that plainly is telling you something important about how it treats families.' },

      { h2: 'Where Nucleus honestly fits' },
      { p: 'We will not pretend to out-facility ICS, and we would not want a family to choose us expecting that. What Nucleus aims to be is the best-value Cambridge option in Addis Ababa with a genuinely secure, nurturing campus, from age 2 through Grade 8 on one planned pathway. If your priority is a large international faculty and an IB diploma, another school on this list will serve you better, and we would rather say so.' },

      { h2: 'Questions parents ask most' },
      { h3: 'What is the best international school in Addis Ababa?' },
      { p: 'There is no single best international school in Addis Ababa, because the right choice depends on your budget, your child and where your family may move next. The International Community School is generally treated as the premium benchmark and prices in USD. Cambridge Academy Ethiopia, Sandford, Flipper International and One Planet sit in the balanced middle. Newer value-focused schools teaching the international Cambridge curriculum, including Nucleus at Vatican near Mekanisa, aim at international standards without premium capital fees. Shortlist three, visit each on a normal school day, and compare the all-in first-year cost rather than the headline tuition.' },
      { h3: 'How much do international schools in Addis Ababa cost?' },
      { p: 'Costs vary widely by tier. Premium schools price in foreign currency and add substantial one-time capital or development fees on top of tuition. Mid-market and value schools generally price in birr and charge lower or no capital fees. Always ask for the complete fee sheet in writing, including registration, capital or development fees, transport, meals, uniform and exam fees, then compare the total first-year figure between schools rather than the tuition line alone.' },
      { h3: 'Which international schools in Addis Ababa follow the Cambridge curriculum?' },
      { p: 'Cambridge and British-curriculum options in Addis Ababa include Cambridge Academy Ethiopia, Bingham Academy, Reach (RICE), One Planet and Nucleus International Schools, with Sandford offering a mix of curricula. Ask any school which Cambridge stages are actually being taught at your child’s grade this year, rather than which stages are planned.' },
      { h3: 'What is the difference between an international school and a private school in Ethiopia?' },
      { p: 'A private school is any fee-paying school, and most in Ethiopia teach the national curriculum. An international school teaches an internationally recognised curriculum such as Cambridge or the IB, so the qualification is understood and accepted if your family moves abroad. International schools also tend to keep classes smaller and teach in English throughout. The label is not regulated, so check which curriculum is genuinely delivered.' },
      { h3: 'Do international schools in Addis Ababa accept Ethiopian students?' },
      { p: 'Yes. Most international schools in Addis Ababa enrol a mix of Ethiopian, diplomatic and expatriate families, and Ethiopian children make up a large share of the roll at many of them. A few schools tied to a specific embassy give priority to their own nationals, so confirm admissions policy directly with each school.' },
      { h3: 'What age can my child start international school in Addis Ababa?' },
      { p: 'Most international schools in Addis Ababa begin at nursery or preschool age, typically between two and four years old, then continue through the primary years. Nucleus takes children from age 2 through Grade 8 on one planned Cambridge pathway, so the early years and what follows are built as a single journey rather than a transfer.' },

      { p: 'The only way to find your best school is to visit a few. We would be glad to be one of them.' },
      { related: [
        { label: 'The best Cambridge schools in Addis Ababa', url: '/news/best-cambridge-schools-addis-ababa' },
        { label: 'What ICS costs, and the alternatives', url: '/news/ics-addis-ababa-fees-and-alternatives' },
        { label: 'What international schools in Addis really cost', url: '/news/international-school-fees-addis-ababa-2026' },
        { label: 'How to choose an international school: a checklist', url: '/news/how-to-choose-international-school-addis-ababa' },
        { label: 'Book a visit to Nucleus', url: '/contact' },
      ] },
    ],
  },
  {
    title: 'How Much Is ICS Addis Ababa, and What Are the Alternatives?',
    slug: 'ics-addis-ababa-fees-and-alternatives',
    category: 'admissions',
    excerpt:
      'ICS is the most expensive school in Addis Ababa. Here are its 2025/26 fees in plain numbers, and the lower-cost Cambridge alternatives worth considering.',
    heroFile: 'blog-fees.webp',
    publishedAt: '2026-06-10T09:00:00.000Z',
    body: [
      { p: 'The International Community School (ICS) is Addis Ababa’s best-known and most expensive international school. If you are weighing it up, here are the published 2025/26 numbers in plain terms, plus alternatives worth a look.' },
      { h2: 'ICS fees, in plain numbers (2025/26)' },
      { ul: [
        'Early Years (3–4): about USD 11,760 half-day, around USD 19,130 full-day.',
        'Kindergarten and Grades 1–5: about USD 29,520 a year.',
        'Grades 6–8: about USD 33,480; Grades 9–12: roughly USD 35,120–36,520.',
        'A one-time capital fee of around USD 10,000 (grade-dependent), plus a USD 300 application fee.',
        'Fees are paid in USD, with small reductions from the third child onward.',
      ] },
      { p: 'These are the figures published for 2025/26; always confirm the current fees with the school, as they change every year. Even so, they show why ICS sits at the very top of the market.' },
      { h2: 'Why it costs that much' },
      { p: 'You are paying for the IB curriculum, a large international faculty, extensive facilities and strong demand from the diplomatic and corporate community. For families who need exactly that, it can be worth it.' },
      { h2: 'Lower-cost alternatives worth a look' },
      { p: 'Plenty of mid-market Cambridge and British schools deliver an international standard for a fraction of the all-in cost. Nucleus is one, teaching the international Cambridge curriculum at Vatican, near Mekanisa (age 2 to Grade 8), with transparent, birr-friendly fees and no surprise capital-fee jumps. Request our fee sheet for exact figures.' },
      { h2: 'Aim for value, not just a lower price' },
      { ul: [
        'Does the curriculum travel where you might go next?',
        'Is the campus genuinely secure and well-supervised?',
        'Are the teachers qualified and likely to stay?',
        'What is the true all-in first-year cost?',
      ] },
      { p: 'The most expensive school is not automatically the best one for your child. Compare on value, visit in person, and choose with your eyes open.' },
      { related: [
        { label: 'The best international schools in Addis Ababa', url: '/news/best-international-schools-addis-ababa' },
        { label: 'Ethiopian school “levels” explained', url: '/news/ethiopian-private-school-levels-explained' },
        { label: 'The best Cambridge schools in Addis Ababa', url: '/news/best-cambridge-schools-addis-ababa' },
      ] },
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
        ...(post.meta ? { meta: post.meta } : {}),
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
