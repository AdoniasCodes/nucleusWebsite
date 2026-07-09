'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section, type SectionBackground } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/**
 * "Our Team" — a badge/arch-framed portrait grid (the brand's shield-arch photo device).
 * Each card opens an accessible bio modal (Esc / backdrop / close, scroll-locked, focus-managed).
 * Content is inline for now; can migrate to the `staff` collection for admin editing later.
 * Client component (modal state). Synthetic block.
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
    id: 'wondwossen',
    name: 'Wondwossen G. Teklemichael',
    role: 'International School Systems Expert',
    dept: 'Leadership',
    photo: '/images/team/wondwossen-teklemichael.webp',
    bio: [
      'A multicultural, multilingual leadership and management consultant, trainer and coach with 25+ years of executive-level leadership and governance experience across international schools, airlines, government and international NGOs.',
      'A certified management consultant and leadership-development coach, he trained in leadership, strategic planning and governance at Harvard Business School, the U.S. Foreign Service Institute, China Europe International Business School and the Association of International Schools in Africa.',
      'He is highly rated on the Hay Group Inventory of Leadership Styles — particularly as a visionary, coaching, affiliative and participatory leader.',
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
      'At Nucleus she is dedicated to creating a welcoming experience for every family — working with parents from their first inquiry through their child’s journey to ensure clear communication, strong partnerships and a genuine sense of belonging. She also leads the school’s marketing and communications.',
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
    id: 'meaza',
    name: 'Meaza Mekuria',
    role: 'HR & Admin Manager',
    dept: 'Operations',
    photo: '/images/team/meaza-mekuria.webp',
    bio: [
      'Meaza is an accomplished HR professional with over 18 years of experience spanning international education, the airline industry and the international NGO sector. For the past 13 years she has specialized in international education — leading recruitment, employee relations, policy development, performance management and staff development.',
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
      'A Management graduate of Addis Ababa University, he has completed advanced international training in crisis management, emergency response and soft-target risk assessment — including counterterrorism training through the U.S. Department of State’s Anti-Terrorism Assistance (ATA) Program. At Nucleus he leads the school’s security strategy.',
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
      'With expertise in the Cambridge curriculum, student leadership and holistic child development, he designs summer-camp experiences that build confidence, teamwork and creativity — so every child enjoys a safe, enriching and memorable camp.',
    ],
  },
  {
    id: 'yordanos',
    name: 'Yordanos Worku',
    role: 'Marketing & Communication Officer',
    dept: 'Operations',
    photo: '/images/team/yordanos-worku.webp',
    bio: [
      'Yordanos is a Business Management professional with a diverse background in banking, hospitality, event management and marketing & communications — with strong skills in strategic communication, stakeholder engagement and brand representation.',
      'As Marketing and Communication Officer she is committed to strengthening the school’s visibility, building meaningful connections with families, and supporting its mission through effective communication and creative marketing.',
    ],
  },
  {
    id: 'ahmed',
    name: 'Ahmed Wageh',
    role: 'Music Teacher & School Band Director',
    dept: 'Arts & Music',
    photo: '/images/team/ahmed-wageh.webp',
    bio: [
      'Ahmed is a music educator with nearly a decade of experience helping students of all levels find their voice, build real technique and fall in love with music. He teaches cello, guitar, piano and keyboard — from beginners to advanced performers — and has guided many students through ABRSM, Trinity and IGCSE examinations.',
      'His teaching is practical and student-centred: he meets learners where they are and adapts to every learning style. Beyond one-to-one lessons he’s passionate about ensemble work. He holds a Bachelor’s in Music Education and is completing his PGCE (International).',
    ],
  },
  {
    id: 'lia',
    name: 'Lia Muhammed',
    role: 'Receptionist',
    dept: 'Front Office',
    photo: '/images/team/lia-muhammed.webp',
    bio: [
      'Lia is a dedicated and versatile professional who brings international experience in hospitality, healthcare, translation and executive support to Nucleus. She previously worked as a Receptionist at the Marriott Hotel in the United Kingdom and has more than four years of nursing experience in London — developing exceptional customer-service, communication and organizational skills.',
      'She completed her secondary education at the Netherlands American School, studied Nursing Access at Kensington and Chelsea College, and earned a BSc in Nursing from the University of West London. A Dutch citizen and UK resident, she has extensive experience working with people from diverse cultures and backgrounds.',
      'As the first point of contact for many families and visitors, she is committed to creating a warm, welcoming and professional environment while providing efficient administrative support that reflects the caring, inclusive values of Nucleus.',
    ],
  },
]

