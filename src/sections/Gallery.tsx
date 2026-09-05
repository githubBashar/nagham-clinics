import { Camera } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { Stagger, StaggerItem } from '@/components/Reveal'

export default function Gallery() {
  const { t } = useLanguage()

  return (
    <section id="gallery" className="bg-secondary/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} lead={t.gallery.lead} />

        {/* asymmetric grid: alternate arch / soft-rect placeholders in brand tones */}
        <Stagger className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3">
          {t.gallery.captions.map((caption, i) => {
            const arch = i % 2 === 0
            return (
              <StaggerItem key={caption}>
                <figure className="group">
                  <div
                    className={`arch-pattern relative flex aspect-[4/5] flex-col items-center justify-center gap-3 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] ${
                      arch ? 'arch-frame-sm' : 'rounded-2xl'
                    } ${
                      i % 3 === 1
                        ? 'border border-gold/30 bg-gradient-to-b from-forest-soft to-forest-deep'
                        : 'border border-sage bg-gradient-to-b from-gold-soft/50 to-ivory'
                    }`}
                  >
                    <Camera
                      className={`h-6 w-6 ${i % 3 === 1 ? 'text-gold/70' : 'text-forest/35'}`}
                      strokeWidth={1.5}
                    />
                    <span
                      className={`text-[0.65rem] font-semibold uppercase tracking-[0.22em] ${
                        i % 3 === 1 ? 'text-gold/70' : 'text-ink/35'
                      }`}
                    >
                      {t.gallery.comingSoon}
                    </span>
                  </div>
                  <figcaption className="mt-3 text-center text-sm font-medium text-ink/60">{caption}</figcaption>
                </figure>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
