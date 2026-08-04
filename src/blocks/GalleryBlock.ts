import type { Block } from 'payload'

/** Gallery grid: either manually-picked items or auto-filtered by category. */
export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  interfaceName: 'GalleryBlockType',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'source',
      type: 'radio',
      defaultValue: 'category',
      options: [
        { label: 'By category', value: 'category' },
        { label: 'Hand-picked', value: 'manual' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Campus', value: 'campus' },
        { label: 'Classroom', value: 'classroom' },
        { label: 'STEM & Robotics', value: 'stem' },
        { label: 'Agriculture & Animal Care', value: 'agriculture' },
        { label: 'Sports', value: 'sports' },
        { label: 'Events', value: 'events' },
        { label: 'Music & Arts', value: 'arts' },
      ],
      admin: { condition: (_, s) => s?.source === 'category' },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 12,
      admin: { condition: (_, s) => s?.source === 'category' },
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'gallery',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'manual' },
    },
  ],
}
