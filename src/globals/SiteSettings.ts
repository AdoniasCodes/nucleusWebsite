import type { GlobalConfig } from 'payload'

import { anyone, isSuperAdmin, superAdminOnlyUI } from '../access'

/** Global site config: contact details, socials, footer, nav. Super-admin only. */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    hidden: ({ user }) => !superAdminOnlyUI({ req: { user } }),
  },
  access: {
    read: anyone, // needed to render header/footer publicly
    update: isSuperAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            { name: 'schoolName', type: 'text', defaultValue: 'Nucleus International Schools' },
            {
              name: 'phones',
              type: 'array',
              fields: [{ name: 'number', type: 'text', required: true }],
              defaultValue: [{ number: '+2519 81 99 99 22' }, { number: '+2519 81 99 99 33' }],
            },
            {
              name: 'campusPhones',
              type: 'array',
              admin: {
                description:
                  'Phone numbers per campus. When filled, the footer and the Organization schema use these instead of "phones" above (kept as a fallback). Display format +2519 XX XX XX XX.',
              },
              labels: { singular: 'Campus phone', plural: 'Campus phones' },
              fields: [
                {
                  name: 'campus',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Preschool and KG (Bisrate Gebriel)', value: 'preschool' },
                    { label: 'Year 2 to Year 9 (Grade 1 to Grade 8), Vatican', value: 'grade-school' },
                  ],
                },
                { name: 'number', type: 'text', required: true },
              ],
            },
            { name: 'email', type: 'email' },
            {
              name: 'address',
              type: 'textarea',
              defaultValue:
                'Vatican campus (grade school): Sarbet Vatican, behind the Vatican Embassy. Bisrate Gebriel campus (preschool and KG): South African Campus, Bisrate Gebriel, next to Adot Building. Totot campus: behind World Vision. Addis Ababa, Ethiopia.',
            },
            {
              type: 'row',
              fields: [
                { name: 'latitude', type: 'number', defaultValue: 8.9874375, admin: { width: '50%' } },
                { name: 'longitude', type: 'number', defaultValue: 38.7364375, admin: { width: '50%' } },
              ],
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socials',
              type: 'array',
              admin: {
                description:
                  'Shown as brand icons in the footer and in any "Follow Nucleus" section, and emitted as sameAs in the Organization schema. Order here does not matter, the site sorts them.',
              },
              // The footer, the Follow Nucleus band and the sameAs schema all read this one list.
              defaultValue: [
                { platform: 'facebook', url: 'https://www.facebook.com/NucleusDaycare/' },
                { platform: 'tiktok', url: 'https://www.tiktok.com/@nucleusintschools' },
                { platform: 'instagram', url: 'https://www.instagram.com/nucleusintschools/' },
                { platform: 'youtube', url: 'https://www.youtube.com/@Nucleusintschools' },
                { platform: 'linkedin', url: 'https://www.linkedin.com/company/nucleus-international-daycare' },
              ],
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: ['Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok', 'X'].map(
                    (p) => ({ label: p, value: p.toLowerCase() }),
                  ),
                  required: true,
                },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'footerTagline', type: 'text', defaultValue: 'Think Deeply. Create Boldly. Solve Truly.' },
            { name: 'footerText', type: 'richText' },
          ],
        },
      ],
    },
  ],
}
