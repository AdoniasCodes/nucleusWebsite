/**
 * The Nucleus orb — pearl core + radiant rays. This is the brand's signature 3D
 * motif (it's the logo's center), used as the hero accent and as the fallback
 * "icon" for cards before editors upload real iconography. Pure SVG = zero network cost.
 */
export function Orb({ className = '', size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="orbCore" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#f5e9c8" />
          <stop offset="70%" stopColor="#e0a93b" />
          <stop offset="100%" stopColor="#b9842b" />
        </radialGradient>
        <radialGradient id="orbHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0a93b" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e0a93b" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* radiant rays */}
      <g stroke="#e0a93b" strokeWidth="2.2" strokeLinecap="round" opacity="0.9">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180
          const x1 = 50 + Math.cos(a) * 34
          const y1 = 50 + Math.sin(a) * 34
          const x2 = 50 + Math.cos(a) * 46
          const y2 = 50 + Math.sin(a) * 46
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
      </g>
      <circle cx="50" cy="50" r="40" fill="url(#orbHalo)" />
      <circle cx="50" cy="50" r="24" fill="url(#orbCore)" />
      <circle cx="42" cy="42" r="7" fill="#ffffff" opacity="0.75" />
    </svg>
  )
}
