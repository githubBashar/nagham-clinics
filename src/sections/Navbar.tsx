import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { CalendarCheck, Globe, Menu, X } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { useBooking } from '@/lib/booking'
import { LogoMark } from '@/components/Logo'
import { EASE } from '@/components/Reveal'

export default function Navbar() {
  const { t, lang, toggle, rtl } = useLanguage()
  const { openBooking } = useBooking()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // page scroll progress bar (gold line under the navbar)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#team', label: t.nav.team },
    { href: '#services', label: t.nav.services },
    { href: '#why', label: t.nav.why },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#testimonials', label: t.nav.testimonials },
    { href: '#contact', label: t.nav.contact },
  ]

  const langLabel = lang === 'ar' ? 'EN' : 'عربي'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-sage/70 bg-ivory/85 shadow-[0_1px_24px_rgba(31,61,43,0.06)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <motion.div
        className={`absolute inset-x-0 top-0 h-[2.5px] bg-gold ${rtl ? 'origin-right' : 'origin-left'}`}
        style={{ scaleX: progress }}
        aria-hidden
      />
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" aria-label="NAGHAM Clinics — home" className="shrink-0">
          <LogoMark emblemSize={44} />
        </a>

        {/* desktop links */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/75 transition-colors duration-200 hover:text-forest"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* language switch */}
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 px-3.5 py-2 text-xs font-bold tracking-wide text-forest transition-all duration-200 hover:border-gold hover:bg-gold/10"
            aria-label="Switch language / تبديل اللغة"
          >
            <Globe className="h-3.5 w-3.5" />
            {langLabel}
          </button>

          <button
            onClick={openBooking}
            className="hidden items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory transition-all duration-200 hover:scale-[1.03] hover:bg-forest-soft sm:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" />
            {t.nav.book}
          </button>

          {/* mobile menu button */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-forest lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-b border-sage bg-ivory/95 backdrop-blur-xl lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-6 pb-6 pt-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-gold/10 hover:text-forest"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false)
                  openBooking()
                }}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory"
              >
                <CalendarCheck className="h-4 w-4" />
                {t.nav.book}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
