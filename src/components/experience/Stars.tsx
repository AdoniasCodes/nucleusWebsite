'use client'

import { useState } from 'react'

const Star = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden className={filled ? 'text-ochre' : 'text-navy/20'}>
    <path
      fill="currentColor"
      d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"
    />
  </svg>
)

/** Five radio stars: native radios give arrow-key operation and screen reader grouping for free. */
export function StarRatingInput({ name }: { name: string }) {
  const [value, setValue] = useState(0)
  const [hover, setHover] = useState(0)
  const shown = hover || value
  return (
    <fieldset>
      <legend className="mb-1.5 font-display text-sm font-medium text-navy">Your rating (optional)</legend>
      <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            onMouseEnter={() => setHover(n)}
            className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ochre"
          >
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => setValue(n)}
              className="sr-only"
              aria-label={`${n} out of 5 stars`}
            />
            <Star filled={n <= shown} />
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Display-only stars for a saved rating. */
export function StarsDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" width="18" height="18" aria-hidden className={n <= rating ? 'text-ochre' : 'text-navy/15'}>
          <path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
      ))}
    </div>
  )
}
