import { Heart, Instagram, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal'
import { CLINIC } from '@/lib/constants'

/**
 * Instagram-style feed. Tiles are styled as real post frames
 * (avatar row with the clinic logo, photo, like/comment bar).
 * To swap in real posts from @nagham_clinics, replace the files in
 * /public/images/gallery/ (keep the same names) — no code change needed.
 */
const POST_IMAGES = [
  '/images/gallery/dental.jpg',
  '/images/gallery/laser.jpg',
  '/images/gallery/botox.jpg',
  '/images/gallery/meso.jpg',
  '/images/gallery/veneers.jpg',
  '/images/gallery/nails.jpg',
  '/images/gallery/men.jpg',
  '/images/gallery/skin.jpg',
]

export default function Gallery() {
  const { t } = useLanguage()

  return (
    <section id="gallery" className="bg-secondary/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} lead={t.gallery.lead} />

        <Stagger className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {t.gallery.captions.map((caption, i) => (
            <StaggerItem key={i}>
              <a
                href={CLINIC.instagram}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-2xl border border-sage bg-white shadow-[0_10px_30px_-18px_rgba(31,61,43,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_22px_44px_-18px_rgba(31,61,43,0.35)]"
              >
                {/* post header: clinic logo avatar + handle */}
                <div className="flex items-center gap-2.5 px-3.5 py-2.5">
                  <img
                    src="/images/logo.png"
                    alt="NAGHAM Clinics"
                    className="h-7 w-7 rounded-full object-cover ring-1 ring-gold/40"
                  />
                  <span className="text-xs font-semibold text-ink/80" dir="ltr">
                    nagham_clinics
                  </span>
                  <Instagram className="ms-auto h-3.5 w-3.5 text-ink/30" strokeWidth={1.5} />
                </div>

                {/* post photo */}
                <div className="relative aspect-square overflow-hidden bg-ivory">
                  <img
                    src={POST_IMAGES[i % POST_IMAGES.length]}
                    alt={caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    className="absolute inset-0 bg-forest/0 transition-colors duration-300 group-hover:bg-forest/10"
                    aria-hidden
                  />
                </div>

                {/* like / comment bar */}
                <div className="flex items-center gap-4 px-3.5 py-2.5">
                  <Heart className="h-4 w-4 text-ink/45 transition-colors group-hover:text-gold" strokeWidth={1.5} />
                  <MessageCircle className="h-4 w-4 text-ink/45" strokeWidth={1.5} />
                  <span className="ms-auto text-[0.68rem] font-medium text-ink/45">{caption}</span>
                </div>
              </a>
            </StaggerItem>
          ))}
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
