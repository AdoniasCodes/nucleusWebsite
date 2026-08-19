/**
 * The roles an international school hires for, grouped the way an applicant thinks about them.
 * Shared by the careers form, the CMS select and the server action's validation, so the three
 * can never drift apart.
 *
 * The list is deliberately broad rather than a list of live vacancies: the form collects
 * speculative applications too. Anything not covered goes through 'other', which reveals a free
 * text field on the form (`otherPosition`).
 */

export type JobPositionGroup = {
  label: string
  options: { label: string; value: string }[]
}

export const JOB_POSITION_GROUPS: JobPositionGroup[] = [
  {
    label: 'Teaching',
    options: [
      { label: 'Early Years / Preschool Teacher', value: 'early-years-teacher' },
      { label: 'KG Teacher', value: 'kg-teacher' },
      { label: 'Primary Teacher', value: 'primary-teacher' },
      { label: 'Lower Secondary Teacher', value: 'lower-secondary-teacher' },
      { label: 'English Teacher', value: 'english-teacher' },
      { label: 'Mathematics Teacher', value: 'mathematics-teacher' },
      { label: 'Science Teacher', value: 'science-teacher' },
      { label: 'Amharic Teacher', value: 'amharic-teacher' },
      { label: 'French Teacher', value: 'french-teacher' },
      { label: 'ICT / Computer Teacher', value: 'ict-teacher' },
      { label: 'Robotics & STEM Instructor', value: 'robotics-stem-instructor' },
      { label: 'Music Teacher', value: 'music-teacher' },
      { label: 'Art Teacher', value: 'art-teacher' },
      { label: 'Physical Education Teacher', value: 'pe-teacher' },
      { label: 'Agriculture & Animal Care Instructor', value: 'agriculture-instructor' },
    ],
  },
  {
    label: 'Student support',
    options: [
      { label: 'Teaching Assistant', value: 'teaching-assistant' },
      { label: 'Special Educational Needs / Learning Support', value: 'sen-learning-support' },
      { label: 'School Counsellor / Psychologist', value: 'school-counsellor' },
      { label: 'School Nurse', value: 'school-nurse' },
      { label: 'Librarian', value: 'librarian' },
    ],
  },
  {
    label: 'Academic leadership',
    options: [
      { label: 'Head of Department', value: 'head-of-department' },
      { label: 'Cambridge Coordinator', value: 'cambridge-coordinator' },
      { label: 'Vice Principal', value: 'vice-principal' },
      { label: 'Principal / Head of School', value: 'principal' },
    ],
  },
  {
    label: 'Administration',
    options: [
      { label: 'Admissions Officer', value: 'admissions-officer' },
      { label: 'Registrar', value: 'registrar' },
      { label: 'HR Officer', value: 'hr-officer' },
      { label: 'Accountant / Finance Officer', value: 'finance-officer' },
      { label: 'Marketing & Communications Officer', value: 'marketing-officer' },
      { label: 'IT Support', value: 'it-support' },
      { label: 'Receptionist / Front Office', value: 'receptionist' },
      { label: 'Administrative Assistant', value: 'admin-assistant' },
    ],
  },
  {
    label: 'Operations',
    options: [
      { label: 'Security Officer', value: 'security-officer' },
      { label: 'Facilities / Maintenance', value: 'facilities' },
      { label: 'Chef / Kitchen Staff', value: 'kitchen-staff' },
      { label: 'Cleaner', value: 'cleaner' },
      { label: 'Driver', value: 'driver' },
      { label: 'Bus Attendant', value: 'bus-attendant' },
    ],
  },
  {
    label: 'Something else',
    options: [{ label: 'Another position (tell us which)', value: 'other' }],
  },
]

/** Flat option list, for the CMS select and for validating a submitted value. */
export const JOB_POSITION_OPTIONS = JOB_POSITION_GROUPS.flatMap((g) => g.options)

export const JOB_POSITION_VALUES = new Set(JOB_POSITION_OPTIONS.map((o) => o.value))

/** Value the form uses to reveal the free-text "which position?" field. */
export const OTHER_POSITION = 'other'

export const jobPositionLabel = (value: string): string =>
  JOB_POSITION_OPTIONS.find((o) => o.value === value)?.label ?? value
