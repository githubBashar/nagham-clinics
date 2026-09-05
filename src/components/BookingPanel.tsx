import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Mail, MessageCircle, Phone, Send, User, X } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { EASE } from '@/components/Reveal'
import { CLINIC } from '@/lib/constants'

type Mode = 'whatsapp' | 'form'

/**
 * Shared booking panel — the WhatsApp / direct-message choice.
 * Rendered inline (embedded in the contact section) and inside the global
 * booking modal, so the choice is available from every CTA on the page.
 * The form opens WhatsApp with the request pre-filled as its submission path.
 */
export function BookingPanel({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage()
  const [mode, setMode] = useState<Mode>('whatsapp')
  const [selected, setSelected] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  const toggleService = (key: string) =>
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  const fieldCls =
    'w-full rounded-xl border border-sage bg-white/80 px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/25'

  return (
    <div className={compact ? '' : 'flex flex-col gap-0'}>
      {/* mode selector */}
      <div className={`flex ${compact ? 'justify-start' : 'justify-center'}`}>
        <div className="relative flex rounded-full border border-gold/30 bg-ivory/[0.07] p-1.5 backdrop-blur-sm" role="tablist">
          {(['whatsapp', 'form'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-colors duration-200 ${
                mode === m ? 'text-forest' : compact ? 'text-ink/60 hover:text-forest' : 'text-ivory/70 hover:text-ivory'
              }`}
            >
              {mode === m && (
                <motion.span
                  layoutId={compact ? 'booking-mode-modal' : 'booking-mode-inline'}
                  className="absolute inset-0 -z-10 rounded-full bg-gold"
                  transition={{ duration: 0.35, ease: EASE }}
                />
              )}
              {m === 'whatsapp' ? <MessageCircle className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              {t.contact.tabs[m]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {mode === 'whatsapp' ? (
            <motion.div
              key="wa"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`flex flex-col gap-5 ${compact ? 'items-start' : 'items-start justify-center'}`}
            >
              <p className={`text-sm leading-relaxed ${compact ? 'text-ink/60' : 'text-ivory/75'}`}>
                {t.contact.whatsappHint}
              </p>
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
                    className={`nums-latin inline-flex w-fit items-center gap-2.5 font-semibold tracking-wide transition-colors hover:text-gold ${
                      compact ? 'text-base text-forest' : 'text-lg text-ivory'
                    }`}
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="rounded-2xl border border-gold/25 bg-ivory p-5 sm:p-7"
              onSubmit={(e) => {
                e.preventDefault()
                // prototype: submission opens WhatsApp with the request details pre-filled
                const data = new FormData(e.currentTarget)
                const serviceTitles = selected
                  .map((k) => t.services.items.find((s) => s.key === k)?.title)
                  .filter(Boolean)
                  .join('، ')
                const lines = [
                  `${t.contact.form.firstName}: ${data.get('firstName')}`,
                  `${t.contact.form.lastName}: ${data.get('lastName')}`,
                  `${t.contact.form.phone}: ${data.get('phone')}`,
                  data.get('email') ? `${t.contact.form.email}: ${data.get('email')}` : '',
                  serviceTitles ? `${t.contact.form.servicesLabel}: ${serviceTitles}` : '',
                  data.get('message') ? `${t.contact.form.message}: ${data.get('message')}` : '',
                ].filter(Boolean)
                window.open(`${CLINIC.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
                setSent(true)
                setTimeout(() => setSent(false), 4000)
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-forest/70">
                    <User className="h-3.5 w-3.5 text-gold" /> {t.contact.form.firstName}
                  </span>
                  <input name="firstName" required autoComplete="given-name" className={fieldCls} placeholder={t.contact.form.firstName} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-forest/70">
                    <User className="h-3.5 w-3.5 text-gold" /> {t.contact.form.lastName}
                  </span>
                  <input name="lastName" required autoComplete="family-name" className={fieldCls} placeholder={t.contact.form.lastName} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-forest/70">
                    <Mail className="h-3.5 w-3.5 text-gold" /> {t.contact.form.email}
                  </span>
                  <input name="email" type="email" autoComplete="email" className={fieldCls} placeholder="name@email.com" dir="ltr" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-forest/70">
                    <Phone className="h-3.5 w-3.5 text-gold" /> {t.contact.form.phone}
                  </span>
                  <input name="phone" type="tel" required autoComplete="tel" className={fieldCls} placeholder="09xx xxx xxx" dir="ltr" />
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
                <textarea name="message" rows={compact ? 3 : 4} className={fieldCls} placeholder={t.contact.form.messagePlaceholder} />
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
      </div>
    </div>
  )
}

/** Global booking modal — opened from any CTA via the booking context */
export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage()

  // close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-forest-deep/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={t.booking.title}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-ivory p-6 shadow-2xl sm:rounded-3xl sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-3xl text-forest">{t.booking.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">{t.booking.lead}</p>
              </div>
              <button
                onClick={onClose}
                aria-label={t.booking.close}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sage text-ink/60 transition-colors hover:border-gold hover:text-forest"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-7">
              <BookingPanel compact />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
