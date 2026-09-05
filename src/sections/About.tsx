import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { Reveal } from '@/components/Reveal'

export default function About() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)

  // subtle parallax: portrait drifts slightly against the scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], [36, -36])

  return (
    <section ref={ref} id="about" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Dr. Nagham portrait — arch-framed */}
        <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <motion.div style={{ y: portraitY }}>
          <div className="arch-frame relative aspect-[4/5] w-full overflow-hidden border border-gold/30 bg-forest">
            <img
              src="/images/team/nagham.jpg"
              alt={t.about.portraitCaption}
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/40 to-transparent px-6 pb-6 pt-20 text-center">
              <p className="text-xs font-medium leading-relaxed text-ivory/90 sm:text-sm">{t.about.portraitCaption}</p>
            </div>
          </div>
          <div className="absolute -bottom-5 -start-4 h-24 w-24 rounded-t-full border border-gold/40 sm:-start-6" aria-hidden />
          </motion.div>
        </Reveal>

        {/* bio */}
        <div>
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-10 bg-gold/70" aria-hidden />
              {t.about.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl leading-[1.15] text-forest sm:text-5xl">{t.about.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">{t.about.p1}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">{t.about.p2}</p>
          </Reveal>

          {/* credibility markers */}
          <div className="mt-11 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-sage bg-sage sm:grid-cols-3">
            {t.about.markers.map((m, i) => (
              <Reveal key={m.label} delay={0.1 + i * 0.08} className="bg-ivory">
                <div className="flex h-full flex-col gap-2 px-6 py-6">
                  <span className="inline-flex items-center gap-2 font-display text-2xl font-semibold text-forest">
                    {i === 0 && <GraduationCap className="h-5 w-5 text-gold" />}
                    <span className="nums-latin">{m.value}</span>
                  </span>
                  <span className="text-sm leading-snug text-ink/60">{m.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <a
              href="#services"
              className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-forest underline decoration-gold decoration-2 underline-offset-8 transition-colors hover:text-gold"
            >
              {t.about.cta}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
