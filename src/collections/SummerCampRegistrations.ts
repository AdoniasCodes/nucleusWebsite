import type { CollectionConfig } from 'payload'

import { isAdminOrStaff, isSuperAdmin } from '../access'
import { notifyLead } from '../hooks/notifyLead'

/**
 * Summer camp registrations. Kept in their own collection (not folded into admissions-inquiries)
 * so staff see camp sign-ups clearly in the admin, with the preferred campus as its own column.
 *
 * SECURITY: create is locked to authenticated CMS users so POST /api/summer-camp-registrations
 * can't be spammed directly. Real public submissions come through the `submitForm` server action
 * (Local API / overrideAccess) AFTER honeypot + per-IP rate limit + signed form-token check.
 */
export const SummerCampRegistrations: CollectionConfig = {
  slug: 'summer-camp-registrations',
  labels: { singular: 'Summer Camp Registration', plural: 'Summer Camp Registrations' },
  admin: {
    useAsTitle: 'parentName',
    defaultColumns: ['parentName', 'phone', 'childAge', 'status', 'createdAt'],
    group: 'Forms',
  },
  access: {
    create: isAdminOrStaff, // public submits go through the server action's Local API (see header)
    read: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isSuperAdmin,
  },
  hooks: {
    afterChange: [notifyLead('Summer Camp Registration')],
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
    { name: 'preferredCampus', type: 'text', maxLength: 100 },
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
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
