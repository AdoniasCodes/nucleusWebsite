/** Primary navigation — plain data so both server (Footer) and client (Header) can import it. */
export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Campus Life', href: '/campus-life' },
  { label: 'Newsletter', href: '/newsletter' },
  // Label is "Blog" but URLs stay /news/* — those are indexed; relabel only, no migration.
  { label: 'Blog', href: '/news' },
  { label: 'Contact', href: '/contact' },
]
