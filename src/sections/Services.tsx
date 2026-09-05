import type { ReactNode } from 'react'
import { Droplets, Flower2, FlaskConical, Hand, Sparkles, Syringe, User, Zap, Scissors, CalendarCheck } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { Stagger, StaggerItem, Reveal } from '@/components/Reveal'
import { CLINIC } from '@/lib/constants'

/** Thin-line icons per service — plain strokes, no colored containers (keeps the premium look) */
function ToothIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M12 4.5c-2-2.2-6.2-2.2-8.2.6-1.9 2.6-.9 6.9.7 10.3 1 2.2 1.4 4.4 1.7 6.5.2 1.5 1.6 2 2.4.7.9-1.5 1.2-3.4 3.4-3.4s2.5 1.9 3.4 3.4c.8 1.3 2.2.8 2.4-.7.3-2.1.7-4.3 1.7-6.5 1.6-3.4 2.6-7.7.7-10.3-2-2.8-6.2-2.8-8.2-.6z" />
    </svg>
  )
}

const ICONS: Record<string, ReactNode> = {
  dental: <ToothIcon />,
  skin: <Sparkles className="h-6 w-6" strokeWidth={1.5} />,
  botox: <Syringe className="h-6 w-6" strokeWidth={1.5} />,
  filler: <Droplets className="h-6 w-6" strokeWidth={1.5} />,
  mesotherapy: <FlaskConical className="h-6 w-6" strokeWidth={1.5} />,
  laser: <Zap className="h-6 w-6" strokeWidth={1.5} />,
  surgery: <Scissors className="h-6 w-6" strokeWidth={1.5} />,
  gynecology: <Flower2 className="h-6 w-6" strokeWidth={1.5} />,
  mens: <User className="h-6 w-6" strokeWidth={1.5} />,
  nails: <Hand className="h-6 w-6" strokeWidth={1.5} />,
}

export default function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className="relative overflow-hidden bg-forest py-24 sm:py-32">
      {/* faint arch ornament top */}
      <div className="pointer-events-none absolute -top-32 start-1/2 h-72 w-[560px] -translate-x-1/2 rounded-t-full border border-gold/15" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading onDark eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />

        <Stagger className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {t.services.items.map((s, i) => (
            <StaggerItem key={s.key} className="h-full">
              <article className="group flex h-full flex-col gap-4 rounded-2xl border border-ivory/10 bg-ivory/[0.06] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-ivory/[0.1]">
                <div className="flex items-start justify-between">
                  <span className="text-gold transition-transform duration-300 group-hover:scale-110">{ICONS[s.key]}</span>
                  <span className="nums-latin font-display text-sm italic text-gold/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-ivory">{s.title}</h3>
                <p className="text-sm leading-relaxed text-ivory/65">{s.desc}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-14 text-center">
          <a
            href={CLINIC.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-forest transition-all duration-200 hover:scale-[1.03] hover:bg-gold-light"
          >
            <CalendarCheck className="h-4.5 w-4.5" />
            {t.services.cta}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
