/**
 * Shared team roster data. Plain module (NO 'use client') so BOTH the client grid/modal
 * (OurTeamBlock) and server code (OurTeamServer, seeds) can import real values, importing
 * data from a 'use client' module into a server component yields an opaque client reference.
 */

export type TeamMember = {
  id: string
  name: string
  role: string
  dept: string
  photo: string
  bio: string[]
}

/** Hardcoded fallback roster. Used when no `members` are supplied (e.g. the CMS is empty or errors). */
export const TEAM: TeamMember[] = [
  {
    id: 'daniel',
    name: 'Daniel Hiest',
    role: 'School Director',
    dept: 'Leadership',
    photo: '/images/team/daniel-hiest.webp',
    bio: [
      'M.A. French Studies. B.Ed. (Hons.). More than 40 years in international education.',
      'Daniel has served as Principal, Head of School, Academic Director and IB Programme Coordinator across leading international schools in Europe, Africa, Asia and South America.',
      'His expertise in Cambridge, IB and university admissions provides Nucleus with exceptional academic leadership.',
    ],
  },
  {
    id: 'wondwossen',
    name: 'Wondwossen G. Teklemichael',
    role: 'International School Systems Expert',
    dept: 'Leadership',
    photo: '/images/team/wondwossen-teklemichael.webp',
    bio: [
      'A multicultural, multilingual leadership and management consultant, trainer and coach with 25+ years of executive-level leadership and governance experience across international schools, airlines, government and international NGOs.',
      'A certified management consultant and leadership-development coach, he trained in leadership, strategic planning and governance at Harvard Business School, the U.S. Foreign Service Institute, China Europe International Business School and the Association of International Schools in Africa.',
      'He is highly rated on the Hay Group Inventory of Leadership Styles, particularly as a visionary, coaching, affiliative and participatory leader.',
    ],
  },
  {
    id: 'sharon',
    name: 'Sharon Ashton',
    role: 'Director of Parent Relations & Communications',
    dept: 'Leadership',
    photo: '/images/team/sharon-ashton.webp',
    bio: [
      'Originally from Canada, Sharon brings more than 40 years of international leadership experience in communications, strategic planning, marketing and organizational development across the education, health, business and non-profit sectors. She has spent the past decade in Ethiopia, building partnerships that improve education, healthcare and community development.',
      'At Nucleus she is dedicated to creating a welcoming experience for every family, working with parents from their first inquiry through their child’s journey to ensure clear communication, strong partnerships and a genuine sense of belonging. She also leads the school’s marketing and communications.',
    ],
  },
  {
    id: 'melat',
    name: 'Melat Alemahu',
    role: 'Director of Admissions & Learning Support',
    dept: 'Leadership',
    photo: '/images/team/melat-alemahu.webp',
    bio: [
      'Melat holds a BSc in Psychology from Addis Ababa University, a Diploma in International Special Needs Education from the London College of Teachers & Trainers, and an International Certificate in Counselling. She has more than eight years of experience in psychology, assessment and inclusive education.',
      'She leads the admissions process, guiding families to Nucleus while ensuring each child is thoughtfully assessed and placed where they can succeed. Working closely with students, parents and teachers, she promotes inclusive learning so every learner develops confidence, resilience and a lifelong love of learning.',
    ],
  },
  {
    id: 'teklebrhan',
    name: 'Teklebrhan Tesfaye',
    role: 'Cambridge Coordinator',
    dept: 'Leadership',
    photo: '/images/team/teklebrhan-tesfaye.webp',
    bio: [
      'Teklebrhan Tesfay Kassaye serves as the Cambridge Coordinator at Nucleus International Schools (NIS). With over a decade of experience in academic leadership, curriculum management and English language education, Teklebrhan plays a central role in maintaining rigorous academic standards and driving educational excellence at NIS.',
      'He holds a Bachelor of Arts in English Language and Literature from Arba Minch University and is a certified Cambridge Examination Officer. His extensive professional background includes serving as Cambridge Coordinator and Department Head at International Maarif Schools of Ethiopia, as well as teaching roles at prestigious institutions like Lideta Catholic Cathedral School.',
      'Teklebrhan has completed specialized training through Cambridge Assessment International Education, the British Council and Kotebe University of Education, covering areas such as exam security protocols, active learning methodologies, learner-centered instruction and teacher supervision. At NIS, he is dedicated to ensuring seamless Cambridge curriculum delivery, fostering teacher professional development, and empowering students to achieve their full potential as global citizens.',
    ],
  },
  {
    id: 'meaza',
    name: 'Meaza Mekuria',
    role: 'HR & Admin Manager',
    dept: 'Operations',
    photo: '/images/team/meaza-mekuria.webp',
    bio: [
      'Meaza is an accomplished HR professional with over 18 years of experience spanning international education, the airline industry and the international NGO sector. For the past 13 years she has specialized in international education, leading recruitment, employee relations, policy development, performance management and staff development.',
      'Passionate about empowering people, she is dedicated to fostering an inclusive, professional and supportive workplace where educators and staff thrive. She believes investing in people is fundamental to a strong school community.',
    ],
  },
  {
    id: 'shewangizaw',
    name: 'Captain Shewangizaw Teffera',
    role: 'Head of Security & Safety',
    dept: 'Operations',
    photo: '/images/team/shewangizaw-teffera.webp',
    bio: [
      'Captain Shewangizaw brings over 35 years of experience in safety, security and risk management across law enforcement, international education and multinational organizations. His career includes Country Security Manager at Heineken Ethiopia, Safety & Security Officer at the International Community School of Addis Ababa (ICS), and Police Captain in the Ethiopian Police Force.',
      'A Management graduate of Addis Ababa University, he has completed advanced international training in crisis management, emergency response and soft-target risk assessment, including counterterrorism training through the U.S. Department of State’s Anti-Terrorism Assistance (ATA) Program. At Nucleus he leads the school’s security strategy.',
    ],
  },
  {
    id: 'mandefro',
    name: 'Mandefro Melaku',
    role: 'Summer Camp Director',
    dept: 'PE & Sports',
    photo: '/images/team/mandefro-melaku.webp',
    bio: [
      'Mandefro brings over 10 years of experience in physical education, youth development and sports coaching. He holds an MBA, a BSc in Sport Science and a CAF D Football Coaching License, and has served as a PE teacher at leading international schools while coaching youth football and wellness programs.',
      'He supports the school’s PE and sports programs, drawing on his expertise in the Cambridge curriculum, student leadership and holistic child development. As Summer Camp Director he designs camp experiences that build confidence, teamwork and creativity, so every child enjoys a safe, enriching and memorable summer.',
    ],
  },
  {
    id: 'yordanos',
    name: 'Yordanos Worku',
    role: 'Marketing & Communication Officer',
    dept: 'Operations',
    photo: '/images/team/yordanos-worku.webp',
    bio: [
      'Yordanos is a Business Management professional with a diverse background in banking, hospitality, event management and marketing & communications, with strong skills in strategic communication, stakeholder engagement and brand representation.',
      'As Marketing and Communication Officer she is committed to strengthening the school’s visibility, building meaningful connections with families, and supporting its mission through effective communication and creative marketing.',
    ],
  },
  {
    id: 'lia',
    name: 'Lia Muhammed',
    role: 'Receptionist',
    dept: 'Front Office',
    photo: '/images/team/lia-muhammed.webp',
    bio: [
      'Lia is a dedicated and versatile professional who brings international experience in hospitality, healthcare, translation and executive support to Nucleus. She previously worked as a Receptionist at the Marriott Hotel in the United Kingdom and has more than four years of nursing experience in London, developing exceptional customer-service, communication and organizational skills.',
      'She completed her secondary education at the Netherlands American School, studied Nursing Access at Kensington and Chelsea College, and earned a BSc in Nursing from the University of West London. A Dutch citizen and UK resident, she has extensive experience working with people from diverse cultures and backgrounds.',
      'As the first point of contact for many families and visitors, she is committed to creating a warm, welcoming and professional environment while providing efficient administrative support that reflects the caring, inclusive values of Nucleus.',
    ],
  },
]
