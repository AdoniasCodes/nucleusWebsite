import type { Block } from 'payload'

/** Free-form rich text section with an optional section background. */
export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  labels: { singular: 'Rich Text', plural: 'Rich Text' },
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Off-white', value: 'offwhite' },
        { label: 'Purple gradient', value: 'purple' },
        { label: 'Navy', value: 'navy' },
      ],
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'narrow',
      options: [
        { label: 'Narrow (prose)', value: 'narrow' },
        { label: 'Wide', value: 'wide' },
      ],
    },
    { name: 'content', type: 'richText', required: true },
  ],
}
