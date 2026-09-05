import { Quote, Star } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal'

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section id="testimonials" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} lead={t.testimonials.lead} />

        <Stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item) => (
            <StaggerItem key={item.name} className="h-full">
              <blockquote className="flex h-full flex-col gap-6 rounded-2xl border border-sage bg-white/70 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_50px_-20px_rgba(31,61,43,0.25)]">
                <Quote className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <p className="flex-1 text-[0.95rem] leading-relaxed text-ink/75">{item.quote}</p>
                <footer className="flex items-center justify-between gap-3 border-t border-sage pt-5">
                  <div className="flex items-center gap-3">
                    {/* initials avatar */}
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-xs font-bold text-gold">
                      {item.name}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-forest">{item.name}</div>
                      <div className="text-xs text-ink/50">{item.service}</div>
                    </div>
                  </div>
                  <span className="flex gap-0.5 text-gold" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </span>
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-xs italic text-ink/45">{t.testimonials.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
