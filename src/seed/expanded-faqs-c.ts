import type { PostFaq } from '../lib/postFaqs'

/**
 * FAQ blocks for the three expanded posts in `expanded-blogs-c.ts`. Every Q and A is copied word
 * for word from the visible body of that post (FAQPage markup must match the page). Merge into
 * POST_FAQS in `postFaqs.ts` when the posts ship.
 */
export const FAQS_C: Record<string, PostFaq[]> = {
  'best-age-to-start-school': [
    {
      q: 'What is the best age to start school?',
      a: 'There is no single best age. Most children do well in a play-based early years programme from about 3, and some are ready at 2. Formal primary school in the Cambridge system, Year 1, usually begins at 5. Readiness matters more than the birthday, so look at how your child separates, plays and follows simple instructions.',
    },
    {
      q: 'Is 3 too early to start school?',
      a: 'No. Cambridge designs its Early Years programme for ages 3 to 6, and a play-based programme at 3 is normal. What matters is that the day is short enough, the adults are warm, and the programme is built around play rather than worksheets.',
    },
    {
      q: 'What age is a child ready for school?',
      a: 'A child is ready when they can stay with a teacher for a morning, notice and play with other children, follow a short two-step instruction and ask an adult for help. Missing one of these at age 3 is common and not a reason to wait.',
    },
    {
      q: 'Is it better to start school later?',
      a: 'Not necessarily. Finland starts formal primary education in the year a child turns seven, so a later start can work well. The quality of the years before that line matters more than where the line is drawn.',
    },
    {
      q: 'What age do children start school in Ethiopia?',
      a: 'The government O-class is the pre-primary year for six-year-olds, and international schools using the Cambridge curriculum start early years at about 3 and Year 1 at about 5. Each school sets its own cut-off date, so ask which date it counts age from.',
    },
  ],
  'why-robotics-stem-agriculture-matter-early': [
    {
      q: 'Why is STEM education important for young children?',
      a: 'STEM gives young children a practical way to ask questions, test ideas and explain results, which is the thinking the Cambridge science and mathematics curriculum assesses. It also builds confidence with problems that have no obvious answer. Our guide to STEM education for kids covers the subject in depth.',
    },
    {
      q: 'At what age can children start learning robotics?',
      a: 'Children can start in the early primary years with floor robots and coding tiles, which teach sequencing before a child can type. Younger children can start with building and pattern games. Check that the activity matches your child’s age and that an adult guides it.',
    },
    {
      q: 'What are the benefits of teaching agriculture in schools?',
      a: 'Growing plants teaches patience, responsibility and cause and effect, and it links science to food systems. In Ethiopia it also connects learning to the largest area of employment: a World Bank report found almost three quarters of Ethiopians worked in agriculture in 2019.',
    },
    {
      q: 'Does robotics improve grades?',
      a: 'We are not aware of strong evidence that it does, and we do not claim it. Robotics gives children a real task for the planning, testing and explaining that Cambridge science and mathematics reward, so it supports those skills without guaranteeing a grade.',
    },
    {
      q: 'Is hands-on learning only for older children?',
      a: 'No. Young children learn through doing, which is why Cambridge describes its Early Years programme as play-based. The tasks should be simple and guided, and they should lead into the reading, number and science work of the school day.',
    },
  ],
  'best-cambridge-schools-addis-ababa': [
    {
      q: 'What are the best Cambridge schools in Addis Ababa?',
      a: 'There is no single best. Bingham Academy, One Planet International School and Nucleus International Schools each state on their own websites that they teach Cambridge programmes, and they differ in age range, who can enrol and ethos. Shortlist two or three and visit each on a normal school day.',
    },
    {
      q: 'Which schools in Addis Ababa teach the Cambridge curriculum?',
      a: 'From their own websites, Bingham Academy teaches it from Kindergarten to Grade 12, One Planet lists Cambridge stages from Early Years to Advanced, and Nucleus teaches the international Cambridge curriculum from Preschool to Grade 8. Other schools also appear in directories, so confirm each one with Cambridge’s school search.',
    },
    {
      q: 'Can Ethiopian children attend Cambridge schools in Addis Ababa?',
      a: 'Often yes, but it depends on the school. Nucleus enrols Ethiopian children alongside families from Canada, the United States, France, Nigeria, Turkey, India and beyond. Bingham Academy states that, under government regulations, it can only accept students who hold a foreign passport, so confirm admissions rules with each school.',
    },
    {
      q: 'How do I know if a school really teaches Cambridge?',
      a: 'Look the school up on Cambridge’s Find a Cambridge school tool, then ask which stages are taught at your child’s grade today. Cambridge notes that approved exam centres are not schools, so a centre listing alone does not show that a school teaches the curriculum.',
    },
    {
      q: 'Is a Cambridge school better than an IB school?',
      a: 'Neither is better in general. Cambridge is built from subject-by-subject stages and exams, while the IB is a single integrated diploma at the top end. The better choice depends on your child and where your family may move next.',
    },
  ],
}
