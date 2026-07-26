import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrStaff } from '../access'
import { slugField } from '../fields/slug'

/** Blog/News posts. Fully editable by staff. Article schema rendered on the frontend. */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  versions: { drafts: { autosave: { interval: 375 } }, maxPerDoc: 25 },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'News', value: 'news' },
        { label: 'Academics', value: 'academics' },
        { label: 'Admissions', value: 'admissions' },
        { label: 'Campus Life', value: 'campus-life' },
        { label: 'Parent Resources', value: 'parent-resources' },
        { label: 'Newsletter', value: 'newsletter' },
      ],
    },
    { name: 'excerpt', type: 'textarea', maxLength: 280 },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'heroImageUrl',
      type: 'text',
      admin: { description: 'Optional local/stock image path (e.g. /images/...) used if no hero image is uploaded.' },
    },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'sections',
      type: 'array',
      admin: {
        description:
          'Newsletter magazine sections. When present (category "Newsletter"), the article renders as a visual magazine layout from these sections; the content field above is the plain fallback.',
        condition: (data) => data?.category === 'newsletter',
      },
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'body', type: 'richText' },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Auto (alternating image + text)', value: 'auto' },
            { label: 'Photo gallery (mosaic)', value: 'gallery' },
            { label: 'Highlight band (navy)', value: 'highlight' },
          ],
        },
        {
          name: 'images',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'imageUrl',
              type: 'text',
              admin: { description: 'Optional local image path used if no image is uploaded.' },
            },
            { name: 'alt', type: 'text' },
            { name: 'caption', type: 'text' },
          ],
        },
        {
          name: 'videoUrl',
          type: 'text',
          admin: {
            description:
              'Optional local video path (e.g. /video/newsletter/...). Plays inline on the website; excluded from the PDF version.',
          },
        },
        {
          name: 'videoPoster',
          type: 'text',
          admin: { description: 'Optional poster image path shown before the video plays.' },
        },
        { name: 'videoCaption', type: 'text' },
      ],
    },
    {
      name: 'playlist',
      type: 'relationship',
      relationTo: 'playlists',
      admin: {
        position: 'sidebar',
        description: 'Newsletter series this article belongs to (e.g. Summer Camp 2026).',
      },
    },
    {
      name: 'playlistPart',
      type: 'number',
      admin: { position: 'sidebar', description: 'Order inside the series (1 = first part).' },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    slugField('title'),
  ],
}
