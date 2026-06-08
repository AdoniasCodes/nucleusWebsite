import type { Block } from 'payload'

/** Image or embedded video (e.g. the About-us video), full-width or contained. */
export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlockType',
  labels: { singular: 'Media', plural: 'Media' },
  fields: [
    {
      name: 'kind',
      type: 'radio',
      defaultValue: 'image',
      options: [
        { label: 'Image upload', value: 'image' },
        { label: 'Video embed (URL)', value: 'video' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.kind === 'image' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL (YouTube/Vimeo)',
      admin: { condition: (_, s) => s?.kind === 'video' },
    },
    { name: 'caption', type: 'text' },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'wide',
      options: [
        { label: 'Contained', value: 'contained' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full bleed', value: 'full' },
      ],
    },
  ],
}
