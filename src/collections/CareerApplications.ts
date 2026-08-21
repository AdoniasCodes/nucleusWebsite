import type { CollectionConfig } from 'payload'

import { isAdminOrStaff, isSuperAdmin } from '../access'
import { notifyLead } from '../hooks/notifyLead'
import { JOB_POSITION_OPTIONS } from '../lib/jobPositions'

/**
 * Job applications sent through /careers: who applied, for what, and their CV.
 *
 * SECURITY: create is locked to authenticated CMS users so POST /api/career-applications can't be
 * spammed directly. Real public submissions come through the `submitCareerApplication` server
 * action (Local API / overrideAccess) AFTER honeypot + per-IP rate limit + signed form-token +
 * MIME and file-size checks. Read is staff-only: these records are applicants' personal data.
 */
export const CareerApplications: CollectionConfig = {
  slug: 'career-applications',
  labels: { singular: 'Career Application', plural: 'Career Applications' },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'positionLabel', 'email', 'phone', 'status', 'createdAt'],
    group: 'Forms',
  },
  access: {
    create: isAdminOrStaff, // public submits go through the server action's Local API (see header)
    read: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isSuperAdmin,
  },
  hooks: {
    afterChange: [notifyLead('Career Application')],
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'fullName', type: 'text', required: true, maxLength: 200, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', maxLength: 50, admin: { width: '50%' } },
        {
          name: 'yearsExperience',
          type: 'text',
          label: 'Years of experience',
          maxLength: 20,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'position',
      type: 'select',
      required: true,
      options: JOB_POSITION_OPTIONS,
      admin: { description: 'The role chosen from the dropdown on the careers page.' },
    },
    {
      name: 'otherPosition',
      type: 'text',
      maxLength: 150,
      label: 'Other position (typed by the applicant)',
      admin: {
        description: 'Only filled in when the applicant picked "Another position".',
        condition: (data) => data?.position === 'other',
      },
    },
    {
      name: 'positionLabel',
      type: 'text',
      maxLength: 200,
      admin: {
        readOnly: true,
        description: 'The role in plain words, so list views and emails read properly.',
      },
    },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'career-cvs',
      required: true,
      admin: { description: 'PDF or Word document, up to 5 MB.' },
    },
    // Required at the form and the server action, deliberately NOT `required` here: flipping a
    // live Payload column to NOT NULL is a schema push against the production table for no gain.
    { name: 'message', type: 'textarea', maxLength: 3000, label: 'Cover note' },
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
        { label: 'Interview booked', value: 'interview' },
        { label: 'Hired', value: 'hired' },
        { label: 'Not proceeding', value: 'declined' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
