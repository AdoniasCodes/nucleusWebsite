/**
 * Legacy-seed safety net. The original blog seed stored hero URLs like
 * `/images/stock/blog-cambridge.jpg`, but those local source files were later
 * converted to WebP (and the .jpg deleted). Existing DB rows still hold the old
 * `.jpg` paths, so rewrite any legacy `/images/stock/*.jpg` URL to `.webp` at
 * render time. Scoped to the stock folder so real CMS uploads are never touched.
 */
export function stockWebp<T extends string | null | undefined>(url: T): T {
  return (typeof url === 'string'
    ? url.replace(/^(\/images\/stock\/[a-z0-9-]+)\.jpg$/i, '$1.webp')
    : url) as T
}
