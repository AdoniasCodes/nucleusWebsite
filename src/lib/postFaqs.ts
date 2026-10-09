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
  'cambridge-global-perspectives-explained': [
    {
      q: 'What is Cambridge Global Perspectives?',
      a: 'It is a skills-based subject in the international Cambridge curriculum in which students investigate real global and local issues rather than memorise content. They practise research, analysis, evaluation, reflection, collaboration and communication, and they are assessed on the quality of their reasoning and evidence rather than on recalled facts. It runs from the primary years through to A Level, growing in difficulty while keeping the same shape.',
    },
    {
      q: 'Is Global Perspectives a real subject or an extra activity?',
      a: 'It is a full timetabled subject with its own teacher, topics and assessment, not a club or an enrichment slot. At Nucleus it is taught across all year groups, and in Years 7 to 9 it is taught by a subject teacher.',
    },
    {
      q: 'What topics do students study in Global Perspectives?',
      a: 'Topics are chosen to connect international issues to a student\u2019s own life. Ours have included global brands and trade, migration, education, food security, disease prevention, sustainability, identity, communication and scarce resources.',
    },
    {
      q: 'Will Global Perspectives help my child in other subjects?',
      a: 'Yes, and this is the strongest practical argument for it. Research, source evaluation and structured argument are the same skills that carry a student through science write-ups, history essays, university study and eventually the workplace.',
    },
    {
      q: 'How can I support Global Perspectives at home?',
      a: 'Ask your child three questions about anything they believe: what evidence do you have, how do you know the source is reliable, and could another person see this differently. No subject knowledge is required.',
    },
  ],
  'maths-anxiety-in-children': [
    {
      q: 'What is maths anxiety in children?',
      a: 'Maths anxiety is a real feeling of tension, worry or dread that shows up when a child faces maths, out of proportion to how able they actually are. It is a reaction to the subject, not a measure of intelligence. A child with maths anxiety may freeze at a test, avoid homework, or insist they are simply not a maths person, even when they have solved similar problems before.',
    },
    {
      q: 'What are the signs of maths anxiety in a child?',
      a: 'Common signs are stomach aches or sudden tiredness on maths days, avoiding or delaying maths homework, rubbing out answers repeatedly, going blank in tests, and saying things like “I am just not good at maths”. Some children get irritable or tearful; others become very quiet. The pattern across several weeks matters more than any single bad day.',
    },
    {
      q: 'Can you be born bad at maths?',
      a: 'No. Confidence with numbers develops through practice, curiosity and a willingness to keep trying, in the same way reading does. Children differ in how quickly they pick things up, but nobody is born unable to do maths. Believing otherwise is usually what holds a child back, which is why the first job is to change the story the child tells about themselves.',
    },
    {
      q: 'How can I help my child with maths if I am not good at it myself?',
      a: 'You do not need to know the method. Ask your child to explain what they already know, what they do not know yet, and what they could try next. Praise effort and the attempt rather than the right answer, treat a wrong answer as information, and avoid saying you were also bad at maths. Short, calm, regular practice works better than long, stressful sessions.',
    },
    {
      q: 'When should I talk to the school about my child’s maths?',
      a: 'Talk to the teacher when the worry has lasted more than a few weeks, when your child is avoiding school or showing physical symptoms on maths days, or when their results and their confidence are both falling. Ask what exactly they find hard and how the teacher is helping them build small successes. A good school will want that conversation early.',
    },
  ],
  'how-to-help-a-child-struggling-at-school': [
    {
      q: 'How can I help my child who is struggling at school?',
      a: 'Start by finding out exactly where the difficulty is: one subject, one skill, or a general loss of confidence. Talk to the teacher, ask what support is in place, and agree one small goal for the next few weeks. At home, keep the tone calm, praise effort, protect sleep and routine, and treat a poor result as information about what to work on next rather than a verdict on your child.',
    },
    {
      q: 'What should I do when my child gets a bad grade?',
      a: 'Stay calm and ask your child what they think happened before offering your own view. A grade shows what a student has understood so far and where more work is needed. It is a stepping stone, not a label. Then look at the paper together, pick the one or two areas to improve, and ask the teacher what support would help.',
    },
    {
      q: 'How do I motivate a child who is falling behind?',
      a: 'Motivation returns when a child sees progress, so break the gap into small steps they can actually finish. Keep expectations high but make the next step reachable, celebrate effort and improvement, and avoid comparing them with siblings or classmates. Children who feel known and believed in by their teacher and family usually start trying again.',
    },
    {
      q: 'Is it my child’s fault or the school’s when grades drop?',
      a: 'Usually neither, and blame rarely helps. Grades drop for many reasons: a missed foundation topic, a change of teacher or school, tiredness, worry at home or a lack of confidence. The useful question is what this child needs next. Work with the school to find the cause, because the answer decides which kind of support will help.',
    },
    {
      q: 'When is a drop in grades a sign of something more serious?',
      a: 'Look for patterns that last: grades falling across all subjects, a child who stops talking about school, changes in sleep or appetite, or a sudden loss of interest in things they used to enjoy. In those cases speak to the teacher or school leadership promptly, and consider whether there is a learning difficulty or a worry your child has not yet been able to put into words.',
    },
  ],
  'emotional-intelligence-for-kids': [
    {
      q: 'What is emotional intelligence in children?',
      a: 'Emotional intelligence is a child’s ability to notice and name their own feelings, manage them, understand how other people feel, and act kindly and sensibly as a result. It includes self-awareness, empathy and self-control. Children are not born with it fully formed. They learn it from the adults around them and from daily practice.',
    },
    {
      q: 'Why is emotional intelligence important for children?',
      a: 'A child who feels safe, seen and understood is able to learn. Emotional skills help children stay calm when work gets hard, ask for help, work with classmates and recover from mistakes. In our teacher training, short emotional check-ins built into lessons are linked to more academic endurance, resilience and better exam performance.',
    },
    {
      q: 'How do you teach emotional intelligence to kids?',
      a: 'Name feelings out loud, listen before correcting, and show the behaviour you want. Give children simple words for emotions, ask what is behind a difficult moment, and pause before responding when you are frustrated yourself. Schools can build the same habits into the day with short check-ins at the start of lessons.',
    },
    {
      q: 'What is social and emotional learning in schools?',
      a: 'Social and emotional learning means teaching children, as part of ordinary school life, to understand their feelings, build empathy and work well with others. It is not a separate subject for the last period on Friday. It shows up in how teachers respond to difficult behaviour, how lessons begin and how classmates are taught to treat each other.',
    },
    {
      q: 'At what age should children start learning about emotions?',
      a: 'From the earliest years. Toddlers and preschoolers can learn simple feeling words and begin to understand that other people feel things too. Skills then deepen through the primary and secondary years. The earlier a child has an adult who names and accepts their feelings, the easier it is to build the later skills on top.',
    },
  ],
}
