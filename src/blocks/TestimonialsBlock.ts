import type { Block } from 'payload'

/** Parent/student testimonials: featured set or hand-picked. */
export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  interfaceName: 'TestimonialsBlockType',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Off-white', value: 'offwhite' },
        { label: 'Purple gradient', value: 'purple' },
      ],
    },
    {
      name: 'source',
      type: 'radio',
      defaultValue: 'featured',
      options: [
        { label: 'Featured', value: 'featured' },
        { label: 'Hand-picked', value: 'manual' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'manual' },
    },
  ],
}
