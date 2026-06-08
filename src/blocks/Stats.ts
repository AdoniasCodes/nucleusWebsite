import type { Block } from 'payload'

/** Trust/stats strip (animated counters). Typically rendered on a purple band. */
export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Stats Strip', plural: 'Stats Strips' },
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'purple',
      options: [
        { label: 'Purple gradient', value: 'purple' },
        { label: 'Navy', value: 'navy' },
        { label: 'White', value: 'white' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
          ],
        },
      ],
    },
  ],
}
