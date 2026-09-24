/**
 * Vacancy announcements shown on /careers.
 *
 * To announce a new post, add an entry with `status: 'open'` and today's `postedAt`. When the
 * post is filled, flip it to `'filled'`: it stays on the page under "Previous vacancies" so
 * applicants can see the kind of roles we hire for. Only open posts get JobPosting structured
 * data; Google asks for filled jobs to carry none.
 *
 * Announcements never name a campus. Applicants apply to Nucleus International School.
 */

export const HR_EMAIL = 'hr@nucints.com'

export type VacancyStatus = 'open' | 'filled'

export type VacancyDepartment = 'Leadership' | 'Teaching' | 'Student support' | 'Administration'

export type VacancySection = {
  heading: string
  paragraphs?: string[]
  items?: string[]
}

export type Vacancy = {
  /** Anchor id on /careers (#vacancy-<slug>). */
  slug: string
  title: string
  department: VacancyDepartment
  status: VacancyStatus
  /** ISO date the announcement went out. */
  postedAt: string
  employmentType: 'Full-time' | 'Part-time'
  /** One line under the title on the collapsed card. */
  summary: string
  sections: VacancySection[]
  /** Replaces the default compensation paragraph. */
  terms?: string
  /** Extra "please include" items in the application, on top of CV + covering letter. */
  applicationItems?: string[]
  /** Closing line printed under the application instructions. */
  closingNote?: string
}

export const DEPARTMENT_ORDER: VacancyDepartment[] = ['Leadership', 'Teaching', 'Student support', 'Administration']

export const DEFAULT_TERMS =
  'Competitive compensation and benefits package, commensurate with qualifications, experience and the responsibilities of the position.'

const MARCH_2026 = '2026-03-10'

