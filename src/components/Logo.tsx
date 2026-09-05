/**
 * NAGHAM brand lockup. The mark uses the real clinic logo asset
 * (/public/images/logo.png) instead of a redrawn SVG emblem.
 */
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
      <img
        src="/images/logo.png"
        width={emblemSize}
        height={emblemSize}
        alt="NAGHAM Clinics — Dental & Medical Center"
        className={`rounded-full object-cover ring-1 ${onDark ? 'ring-gold/60' : 'ring-gold/50'}`}
      />
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
