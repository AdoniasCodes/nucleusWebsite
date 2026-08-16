import type { DefaultPage } from './defaultPages'

/**
 * The school's legal pages: Terms and Conditions, and the Privacy Policy.
 *
 * Source of truth is the school's own documents (Google Docs supplied 16 Aug 2026). The wording
 * here reproduces them; only three edits were made, all of them house rules rather than
 * rewriting:
 *   1. Em dashes replaced with commas (workspace rule: zero em dashes anywhere).
 *   2. "The Educators' Core" replaced with the current series name. That newsletter was renamed
 *      on 5 Aug 2026 and the old name is dead everywhere else on the site.
 *   3. Straight apostrophes replaced with typographic ones, to match the rest of the site.
 * Any change of substance must be made in the source document first, then mirrored here.
 */

const VATICAN = 'Vatican Campus, behind the Vatican Embassy, Addis Ababa, Ethiopia'
const ABO = 'Abo Campus, 100 m from Mekanisa Abo Square, Addis Ababa, Ethiopia'
const EFFECTIVE = '16 August 2026'

export const legalPages: Record<string, DefaultPage> = {
  terms: {
    title: 'Terms and Conditions',
    seoTitle: 'Terms and Conditions | Nucleus International Schools',
    description:
      'The terms governing enrollment at Nucleus International Schools and use of our website: admissions, fees, academic standards, conduct, health and safety, and dispute resolution.',
    layout: [
      {
        blockType: 'legalDoc',
        eyebrow: 'Legal',
        title: 'Terms and Conditions of Enrollment and Website Usage',
        intro:
          'These terms govern the relationship between Nucleus International Schools, its students, parents and guardians, and everyone who uses our website and digital services.',
        effectiveDate: EFFECTIVE,
        seeAlso: { label: 'Privacy Policy and Data Protection Notice', href: '/privacy' },
        sections: [
          {
            id: 'acceptance',
            heading: 'Introduction and Acceptance of Terms',
            navLabel: 'Introduction and acceptance',
            body: [
              {
                type: 'p',
                text: 'Welcome to Nucleus International Schools (“NIS,” “the School,” “we,” “us,” or “our”). These Terms and Conditions (“Terms”) govern the relationship between Nucleus International Schools, its students, parents and legal guardians (“Parents”), and users of our website and digital services.',
              },
              {
                type: 'p',
                text: 'By enrolling a child at NIS, accessing our online portals, or utilizing our educational services, you acknowledge that you have read, understood, and agree to be bound by these Terms, along with our internal policies, codes of conduct, and academic regulations.',
              },
            ],
          },
          {
            id: 'governing-law',
            heading: 'Regulatory and Governing Law',
            navLabel: 'Regulatory and governing law',
            body: [
              {
                type: 'ol',
                items: [
                  {
                    label: 'Jurisdiction:',
                    text: 'These Terms are governed by and construed in accordance with the laws of the Federal Democratic Republic of Ethiopia (FDRE), including regulations set forth by the FDRE Ministry of Education and the Addis Ababa City Administration Education Bureau.',
                  },
                  {
                    label: 'Cambridge affiliation:',
                    text: 'NIS operates in alignment with the standards, benchmarks, and educational methodologies set by Cambridge Assessment International Education. Where applicable, academic regulations adhere to Cambridge guidelines while respecting national educational mandates.',
                  },
                ],
              },
            ],
          },
          {
            id: 'admissions',
            heading: 'Admissions and Enrollment',
            navLabel: 'Admissions and enrollment',
            body: [
              {
                type: 'ol',
                items: [
                  {
                    label: 'Eligibility:',
                    text: 'Admission to NIS, spanning early childhood and daycare through elementary and middle school grades, is granted subject to availability, meeting age criteria, passing baseline assessments, and fulfilling administrative requirements.',
                  },
                  {
                    label: 'Accuracy of information:',
                    text: 'Parents must provide complete, accurate, and truthful information during the application process, including medical histories, legal guardianship status, and prior academic records. Withholding relevant information may result in the revocation of admission.',
                  },
                  {
                    label: 'Re-enrollment:',
                    text: 'Enrollment is reviewed annually. NIS reserves the right to decline re-enrollment based on academic performance, behavioral issues, or non-payment of fees.',
                  },
                ],
              },
            ],
          },
          {
            id: 'fees',
            heading: 'Tuition Fees and Financial Obligations',
            navLabel: 'Tuition fees and payment',
            body: [
              {
                type: 'ol',
                items: [
                  {
                    label: 'Fee structure:',
                    text: 'Tuition, registration, facility fees, and activity charges are determined by NIS management and communicated prior to the start of each academic year or term.',
                  },
                  {
                    label: 'Payment terms:',
                    text: 'All fees are payable in Ethiopian Birr (ETB), or currency permitted by the National Bank of Ethiopia for designated international transactions, on or before the due dates specified in the school fee schedule.',
                  },
                  {
                    label: 'Late payments:',
                    text: 'Failure to settle outstanding fees by the designated deadline may result in late payment penalties, withholding of academic records and transcripts, or suspension of the student from classes.',
                  },
                  {
                    label: 'Refund policy:',
                    text: 'Registration fees and deposits are non-refundable. Tuition fee refunds for student withdrawals are subject to the official NIS Refund Policy and require formal written notification prior to the commencement of the term.',
                  },
                ],
              },
            ],
          },
          {
            id: 'academics',
            heading: 'Academic Standards and Cambridge Curriculum',
            navLabel: 'Academic standards',
            body: [
              {
                type: 'ol',
                items: [
                  {
                    label: 'Curriculum delivery:',
                    text: 'NIS delivers a dual-aligned educational framework blending international best practices, specifically the international Cambridge curriculum, with required national cultural and language studies.',
                  },
                  {
                    label: 'Academic integrity:',
                    text: 'Students are expected to maintain high standards of academic honesty. Plagiarism, cheating, or unauthorized assistance on assessments will result in disciplinary action in accordance with school policy.',
                  },
                  {
                    label: 'Assessment and progression:',
                    text: 'Student advancement between grade levels is governed by continuous assessment, examinations, and Cambridge benchmark evaluations where applicable.',
                  },
                ],
              },
            ],
          },
          {
            id: 'conduct',
            heading: 'Code of Conduct and Discipline',
            navLabel: 'Code of conduct',
            body: [
              {
                type: 'ol',
                items: [
                  {
                    label: 'Community standards:',
                    text: 'NIS maintains a safe, respectful, and inclusive learning environment across all campuses, including our Vatican campus and future developments. Students and parents are expected to treat faculty, staff, and peers with dignity.',
                  },
                  {
                    label: 'Disciplinary measures:',
                    text: 'The School reserves the right to suspend or expel any student whose conduct severely breaches the NIS Code of Conduct, damages school property, or compromises the safety and wellbeing of others.',
                  },
                  {
                    label: 'Parental conduct:',
                    text: 'Respectful collaboration between parents and school staff is essential. Verbal abuse, harassment, or defamatory behavior by a parent toward school personnel may lead to the cancellation of the family’s enrollment contract.',
                  },
                ],
              },
            ],
          },
          {
            id: 'health-safety',
            heading: 'Health, Safety, and Pastoral Care',
            navLabel: 'Health and safety',
            body: [
              {
                type: 'ol',
                items: [
                  {
                    label: 'Medical consent:',
                    text: 'In the event of a medical emergency on campus or during a school-sanctioned outing, NIS staff will attempt to contact parents immediately. If parents are unreachable, authorization is granted to school staff to secure emergency medical treatment from licensed healthcare professionals in Ethiopia.',
                  },
                  {
                    label: 'Special needs and medical conditions:',
                    text: 'Parents must disclose any physical, psychological, or learning needs prior to enrollment to ensure the school can adequately support the student.',
                  },
                ],
              },
            ],
          },
          {
            id: 'intellectual-property',
            heading: 'Intellectual Property and Brand Use',
            navLabel: 'Intellectual property',
            body: [
              {
                type: 'ol',
                items: [
                  {
                    label: 'School media and content:',
                    text: 'All content, graphics, logos, training materials (including Teachers’ Capacity Building Training modules), and digital assets produced by NIS are the intellectual property of Nucleus International Schools.',
                  },
                  {
                    label: 'Third-party trademarks:',
                    text: '“Cambridge” and “Cambridge Assessment International Education” are registered trademarks of the University of Cambridge. Their use by NIS is strictly in accordance with authorization and affiliation guidelines.',
                  },
                  {
                    label: 'Media release:',
                    text: 'NIS periodically captures photographs and video recordings of school activities, field trips, and events for educational, promotional, and newsletter purposes. Parents may opt out in writing during the registration process.',
                  },
                ],
              },
            ],
          },
          {
            id: 'privacy',
            heading: 'Privacy and Data Protection',
            navLabel: 'Privacy and data',
            body: [
              {
                type: 'ol',
                items: [
                  {
                    label: 'Data collection:',
                    text: 'NIS collects personal data, including identification, academic records, and emergency contacts, strictly for administrative, educational, and statutory reporting purposes.',
                  },
                  {
                    label: 'Confidentiality:',
                    text: 'Personal information is stored securely and handled in accordance with local data protection principles under Ethiopian law. Data will not be disclosed to third parties without consent, except as required by law or educational authorities.',
                  },
                ],
              },
              {
                type: 'p',
                text: 'Our full Privacy Policy and Data Protection Notice sets out what we collect, why, who it is shared with, and the rights you hold as a parent or guardian.',
              },
            ],
          },
          {
            id: 'disputes',
            heading: 'Dispute Resolution',
            navLabel: 'Dispute resolution',
            body: [
              {
                type: 'ol',
                items: [
                  {
                    label: 'Informal resolution:',
                    text: 'In the event of a dispute or grievance between a parent or guardian and NIS, both parties agree to first attempt resolution through internal administrative channels and formal parent and administration meetings.',
                  },
                  {
                    label: 'Arbitration and litigation:',
                    text: 'If a dispute cannot be resolved informally, it shall be submitted to the competent courts of Addis Ababa, Ethiopia, which shall have exclusive jurisdiction.',
                  },
                ],
              },
            ],
          },
          {
            id: 'amendments',
            heading: 'Amendments and Updates',
            navLabel: 'Amendments and updates',
            body: [
              {
                type: 'p',
                text: 'NIS reserves the right to update or modify these Terms and Conditions at any time to reflect operational changes, academic updates, or legislative adjustments in Ethiopia. Notice of changes will be posted on the official school platform or communicated via official newsletters.',
              },
            ],
          },
        ],
        contact: {
          heading: 'Contact Information',
          intro: 'For questions or official notices regarding these Terms and Conditions, please contact:',
          orgName: 'Nucleus International Schools',
          lines: [
            { label: 'Grade campus', value: VATICAN },
            { label: 'Primary campus', value: ABO },
            { label: 'Phone', value: '09 81 99 99 22', href: 'tel:0981999922' },
            { label: 'Alternative phone', value: '09 81 99 99 33', href: 'tel:0981999933' },
            { label: 'Admissions', value: 'melat.a@nucints.com', href: 'mailto:melat.a@nucints.com' },
          ],
        },
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    seoTitle: 'Privacy Policy | Nucleus International Schools',
    description:
      'How Nucleus International Schools collects, uses, stores and protects the personal data of students, parents, staff and website visitors, and the rights you hold over it.',
    layout: [
      {
        blockType: 'legalDoc',
        eyebrow: 'Legal',
        title: 'Privacy Policy and Data Protection Notice',
        intro:
          'How we collect, store, process, use and safeguard personal information across our campuses, our learning systems and this website, and the rights you hold over that information.',
        effectiveDate: EFFECTIVE,
        seeAlso: { label: 'Terms and Conditions of Enrollment and Website Usage', href: '/terms' },
        sections: [
          {
            id: 'scope',
            heading: 'Introduction and Scope',
            navLabel: 'Introduction and scope',
            body: [
              {
                type: 'p',
                text: 'Nucleus International Schools (“NIS,” “the School,” “we,” “us,” or “our”) is committed to protecting the privacy, security, and personal data of our students, parents and legal guardians (“Parents”), staff, job applicants, and visitors to our websites and digital portals.',
              },
              {
                type: 'p',
                text: 'This Privacy Policy explains how we collect, store, process, use, and safeguard personal information across our academic campuses (including our Vatican campus), digital learning management systems, official website, and administrative portals.',
              },
              {
                type: 'p',
                text: 'By enrolling a student at NIS, using our website, or interacting with our digital services, you acknowledge the data practices described in this Privacy Policy.',
              },
            ],
          },
          {
            id: 'legal-framework',
            heading: 'Legal Framework and Governing Law',
            navLabel: 'Legal framework',
            body: [
              { type: 'p', text: 'This Policy is formulated in accordance with:' },
              {
                type: 'ol',
                items: [
                  {
                    label: 'The laws of the Federal Democratic Republic of Ethiopia (FDRE):',
                    text: 'Including constitutional privacy protections, applicable provisions under the Civil Code of Ethiopia, the Computer Crime Proclamation (No. 958/2016), and relevant national data protection regulations established by the FDRE Ministry of Innovation and Technology and the FDRE Ministry of Education.',
                  },
                  {
                    label: 'Cambridge International Education standards:',
                    text: 'Data processing standards required by Cambridge Assessment International Education for examination registration, baseline assessment, candidate identification, and international academic benchmarking.',
                  },
                ],
              },
            ],
          },
          {
            id: 'what-we-collect',
            heading: 'Information We Collect',
            navLabel: 'Information we collect',
            body: [
              {
                type: 'p',
                text: 'We collect personal data necessary for admissions, educational delivery, student safety, administrative efficiency, and regulatory compliance.',
              },
              { type: 'h3', text: 'A. Student personal data' },
              {
                type: 'ul',
                items: [
                  {
                    label: 'Identity and demographic data:',
                    text: 'Full name, date of birth, gender, nationality, national identification details, photographs, and spoken languages.',
                  },
                  {
                    label: 'Academic records:',
                    text: 'Previous school transcripts, assessment results, Cambridge examination entry details, attendance records, behavioral logs, and special educational needs (SEN) assessments.',
                  },
                  {
                    label: 'Health and medical information:',
                    text: 'Blood group, allergies, immunization records, pre-existing medical conditions, doctor contact details, and emergency treatment logs.',
                  },
                ],
              },
              { type: 'h3', text: 'B. Parent and guardian data' },
              {
                type: 'ul',
                items: [
                  {
                    label: 'Contact details:',
                    text: 'Full name, phone numbers, email addresses, residential address, and emergency contact details.',
                  },
                  {
                    label: 'Financial data:',
                    text: 'Payment history, bank account details, and transaction records for tuition and activity fees.',
                  },
                  {
                    label: 'Employment information:',
                    text: 'Occupation and employer details for verification and emergency contact context.',
                  },
                ],
              },
              { type: 'h3', text: 'C. Website and digital platform data' },
              {
                type: 'ul',
                items: [
                  {
                    label: 'Usage and technical data:',
                    text: 'IP address, browser type, device information, pages visited, and cookies collected when accessing our online portals or filling out electronic forms.',
                  },
                ],
              },
            ],
          },
          {
            id: 'how-we-collect',
            heading: 'How We Collect Personal Data',
            navLabel: 'How we collect it',
            body: [
              { type: 'p', text: 'We collect data through various direct and indirect interactions:' },
              {
                type: 'ul',
                items: [
                  {
                    label: 'Direct submission:',
                    text: 'Enrollment forms, online inquiry portals, paper application packages, fee payment receipts, and health declaration forms.',
                  },
                  {
                    label: 'Academic evaluation:',
                    text: 'Classroom evaluations, Cambridge baseline assessments, teacher feedback, and counselor observations.',
                  },
                  {
                    label: 'Automated technologies:',
                    text: 'Website analytics, camera surveillance (CCTV) on school grounds for security, and digital learning platforms.',
                  },
                ],
              },
            ],
          },
          {
            id: 'purpose',
            heading: 'Purpose of Data Processing',
            navLabel: 'Why we process it',
            body: [
              {
                type: 'p',
                text: 'NIS uses personal data strictly for legitimate educational, administrative, and statutory purposes, including:',
              },
              {
                type: 'ol',
                items: [
                  {
                    label: 'Educational delivery:',
                    text: 'Facilitating teaching, administering the Cambridge curriculum, managing exams, and evaluating academic performance.',
                  },
                  {
                    label: 'Pastoral care and safety:',
                    text: 'Ensuring student wellbeing, managing medical emergencies, maintaining campus security via CCTV, and handling disciplinary matters.',
                  },
                  {
                    label: 'Communication:',
                    text: 'Sending school newsletters, including our Teachers’ Capacity Building Training series, along with emergency alerts, academic progress reports, and event invitations.',
                  },
                  {
                    label: 'Administrative and financial operations:',
                    text: 'Processing tuition payments, maintaining official school archives, and verifying candidate eligibility for Cambridge exams.',
                  },
                  {
                    label: 'Statutory compliance:',
                    text: 'Fulfilling mandatory reporting obligations required by the Addis Ababa City Administration Education Bureau and the FDRE Ministry of Education.',
                  },
                ],
              },
            ],
          },
          {
            id: 'sharing',
            heading: 'Data Sharing and Third-Party Disclosures',
            navLabel: 'Data sharing',
            body: [
              {
                type: 'p',
                text: 'We respect your privacy and do not sell or rent personal data to third parties for commercial or marketing purposes. Personal data is shared only under strict confidentiality agreements with the following entities:',
              },
              {
                type: 'ol',
                items: [
                  {
                    label: 'Cambridge Assessment International Education (UK):',
                    text: 'Student registration data, examination scripts, candidate numbers, and assessment marks are transferred to Cambridge for processing, certification, and verification.',
                  },
                  {
                    label: 'Government and regulatory authorities:',
                    text: 'Data shared with the FDRE Ministry of Education, local health authorities, or law enforcement as required by Ethiopian law or court orders.',
                  },
                  {
                    label: 'Third-party service providers:',
                    text: 'Vetted IT infrastructure providers, educational software platforms, and financial institutions handling payment processing on behalf of NIS.',
                  },
                  {
                    label: 'Emergency services:',
                    text: 'Healthcare providers and emergency responders in case of urgent medical necessity.',
                  },
                ],
              },
            ],
          },
          {
            id: 'media',
            heading: 'Media, Photography, and Public Relations',
            navLabel: 'Photography and media',
            body: [
              {
                type: 'ul',
                items: [
                  {
                    label: 'Capturing images:',
                    text: 'NIS routinely photographs and films school events, sports activities, classroom innovations, and field trips to celebrate student achievement.',
                  },
                  {
                    label: 'Use of media:',
                    text: 'Images may appear in internal school newsletters, official social media channels, brochures, website updates, or press releases.',
                  },
                  {
                    label: 'Opt-out rights:',
                    text: 'Parents and guardians may opt out of public media exposure for their child by completing the NIS Media Release Opt-Out Form during enrollment, or at any point by contacting the administration in writing.',
                  },
                ],
              },
            ],
          },
          {
            id: 'security',
            heading: 'Data Security and Retention',
            navLabel: 'Security and retention',
            body: [
              {
                type: 'ol',
                items: [
                  {
                    label: 'Security measures:',
                    text: 'NIS employs physical, technical, and administrative safeguards to protect personal data against unauthorized access, loss, alteration, or disclosure. Digital records are stored on secure servers with restricted user access.',
                  },
                  {
                    label: 'Retention period:',
                    text: 'Personal data is retained only for as long as necessary to fulfill the educational purpose for which it was collected, or to comply with statutory retention periods under Ethiopian law. Permanent academic records are archived in accordance with Ministry of Education regulations.',
                  },
                ],
              },
            ],
          },
          {
            id: 'your-rights',
            heading: 'Your Rights as a Parent or Guardian',
            navLabel: 'Your rights',
            body: [
              {
                type: 'p',
                text: 'Under applicable privacy standards, parents and guardians, and adult students, have the right to:',
              },
              {
                type: 'ul',
                items: [
                  {
                    label: 'Access:',
                    text: 'Request a copy of the personal data held by NIS regarding their child.',
                  },
                  {
                    label: 'Rectification:',
                    text: 'Request corrections to inaccurate, incomplete, or outdated personal information.',
                  },
                  {
                    label: 'Restriction and opt-out:',
                    text: 'Withdraw consent for non-essential data processing, such as marketing communications or photo publication.',
                  },
                  {
                    label: 'Inquiries and complaints:',
                    text: 'Raise concerns regarding how personal data is handled by contacting the school administration.',
                  },
                ],
              },
            ],
          },
          {
            id: 'cookies',
            heading: 'Cookies and Online Tracking',
            navLabel: 'Cookies and tracking',
            body: [
              {
                type: 'p',
                text: 'Our website uses standard technical cookies to improve user experience, measure traffic, and optimize website functionality. Users can adjust their web browser settings to block cookies, though certain features of our online portal may be affected.',
              },
            ],
          },
          {
            id: 'amendments',
            heading: 'Amendments to This Privacy Policy',
            navLabel: 'Amendments',
            body: [
              {
                type: 'p',
                text: 'NIS reserves the right to update or modify this Privacy Policy periodically to reflect operational changes, technological updates, or legislative developments in Ethiopia. Updates will be published on our official website with an updated effective date.',
              },
            ],
          },
        ],
        contact: {
          heading: 'Contact Information',
          intro:
            'If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact the administration:',
          orgName: 'Nucleus International Schools',
          lines: [
            { label: 'Grade campus', value: VATICAN },
            { label: 'Primary campus', value: ABO },
            { label: 'Phone', value: '09 81 99 99 22', href: 'tel:0981999922' },
            { label: 'Alternative phone', value: '09 81 99 99 33', href: 'tel:0981999933' },
            {
              label: 'HR and Admin Manager',
              value: 'meaza.m@nucints.com',
              href: 'mailto:meaza.m@nucints.com',
            },
          ],
        },
      },
    ],
  },
}
