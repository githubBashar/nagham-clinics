import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, CalendarCheck } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { useBooking } from '@/lib/booking'
import { EASE } from '@/components/Reveal'

export default function Hero() {
  const { t } = useLanguage()
  const { openBooking } = useBooking()
  const ref = useRef<HTMLElement>(null)

  // Subtle parallax: the arch visual drifts up slower than the scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const ornamentY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.35])

  return (
    <section ref={ref} id="top" className="relative overflow-hidden bg-ivory pt-[76px]">
      {/* ambient ornaments: large soft arch outlines, slow drift */}
      <motion.div style={{ y: ornamentY }} aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-drift absolute -end-40 -top-24 h-[560px] w-[560px] rounded-full border border-gold/25" />
        <div className="animate-drift-slow absolute -start-52 top-1/3 h-[480px] w-[480px] rounded-full border border-forest/10" />
        <div className="absolute end-[12%] top-24 h-64 w-48 rounded-t-full border border-gold/30" />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:pb-32 lg:pt-20">
        {/* ——— copy (gentle parallax fade on scroll) ——— */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-gold"
          >
            <span className="h-px w-10 bg-gold/70" aria-hidden />
            {t.hero.eyebrow}
          </motion.p>

          {/* word-by-word staggered headline reveal */}
          <h1 className="font-display text-[2.6rem] leading-[1.12] text-forest sm:text-6xl lg:text-[4.2rem]">
            {t.hero.title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.055, ease: EASE }}
              >
                {word}
                {'\u00A0'}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-4 font-display text-xl italic text-gold sm:text-2xl"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg"
          >
            {t.hero.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2.5 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-ivory transition-all duration-200 hover:scale-[1.03] hover:bg-forest-soft"
            >
              <CalendarCheck className="h-4.5 w-4.5" />
              {t.hero.ctaPrimary}
            </button>
            <a
              href="#services"
              className="inline-flex items-center gap-2.5 rounded-full border border-forest/25 px-7 py-3.5 text-sm font-semibold text-forest transition-all duration-200 hover:border-gold hover:bg-gold/10"
            >
              {t.hero.ctaSecondary}
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* ——— visual: arch-framed clinic photo with parallax ——— */}
        <motion.div style={{ y: visualY }} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="arch-frame relative aspect-[4/5] w-full overflow-hidden bg-forest shadow-[0_32px_80px_-24px_rgba(31,61,43,0.45)]"
          >
            {/* clinic interior photography */}
            <img
              src="/images/hero-clinic.jpg"
              alt="NAGHAM Clinics — clinic interior"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* brand-tinted gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest/20 to-transparent" aria-hidden />
            {/* inner arch line */}
            <div className="absolute inset-4 rounded-t-full border border-gold/30" aria-hidden />
            {/* logo lockup over the photo */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 pb-8">
              <img
                src="/images/logo.png"
                alt="NAGHAM — Dental & Medical Center"
                className="h-20 w-20 rounded-full shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] ring-2 ring-gold/70"
              />
              <span className="nums-latin text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-gold">
                Dental &amp; Medical Center
              </span>
            </div>
            {/* gold light wash */}
            <div className="animate-glow absolute -bottom-16 start-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" aria-hidden />
          </motion.div>

          {/* floating ESTD badge — continuous gentle float after entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="absolute -bottom-6 end-6"
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1.4 }}
              className="flex h-28 w-28 rotate-[-8deg] flex-col items-center justify-center rounded-full border border-gold/50 bg-ivory text-center shadow-[0_16px_40px_-12px_rgba(31,61,43,0.3)]"
            >
            <span className="nums-latin text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
              {t.hero.badge.split(' ')[0]}
            </span>
            <span className="nums-latin font-display text-2xl font-semibold text-forest">2025</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="relative mx-auto hidden w-fit items-center gap-2 pb-8 text-xs font-medium tracking-[0.2em] text-ink/40 lg:flex"
      >
        {t.hero.scroll}
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.div>
    </section>
  )
}
