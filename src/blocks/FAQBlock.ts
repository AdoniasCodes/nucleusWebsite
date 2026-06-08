import type { Block } from 'payload'

/**
 * FAQ accordion. Renders FAQ Schema (JSON-LD) on the frontend to win
 * "People Also Ask" / AI-answer real estate. Filter by category or hand-pick.
 */
export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlockType',
  labels: { singular: 'FAQ', plural: 'FAQs' },
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
        { label: 'General', value: 'general' },
        { label: 'Admissions', value: 'admissions' },
        { label: 'Fees', value: 'fees' },
        { label: 'Curriculum', value: 'curriculum' },
        { label: 'Campus & Safety', value: 'campus' },
      ],
      admin: { condition: (_, s) => s?.source === 'category' },
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'manual' },
    },
    {
      name: 'renderSchema',
      type: 'checkbox',
      label: 'Output FAQ structured data (JSON-LD)',
      defaultValue: true,
    },
  ],
}
