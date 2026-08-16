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
 * Stats values + testimonials are PLACEHOLDER pending confirmation, do not present as verified facts.
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
    blockType: 'heroSlider',
    // The brand film, behind a button rather than in the slide rotation. 16 MB is far too much
    // to autoplay at someone on Ethiopian mobile data, so it only downloads once they ask for it.
    tvc: {
      src: '/video/nucleus-tvc-en.mp4',
      poster: '/video/nucleus-tvc-en-poster.webp',
      label: 'Watch Our Video',
      title: 'Nucleus International Schools: Learning Beyond Books',
      description:
        'The Nucleus International Schools brand film: classrooms, science and AI labs, robotics, music, sport and the campus at Vatican, Addis Ababa, from pre-K through Grade 9.',
      duration: 'PT1M',
      uploadDate: '2026-08-16',
    },
    slides: [
      // The film slide, shown first. It replaced the Summer Camp campaign slide on 16 Aug 2026:
      // the camp closed on the 14th, and a homepage that opens with "Registration open" for a
      // finished event is worse than no campaign slide at all. The `campaign` slide kind is
      // still supported and is the right shape for the next real campaign.
      {
        kind: 'film',
        eyebrow: 'Learning Beyond Books',
        bgVideo: '/video/tvc-teaser.mp4',
        bgPoster: '/video/tvc-teaser-poster.webp',
        heading: 'See Nucleus in',
        headingAccent: 'sixty seconds.',
        subhead:
          'Inside our classrooms, science and AI labs, robotics, music and sport, on the campus at Vatican, Addis Ababa.',
        watchLabel: 'Watch the Film',
        link: { label: 'Book a Visit', url: '/contact', appearance: 'outline' },
        durationMs: 6000,
      },
      // Evergreen brand hero (looping video + typed tagline). Stays long enough to read.
      {
        kind: 'brand',
        bgVideo: '/video/hero.mp4',
        bgPoster: '/video/hero-poster.webp',
        eyebrow: 'International Cambridge Curriculum in Addis Ababa',
        amharic: 'ትምህርት ከደብተር ያልፋል',
        heading: 'Nucleus International Schools',
        tagline: 'Think Deeply. Create Boldly. Solve Truly.',
        subhead:
          'A Cambridge international education in the heart of Addis Ababa, raising secure, curious, globally-minded children from age 2 through Grade 8.',
        links: [
          { label: 'Register Now', url: '/register#application', appearance: 'primary' },
          { label: 'Visit Now', url: '/contact', appearance: 'outline' },
        ],
        durationMs: 4000,
      },
    ],
  },
  {
    blockType: 'stats',
    background: 'navy',
    items: [
      { value: 'Cambridge', label: 'International Pathway' }, // soft until Q2 (registered vs aligned)
      { value: 'Pre K-G8', label: 'Grades Served' },
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
      { iconName: 'GraduationCap', title: 'Cambridge Pathway', description: 'An internationally recognised curriculum that travels with your child: portable, rigorous, respected worldwide.', enableLink: true, link: { type: 'custom', label: 'Learn more', url: '/cambridge-pathway' } },
      { iconName: 'ShieldCheck', title: 'Advanced Security', description: 'A fortress of safety: controlled access and supervision, so learning happens with total peace of mind.', enableLink: true, link: { type: 'custom', label: 'Our campus', url: '/campus-life' } },
      { iconName: 'Bot', title: 'Robotics & STEM', description: 'Future-ready skills built through hands-on technology, coding and science.', enableLink: true, link: { type: 'custom', label: 'Learn more', url: '/robotics-stem' } },
      { iconName: 'Sprout', title: 'Agriculture & Animal Care', description: 'Real-world, holistic learning that connects children to nature and responsibility.', enableLink: true, link: { type: 'custom', label: 'Learn more', url: '/agriculture-animal-care' } },
      { iconName: 'Languages', title: 'Foreign & Multilingual Staff', description: 'Diverse, international faculty bringing global perspective and language depth.', enableLink: true, link: { type: 'custom', label: 'About us', url: '/about' } },
      { iconName: 'Utensils', title: 'Chef-Prepared Nutrition', description: 'Balanced, freshly-cooked meals, because well-fed minds learn better.', enableLink: true, link: { type: 'custom', label: 'Campus life', url: '/campus-life' } },
    ],
  },
  {
    blockType: 'whyCambridge',
    eyebrow: 'The Cambridge Difference',
    heading: 'An Education That Travels With Your Child',
    intro:
      'Nucleus follows the Cambridge Pathway, the world’s most widely recognised international curriculum. Wherever life takes your family, your child’s learning is recognised and respected.',
    stats: [
      { value: '160', label: 'Countries recognise Cambridge' },
      { value: '10,000+', label: 'Cambridge schools worldwide' },
      { value: 'Pre K-G8', label: 'One portable journey' },
    ],
    points: [
      { iconName: 'Globe', title: 'Globally portable', description: 'Move countries without losing a step. Cambridge is understood everywhere.' },
      { iconName: 'GraduationCap', title: 'University-recognised', description: 'Respected by leading universities around the world.' },
      { iconName: 'Lightbulb', title: 'Thinking, not memorising', description: 'Builds real understanding, problem-solving and curiosity.' },
    ],
    link: { label: 'Explore the Cambridge Pathway', url: '/cambridge-pathway' },
  },
  {
    blockType: 'testimonials',
    background: 'mist',
    heading: 'Loved by Nucleus Families',
    // PLACEHOLDER quotes, replace with real parent testimonials before publishing (open-questions.md).
    quotes: [
      { quote: 'For the first time I drop my daughter off without worrying. The security and the care are unlike anywhere we’ve been.', author: 'A Nucleus Parent', relationship: 'Parent, Early Years' },
      { quote: 'The robotics and the garden: my son comes home talking about what he built and what he grew. He’s genuinely excited to learn.', author: 'A Nucleus Parent', relationship: 'Parent, Primary' },
      { quote: 'A real international standard, with teachers from around the world, and they were clear and honest about fees from day one.', author: 'A Nucleus Parent', relationship: 'Diplomatic family' },
    ],
  },
  {
    blockType: 'ctaBand',
    background: 'navy',
    bgImage: '/images/stock/globe-3.webp',
    heading: 'Learning Beyond Books',
    subhead:
      'Robotics, agriculture, music, sport and a secure campus: a full life that shapes thinkers, creators and solvers.',
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
          'To see a global legacy of innovative thinkers who cross borders with humility and solve problems for a better tomorrow.',
      },
    ],
  },
  {
    blockType: 'coreValuesOrbit',
    eyebrow: 'Our Foundation',
    heading: 'Our Core Values',
    bgImage: '/images/stock/core-values.webp',
    bgTreatment: 'spotlight',
    headingAlign: 'left',
    headingColor: 'navy',
    values: coreValuesCards,
  },
  {
    blockType: 'dayTimeline',
    eyebrow: 'A Day in the Life',
    heading: 'A Day at Nucleus',
    intro:
      'From a secure morning welcome to a full, joyful afternoon, every day is structured to grow the whole child.',
    steps: [
      { time: '8:00', iconName: 'ShieldCheck', title: 'Safe Arrival', description: 'A calm, secure start, with every child welcomed by name.' },
      { time: '9:00', iconName: 'BookOpen', title: 'Cambridge Lessons', description: 'Literacy, numeracy and inquiry-led learning.' },
      { time: '12:30', iconName: 'Utensils', title: 'Chef-Prepared Lunch', description: 'Fresh, balanced meals cooked on campus.' },
      { time: '1:30', iconName: 'Bot', title: 'Robotics & Agriculture', description: 'Hands-on STEM, coding, gardening and animal care.' },
      { time: '3:00', iconName: 'Music', title: 'Music, Sport & Play', description: 'Band, PE and free play. A full life.' },
      { time: '3:30', iconName: 'Navigation', title: 'Safe Departure', description: 'Supervised, secure dismissal home.' },
    ],
  },
  {
    blockType: 'galleryBlock',
    heading: 'Campus Life',
    // No category filter: this band shows a MIX (campus/classroom/stem/sports). Filtering to
    // 'campus' collapses it to one card now that the gallery collection is seeded.
    source: 'category',
    limit: 4,
  },
  {
    blockType: 'faqList',
    background: 'mist',
    heading: 'Parents Often Ask',
    items: [
      { q: 'What curriculum does Nucleus follow?', a: 'The Cambridge pathway, from the early years through Grade 8: a portable, internationally recognised education.' },
      { q: 'What ages does Nucleus accept?', a: 'Children from age 2 through Grade 8, on a single planned journey from the early years into the Cambridge primary and middle years.' },
      { q: 'Where is Nucleus located?', a: 'Two campuses are open in Addis Ababa: the Vatican grade school campus (behind the Vatican Embassy) and the Abo preschool campus (100 m from Mekanisa Abo Square). A third campus at Totot, behind World Vision, is being finished now.' },
      { q: 'How much are the fees?', a: 'We keep fees transparent, with no hidden capital-fee surprises. Request the full fee sheet and we’ll send it directly.' },
      { q: 'How safe is the campus?', a: 'Safety comes first. A secure, supervised campus with controlled access is the foundation of everything we do.' },
      { q: 'Is an international school worth it compared to a local school?', a: 'A good international school gives a portable, globally recognised education, smaller classes and learning beyond the textbook. It costs more, so the value depends on the school delivering it in practice, which is why we encourage you to visit and see for yourself.' },
      { q: 'Cambridge or IB: which is better for my child?', a: 'Neither is automatically better. Cambridge is structured and exam-based; the IB is inquiry and project-led. Nucleus follows Cambridge for its clear structure and global portability.' },
    ],
  },
  {
    blockType: 'ctaBand',
    background: 'purple',
    bgImage: '/images/stock/globe-1.webp',
    heading: 'Registration is open: Gift Your Kids a Full Life',
    subhead: 'Secure your child’s place for the upcoming intake. Places fill quickly.',
    links: [
      { link: { appearance: 'primary', type: 'custom', label: 'Register Now', url: '/register#application' } },
      { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
    ],
  },
  {
    blockType: 'map',
    heading: 'The go-to school for parents around Sarbet, Mekanisa, Bisrate Gabriel and Lebu',
    intro: 'Easy to reach from Bole, Old Airport, Kazanchis, Mexico and Jemo. Come and see a full life in motion.',
    campuses: [
      {
        name: 'Grade School Campus',
        embedSrc: 'https://www.google.com/maps?q=Nucleus+International+Schools,+Addis+Ababa&z=17&hl=en&output=embed',
        directionsUrl: 'https://maps.app.goo.gl/DHQMbtpZc7PBDWEF8',
        streetAddress: 'Sarbet Vatican, 50 metres behind the Vatican Embassy',
        telephone: ['0981999922', '0981999933'],
        rows: [
          {
            iconName: 'MapPin',
            title: 'Grade School Campus Address',
            description: 'Sarbet Vatican Campus, 50 metres behind the Vatican Embassy, Addis Ababa, Ethiopia.',
          },
          { iconName: 'Phone', title: 'Call Us', description: '09 81 99 99 22 · 09 81 99 99 33' },
          { iconName: 'Clock', title: 'School Hours', description: 'Monday–Friday, 8:00 AM – 3:30 PM' },
        ],
      },
      {
        name: 'Preschool Campus',
        embedSrc: 'https://www.google.com/maps?q=8.9817515,38.7337897&z=17&hl=en&output=embed',
        directionsUrl: 'https://maps.app.goo.gl/BodKtkUxY6JiBKDz5',
        streetAddress: 'Abo Mekanisa, 100 metres from Mekanisa Abo Square',
        telephone: ['0981999922', '0981999933'],
        rows: [
          {
            iconName: 'MapPin',
            title: 'Preschool Campus Address',
            description: 'Abo Mekanisa Campus, 100 metres from Mekanisa Abo Square, Addis Ababa, Ethiopia.',
          },
          { iconName: 'Phone', title: 'Call Us', description: '09 81 99 99 22 · 09 81 99 99 33' },
          { iconName: 'Clock', title: 'School Hours', description: 'Monday–Friday, 8:00 AM – 3:30 PM' },
        ],
      },
    ],
  },
  // Totot sits directly beneath the map on purpose: the two open campuses have pins, the third
  // has this instead, same place in the page, no map embed and no directions to a working build.
  { blockType: 'campusComingSoon' },
  {
    blockType: 'latestPosts',
    heading: 'From the Blog',
    intro: 'Stories, milestones and ideas from our learning community.',
  },
  {
    blockType: 'socialFollow',
    background: 'mist',
    heading: 'Follow Nucleus',
    intro: 'The classrooms, the camps and the day-to-day, posted as it happens. We are most active on Facebook and TikTok.',
  },
] as RenderableBlock[]
