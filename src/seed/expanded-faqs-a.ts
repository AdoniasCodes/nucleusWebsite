import type { PostFaq } from '../lib/postFaqs'

/**
 * FAQ blocks for the three expanded posts in `expanded-blogs-a.ts`, keyed by slug.
 *
 * Every question and answer below is rendered word for word in the visible body of its post:
 * the seed builds the "Questions parents ask" section from this very object, so the two
 * cannot drift. Merge these into POST_FAQS in `lib/postFaqs.ts` when the posts ship.
 */
export const FAQS_A: Record<string, PostFaq[]> = {
  'how-to-choose-international-school-addis-ababa': [
    {
      q: 'How do I choose an international school in Addis Ababa?',
      a: 'Start with the curriculum your child will actually be taught this year, then check safeguarding, teacher qualifications and stability, class size, and what happens after the last grade the school offers. Visit on a normal school day, ask to see real student work, and compare at least three schools against the same list of questions.',
    },
    {
      q: 'What should I ask when touring an international school?',
      a: 'Ask which curriculum stage is taught for your child’s age today, who is responsible for safeguarding, how many teachers have left in the past two years, what the student-to-teacher ratio is, how the school supports a child who is behind or ahead, and where students go after the final grade. A confident school answers each one plainly.',
    },
    {
      q: 'What is the best age to start an international school?',
      a: 'Most families start at preschool, around age three, because a child who begins in the school’s English-language, play-based programme settles into the later years more easily. Joining later works too. Schools assess new children for placement, and a good school plans support for anyone who needs time to catch up.',
    },
    {
      q: 'How much do international schools in Addis Ababa cost?',
      a: 'Costs vary a great deal between schools, and some add one-time fees on top of tuition. Nucleus shares its fees by phone on +2519 81 99 99 22, so ask every school on your shortlist for a full written breakdown of tuition and any extra charges before you compare.',
    },
    {
      q: 'Is an international school better than a local private school?',
      a: 'Neither is better for every child. An international school teaches a curriculum recognised abroad, which matters if you may move or want an overseas university. A local private school can suit a family that plans to stay and wants the national curriculum. Match the choice to where your child will study next.',
    },
  ],
  'cambridge-vs-ib-addis-ababa': [
    {
      q: 'Is Cambridge or IB better?',
      a: 'Neither is better in general. Cambridge lets a child choose subjects in a flexible, staged pathway with exams at 16 and 18. The IB asks every student to study six subjects plus a core of essay, reflection and service until 19. The better one is the one your child will do well in and your family can keep following.',
    },
    {
      q: 'Is IB harder than Cambridge A Levels?',
      a: 'The IB Diploma is broader, because students keep six subjects, an extended essay and Theory of Knowledge going together. A Levels are narrower, usually three or four subjects studied in depth. Broad is not the same as harder, but a child who dislikes a subject cannot drop it in the IB.',
    },
    {
      q: 'Do universities prefer IB or Cambridge?',
      a: 'Universities do not rank one above the other. They set entry requirements course by course and accept both. UCAS publishes no list of accepted qualifications for this reason, so check the course page of every university your child may apply to.',
    },
    {
      q: 'Which schools in Addis Ababa teach the IB?',
      a: 'The IB lists its authorised IB World Schools in a public directory on ibo.org, so check there for the current schools in Addis Ababa and ask each one which IB programmes it runs for which ages. Nucleus teaches the international Cambridge curriculum and does not teach the IB.',
    },
    {
      q: 'Can a child switch from Cambridge to IB?',
      a: 'Yes, and the best moment is between Year 9 and Year 10, before the two systems fork at 14 to 16. Switching later is possible but harder, because a child has to catch up on different course content, assessment styles and the IB core requirements.',
    },
  ],
  'best-curriculum-for-your-child-ethiopia': [
    {
      q: 'What is the best curriculum for my child in Ethiopia?',
      a: 'There is no single best curriculum. The Ethiopian national curriculum suits families who plan to stay and study in Ethiopia. Cambridge suits families who want a structured pathway recognised worldwide. The IB suits families who want a broad programme and expect to move. Choose by where your child will study next, then by how your child learns.',
    },
    {
      q: 'Is the Cambridge curriculum better than the Ethiopian curriculum?',
      a: 'They do different jobs. The national curriculum prepares students for study and work in Ethiopia, while Cambridge is built to be portable and to lead to qualifications that universities abroad recognise. Neither is better in the abstract. The question is where your child is headed.',
    },
    {
      q: 'Can my child move between curricula?',
      a: 'Yes, and it is easiest in the early years. Moving between Cambridge schools is smooth because the stages are standard. Moving between systems is harder from age 14 onward, when course content and exams diverge. Tell the new school early so it can plan catch-up support.',
    },
    {
      q: 'Which curriculum is best for a child who may move abroad?',
      a: 'An international curriculum that other countries already run, such as Cambridge or the IB, travels best. Ask whether the new country’s schools offer the same programme, because staying in the same curriculum is what avoids a gap.',
    },
    {
      q: 'Does the curriculum matter more than the school?',
      a: 'Not usually. A strong teacher in a well-run school with a sound curriculum beats a famous curriculum in a weak school. Judge the teaching first, using what you see in classrooms, and treat the curriculum as the framework that makes it portable.',
    },
  ],
}
