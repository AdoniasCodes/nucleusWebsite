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
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Book a Tour', url: '/contact' } }],
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
          { iconName: 'Bot', title: 'Robotics & STEM', description: 'Coding, engineering and hands-on problem-solving.' },
          { iconName: 'Sprout', title: 'Agriculture & Animal Care', description: 'The “Farmer-Scientist” — science you can hold.' },
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
        blockType: 'ctaBand',
        background: 'purple',
        heading: 'Gift your kids a full life',
        subhead: 'Places fill quickly. Start your enquiry today.',
        links: [{ link: { appearance: 'primary', type: 'custom', label: 'Request Fee Sheet', url: '/contact' } }],
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
}
