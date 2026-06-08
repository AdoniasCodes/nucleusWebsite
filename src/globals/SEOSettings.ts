import type { GlobalConfig } from 'payload'

import { anyone, isSuperAdmin, superAdminOnlyUI } from '../access'

/** Default SEO/social metadata + schema toggles. Super-admin only. */
export const SEOSettings: GlobalConfig = {
  slug: 'seo-settings',
  label: 'SEO Settings',
  admin: {
    group: 'Settings',
    hidden: ({ user }) => !superAdminOnlyUI({ req: { user } }),
  },
  access: {
    read: anyone, // read for building <head> defaults + JSON-LD
    update: isSuperAdmin,
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Nucleus International School' },
    {
      name: 'titleTemplate',
      type: 'text',
      defaultValue: '%s | Nucleus International School',
      admin: { description: 'Use %s for the page title.' },
    },
    {
      name: 'defaultMetaTitle',
      type: 'text',
      defaultValue: 'Nucleus International School — Cambridge School in Addis Ababa',
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
      maxLength: 160,
      defaultValue:
        'A Cambridge-curriculum international school in Mekanisa, Addis Ababa for ages 2–Grade 8. Robotics, STEM, secure campus, foreign & multilingual staff. Book a tour.',
    },
    { name: 'defaultShareImage', type: 'upload', relationTo: 'media' },
    { name: 'twitterHandle', type: 'text' },
    {
      name: 'organization',
      type: 'group',
      label: 'Organization schema',
      fields: [
        { name: 'legalName', type: 'text', defaultValue: 'Nucleus International School' },
        { name: 'foundingYear', type: 'text' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
