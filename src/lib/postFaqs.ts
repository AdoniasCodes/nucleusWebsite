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
      a: 'There is no single best international school in Addis Ababa, because the right choice depends on your budget, your child and where your family may move next. The International Community School is generally treated as the premium benchmark and prices in USD. Cambridge Academy Ethiopia, Sandford, Flipper International and One Planet sit in the balanced middle. Newer value-focused schools teaching the international Cambridge curriculum, including Nucleus at Vatican near Mekanisa, aim at international standards without premium capital fees. Shortlist three, visit each on a normal school day, and compare the all-in first-year cost rather than the headline tuition.',
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
  'taekwondo-classes-for-kids-addis-ababa': [
    {
      q: 'What age can a child start taekwondo?',
      a: 'Most children can start taekwondo from about four or five years old, when they can follow a sequence of instructions and hold a position for a few seconds. Classes for four to six year olds should be short, game-heavy and built around coordination rather than technique. Serious pattern work and grading usually begin around seven or eight. There is no upper limit, and a child who starts at eleven catches up quickly.',
    },
    {
      q: 'Is taekwondo safe for children?',
      a: 'Taekwondo is safe for children when contact is controlled and supervised. Beginners work on patterns, kicks into pads and drills, not on sparring. When sparring is introduced, children should wear a padded chest guard, headgear, shin and forearm guards, gloves and a mouthguard, and be matched by size rather than by age alone. The main injury risk in badly run classes is not kicks, it is unsupervised horseplay and skipping the warm-up.',
    },
    {
      q: 'What does a child actually learn in taekwondo?',
      a: 'A child learns balance, coordination, core strength and stamina, and alongside that a set of habits: standing still, listening for an instruction, executing it properly, controlling how hard they hit, stopping on command and shaking hands after losing. Most parents notice the discipline and the confidence before they notice the kicking.',
    },
    {
      q: 'What equipment does my child need to start taekwondo?',
      a: 'To start, a child needs only a dobok, the white uniform, which most schools and clubs supply. Sparring gear is needed later and typically includes a chest guard, headgear, shin and forearm guards, gloves and a mouthguard. Ask the programme which items they lend and which the family is expected to buy before you enrol.',
    },
    {
      q: 'How often should a child train?',
      a: 'Twice a week is the usual rhythm for a child who wants to progress, and once a week is enough to keep the habit and the fitness. Intensive holiday programmes such as summer camp are a good way to try it, because a child gets several sessions in a single week and finds out quickly whether they enjoy it before the family commits to a term.',
    },
  ],
}
