import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ExternalLink, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Send, User } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { EASE, Reveal } from '@/components/Reveal'
import { CLINIC } from '@/lib/constants'

type Mode = 'whatsapp' | 'form'

export default function Contact() {
  const { t } = useLanguage()
  const [mode, setMode] = useState<Mode>('whatsapp')
  const [selected, setSelected] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  const toggleService = (key: string) =>
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  const fieldCls =
    'w-full rounded-xl border border-sage bg-white/80 px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/25'

  return (
    <section id="contact" className="relative overflow-hidden bg-forest py-24 sm:py-32">
      <div className="pointer-events-none absolute -bottom-40 start-1/2 h-80 w-[620px] -translate-x-1/2 rounded-t-full border border-gold/15" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading onDark eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />

        {/* ——— mode selector: WhatsApp vs. direct message form ——— */}
        <Reveal className="mt-12 flex justify-center">
          <div className="relative flex rounded-full border border-gold/30 bg-ivory/[0.07] p-1.5 backdrop-blur-sm" role="tablist">
            {(['whatsapp', 'form'] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-colors duration-200 ${
                  mode === m ? 'text-forest' : 'text-ivory/70 hover:text-ivory'
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="contact-mode-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gold"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
                {m === 'whatsapp' ? <MessageCircle className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {t.contact.tabs[m]}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ——— left column: WhatsApp CTA or form ——— */}
          <AnimatePresence mode="wait">
            {mode === 'whatsapp' ? (
              <motion.div
                key="wa"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col items-start justify-center gap-7"
              >
                <div className="flex items-start gap-4">
                  <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
                  <p className="max-w-md text-base leading-relaxed text-ivory/75">{t.contact.whatsappHint}</p>
                </div>
                <motion.a
                  href={CLINIC.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-bold text-forest shadow-[0_16px_40px_-12px_rgba(201,168,118,0.5)] transition-colors hover:bg-gold-light"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  {t.contact.whatsappCta}
                </motion.a>
                <div className="flex flex-col gap-1.5">
                  {CLINIC.phones.map((p, i) => (
                    <a
                      key={p}
                      href={`tel:${CLINIC.phonesIntl[i]}`}
                      className="nums-latin inline-flex w-fit items-center gap-2.5 text-lg font-semibold tracking-wide text-ivory transition-colors hover:text-gold"
                      dir="ltr"
                    >
                      <Phone className="h-4 w-4 text-gold" />
                      {p}
                    </a>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="rounded-2xl border border-gold/25 bg-ivory p-6 sm:p-8"
                onSubmit={(e) => {
                  e.preventDefault()
                  // prototype: no backend — show confirmation state
                  setSent(true)
                  setTimeout(() => setSent(false), 4000)
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-forest/70">
                      <User className="h-3.5 w-3.5 text-gold" /> {t.contact.form.firstName}
                    </span>
                    <input required className={fieldCls} placeholder={t.contact.form.firstName} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-forest/70">
                      <User className="h-3.5 w-3.5 text-gold" /> {t.contact.form.lastName}
                    </span>
                    <input required className={fieldCls} placeholder={t.contact.form.lastName} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-forest/70">
                      <Mail className="h-3.5 w-3.5 text-gold" /> {t.contact.form.email}
                    </span>
                    <input type="email" className={fieldCls} placeholder="name@email.com" dir="ltr" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-forest/70">
                      <Phone className="h-3.5 w-3.5 text-gold" /> {t.contact.form.phone}
                    </span>
                    <input type="tel" required className={fieldCls} placeholder="09xx xxx xxx" dir="ltr" />
                  </label>
                </div>

                {/* service chips — multi-select */}
                <div className="mt-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-forest/70">{t.contact.form.servicesLabel}</span>
                  <span className="ms-2 text-[0.68rem] text-ink/40">{t.contact.form.servicesHint}</span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {t.services.items.map((s) => {
                      const active = selected.includes(s.key)
                      return (
                        <button
                          type="button"
                          key={s.key}
                          onClick={() => toggleService(s.key)}
                          aria-pressed={active}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                            active
                              ? 'border-forest bg-forest text-ivory'
                              : 'border-sage bg-white/70 text-ink/60 hover:border-gold hover:text-forest'
                          }`}
                        >
                          {active && <Check className="h-3 w-3 text-gold" />}
                          {s.title}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <label className="mt-5 flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-forest/70">{t.contact.form.message}</span>
                  <textarea rows={4} className={fieldCls} placeholder={t.contact.form.messagePlaceholder} />
                </label>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2.5 rounded-full bg-forest px-7 py-3.5 text-sm font-bold text-ivory transition-colors hover:bg-forest-soft"
                  >
                    {sent ? <Check className="h-4.5 w-4.5 text-gold" /> : <Send className="h-4.5 w-4.5" />}
                    {t.contact.form.submit}
                  </motion.button>
                  <p className="text-xs text-ink/45">{t.contact.form.note}</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* ——— right column: address / social / map ——— */}
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

            <Reveal delay={0.14}>
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
      </div>
    </section>
  )
}
