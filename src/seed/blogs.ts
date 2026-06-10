import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import type { Post } from '../payload-types'

/**
 * Seeds 5 blog posts into the Posts collection (published, with stock hero images).
 * Run: `npm run seed:blogs`. Re-runnable — deletes existing posts by slug first.
 *
 * Topics chosen from seo/keyword-and-competitor-research.md (buyer-education cluster: highest E-E-A-T
 * + AEO value). Educational/guide content — no unverified Nucleus specifics asserted.
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
    title: 'Cambridge or IB in Addis Ababa? How to Choose for Your Child',
    slug: 'cambridge-vs-ib-addis-ababa',
    category: 'academics',
    excerpt:
      'Addis Ababa offers both Cambridge and IB international schools. Here is a clear, parent-first look at how they differ — and which suits your child.',
    heroFile: 'blog-cambridge.webp',
    publishedAt: '2026-06-02T09:00:00.000Z',
    body: [
      { p: 'If you are comparing international schools in Addis Ababa, you will meet two big names quickly: Cambridge and the International Baccalaureate (IB). Both are respected worldwide. Neither is automatically "better." The right one depends on your child and your plans.' },
      { h2: 'What Cambridge actually is' },
      { p: 'The Cambridge pathway runs from the early years through IGCSE and beyond. It is structured and subject-focused, with clear content and recognised exams at each stage. Children who like defined goals and steady progress tend to thrive in it, and the qualifications are accepted by universities across Europe, North America and beyond.' },
      { h2: 'What the IB emphasises' },
      { p: 'The IB leans toward inquiry, projects and connecting subjects together. It asks students to juggle several components at once and to reflect on how they learn. Families who want a broad, discussion-led style often gravitate to it.' },
      { h2: 'Which schools offer what in Addis' },
      { p: 'In Addis Ababa you will find both. Schools such as ICS and the German Embassy School follow the IB. Cambridge and British-curriculum options include Cambridge Academy Ethiopia, Bingham Academy, Reach (RICE) and One Planet, while Sandford offers a mix. Nucleus follows the Cambridge pathway from age 2 through Grade 8.' },
      { h2: 'A simple way to decide' },
      { ul: [
        'Does your child prefer clear targets and exams, or projects and discussion?',
        'Where might you move next — and which qualification travels best there?',
        'What does the school actually offer at your child’s age, today?',
        'Can you visit, see a class in session, and meet the teachers?',
      ] },
      { p: 'Whatever you choose, visit in person. A tour tells you more in an hour than a brochure does in a week.' },
    ],
  },
  {
    title: 'What International Schools in Addis Ababa Really Cost in 2026',
    slug: 'international-school-fees-addis-ababa-2026',
    category: 'admissions',
    excerpt:
      'Tuition is only part of the picture. Here is a transparent look at international school fees in Addis Ababa — including the capital fees that catch families out.',
    heroFile: 'blog-fees.webp',
    publishedAt: '2026-06-03T09:00:00.000Z',
    body: [
      { p: 'Fees are the first question most parents ask, and the hardest to get a straight answer to. International school costs in Addis Ababa span an enormous range, and the headline tuition is rarely the full story.' },
      { h2: 'The range is wide' },
      { p: 'At the top, premium IB schools can run into the millions of birr per year once one-time fees are added. Mid-range Cambridge and British schools sit well below that, and budget international options lower still. Two schools advertising similar tuition can cost very different amounts once everything is counted.' },
      { h2: 'The fees that catch families out' },
      { ul: [
        'Capital or development fees — often large, sometimes one-time, sometimes recurring.',
        'Registration and application fees, due before your child starts.',
        'Exam, materials, transport and meal charges billed separately.',
        'Currency: fees quoted in USD or euro shift with the exchange rate.',
      ] },
      { p: 'The single biggest reason families switch schools is a sudden capital-fee or tuition hike. It pays to ask for the complete fee sheet — every line — before you commit.' },
      { h2: 'Questions to ask any school about money' },
      { ul: [
        'What is the all-in first-year cost, including one-time fees?',
        'Is there a capital fee, and is it refundable?',
        'How often, and by how much, have fees risen in recent years?',
        'What is the payment schedule, and are instalments possible?',
      ] },
      { p: 'A school that answers these plainly is showing you something important: respect for families. At Nucleus we keep fees transparent and free of hidden capital-fee surprises — you can request the full fee sheet and we will send it directly.' },
    ],
  },
  {
    title: 'How to Choose an International School in Addis Ababa: A Parent’s Checklist',
    slug: 'how-to-choose-international-school-addis-ababa',
    category: 'parent-resources',
    excerpt:
      'A practical, no-nonsense checklist for choosing an international school in Addis Ababa — from curriculum and safety to the questions to ask on your tour.',
    heroFile: 'blog-choose.webp',
    publishedAt: '2026-06-04T09:00:00.000Z',
    body: [
      { p: 'Choosing a school is one of the bigger decisions a family makes, and it is easy to be swayed by a glossy website. Here is a checklist to keep you focused on what matters.' },
      { h2: '1. Curriculum and portability' },
      { p: 'Decide whether you want Cambridge, IB or another system, and check it travels to wherever you might go next. Ask which curriculum is actually taught at your child’s grade today — not what is planned.' },
      { h2: '2. Safety and safeguarding' },
      { p: 'For young children this often matters most. Look at access control, supervision and how the school talks about safeguarding. You should feel the answer, not just read it.' },
      { h2: '3. Teachers' },
      { p: 'Ask about teacher qualifications, how many are international or multilingual, and how long they stay. Stable, certified staff are a strong signal.' },
      { h2: '4. Beyond academics' },
      { p: 'Robotics, science, sport, music, agriculture, nutrition — the "extras" shape a child as much as the textbooks. See what is real and running, not just listed.' },
      { h2: '5. The visit' },
      { ul: [
        'Can you tour during a normal school day and see real classes?',
        'Are the children engaged and at ease?',
        'Do the staff answer money and safety questions directly?',
        'Does your child light up when they imagine being there?',
      ] },
      { p: 'Trust the tour. A school worth choosing will welcome your questions and let you see it in motion.' },
    ],
  },
  {
    title: 'Beyond the Classroom: Why Robotics, STEM and Agriculture Matter Early',
    slug: 'why-robotics-stem-agriculture-matter-early',
    category: 'campus-life',
    excerpt:
      'Hands-on learning is not a luxury add-on. Here is why robotics, STEM and growing things belong in a child’s education from the start.',
    heroFile: 'blog-beyond.webp',
    publishedAt: '2026-06-05T09:00:00.000Z',
    body: [
      { p: 'Ask a child what they did at school and "we built a robot" or "my seeds sprouted" beats "we copied notes" every time. That excitement is not a distraction from learning. It is learning.' },
      { h2: 'Why hands-on works' },
      { p: 'When children make something — a circuit, a program, a garden bed — they meet real problems and solve them. They learn that effort and iteration pay off. Those habits carry into reading, maths and everything after.' },
      { h2: 'Robotics and STEM' },
      { p: 'Coding and robotics teach logic, sequencing and resilience. A program that does not work is not a failure; it is a puzzle. Children who grow up debugging grow up unafraid of hard problems.' },
      { h2: 'Agriculture and animal care' },
      { p: 'Tending plants and animals teaches patience, responsibility and a feel for cause and effect that no screen can. It is science you can hold — and it slows childhood down in the best way.' },
      { h2: 'The point' },
      { p: 'A full education reaches beyond the notebook. The aim is not just good marks; it is a curious, capable child who can think, create and solve. That is the whole idea behind learning beyond books.' },
    ],
  },
  {
    title: 'Moving to Addis Ababa? A Diplomat and Expat Family’s Guide to Schooling',
    slug: 'moving-to-addis-ababa-expat-school-guide',
    category: 'parent-resources',
    excerpt:
      'Relocating to Addis Ababa with children? Here is what diplomatic and expat families should know about choosing a school that travels with you.',
    heroFile: 'blog-expat.webp',
    publishedAt: '2026-06-06T09:00:00.000Z',
    body: [
      { p: 'Relocating with children adds a layer to every decision. School is often the one that decides whether the whole posting feels right. A few things matter more in Addis than anywhere else.' },
      { h2: 'Portability comes first' },
      { p: 'If your family moves on a three- or four-year cycle, choose a curriculum that transfers cleanly — Cambridge or IB — so your child can pick up where they left off in the next country.' },
      { h2: 'Security and reassurance' },
      { p: 'For families new to the city, a secure, supervised campus is non-negotiable. Ask exactly how access is controlled and how the school communicates with parents during the day.' },
      { h2: 'Community and language' },
      { p: 'International and multilingual staff, and a mix of nationalities, help a child settle fast. Ask how the school welcomes mid-year arrivals — because relocations rarely follow the school calendar.' },
      { h2: 'Practical questions for relocating families' },
      { ul: [
        'Can my child start mid-term, and how is that handled?',
        'Which neighbourhoods do most families commute from?',
        'What documents do you need to enrol?',
        'Can we tour before we arrive, in person or virtually?',
      ] },
      { p: 'Nucleus sits at Vatican, near Mekanisa, within reach of Bole, Old Airport and Kazanchis, and welcomes diplomatic and expat families. If you are planning a move, reach out early — the best time to arrange a visit is before you land.' },
    ],
  },

  // ── Added 2026-06-10: FAQ-cluster + ranking posts from the Google "People also ask" export.
  {
    title: 'Ethiopian School “Levels” Explained: What the Categories Mean for Fees',
    slug: 'ethiopian-private-school-levels-explained',
    category: 'parent-resources',
    excerpt:
      'Confused by “Level 2, 3, 4” or “category” private schools in Addis Ababa? A plain-English guide to how Ethiopia classifies schools — and what it means for fees.',
    heroFile: 'blog-fees.webp',
    publishedAt: '2026-05-20T09:00:00.000Z',
    body: [
      { p: 'When you start comparing schools in Addis Ababa, you quickly meet terms like “Level 2,” “Level 3,” or “category” schools — and sometimes “C1 to C4.” Here is what those labels actually mean, and what they do not.' },
      { h2: 'The official system is “levels,” not “C1–C4”' },
      { p: 'The Ministry of Education classifies private schools using a national standards package, grouping them into levels (roughly 1 to 5) based on facilities, staffing and how the curriculum is delivered. In Addis Ababa, most kindergarten-to-high-school private schools fall into levels 2, 3 and 4. “C1–C4” is not the official wording — if a school quotes it, ask exactly what they mean by it.' },
      { h2: 'What the level mainly affects: fee increases' },
      { p: 'The level matters most for how much a school is allowed to raise tuition. Reported caps in Addis have let a Level 2 kindergarten increase fees by up to around 45%, a Level 3 by up to 50%, and a Level 4 by up to 55% within the regulated framework. The exact percentages change with each directive, so treat any single figure as a guide, not gospel.' },
      { h2: 'What the level does NOT tell you' },
      { ul: [
        'Whether your child will actually be safe and happy there.',
        'Whether the curriculum — Cambridge, IB or national — fits your plans.',
        'The all-in first-year cost, once capital and registration fees are added.',
        'How qualified and stable the teaching staff are.',
      ] },
      { h2: 'How to use this when comparing schools' },
      { ul: [
        'Ask which level the school is registered under, and when it was last reviewed.',
        'Ask for the complete fee sheet — tuition plus every one-time charge.',
        'If fees are a deciding factor, confirm the current rules with the Addis Ababa Education Bureau.',
      ] },
      { p: 'A school’s level is a useful filter, not the whole story. What matters more is what you see on a visit — the safety, the teaching, and whether your child lights up. At Nucleus we keep fees transparent and are happy to walk any family through ours, line by line.' },
      { related: [
        { label: 'The real benefits of an international school', url: '/news/benefits-of-international-school-addis-ababa' },
        { label: 'What ICS costs — and the alternatives', url: '/news/ics-addis-ababa-fees-and-alternatives' },
        { label: 'How to choose an international school', url: '/news/how-to-choose-international-school-addis-ababa' },
      ] },
    ],
  },
  {
    title: 'The Real Benefits of an International School in Addis Ababa',
    slug: 'benefits-of-international-school-addis-ababa',
    category: 'parent-resources',
    excerpt:
      'Are international schools really better than local schools? An honest look at what an international education actually gives a child in Addis Ababa.',
    heroFile: 'gallery-classroom.webp',
    publishedAt: '2026-05-24T09:00:00.000Z',
    body: [
      { p: '“Are international schools better?” is one of the most-searched questions among Addis parents. The honest answer: not automatically — but a good one offers things that are genuinely hard to find elsewhere.' },
      { h2: 'A portable, globally recognised education' },
      { p: 'Cambridge and IB qualifications are accepted by universities around the world, so a child can change countries without starting over. For families who travel, or who hope their child will study abroad one day, that portability is often the single biggest benefit.' },
      { h2: 'Smaller classes and real attention' },
      { p: 'International schools tend to keep classes small and teaching child-centred — more discussion and hands-on work, fewer rows of silent copying. Children are known as individuals, not seat numbers.' },
      { h2: 'Language and global perspective' },
      { p: 'Learning alongside international and multilingual staff, and classmates from many backgrounds, builds the confidence and cross-cultural ease that serve a child for the rest of their life.' },
      { h2: 'Learning beyond the textbook' },
      { p: 'Robotics, STEM, sport, music, agriculture and proper nutrition are part of the normal day, not rare extras. Children learn to think, create and solve — not only to memorise and repeat.' },
      { h2: 'The honest caveat' },
      { ul: [
        'International schools cost more — sometimes far more.',
        '“International” on the sign does not guarantee quality; visit and verify.',
        'A strong local school can beat a weak international one.',
      ] },
      { p: 'The benefit is real only when a school delivers it in practice. Nucleus brings a Cambridge pathway, a secure campus and hands-on learning to Vatican, near Mekanisa — come and see whether it fits your child.' },
      { related: [
        { label: 'Private vs public school in Ethiopia', url: '/news/private-vs-public-school-ethiopia' },
        { label: 'Which curriculum is best for your child?', url: '/news/best-curriculum-for-your-child-ethiopia' },
        { label: 'The best international schools in Addis Ababa', url: '/news/best-international-schools-addis-ababa' },
      ] },
    ],
  },
  {
    title: 'Private vs Public School in Ethiopia: How to Choose',
    slug: 'private-vs-public-school-ethiopia',
    category: 'parent-resources',
    excerpt:
      'Private or government school? A balanced, parent-first comparison for families in Addis Ababa — cost, class size, curriculum and what really matters.',
    heroFile: 'academics-hero.webp',
    publishedAt: '2026-05-28T09:00:00.000Z',
    body: [
      { p: 'Private or public? It is one of the first big decisions a family makes, and the loudest opinions are rarely the most useful. Here is a calm look at both sides.' },
      { h2: 'The case for public schools' },
      { p: 'Government schools are low-cost or free, rooted in the local community, and some are genuinely strong. For many families they are a sound, practical choice — especially where a good one is nearby.' },
      { h2: 'The case for private schools' },
      { p: 'Private schools usually offer smaller classes, better facilities, a choice of curriculum (including Cambridge or IB), more extracurriculars and, often, stronger English-language teaching. You are paying for attention and options.' },
      { h2: 'Cost is the obvious trade-off' },
      { p: 'Private fees range enormously, and the headline tuition is rarely the full cost. Before comparing, ask each school for the all-in first-year figure, including any one-time capital and registration fees.' },
      { h2: 'Questions that cut through the debate' },
      { ul: [
        'What does my specific child need to thrive — structure, support, stimulation?',
        'Do I need a portable curriculum for a possible move abroad?',
        'How large are the classes, really, at my child’s grade?',
        'How safe and well-supervised is the campus?',
        'Can we afford this comfortably, every year, without strain?',
      ] },
      { p: 'There is no universal winner — only the right fit for your child and budget. If you are leaning toward a private, Cambridge education, Nucleus at Vatican, near Mekanisa is built to offer that without premium-tier capital fees.' },
      { related: [
        { label: 'The real benefits of an international school', url: '/news/benefits-of-international-school-addis-ababa' },
        { label: 'Ethiopian school “levels” explained', url: '/news/ethiopian-private-school-levels-explained' },
        { label: 'How to choose an international school', url: '/news/how-to-choose-international-school-addis-ababa' },
      ] },
    ],
  },
  {
    title: 'Cambridge, IB or National Curriculum: Which Is Best for Your Child?',
    slug: 'best-curriculum-for-your-child-ethiopia',
    category: 'academics',
    excerpt:
      'Cambridge, IB or the Ethiopian national curriculum — which is best? A clear, parent-first comparison to help you choose with confidence.',
    heroFile: 'blog-cambridge.webp',
    publishedAt: '2026-06-01T09:00:00.000Z',
    body: [
      { p: 'Once you start school-hunting, you have to pick a curriculum as well as a school. The three you will meet most in Addis are Cambridge, the IB and the Ethiopian national curriculum. None is universally “best” — but one will suit your child best.' },
      { h2: 'Cambridge: structured and portable' },
      { p: 'The Cambridge pathway is subject-focused and clearly staged, with recognised exams along the way. Children who like defined goals tend to thrive, and the qualifications travel well to universities worldwide. It is often the practical sweet spot for globally-minded families.' },
      { h2: 'IB: inquiry and breadth' },
      { p: 'The IB leans into projects, inquiry and connecting subjects, and asks students to reflect on how they learn. Families who want a broad, discussion-led style often prefer it. It is demanding and rewarding in equal measure.' },
      { h2: 'National curriculum: local and affordable' },
      { p: 'The Ethiopian national curriculum is the most affordable and the most locally rooted, with strong relevance for families who plan to study and build their lives here. Quality varies widely by school, so visit before deciding.' },
      { h2: 'So which is “best”?' },
      { ul: [
        'Will your child likely study or move abroad? Lean Cambridge or IB.',
        'Does your child prefer clear targets and exams, or open-ended projects? Cambridge vs IB.',
        'Is staying and studying locally the plan, on a tighter budget? The national curriculum deserves a serious look.',
      ] },
      { p: 'Nucleus follows the Cambridge pathway from age 2 through Grade 8 — chosen for its structure and global portability. If that fits your plans, come and see it in action.' },
      { related: [
        { label: 'Cambridge or IB in Addis Ababa?', url: '/news/cambridge-vs-ib-addis-ababa' },
        { label: 'The best Cambridge schools in Addis Ababa', url: '/news/best-cambridge-schools-addis-ababa' },
        { label: 'The real benefits of an international school', url: '/news/benefits-of-international-school-addis-ababa' },
      ] },
    ],
  },
  {
    title: 'When Should My Child Start School? A Guide to the Early Years',
    slug: 'best-age-to-start-school',
    category: 'parent-resources',
    excerpt:
      'What age is best to start school — and which years matter most? A calm, evidence-aware guide for parents of young children in Addis Ababa.',
    heroFile: 'admissions-hero.webp',
    publishedAt: '2026-06-05T09:00:00.000Z',
    body: [
      { p: 'Parents of toddlers ask two versions of the same question: what age should my child start school, and how much do these early years really matter? Here is a calm, honest guide.' },
      { h2: 'The early years do the heavy lifting' },
      { p: 'Between roughly age 2 and 6, children build the foundations of language, curiosity, self-control and social confidence at a pace they never will again. These are not “filler” years before “real” school — they are the years that make real school work.' },
      { h2: 'There is no single “right” age' },
      { p: 'Readiness varies from child to child. Signs a child is ready include curiosity about other children, the ability to separate from a parent for a while, and a growing appetite for stories, songs and play with purpose. Age is a guide; the child is the real signal.' },
      { h2: 'Why good early years are not “just daycare”' },
      { p: 'There is a real difference between a place that minds children and one that teaches them through play. The second builds early literacy, numeracy and emotional skills on purpose, and makes the step into primary school feel natural rather than abrupt.' },
      { h2: 'What to look for in an early-years programme' },
      { ul: [
        'A safe, secure, well-supervised environment above all.',
        'Warm, qualified staff who clearly enjoy young children.',
        'Play-based learning with real structure behind it.',
        'A smooth, planned path into the primary years.',
      ] },
      { p: 'Nucleus welcomes children from age 2 and carries them on a planned path into the Cambridge primary years — so the early foundation and what follows are built as one journey.' },
      { related: [
        { label: 'The real benefits of an international school', url: '/news/benefits-of-international-school-addis-ababa' },
        { label: 'How to choose an international school', url: '/news/how-to-choose-international-school-addis-ababa' },
        { label: 'The best international schools in Addis Ababa', url: '/news/best-international-schools-addis-ababa' },
      ] },
    ],
  },
  {
    title: 'The Best International Schools in Addis Ababa: A 2026 Parent’s Guide',
    slug: 'best-international-schools-addis-ababa',
    category: 'parent-resources',
    excerpt:
      'Looking for the best international school in Addis Ababa? An honest 2026 guide to the main options — by curriculum, budget and what each does well.',
    heroFile: 'campus-hero.webp',
    publishedAt: '2026-06-08T09:00:00.000Z',
    body: [
      { p: '“What is the best international school in Addis Ababa?” There is no single answer — the best school depends on your budget, your child, and where you might go next. Here is an honest map of the landscape to help you shortlist.' },
      { h2: 'The premium tier' },
      { p: 'At the top sit schools like the International Community School (ICS, following the IB and widely seen as the market ceiling, with fees in USD), the German Embassy School and Bingham Academy. Elite facilities and large international faculties come with premium, often one-time, capital fees.' },
      { h2: 'The balanced middle' },
      { p: 'In the middle are schools such as Cambridge Academy Ethiopia, Flipper International, One Planet and Sandford (which offers a mix of curricula). These aim for international standards at more accessible, largely local-currency price points.' },
      { h2: 'Value and newer options' },
      { p: 'Then there are newer and value-focused schools — including Nucleus, a Cambridge school at Vatican, near Mekanisa serving age 2 through Grade 8, built around a secure campus, holistic learning (robotics, agriculture, music and sport) and transparent fees without surprise capital-fee jumps.' },
      { h2: 'How to pick the best one for YOU' },
      { ul: [
        'Curriculum fit and portability — Cambridge, IB or national.',
        'The all-in first-year cost, not just the headline tuition.',
        'Safety, supervision and how the school communicates with parents.',
        'Distance and daily commute from your neighbourhood.',
        'A real visit during a normal school day.',
      ] },
      { h2: 'Where Nucleus honestly fits' },
      { p: 'We will not pretend to out-facility ICS. What Nucleus aims to be is the best-value Cambridge option with a genuinely secure, nurturing campus — a strong fit for first-time, switching and diplomatic families who want real quality without premium-tier capital fees.' },
      { p: 'The only way to find your best school is to visit a few. We would be glad to be one of them.' },
      { related: [
        { label: 'The best Cambridge schools in Addis Ababa', url: '/news/best-cambridge-schools-addis-ababa' },
        { label: 'What ICS costs — and the alternatives', url: '/news/ics-addis-ababa-fees-and-alternatives' },
        { label: 'Which curriculum is best for your child?', url: '/news/best-curriculum-for-your-child-ethiopia' },
      ] },
    ],
  },
  {
    title: 'The Best Cambridge Schools in Addis Ababa (2026)',
    slug: 'best-cambridge-schools-addis-ababa',
    category: 'academics',
    excerpt:
      'Want a Cambridge education in Addis Ababa? Here are the main Cambridge and British-curriculum schools to know in 2026 — and how to choose between them.',
    heroFile: 'blog-choose.webp',
    publishedAt: '2026-06-09T09:00:00.000Z',
    body: [
      { p: 'If you have decided on the Cambridge pathway, the next question is simply: where? Addis Ababa has a growing set of Cambridge and British-curriculum schools to choose from.' },
      { h2: 'Why families choose Cambridge' },
      { p: 'Cambridge is structured, subject-focused and built around recognised exams, and its qualifications transfer cleanly to universities worldwide. For families who value clear progress and global portability, it is a natural fit.' },
      { h2: 'Cambridge and British options in Addis' },
      { p: 'Schools following Cambridge or British curricula include Cambridge Academy Ethiopia, Bingham Academy, Reach (RICE) and One Planet, with Sandford offering a mix. Nucleus joins them with a Cambridge pathway from age 2 through Grade 8 at Vatican, near Mekanisa.' },
      { h2: 'How to compare Cambridge schools' },
      { ul: [
        'Which Cambridge stages are actually taught at your child’s grade today?',
        'What is the school’s track record and teacher quality?',
        'What is the all-in cost, including one-time fees?',
        'How secure and well-run is the campus day to day?',
      ] },
      { p: 'A name on a list means little until you have walked the halls. Nucleus would welcome your questions and a visit — see the Cambridge pathway in action before you decide.' },
      { related: [
        { label: 'Which curriculum is best for your child?', url: '/news/best-curriculum-for-your-child-ethiopia' },
        { label: 'Cambridge or IB in Addis Ababa?', url: '/news/cambridge-vs-ib-addis-ababa' },
        { label: 'The best international schools in Addis Ababa', url: '/news/best-international-schools-addis-ababa' },
      ] },
    ],
  },
  {
    title: 'How Much Is ICS Addis Ababa — and What Are the Alternatives?',
    slug: 'ics-addis-ababa-fees-and-alternatives',
    category: 'admissions',
    excerpt:
      'ICS is the most expensive school in Addis Ababa. Here are its 2025/26 fees in plain numbers — and the lower-cost Cambridge alternatives worth considering.',
    heroFile: 'blog-fees.webp',
    publishedAt: '2026-06-10T09:00:00.000Z',
    body: [
      { p: 'The International Community School (ICS) is Addis Ababa’s best-known — and most expensive — international school. If you are weighing it up, here are the published 2025/26 numbers in plain terms, plus alternatives worth a look.' },
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
      { p: 'Plenty of mid-market Cambridge and British schools deliver an international standard for a fraction of the all-in cost. Nucleus is one — a Cambridge school at Vatican, near Mekanisa (age 2 to Grade 8) with transparent, birr-friendly fees and no surprise capital-fee jumps. Request our fee sheet for exact figures.' },
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
