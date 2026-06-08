import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrStaff } from '../access'

/** Parent & student testimonials (social proof for the admissions funnel). */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'relationship', 'featured'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'authorName', type: 'text', required: true },
    {
      name: 'relationship',
      type: 'text',
      admin: { description: 'e.g. "Parent of Grade 3 student" or "Alumnus, Class of 2024".' },
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
