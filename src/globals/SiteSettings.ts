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
              defaultValue: [{ number: '0981999922' }, { number: '0981999933' }],
            },
            { name: 'email', type: 'email' },
            {
              name: 'address',
              type: 'textarea',
              defaultValue:
                'Vatican campus (grade school): Sarbet Vatican, behind the Vatican Embassy. Abo campus (preschool): 100 m from Mekanisa Abo Square. Totot campus: behind World Vision. Addis Ababa, Ethiopia.',
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
