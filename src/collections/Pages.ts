import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrStaff, isSuperAdmin } from '../access'
import { layoutBlocks } from '../blocks'
import { slugField } from '../fields/slug'

/**
 * Pages = the flexible, block-built marketing pages (Home, About, Admissions, …).
 * Structural changes (create/delete) are super-admin only; staff may edit content of
 * existing approved pages. Drafts + versions enabled for safe editing.
 * SEO meta + breadcrumb fields are injected by plugins in payload.config.ts.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: anyone, // public reads resolve to published versions (draft: false) at query time
    create: isSuperAdmin,
    update: isAdminOrStaff,
    delete: isSuperAdmin,
  },
  versions: {
    drafts: { autosave: { interval: 375 } },
    maxPerDoc: 25,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: layoutBlocks,
      admin: { description: 'Build the page from sections. Order = top-to-bottom on the page.' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    slugField('title'),
  ],
}
