import { GraduationCap } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { Reveal } from '@/components/Reveal'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* portrait placeholder — arch-framed, on-brand neutral */}
        <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="arch-frame arch-pattern relative aspect-[4/5] w-full overflow-hidden border border-gold/30 bg-gradient-to-b from-gold-soft/60 via-ivory to-gold-soft/40">
            <div className="absolute inset-4 rounded-t-full border border-forest/15" aria-hidden />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-10 text-center">
              {/* abstract silhouette: arch + profile line */}
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
                <path d="M30 108 V60 C30 44 42 32 60 32 C78 32 90 44 90 60 V108" stroke="#1F3D2B" strokeWidth="1.6" opacity="0.7" />
                <path d="M60 44 c-7 0 -12 5.5 -12 12.5 c0 9 6 13 12 13 c6 0 12 -4 12 -13 c0 -7 -5 -12.5 -12 -12.5 z" fill="#C9A876" opacity="0.85" />
                <path d="M44 108 c0 -14 8 -22 16 -22 c8 0 16 8 16 22" stroke="#1F3D2B" strokeWidth="1.6" opacity="0.7" />
                <path d="M48 52 c6 -6 18 -6 24 0" stroke="#C9A876" strokeWidth="1.4" />
              </svg>
              <p className="text-xs leading-relaxed text-ink/45">{t.about.portraitCaption}</p>
            </div>
          </div>
          <div className="absolute -bottom-5 -start-4 h-24 w-24 rounded-t-full border border-gold/40 sm:-start-6" aria-hidden />
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
