import type { Block } from 'payload'

import { linkField } from '../fields/link'

/** Full-bleed call-to-action band (admissions funnel). Usually a purple emphasis band. */
export const CTABand: Block = {
  slug: 'ctaBand',
  interfaceName: 'CTABandBlock',
  labels: { singular: 'CTA Band', plural: 'CTA Bands' },
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'purple',
      options: [
        { label: 'Purple gradient', value: 'purple' },
        { label: 'Navy', value: 'navy' },
        { label: 'Off-white', value: 'offwhite' },
      ],
    },
    { name: 'heading', type: 'text', required: true },
    { name: 'subhead', type: 'textarea' },
    {
      name: 'links',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      labels: { singular: 'CTA', plural: 'CTAs' },
      fields: [linkField({ appearances: ['primary', 'outline'] })],
    },
  ],
}
