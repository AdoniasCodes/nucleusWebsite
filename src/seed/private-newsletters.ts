import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * Hidden (unlisted) newsletters: saved as DRAFT posts whose slug starts with "private-" and
 * served at /n/<slug>. Re-runnable (deletes by slug first).
 * Run: `PAYLOAD_SKIP_PUSH=1 pnpm run seed:private-newsletters`
 */

type Sec = {
  heading: string
  style?: 'auto' | 'gallery' | 'highlight'
  body: ContentBlock[]
  images?: { imageUrl: string; alt: string; caption?: string }[]
}

const IMG = '/images/private/fd7k3q9x2m'
const p = (text: string): ContentBlock => ({ p: text })

const ISSUES: { slug: string; title: string; excerpt: string; heroImageUrl: string; publishedAt: string; sections: Sec[] }[] = [
  {
    slug: 'private-fruit-day-year-5-k7f3q9x2m4',
    title: 'Fruit Day in Year 5 (Grade 4): Learning to Eat Well',
    excerpt:
      'Year 5 (Grade 4) turned a table of fresh fruit into a lesson on healthy eating, teamwork and sharing, and finished with a fruit-eating competition.',
    heroImageUrl: `${IMG}/overview.webp`,
    publishedAt: '2026-11-20T09:00:00.000Z',
    sections: [
      {
        heading: 'A table full of questions',
        body: [
          p('Year 5 (Grade 4) celebrated Fruit Day with a fun, hands-on lesson about healthy eating and nutrition.'),
          p('Each student brought fruit from home. Grapes, strawberries, blueberries, oranges, pineapple, bananas and apples soon filled the table, and the class had plenty to talk about.'),
        ],
        images: [
          { imageUrl: `${IMG}/pineapple.webp`, alt: 'Year 5 students and teachers around a table of sliced fruit while a teacher cuts a pineapple' },
          { imageUrl: `${IMG}/smiles-table.webp`, alt: 'Smiling Year 5 students seated around a table of bananas, grapes, apples, oranges and strawberries' },
        ],
      },
      {
        heading: 'Looking closely, tasting slowly',
        style: 'gallery',
        body: [
          p('Students explored every fruit with all their senses. They compared colors, shapes, sizes and textures, then tasted and described the flavors.'),
          p('Each child shared a favorite fruit and why they liked it. Along the way they learned what each fruit gives the body, from vitamins to fiber to natural energy.'),
        ],
        images: [
          { imageUrl: `${IMG}/grapes.webp`, alt: 'A teacher helping students choose fruit from a bowl of grapes and strawberries' },
          { imageUrl: `${IMG}/blueberries.webp`, alt: 'A teacher placing blueberries on paper plates in front of three students' },
          { imageUrl: `${IMG}/strawberry-top.webp`, alt: 'Two students looking down at strawberries arranged on paper plates' },
          { imageUrl: `${IMG}/whiteboard-table.webp`, alt: 'A teacher reaching into a bowl of grapes as students gather round the fruit table' },
        ],
      },
      {
        heading: 'Sharing, teamwork and a friendly race',
        style: 'gallery',
        body: [
          p('Fruit Day was about more than food. Students took turns, shared what they brought and cheered for one another.'),
          p('The highlight was a fruit-eating competition. It brought friendly rivalry, lots of laughter and a real sense of togetherness.'),
          p('It also showed how classroom knowledge connects to everyday life. What the students learned about nutrition is something they can use at every meal.'),
        ],
        images: [
          { imageUrl: `${IMG}/strawberry-pair.webp`, alt: 'Two students getting ready for the strawberry eating challenge' },
          { imageUrl: `${IMG}/laughing.webp`, alt: 'Three students laughing at a table during the fruit competition' },
          { imageUrl: `${IMG}/yellow-dress.webp`, alt: 'A student in a yellow dress standing by the whiteboard dated Thursday 12 November 2026' },
          { imageUrl: `${IMG}/reading-corner.webp`, alt: 'Students around the fruit table in the classroom reading corner' },
        ],
      },
      {
        heading: 'Key takeaway',
        style: 'highlight',
        body: [p('Eating a variety of fruits helps us stay healthy, while sharing, teamwork and participation make learning more meaningful.')],
      },
    ],
  },
]

async function run() {
  const payload = await getPayload({ config })
  for (const i of ISSUES) {
    await payload.delete({ collection: 'posts', where: { slug: { equals: i.slug } } }).catch(() => {})
    await payload.create({
      collection: 'posts',
      draft: true,
      data: {
        title: i.title,
        slug: i.slug,
        category: 'newsletter',
        excerpt: i.excerpt,
        heroImageUrl: i.heroImageUrl,
        publishedAt: i.publishedAt,
        content: richTextFromBlocks(i.sections.flatMap((s) => s.body)) as unknown as Post['content'],
        sections: i.sections.map((s) => ({
          heading: s.heading,
          style: s.style ?? 'auto',
          body: richTextFromBlocks(s.body) as unknown as Post['content'],
          images: (s.images ?? []).map((img) => ({ imageUrl: img.imageUrl, alt: img.alt, caption: img.caption })),
        })),
        _status: 'draft',
      },
    })
    console.log('seeded private issue: /n/' + i.slug)
  }
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
