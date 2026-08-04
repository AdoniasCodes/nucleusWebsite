import type { Block, Field } from 'payload'

import { linkField } from '../fields/link'

/**
 * Generic cards grid: powers "Why Leaders Choose Nucleus" (the 5 decision levers),
 * the values grid, program overviews, etc. Each card has an icon/image, title, text,
 * and an optional link.
 */
export const CardsGrid: Block = {
  slug: 'cardsGrid',
  interfaceName: 'CardsGridBlock',
  labels: { singular: 'Cards Grid', plural: 'Cards Grids' },
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Off-white', value: 'offwhite' },
        { label: 'Mist blue', value: 'mist' },
        { label: 'Purple gradient', value: 'purple' },
      ],
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'anchor',
      type: 'text',
      admin: { description: 'Optional HTML id for in-page links (e.g. "activities" → #activities).' },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: ['2', '3', '4'].map((v) => ({ label: `${v} columns`, value: v })),
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        { name: 'icon', type: 'upload', relationTo: 'media' },
        {
          name: 'iconName',
          type: 'text',
          admin: {
            description:
              'Lucide icon name (e.g. GraduationCap, ShieldCheck, Sprout). Used when no icon image is uploaded. See lucide.dev/icons.',
          },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'enableLink',
          type: 'checkbox',
          defaultValue: false,
        },
        // Cast: spreading a Field union loses the discriminant; the shape is valid.
        {
          ...linkField({ appearances: ['link'] }),
          admin: { condition: (_, sibling) => Boolean(sibling?.enableLink) },
        } as Field,
      ],
    },
  ],
}
