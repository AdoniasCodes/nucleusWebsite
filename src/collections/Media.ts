import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrStaff } from '../access'

/**
 * Media library. Files are stored in Supabase Storage (S3-compatible) via the
 * storage-s3 plugin wired in payload.config.ts. Sharp generates responsive
 * WebP-friendly sizes for performant `next/image` delivery (perf budget: LCP < 2s).
 * `alt` is required for accessibility + SEO.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for screen readers and search engines.',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
  upload: {
    // Generate responsive sizes. Output format handled by Sharp; modern formats preferred.
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'square', width: 800, height: 800, position: 'centre' },
      { name: 'card', width: 768, height: 1024, position: 'centre' },
      { name: 'tablet', width: 1024, height: undefined },
      { name: 'desktop', width: 1920, height: undefined },
    ],
    focalPoint: true,
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
}
