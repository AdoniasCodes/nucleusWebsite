import type { RenderableBlock } from './BlockRenderer'

/**
 * Code-defined homepage used until an editor creates a Page with slug "home".
 * Same block shapes as the CMS → rendered by the same BlockRenderer, so it is
 * NOT throwaway: creating the "home" page in admin transparently takes over.
 *
 * Structure follows CRO best practice: clear value prop → trust bar → benefits →
 * social proof → emphasis → values → gallery → objection-handling FAQ → urgency CTA → news.
 * Primary conversion goal = BOOK A TOUR (one primary CTA, repeated). Light/dark rhythm blends.
 *
 * Copy is brand-voiced + grounded; unverified specifics stay soft (see content/open-questions.md).
 * Stats values + testimonials are PLACEHOLDER pending confirmation — do not present as verified facts.
 */
export const defaultHomeLayout: RenderableBlock[] = [
  {
    blockType: 'hero',
    background: 'purple',
    bgImage: '/images/stock/home-hero.jpg',
    animateHeading: true,
    amharicSubline: 'ትምህርት ከደብተር ያልፋል',
    heading: 'Think Deeply.\nCreate Boldly.\nSolve Truly.',
    subhead:
      'A Cambridge international education in the heart of Addis Ababa — raising secure, curious, globally-minded children from age 2 through Grade 8.',
    links: [
      { link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } },
      { link: { appearance: 'outline', type: 'custom', label: 'Explore Academics', url: '/academics' } },
    ],
  },
  {
    blockType: 'stats',
    background: 'navy',
    items: [
      { value: 'Cambridge', label: 'International Pathway' }, // soft until Q2 (registered vs aligned)
      { value: '2–G8', label: 'Ages Served' },
      { value: 'STEM', label: 'Labs & Robotics' },
      { value: 'Mekanisa', label: 'Secure Campus' },
    ],
  },
  {
    blockType: 'cardsGrid',
    background: 'white',
    eyebrow: 'Why Nucleus',
    heading: 'Why Leaders Choose Nucleus',
    intro: 'A holistic, innovative environment that prepares children for a global future.',
    columns: '3',
    cards: [
      { iconName: 'GraduationCap', title: 'Cambridge Pathway', description: 'An internationally recognised curriculum that travels with your child — portable, rigorous, respected worldwide.', enableLink: true, link: { type: 'custom', label: 'Learn more', url: '/cambridge-pathway' } },
      { iconName: 'ShieldCheck', title: 'Advanced Security', description: 'A fortress of safety: controlled access and supervision, so learning happens with total peace of mind.', enableLink: true, link: { type: 'custom', label: 'Our campus', url: '/campus-life' } },
      { iconName: 'Bot', title: 'Robotics & STEM', description: 'Future-ready skills built through hands-on technology, coding and science.', enableLink: true, link: { type: 'custom', label: 'Learn more', url: '/robotics-stem' } },
      { iconName: 'Sprout', title: 'Agriculture & Animal Care', description: 'Real-world, holistic learning that connects children to nature and responsibility.', enableLink: true, link: { type: 'custom', label: 'Learn more', url: '/agriculture-animal-care' } },
      { iconName: 'Languages', title: 'Foreign & Multilingual Staff', description: 'Diverse, international faculty bringing global perspective and language depth.', enableLink: true, link: { type: 'custom', label: 'About us', url: '/about' } },
      { iconName: 'Utensils', title: 'Chef-Prepared Nutrition', description: 'Balanced, freshly-cooked meals — because well-fed minds learn better.', enableLink: true, link: { type: 'custom', label: 'Campus life', url: '/campus-life' } },
    ],
  },
  {
    blockType: 'testimonials',
    background: 'mist',
    heading: 'Loved by Nucleus Families',
    // PLACEHOLDER quotes — replace with real parent testimonials before publishing (open-questions.md).
    quotes: [
      { quote: 'For the first time I drop my daughter off without worrying. The security and the care are unlike anywhere we’ve been.', author: 'A Nucleus Parent', relationship: 'Parent, Early Years' },
      { quote: 'The robotics and the garden — my son comes home talking about what he built and what he grew. He’s genuinely excited to learn.', author: 'A Nucleus Parent', relationship: 'Parent, Primary' },
      { quote: 'A real international standard, with teachers from around the world, and they were clear and honest about fees from day one.', author: 'A Nucleus Parent', relationship: 'Diplomatic family' },
    ],
  },
  {
    blockType: 'ctaBand',
    background: 'navy',
    heading: 'Beyond the Classroom. Into the World.',
    subhead:
      'Robotics, agriculture, music, sport and a secure campus — a full life that shapes thinkers, creators and solvers.',
    links: [{ link: { appearance: 'primary', type: 'custom', label: 'Discover Campus Life', url: '/campus-life' } }],
  },
  {
    blockType: 'cardsGrid',
    background: 'white',
    eyebrow: 'Our Foundation',
    heading: 'Our Core Values',
    intro: 'The principles that guide our community and shape future leaders.',
    columns: '3',
    cards: [
      { iconName: 'Award', title: 'Excellence in Education', description: 'Holding every learner to a high, caring standard.' },
      { iconName: 'Scale', title: 'Integrity & Respect', description: 'Character first — honesty and respect in everything.' },
      { iconName: 'Lightbulb', title: 'Creativity & Innovation', description: 'Encouraging bold thinking and original ideas.' },
      { iconName: 'Target', title: 'Responsibility & Discipline', description: 'Building self-direction and good habits for life.' },
      { iconName: 'Users', title: 'Community & Collaboration', description: 'Families and faculty growing together.' },
    ],
  },
  {
    blockType: 'galleryBlock',
    heading: 'Campus Life',
    source: 'category',
    category: 'campus',
    limit: 4,
  },
  {
    blockType: 'faqList',
    background: 'mist',
    heading: 'Parents Often Ask',
    items: [
      { q: 'What curriculum does Nucleus follow?', a: 'The Cambridge pathway, from the early years through Grade 8 — a portable, internationally recognised education.' },
      { q: 'Where is Nucleus located?', a: 'In Mekanisa, about 100 metres from Mekanisa Abo Square, Addis Ababa.' },
      { q: 'How much are the fees?', a: 'We keep fees transparent, with no hidden capital-fee surprises. Request the full fee sheet and we’ll send it directly.' },
      { q: 'How safe is the campus?', a: 'Safety comes first — a secure, supervised campus with controlled access is the foundation of everything we do.' },
    ],
  },
  {
    blockType: 'ctaBand',
    background: 'purple',
    heading: 'Registration is open — Gift Your Kids a Full Life',
    subhead: 'Secure your child’s place for the upcoming intake. Tours fill quickly.',
    links: [
      { link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } },
      { link: { appearance: 'outline', type: 'custom', label: 'Request Fee Sheet', url: '/admissions' } },
    ],
  },
  {
    blockType: 'latestPosts',
    heading: 'News & Perspectives',
    intro: 'Stories, milestones and ideas from our learning community.',
  },
] as RenderableBlock[]
