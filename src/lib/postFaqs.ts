/**
 * FAQ blocks attached to specific blog posts, keyed by slug.
 *
 * These live in code rather than as a Payload field on purpose: adding a field would mean a
 * schema push against the production database, and only a handful of head-term posts need
 * this. The questions are the ones Google shows in "People also ask" for the target query,
 * which is also what answer engines quote.
 *
 * IMPORTANT: every question and answer here MUST also appear as visible copy in the post
 * body. FAQPage markup that is not on the page is a structured-data violation, and Google
 * drops the rich result for the whole site if it finds it.
 */
export type PostFaq = { q: string; a: string }

export const POST_FAQS: Record<string, PostFaq[]> = {
  'best-international-schools-addis-ababa': [
    {
      q: 'What is the best international school in Addis Ababa?',
      a: 'There is no single best international school in Addis Ababa, because the right choice depends on your budget, your child and where your family may move next. The International Community School is generally treated as the premium benchmark and prices in USD. Cambridge Academy Ethiopia, Sandford, Flipper International and One Planet sit in the balanced middle. Newer value-focused Cambridge schools, including Nucleus at Vatican near Mekanisa, aim at international standards without premium capital fees. Shortlist three, visit each on a normal school day, and compare the all-in first-year cost rather than the headline tuition.',
    },
    {
      q: 'How much do international schools in Addis Ababa cost?',
      a: 'Costs vary widely by tier. Premium schools price in foreign currency and add substantial one-time capital or development fees on top of tuition. Mid-market and value schools generally price in birr and charge lower or no capital fees. Always ask for the complete fee sheet in writing, including registration, capital or development fees, transport, meals, uniform and exam fees, then compare the total first-year figure between schools rather than the tuition line alone.',
    },
    {
      q: 'Which international schools in Addis Ababa follow the Cambridge curriculum?',
      a: 'Cambridge and British-curriculum options in Addis Ababa include Cambridge Academy Ethiopia, Bingham Academy, Reach (RICE), One Planet and Nucleus International Schools, with Sandford offering a mix of curricula. Ask any school which Cambridge stages are actually being taught at your child’s grade this year, rather than which stages are planned.',
    },
    {
      q: 'What is the difference between an international school and a private school in Ethiopia?',
      a: 'A private school is any fee-paying school, and most in Ethiopia teach the national curriculum. An international school teaches an internationally recognised curriculum such as Cambridge or the IB, so the qualification is understood and accepted if your family moves abroad. International schools also tend to keep classes smaller and teach in English throughout. The label is not regulated, so check which curriculum is genuinely delivered.',
    },
    {
      q: 'Do international schools in Addis Ababa accept Ethiopian students?',
      a: 'Yes. Most international schools in Addis Ababa enrol a mix of Ethiopian, diplomatic and expatriate families, and Ethiopian children make up a large share of the roll at many of them. A few schools tied to a specific embassy give priority to their own nationals, so confirm admissions policy directly with each school.',
    },
    {
      q: 'What age can my child start international school in Addis Ababa?',
      a: 'Most international schools in Addis Ababa begin at nursery or preschool age, typically between two and four years old, then continue through the primary years. Nucleus takes children from age 2 through Grade 8 on one planned Cambridge pathway, so the early years and what follows are built as a single journey rather than a transfer.',
    },
  ],
}
