import type { CollectionConfig } from 'payload'

import { isAdminOrStaff, isSuperAdmin } from '../access'

/**
 * School tour / campus visit bookings. Public create from the website; staff manage
 * status. No public read. (Phase 4: honeypot + rate limiting on public create.)
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
    create: () => true,
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
    { name: 'notes', type: 'textarea' },
    {
      name: 'sourcePage',
      type: 'text',
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
