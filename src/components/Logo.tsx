/**
 * NAGHAM brand emblem, redrawn as inline SVG.
 * Circular emblem: arch doorway, tooth merged with a flowing-hair curve,
 * arched "DENTAL & MEDICAL CENTER" text along the bottom, ESTD 2025 badge.
 */
export function Emblem({
  size = 44,
  className = '',
  variant = 'color',
}: {
  size?: number
  className?: string
  variant?: 'color' | 'mono'
}) {
  const green = variant === 'mono' ? 'currentColor' : '#1F3D2B'
  const gold = variant === 'mono' ? 'currentColor' : '#C9A876'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label="NAGHAM Clinics emblem"
      className={className}
    >
      {/* outer rings */}
      <circle cx="60" cy="60" r="57" stroke={gold} strokeWidth="2" />
      <circle cx="60" cy="60" r="49" stroke={gold} strokeWidth="0.9" opacity="0.7" />

      {/* arch doorway */}
      <path
        d="M38 84 V52 C38 40 47 30 60 30 C73 30 82 40 82 52 V84"
        stroke={green}
        strokeWidth="2.2"
        fill="none"
      />

      {/* tooth merged with flowing hair */}
      <path
        d="M60 40
           C55.5 35.5 47.5 35.5 44 41.5
           C40.8 47 42.5 55.5 45.5 62.5
           C48 68.5 48.8 74 49.4 79.5
           C49.8 83.2 53 84.8 54.9 81.4
           C56.6 78.4 57.3 73.5 60 73.5
           C62.7 73.5 63.4 78.4 65.1 81.4
           C67 84.8 70.2 83.2 70.6 79.5
           C71.2 74 72 68.5 74.5 62.5
           C77.5 55.5 79.2 47 76 41.5
           C72.5 35.5 64.5 35.5 60 40 Z"
        fill={gold}
      />
      {/* flowing hair sweep across the tooth */}
      <path
        d="M41 55 C48 49 56 47.5 60 49.5 C64 51.5 70 52 77 46"
        stroke={green}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M44 60.5 C50 56 56 54.5 60 56.2 C64 57.9 69.5 58.2 75.5 53.5"
        stroke={green}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />

      {/* arched serif text along the bottom */}
      <defs>
        <path id="emblem-arc" d="M 17 58 A 43 43 0 0 0 103 58" fill="none" />
      </defs>
      <text
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="8"
        letterSpacing="1.6"
        fill={green}
        fontWeight="600"
      >
        <textPath href="#emblem-arc" startOffset="50%" textAnchor="middle">
          DENTAL &amp; MEDICAL CENTER
        </textPath>
      </text>

      {/* ESTD 2025 badge */}
      <text
        x="60"
        y="22"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="6.2"
        letterSpacing="1.4"
        fill={green}
        fontWeight="600"
      >
        ESTD 2025
      </text>
      <path d="M46 27 H74" stroke={gold} strokeWidth="0.8" />
    </svg>
  )
}

/** Wordmark: emblem + "NAGHAM" bold wordmark + Arabic name */
export function LogoMark({
  emblemSize = 46,
  onDark = false,
  showArabic = true,
}: {
  emblemSize?: number
  onDark?: boolean
  showArabic?: boolean
}) {
  return (
    <span className="inline-flex items-center gap-3">
      <Emblem size={emblemSize} variant="color" />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[1.35rem] font-extrabold tracking-[0.18em] ${
            onDark ? 'text-ivory' : 'text-forest'
          }`}
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          NAGHAM
        </span>
        {showArabic && (
          <span className={`mt-1 text-[0.72rem] tracking-wide ${onDark ? 'text-gold' : 'text-gold'}`}>
            عيادات نغم الطبية
          </span>
        )}
      </span>
    </span>
  )
}
