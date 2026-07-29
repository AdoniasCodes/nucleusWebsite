import type { CollectionConfig } from 'payload'

import { isAdminOrStaff, isSuperAdmin } from '../access'
import { notifyLead } from '../hooks/notifyLead'

/**
 * Full admission applications — the web version of the printed "Student Profile" admission form.
 * Kept separate from `admissions-inquiries` (a 6-field lead capture) because this is a complete
 * application record the registrar works from, not a lead to call back.
 *
 * Field order and grouping mirror the paper form so staff can cross-check the two side by side.
 *
 * SECURITY: create is locked to authenticated CMS users so POST /api/admission-applications can't
 * be spammed directly. Real public submissions come through the `submitApplication` server action
 * (Local API / overrideAccess) AFTER honeypot + per-IP rate limit + signed form-token check.
 */
export const AdmissionApplications: CollectionConfig = {
  slug: 'admission-applications',
  labels: { singular: 'Admission Application', plural: 'Admission Applications' },
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'gradeApplyingTo', 'primaryContact', 'status', 'createdAt'],
    group: 'Forms',
  },
  access: {
    create: isAdminOrStaff, // public submits go through the server action's Local API (see header)
    read: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isSuperAdmin,
  },
  hooks: {
    afterChange: [notifyLead('Admission Application')],
  },
  fields: [
    {
      name: 'studentName',
      type: 'text',
      required: true,
      maxLength: 300,
      admin: { description: 'Auto-composed from the child’s first / middle / last name on submit.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Application',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'previousSchool', type: 'text', maxLength: 200, admin: { width: '50%' } },
                { name: 'previousCurriculum', type: 'text', maxLength: 200, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'currentGrade', type: 'text', maxLength: 100, admin: { width: '50%' } },
                { name: 'gradeApplyingTo', type: 'text', maxLength: 100, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'preferredCampus', type: 'text', maxLength: 100, admin: { width: '50%' } },
                {
                  name: 'applicationDate',
                  type: 'text',
                  maxLength: 30,
                  admin: { width: '50%', description: 'Date the parent submitted the form (YYYY-MM-DD).' },
                },
              ],
            },
          ],
        },
        {
          label: 'Student',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'childFirstName', type: 'text', required: true, maxLength: 100, admin: { width: '33%' } },
                { name: 'childMiddleName', type: 'text', maxLength: 100, admin: { width: '33%' } },
                { name: 'childLastName', type: 'text', required: true, maxLength: 100, admin: { width: '34%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'gender',
                  type: 'select',
                  options: [
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                  ],
                  admin: { width: '50%' },
                },
                {
                  name: 'dateOfBirth',
                  type: 'text',
                  maxLength: 30,
                  admin: { width: '50%', description: 'YYYY-MM-DD' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'placeOfBirth', type: 'text', maxLength: 150, admin: { width: '50%' } },
                { name: 'nationality', type: 'text', maxLength: 100, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'citizenship', type: 'text', maxLength: 100, admin: { width: '50%' } },
                { name: 'passportNumber', type: 'text', maxLength: 60, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'motherTongue', type: 'text', maxLength: 100, admin: { width: '50%' } },
                { name: 'secondLanguage', type: 'text', maxLength: 100, admin: { width: '50%' } },
              ],
            },
            {
              name: 'primaryContact',
              type: 'text',
              maxLength: 100,
              admin: { description: 'Which parent/guardian the school should contact first.' },
            },
          ],
        },
        {
          label: 'Parents',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'fatherSalutation', type: 'text', maxLength: 20, admin: { width: '20%' } },
                { name: 'fatherFirstName', type: 'text', maxLength: 100, admin: { width: '27%' } },
                { name: 'fatherMiddleName', type: 'text', maxLength: 100, admin: { width: '26%' } },
                { name: 'fatherLastName', type: 'text', maxLength: 100, admin: { width: '27%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'fatherNationality', type: 'text', maxLength: 100, admin: { width: '50%' } },
                { name: 'fatherOccupation', type: 'text', maxLength: 150, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'fatherPassport', type: 'text', maxLength: 60, admin: { width: '33%' } },
                { name: 'fatherPassportExpiry', type: 'text', maxLength: 30, admin: { width: '33%' } },
                { name: 'fatherNationalId', type: 'text', maxLength: 60, admin: { width: '34%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'fatherMobile', type: 'text', maxLength: 40, admin: { width: '33%' } },
                { name: 'fatherBusinessPhone', type: 'text', maxLength: 40, admin: { width: '33%' } },
                { name: 'fatherEmergencyPhone', type: 'text', maxLength: 40, admin: { width: '34%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'fatherEmail', type: 'text', maxLength: 200, admin: { width: '50%' } },
                { name: 'fatherWorkEmail', type: 'text', maxLength: 200, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'motherSalutation', type: 'text', maxLength: 20, admin: { width: '20%' } },
                { name: 'motherFirstName', type: 'text', maxLength: 100, admin: { width: '27%' } },
                { name: 'motherMiddleName', type: 'text', maxLength: 100, admin: { width: '26%' } },
                { name: 'motherLastName', type: 'text', maxLength: 100, admin: { width: '27%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'motherNationality', type: 'text', maxLength: 100, admin: { width: '50%' } },
                { name: 'motherOccupation', type: 'text', maxLength: 150, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'motherPassport', type: 'text', maxLength: 60, admin: { width: '33%' } },
                { name: 'motherPassportExpiry', type: 'text', maxLength: 30, admin: { width: '33%' } },
                { name: 'motherNationalId', type: 'text', maxLength: 60, admin: { width: '34%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'motherMobile', type: 'text', maxLength: 40, admin: { width: '33%' } },
                { name: 'motherBusinessPhone', type: 'text', maxLength: 40, admin: { width: '33%' } },
                { name: 'motherEmergencyPhone', type: 'text', maxLength: 40, admin: { width: '34%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'motherEmail', type: 'text', maxLength: 200, admin: { width: '50%' } },
                { name: 'motherWorkEmail', type: 'text', maxLength: 200, admin: { width: '50%' } },
              ],
            },
          ],
        },
        {
          label: 'Wellbeing',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'hasSiblings', type: 'checkbox', label: 'Has sibling(s) at the school', admin: { width: '50%' } },
                { name: 'isStaffChild', type: 'checkbox', label: 'Parent is a staff member', admin: { width: '50%' } },
              ],
            },
            { name: 'siblingDetails', type: 'textarea', maxLength: 1000 },
            {
              type: 'row',
              fields: [
                { name: 'hasHealthConditions', type: 'checkbox', label: 'Has health conditions', admin: { width: '50%' } },
                { name: 'needsTreatment', type: 'checkbox', label: 'Requires treatment', admin: { width: '50%' } },
              ],
            },
            { name: 'healthDetails', type: 'textarea', maxLength: 2000 },
            {
              type: 'row',
              fields: [
                { name: 'hasLearningNeeds', type: 'checkbox', label: 'Learning difficulty / SEN', admin: { width: '50%' } },
                { name: 'hasDisability', type: 'checkbox', label: 'Disability or behavioural/emotional need', admin: { width: '50%' } },
              ],
            },
            { name: 'learningNeedsDetails', type: 'textarea', maxLength: 2000 },
            { name: 'hasAllergies', type: 'checkbox', label: 'Has allergies' },
            { name: 'allergyDetails', type: 'textarea', maxLength: 2000 },
          ],
        },
        {
          label: 'Assessment & Consent',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'cat4Verbal', type: 'text', maxLength: 20, label: 'CAT4 verbal', admin: { width: '25%' } },
                { name: 'cat4Quantitative', type: 'text', maxLength: 20, label: 'CAT4 quantitative', admin: { width: '25%' } },
                { name: 'cat4NonVerbal', type: 'text', maxLength: 20, label: 'CAT4 non-verbal', admin: { width: '25%' } },
                { name: 'cat4Spatial', type: 'text', maxLength: 20, label: 'CAT4 spatial', admin: { width: '25%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'mediaConsent', type: 'checkbox', label: 'Photo / video consent given', admin: { width: '33%' } },
                { name: 'parentsSeparated', type: 'checkbox', label: 'Parents separated or divorced', admin: { width: '33%' } },
                { name: 'transportInterest', type: 'checkbox', label: 'Interested in school transport', admin: { width: '34%' } },
              ],
            },
            { name: 'heardAbout', type: 'text', maxLength: 200, label: 'How they heard about the school' },
            {
              name: 'declarationName',
              type: 'text',
              maxLength: 200,
              admin: { description: 'Typed full name — the parent’s electronic signature on the declaration.' },
            },
            { name: 'declarationAccepted', type: 'checkbox', label: 'Declaration accepted' },
          ],
        },
      ],
    },
    {
      name: 'sourcePage',
      type: 'text',
      maxLength: 300,
      admin: { readOnly: true, description: 'Page the form was submitted from.', position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewing', value: 'reviewing' },
        { label: 'Assessment booked', value: 'assessment' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Enrolled', value: 'enrolled' },
        { label: 'Declined', value: 'declined' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
