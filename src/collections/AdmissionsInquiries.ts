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
        { name: 'phone', type: 'text', admin: { width: '50%' } },
        { name: 'childAgeOrGrade', type: 'text', label: 'Child age / grade', admin: { width: '50%' } },
      ],
    },
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
