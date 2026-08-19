import type { CollectionConfig } from 'payload'

import { isAdminOrStaff, isSuperAdmin } from '../access'

/**
 * CVs uploaded through the /careers form. A separate upload collection from `media` on purpose:
 *
 *  - `media` is world-readable (it serves the site's images). A CV is an applicant's personal
 *    data, so read is locked to CMS users and files are served through Payload's own file route,
 *    which enforces that access. Nothing here is ever public.
 *  - `media` only accepts images, video and PDF; applicants also send .doc/.docx.
 *  - No image sizes: these are documents, so Sharp has nothing to do.
 *
 * SECURITY: create is locked to CMS users. Public uploads come through the
 * `submitCareerApplication` server action (Local API / overrideAccess) AFTER honeypot, per-IP
 * rate limit, signed form-token, MIME and size checks.
 */
export const CareerCVs: CollectionConfig = {
  slug: 'career-cvs',
  labels: { singular: 'CV', plural: 'CVs' },
  admin: {
    useAsTitle: 'filename',
    group: 'Forms',
    // Reached through the application it belongs to; a bare list of files is not useful.
    hidden: ({ user }) => !user,
  },
  access: {
    create: isAdminOrStaff,
    read: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isSuperAdmin,
  },
  upload: {
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [
    {
      name: 'applicantName',
      type: 'text',
      maxLength: 200,
      admin: { description: 'Who sent this CV. Copied from the application on submit.' },
    },
  ],
}
