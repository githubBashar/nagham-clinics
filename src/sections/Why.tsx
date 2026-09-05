import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal'

export default function Why() {
  const { t } = useLanguage()

  return (
    <section id="why" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />

        {/* editorial numbered list with dividers instead of boxed cards */}
        <Stagger className="mx-auto mt-16 max-w-4xl">
          {t.why.items.map((item, i) => (
            <StaggerItem key={item.title}>
              <div className="group flex flex-col gap-4 border-t border-sage py-9 transition-colors duration-300 last:border-b hover:bg-gold/[0.06] sm:flex-row sm:items-baseline sm:gap-10 sm:px-4">
                <span className="nums-latin font-display text-5xl font-medium italic leading-none text-gold sm:w-20 sm:shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-forest sm:text-2xl">{item.title}</h3>
                  <p className="mt-2.5 max-w-2xl text-base leading-relaxed text-ink/65">{item.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-forest underline decoration-gold decoration-2 underline-offset-8 transition-colors hover:text-gold"
          >
            {t.why.cta}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
