import type { CollectionConfig } from 'payload'

import { isAdminOrStaff, isSuperAdmin } from '../access'
import { notifyLead } from '../hooks/notifyLead'

/**
 * Admissions inquiries (incl. gated fee-sheet requests). Staff can read + update status but
 * cannot delete. No public read.
 *
 * SECURITY: create is locked to authenticated CMS users so the public REST endpoint
 * (POST /api/admissions-inquiries) can't be spammed directly. Real public submissions come
 * through the `submitForm` server action, which uses the Local API (overrideAccess) AFTER
 * passing honeypot + per-IP rate limit + reCAPTCHA v3 verification.
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
    create: isAdminOrStaff, // public submits go through the server action's Local API (see header)
    read: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isSuperAdmin,
  },
  hooks: {
    afterChange: [notifyLead('Admissions Inquiry')],
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'parentName', type: 'text', required: true, maxLength: 200, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', maxLength: 50, admin: { width: '33%' } },
        { name: 'childAge', type: 'text', label: "Child's age", maxLength: 50, admin: { width: '33%' } },
        { name: 'childGrade', type: 'text', label: 'Grade applying for', maxLength: 100, admin: { width: '34%' } },
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
    { name: 'message', type: 'textarea', maxLength: 3000 },
    {
      name: 'sourcePage',
      type: 'text',
      maxLength: 300,
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
