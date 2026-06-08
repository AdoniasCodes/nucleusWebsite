import type { CollectionConfig } from 'payload'

import { isSuperAdmin, isSuperAdminField, superAdminOnlyUI } from '../access'

/**
 * Users = CMS admin accounts (not site visitors / parents).
 * Two roles: 'super-admin' (full control) and 'staff' (limited editorial).
 * Only super-admins can create/manage users or change roles.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'System',
    // Hide the Users collection entirely from staff.
    hidden: ({ user }) => !superAdminOnlyUI({ req: { user } }),
  },
  auth: true,
  access: {
    create: isSuperAdmin,
    delete: isSuperAdmin,
    // A user may read their own record; super-admins read all.
    read: ({ req: { user }, id }) =>
      user?.role === 'super-admin' ? true : Boolean(user) && user?.id === id,
    // A user may update their own record; super-admins update all.
    update: ({ req: { user }, id }) =>
      user?.role === 'super-admin' ? true : Boolean(user) && user?.id === id,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'staff',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'School Staff', value: 'staff' },
      ],
      admin: {
        description: 'Super Admin = full control. Staff = manage content only.',
      },
      // Only super-admins can see/set roles — prevents privilege escalation.
      access: {
        create: isSuperAdminField,
        update: isSuperAdminField,
      },
    },
  ],
}
