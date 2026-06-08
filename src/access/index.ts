import type { Access, FieldAccess } from 'payload'

/**
 * Role model (see project-docs/content-models.md):
 *  - 'super-admin' : full control of everything (content, users, SEO, settings, redirects).
 *  - 'staff'       : manage day-to-day content (blog, gallery, testimonials, FAQ, staff),
 *                    read-only on form submissions, no access to users / settings / SEO / redirects.
 *
 * Roles live on the Users collection `role` field. `req.user.role` is typed once
 * `payload generate:types` has run; until then it resolves via the generated User type.
 */

type MaybeRole = { role?: 'super-admin' | 'staff' | null } | null | undefined

const roleOf = (user: MaybeRole): 'super-admin' | 'staff' | undefined => user?.role ?? undefined

/** Public — anyone (used for public-readable content). */
export const anyone: Access = () => true

/** Any authenticated admin user (super-admin or staff). */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/** Super-admins only. */
export const isSuperAdmin: Access = ({ req: { user } }) => roleOf(user) === 'super-admin'

/** Super-admin or staff (i.e. any logged-in CMS user). Used for editorial content. */
export const isAdminOrStaff: Access = ({ req: { user } }) => {
  const role = roleOf(user)
  return role === 'super-admin' || role === 'staff'
}

/** Field-level: only super-admins may read/update this field (e.g. the role field itself). */
export const isSuperAdminField: FieldAccess = ({ req: { user } }) => roleOf(user) === 'super-admin'

/** Admin-UI visibility helper: hide a collection/global from non-super-admins. */
export const superAdminOnlyUI = ({ req: { user } }: { req: { user: MaybeRole } }): boolean =>
  roleOf(user) === 'super-admin'
