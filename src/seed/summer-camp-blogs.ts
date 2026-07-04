import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * Seeds the two Summer Camp blog posts (published). Re-runnable — deletes by slug first.
 * Run: `npx tsx src/seed/summer-camp-blogs.ts`
 *
 * Two angles, both routing to the /summer-camp landing page:
 *  1. our-camp   → what Nucleus Summer Camp 2026 actually offers
 *  2. why-camp   → the case for summer camp, with Nucleus as the premier local choice
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
    title: 'Inside Nucleus Summer Camp 2026: Six Weeks That Actually Grow Your Child',
    slug: 'nucleus-summer-camp-2026',
    category: 'campus-life',
    excerpt:
      'Robotics, sport, music, chess and real discovery — led by qualified Cambridge educators on two secure Addis Ababa campuses. Here is exactly what your child gets at Nucleus Summer Camp 2026.',
    heroFile: 'blog-summer-camp.webp',
    publishedAt: '2026-06-20T09:00:00.000Z',
    body: [
      { p: 'The school gates close and a long Ethiopian summer opens up. Six or seven weeks is a lot of time for a child — enough to slide backwards in front of a screen, or enough to leap forward. Nucleus Summer Camp 2026 is built for the leap.' },
      { p: 'It runs from July 6 to August 12, across our Mekanisa and Vatican campuses in Addis Ababa, for children aged 4 to 14. Six weeks of real activity, real skills and real friendships — learning that never feels like school.' },
      { h2: 'What your child will actually do' },
      { p: 'Campers rotate through a full, balanced week of hands-on activities, each led by a specialist. No idle afternoons, no endless screen time — a genuine mix of mind, body and imagination:' },
      { ul: [
        'STEM Labs — experiments that make science click.',
        'Robotics — building and programming real robots, the skill of the decade.',
        'Chess — patience, strategy and focus, one move at a time.',
        'Arts & Crafts — painting, clay and mixed-media, with room to create boldly.',
        'Music Wing — voice, rhythm and keyboard for every level.',
        'Taekwondo — discipline, respect and confidence on the mat.',
        'Football, Basketball and Volleyball — coached, competitive and full of energy.',
        'Kite flying and paper aeroplanes — design, build and fly; physics you can feel.',
      ] },
      { h2: 'Led by real educators, not seasonal helpers' },
      { p: 'This is where Nucleus camp is different. Every activity is run by a qualified specialist who does this for a living. Camp Director Mandefro Melaku holds an MBA and a degree in Sport Science with a decade in youth development. Ruth Derrick leads English and language, Alice Long runs the creative and fine-arts studio, and Abby leads music and rhythm. Cambridge-aligned, warm with children, and genuinely good at what they teach.' },
      { h2: 'Safe first, fun always' },
      { p: 'Both campuses are secure and supervised, with a dedicated head of security and small, age-grouped classes so no child is lost in the crowd. Parents get peace of mind; children get a summer they talk about for months.' },
      { h2: 'More than somewhere to be' },
      { p: 'A good camp is not a place to drop the kids. It is a place they come home from taller — braver, more curious, carrying a new skill and a few new friends into the school year. That is the whole point of learning beyond books, and it is what six weeks at Nucleus is designed to give.' },
      { p: 'Places are limited per campus and the popular weeks fill first. If you want your child in the room, now is the time to reserve a spot.' },
      { related: [
        { label: 'Explore Nucleus Summer Camp & reserve a spot', url: '/summer-camp' },
        { label: 'Why summer camp is worth it for your child', url: '/news/why-your-child-should-attend-summer-camp' },
        { label: 'Why robotics, STEM and agriculture matter early', url: '/news/why-robotics-stem-agriculture-matter-early' },
      ] },
    ],
  },
  {
    title: 'Why Your Child Should Go to Summer Camp — and How to Pick a Great One in Addis Ababa',
    slug: 'why-your-child-should-attend-summer-camp',
    category: 'parent-resources',
    excerpt:
      'Summer camp is one of the highest-value things you can give a child — if you choose the right one. Here is what camp does for kids, and how to find the best summer camp in Addis Ababa.',
    heroFile: 'blog-summer-camp-why.webp',
    publishedAt: '2026-06-22T09:00:00.000Z',
    body: [
      { p: 'Every parent knows the feeling. School ends, the long break begins, and within a week the days blur into screens, snacks and boredom. The Ethiopian summer holiday is generous — which makes what a child does with it genuinely matter.' },
      { p: 'A good summer camp is one of the highest-return things you can give a child. Here is why, and how to choose one that earns the name.' },
      { h2: 'Summer learning loss is real' },
      { p: 'Children who spend weeks with no structured learning start the new year behind the ones who stayed active. It is quiet, it is gradual, and it is avoidable. Camp keeps young minds switched on — through play, not pressure.' },
      { h2: 'Camp builds what a classroom can’t' },
      { p: 'Away from desks and marks, children stretch in ways school rarely allows:' },
      { ul: [
        'Confidence — trying something new and discovering they can do it.',
        'Independence — making choices and small decisions on their own.',
        'Social skills — new friends, teamwork, and learning to lose and win well.',
        'Physical health — real movement and sport instead of a screen.',
        'Curiosity — a spark from robotics, music or art that follows them into the school year.',
      ] },
      { h2: 'The screen problem solves itself' },
      { p: 'You cannot argue a child off a tablet, but you can out-compete it. A day of robots, football and friends beats a phone every time — and it resets healthy habits that carry into September.' },
      { h2: 'How to spot a great camp (not just childcare)' },
      { p: 'Not every “summer programme” is worth your child’s time. Before you sign up anywhere in Addis Ababa, check for these:' },
      { ul: [
        'Qualified instructors who teach for a living — not seasonal minders.',
        'A secure, supervised campus with clear safety in place.',
        'Real variety — STEM and sport and arts, not one thing on repeat.',
        'Age-appropriate groups so your child is challenged at the right level.',
        'A genuine balance of learning and fun, so it enriches as well as entertains.',
      ] },
      { h2: 'The best summer camp in Addis Ababa? Our honest case' },
      { p: 'We built Nucleus Summer Camp to pass every test above. It runs July 6 to August 12 across two secure campuses (Mekanisa and Vatican) for ages 4 to 14, with robotics, STEM, chess, art, music, taekwondo and team sport — each led by a qualified, Cambridge-aligned educator. It is designed to send your child back to school in September more confident, more capable and genuinely excited to learn.' },
      { p: 'Compare it against any camp in the city. Then come and see it for yourself — and reserve your child’s place before the popular weeks fill.' },
      { related: [
        { label: 'Explore Nucleus Summer Camp & reserve a spot', url: '/summer-camp' },
        { label: 'Inside Nucleus Summer Camp 2026', url: '/news/nucleus-summer-camp-2026' },
        { label: 'How to choose a school in Addis Ababa', url: '/news/how-to-choose-international-school-addis-ababa' },
      ] },
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
        heroImageUrl: `/images/stock/${post.heroFile}`,
        content: richTextFromBlocks(post.body) as unknown as Post['content'],
        publishedAt: post.publishedAt,
        _status: 'published',
      },
    })
    console.log('seeded:', post.slug)
  }
  console.log('Done. Seeded', posts.length, 'summer camp posts.')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
