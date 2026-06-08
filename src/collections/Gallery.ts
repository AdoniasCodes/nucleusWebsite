import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrStaff } from '../access'

/** Photo/video gallery items, categorized for the gallery block + Campus Life pages. */
export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'mediaType', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Campus', value: 'campus' },
        { label: 'Classroom', value: 'classroom' },
        { label: 'STEM & Robotics', value: 'stem' },
        { label: 'Agriculture & Animal Care', value: 'agriculture' },
        { label: 'Sports', value: 'sports' },
        { label: 'Events', value: 'events' },
        { label: 'Music & Arts', value: 'arts' },
      ],
    },
    {
      name: 'mediaType',
      type: 'radio',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.mediaType === 'image' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL (YouTube/Vimeo)',
      admin: { condition: (_, s) => s?.mediaType === 'video' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
