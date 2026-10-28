import type { PostFaq } from '../lib/postFaqs'

/**
 * FAQs for the three expanded posts in `expanded-blogs-b.ts`, keyed by slug. The seed builds the
 * visible "Questions parents ask" section from this same object, so each question and answer
 * appears in the body word for word, as `postFaqs.ts` requires. Keep answers free of links.
 *
 * To go live, spread FAQS_B into POST_FAQS in `lib/postFaqs.ts`.
 */
export const FAQS_B: Record<string, PostFaq[]> = {
  'benefits-of-international-school-addis-ababa': [
    {
      q: 'What are the benefits of an international school?',
      a: 'The main benefits are a curriculum that other countries recognise, teaching in English, smaller classes, an emphasis on thinking and discussion over memorising, and a wider programme of sport, music, science and practical work. For families who may move, portability is usually the biggest gain. The benefits depend on the school delivering them, so check class sizes, the stages actually taught and what a normal week looks like on a visit.',
    },
    {
      q: 'Are international schools better than local schools?',
      a: 'Not automatically. A strong local school can serve a child better than a weak international one, and the word international is not a regulated label. International schools usually offer a portable qualification, English-language teaching and smaller classes. Local schools offer the national curriculum, a direct route into Ethiopian national examinations and, often, a lower cost. The better school is the one that fits your child and your plans.',
    },
    {
      q: 'Is an international school worth the money?',
      a: 'It is worth it when your family will use what it offers: a qualification that travels, an education in English and individual attention. It is harder to justify if you are certain to stay in the national system and your child is thriving there. Compare the full first-year cost at each school, not only tuition. Nucleus shares its fees by phone on +2519 81 99 99 22.',
    },
    {
      q: 'What are the disadvantages of international schools?',
      a: 'Cost is the main one, and it varies widely between schools. Some children also find a later move back into a national-curriculum school harder, because the subjects, the language of teaching and the exams differ. International school communities can be transient, with classmates leaving every year. Ask how a school handles home-language support and what happens if your child returns to the Ethiopian system.',
    },
    {
      q: 'How can I tell if a school is genuinely international?',
      a: 'Ask which curriculum is taught at your child’s grade this year, who assesses it and whether the school is registered with the awarding body. Ask to see the registration certificate, meet the teacher who would teach your child and sit in on an ordinary lesson. A name or a logo on the gate is not evidence.',
    },
  ],

  'private-vs-public-school-ethiopia': [
    {
      q: 'Is private school better than public school in Ethiopia?',
      a: 'Neither is better in every case. Private schools usually offer smaller classes, a choice of curriculum and more English-language teaching, at a cost. Public schools follow the national curriculum, sit in the local community and charge little or no tuition. A good school of either kind beats a poor school of the other, so judge the individual school on a visit rather than the label.',
    },
    {
      q: 'What is the main difference between private and public schools in Ethiopia?',
      a: 'The main differences are class size, curriculum choice, language of teaching, facilities and cost. Public schools teach the national curriculum, usually to larger classes. Private schools range from national-curriculum schools to Cambridge and IB schools, and they charge fees that vary widely.',
    },
    {
      q: 'How many children go to private school in Ethiopia?',
      a: 'A small share. World Bank data shows private schools enrolled about 4.4 percent of primary pupils in 2021, so the great majority of primary pupils are in non-private schools. That is a national figure, and it does not break out Addis Ababa on its own.',
    },
    {
      q: 'Can a child move from a private school to a public school in Ethiopia?',
      a: 'Usually yes, but the receiving school decides the grade placement and may ask for transfer paperwork. A child coming from an international curriculum may find the subjects and language of teaching differ. Ask the receiving school, and the Addis Ababa Education Bureau if needed, about placement and documents before you decide.',
    },
    {
      q: 'Which is better for a child who may move abroad?',
      a: 'A private school teaching an international curriculum such as Cambridge is usually the more portable choice, because other countries and schools know the stages and the qualifications. If you are certain to stay in Ethiopia, the national curriculum may serve your child well. Families who are unsure often choose the portable option and check how re-entry into the national system would work.',
    },
  ],

  'moving-to-addis-ababa-expat-school-guide': [
    {
      q: 'How do I choose a school when moving to Addis Ababa with children?',
      a: 'Start with the curriculum, because it decides how easily your child can arrive and later leave. Then check how the school handles new arrivals, how it communicates with parents, what support it gives children who need it and how long the journey is from where you will live. Shortlist two or three schools, ask each the same questions and visit before you commit.',
    },
    {
      q: 'How early should I apply for a school in Addis Ababa?',
      a: 'As soon as your move dates are firm. Application timelines and the number of places differ from school to school, so ask each one what it needs and how long its process takes. The Nucleus admissions team can talk through timing for your child’s grade on +2519 81 99 99 22.',
    },
    {
      q: 'Can my child start school in the middle of the year?',
      a: 'Often yes, because relocations rarely follow the school calendar, but policies differ between schools and grades. Ask how mid-year arrivals are placed, assessed and welcomed. At Nucleus the admissions team can tell you what is possible for your child’s grade and dates.',
    },
    {
      q: 'What documents do I need to enrol my child in an international school in Addis Ababa?',
      a: 'Each school sets its own list, so ask early. The Nucleus prospectus lists a completed application form, a certified copy of the birth certificate or passport, two passport-size photographs, the most recent school report, a transfer certificate from the previous school where applicable, relevant medical information and any documents on previous learning support.',
    },
    {
      q: 'Which curriculum is best for expat children in Addis Ababa?',
      a: 'The best curriculum is the one that matches where your child has been and where the family may go next. Cambridge and the IB are the two most portable choices, because schools in many countries teach them. If your next posting has a Cambridge or IB school, staying in the same programme avoids relearning from scratch.',
    },
  ],
}
