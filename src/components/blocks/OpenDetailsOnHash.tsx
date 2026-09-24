'use client'

import { useEffect } from 'react'

/**
 * Opens a <details> when the URL hash points at it, so a shared link like
 * /careers#vacancy-head-of-school lands on that role already expanded.
 */
export function OpenDetailsOnHash() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id) return
      const el = document.getElementById(id)
      if (el instanceof HTMLDetailsElement && !el.open) {
        el.open = true
        el.scrollIntoView({ block: 'start' })
      }
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [])
  return null
}
