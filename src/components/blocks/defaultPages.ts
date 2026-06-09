import type { RenderableBlock } from './BlockRenderer'

/**
 * Code-defined inner pages, used until an editor creates a CMS Page with the matching slug.
 * Same block shapes + renderer as the homepage → fully CMS-overridable, not throwaway.
 *
 * Copy follows content/website-content.md + the brand voice. Grounded ONLY in confirmed facts;
 * unverified specifics (fees, staff names, founding year, "registered Cambridge", security details)
 * are deliberately kept soft until content/open-questions.md is answered.
 *
 * Section rhythm blends via white → mist → white, navy/purple reserved for hero + emphasis bands.
 */
export type DefaultPage = {
  title: string
  seoTitle: string
  description: string
  layout: RenderableBlock[]
}

export const defaultPages: Record<string, DefaultPage> = {
  about: {
    title: 'About',
    seoTitle: 'About Nucleus International School | Cambridge School in Mekanisa, Addis Ababa',
    description:
      'From a trusted Addis daycare to a Cambridge international school. The story, mission and values behind Nucleus in Mekanisa — and our growth toward a Gerji campus.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'About Nucleus',
        heading: 'A Full Life\nBegins Here',
        bgImage: '/images/stock/about-hero.jpg',
        subhead:
          'Nucleus is growing from one of Addis Ababa’s most trusted homes for early childhood into a full Cambridge international school — without ever losing the warmth that built it.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } }],
      },
      {
        blockType: 'prose',
        eyebrow: 'Our Story',
        heading: 'Care first. Then the world.',
        items: [
          {
            type: 'lead',
            text: 'Nucleus began as a place parents chose for safety, warmth and genuine care. Today that same foundation is becoming a full Cambridge international school.',
          },
          {
            type: 'p',
            text: 'Our Mekanisa campus is our proof of concept — where we show, every day, that elite academic standards and a nurturing, secure environment belong together. It is the first step in a longer journey, with a second campus planned for Gerji.',
          },
          { type: 'h3', text: 'Our Mission' },
          {
            type: 'p',
            text: 'To mold a generation of thinkers, creators and problem-solvers — self-aware, innovative leaders who navigate a globalized world with humility, compassion and a heart for service.',
          },
          { type: 'h3', text: 'What We Believe' },
          {
            type: 'ul',
            items: [
              'Think Deeply — compassionate curiosity.',
              'Create Boldly — purposeful vision.',
              'Solve Truly — true servanthood.',
            ],
          },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'mist',
        heading: 'Our Core Values',
        columns: '3',
        cards: [
          { iconName: 'Award', title: 'Excellence in Education', description: 'Holding every learner to a high, caring standard.' },
          { iconName: 'Scale', title: 'Integrity & Respect', description: 'Character first — honesty and respect in everything.' },
          { iconName: 'Lightbulb', title: 'Creativity & Innovation', description: 'Encouraging bold thinking and original ideas.' },
          { iconName: 'Target', title: 'Responsibility & Discipline', description: 'Building self-direction and good habits for life.' },
          { iconName: 'Users', title: 'Community & Collaboration', description: 'Families and faculty growing together.' },
          { iconName: 'HeartHandshake', title: 'A Heart for Service', description: 'Leadership measured by how we lift others.' },
        ],
      },
      {
        blockType: 'ctaBand',
        background: 'navy',
        heading: 'Come see it for yourself',
        subhead: 'The best way to understand Nucleus is to visit. Book a tour of our Mekanisa campus.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } }],
      },
    ],
  },

  academics: {
    title: 'Academics',
    seoTitle: 'Cambridge Curriculum in Addis Ababa | Nucleus Academics (Ages 2–Grade 8)',
    description:
      'The Cambridge pathway at Nucleus International School, Mekanisa — Early Years through Grade 8, with robotics, STEM, agriculture and multilingual learning. A portable, world-class education.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'Academics',
        heading: 'A Cambridge Education,\nBuilt for the Real World',
        bgImage: '/images/stock/academics-hero.jpg',
        subhead:
          'We follow the Cambridge pathway — one of the world’s most recognised and portable curricula — rewarding deep understanding over memorisation.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'The Cambridge Pathway', url: '/cambridge-pathway' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Book a Tour', url: '/contact' } },
        ],
      },
      {
        blockType: 'prose',
        eyebrow: 'The Pathway',
        heading: 'An education that travels with your child',
        items: [
          {
            type: 'lead',
            text: 'A Nucleus child is prepared to continue — and to thrive — at schools across Europe, North America and beyond.',
          },
          {
            type: 'p',
            text: 'We teach across three stages, growing with your child from their earliest years through to Grade 8.',
          },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'mist',
        heading: 'The Stages',
        intro: 'A continuous Cambridge journey from first steps to Grade 8.',
        columns: '3',
        cards: [
          { iconName: 'Baby', title: 'Early Years', description: 'Play-based foundations: language, numeracy, curiosity and confidence.' },
          { iconName: 'BookOpen', title: 'Primary', description: 'Cambridge Primary across English, Mathematics, Science and more.' },
          { iconName: 'GraduationCap', title: 'Lower Secondary', description: 'Cambridge Lower Secondary through Grade 8, building toward IGCSE-readiness.' },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'white',
        eyebrow: 'Beyond the Core',
        heading: 'Learning Beyond Books',
        columns: '4',
        cards: [
          { iconName: 'Bot', title: 'Robotics & STEM', description: 'Coding, engineering and hands-on problem-solving.', enableLink: true, link: { type: 'custom', label: 'Explore Robotics & STEM', url: '/robotics-stem' } },
          { iconName: 'Sprout', title: 'Agriculture & Animal Care', description: 'The “Farmer-Scientist” — science you can hold.', enableLink: true, link: { type: 'custom', label: 'Explore Agriculture', url: '/agriculture-animal-care' } },
          { iconName: 'Music', title: 'Music & the Band', description: 'Expression, discipline and joy through music.' },
          { iconName: 'Languages', title: 'Multilingual Learning', description: 'English and Amharic, taught bilingually.' },
        ],
      },
      {
        blockType: 'ctaBand',
        background: 'purple',
        heading: 'Cambridge or IB? Let’s talk it through.',
        subhead: 'Choosing a curriculum is a big decision. Visit us and we’ll help you weigh what fits your child.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } }],
      },
    ],
  },

  'campus-life': {
    title: 'Campus Life',
    seoTitle: 'Campus Life at Nucleus | Robotics, Agriculture, Music & a Secure Campus in Mekanisa',
    description:
      'Inside Nucleus International School, Mekanisa: robotics & STEM, an agriculture & animal-care program, music, sport, chef-prepared meals and a secure, nurturing campus.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'Campus Life',
        heading: 'Learning Beyond Books',
        amharicSubline: 'ትምህርት ከደብተር ያልፋል',
        bgImage: '/images/stock/campus-hero.jpg',
        subhead:
          'Robotics, agriculture, music, sport and chef-prepared meals — a full education that reaches far beyond the notebook, on a campus built for peace of mind.',
      },
      {
        blockType: 'cardsGrid',
        background: 'white',
        heading: 'A Day at Nucleus',
        columns: '3',
        cards: [
          { iconName: 'ShieldCheck', title: 'A Secure Campus', description: 'Peace of mind first — a safe, supervised environment where children can simply be children.' },
          { iconName: 'Bot', title: 'Robotics & STEM', description: 'Hands-on technology, coding and science that build future-ready thinkers.' },
          { iconName: 'Sprout', title: 'Agriculture & Animal Care', description: 'Nature beyond concrete — responsibility, patience and wonder.' },
          { iconName: 'Utensils', title: 'The Chef’s Kitchen', description: 'Chef-prepared, nutritionist-minded meals to fuel growing minds.' },
          { iconName: 'Music', title: 'Music & Sport', description: 'Band, movement and play — confidence built beyond the classroom.' },
          { iconName: 'Users', title: 'A Nurturing Community', description: 'Warm, attentive staff who know every child by name.' },
        ],
      },
      { blockType: 'galleryBlock', heading: 'Moments from Campus', source: 'category', category: 'campus', limit: 8 },
      {
        blockType: 'ctaBand',
        background: 'purple',
        heading: 'See a full life in motion',
        subhead: 'Book a tour and walk our Mekanisa campus.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } }],
      },
    ],
  },

  admissions: {
    title: 'Admissions',
    seoTitle: 'Admissions & Fees | Nucleus International School, Addis Ababa',
    description:
      'How to join Nucleus International School in Mekanisa — admissions steps, requirements, tour booking and transparent fee information. Request your full fee sheet.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'Admissions',
        heading: 'Joining Nucleus',
        bgImage: '/images/stock/admissions-hero.jpg',
        subhead:
          'We believe families deserve clarity — no hidden capital-fee surprises. Request your full fee sheet and we’ll send it directly.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Request Fee Sheet', url: '/contact' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Book a Tour', url: '/contact' } },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'white',
        eyebrow: 'How to Apply',
        heading: 'Four simple steps',
        columns: '4',
        cards: [
          { iconName: 'CalendarCheck', title: '1. Book a Tour', description: 'Visit our Mekanisa campus and meet the team.' },
          { iconName: 'FileText', title: '2. Enquire', description: 'Submit an enquiry and receive the full fee sheet.' },
          { iconName: 'ClipboardCheck', title: '3. Apply', description: 'Complete the application with your child’s documents.' },
          { iconName: 'BadgeCheck', title: '4. Confirm', description: 'Secure your child’s place for the intake.' },
        ],
      },
      {
        blockType: 'prose',
        background: 'mist',
        heading: 'What to bring',
        items: [
          { type: 'p', text: 'To apply, please have the following ready:' },
          {
            type: 'ul',
            items: [
              'Child’s birth certificate',
              'Previous report card (if applicable)',
              'Passport-size photographs',
              'Parent / guardian ID',
            ],
          },
          {
            type: 'p',
            text: 'Registration dates and term structure for the upcoming intake will be confirmed here shortly.',
          },
        ],
      },
      {
        blockType: 'faqList',
        heading: 'Admissions FAQ',
        intro: 'The questions families ask us most.',
        items: [
          { q: 'What curriculum does Nucleus follow?', a: 'Nucleus follows the Cambridge pathway, from the early years through Grade 8 — a portable, internationally recognised education.' },
          { q: 'Where is Nucleus located?', a: 'In Mekanisa, about 100 metres from Mekanisa Abo Square, Addis Ababa.' },
          { q: 'What ages and grades do you accept?', a: 'We serve children from age 2 through Grade 8, growing with your child across early years, primary and lower secondary.' },
          { q: 'How much are the fees?', a: 'We keep our fees transparent and free of hidden capital-fee surprises. Request the full fee sheet and we’ll share it with you directly.' },
          { q: 'Is the campus safe?', a: 'Safety and child safeguarding come first at Nucleus — a secure, supervised campus is the foundation of everything we do.' },
          { q: 'Do you have foreign and multilingual teachers?', a: 'Yes. Our team includes certified, multilingual and international educators.' },
          { q: 'Do you offer robotics, STEM and agriculture?', a: 'Yes — hands-on robotics & STEM and an agriculture & animal-care program are part of learning at Nucleus.' },
          { q: 'How do I apply or book a tour?', a: 'Start by booking a tour or sending an enquiry through our contact page — we’ll guide you through every step.' },
        ],
      },
      {
        blockType: 'formBlock',
        formType: 'fee-request',
        background: 'white',
        heading: 'Request the Full Fee Sheet',
        intro: 'Leave your details and we’ll send the complete fee sheet — every line, no hidden surprises.',
        successMessage: 'Thank you — we’ll email you the full fee sheet shortly.',
      },
      {
        blockType: 'ctaBand',
        background: 'purple',
        heading: 'Gift your kids a full life',
        subhead: 'Prefer to talk? Call us or book a tour.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } }],
      },
    ],
  },

  contact: {
    title: 'Contact & Visit',
    seoTitle: 'Contact & Visit | Nucleus International School, Mekanisa, Addis Ababa',
    description:
      'Visit Nucleus International School — 100m from Mekanisa Abo Square, Addis Ababa. Directions from Bole, Old Airport and Kazanchis, contact numbers, and how to book a tour.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'Contact & Visit',
        heading: 'Come See a Full Life\nin Motion',
        bgImage: '/images/stock/contact-hero.jpg',
        subhead:
          'We’d love to show you around. Find us in Mekanisa, about 100 metres from Mekanisa Abo Square, Addis Ababa.',
      },
      {
        blockType: 'cardsGrid',
        background: 'white',
        heading: 'Reach Us',
        columns: '3',
        cards: [
          { iconName: 'Phone', title: 'Call', description: '0947500992 / 0947500494' },
          { iconName: 'MapPin', title: 'Visit', description: 'Mekanisa, ~100m from Mekanisa Abo Square, Addis Ababa.' },
          { iconName: 'CalendarCheck', title: 'Book a Tour', description: 'Arrange a visit and meet our team in person.' },
        ],
      },
      {
        blockType: 'formBlock',
        formType: 'tour',
        background: 'white',
        heading: 'Book a Tour',
        intro: 'Tell us a little about your family and we’ll arrange a visit that suits you.',
        successMessage: 'Thank you — we’ll be in touch within one business day to confirm your visit.',
      },
      {
        blockType: 'prose',
        background: 'mist',
        heading: 'Getting to the School',
        items: [
          {
            type: 'p',
            text: 'Our Mekanisa campus is easy to reach from across Addis Ababa — including Bole, Old Airport, Kazanchis and Gerji. A detailed route map with one-tap directions is coming soon.',
          },
        ],
      },
      {
        blockType: 'ctaBand',
        background: 'navy',
        heading: 'Arrange your visit',
        subhead: 'Call us or send an enquiry — we’ll find a time that works for your family.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Call 0947500992', url: 'tel:0947500992' } }],
      },
    ],
  },

  news: {
    title: 'News & Perspectives',
    seoTitle: 'News & Perspectives | Nucleus International School',
    description:
      'Stories, milestones and ideas from the Nucleus International School learning community in Mekanisa, Addis Ababa.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'News & Perspectives',
        heading: 'From Our\nLearning Community',
        bgImage: '/images/stock/news-hero.jpg',
        subhead: 'Stories, milestones and ideas from campus.',
      },
      { blockType: 'latestPosts', heading: 'Latest', limit: 9 },
    ],
  },

  'cambridge-pathway': {
    title: 'Cambridge Pathway',
    seoTitle: 'The Cambridge Pathway at Nucleus | Cambridge School in Addis Ababa',
    description:
      'The Cambridge pathway at Nucleus International School, Mekanisa — a portable, internationally recognised education from the early years through Grade 8.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        bgImage: '/images/stock/academics-hero.jpg',
        eyebrow: 'Academics',
        heading: 'The Cambridge Pathway',
        subhead:
          'A world-class, portable curriculum that rewards deep understanding over memorisation — and travels with your child anywhere in the world.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } }],
      },
      {
        blockType: 'prose',
        eyebrow: 'Why Cambridge',
        heading: 'An education that opens doors',
        items: [
          { type: 'lead', text: 'The Cambridge pathway is one of the world’s most recognised curricula — structured, rigorous and respected by universities across Europe, North America and beyond.' },
          { type: 'p', text: 'At Nucleus we follow the Cambridge pathway from the early years through Grade 8, so a child who begins in Mekanisa is prepared to continue, and to thrive, wherever life takes your family next.' },
          { type: 'p', text: 'It is content-rich and clearly assessed, which suits children who like defined goals and steady, visible progress.' },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'mist',
        heading: 'The Stages',
        intro: 'A continuous Cambridge journey from first steps to Grade 8.',
        columns: '3',
        cards: [
          { iconName: 'Baby', title: 'Early Years', description: 'Play-based foundations: language, numeracy, curiosity and confidence.' },
          { iconName: 'BookOpen', title: 'Primary', description: 'Cambridge Primary across English, Mathematics, Science and more.' },
          { iconName: 'GraduationCap', title: 'Lower Secondary', description: 'Cambridge Lower Secondary through Grade 8, building toward IGCSE-readiness.' },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'white',
        eyebrow: 'Explore More',
        heading: 'Beyond the curriculum',
        columns: '3',
        cards: [
          { iconName: 'Bot', title: 'Robotics & STEM', description: 'Future-ready, hands-on technology and science.', enableLink: true, link: { type: 'custom', label: 'Explore Robotics & STEM', url: '/robotics-stem' } },
          { iconName: 'Sprout', title: 'Agriculture & Animal Care', description: 'Real-world, holistic learning rooted in nature.', enableLink: true, link: { type: 'custom', label: 'Explore Agriculture', url: '/agriculture-animal-care' } },
          { iconName: 'Scale', title: 'Cambridge or IB?', description: 'How the two compare for your child.', enableLink: true, link: { type: 'custom', label: 'Read the guide', url: '/news/cambridge-vs-ib-addis-ababa' } },
        ],
      },
      {
        blockType: 'ctaBand',
        background: 'purple',
        heading: 'See the Cambridge pathway in action',
        subhead: 'Book a tour of our Mekanisa campus, or request the full fee sheet.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Admissions & Fees', url: '/admissions' } },
        ],
      },
    ],
  },

  'robotics-stem': {
    title: 'Robotics & STEM',
    seoTitle: 'Robotics & STEM at Nucleus | Hands-on Tech for Kids in Addis Ababa',
    description:
      'Robotics, coding and STEM at Nucleus International School, Mekanisa — future-ready skills built through hands-on technology and science from an early age.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        bgImage: '/images/stock/gallery-stem.jpg',
        eyebrow: 'Learning Beyond Books',
        heading: 'Robotics & STEM',
        subhead:
          'Coding, robotics and science that turn curious children into confident problem-solvers — unafraid of hard problems.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } }],
      },
      {
        blockType: 'prose',
        eyebrow: 'Why it matters early',
        heading: 'Building thinkers, not just test-takers',
        items: [
          { type: 'lead', text: 'When children build something — a circuit, a program, a robot — they meet real problems and solve them. That habit carries into everything else they learn.' },
          { type: 'p', text: 'Coding and robotics teach logic, sequencing and resilience. A program that doesn’t work isn’t a failure; it’s a puzzle. Children who grow up debugging grow up unafraid of hard problems.' },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'mist',
        heading: 'What students do',
        columns: '4',
        cards: [
          { iconName: 'Cpu', title: 'Coding', description: 'Logic and sequencing through age-appropriate coding.' },
          { iconName: 'Bot', title: 'Robotics', description: 'Designing, building and testing real robots.' },
          { iconName: 'FlaskConical', title: 'Science', description: 'Hands-on experiments that make ideas stick.' },
          { iconName: 'Lightbulb', title: 'Problem-Solving', description: 'Iteration, teamwork and creative thinking.' },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'white',
        eyebrow: 'Explore More',
        heading: 'A full, holistic education',
        columns: '3',
        cards: [
          { iconName: 'GraduationCap', title: 'Cambridge Pathway', description: 'Our portable, world-class curriculum.', enableLink: true, link: { type: 'custom', label: 'Explore Academics', url: '/cambridge-pathway' } },
          { iconName: 'Sprout', title: 'Agriculture & Animal Care', description: 'Science you can hold.', enableLink: true, link: { type: 'custom', label: 'Explore Agriculture', url: '/agriculture-animal-care' } },
          { iconName: 'Sparkles', title: 'Why this matters', description: 'The case for hands-on learning.', enableLink: true, link: { type: 'custom', label: 'Read the article', url: '/news/why-robotics-stem-agriculture-matter-early' } },
        ],
      },
      {
        blockType: 'ctaBand',
        background: 'purple',
        heading: 'Watch curiosity become capability',
        subhead: 'Book a tour and see our learning in motion.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } }],
      },
    ],
  },

  'agriculture-animal-care': {
    title: 'Agriculture & Animal Care',
    seoTitle: 'Agriculture & Animal Care at Nucleus | Learning Beyond Books, Addis Ababa',
    description:
      'Agriculture and animal care at Nucleus International School, Mekanisa — holistic, hands-on learning that roots children in nature, patience and responsibility.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        bgImage: '/images/stock/blog-beyond.jpg',
        eyebrow: 'Learning Beyond Books',
        heading: 'Agriculture &\nAnimal Care',
        subhead:
          'The “Farmer-Scientist” — tending plants and animals teaches patience, responsibility and a feel for cause and effect no screen can.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } }],
      },
      {
        blockType: 'prose',
        eyebrow: 'Nature beyond concrete',
        heading: 'Science you can hold',
        items: [
          { type: 'lead', text: 'There is a kind of learning that only happens with soil on your hands and a living thing in your care.' },
          { type: 'p', text: 'Tending a garden and caring for animals slows childhood down in the best way — building patience, responsibility and a genuine feel for how the natural world works.' },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'mist',
        heading: 'What students do',
        columns: '3',
        cards: [
          { iconName: 'Sprout', title: 'Growing', description: 'Planting, tending and harvesting — patience made real.' },
          { iconName: 'Heart', title: 'Animal Care', description: 'Responsibility and empathy through caring for animals.' },
          { iconName: 'FlaskConical', title: 'Real Science', description: 'Cause and effect, observed and understood first-hand.' },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'white',
        eyebrow: 'Explore More',
        heading: 'A full, holistic education',
        columns: '3',
        cards: [
          { iconName: 'GraduationCap', title: 'Cambridge Pathway', description: 'Our portable, world-class curriculum.', enableLink: true, link: { type: 'custom', label: 'Explore Academics', url: '/cambridge-pathway' } },
          { iconName: 'Bot', title: 'Robotics & STEM', description: 'Future-ready, hands-on technology.', enableLink: true, link: { type: 'custom', label: 'Explore Robotics & STEM', url: '/robotics-stem' } },
          { iconName: 'Compass', title: 'Campus Life', description: 'See the whole of life at Nucleus.', enableLink: true, link: { type: 'custom', label: 'Explore Campus Life', url: '/campus-life' } },
        ],
      },
      {
        blockType: 'ctaBand',
        background: 'purple',
        heading: 'A full life starts outdoors',
        subhead: 'Book a tour of our Mekanisa campus.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } }],
      },
    ],
  },
}
