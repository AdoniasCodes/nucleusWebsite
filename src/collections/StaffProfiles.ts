import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrStaff } from '../access'

/** Teachers & leadership. Person schema rendered on profile pages (E-E-A-T / trust). */
export const StaffProfiles: CollectionConfig = {
  slug: 'staff',
  labels: { singular: 'Staff Profile', plural: 'Staff Profiles' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'department', 'isLeadership'],
    group: 'People',
  },
  access: {
    read: anyone,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true, admin: { description: 'e.g. "Head of Primary".' } },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Early Years', value: 'early-years' },
        { label: 'Primary', value: 'primary' },
        { label: 'STEM & Robotics', value: 'stem' },
        { label: 'Languages', value: 'languages' },
        { label: 'Arts & Music', value: 'arts' },
        { label: 'PE & Sports', value: 'pe' },
        { label: 'Operations', value: 'operations' },
        { label: 'Front Office', value: 'front-office' },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'richText' },
    {
      name: 'isLeadership',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on the Leadership page.' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
