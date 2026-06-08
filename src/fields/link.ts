import type { Field } from 'payload'

/**
 * Reusable link group: either an internal reference (to a Page) or a custom URL.
 * Internal links keep the funnel intact and avoid orphan/broken links as slugs change.
 * `appearance` lets a layout block render the link as a button style.
 */
type LinkArgs = {
  name?: string
  appearances?: Array<'primary' | 'secondary' | 'outline' | 'link'>
}

export const linkField = ({ name = 'link', appearances }: LinkArgs = {}): Field => {
  const fields: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'reference',
          options: [
            { label: 'Internal page', value: 'reference' },
            { label: 'Custom URL', value: 'custom' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          admin: { width: '50%', style: { alignSelf: 'flex-end' } },
        },
      ],
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: { condition: (_, sibling) => sibling?.type === 'reference' },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { condition: (_, sibling) => sibling?.type === 'custom' },
    },
  ]

  if (appearances && appearances.length > 0) {
    fields.unshift({
      name: 'appearance',
      type: 'select',
      defaultValue: appearances[0],
      options: appearances.map((a) => ({ label: a, value: a })),
    })
  }

  return {
    name,
    type: 'group',
    fields,
  }
}
