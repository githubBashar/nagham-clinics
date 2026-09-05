import { Camera, Heart, Instagram, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal'
import { CLINIC } from '@/lib/constants'

/**
 * Instagram feed placeholder. The tiles are styled as real post frames
 * (avatar row, image area, like/comment bar) so the section already looks
 * like a live social feed; swapping in real photos from @nagham_clinics
 * only requires dropping image URLs into POST_IMAGES.
 */
export default function Gallery() {
  const { t } = useLanguage()

  return (
    <section id="gallery" className="bg-secondary/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} lead={t.gallery.lead} />

        <Stagger className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
          {t.gallery.captions.map((caption, i) => {
            const dark = i % 3 === 1
            return (
              <StaggerItem key={i}>
                <a
                  href={CLINIC.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-sage bg-white shadow-[0_10px_30px_-18px_rgba(31,61,43,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_22px_44px_-18px_rgba(31,61,43,0.35)]"
                >
                  {/* post header: avatar + handle */}
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-[0.6rem] font-bold text-gold">
                      N
                    </span>
                    <span className="text-xs font-semibold text-ink/80" dir="ltr">
                      nagham_clinics
                    </span>
                    <Instagram className="ms-auto h-3.5 w-3.5 text-ink/30" strokeWidth={1.5} />
                  </div>

                  {/* image area — swap for the real post image */}
                  <div
                    className={`arch-pattern relative flex aspect-square flex-col items-center justify-center gap-2.5 ${
                      dark
                        ? 'bg-gradient-to-b from-forest-soft to-forest-deep'
                        : 'bg-gradient-to-b from-gold-soft/50 to-ivory'
                    }`}
                  >
                    <Camera className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${dark ? 'text-gold/70' : 'text-forest/35'}`} strokeWidth={1.5} />
                    <span className={`text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-gold/70' : 'text-ink/35'}`}>
                      {t.gallery.comingSoon}
                    </span>
                  </div>

                  {/* like / comment bar */}
                  <div className="flex items-center gap-4 px-3.5 py-2.5">
                    <Heart className="h-4 w-4 text-ink/45 transition-colors group-hover:text-gold" strokeWidth={1.5} />
                    <MessageCircle className="h-4 w-4 text-ink/45" strokeWidth={1.5} />
                    <span className="ms-auto text-[0.68rem] text-ink/35">{caption}</span>
                  </div>
                </a>
              </StaggerItem>
            )
          })}
        </Stagger>

        <Reveal delay={0.15} className="mt-12 text-center">
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-forest px-8 py-3.5 text-sm font-bold text-ivory transition-all duration-200 hover:scale-[1.03] hover:bg-forest-soft"
          >
            <Instagram className="h-4.5 w-4.5" />
            {t.gallery.cta}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
