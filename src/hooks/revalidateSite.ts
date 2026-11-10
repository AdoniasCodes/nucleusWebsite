import type { CollectionConfig, GlobalConfig } from 'payload'

/**
 * On-demand ISR. Pages keep their cached copy for a day (see `revalidate` on each route) and are
 * refreshed the moment an editor saves or deletes content in the admin. This replaced a 5-minute
 * timer that re-rendered every visited page about 12 times an hour and used up the Vercel free
 * tier's 200K ISR writes a month (Nov 2026).
 *
 * One call clears the whole site, because the layout (site-settings, footer) and listings pull in
 * almost every collection. Pages only re-render when someone next visits them, so this is cheap.
 *
 * Seed scripts run outside Next, where revalidatePath cannot reach production. After seeding,
 * run `pnpm revalidate:prod` (instructions.md).
 */
async function revalidateEverything(): Promise<void> {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Outside a Next request (seed scripts, CLI): nothing to revalidate here.
  }
}

/** Content that shows on the public site. Lead/form collections and users are left out on purpose. */
export const REVALIDATING_COLLECTIONS = new Set([
  'pages',
  'posts',
  'playlists',
  'media',
  'gallery',
  'testimonials',
  'faq',
  'staff',
  'redirects',
])

export function withRevalidate(collection: CollectionConfig): CollectionConfig {
  if (!REVALIDATING_COLLECTIONS.has(collection.slug)) return collection
  const hooks = collection.hooks ?? {}
  return {
    ...collection,
    hooks: {
      ...hooks,
      afterChange: [
        ...(hooks.afterChange ?? []),
        async ({ doc }) => {
          await revalidateEverything()
          return doc
        },
      ],
      afterDelete: [
        ...(hooks.afterDelete ?? []),
        async ({ doc }) => {
          await revalidateEverything()
          return doc
        },
      ],
    },
  }
}

export function withRevalidateGlobal(global: GlobalConfig): GlobalConfig {
  const hooks = global.hooks ?? {}
  return {
    ...global,
    hooks: {
      ...hooks,
      afterChange: [
        ...(hooks.afterChange ?? []),
        async ({ doc }) => {
          await revalidateEverything()
          return doc
        },
      ],
    },
  }
}
