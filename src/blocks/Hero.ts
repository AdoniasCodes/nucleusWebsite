import type { Block } from 'payload'

import { linkField } from '../fields/link'

/** Page hero. `background` drives the white / purple-gradient / navy section system. */
export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'purple',
      options: [
        { label: 'Purple gradient (emphasis)', value: 'purple' },
        { label: 'White', value: 'white' },
        { label: 'Navy', value: 'navy' },
      ],
    },
    {
      name: 'animateHeading',
      type: 'checkbox',
      label: 'Animate heading (typewriter)',
      defaultValue: false,
      admin: { description: 'Types the heading out, then fades in the subhead + buttons. Use sparingly (e.g. homepage).' },
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'amharicSubline', type: 'text', label: 'Amharic subline' },
    { name: 'subhead', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'bgImage',
      type: 'text',
      label: 'Background image URL',
      admin: {
        description:
          'Optional. A path/URL (e.g. /images/...) used as the hero background when no image is uploaded.',
      },
    },
    {
      name: 'links',
      type: 'array',
      maxRows: 2,
      labels: { singular: 'CTA', plural: 'CTAs' },
      fields: [linkField({ appearances: ['primary', 'outline', 'secondary'] })],
    },
  ],
}
