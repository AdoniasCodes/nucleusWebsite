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
    { name: 'siteName', type: 'text', defaultValue: 'Nucleus International Schools' },
    {
      name: 'titleTemplate',
      type: 'text',
      defaultValue: '%s | Nucleus International Schools',
      admin: { description: 'Use %s for the page title.' },
    },
    {
      name: 'defaultMetaTitle',
      type: 'text',
      // "Cambridge School" reads as the competitor Cambridge International School.
      // Say "International Cambridge Curriculum" everywhere instead.
      defaultValue: 'International Cambridge Curriculum in Addis Ababa | Nucleus International Schools',
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
      maxLength: 160,
      defaultValue:
        'Nucleus teaches the international Cambridge curriculum at Vatican, Addis Ababa (near Mekanisa Abo Square), ages 2 to Grade 8. Robotics, STEM, secure campus.',
    },
    { name: 'defaultShareImage', type: 'upload', relationTo: 'media' },
    { name: 'twitterHandle', type: 'text' },
    {
      name: 'organization',
      type: 'group',
      label: 'Organization schema',
      fields: [
        { name: 'legalName', type: 'text', defaultValue: 'Nucleus International Schools' },
        { name: 'foundingYear', type: 'text' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