export type OurTeamProps = {
  blockType: 'ourTeam'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  /** CMS-managed roster (from the `staff` collection). Falls back to TEAM when absent/empty. */
  members?: TeamMember[]
}

export function OurTeamBlock({
  background = 'offwhite',
  eyebrow = 'The People of Nucleus',
  heading = 'Meet the team behind the promise',
  intro = 'Leaders, educators and specialists who make Nucleus a place where children truly thrive.',
  members,
}: OurTeamProps) {
  const team = members && members.length > 0 ? members : TEAM
  const [active, setActive] = useState<TeamMember | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [active])

  const open = (m: TeamMember, el: HTMLElement) => {
    lastFocus.current = el
    setActive(m)
  }
  const close = () => {
    setActive(null)
    lastFocus.current?.focus()
  }

  return (
    <Section background={background}>
      <Container>
        <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.id} variant="up" delay={Math.min(i, 5) * 70} className="h-full">
              <button
                type="button"
                onClick={(e) => open(m, e.currentTarget)}
                className="group w-full text-left"
                aria-label={`Read ${m.name}’s bio`}
              >
                <div className="flex h-full flex-col items-center rounded-[20px] border border-navy/[0.08] bg-white p-4 pb-6 text-center shadow-[0_1px_3px_rgba(17,2,77,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-ochre/50 hover:shadow-[0_22px_44px_-22px_rgba(17,2,77,0.34)] motion-safe:active:scale-[0.99]">
                  <div className="relative aspect-[4/4.6] w-full max-w-[220px] overflow-hidden rounded-[130px_130px_20px_20px] border border-navy/[0.08] bg-gradient-to-b from-mist to-pale [box-shadow:inset_0_0_0_4px_#fff]">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 220px"
                      className="object-cover object-top [filter:saturate(1.07)_contrast(1.03)]"
                    />
                  </div>
                  <div className="mt-4 font-display text-[1.05rem] font-bold text-navy">{m.name}</div>
                  <div className="mt-0.5 font-display text-sm font-semibold text-ochre-600">{m.role}</div>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-display text-xs font-semibold text-navy/50 transition-opacity duration-200 group-hover:text-navy">
                    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-ochre text-sm leading-none text-navy">+</span>
                    View bio
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-name"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(9,4,28,0.62)] p-4 backdrop-blur-sm sm:p-6"
          onClick={close}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white text-ink shadow-[0_40px_90px_-30px_rgba(9,4,28,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close bio"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg text-navy shadow-[0_4px_12px_rgba(17,2,77,0.2)] transition-colors hover:bg-ochre"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-[14rem_1fr]">
              <div className="relative h-[50vh] min-h-[320px] bg-gradient-to-b from-mist to-pale sm:h-auto sm:min-h-[240px]">
                <Image
                  src={active.photo}
                  alt={active.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 14rem"
                  className="object-cover object-[center_20%]"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 id="team-modal-name" className="font-display text-2xl font-bold text-navy">
                  {active.name}
                </h3>
                <div className="mt-1 font-display text-sm font-semibold text-ochre-600">{active.role}</div>
                <span className="mt-3 inline-block rounded-full bg-mist px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.05em] text-navy">
                  {active.dept}
                </span>
                <div className="mt-4 space-y-3 text-[0.98rem] leading-relaxed text-ink/80">
                  {active.bio.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
