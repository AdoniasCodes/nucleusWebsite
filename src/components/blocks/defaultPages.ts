import type { RenderableBlock } from './BlockRenderer'
import { legalPages } from './legalPages'

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
    seoTitle: 'About Nucleus | International Cambridge Curriculum at Vatican, Addis Ababa',
    description:
      'From a trusted Addis preschool to the full international Cambridge curriculum. The story, mission and values behind Nucleus at Vatican, Addis Ababa, and our growth toward a Gerji campus.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'About Nucleus',
        heading: 'A Full Life\nBegins Here',
        bgImage: '/images/stock/about-hero.webp',
        subhead:
          'Nucleus is growing from one of Addis Ababa’s most trusted homes for early childhood into a school teaching the full international Cambridge curriculum, without ever losing the warmth that built it.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Register Now', url: '/register#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
      {
        blockType: 'prose',
        eyebrow: 'Our Story',
        heading: 'Care first, then the world',
        items: [
          {
            type: 'lead',
            text: 'Nucleus began as a place parents chose for safety, warmth and genuine care. Today that same foundation carries the full international Cambridge curriculum.',
          },
          {
            type: 'p',
            text: 'Our Vatican campus is our proof of concept, where we show, every day, that elite academic standards and a nurturing, secure environment belong together. It is the first step in a longer journey, with a second campus planned for Gerji.',
          },
          { type: 'h3', text: 'What We Believe' },
          {
            type: 'ul',
            items: [
              'Think Deeply: compassionate curiosity.',
              'Create Boldly: purposeful vision.',
              'Solve Truly: true servanthood.',
            ],
          },
        ],
      },
      // The story, then the place, then the founder. Seeing the campus is what turns a page
      // visit into a tour booking, so it sits high rather than at the bottom.
      {
        blockType: 'campusVideo',
        background: 'navy',
        eyebrow: 'Take a Look Around',
        heading: 'A Walk Through Our Campus',
        intro:
          'Classrooms, the science and computer labs, the music room, the library, the pitch and the grounds at Vatican. Filmed on an ordinary school day.',
      },
      { blockType: 'founderMessage' },
      {
        blockType: 'cardsGrid',
        background: 'white',
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
        blockType: 'cardsGrid',
        background: 'mist',
        heading: 'Our Core Values',
        columns: '3',
        cards: [
          { iconName: 'Handshake', title: 'Honesty', description: 'Living and speaking with absolute truthfulness to build a community rooted in mutual trust.' },
          { iconName: 'ShieldCheck', title: 'Integrity', description: 'Doing what is right, honorable, and ethical in all circumstances, even when no one is watching.' },
          { iconName: 'Eye', title: 'Transparency', description: 'Maintaining open, clear, and visible communication with students, parents, and stakeholders.' },
          { iconName: 'Mountain', title: 'Resilience', description: 'Embracing challenges with grit, learning from mistakes, and persisting through obstacles to solve complex problems.' },
          { iconName: 'Heart', title: 'Care', description: 'Putting the emotional, social, and physical well-being of every child at the center of all decisions.' },
          { iconName: 'Award', title: 'Excellence', description: 'Striving for the highest standards in innovation, academic growth, and personal achievement.' },
        ],
      },
      { blockType: 'learnerPromise' },
      { blockType: 'ourTeam' },
      // Small recruitment strip, straight under the portraits: people who have just read the
      // team's bios are the warmest possible careers traffic.
      { blockType: 'joinTeam' },
      {
        blockType: 'ctaBand',
        background: 'navy',
        bgImage: '/images/stock/cta-about.webp',
        heading: 'Come see it for yourself',
        subhead: 'The best way to understand Nucleus is to visit our campus and meet the team.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Register Now', url: '/register#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
    ],
  },

  'summer-camp': {
    title: 'Summer Camp',
    seoTitle: 'Nucleus Summer Camp 2026 in Addis Ababa | Robotics, STEM, Sport, Music & Art',
    description:
      'Nucleus Summer Camp 2026 (July 6 – August 12) in Addis Ababa: robotics, STEM labs, chess, taekwondo, football, basketball, music and art, led by qualified Cambridge educators on two secure campuses. Register your child.',
    layout: [
      { blockType: 'summerCampHero' },
      {
        blockType: 'stats',
        background: 'navy',
        items: [
          { value: '6 weeks', label: 'July 6 – Aug 12' },
          { value: '10+', label: 'Activities' },
          { value: '2', label: 'Secure campuses' },
          { value: 'Ages 4–14', label: 'Welcome' },
        ],
      },
      { blockType: 'campMoments', background: 'white' },
      { blockType: 'campActivities', anchor: 'activities' },
      {
        blockType: 'cardsGrid',
        background: 'white',
        eyebrow: 'Why Nucleus',
        heading: 'A summer camp that’s actually good for them',
        intro: 'Not a place to drop the kids. It is a place they come home from taller, braver and full of stories.',
        columns: '3',
        cards: [
          { iconName: 'GraduationCap', title: 'Qualified educators', description: 'Every activity is led by a specialist who teaches for a living, Cambridge-aligned and genuinely great with children.' },
          { iconName: 'ShieldCheck', title: 'Serious about safety', description: 'Secure, supervised campuses with a dedicated head of security. Peace of mind is part of the package.' },
          { iconName: 'Sprout', title: 'Real growth, not screen time', description: 'Children build robots, skills and friendships, leaving with confidence they carry into the school year.' },
          { iconName: 'MapPin', title: 'Two convenient campuses', description: 'Choose Mekanisa or the Vatican campus, whichever is closest and easiest for your family.' },
          { iconName: 'Users', title: 'Small, mixed-age groups', description: 'Grouped by age so every child is challenged at the right level and never lost in the crowd.' },
          { iconName: 'Sun', title: 'Flexible weeks', description: 'Join for the full six weeks or the weeks that suit your summer. We’ll help you plan it.' },
        ],
      },
      { blockType: 'campInstructors', background: 'mist' },
      {
        blockType: 'cardsGrid',
        background: 'white',
        eyebrow: 'Good to Know',
        heading: 'The essentials',
        columns: '3',
        cards: [
          { iconName: 'CalendarCheck', title: 'Dates', description: 'July 6 – August 12, 2026. Join for all six weeks or by the week.' },
          { iconName: 'MapPin', title: 'Campuses', description: 'Mekanisa Campus and the Vatican Campus, Addis Ababa.' },
          { iconName: 'Sun', title: 'Ages', description: 'Open to children ages 4–14, grouped by age for the right challenge.' },
        ],
      },
      {
        blockType: 'formBlock',
        formType: 'summer-camp',
        anchor: 'register',
        background: 'offwhite',
        heading: 'Reserve your child’s spot',
        intro:
          'Tell us a little about your child and we’ll follow up within one business day with dates, pricing and how to secure a place. Spots are limited per campus.',
        successMessage: 'Thank you! Your spot request is in. Our camp team will call or email you within one business day.',
      },
      {
        blockType: 'ctaBand',
        background: 'navy',
        heading: 'Questions before you register?',
        subhead: 'Talk to our camp team directly. We’ll help you choose the right weeks and campus for your child.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Call 0981 999 922', url: 'tel:+251981999922' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Reserve a spot', url: '#register' } },
        ],
      },
    ],
  },

  academics: {
    title: 'Academics',
    seoTitle: 'International Cambridge Curriculum in Addis Ababa | Nucleus Academics',
    description:
      'The Cambridge pathway at Nucleus International Schools, Vatican: Early Years through Grade 8, with robotics, STEM, agriculture and multilingual learning. A portable, world-class education.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'Academics',
        heading: 'A Cambridge Education,\nBuilt for the Real World',
        bgImage: '/images/stock/academics-hero.webp',
        subhead:
          'We follow the Cambridge pathway, one of the world’s most recognised and portable curricula, rewarding deep understanding over memorisation.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'The Cambridge Pathway', url: '/cambridge-pathway' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
      {
        blockType: 'prose',
        eyebrow: 'The Pathway',
        heading: 'An education that travels with your child',
        items: [
          {
            type: 'lead',
            text: 'A Nucleus child is prepared to continue, and to thrive, at schools across Europe, North America and beyond.',
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
          { iconName: 'Sprout', title: 'Agriculture & Animal Care', description: 'The “Farmer-Scientist”: science you can hold.', enableLink: true, link: { type: 'custom', label: 'Explore Agriculture', url: '/agriculture-animal-care' } },
          { iconName: 'Music', title: 'Music & the Band', description: 'Expression, discipline and joy through music.' },
          { iconName: 'Languages', title: 'Multilingual Learning', description: 'English and Amharic, taught bilingually.' },
        ],
      },
      {
        blockType: 'ctaBand',
        background: 'purple',
        bgImage: '/images/stock/cta-academics.webp',
        heading: 'Cambridge or IB? Let’s talk it through.',
        subhead: 'Choosing a curriculum is a big decision. Visit us and we’ll help you weigh what fits your child.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Register Now', url: '/register#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
    ],
  },

  'campus-life': {
    title: 'Campus Life',
    seoTitle: 'Campus Life at Nucleus | Robotics, Agriculture, Music & a Secure Campus at Vatican',
    description:
      'Inside Nucleus International Schools, Vatican: robotics & STEM, an agriculture & animal-care program, music, sport, chef-prepared meals and a secure, nurturing campus.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'Campus Life',
        heading: 'Learning Beyond Books',
        amharicSubline: 'ትምህርት ከደብተር ያልፋል',
        bgImage: '/images/stock/campus-hero.webp',
        subhead:
          'Robotics, agriculture, music, sport and chef-prepared meals: a full education that reaches far beyond the notebook, on a campus built for peace of mind.',
      },
      {
        blockType: 'cardsGrid',
        background: 'white',
        heading: 'A Day at Nucleus',
        columns: '3',
        cards: [
          { iconName: 'ShieldCheck', title: 'A Secure Campus', description: 'Peace of mind first: a safe, supervised environment where children can simply be children.' },
          { iconName: 'Bot', title: 'Robotics & STEM', description: 'Hands-on technology, coding and science that build future-ready thinkers.' },
          { iconName: 'Sprout', title: 'Agriculture & Animal Care', description: 'Nature beyond concrete: responsibility, patience and wonder.' },
          { iconName: 'Utensils', title: 'The Chef’s Kitchen', description: 'Chef-prepared, nutritionist-minded meals to fuel growing minds.' },
          { iconName: 'Music', title: 'Music & Sport', description: 'Band, movement and play: confidence built beyond the classroom.' },
          { iconName: 'Users', title: 'A Nurturing Community', description: 'Warm, attentive staff who know every child by name.' },
        ],
      },
      // No category filter (shows the full mix), a 'campus'-only filter collapses to one card
      // now that the gallery collection is seeded.
      { blockType: 'galleryBlock', heading: 'Moments from Campus', source: 'category', limit: 8 },
      {
        blockType: 'ctaBand',
        background: 'purple',
        bgImage: '/images/stock/cta-campus-life.webp',
        heading: 'See a full life in motion',
        subhead: 'Book a tour and walk our Vatican campus.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Register Now', url: '/register#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
    ],
  },

  contact: {
    title: 'Contact & Visit',
    seoTitle: 'Contact & Visit | Nucleus International Schools, Vatican, Addis Ababa',
    description:
      'Visit Nucleus International Schools: grade school at Sarbet Vatican (behind the Vatican Embassy) and preschool at Mekanisa Abo Square, Addis Ababa, with a third campus at Totot opening soon. Directions from Bole, Old Airport and Kazanchis, contact numbers, and how to book a tour.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'Contact & Visit',
        heading: 'Come See a Full Life\nin Motion',
        bgImage: '/images/stock/contact-hero.webp',
        subhead:
          'We’d love to show you around. Visit us at Vatican (grade school, behind the Vatican Embassy) or Abo (preschool, by Mekanisa Abo Square), and watch this space for Totot, opening soon.',
      },
      {
        blockType: 'cardsGrid',
        background: 'white',
        heading: 'Reach Us',
        columns: '3',
        cards: [
          { iconName: 'Phone', title: 'Call', description: '09 81 99 99 22 / 09 81 99 99 33' },
          { iconName: 'MapPin', title: 'Visit', description: 'Vatican (grade school), behind the Vatican Embassy. Abo (preschool), Mekanisa Abo Square. Addis Ababa.' },
          { iconName: 'CalendarCheck', title: 'Visit Now', description: 'Arrange a visit and meet our team in person.' },
        ],
      },
      {
        blockType: 'formBlock',
        formType: 'tour',
        background: 'white',
        heading: 'Visit Now',
        intro: 'Tell us a little about your family and we’ll arrange a visit that suits you.',
        successMessage: 'Thank you. We’ll be in touch within one business day to confirm your visit.',
      },
      {
        blockType: 'map',
        eyebrow: 'Getting to the School',
        heading: 'Our Campuses',
        intro: 'Easy to reach from across Addis Ababa, including Bole, Old Airport, Kazanchis and Gerji.',
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
      { blockType: 'campusComingSoon' },
      {
        blockType: 'socialFollow',
        background: 'mist',
        heading: 'Follow Nucleus',
        intro: 'See the classrooms, the camps and the day-to-day before you visit. We post most often on Facebook and TikTok.',
      },
      {
        blockType: 'ctaBand',
        background: 'navy',
        bgImage: '/images/stock/cta-contact.webp',
        heading: 'Arrange your visit',
        subhead: 'Call us or send an enquiry. We’ll find a time that works for your family.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Call 09 81 99 99 22', url: 'tel:0981999922' } },
          { link: { appearance: 'primary', type: 'custom', label: 'Call 09 81 99 99 33', url: 'tel:0981999933' } },
        ],
      },
    ],
  },

  /**
   * /register is the fork, not a form. One combined form meant parents picked the wrong campus,
   * so this page sends them to the campus-locked form that matches their child's grade. The
   * `#application` anchor sits on the chooser so every existing "Register Now" link still lands
   * on the thing a parent needs to act on.
   */
  register: {
    title: 'Registration',
    seoTitle: 'Register Your Child | Nucleus International Schools, Addis Ababa',
    description:
      'Register your child at Nucleus International Schools in Addis Ababa for the international Cambridge curriculum. Choose your campus: Preschool and KG at Mekanisa Abo Square, Grade 1 to Grade 8 at Vatican.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'Admissions',
        heading: 'Register\nYour Child',
        bgImage: '/images/stock/admissions-hero.webp',
        subhead:
          'Our full admission form, online. Pick the campus that matches your child\u2019s grade and the form takes about ten minutes. It saves as you go, so you can stop and come back to it any time on the same device.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Choose a campus', url: '#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now first', url: '/contact' } },
        ],
      },
      {
        blockType: 'campusChoice',
        background: 'white',
        anchor: 'application',
        eyebrow: 'Step one',
        heading: 'Which campus is your child joining?',
        intro: 'Each campus has its own form. Choose by your child\u2019s grade.',
        options: [
          {
            grades: 'Preschool & KG',
            campus: 'Mekanisa Abo Square Campus',
            where: 'Our primary school, 100 metres from Mekanisa Abo Square.',
            iconName: 'Baby',
            href: '/register/primary',
          },
          {
            grades: 'Grade 1 to Grade 8',
            campus: 'Vatican Campus',
            where: 'Our grade school at Sarbet Vatican, 50 metres behind the Vatican Embassy.',
            iconName: 'GraduationCap',
            href: '/register/grade-school',
          },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'mist',
        eyebrow: 'How It Works',
        heading: 'Three simple steps',
        columns: '3',
        cards: [
          { iconName: 'ClipboardCheck', title: '1. Fill the form', description: 'Six short steps. Your answers are saved on your device as you type.' },
          { iconName: 'Phone', title: '2. We Reach Out', description: 'Our admissions team contacts you within one business day to confirm details.' },
          { iconName: 'BadgeCheck', title: '3. Confirm a Place', description: 'Bring your child\u2019s documents to campus and secure a place for the intake.' },
        ],
      },
      {
        blockType: 'prose',
        background: 'white',
        heading: 'What to have ready',
        items: [
          { type: 'p', text: 'Nothing needs to be uploaded now, but the form is quicker with these to hand:' },
          {
            type: 'ul',
            items: [
              'Child\u2019s birth certificate (for the exact date and place of birth)',
              'Previous report card, if your child has been at school before',
              'Parent / guardian ID or passport numbers',
              'Passport-size photographs (bring these with you to campus)',
            ],
          },
        ],
      },
      {
        blockType: 'ctaBand',
        background: 'navy',
        heading: 'Prefer to talk first?',
        subhead: 'Visit our campus or call us. We\u2019ll walk you through everything.',
        links: [
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
          { link: { appearance: 'primary', type: 'custom', label: 'Call 09 81 99 99 22', url: 'tel:0981999922' } },
        ],
      },
    ],
  },

  careers: {
    title: 'Careers',
    seoTitle: 'Careers | Teaching Jobs at Nucleus International Schools, Addis Ababa',
    description:
      'Teaching and support jobs at Nucleus International Schools in Addis Ababa. Send your CV for a Cambridge teaching post, a leadership role or a support role at our Vatican and Mekanisa Abo Square campuses.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'Careers',
        heading: 'Teach Where\nTeaching Matters',
        bgImage: '/images/stock/admissions-hero.webp',
        subhead:
          'We are always glad to hear from teachers and school staff who want to work somewhere their subject is taken seriously. Send your CV and tell us the role you are after.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Send your CV', url: '#apply' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Meet the team', url: '/about' } },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'white',
        eyebrow: 'Why Nucleus',
        heading: 'What you get here',
        columns: '3',
        cards: [
          {
            iconName: 'Award',
            title: 'A real Cambridge programme',
            description:
              'The international Cambridge curriculum from the early years through Grade 8, with a Cambridge Coordinator and proper exam procedure behind it.',
          },
          {
            iconName: 'Users',
            title: 'An international staff room',
            description:
              'Multilingual, international colleagues, and leadership that has run schools across Europe, Africa, Asia and South America.',
          },
          {
            iconName: 'Sprout',
            title: 'Room to build something',
            description:
              'Robotics and STEM labs, an agriculture and animal-care programme, music and sport. If you want to start a programme, there is space for it.',
          },
        ],
      },
      {
        blockType: 'prose',
        background: 'mist',
        heading: 'How hiring works',
        items: [
          {
            type: 'p',
            text: 'Send your CV through the form below, whether or not we have advertised the role. We keep applications on file and go to them first when a post opens.',
          },
          {
            type: 'ul',
            items: [
              'Our HR team reads every application and replies when there is a match.',
              'Shortlisted candidates are invited to campus to meet the team and teach a sample lesson.',
              'Teaching posts need your qualification certificates and two referees at the interview stage.',
              'All staff are subject to child-safeguarding checks before they start. Child safety comes first here.',
            ],
          },
        ],
      },
      {
        blockType: 'careersForm',
        background: 'white',
        anchor: 'apply',
        eyebrow: 'Apply',
        heading: 'Send us your CV',
        intro: 'Tell us who you are and the position you are after. It takes two minutes.',
      },
      {
        blockType: 'ctaBand',
        background: 'navy',
        bgImage: '/images/stock/gallery-campus.webp',
        heading: 'Questions before you apply?',
        subhead: 'Call our HR team and ask. We would rather talk than leave you guessing.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Call 09 81 99 99 22', url: 'tel:0981999922' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
    ],
  },

  news: {
    title: 'The Nucleus Blog',
    seoTitle: 'Blog | Nucleus International Schools',
    description:
      'Stories, guides and ideas from the Nucleus International Schools learning community at Vatican, Addis Ababa.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        eyebrow: 'The Nucleus Blog',
        heading: 'From Our\nLearning Community',
        bgImage: '/images/stock/news-hero.webp',
        subhead: 'Stories, milestones and ideas from campus.',
      },
      { blockType: 'latestPosts', heading: 'Latest', limit: 9 },
    ],
  },

  'cambridge-pathway': {
    title: 'Cambridge Pathway',
    seoTitle: 'The Cambridge Pathway at Nucleus | International Cambridge Curriculum, Addis Ababa',
    description:
      'The Cambridge pathway at Nucleus International Schools, Vatican: a portable, internationally recognised education from the early years through Grade 8.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        bgImage: '/images/stock/academics-hero.webp',
        eyebrow: 'Academics',
        heading: 'The Cambridge Pathway',
        subhead:
          'A world-class, portable curriculum that rewards deep understanding over memorisation, and travels with your child anywhere in the world.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Register Now', url: '/register#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
      {
        blockType: 'prose',
        eyebrow: 'Why Cambridge',
        heading: 'An education that opens doors',
        items: [
          { type: 'lead', text: 'The Cambridge pathway is one of the world’s most recognised curricula: structured, rigorous and respected by universities across Europe, North America and beyond.' },
          { type: 'p', text: 'At Nucleus we follow the Cambridge pathway from the early years through Grade 8, so a child who begins at Vatican is prepared to continue, and to thrive, wherever life takes your family next.' },
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
        subhead: 'Book a tour of our Vatican campus, or register your child online.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Register Now', url: '/register' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
    ],
  },

  'robotics-stem': {
    title: 'Robotics & STEM',
    seoTitle: 'Robotics & STEM at Nucleus | Hands-on Tech for Kids in Addis Ababa',
    description:
      'Robotics, coding and STEM at Nucleus International Schools, Vatican: future-ready skills built through hands-on technology and science from an early age.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        bgImage: '/images/stock/gallery-stem.webp',
        eyebrow: 'Learning Beyond Books',
        heading: 'Robotics & STEM',
        subhead:
          'Coding, robotics and science that turn curious children into confident problem-solvers who are unafraid of hard problems.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Register Now', url: '/register#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
      {
        blockType: 'prose',
        eyebrow: 'Why it matters early',
        heading: 'Building thinkers, not just test-takers',
        items: [
          { type: 'lead', text: 'When children build something (a circuit, a program, a robot) they meet real problems and solve them. That habit carries into everything else they learn.' },
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
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Register Now', url: '/register#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
    ],
  },

  'agriculture-animal-care': {
    title: 'Agriculture & Animal Care',
    seoTitle: 'Agriculture & Animal Care at Nucleus | Learning Beyond Books, Addis Ababa',
    description:
      'Agriculture and animal care at Nucleus International Schools, Vatican: holistic, hands-on learning that roots children in nature, patience and responsibility.',
    layout: [
      {
        blockType: 'hero',
        background: 'purple',
        bgImage: '/images/stock/blog-beyond.webp',
        eyebrow: 'Learning Beyond Books',
        heading: 'Agriculture &\nAnimal Care',
        subhead:
          'The “Farmer-Scientist”: tending plants and animals teaches patience, responsibility and a feel for cause and effect no screen can.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Register Now', url: '/register#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
      {
        blockType: 'prose',
        eyebrow: 'Nature beyond concrete',
        heading: 'Science you can hold',
        items: [
          { type: 'lead', text: 'There is a kind of learning that only happens with soil on your hands and a living thing in your care.' },
          { type: 'p', text: 'Tending a garden and caring for animals slows childhood down in the best way, building patience, responsibility and a genuine feel for how the natural world works.' },
        ],
      },
      {
        blockType: 'cardsGrid',
        background: 'mist',
        heading: 'What students do',
        columns: '3',
        cards: [
          { iconName: 'Sprout', title: 'Growing', description: 'Planting, tending and harvesting: patience made real.' },
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
        subhead: 'Book a tour of our Vatican campus.',
        links: [
          { link: { appearance: 'primary', type: 'custom', label: 'Register Now', url: '/register#application' } },
          { link: { appearance: 'outline', type: 'custom', label: 'Visit Now', url: '/contact' } },
        ],
      },
    ],
  },

  // Terms and Privacy live in their own file: they are reproduced legal text rather than
  // marketing copy, and they change on the school's schedule, not the site's.
  ...legalPages,
}
