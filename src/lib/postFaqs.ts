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
  // Curriculum cluster, Oct 2026 (src/seed/curriculum-blogs.ts). Same wording as the visible
  // FAQ section in each post body.
  'cambridge-curriculum-ethiopia': [
    {
      q: 'What is the Cambridge curriculum?',
      a: 'The Cambridge curriculum is an international programme from Cambridge University Press and Assessment for learners aged 3 to 19. It runs in five stages: Early Years, Primary, Lower Secondary, Upper Secondary (IGCSE) and Advanced (AS and A Level). Each subject has stage-by-stage learning objectives, and it is taught in more than 10,000 schools in over 160 countries.',
    },
    {
      q: 'Is the Cambridge curriculum recognised in Ethiopia?',
      a: 'Yes. Cambridge programmes are taught in a number of private and international schools in Ethiopia, and Cambridge IGCSE and A Level qualifications are recognised by universities worldwide. Families planning to re-enter the Ethiopian national system later should ask the school and the Ministry of Education about equivalence for their child’s grade.',
    },
    {
      q: 'What age does the Cambridge curriculum start?',
      a: 'Cambridge Early Years starts at age 3, Cambridge Primary at about 5, Lower Secondary at about 11, IGCSE at about 14 and A Levels at about 16.',
    },
    {
      q: 'Is the Cambridge curriculum hard?',
      a: 'It is demanding in a different way from memorisation-based systems. Children are expected to explain their reasoning, investigate and apply what they know. Most children adapt well when the teaching is good, and the stage-by-stage objectives make it clear what they need to master next.',
    },
    {
      q: 'What is the difference between Cambridge and the Ethiopian curriculum?',
      a: 'The Ethiopian national curriculum is set by the Ministry of Education and leads to national examinations. The Cambridge curriculum is international, taught in English, assessed by Cambridge, and leads to IGCSE and A Level qualifications recognised worldwide. We compare them in more detail in Cambridge, IB or national curriculum.',
    },
  ],
  'cambridge-early-years-curriculum': [
    {
      q: 'What is the Cambridge Early Years curriculum?',
      a: 'It is the first stage of the Cambridge pathway, a play-based programme for children aged 3 to 6. It covers six connected learning areas: communication, language and literacy; mathematics; understanding the world; personal, social and emotional development; physical development; and creative expression.',
    },
    {
      q: 'Is Cambridge Early Years play-based?',
      a: 'Yes. Cambridge describes it as a child-centred, play-based programme. The play is planned by teachers to build specific skills, so children learn early maths, language and social skills through activities designed for that purpose.',
    },
    {
      q: 'Are there tests in Cambridge Early Years?',
      a: 'No. Progress is tracked through continuous observation and samples of children’s work, judged against the learning statements in the Cambridge Early Years framework.',
    },
    {
      q: 'What should my child know before starting Year 1?',
      a: 'Most children are ready for Year 1 when they can listen in a group, manage their own belongings, hold a pencil comfortably, recognise many letter sounds, count objects reliably and ask an adult for help. Fluent reading is not expected.',
    },
    {
      q: 'What is the difference between Early Years and kindergarten?',
      a: 'Kindergarten (KG) is the name of the classes; Early Years is the curriculum stage those classes follow. In a Cambridge school, children in nursery and KG classes are taught the early years curriculum before moving into Cambridge Primary.',
    },
  ],
  'what-children-learn-in-year-1': [
    {
      q: 'What age is Year 1?',
      a: 'Year 1 is usually for children aged five to six. In Cambridge Primary it is Stage 1, the first of six primary stages. At Nucleus, Year 1 is also called Grade 1, and entry is assessed individually.',
    },
    {
      q: 'What do children learn in Year 1 maths?',
      a: 'In Cambridge Primary Stage 1, children count to 100, read and write numbers to 20, count in twos and tens, find one more and one less, start doubling and halving, use the equals sign, and work with shapes, measures, time and simple data.',
    },
    {
      q: 'Should my child be reading by the end of Year 1?',
      a: 'Most children can read simple books independently by the end of Year 1, using phonics to sound out new words. Children develop at different speeds, so ask the teacher how your child is progressing against the year’s objectives rather than comparing with other children.',
    },
    {
      q: 'Are there exams in Year 1?',
      a: 'No. Cambridge Progression Tests begin at Stage 3, and Cambridge Primary Checkpoint is at the end of Stage 6. In Year 1, teachers assess through classwork and observation.',
    },
    {
      q: 'What makes a good Year 1 class?',
      a: 'Small class sizes, daily systematic phonics, hands-on maths and science with real materials, a gentle bridge from play-based learning, and teachers who tell parents specifically what their child can do and what comes next.',
    },
  ],
  'cambridge-primary-curriculum-subjects': [
    {
      q: 'What subjects are in the Cambridge Primary curriculum?',
      a: 'Cambridge Primary offers 13 subjects: English, English as a Second Language, Mathematics, Science, Global Perspectives, Computing, Digital Literacy, Art and Design, Music, Physical Education, Wellbeing, Humanities and Modern Foreign Language. English, mathematics and science are the core subjects, and schools choose which others to teach.',
    },
    {
      q: 'What age is Cambridge Primary?',
      a: 'Cambridge Primary is typically for children aged 5 to 11, across six stages that match Years 1 to 6.',
    },
    {
      q: 'What is the Cambridge Primary Checkpoint?',
      a: 'It is an optional set of tests taken at the end of Stage 6 in English, mathematics and science, with Global Perspectives available. The tests are marked externally by Cambridge, results are reported on a 0 to 50 scale, and schools receive detailed feedback against an international benchmark. From 2026 it runs in March, May and October.',
    },
    {
      q: 'Is the Cambridge Primary Checkpoint compulsory?',
      a: 'No. Cambridge describes its primary assessments as optional, and each school decides whether to enter students. Many use it as a check on progress before Lower Secondary.',
    },
    {
      q: 'What comes after Cambridge Primary?',
      a: 'Cambridge Lower Secondary, typically for ages 11 to 14 across Stages 7 to 9, followed by Cambridge IGCSE at about 14 to 16.',
    },
  ],
  'cambridge-lower-secondary-curriculum': [
    {
      q: 'What is Cambridge Lower Secondary?',
      a: 'It is the stage of the Cambridge pathway for learners aged about 11 to 14, covering Stages 7 to 9 (Years 7 to 9). It follows Cambridge Primary and prepares students for Cambridge IGCSE, with up to 13 subjects including English, mathematics and science.',
    },
    {
      q: 'What is the Cambridge Lower Secondary Checkpoint?',
      a: 'It is an optional set of externally marked tests at the end of Stage 9 in English, mathematics and science, with Global Perspectives available. Students receive a statement of achievement and schools receive diagnostic feedback against an international benchmark. From 2026 it runs in March, May and October.',
    },
    {
      q: 'Is Lower Secondary Checkpoint a qualification?',
      a: 'No. It is a diagnostic assessment that shows strengths and gaps before IGCSE. IGCSE, usually taken at about 16, is the first formal Cambridge qualification.',
    },
    {
      q: 'What age is Year 7?',
      a: 'Year 7 is usually for students aged 11 to 12, the first year of Cambridge Lower Secondary. In American grade terms it sits alongside Grade 6.',
    },
    {
      q: 'How can I help my child prepare for IGCSE?',
      a: 'Encourage daily independent reading, make sure gaps in maths are closed early, help them build a weekly homework routine, and ask the school which strands their Progression Test or Checkpoint results show need attention.',
    },
  ],
  'stem-education-for-kids': [
    {
      q: 'What is STEM education for kids?',
      a: 'STEM education teaches science, technology, engineering and mathematics through hands-on projects in which children investigate, design, build and test. The best programmes connect the four subjects, use the engineering design cycle of ask, imagine, plan, create, experiment and improve, and run every week rather than as occasional events.',
    },
    {
      q: 'At what age should children start STEM?',
      a: 'As early as preschool. Research covering close to 36,000 children found that early maths skills at around age five were the strongest predictor of later achievement. For young children STEM means counting, building, sorting, planting and asking why.',
    },
    {
      q: 'What makes a good STEM programme?',
      a: 'Children doing the work themselves, a design cycle that includes improving after failure, connections between science, maths and technology, small teams where every child explains their thinking, weekly practice, real-world and living science, and equal participation by girls.',
    },
    {
      q: 'Why is STEM important in Ethiopia?',
      a: 'Ethiopia is investing in AI and digital skills, with an Artificial Intelligence Institute established in 2020, a National AI Policy finalised in 2024 and a national coding initiative for young people. Globally, the World Economic Forum names AI, big data, cybersecurity and technological literacy as the fastest-growing skills to 2030.',
    },
    {
      q: 'Is robotics the same as STEM?',
      a: 'No. Robotics is one part of STEM that combines engineering, programming and maths. A good STEM programme also includes hands-on science, measurement, data and design. We look at robotics specifically in robotics and coding for kids in Addis Ababa.',
    },
  ],
  'cambridge-computing-curriculum': [
    {
      q: 'What is taught in the Cambridge computing curriculum?',
      a: 'Cambridge Primary and Lower Secondary Computing share five strands: computational thinking, programming, managing data, networks and digital communication, and computer systems. Primary learners program in visual languages such as Scratch, and Lower Secondary learners move to text-based languages such as Python.',
    },
    {
      q: 'What age should children start coding?',
      a: 'Children can start at five or six with unplugged activities, floor robots and picture-based tools such as Scratch Jr, which Cambridge suggests for Stages 1 and 2. Block-based Scratch suits ages eight and up, and text-based Python usually starts around 11.',
    },
    {
      q: 'What is the difference between computing and digital literacy?',
      a: 'Computing teaches how computers work and how to program them. Digital literacy teaches how to use technology effectively and stay safe online. Cambridge teaches them as two separate subjects, and a strong school covers both.',
    },
    {
      q: 'Should primary children learn about AI?',
      a: 'Yes, at the right level. UNESCO’s 2024 AI competency framework for students starts with understanding: what AI is, how it learns from data, where it can go wrong and how to use it responsibly. Building AI systems comes later.',
    },
    {
      q: 'Is Scratch real programming?',
      a: 'Yes. Scratch, from the MIT Media Lab, uses blocks instead of typed text, but it teaches the same concepts as any language: sequences, loops, variables, conditions and events. Children who learn Scratch well usually move to Python quickly.',
    },
  ],
  'hands-on-learning': [
    {
      q: 'What is hands-on learning?',
      a: 'Hands-on learning is an approach in which children learn by doing a real activity, such as building, experimenting, measuring or making, and then reflecting on what happened. It is based on experiential learning theory, which describes a cycle of concrete experience, reflection, forming ideas and testing them in new situations.',
    },
    {
      q: 'What are the benefits of hands-on learning?',
      a: 'Research on active learning shows higher exam scores and lower failure rates than lecture-based teaching, and approaches that build reflection and talk are linked to several months of additional progress. Hands-on learning also builds problem solving, persistence, teamwork and confidence.',
    },
    {
      q: 'Is it true we remember 90% of what we do?',
      a: 'No. The learning pyramid percentages are a myth. Edgar Dale’s original 1946 cone of experience had no percentages, and the numbers were added later without research behind them. The real evidence for active learning comes from studies such as Freeman and colleagues’ 2014 analysis.',
    },
    {
      q: 'What are examples of hands-on learning?',
      a: 'Examples include planting and measuring seeds, building and testing paper bridges, running fair-test science experiments, programming floor robots, measuring the playground for maths, and making and selling a product.',
    },
    {
      q: 'Is hands-on learning only for young children?',
      a: 'No. It suits every age. Young children learn through sorting, building and play; primary students through experiments and projects; older students through independent investigations, design challenges and enterprise projects.',
    },
  ],
  'best-kindergarten-addis-ababa': [
    {
      q: 'What age do children start kindergarten in Addis Ababa?',
      a: 'Most private and international kindergartens in Addis Ababa take children from about age three, with two or three kindergarten years before Grade 1. At Nucleus, KG1 is for children aged three to four and KG2 for children aged four to five, followed by Year 1 (Grade 1) at five to six.',
    },
    {
      q: 'What is a good teacher to child ratio for kindergarten?',
      a: 'NAEYC guidance is about one adult for every 9 or 10 children aged three to five, in groups of no more than 18 to 20. Ask for the ratio in your child’s actual classroom, not the school average, and count the adults when you visit.',
    },
    {
      q: 'Is play-based or academic kindergarten better?',
      a: 'Planned play is better for young children. The American Academy of Pediatrics describes play as brain building, and children learn early maths, language and self-control through well-designed play. The best kindergartens combine play with clear goals, rather than replacing learning with free time or replacing play with worksheets.',
    },
    {
      q: 'How much screen time is okay in kindergarten?',
      a: 'The World Health Organization recommends no more than one hour of screen time a day for children aged two to four, and less is better. A kindergarten does not need tablets to be modern; time outdoors, books and conversation matter far more at this age.',
    },
    {
      q: 'Should my child learn in English or Amharic at kindergarten?',
      a: 'Young children can learn both well when the school has a clear plan for each language. Many families in Addis choose an English-medium kindergarten that also teaches Amharic, so children are ready for an international primary school without losing the language of home.',
    },
  ],
  'british-vs-american-curriculum-addis-ababa': [
    {
      q: 'Is the British or American curriculum better?',
      a: 'Neither is better in general. The British (Cambridge) curriculum offers a defined structure, external exams and depth in a few subjects from 16, and its A Levels are widely accepted, including by more than 1,000 US universities. The American system offers breadth for longer and continuous assessment, and suits students set on a US university. The right choice depends mainly on where your child may go to university.',
    },
    {
      q: 'Do American universities accept A Levels?',
      a: 'Yes. Cambridge International states that more than 1,000 US universities formally accept its AS and A Levels, including all Ivy League universities, and strong grades can earn up to a year of credit. Some universities, such as Harvard, still expect the SAT or ACT as well, so check each university’s international admissions page.',
    },
    {
      q: 'Can you get into a UK university with an American high school diploma?',
      a: 'Usually only with additional exams. Selective UK universities typically ask for the diploma plus Advanced Placement results; Warwick, for example, looks for four or five AP exams with top scores as the equivalent of three A Levels.',
    },
    {
      q: 'What is the difference between Year and Grade?',
      a: 'British schools number years from Year 1 (age five to six), while American schools start with Kindergarten at about five and then Grade 1. As a rough rule the British year number is one higher than the American grade for the same age, so Year 9 sits alongside Grade 8. Ask any school which class your child would join by date of birth.',
    },
    {
      q: 'Is the Cambridge curriculum the same as the British curriculum?',
      a: 'Not exactly. Cambridge is an international curriculum from Cambridge University Press and Assessment, designed for schools around the world and built on the British tradition. It is not the national curriculum of England, but it follows the same broad structure and leads to IGCSEs and A Levels.',
    },
  ],
}
