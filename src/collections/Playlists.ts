import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrStaff } from '../access'
import { slugField } from '../fields/slug'

/**
 * Newsletter series ("playlists"): curated, ordered runs of newsletter articles,
 * e.g. "Nucleus International School Summer Camp 2026" holding the weekly camp
 * recaps. Articles point here via the `playlist` relationship on Posts, with
 * `playlistPart` giving their order inside the series. Rendered at
 * /newsletter/series/[slug].
 */
export const Playlists: CollectionConfig = {
  slug: 'playlists',
  labels: { singular: 'Newsletter Series', plural: 'Newsletter Series' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'One or two sentences shown on the series page and series cards.' },
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'coverImageUrl',
      type: 'text',
      admin: { description: 'Optional local image path (e.g. /images/newsletter/...) used if no cover is uploaded.' },
    },
    slugField('title'),
  ],
}
