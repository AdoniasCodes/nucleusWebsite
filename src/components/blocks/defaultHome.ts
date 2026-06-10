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
const coreValuesCards = [
  { iconName: 'Handshake', title: 'Honesty', description: 'Living and speaking with absolute truthfulness to build a community rooted in mutual trust.' },
  { iconName: 'ShieldCheck', title: 'Integrity', description: 'Doing what is right, honorable, and ethical in all circumstances, even when no one is watching.' },
  { iconName: 'Eye', title: 'Transparency', description: 'Maintaining open, clear, and visible communication with students, parents, and stakeholders.' },
  { iconName: 'Mountain', title: 'Resilience', description: 'Embracing challenges with grit, learning from mistakes, and persisting through obstacles to solve complex problems.' },
  { iconName: 'Heart', title: 'Care', description: 'Putting the emotional, social, and physical well-being of every child at the center of all decisions.' },
  { iconName: 'Award', title: 'Excellence', description: 'Striving for the highest standards in innovation, academic growth, and personal achievement.' },
]

export const defaultHomeLayout: RenderableBlock[] = [
  {
    blockType: 'hero',
    background: 'purple',
    bgVideo: '/video/hero.mp4',
    bgPoster: '/video/hero-poster.webp',
    animateHeading: true,
    eyebrow: 'Cambridge International School in Addis Ababa',
    amharicSubline: 'ትምህርት ከደብተር ያልፋል',
    heading: 'Nucleus International School',
    tagline: 'Think Deeply. Create Boldly. Solve Truly.',
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
      { value: 'Vatican', label: 'Secure Campus' },
    ],
  },
  {
    blockType: 'cardsGrid',
    background: 'white',
    reveal: 'scale',
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
    bgImage: '/images/stock/globe-3.webp',
    heading: 'Learning Beyond Books',
    subhead:
      'Robotics, agriculture, music, sport and a secure campus — a full life that shapes thinkers, creators and solvers.',
    links: [{ link: { appearance: 'primary', type: 'custom', label: 'Discover Campus Life', url: '/campus-life' } }],
  },
  {
    blockType: 'cardsGrid',
    background: 'mist',
    reveal: 'mirror',
    eyebrow: 'Our Purpose',
    heading: 'Mission & Vision',
    columns: '2',
    cards: [
      {
        iconName: 'Compass',
        title: 'Our Mission',
        description:
          'To empower a generation of thinkers, creators, and problem solvers as self-aware, innovative leaders who navigate a globalized world with humility, compassion, and a heart for service.',
      },
      {
        iconName: 'Globe',
        title: 'Our Vision',
        description:
          'To witness a global legacy of innovative thinkers who cross borders with humility and solve problems for a better tomorrow.',
      },
    ],
  },
  {
    blockType: 'cardsGrid',
    background: 'white',
    bgImage: '/images/stock/core-values.webp',
    bgOverlay: 'gradient',
    reveal: 'blur',
    eyebrow: 'Our Foundation',
    heading: 'Our Core Values',
    intro: 'The principles that guide our community and shape future leaders.',
    columns: '3',
    cards: coreValuesCards,
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
      { q: 'What ages does Nucleus accept?', a: 'Children from age 2 through Grade 8, on a single planned journey from the early years into the Cambridge primary and middle years.' },
      { q: 'Where is Nucleus located?', a: 'At Vatican, Addis Ababa — beside the Vatican Embassy (the former Peace Corps compound), just before Mekanisa Abo Square. Our preschool remains at Mekanisa Abo Square.' },
      { q: 'How much are the fees?', a: 'We keep fees transparent, with no hidden capital-fee surprises. Request the full fee sheet and we’ll send it directly.' },
      { q: 'How safe is the campus?', a: 'Safety comes first — a secure, supervised campus with controlled access is the foundation of everything we do.' },
      { q: 'Is an international school worth it compared to a local school?', a: 'A good international school gives a portable, globally recognised education, smaller classes and learning beyond the textbook. It costs more, so the value depends on the school delivering it in practice — which is why we encourage you to visit and see for yourself.' },
      { q: 'Cambridge or IB — which is better for my child?', a: 'Neither is automatically better. Cambridge is structured and exam-based; the IB is inquiry and project-led. Nucleus follows Cambridge for its clear structure and global portability.' },
    ],
  },
  {
    blockType: 'ctaBand',
    background: 'purple',
    bgImage: '/images/stock/globe-1.webp',
    heading: 'Registration is open — Gift Your Kids a Full Life',
    subhead: 'Secure your child’s place for the upcoming intake. Tours fill quickly.',
    links: [
      { link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } },
      { link: { appearance: 'outline', type: 'custom', label: 'Request Fee Sheet', url: '/admissions' } },
    ],
  },
  {
    blockType: 'map',
    eyebrow: 'Visit Nucleus',
    heading: 'Find Us at Vatican, Addis Ababa',
    intro: 'Easy to reach from Bole, Old Airport, Kazanchis and Gerji — come and see a full life in motion.',
    embedSrc: 'https://www.google.com/maps?q=Peace+Corps+Ethiopia,+Addis+Ababa&z=14&hl=en&output=embed',
    directionsUrl: 'https://maps.app.goo.gl/EPEuid1MeAT4N9RN6',
    rows: [
      {
        iconName: 'MapPin',
        title: 'Our Campus',
        description:
          'Vatican, Addis Ababa — beside the Vatican Embassy (the former Peace Corps compound), just before Mekanisa Abo Square.',
      },
      { iconName: 'Phone', title: 'Call Us', description: '0947 500 992 · 0947 500 494' },
      { iconName: 'Clock', title: 'School Hours', description: 'Monday–Friday, 8:00 AM – 3:30 PM' },
    ],
    note: 'Our preschool remains at its long-standing home at Mekanisa Abo Square.',
  },
  {
    blockType: 'latestPosts',
    heading: 'News & Perspectives',
    intro: 'Stories, milestones and ideas from our learning community.',
  },
] as RenderableBlock[]
