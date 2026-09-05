import { Sparkle } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

/** Infinite marquee strip with the 10 service keywords — mirrors automatically in RTL */
export default function Ticker() {
  const { t } = useLanguage()
  const items = [...t.marquee, ...t.marquee]

  return (
    <div className="overflow-hidden border-y border-gold/25 bg-gold/[0.07] py-4" dir="ltr">
      <div className="animate-marquee flex w-max items-center gap-10">
        {items.map((label, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-lg italic text-forest/80">{label}</span>
            <Sparkle className="h-3 w-3 text-gold" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  )
}