export const VACANCIES: Vacancy[] = [
  {
    slug: 'head-of-school',
    title: 'Head of School',
    department: 'Leadership',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Chief executive of the school, leading teaching and learning, strategy and accreditation.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School would like to recruit a qualified Head of School (HoS). Candidates with a proven track record in leading international schools as Head of School or Deputy Head, and who are committed to education, are invited to apply. The post is open to candidates from within and outside Ethiopia.',
          'The Head of School is the chief executive officer of the school and reports directly to the General Manager, working closely with them to set the vision for the school. While strengthening the existing team, the HoS attracts and retains highly qualified leaders, faculty and staff. As the most senior member of the Senior Leadership Team (SLT), the HoS is responsible for schoolwide strategic and operational leadership, and supervises the Deputy Head of School, the Heads of Pre-Primary and Primary, and the Admissions and Curriculum and Learning Heads.',
          'The HoS is responsible for the strategic leadership and operational excellence of the school day to day. The immediate priority is leadership of teaching and learning (curriculum and instruction, professional development, assessment) and the accreditation process. The HoS is dynamic, self-confident and approachable, with excellent communication, leadership and interpersonal skills, and plans strategically and operationally to reflect the character of the school community and the requirements of government.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Support the General Manager in setting and delivering the vision of the school.',
          'Lead strategic planning and its implementation.',
          'Monitor and address all matters of school climate and culture.',
          'Supervise all programmes of the school, including the curriculum and reporting to parents.',
          'Ensure the school is adequately funded, sustainable and financially sound.',
          'Lead effective local and international recruitment so that highly qualified teachers and administrators are hired.',
          'Represent the school in its relations with government agencies, educational organisations and accrediting bodies.',
          'Oversee the effectiveness of every aspect of the school operation, including the efficient use of facilities.',
          'Promote the achievement, welfare and good conduct of students.',
          'Build and maintain strong parental and community involvement.',
        ],
      },
      {
        heading: 'Also valued',
        items: [
          'Familiarity with school accreditation processes.',
          'Relevant and current professional development, and certification in educational leadership.',
          'Commitment to technology-based solutions across every part of education.',
          'Success in development work such as fundraising and alumni outreach.',
          'Experience in strategic planning.',
        ],
      },
      {
        heading: 'Education',
        items: [
          "An advanced degree in education (Master's or Doctorate). A doctorate with a credential in administration is preferred.",
          'A proven understanding of school governance.',
          'Educational or professional experience in a culturally diverse environment.',
          'Knowledge of technology-based educational solutions.',
        ],
      },
      {
        heading: 'Experience',
        items: [
          'At least 10 years in an executive or administrative role in schools, including international experience in a developing country. Priority goes to international school leadership as Head of School or Deputy Head of School.',
          'Experience in developing and achieving a strategic plan and development initiatives.',
          'Demonstrated success in a multicultural, international environment.',
          'A proven record of leading change and school improvement.',
          'Experience in staff supervision and evaluation, with sound knowledge of supervisory and administrative practice.',
          'A strong record of building community involvement and support.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Excellent organisational and managerial skills, including the ability to motivate and lead a diverse team.',
          'Excellent interpersonal and communication skills.',
          'Knowledge of current trends in international education, and of current approaches to HR, finance, IT, safety and school infrastructure.',
          'High ethical standards and a real passion for working and learning.',
          'A culturally sensitive, collaborative leadership style and the ability to work with others to improve the school.',
          'Results-oriented, self-motivated, energetic and creative, with enthusiasm for the strategic vision of Nucleus.',
        ],
      },
      {
        heading: 'Competencies',
        items: [
          'Leadership',
          'Collaboration and teamwork',
          'Communication',
          'Vision and strategic planning',
          'Decision making',
          'Organisational management',
        ],
      },
    ],
    terms:
      'Competitive compensation and benefits package, commensurate with the responsibilities of the position. The initial contract runs for one (1) year, with the possibility of renewal for subsequent years at the discretion of the General Manager.',
    applicationItems: [
      'A purpose statement of no more than 2 pages, with highlights of your professional journey.',
      'A resume of no more than 3 pages covering relevant qualifications and experience.',
      'Names and contacts (including a valid email) of 3 referees, two of them current or previous supervisors.',
    ],
    closingNote: 'The school reserves the right to close the selection early if a suitable candidate is found.',
  },

  {
    slug: 'head-of-pre-primary',
    title: 'Head of Pre-Primary',
    department: 'Leadership',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Leads the Foundation Stage, Pre-KG and KG years: curriculum, teachers and families.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for an experienced early years leader to head its pre-primary section (Foundation Stage, Pre-KG and KG). The post is open to candidates from within and outside Ethiopia.',
          'The Head of Pre-Primary reports to the Head of School and sits on the Senior Leadership Team. They lead the early years curriculum, the teachers and teaching assistants who deliver it, and the partnership with families at the point where most of them first meet the school. The right person believes young children learn best through purposeful play, warm relationships and a calm, well-planned environment.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Lead the early years programme within the international Cambridge curriculum, from planning to assessment.',
          'Recruit, supervise, coach and appraise pre-primary teachers and teaching assistants.',
          'Set the daily routines, timetable and learning environment for each pre-primary class.',
          'Track each child through observation-based assessment, and make sure parents receive clear, regular reports.',
          'Own safeguarding, health and safety for the youngest children, working with the School Nurse.',
          'Plan smooth transitions, from home into school and from KG into Grade 1.',
          'Build strong relationships with parents through meetings, workshops and open, prompt communication.',
          'Lead professional development for the early years team.',
          'Work with Admissions on entry visits and assessments for new children.',
          'Manage the resources and budget of the pre-primary section.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          "A Bachelor's degree in Early Childhood Education or a closely related field. A Master's degree is an advantage.",
          'A recognised teaching qualification.',
          'At least 5 years of early years teaching, including at least 2 years in a leadership role, ideally in an international school.',
          'Experience of the Cambridge Early Years programme, the EYFS or a similar international framework.',
          'Sound, current knowledge of child safeguarding practice.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'A deep understanding of child development and play-based learning.',
          'Warm, patient and highly organised.',
          'Excellent spoken and written English, and the confidence to talk with parents about their child.',
          'A collaborative leader who can grow a team and hold it to high standards.',
        ],
      },
    ],
  },

  {
    slug: 'music-band-teacher',
    title: 'Music / Band Teacher',
    department: 'Teaching',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Teaches music across the school and builds the band and ensemble programme.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for a Music and Band Teacher to lead music from the early years through primary. The post is open to candidates from within and outside Ethiopia.',
          'You will teach general music lessons, build a school band and ensembles from the ground up, and make performance a normal part of school life. The Music Teacher reports to the Head of School.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Plan and teach music lessons for pre-primary and primary classes: singing, rhythm, listening, notation and composition.',
          'Start and direct the school band, a choir and small instrumental ensembles.',
          'Prepare students for assemblies, concerts and school events.',
          'Teach basic instrumental technique and music reading.',
          'Look after the school instruments and the music room.',
          'Work with class teachers to link music to other subjects and to school celebrations.',
          'Assess progress and report to parents in line with school policy.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A degree in Music or Music Education, and a recognised teaching qualification.',
          'At least 3 years of teaching music to children, ideally in an international school.',
          'Proficiency on at least one instrument, and experience directing a band or ensemble.',
          'Fluent spoken and written English.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Energy and patience with young musicians of every ability.',
          'Good organisation for rehearsals, events and equipment.',
          'A team player who enjoys working across the school.',
        ],
      },
    ],
  },

  {
    slug: 'art-teacher',
    title: 'Art Teacher',
    department: 'Teaching',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Leads visual art and design for pre-primary and primary students.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for an Art Teacher to lead visual art and design across the school. The post is open to candidates from within and outside Ethiopia.',
          'You will give children real skills in drawing, painting, printmaking, collage, sculpture and craft, and the confidence to use them. The Art Teacher reports to the Head of School.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Plan and teach art and design within the international Cambridge curriculum, from the early years through primary.',
          'Teach a range of media and techniques, and introduce artists from Ethiopia and around the world.',
          'Display student work around the school and organise exhibitions.',
          'Work with class teachers on art-led projects linked to other subjects.',
          'Keep the art room safe, organised and stocked, and manage the materials budget.',
          'Assess progress and report to parents in line with school policy.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A degree in Fine Art, Art Education or Design, and a recognised teaching qualification.',
          'At least 3 years of teaching art to children, ideally in an international school.',
          'A portfolio of your own work and of student work.',
          'Fluent spoken and written English.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Creative, patient and encouraging with every child, not only the naturally gifted.',
          'Well organised in a practical, messy subject.',
          'Enthusiasm for cross-curricular and community projects.',
        ],
      },
    ],
  },

  {
    slug: 'athletics-pe-teacher',
    title: 'Athletics / PE Teacher',
    department: 'Teaching',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Runs physical education, athletics and school sport for every age group.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for an Athletics and Physical Education Teacher. The post is open to candidates from within and outside Ethiopia.',
          'You will build a PE programme that develops fitness, coordination, teamwork and a lifelong love of sport, and lead athletics and competitive sport for the school. The PE Teacher reports to the Head of School.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Plan and teach PE lessons for pre-primary and primary classes, matched to each age group.',
          'Lead athletics training, sports clubs and after-school activities.',
          'Organise sports days and represent the school in inter-school competitions.',
          'Keep every lesson safe: warm-ups, equipment checks and first aid on hand.',
          'Look after the sports equipment and playing areas.',
          'Promote healthy habits and wellbeing across the school.',
          'Assess progress and report to parents in line with school policy.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A degree in Physical Education, Sports Science or a related field, and a recognised teaching qualification.',
          'At least 3 years of teaching PE or coaching children, ideally in an international school.',
          'A current first aid certificate, or willingness to obtain one before starting.',
          'Fluent spoken and written English.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Enthusiastic, fair and a good role model.',
          'Able to include children of every ability and confidence level.',
          'Strong organisation for events, fixtures and transport.',
        ],
      },
    ],
  },

  {
    slug: 'science-teacher',
    title: 'Science Teacher',
    department: 'Teaching',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Teaches Cambridge Primary Science through hands-on enquiry.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for a Science Teacher with international experience. The post is open to candidates from within and outside Ethiopia.',
          'You will teach Cambridge Primary Science through practical enquiry, so children learn to ask questions, test ideas and explain what they find. You will also help shape science teaching across the school. The Science Teacher reports to the Head of School.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Plan and teach Cambridge Primary Science with a strong emphasis on hands-on investigation.',
          'Run safe, well-organised practical work and look after science equipment.',
          'Link science to the school Robotics, STEM and agriculture programmes.',
          'Support and mentor colleagues who teach science, and share good practice.',
          'Lead science events such as fairs and project exhibitions.',
          'Assess progress with Cambridge tools and report to parents in line with school policy.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A degree in a science subject or in Science Education, and a recognised teaching qualification.',
          'At least 3 years of teaching science in an international school, ideally with the Cambridge Primary curriculum.',
          'Fluent spoken and written English.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Curious and able to make abstract ideas concrete for young learners.',
          'Well organised and careful about laboratory safety.',
          'A collaborative colleague who enjoys developing others.',
        ],
      },
    ],
  },

  {
    slug: 'english-teacher',
    title: 'English Teacher',
    department: 'Teaching',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Teaches Cambridge Primary English and builds a reading culture across the school.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for an English Teacher with international experience. The post is open to candidates from within and outside Ethiopia.',
          'English is the language of learning here, and many of our students speak two or three languages at home. You will teach reading, writing, speaking and listening, support learners whose first language is not English, and help build a reading culture across the school. The English Teacher reports to the Head of School.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Plan and teach Cambridge Primary English, including phonics and early reading in the younger years.',
          'Support students who are learning English as an additional language.',
          'Build a love of reading through class libraries, reading events and author studies.',
          'Help colleagues strengthen English across other subjects.',
          'Assess progress with Cambridge tools and report to parents in line with school policy.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A degree in English, English Education or a related field, and a recognised teaching qualification.',
          'At least 3 years of teaching English in an international school, ideally with the Cambridge Primary curriculum.',
          'A TEFL, CELTA or similar qualification is an advantage.',
          'Excellent spoken and written English.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Patient and encouraging with learners at very different levels.',
          'Creative in planning lessons that get children talking and writing.',
          'A team player who shares ideas and resources.',
        ],
      },
    ],
  },

  {
    slug: 'early-years-classroom-teacher',
    title: 'Early Years Classroom Teacher',
    department: 'Teaching',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Homeroom teacher for a self-contained Pre-KG or KG class.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for Early Years Classroom Teachers to lead self-contained Pre-KG and KG classes.',
          'You will be the main teacher for one class, teaching across all areas of learning with the support of a teaching assistant, and the person parents speak to first about their child. You report to the Head of Pre-Primary.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Plan and teach all areas of early learning within the international Cambridge curriculum: language, early maths, understanding the world, creative and physical development.',
          'Create a calm, inviting classroom with clear daily routines.',
          'Observe and record each child’s development, and use it to plan next steps.',
          'Guide the teaching assistant and share the planning with them.',
          'Keep parents informed through daily contact, meetings and written reports.',
          'Follow the school safeguarding, health and hygiene procedures at all times.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A degree or diploma in Early Childhood Education or a related field.',
          'At least 2 years of experience teaching young children, ideally in an international or English-medium school.',
          'Fluent spoken and written English. Amharic is an advantage.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Warm, patient and genuinely enjoys young children.',
          'Organised, observant and reliable.',
          'Comfortable talking with parents and working closely with colleagues.',
        ],
      },
    ],
  },

  {
    slug: 'mathematics-specialist-teacher',
    title: 'Mathematics Specialist Teacher',
    department: 'Teaching',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Teaches Cambridge Primary Mathematics in the upper grades.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for a Mathematics Specialist Teacher for the upper primary grades.',
          'You will teach Cambridge Primary Mathematics with a focus on real understanding and problem solving, not memorised procedures. The Mathematics Teacher reports to the Head of School.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Plan and teach Cambridge Primary Mathematics to the higher grades.',
          'Use concrete materials, visual models and discussion to build understanding.',
          'Differentiate so that every student is supported and stretched.',
          'Run maths clubs and prepare students for competitions.',
          'Assess progress with Cambridge tools and report to parents in line with school policy.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A degree in Mathematics or Mathematics Education. A teaching qualification is an advantage.',
          'At least 2 years of teaching mathematics, ideally in an international or English-medium school.',
          'Fluent spoken and written English.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Clear explanations and patience with students who find maths hard.',
          'Well organised, with good record keeping.',
          'A collaborative colleague.',
        ],
      },
    ],
  },

  {
    slug: 'science-specialist-teacher',
    title: 'Science Specialist Teacher',
    department: 'Teaching',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Teaches Cambridge Primary Science in the upper grades.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for a Science Specialist Teacher for the upper primary grades.',
          'You will teach Cambridge Primary Science through practical investigation, and work with the wider science team on equipment, projects and events. The Science Specialist Teacher reports to the Head of School.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Plan and teach Cambridge Primary Science to the higher grades.',
          'Run safe practical work and investigations.',
          'Connect lessons to the school Robotics, STEM and agriculture programmes.',
          'Help organise science fairs and project exhibitions.',
          'Assess progress with Cambridge tools and report to parents in line with school policy.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A degree in Biology, Chemistry, Physics, General Science or Science Education. A teaching qualification is an advantage.',
          'At least 2 years of teaching science, ideally in an international or English-medium school.',
          'Fluent spoken and written English.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Curious, practical and careful about safety.',
          'Able to make scientific ideas clear and interesting.',
          'A team player.',
        ],
      },
    ],
  },

  {
    slug: 'ict-specialist-teacher',
    title: 'ICT Specialist Teacher',
    department: 'Teaching',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Teaches computing, digital literacy and online safety in the upper grades.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for an ICT Specialist Teacher for the upper primary grades.',
          'You will teach computing and digital literacy, introduce coding, and help students use technology safely and well. You will also support the Robotics and STEM programme. The ICT Teacher reports to the Head of School.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Plan and teach Cambridge Primary Computing and Digital Literacy to the higher grades.',
          'Introduce programming through age-appropriate tools.',
          'Teach online safety and responsible use of technology.',
          'Support the Robotics and STEM programme and technology use in other subjects.',
          'Keep the computer lab and devices in working order, with IT support.',
          'Assess progress and report to parents in line with school policy.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A degree in Computer Science, Information Technology or Education with an ICT specialism. A teaching qualification is an advantage.',
          'At least 2 years of teaching ICT or computing to children.',
          'Fluent spoken and written English.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Up to date with educational technology.',
          'Patient and practical, able to troubleshoot calmly.',
          'Keen to work across subjects with other teachers.',
        ],
      },
    ],
  },

  {
    slug: 'teaching-assistant',
    title: 'Teaching Assistant',
    department: 'Student support',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Supports class teachers and gives children individual and small-group attention.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for Teaching Assistants to work alongside class teachers, mainly in the early years and lower primary.',
          'You will help children settle, learn and feel safe, give extra attention to those who need it, and keep the classroom running smoothly. Teaching Assistants report to the class teacher and the head of their section.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Support the class teacher in lessons, routines and classroom organisation.',
          'Work with individual children and small groups on reading, maths and other activities.',
          'Help young children with self-care, meals and transitions during the day.',
          'Supervise children at break, lunch, arrival and dismissal.',
          'Prepare learning materials and keep observation records.',
          'Follow the school safeguarding, health and hygiene procedures at all times.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A first degree in Education, Social Work, Sociology, Psychology or a related social science field.',
          'Experience with young children, paid or voluntary, is an advantage.',
          'Good spoken and written English. Amharic is an advantage.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Kind, patient and reliable.',
          'Takes direction well and uses initiative.',
          'Keen to learn and grow in education.',
        ],
      },
    ],
  },

  {
    slug: 'school-nurse',
    title: 'School Nurse (Certified)',
    department: 'Student support',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Looks after the daily health, first aid and wellbeing of students and staff.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for a certified School Nurse.',
          'You will run the school clinic, care for children who are unwell or injured, and make sure health information, allergies and medication are handled carefully. Parents need to trust that their child is in safe hands, and you are a large part of that. The School Nurse reports to the Head of School.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Give first aid and daily health care to students and staff.',
          'Administer medication in line with school policy and parent consent.',
          'Keep accurate, confidential health records, including allergies and medical conditions.',
          'Work with the kitchen team on allergies and special diets.',
          'Contact parents promptly when a child is unwell, and manage referrals when needed.',
          'Run health checks and hygiene education, and advise on illness prevention.',
          'Keep first aid kits stocked and support emergency and evacuation plans.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A diploma or degree in Nursing, and a valid professional licence.',
          'At least 2 years of nursing experience. Paediatric or school nursing experience is preferred.',
          'Current first aid and CPR certification.',
          'Good spoken and written English and Amharic.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Calm and decisive in an emergency.',
          'Gentle and reassuring with children.',
          'Careful with records and with confidential information.',
        ],
      },
    ],
  },

  {
    slug: 'admissions-officer',
    title: 'Admissions Officer',
    department: 'Administration',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'First point of contact for families, from first enquiry to the first day of school.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for an Admissions Officer.',
          'You will be the first person most families speak to. You answer their questions, show them the school, guide them through applying, and make sure every child starts well. The Admissions Officer works closely with school leadership and the marketing team.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Respond promptly and warmly to enquiries by phone, email, social media and in person.',
          'Lead school tours and visits for prospective families.',
          'Manage applications, documents and admissions records accurately.',
          'Coordinate entry assessments and meetings with the academic team.',
          'Follow up with families at every stage until enrolment.',
          'Keep enrolment data up to date and report on enquiries and conversions.',
          'Support open days and admissions events with the marketing team.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A degree in Business, Education, Communications or a related field.',
          'At least 2 years in a customer-facing role such as admissions, client services or hospitality.',
          'Excellent spoken and written English and Amharic.',
          'Confident with email, spreadsheets and record systems.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Warm, professional and patient with anxious parents.',
          'Very organised, with excellent follow-up.',
          'Discreet with personal information.',
        ],
      },
    ],
  },

  {
    slug: 'communications-marketing-officer',
    title: 'Communications and Marketing Officer',
    department: 'Administration',
    status: 'filled',
    postedAt: MARCH_2026,
    employmentType: 'Full-time',
    summary: 'Tells the school story across social media, the website and parent communication.',
    sections: [
      {
        heading: 'The position',
        paragraphs: [
          'Nucleus International School is looking for a Communications and Marketing Officer.',
          'You will tell the story of the school to parents, prospective families and the wider community: on social media, on the website, in newsletters and at events. The Communications and Marketing Officer works closely with school leadership and Admissions.',
        ],
      },
      {
        heading: 'Key responsibilities',
        items: [
          'Plan and publish content on the school social media channels.',
          'Keep the website, newsletters and parent communications accurate and current.',
          'Coordinate photography and video of school life, with proper consent.',
          'Apply the school brand guidelines consistently across all materials.',
          'Organise open days, school events and community partnerships with Admissions.',
          'Manage paid promotion and report on reach, enquiries and results.',
          'Handle media enquiries and prepare announcements.',
        ],
      },
      {
        heading: 'Requirements and qualifications',
        items: [
          'A degree in Marketing, Communications, Journalism or a related field.',
          'At least 3 years of experience in marketing or communications, ideally in education or a service business.',
          'Excellent writing in English and Amharic.',
          'Working knowledge of social media platforms, basic design and video editing tools.',
        ],
      },
      {
        heading: 'Skills and characteristics',
        items: [
          'Creative, with a good eye for photos and design.',
          'Organised enough to keep a steady publishing rhythm.',
          'Trustworthy with images of children and family information.',
        ],
      },
    ],
  },
]

/** "10 March 2026". Fixed locale and time zone so server and client agree. */
export const formatVacancyDate = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
