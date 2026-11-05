// The Flocon AI icon. Takes the text color (works in dark mode).
export function Snowflake({ size = 24 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 12 12)`}>
          <line x1="12" y1="12" x2="12" y2="3" />
          <polyline points="9.4,4.6 12,6.8 14.6,4.6" />
        </g>
      ))}
    </svg>
  )
}
