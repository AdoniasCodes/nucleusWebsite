import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrStaff } from '../access'

/** FAQ items: power the FAQ block + FAQPage JSON-LD for AI/SERP answer capture. */
export const FAQ: CollectionConfig = {
  slug: 'faq',
  labels: { singular: 'FAQ Item', plural: 'FAQ Items' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  defaultSort: 'order',
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'richText', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Admissions', value: 'admissions' },
        { label: 'Fees', value: 'fees' },
        { label: 'Curriculum', value: 'curriculum' },
        { label: 'Campus & Safety', value: 'campus' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
  ],
}
