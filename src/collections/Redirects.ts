import type { CollectionConfig } from 'payload'

import { isSuperAdmin, superAdminOnlyUI } from '../access'

/**
 * CMS-managed redirect rules (super-admin only; hidden from staff). Consumed at runtime
 * by middleware/next.config to 301 legacy paths to canonical URLs. Distinct from the
 * domain-level redirects (secondary domains → primary) handled in next.config.
 */
export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'type'],
    group: 'System',
    hidden: ({ user }) => !superAdminOnlyUI({ req: { user } }),
  },
  access: {
    read: isSuperAdmin,
    create: isSuperAdmin,
    update: isSuperAdmin,
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Source path, e.g. /old-page (leading slash, no domain).' },
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      admin: { description: 'Destination path or absolute URL.' },
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: '301',
      options: [
        { label: '301 — Permanent', value: '301' },
        { label: '302 — Temporary', value: '302' },
      ],
    },
  ],
}
