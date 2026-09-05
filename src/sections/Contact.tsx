import { ExternalLink, Facebook, Instagram, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { BookingPanel } from '@/components/BookingPanel'
import { CLINIC } from '@/lib/constants'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="relative overflow-hidden bg-forest py-24 sm:py-32">
      <div className="pointer-events-none absolute -bottom-40 start-1/2 h-80 w-[620px] -translate-x-1/2 rounded-t-full border border-gold/15" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading onDark eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />

        <Reveal className="mt-12">
          <BookingPanel />
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-ivory/10 pt-12 lg:grid-cols-2 lg:gap-16">
          {/* ——— address + social ——— */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold">{t.contact.addressLabel}</h3>
                  <p className="mt-2 max-w-sm leading-relaxed text-ivory/80">{t.contact.address}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex items-start gap-4">
                <Instagram className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold">{t.contact.followLabel}</h3>
                  <div className="mt-2 flex flex-col gap-1.5">
                    <a href={CLINIC.instagram} target="_blank" rel="noreferrer" className="w-fit text-ivory/80 transition-colors hover:text-gold" dir="ltr">
                      @nagham_clinics
                    </a>
                    <a href={CLINIC.facebook} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-1.5 text-ivory/80 transition-colors hover:text-gold">
                      <Facebook className="h-4 w-4" /> Nagham Clinic
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ——— map placeholder ——— */}
          <Reveal delay={0.1}>
            <a
              href={CLINIC.maps}
              target="_blank"
              rel="noreferrer"
              className="group relative flex min-h-[240px] flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-gold/25 bg-ivory"
            >
              <div className="map-grid absolute inset-0" aria-hidden />
              <svg className="absolute inset-0 h-full w-full" aria-hidden>
                <path d="M-20 120 C120 100 220 160 420 130" stroke="#C9A876" strokeWidth="10" opacity="0.35" fill="none" />
                <path d="M60 -20 C90 80 70 200 110 400" stroke="#1F3D2B" strokeWidth="7" opacity="0.12" fill="none" />
              </svg>
              <div className="relative flex flex-col items-center gap-3 text-center">
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-forest shadow-lg transition-transform duration-300 group-hover:scale-110"
                >
                  <MapPin className="h-6 w-6 text-gold" />
                </motion.span>
                <span className="text-sm font-bold text-forest">{t.contact.mapLabel}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/55 transition-colors group-hover:text-forest">
                  <ExternalLink className="h-3.5 w-3.5" />
                  {t.contact.mapCta}
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
