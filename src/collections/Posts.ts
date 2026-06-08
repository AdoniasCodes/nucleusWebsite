import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrStaff } from '../access'
import { slugField } from '../fields/slug'

/** Blog/News posts. Fully editable by staff. Article schema rendered on the frontend. */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  versions: { drafts: { autosave: { interval: 375 } }, maxPerDoc: 25 },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'News', value: 'news' },
        { label: 'Academics', value: 'academics' },
        { label: 'Admissions', value: 'admissions' },
        { label: 'Campus Life', value: 'campus-life' },
        { label: 'Parent Resources', value: 'parent-resources' },
      ],
    },
    { name: 'excerpt', type: 'textarea', maxLength: 280 },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    slugField('title'),
  ],
}
