import type { CollectionConfig } from 'payload'

import { isAdminOrStaff, isSuperAdmin } from '../access'
import { notifyLead } from '../hooks/notifyLead'

/**
 * School tour / campus visit bookings. Staff manage status. No public read.
 *
 * SECURITY: create is locked to authenticated CMS users so POST /api/tour-bookings can't be
 * spammed directly. Real public submissions come through the `submitForm` server action
 * (Local API / overrideAccess) AFTER honeypot + per-IP rate limit + reCAPTCHA v3.
 */
export const TourBookings: CollectionConfig = {
  slug: 'tour-bookings',
  labels: { singular: 'Tour Booking', plural: 'Tour Bookings' },
  admin: {
    useAsTitle: 'parentName',
    defaultColumns: ['parentName', 'preferredDate', 'status', 'createdAt'],
    group: 'Forms',
  },
  access: {
    create: isAdminOrStaff, // public submits go through the server action's Local API (see header)
    read: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isSuperAdmin,
  },
  hooks: {
    afterChange: [notifyLead('Tour Booking')],
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
      type: 'row',
      fields: [
        { name: 'preferredDate', type: 'date', admin: { width: '50%' } },
        {
          name: 'preferredTime',
          type: 'select',
          options: [
            { label: 'Morning', value: 'morning' },
            { label: 'Afternoon', value: 'afternoon' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'notes', type: 'textarea', maxLength: 3000 },
    {
      name: 'sourcePage',
      type: 'text',
      maxLength: 300,
      admin: { readOnly: true },
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
