import type { CollectionConfig } from 'payload'

import { isAdminOrStaff, isSuperAdmin } from '../access'

/**
 * Admissions inquiries (incl. gated fee-sheet requests). Created publicly by the website
 * forms; staff can read + update status but cannot delete. No public read.
 * NOTE (Phase 4): public create must be protected with a honeypot + rate limiting/captcha.
 */
export const AdmissionsInquiries: CollectionConfig = {
  slug: 'admissions-inquiries',
  labels: { singular: 'Admissions Inquiry', plural: 'Admissions Inquiries' },
  admin: {
    useAsTitle: 'parentName',
    defaultColumns: ['parentName', 'email', 'interest', 'status', 'createdAt'],
    group: 'Forms',
  },
  access: {
    create: () => true, // public form submissions
    read: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isSuperAdmin,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'parentName', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', admin: { width: '33%' } },
        { name: 'childAge', type: 'text', label: "Child's age", admin: { width: '33%' } },
        { name: 'childGrade', type: 'text', label: 'Grade applying for', admin: { width: '34%' } },
      ],
    },
    // Legacy column kept (hidden) so the schema change stays additive — no dev-push rename prompt.
    // TODO: drop via a proper migration once we're on production migrations.
    { name: 'childAgeOrGrade', type: 'text', admin: { hidden: true } },
    {
      name: 'interest',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'General inquiry', value: 'general' },
        { label: 'Fee sheet request', value: 'fee-request' },
        { label: 'Admissions', value: 'admissions' },
        { label: 'Summer camp', value: 'summer-camp' },
      ],
    },
    { name: 'message', type: 'textarea' },
    {
      name: 'sourcePage',
      type: 'text',
      admin: { readOnly: true, description: 'Page the form was submitted from.' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Enrolled', value: 'enrolled' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
